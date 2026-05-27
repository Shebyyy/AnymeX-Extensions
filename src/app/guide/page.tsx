'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Smartphone,
  Monitor,
  Download,
  Plug,
  Check,
  BookOpen,
  Film,
  Tv,
  Settings,
  Package,
  Copy,
  Plus,
  ChevronRight,
  Apple,
} from 'lucide-react'

// ============ PLATFORM DATA ============

const MANGAYOMI_SYSTEM = [
  {
    name: 'Mangayomi',
    icon: 'https://raw.githubusercontent.com/kodjodevf/mangayomi/main/assets/app_icons/icon-red.png',
    color: 'text-red-400',
    types: ['Anime', 'Manga', 'Novels'],
    platforms: ['Android', 'iOS', 'Windows', 'macOS', 'Linux'],
  },
  {
    name: 'LNReader',
    icon: 'https://raw.githubusercontent.com/LNReader/lnreader/main/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
    color: 'text-emerald-400',
    types: ['Novels'],
    note: 'Novels under Mangayomi system',
    platforms: ['Android', 'iOS', 'Windows', 'macOS', 'Linux'],
  },
]

const PLUGIN_SYSTEM = [
  {
    name: 'Aniyomi',
    icon: 'https://aniyomi.org/img/logo-128px.png',
    color: 'text-violet-400',
    types: ['Anime', 'Manga'],
    platforms: ['Android', 'Windows', 'macOS', 'Linux'],
  },
  {
    name: 'CloudStream',
    icon: 'https://static.everythingmoe.com/icons/cloudstream.png',
    color: 'text-sky-400',
    types: ['Anime'],
    platforms: ['Android', 'Windows', 'macOS', 'Linux'],
  },
]

const SORA_SYSTEM = [
  {
    name: 'Sora',
    icon: 'https://static.everythingmoe.com/icons/sora.png',
    color: 'text-amber-400',
    types: ['Anime', 'Manga', 'Novels'],
    platforms: ['Android', 'iOS', 'Windows', 'macOS', 'Linux'],
  },
]

// ============ HELPERS ============

function PlatformBadges({ platforms, size = 'xs' }: { platforms: string[], size?: 'xs' | 'sm' }) {
  const sz = size === 'xs' ? 'text-[8px] px-1 py-0.5' : 'text-[9px] px-1.5 py-0.5'
  const iconSz = size === 'xs' ? 'w-2 h-2' : 'w-2.5 h-2.5'
  return (
    <div className="flex items-center gap-0.5 flex-wrap">
      {platforms.map(p => (
        <span key={p} className={`inline-flex items-center gap-0.5 rounded bg-white/5 border border-white/10 font-medium text-gray-400 ${sz}`}>
          {p === 'iOS' && <Apple className={iconSz} />}
          {p === 'Android' && <Smartphone className={iconSz} />}
          {(p === 'Windows' || p === 'macOS' || p === 'Linux') && <Monitor className={iconSz} />}
          {p}
        </span>
      ))}
    </div>
  )
}

function NoIOSBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-red-500/10 border border-red-500/20 text-red-400">
      <Apple className="w-2.5 h-2.5" />
      Not on iOS
    </span>
  )
}

