'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import {
  Smartphone,
  Monitor,
  Download,
  Plug,
  Check,
  ChevronRight,
  Apple,
  Package,
  Copy,
  BookOpen,
  ExternalLink,
  User,
  Settings,
  RefreshCw,
  ArrowDown,
  MousePointerClick,
  ClipboardList,
  Film,
  Tv2,
  CheckCircle2,
} from 'lucide-react'
import GuideSidebar from '@/components/GuideSidebar'

// ============ TYPES ============

type Platform = 'android' | 'ios' | 'windows' | 'macos' | 'linux'

interface Step {
  id: string
  title: string
  icon: React.ReactNode
  breadcrumbs?: { label: string; icon?: React.ReactNode }[]
  instruction: string
  details?: React.ReactNode
  tip?: string
  warning?: string
}

// ============ PLATFORM CONFIG ============

const PLATFORMS: { id: Platform; name: string; icon: React.ReactNode; color: string }[] = [
  { id: 'android', name: 'Android', icon: <Smartphone className="w-4 h-4" />, color: 'text-emerald-400' },
  { id: 'ios', name: 'iOS', icon: <Apple className="w-4 h-4" />, color: 'text-gray-300' },
  { id: 'windows', name: 'Windows', icon: <Monitor className="w-4 h-4" />, color: 'text-sky-400' },
  { id: 'macos', name: 'macOS', icon: <Monitor className="w-4 h-4" />, color: 'text-violet-400' },
  { id: 'linux', name: 'Linux', icon: <Monitor className="w-4 h-4" />, color: 'text-amber-400' },
]

// ============ STEP DATA PER PLATFORM ============

