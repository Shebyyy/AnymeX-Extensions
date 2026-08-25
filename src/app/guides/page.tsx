'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import {
  Download,
  BookOpen,
  ExternalLink,
  ChevronRight,
  Shield,
  Smartphone,
  Monitor,
  Apple,
} from 'lucide-react'

const PLATFORM_ICONS: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  android: { icon: <Smartphone className="w-3 h-3" />, label: 'Android', color: 'text-emerald-400' },
  ios: { icon: <Apple className="w-3 h-3" />, label: 'iOS', color: 'text-gray-300' },
  desktop: { icon: <Monitor className="w-3 h-3" />, label: 'Desktop', color: 'text-sky-400' },
}

// ============ GUIDE CARDS DATA ============

const GUIDES = [
  {
    id: 'setup',
    title: 'Setup Guide',
    description: 'Install AnymeX, add the plugin, install extensions, and start watching/reading.',
    icon: <BookOpen className="w-6 h-6" />,
    href: '/guide',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    hoverBorder: 'hover:border-emerald-500/40',
    tags: ['Install', 'Plugin', 'Extensions', 'First Setup'],
  },
  {
    id: 'download',
    title: 'Download Guide',
    description: 'How to download anime & manga in AnymeX — permissions, search, select episodes, and manage downloads.',
    icon: <Download className="w-6 h-6" />,
    href: '/download-guide',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    hoverBorder: 'hover:border-amber-500/40',
    tags: ['Permissions', 'Download', 'Queue', 'Offline'],
  },
]

// ============ EXTENSION SYSTEMS DATA ============

const EXT_SYSTEMS = [
  {
    name: 'Aniyomi / Mihon',
    description: 'Aniyomi for anime & Mihon for manga',
    url: 'https://wotaku.wiki/ext/mihon',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    platforms: ['android', 'desktop'],
  },
  {
    name: 'Mangayomi',
    description: 'Anime, manga & novel extensions',
    url: 'https://wotaku.wiki/ext/mangayomi',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    platforms: ['android', 'ios', 'desktop'],
  },
  {
    name: 'LNReader',
    description: 'Novel extensions (goes under Mangayomi Novel in AnymeX)',
    url: 'https://wotaku.wiki/ext/misc#lnreader',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    platforms: ['android', 'ios', 'desktop'],
  },
  {
    name: 'Sora',
    description: 'Anime, manga & novel extensions',
    url: 'https://wotaku.wiki/ext/ios#sora',
    color: 'text-gray-300',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/20',
    platforms: ['android', 'ios', 'desktop'],
  },
  {
    name: 'CloudStream',
    description: 'Anime extensions',
    url: 'https://wotaku.wiki/ext/misc#cloudstream',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    platforms: ['android', 'desktop'],
  },
  {
    name: 'Kotatsu',
    description: 'Manga extensions',
    url: 'https://wotaku.wiki/ext/misc#kotatsu',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    platforms: ['android', 'desktop'],
  },
]

// ============ MAIN COMPONENT ============

function GuidesContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="px-4 sm:px-6 py-3 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="AnymeX" className="w-7 h-7 rounded-lg object-contain" />
              <Link href="/guides" className="text-base sm:text-lg font-semibold text-gray-100 hover:text-white transition-colors">
                AnymeX Guides
              </Link>
            </div>
            <Link href="/guides" className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-medium text-white bg-white/10 border border-white/20 transition-all">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Guides</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6 sm:py-10 flex-1 max-w-4xl mx-auto w-full">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Guides</h1>
          <p className="text-sm sm:text-base text-gray-400">Step-by-step guides to help you get started with AnymeX.</p>
        </div>

        {/* Guide Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {GUIDES.map(guide => (
            <Link
              key={guide.id}
              href={guide.href}
              className={`group relative flex flex-col p-5 sm:p-6 rounded-xl bg-white/[0.02] border ${guide.border} ${guide.hoverBorder} hover:bg-white/[0.04] transition-all`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${guide.bg} border ${guide.border} flex items-center justify-center ${guide.color} mb-4 group-hover:scale-110 transition-transform`}>
                {guide.icon}
              </div>

              {/* Title */}
              <h2 className="text-base sm:text-lg font-bold text-white mb-1.5">
                {guide.title}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-400 mb-4 flex-1">{guide.description}</p>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap mb-4">
                {guide.tags.map(tag => (
                  <span key={tag} className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium ${guide.bg} ${guide.color} border ${guide.border}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 group-hover:text-gray-300 transition-colors">
                <span>Read guide</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Extension Systems */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Extension Systems</h2>
          <p className="text-sm text-gray-400 mb-6">Browse extension documentation for each system supported by AnymeX.</p>

          <div className="flex flex-wrap gap-3">
            {EXT_SYSTEMS.map(sys => (
              <a
                key={sys.name}
                href={sys.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border ${sys.border} hover:bg-white/[0.06] hover:border-opacity-60 transition-all`}
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{sys.name}</span>
                  <span className="text-[10px] text-gray-500">{sys.description}</span>
                </div>
                <div className="flex items-center gap-1 ml-1">
                  {sys.platforms.map(p => {
                    const plat = PLATFORM_ICONS[p]
                    return (
                      <span
                        key={p}
                        title={plat.label}
                        className={`w-6 h-6 rounded-md bg-white/5 border border-white/[0.08] flex items-center justify-center ${plat.color}`}
                      >
                        {plat.icon}
                      </span>
                    )
                  })}
                </div>
                <ExternalLink className={`w-3 h-3 ${sys.color} opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0`} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick tip */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200 mb-0.5">New to AnymeX?</p>
              <p className="text-xs text-gray-400">Start with the <Link href="/guide" className="text-emerald-400 hover:text-emerald-300 transition-colors">Setup Guide</Link> first, then check the <Link href="/download-guide" className="text-amber-400 hover:text-amber-300 transition-colors">Download Guide</Link> to learn how to download content for offline use.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#0a0a0f]/80">
        <div className="px-4 sm:px-6 py-4 max-w-4xl mx-auto w-full flex items-center justify-between">
          <span className="text-xs text-gray-700">AnymeX Guides</span>
          <Link href="/guides" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Guides</Link>
        </div>
      </footer>
    </div>
  )
}

// ============ SUSPENSE WRAPPER ============

export default function GuidesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-gray-100">
        <div className="w-8 h-8 border-2 border-white/20 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 mt-3">Loading...</p>
      </div>
    }>
      <GuidesContent />
    </Suspense>
  )
}