// ============ MAIN COMPONENT ============

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState(0)

  const sections = [
    {
      id: 'install',
      title: 'Install AnymeX',
      icon: <Download className="w-4 h-4" />,
      color: 'text-white',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">Download and install AnymeX on your device.</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { name: 'Android', icon: <Smartphone className="w-5 h-5" /> },
              { name: 'iOS', icon: <Apple className="w-5 h-5" /> },
              { name: 'Windows', icon: <Monitor className="w-5 h-5" /> },
              { name: 'Linux', icon: <Monitor className="w-5 h-5" /> },
              { name: 'macOS', icon: <Monitor className="w-5 h-5" /> },
            ].map(p => (
              <div key={p.name} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="text-gray-400">{p.icon}</div>
                <span className="text-xs font-medium text-gray-300">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[11px] text-gray-400">
              On first launch: grant <strong className="text-white">Storage</strong> &amp; <strong className="text-white">Install</strong> permissions (Android), select your tracking service (AniList/MAL/Simkl).
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'systems',
      title: 'Which Extensions Do You Want?',
      icon: <Package className="w-4 h-4" />,
      color: 'text-amber-400',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            There are 2 groups. Pick what you need — you don&apos;t have to use all of them.
          </p>

          {/* Quick Links */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-xs font-semibold text-gray-300">Browse by System</span>
            </div>
            <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: 'Mangayomi', color: 'text-red-400', bg: 'bg-red-500/5 border-red-500/15 hover:bg-red-500/10', href: '/extensions?platform=mangayomi' },
                { name: 'LNReader', color: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/15 hover:bg-emerald-500/10', href: '/extensions?platform=lnreader' },
                { name: 'Sora', color: 'text-amber-400', bg: 'bg-amber-500/5 border-amber-500/15 hover:bg-amber-500/10', href: '/extensions?platform=sora' },
                { name: 'Aniyomi', color: 'text-violet-400', bg: 'bg-violet-500/5 border-violet-500/15 hover:bg-violet-500/10', href: '/extensions?platform=aniyomi' },
                { name: 'CloudStream', color: 'text-sky-400', bg: 'bg-sky-500/5 border-sky-500/15 hover:bg-sky-500/10', href: '/extensions?platform=cloudstream' },
                { name: 'Mihon', color: 'text-gray-400', bg: 'bg-white/5 border-white/10 hover:bg-white/10', href: '/extensions?platform=mihon' },
              ].map(s => (
                <Link key={s.name} href={s.href} className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${s.bg}`}>
                  <span className={`text-xs font-semibold ${s.color}`}>{s.name}</span>
                  <span className="text-[9px] text-gray-500 ml-auto">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* No Plugin Needed */}
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 overflow-hidden">
            <div className="px-4 py-3 bg-emerald-500/8 border-b border-emerald-500/15">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">No Plugin Needed</span>
              </div>
              <p className="text-[11px] text-emerald-400/60 mt-0.5 ml-6">Works out of the box on all platforms including iOS.</p>
            </div>
            <div className="p-4 space-y-2">
              {[
                ...MANGAYOMI_SYSTEM,
                ...SORA_SYSTEM,
              ].map(p => (
                <div key={p.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <img src={p.icon} alt="" className="w-7 h-7 rounded object-contain" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${p.color}`}>{p.name}</span>
                      {p.note && <span className="text-[8px] text-gray-500">({p.note})</span>}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                      {p.types.map(t => (
                        <span key={t} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-white/5 border border-white/10 text-gray-400">
                          {t === 'Anime' && <Film className="w-2.5 h-2.5" />}
                          {t === 'Manga' && <BookOpen className="w-2.5 h-2.5" />}
                          {t === 'Novels' && <Tv className="w-2.5 h-2.5" />}
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <PlatformBadges platforms={p.platforms} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plugin Required */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/15 overflow-hidden">
            <div className="px-4 py-3 bg-amber-500/8 border-b border-amber-500/15">
              <div className="flex items-center gap-2">
                <Plug className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-amber-300">Plugin Required</span>
              </div>
              <p className="text-[11px] text-amber-400/60 mt-0.5 ml-6">Needs the Runtime Bridge Plugin. Not available on iOS.</p>
            </div>
            <div className="p-4 space-y-2">
              {PLUGIN_SYSTEM.map(p => (
                <div key={p.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <img src={p.icon} alt="" className="w-7 h-7 rounded object-contain" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${p.color}`}>{p.name}</span>
                      <NoIOSBadge />
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {p.types.map(t => (
                        <span key={t} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-white/5 border border-white/10 text-gray-400">
                          {t === 'Anime' && <Film className="w-2.5 h-2.5" />}
                          {t === 'Manga' && <BookOpen className="w-2.5 h-2.5" />}
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <PlatformBadges platforms={p.platforms} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <p className="text-[11px] text-gray-400">
              <strong className="text-white">Only want Mangayomi, LNReader or Sora?</strong> Skip the plugin, you&apos;re good to go — even on iOS. <strong className="text-white">Want Aniyomi or CloudStream?</strong> You need the plugin (not available on iOS).
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'plugin',
      title: 'Install the Plugin (If You Need It)',
      icon: <Plug className="w-4 h-4" />,
      color: 'text-amber-400',
      content: (
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <p className="text-sm text-gray-400">
              Only needed for <strong className="text-violet-400">Aniyomi</strong> &amp; <strong className="text-sky-400">CloudStream</strong>. Skip this if you only use Mangayomi, LNReader or Sora.
            </p>
          </div>

          {/* iOS Warning */}
          <div className="p-3 rounded-lg bg-red-500/8 border border-red-500/15">
            <div className="flex items-start gap-2">
              <Apple className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-red-400/80">
                <strong className="text-red-300">iOS users:</strong> Aniyomi &amp; CloudStream are not available on iOS. You can only use Mangayomi, LNReader &amp; Sora.
              </p>
            </div>
          </div>

          {/* Visual path */}
          <div className="flex items-center justify-center gap-1 flex-wrap py-2">
            {[
              { label: 'Profile', icon: '👤' },
              { label: 'Settings', icon: '⚙️' },
              { label: 'Extensions', icon: '📦' },
              { label: '⚙️ (top right)', icon: '' },
              { label: 'Download Plugin', icon: '⬇️' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1]">
                  {step.icon && <span className="text-sm">{step.icon}</span>}
                  <span className="text-[11px] font-medium text-gray-300">{step.label}</span>
                </div>
                {i < 4 && <ChevronRight className="w-3.5 h-3.5 text-gray-600" />}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {[
              'Open AnymeX → Go to Profile',
              'Tap Settings',
              'Tap Extensions',
              'Tap the ⚙️ settings icon in the top right corner',
              'Tap Download Plugin and wait for it to install',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-gray-300">{i + 1}</div>
                <p className="text-xs font-medium text-gray-300" dangerouslySetInnerHTML={{
                  __html: step
                    .replace('Profile', '<strong class="text-white">Profile</strong>')
                    .replace('Settings', '<strong class="text-white">Settings</strong>')
                    .replace('Extensions', '<strong class="text-white">Extensions</strong>')
                    .replace('⚙️', '<Settings class="w-3.5 h-3.5 inline text-gray-400" />')
                    .replace('Download Plugin', '<strong class="text-white">Download Plugin</strong>')
                }} />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-1.5 px-1">
            <Badge variant="outline" className="text-[9px] bg-violet-500/10 text-violet-400 border-violet-500/20">Android → APK</Badge>
            <Badge variant="outline" className="text-[9px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Desktop → JAR</Badge>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-400/80">Once installed, Aniyomi &amp; CloudStream tabs will unlock in your Extensions page.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'add-repo',
      title: 'Add Extensions to AnymeX',
      icon: <Plus className="w-4 h-4" />,
      color: 'text-emerald-400',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            There are 2 ways to add extensions. Use whichever works for your device.
          </p>

          {/* Method 1: One-Click */}
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 overflow-hidden">
            <div className="px-4 py-3 bg-emerald-500/8 border-b border-emerald-500/15">
              <div className="flex items-center gap-2">
                <span className="text-sm">👆</span>
                <span className="text-sm font-semibold text-emerald-300">Method 1: One-Click Install</span>
              </div>
              <p className="text-[11px] text-emerald-400/60 mt-0.5 ml-7">Just tap &quot;Install&quot; or &quot;Add Repo&quot; on this website — AnymeX opens automatically.</p>
            </div>
            <div className="p-4 space-y-3">
              {[
                { emoji: '👆', text: 'On this site, tap the <strong class="text-emerald-400">Install</strong> or <strong class="text-emerald-400">Add Repo</strong> button' },
                { emoji: '📱', text: 'AnymeX opens and adds the repo automatically' },
                { emoji: '✅', text: 'Done! Browse the Available tab and install extensions' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/[0.05]">
                  <span className="text-sm">{step.emoji}</span>
                  <p className="text-xs font-medium text-gray-300" dangerouslySetInnerHTML={{ __html: step.text }} />
                </div>
              ))}

              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                <p className="text-[10px] text-gray-500">
                  <strong className="text-gray-400">Mangayomi + LNReader:</strong> One-click works on <strong className="text-gray-300">all platforms</strong> (Android, iOS, Windows, macOS, Linux).
                </p>
                <p className="text-[10px] text-gray-500">
                  <strong className="text-gray-400">Aniyomi, CloudStream &amp; Sora:</strong> One-click only works on <strong className="text-gray-300">Android</strong>. Other platforms use Method 2.
                </p>
              </div>
            </div>
          </div>

          {/* Method 2: Copy & Paste */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/15 overflow-hidden">
            <div className="px-4 py-3 bg-amber-500/8 border-b border-amber-500/15">
              <div className="flex items-center gap-2">
                <span className="text-sm">📋</span>
                <span className="text-sm font-semibold text-amber-300">Method 2: Copy &amp; Paste URL (All Platforms)</span>
              </div>
              <p className="text-[11px] text-amber-400/60 mt-0.5 ml-7">Copy the repo URL from this site, then paste it inside AnymeX manually.</p>
            </div>
            <div className="p-4 space-y-3">
              {[
                'On this site, tap <strong class="text-amber-400">Copy URL</strong> on any extension or repo',
                'Open AnymeX → <strong class="text-white">Extensions</strong> tab',
                'Select the <strong class="text-white">extension system</strong> (Mangayomi, Aniyomi, Sora, etc.)',
                'Select the <strong class="text-white">type</strong> (Anime, Manga, or Novels)',
                'Tap <strong class="text-white">+ Add Repo</strong>',
                '<strong class="text-white">Paste</strong> the URL → Tap <strong class="text-white">Add Repository</strong>',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/[0.05]">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-amber-400">{i + 1}</div>
                  <p className="text-xs font-medium text-gray-300" dangerouslySetInnerHTML={{ __html: step }} />
                </div>
              ))}

              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <p className="text-[10px] text-gray-500">
                  <strong className="text-gray-400">Works for:</strong> All platforms. Use this if one-click doesn&apos;t work on your device. iOS users use this for Sora repos.
                </p>
              </div>
            </div>
          </div>

          {/* Quick reference: where to add */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-xs font-semibold text-gray-300">Where to Add in AnymeX</span>
            </div>
            <div className="p-3 space-y-2">
              {[
                { system: 'Mangayomi', types: 'Anime, Manga, Novels', where: 'Extensions → Mangayomi tab → Select type', color: 'text-red-400', platforms: 'All platforms' },
                { system: 'LNReader', types: 'Novels', where: 'Extensions → Mangayomi tab → Novels', color: 'text-emerald-400', platforms: 'All platforms' },
                { system: 'Sora', types: 'Anime, Manga, Novels', where: 'Extensions → Sora tab → Select type', color: 'text-amber-400', platforms: 'All platforms' },
                { system: 'Aniyomi', types: 'Anime, Manga', where: 'Extensions → Aniyomi tab → Select type', color: 'text-violet-400', platforms: 'Android, Win, Mac, Linux' },
                { system: 'CloudStream', types: 'Anime', where: 'Extensions → CloudStream tab', color: 'text-sky-400', platforms: 'Android, Win, Mac, Linux' },
              ].map(row => (
                <div key={row.system} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
                  <span className={`text-[11px] font-semibold ${row.color} w-20 flex-shrink-0`}>{row.system}</span>
                  <span className="text-[10px] text-gray-600 w-20 flex-shrink-0">{row.types}</span>
                  <span className="text-[10px] text-gray-500 w-28 flex-shrink-0">{row.platforms}</span>
                  <span className="text-[10px] text-gray-400">{row.where}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'done',
      title: 'Start Using Extensions',
      icon: <Check className="w-4 h-4" />,
      color: 'text-emerald-400',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center">You&apos;re all set! Here&apos;s how to start using your extensions.</p>

          <div className="space-y-2">
            {[
              'Go to the <strong class="text-white">Extensions</strong> tab in AnymeX',
              'Switch to the <strong class="text-white">Installed</strong> tab to see your extensions',
              'Switch your <strong class="text-white">service mode to Extensions</strong> using the service selector',
              'Search for anime/manga/novels using your installed extensions',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-gray-300">{i + 1}</div>
                <p className="text-xs font-medium text-gray-300" dangerouslySetInnerHTML={{ __html: step }} />
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <p className="text-[11px] text-gray-400">
              <strong className="text-white">Tips:</strong> Extensions auto-check for updates. You can configure extension settings, reorder, or uninstall from the Installed tab.
            </p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="px-4 sm:px-6 py-3 sm:py-4 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="AnymeX" className="w-7 h-7 rounded-lg object-contain" />
              <Link href="/extensions" className="text-base sm:text-lg font-semibold text-gray-100 hover:text-white transition-colors">
                AnymeX Extensions
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/extensions"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-medium text-gray-500 hover:text-gray-300 transition-all"
              >
                <Package className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Extensions</span>
              </Link>
              <Link
                href="/repos"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-medium text-gray-500 hover:text-gray-300 transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Repos</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-3 sm:px-6 py-6 sm:py-8 flex-1 max-w-4xl mx-auto w-full">
        {/* Step navigation */}
        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(i)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeSection === i
                  ? 'bg-white/10 text-white border border-white/15'
                  : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:bg-white/[0.06] hover:text-gray-300'
              }`}
            >
              {section.icon}
              <span className="hidden sm:inline">{section.title}</span>
              <span className="sm:hidden text-[13px]">{i + 1}</span>
            </button>
          ))}
        </div>

        {/* Step content */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 ${sections[activeSection].color}`}>
              {sections[activeSection].icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-500">STEP {activeSection + 1} OF {sections.length}</span>
              </div>
              <h2 className="text-base font-semibold text-white">{sections[activeSection].title}</h2>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-4">
            {sections[activeSection].content}
          </div>

          {/* Bottom nav */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
              className="text-gray-500 hover:text-white"
            >
              ← Previous
            </Button>
            <div className="flex items-center gap-1">
              {sections.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeSection ? 'bg-white w-4' : 'bg-white/20'}`} />
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
              disabled={activeSection === sections.length - 1}
              className="text-gray-500 hover:text-white"
            >
              Next →
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Common Questions</h3>
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1" className="border-white/[0.06]">
                <AccordionTrigger className="text-xs font-medium text-gray-300 hover:text-white hover:no-underline">
                  Do I need the plugin?
                </AccordionTrigger>
                <AccordionContent className="text-[11px] text-gray-400">
                  <strong className="text-white">Only if you want Aniyomi or CloudStream.</strong> Mangayomi, LNReader and Sora work without any plugin. Also, the plugin is not available on iOS — iOS users can only use Mangayomi, LNReader &amp; Sora.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="border-white/[0.06]">
                <AccordionTrigger className="text-xs font-medium text-gray-300 hover:text-white hover:no-underline">
                  I tapped Install but nothing happened
                </AccordionTrigger>
                <AccordionContent className="text-[11px] text-gray-400">
                  One-click install works for Mangayomi/LNReader on all platforms, and for Aniyomi/CloudStream/Sora on Android only. If it doesn&apos;t work, use <strong className="text-white">Method 2: Copy &amp; Paste</strong> instead — copy the URL from this site, then manually add it in AnymeX.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="border-white/[0.06]">
                <AccordionTrigger className="text-xs font-medium text-gray-300 hover:text-white hover:no-underline">
                  How do I manually add a repo?
                </AccordionTrigger>
                <AccordionContent className="text-[11px] text-gray-400">
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Go to <Link href="/repos" className="text-white underline underline-offset-2">Repos</Link> and tap <strong className="text-white">Copy URL</strong></li>
                    <li>Open AnymeX → <strong className="text-white">Extensions</strong></li>
                    <li>Select the system (Mangayomi, Aniyomi, etc.)</li>
                    <li>Select the type (Anime, Manga, or Novels)</li>
                    <li>Tap <strong className="text-white">+ Add Repo</strong> → Paste URL → <strong className="text-white">Add Repository</strong></li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="border-white/[0.06]">
                <AccordionTrigger className="text-xs font-medium text-gray-300 hover:text-white hover:no-underline">
                  What&apos;s the difference between Mangayomi and LNReader?
                </AccordionTrigger>
                <AccordionContent className="text-[11px] text-gray-400">
                  They both use the same system inside AnymeX. <strong className="text-white">Mangayomi</strong> is for anime, manga &amp; novels. <strong className="text-white">LNReader</strong> is specifically for novels. Both work the same way — add repos under the Mangayomi tab. <Link href="/repos?platform=mangayomi" className="text-white underline underline-offset-2">Browse Mangayomi repos</Link> or <Link href="/repos?platform=lnreader" className="text-white underline underline-offset-2">Browse LNReader repos</Link>.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5" className="border-white/[0.06]">
                <AccordionTrigger className="text-xs font-medium text-gray-300 hover:text-white hover:no-underline">
                  Where do I find repos for each system?
                </AccordionTrigger>
                <AccordionContent className="text-[11px] text-gray-400 space-y-1">
                  <p>Each system has its own repos on this site:</p>
                  <ul className="space-y-0.5 ml-2">
                    <li>🔴 <Link href="/repos?platform=mangayomi" className="text-white underline underline-offset-2">Mangayomi repos</Link> (anime, manga, novels)</li>
                    <li>🟢 <Link href="/repos?platform=lnreader" className="text-white underline underline-offset-2">LNReader repos</Link> (novels only)</li>
                    <li>🟡 <Link href="/repos?platform=sora" className="text-white underline underline-offset-2">Sora repos</Link> (anime, manga, novels)</li>
                    <li>🟣 <Link href="/repos?platform=aniyomi" className="text-white underline underline-offset-2">Aniyomi repos</Link> (anime, manga)</li>
                    <li>🔵 <Link href="/repos?platform=cloudstream" className="text-white underline underline-offset-2">CloudStream repos</Link> (anime)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-6" className="border-white/[0.06]">
                <AccordionTrigger className="text-xs font-medium text-gray-300 hover:text-white hover:no-underline">
                  Can I use this on iOS?
                </AccordionTrigger>
                <AccordionContent className="text-[11px] text-gray-400">
                  <strong className="text-white">Yes, but only Mangayomi, LNReader &amp; Sora.</strong> Aniyomi &amp; CloudStream are not available on iOS because they require the Runtime Bridge Plugin which isn&apos;t supported on iOS. For Mangayomi/LNReader, one-click works on iOS. For Sora, use the Copy &amp; Paste method. <Link href="/repos?platform=mangayomi&platform=lnreader&platform=sora" className="text-white underline underline-offset-2">Browse iOS-compatible repos</Link>.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-7" className="border-white/[0.06]">
                <AccordionTrigger className="text-xs font-medium text-gray-300 hover:text-white hover:no-underline">
                  Can I use this on Windows/macOS/Linux?
                </AccordionTrigger>
                <AccordionContent className="text-[11px] text-gray-400">
                  <strong className="text-white">Yes, all extension systems work on desktop.</strong> For Mangayomi/LNReader, one-click works. For Aniyomi, CloudStream &amp; Sora, use the Copy &amp; Paste method. You&apos;ll also need to install the Runtime Bridge Plugin (JAR) for Aniyomi &amp; CloudStream.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-8" className="border-white/[0.06]">
                <AccordionTrigger className="text-xs font-medium text-gray-300 hover:text-white hover:no-underline">
                  How do I filter extensions by type?
                </AccordionTrigger>
                <AccordionContent className="text-[11px] text-gray-400">
                  Use the filter buttons at the top of the <Link href="/extensions" className="text-white underline underline-offset-2">Extensions</Link> or <Link href="/repos" className="text-white underline underline-offset-2">Repos</Link> page. You can also use URL parameters directly: <Link href="/extensions?platform=sora&type=anime" className="text-white underline underline-offset-2">/extensions?platform=sora&amp;type=anime</Link> shows only Sora anime extensions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#0a0a0f]/80">
        <div className="px-4 sm:px-6 py-4 max-w-4xl mx-auto w-full flex items-center justify-between">
          <span className="text-[10px] text-gray-700">AnymeX Extension Guide</span>
          <div className="flex items-center gap-3">
            <Link href="/extensions" className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors">Extensions</Link>
            <Link href="/repos" className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors">Repos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