function getSteps(platform: Platform, useBeta: boolean): Step[] {
  const DL = '/api/download'
  const channel = useBeta ? 'beta' : 'stable'

  const getDownloadDetails = (p: Platform): React.ReactNode => {
    const builds: Record<Platform, { label: string; href: string; note: string; color: string }[]> = {
      android: [
        { label: 'AnymeX-arm64-v8a.apk', href: `${DL}?channel=${channel}&platform=android-arm64`, note: 'Most phones', color: 'text-emerald-400 group-hover:text-emerald-300' },
        { label: 'AnymeX-x86_64.apk', href: `${DL}?channel=${channel}&platform=android-x86_64`, note: 'Emulators', color: 'text-emerald-400 group-hover:text-emerald-300' },
        { label: 'AnymeX-universal.apk', href: `${DL}?channel=${channel}&platform=android-universal`, note: 'All devices', color: 'text-emerald-400 group-hover:text-emerald-300' },
      ],
      ios: [
        { label: 'AnymeX.ipa', href: `${DL}?channel=${channel}&platform=ios`, note: 'Sideload', color: 'text-gray-300 group-hover:text-white' },
      ],
      windows: [
        { label: 'AnymeX-Windows.zip', href: `${DL}?channel=${channel}&platform=windows-zip`, note: 'Portable', color: 'text-sky-400 group-hover:text-sky-300' },
        { label: 'AnymeX-Installer.exe', href: `${DL}?channel=${channel}&platform=windows-installer`, note: 'Installer', color: 'text-sky-400 group-hover:text-sky-300' },
      ],
      macos: [
        { label: 'AnymeX.dmg', href: `${DL}?channel=${channel}&platform=macos`, note: 'macOS', color: 'text-violet-400 group-hover:text-violet-300' },
      ],
      linux: [
        { label: 'AnymeX-Linux.AppImage', href: `${DL}?channel=${channel}&platform=linux-appimage`, note: 'AppImage', color: 'text-amber-400 group-hover:text-amber-300' },
        { label: 'AnymeX-Linux.rpm', href: `${DL}?channel=${channel}&platform=linux-rpm`, note: 'RPM', color: 'text-amber-400 group-hover:text-amber-300' },
        { label: 'AnymeX-Linux.zip', href: `${DL}?channel=${channel}&platform=linux-zip`, note: 'Portable', color: 'text-amber-400 group-hover:text-amber-300' },
      ],
    }

    return (
      <div className="space-y-2">
        {builds[p].map((b, i) => (
          <a key={i} href={b.href} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group">
            <Download className={`w-4 h-4 ${b.color}`} />
            <span className="text-sm text-gray-300 group-hover:text-white">{b.label}</span>
            <span className="text-xs text-gray-600 ml-auto">{b.note}</span>
          </a>
        ))}
      </div>
    )
  }

  const needsPlugin = platform !== 'ios'

  const steps: Step[] = [
    {
      id: 'download',
      title: 'Download & Install',
      icon: <Download className="w-5 h-5" />,
      instruction: 'Download AnymeX for your device and install it.',
      details: getDownloadDetails(platform),
      tip: platform === 'android'
        ? 'On first launch, grant Storage & Install permissions, then select your tracking service (AniList/MAL/Simkl).'
        : platform === 'ios'
        ? 'You need to sideload the IPA using AltStore, Sideloadly, or similar tools.'
        : 'On first launch, select your tracking service (AniList/MAL/Simkl).',
    },
  ]

  if (needsPlugin) {
    steps.push({
      id: 'plugin',
      title: 'Install Plugin',
      icon: <Plug className="w-5 h-5" />,
      breadcrumbs: [
        { label: 'Profile', icon: <User className="w-3.5 h-3.5" /> },
        { label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
        { label: 'Extensions', icon: <Package className="w-3.5 h-3.5" /> },
        { label: 'Settings (top right)', icon: <Settings className="w-3.5 h-3.5" /> },
        { label: 'Download Plugin', icon: <ArrowDown className="w-3.5 h-3.5" /> },
        { label: 'Restart App', icon: <RefreshCw className="w-3.5 h-3.5" /> },
      ],
      instruction: 'Install the Runtime Bridge Plugin to unlock Aniyomi & CloudStream extensions.',
      details: (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">Needed for Aniyomi</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">Needed for CloudStream</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Not needed for Mangayomi/LNReader/Sora</span>
          </div>

        </div>
      ),
      tip: 'After downloading & installing the plugin, restart the app. Once restarted, Aniyomi & CloudStream tabs will appear in your Extensions page.'
    })
  }

  steps.push({
    id: 'add-repo',
    title: 'Add Repository',
    icon: <Copy className="w-5 h-5" />,
    breadcrumbs: [
      { label: 'Profile', icon: <User className="w-3.5 h-3.5" /> },
      { label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
      { label: 'Extensions', icon: <Package className="w-3.5 h-3.5" /> },
      { label: 'Select System & Type' },
      { label: '+ Add Repo' },
      { label: 'Paste URL' },
      { label: 'Add Repository' },
    ],
    instruction: 'Add extension repos to AnymeX so you can browse and install extensions.',
    details: (
      <div className="space-y-3">
        {/* Two methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Method 1: One-click */}
          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
            <div className="flex items-center gap-2 mb-2">
              <MousePointerClick className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-300">One-Click</span>
            </div>
            <p className="text-xs text-gray-400">On this site, tap <strong className="text-emerald-400">Install</strong> or <strong className="text-emerald-400">Add Repo</strong>. AnymeX opens and adds it automatically.</p>
            <div className="mt-2 text-xs text-gray-500">
              {platform === 'android' ? (
                <span>Works for <strong className="text-gray-300">all systems</strong> on Android.</span>
              ) : platform === 'ios' ? (
                <span>Works for <strong className="text-gray-300">Mangayomi & LNReader</strong> on iOS. Use Manual for Sora.</span>
              ) : (
                <span>Works for <strong className="text-gray-300">Mangayomi & LNReader</strong>. Use Manual for others.</span>
              )}
            </div>
          </div>

          {/* Method 2: Manual */}
          <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/15">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">Manual</span>
            </div>
            <p className="text-xs text-gray-400">Copy the repo URL from this site, then paste it inside AnymeX.</p>
            <div className="mt-2">
              <Link href="/repos" className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors">
                <Copy className="w-3 h-3" /> Browse & copy repos
              </Link>
            </div>
          </div>
        </div>

        {platform === 'ios' && (
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <p className="text-xs text-gray-400">
              <strong className="text-white">iOS note:</strong> Only <strong className="text-emerald-400">Mangayomi</strong>, <strong className="text-emerald-400">LNReader</strong> & <strong className="text-amber-400">Sora</strong> repos work on iOS. Aniyomi & CloudStream are not available.
            </p>
          </div>
        )}
      </div>
    ),
    tip: 'You can add multiple repos. Each system (Mangayomi, Aniyomi, etc.) has its own repos.',
  })

  steps.push({
    id: 'install-ext',
    title: 'Install Extension',
    icon: <Package className="w-5 h-5" />,
    breadcrumbs: [
      { label: 'Profile', icon: <User className="w-3.5 h-3.5" /> },
      { label: 'Extensions', icon: <Package className="w-3.5 h-3.5" /> },
      { label: 'Available anime/manga/novel' },
      { label: 'Tap download icon', icon: <ArrowDown className="w-3.5 h-3.5" /> },
    ],
    instruction: 'Browse available extensions and install the ones you want.',
    details: (
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <p className="text-xs text-gray-400">
            Go to <strong className="text-white">Profile → Extensions</strong>. Under <strong className="text-white">Available</strong> anime/manga/novel, find the extension you want and tap the <strong className="text-white">download icon</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1]">
            <Package className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-300">Available</span>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Installed</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
          <p className="text-xs text-emerald-400/80">
            After installing, you&apos;ll see the extension under the <strong className="text-emerald-300">Installed</strong> tab for that anime/manga/novel category.
          </p>
        </div>
      </div>
    ),
    tip: 'Extensions auto-check for updates, so you don\'t need to manually update them.',
  })

  steps.push({
    id: 'use',
    title: 'Use Extension',
    icon: <BookOpen className="w-5 h-5" />,
    breadcrumbs: [
      { label: 'Open any item', icon: '' },
      { label: 'Watch/Read tab', icon: '' },
      { label: 'Select extension', icon: '' },
    ],
    instruction: 'Open any anime, manga or novel and select your installed extension to start.',
    details: (
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <p className="text-xs text-gray-400">
            Open any anime/manga/novel → Go to the <strong className="text-white">Watch</strong> or <strong className="text-white">Read</strong> tab → Select your installed extension from the list.
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1]">
            <Film className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-300">Open anime</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1]">
            <Tv2 className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-300">Watch tab</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Select extension</span>
          </div>
        </div>
      </div>
    ),
  })

  return steps
}

