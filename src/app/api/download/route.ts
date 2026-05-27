import { NextRequest, NextResponse } from 'next/server'

const REPOS = {
  stable: 'RyanYuuki/AnymeX',
  beta: 'Shebyyy/AnymeX-Preview',
}

// Match patterns for finding assets by platform key
const ASSET_PATTERNS: Record<string, RegExp[]> = {
  'android-arm64': [/AnymeX-Android-arm64-v8a\.apk$/],
  'android-x86_64': [/AnymeX-Android-x86_64\.apk$/],
  'android-universal': [/AnymeX-Android-universal\.apk$/],
  'ios': [/AnymeX-iOS.*\.ipa$/],
  'windows-zip': [/AnymeX-Windows\.zip$/],
  'windows-installer': [/AnymeX.*Installer\.exe$/, /AnymeX-x86_64.*\.exe$/],
  'macos': [/AnymeX.*\.dmg$/, /anymex.*\.dmg$/],
  'linux-appimage': [/AnymeX-Linux\.AppImage$/],
  'linux-rpm': [/AnymeX-Linux\.rpm$/],
  'linux-zip': [/AnymeX-Linux\.zip$/],
}

// Cache: { key: { url, expiry } }
const cache: Record<string, { url: string; expiry: number }> = {}
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function getLatestAssetUrl(channel: string, platform: string): Promise<string | null> {
  const cacheKey = `${channel}:${platform}`
  const cached = cache[cacheKey]
  if (cached && cached.expiry > Date.now()) {
    return cached.url
  }

  const repo = REPOS[channel as keyof typeof REPOS]
  if (!repo) return null

  const patterns = ASSET_PATTERNS[platform]
  if (!patterns) return null

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: { 'User-Agent': 'AnymeX-Extensions' },
      next: { revalidate: 300 },
    })

    if (!res.ok) return null

    const data = await res.json()
    const assets = data.assets as { name: string; browser_download_url: string }[]

    for (const pattern of patterns) {
      const asset = assets.find(a => pattern.test(a.name))
      if (asset) {
        cache[cacheKey] = { url: asset.browser_download_url, expiry: Date.now() + CACHE_TTL }
        return asset.browser_download_url
      }
    }
  } catch {
    // fall through
  }

  return null
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const channel = searchParams.get('channel') || 'stable'
  const platform = searchParams.get('platform')

  if (!platform) {
    return NextResponse.json({ error: 'Missing platform parameter' }, { status: 400 })
  }

  const url = await getLatestAssetUrl(channel, platform)

  if (!url) {
    return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
  }

  return NextResponse.redirect(url)
}