// ============ BREADCRUMB PATH COMPONENT ============

function BreadcrumbPath({ items }: { items: { label: string; icon?: React.ReactNode }[] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap py-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1]">
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span className="text-xs font-medium text-gray-300">{item.label}</span>
          </div>
          {i < items.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-gray-600" />}
        </div>
      ))}
    </div>
  )
}

// ============ MAIN COMPONENT ============

function GuideContent() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [useBeta, setUseBeta] = useState(false)

  // Read URL params on mount
  useEffect(() => {
    const p = searchParams.get('platform')
    const s = searchParams.get('step')
    const b = searchParams.get('beta')

    if (p && ['android', 'ios', 'windows', 'macos', 'linux'].includes(p)) {
      setSelectedPlatform(p as Platform)
    }
    if (s) {
      const stepNum = parseInt(s, 10)
      if (!isNaN(stepNum) && stepNum >= 1) {
        setCurrentStep(stepNum - 1)
      }
    }
    if (b === '1') {
      setUseBeta(true)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const steps = selectedPlatform ? getSteps(selectedPlatform, useBeta) : []
  const totalSteps = steps.length

  // Clamp step if it exceeds total (e.g. switching from Android step 5 to iOS which has 4)
  const safeStep = selectedPlatform ? Math.min(currentStep, totalSteps - 1) : 0
  if (selectedPlatform && safeStep !== currentStep) {
    setCurrentStep(safeStep)
  }

  // Update URL when state changes
  const updateUrl = useCallback((platform: Platform | null, step: number, beta: boolean) => {
    const sp = new URLSearchParams()
    if (platform) {
      sp.set('platform', platform)
      sp.set('step', String(step + 1))
      if (beta) sp.set('beta', '1')
    }
    const str = sp.toString()
    window.history.replaceState(null, '', `${pathname}${str ? `?${str}` : ''}`)
  }, [pathname])

  // Sync URL on state change
  useEffect(() => {
    updateUrl(selectedPlatform, safeStep, useBeta)
  }, [selectedPlatform, safeStep, useBeta, updateUrl])

  // Handle platform selection
  const handlePlatformChange = (p: Platform) => {
    setSelectedPlatform(p)
    setCurrentStep(0)
  }

  const handlePlatformReset = () => {
    setSelectedPlatform(null)
    setCurrentStep(0)
  }

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
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium text-gray-500 hover:text-gray-300 transition-all"
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Extensions</span>
              </Link>
              <Link
                href="/repos"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium text-gray-500 hover:text-gray-300 transition-all"
              >
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Repos</span>
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium text-white bg-white/10 border border-white/20 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Guides</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6 sm:py-8 flex-1 max-w-4xl mx-auto w-full">
        {/* Sidebar FAB */}
        <GuideSidebar />

        {/* Title */}
        <div className="mb-1">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Setup Guide</h1>
        </div>
        <p className="text-sm text-gray-400 mb-6">Follow the steps for your device to get started with AnymeX extensions.</p>

        {/* ===== NO PLATFORM SELECTED: Show platform picker ===== */}
        {!selectedPlatform && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">What device are you using? Select your platform to get started.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => handlePlatformChange(p.id)}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${p.color} group-hover:scale-110 transition-transform`}>
                    {p.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ===== PLATFORM SELECTED: Show guide steps ===== */}
        {selectedPlatform && (
          <>
            {/* Platform pill + change button */}
            <div className="mb-6 flex items-center gap-2">
              {PLATFORMS.filter(p => p.id === selectedPlatform).map(p => (
                <span key={p.id} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-white/10 border border-white/20 ${p.color}`}>
                  {p.icon}
                  {p.name}
                </span>
              ))}
              <button
                onClick={handlePlatformReset}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors ml-1"
              >
                Change
              </button>
            </div>

            {/* Stable / Beta Toggle */}
            <div className="mb-6 flex items-center gap-2">
              <button
                onClick={() => setUseBeta(false)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  !useBeta ? 'bg-white/10 text-white border-white/15' : 'text-gray-500 hover:text-gray-300 border-transparent hover:border-white/[0.06]'
                }`}
              >
                Stable
              </button>
              <button
                onClick={() => setUseBeta(true)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  useBeta ? 'bg-amber-500/15 text-amber-400 border-amber-500/25' : 'text-gray-500 hover:text-gray-300 border-transparent hover:border-white/[0.06]'
                }`}
              >
                Beta
              </button>
              <a
                href={useBeta ? 'https://github.com/Shebyyy/AnymeX-Preview/releases/latest' : 'https://github.com/RyanYuuki/AnymeX/releases/latest'}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                All releases →
              </a>
            </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center gap-1 mb-2">
            {steps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(i)}
                className="flex-1 group"
              >
                <div className={`h-1.5 rounded-full transition-all ${
                  i <= safeStep ? 'bg-emerald-500' : 'bg-white/10'
                }`} />
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Step {safeStep + 1} of {totalSteps}
            </span>
            {selectedPlatform === 'ios' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                <Apple className="w-3 h-3" /> No plugin needed
              </span>
            )}
          </div>
        </div>

        {/* Step Content */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
          {/* Step Header */}
          <div className="px-4 sm:px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                {steps[safeStep].icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                    {safeStep + 1}
                  </span>
                  <h2 className="text-base sm:text-lg font-semibold text-white">{steps[safeStep].title}</h2>
                </div>
                <p className="text-sm text-gray-400 mt-0.5">{steps[safeStep].instruction}</p>
              </div>
            </div>
          </div>

          {/* Breadcrumb Path */}
          {steps[safeStep].breadcrumbs && (
            <div className="px-4 sm:px-6 py-3 border-b border-white/[0.06] bg-white/[0.01]">
              <p className="text-[10px] font-medium text-gray-600 uppercase tracking-wider mb-1.5">Tap Path</p>
              <BreadcrumbPath items={steps[safeStep].breadcrumbs!} />
            </div>
          )}

          {/* Step Details */}
          <div className="px-4 sm:px-6 py-4">
            {steps[safeStep].details}
          </div>

          {/* Tip */}
          {steps[safeStep].tip && (
            <div className="mx-4 sm:mx-6 mb-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-400/80">{steps[safeStep].tip}</p>
              </div>
            </div>
          )}

          {/* Warning */}
          {steps[safeStep].warning && (
            <div className="mx-4 sm:mx-6 mb-4 p-3 rounded-lg bg-red-500/5 border border-red-500/15">
              <div className="flex items-start gap-2">
                <Apple className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-400/80">{steps[safeStep].warning}</p>
              </div>
            </div>
          )}

          {/* Step Navigation */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-white/[0.06]">
            {safeStep > 0 ? (
              <button
                onClick={() => setCurrentStep(safeStep - 1)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                ← Back
              </button>
            ) : <div />}

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === safeStep ? 'bg-emerald-400 w-5' : i < safeStep ? 'bg-emerald-500/40' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {safeStep < totalSteps - 1 ? (
              <button
                onClick={() => setCurrentStep(safeStep + 1)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
              >
                Next →
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">All Done!</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/extensions" className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
              <Package className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">Browse Extensions</p>
              <p className="text-xs text-gray-500">Find and install extensions</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600 ml-auto" />
          </Link>
          <Link href="/repos" className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
              <Copy className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">Browse Repos</p>
              <p className="text-xs text-gray-500">Copy repo URLs to add manually</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600 ml-auto" />
          </Link>
        </div>

        {/* Platform Specific Notes */}
        {selectedPlatform === 'ios' && (
          <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-start gap-3">
              <Apple className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-200 mb-1">iOS Limitations</p>
                <p className="text-xs text-gray-400">On iOS, only <strong className="text-white">Mangayomi</strong>, <strong className="text-white">LNReader</strong> & <strong className="text-white">Sora</strong> extensions work. Aniyomi & CloudStream are not available because the Runtime Bridge Plugin isn&apos;t supported on iOS.</p>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#0a0a0f]/80">
        <div className="px-4 sm:px-6 py-4 max-w-4xl mx-auto w-full flex items-center justify-between">
          <span className="text-xs text-gray-700">AnymeX Extension Guide</span>
          <div className="flex items-center gap-3">
            <Link href="/extensions" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Extensions</Link>
            <Link href="/repos" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Repos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ============ SUSPENSE WRAPPER ============

export default function GuidePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-gray-100">
        <div className="w-8 h-8 border-2 border-white/20 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 mt-3">Loading guide...</p>
      </div>
    }>
      <GuideContent />
    </Suspense>
  )
}
