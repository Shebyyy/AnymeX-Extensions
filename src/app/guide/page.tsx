'use client'

import { useState } from 'react'
import Link from 'next/link'
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
} from 'lucide-react'

// ============ TYPES ============

type Platform = 'android' | 'ios' | 'windows' | 'macos' | 'linux'

interface Step {
  id: string
  title: string
  icon: React.ReactNode
  breadcrumbs?: { label: string; icon?: string }[]
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

function getSteps(platform: Platform): Step[] {
  const DL = '/api/download'

  const downloadDetails: Record<Platform, React.ReactNode> = {
    android: (
      <div className="space-y-2">
        <a href={`${DL}?channel=stable&platform=android-arm64`} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group">
          <Download className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
          <span className="text-sm text-gray-300 group-hover:text-white">AnymeX-arm64-v8a.apk</span>
          <span className="text-xs text-gray-600 ml-auto">Most phones</span>
        </a>
        <a href={`${DL}?channel=stable&platform=android-x86_64`} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group">
          <Download className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
          <span className="text-sm text-gray-300 group-hover:text-white">AnymeX-x86_64.apk</span>
          <span className="text-xs text-gray-600 ml-auto">Emulators</span>
        </a>
        <a href={`${DL}?channel=stable&platform=android-universal`} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group">
          <Download className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
          <span className="text-sm text-gray-300 group-hover:text-white">AnymeX-universal.apk</span>
          <span className="text-xs text-gray-600 ml-auto">All devices</span>
        </a>
      </div>
    ),
    ios: (
      <div className="space-y-2">
        <a href={`${DL}?channel=stable&platform=ios`} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group">
          <Download className="w-4 h-4 text-gray-300 group-hover:text-white" />
          <span className="text-sm text-gray-300 group-hover:text-white">AnymeX.ipa</span>
          <span className="text-xs text-gray-600 ml-auto">Sideload</span>
        </a>
      </div>
    ),
    windows: (
      <div className="space-y-2">
        <a href={`${DL}?channel=stable&platform=windows-zip`} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group">
          <Download className="w-4 h-4 text-sky-400 group-hover:text-sky-300" />
          <span className="text-sm text-gray-300 group-hover:text-white">AnymeX-Windows.zip</span>
          <span className="text-xs text-gray-600 ml-auto">Portable</span>
        </a>
        <a href={`${DL}?channel=stable&platform=windows-installer`} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group">
          <Download className="w-4 h-4 text-sky-400 group-hover:text-sky-300" />
          <span className="text-sm text-gray-300 group-hover:text-white">AnymeX-Installer.exe</span>
          <span className="text-xs text-gray-600 ml-auto">Installer</span>
        </a>
      </div>
    ),
    macos: (
      <div className="space-y-2">
        <a href={`${DL}?channel=stable&platform=macos`} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group">
          <Download className="w-4 h-4 text-violet-400 group-hover:text-violet-300" />
          <span className="text-sm text-gray-300 group-hover:text-white">AnymeX.dmg</span>
          <span className="text-xs text-gray-600 ml-auto">macOS</span>
        </a>
      </div>
    ),
    linux: (
      <div className="space-y-2">
        <a href={`${DL}?channel=stable&platform=linux-appimage`} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group">
          <Download className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
          <span className="text-sm text-gray-300 group-hover:text-white">AnymeX-Linux.AppImage</span>
          <span className="text-xs text-gray-600 ml-auto">AppImage</span>
        </a>
        <a href={`${DL}?channel=stable&platform=linux-rpm`} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group">
          <Download className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
          <span className="text-sm text-gray-300 group-hover:text-white">AnymeX-Linux.rpm</span>
          <span className="text-xs text-gray-600 ml-auto">RPM</span>
        </a>
        <a href={`${DL}?channel=stable&platform=linux-zip`} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all group">
          <Download className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
          <span className="text-sm text-gray-300 group-hover:text-white">AnymeX-Linux.zip</span>
          <span className="text-xs text-gray-600 ml-auto">Portable</span>
        </a>
      </div>
    ),
  }

  const needsPlugin = platform !== 'ios'
  const pluginFileType = platform === 'android' ? 'APK' : 'JAR'

  const steps: Step[] = [
    {
      id: 'download',
      title: 'Download & Install',
      icon: <Download className="w-5 h-5" />,
      instruction: 'Download AnymeX for your device and install it.',
      details: downloadDetails[platform],
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
        { label: 'Profile', icon: '👤' },
        { label: 'Settings', icon: '⚙️' },
        { label: 'Extensions', icon: '📦' },
        { label: '⚙️ (top right)', icon: '' },
        { label: 'Download Plugin', icon: '⬇️' },
      ],
      instruction: 'Install the Runtime Bridge Plugin to unlock Aniyomi & CloudStream extensions.',
      details: (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">Needed for Aniyomi</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">Needed for CloudStream</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Not needed for Mangayomi/LNReader/Sora</span>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-2">
            <p className="text-xs text-gray-400">
              <strong className="text-white">{pluginFileType}</strong> will be downloaded automatically based on your platform.
            </p>
          </div>
        </div>
      ),
      tip: 'Once installed, Aniyomi & CloudStream tabs will appear in your Extensions page.',
    })
  }

  steps.push({
    id: 'add-repo',
    title: 'Add Repository',
    icon: <Copy className="w-5 h-5" />,
    breadcrumbs: [
      { label: 'Profile', icon: '👤' },
      { label: 'Settings', icon: '⚙️' },
      { label: 'Extensions', icon: '📦' },
      { label: 'Select System & Type', icon: '' },
      { label: '+ Add Repo', icon: '' },
      { label: 'Paste URL', icon: '' },
      { label: 'Add Repository', icon: '' },
    ],
    instruction: 'Add extension repos to AnymeX so you can browse and install extensions.',
    details: (
      <div className="space-y-3">
        {/* Two methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Method 1: One-click */}
          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">👆</span>
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
              <span className="text-sm">📋</span>
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
      { label: 'Profile', icon: '👤' },
      { label: 'Extensions', icon: '📦' },
      { label: 'Available anime/manga/novel', icon: '' },
      { label: 'Tap ⬇️ icon', icon: '' },
    ],
    instruction: 'Browse available extensions and install the ones you want.',
    details: (
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <p className="text-xs text-gray-400">
            Go to <strong className="text-white">Profile → Extensions</strong>. Under <strong className="text-white">Available</strong> anime/manga/novel, find the extension you want and tap the <strong className="text-white">⬇️ download icon</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1]">
            <span className="text-sm">📦</span>
            <span className="text-xs font-medium text-gray-300">Available</span>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-sm">⬇️</span>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-sm">✅</span>
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
            <span className="text-sm">🎬</span>
            <span className="text-xs font-medium text-gray-300">Open anime</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1]">
            <span className="text-sm">📺</span>
            <span className="text-xs font-medium text-gray-300">Watch tab</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-sm">✅</span>
            <span className="text-xs font-medium text-emerald-400">Select extension</span>
          </div>
        </div>
      </div>
    ),
  })

  return steps
}

// ============ BREADCRUMB PATH COMPONENT ============

function BreadcrumbPath({ items }: { items: { label: string; icon?: string }[] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap py-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1]">
            {item.icon && <span className="text-sm">{item.icon}</span>}
            <span className="text-xs font-medium text-gray-300">{item.label}</span>
          </div>
          {i < items.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-gray-600" />}
        </div>
      ))}
    </div>
  )
}

// ============ MAIN COMPONENT ============

export default function GuidePage() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('android')
  const [currentStep, setCurrentStep] = useState(0)

  const steps = getSteps(selectedPlatform)
  const totalSteps = steps.length

  // Reset step when platform changes
  const handlePlatformChange = (p: Platform) => {
    setSelectedPlatform(p)
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
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6 sm:py-8 flex-1 max-w-4xl mx-auto w-full">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Setup Guide</h1>
          <p className="text-sm text-gray-400">Follow the steps for your device to get started with AnymeX extensions.</p>
        </div>

        {/* Platform Selector */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Select your platform</p>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map(p => (
              <button
                key={p.id}
                onClick={() => handlePlatformChange(p.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                  selectedPlatform === p.id
                    ? `bg-white/10 text-white border-white/20 ${p.color}`
                    : 'bg-white/[0.03] text-gray-500 border-white/[0.06] hover:bg-white/[0.06] hover:text-gray-300'
                }`}
              >
                {p.icon}
                {p.name}
              </button>
            ))}
          </div>
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
                  i <= currentStep ? 'bg-emerald-500' : 'bg-white/10'
                }`} />
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Step {currentStep + 1} of {totalSteps}
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
                {steps[currentStep].icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                    {currentStep + 1}
                  </span>
                  <h2 className="text-base sm:text-lg font-semibold text-white">{steps[currentStep].title}</h2>
                </div>
                <p className="text-sm text-gray-400 mt-0.5">{steps[currentStep].instruction}</p>
              </div>
            </div>
          </div>

          {/* Breadcrumb Path */}
          {steps[currentStep].breadcrumbs && (
            <div className="px-4 sm:px-6 py-3 border-b border-white/[0.06] bg-white/[0.01]">
              <p className="text-[10px] font-medium text-gray-600 uppercase tracking-wider mb-1.5">Tap Path</p>
              <BreadcrumbPath items={steps[currentStep].breadcrumbs!} />
            </div>
          )}

          {/* Step Details */}
          <div className="px-4 sm:px-6 py-4">
            {steps[currentStep].details}
          </div>

          {/* Tip */}
          {steps[currentStep].tip && (
            <div className="mx-4 sm:mx-6 mb-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-400/80">{steps[currentStep].tip}</p>
              </div>
            </div>
          )}

          {/* Warning */}
          {steps[currentStep].warning && (
            <div className="mx-4 sm:mx-6 mb-4 p-3 rounded-lg bg-red-500/5 border border-red-500/15">
              <div className="flex items-start gap-2">
                <Apple className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-400/80">{steps[currentStep].warning}</p>
              </div>
            </div>
          )}

          {/* Step Navigation */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-white/[0.06]">
            {currentStep > 0 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
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
                    i === currentStep ? 'bg-emerald-400 w-5' : i < currentStep ? 'bg-emerald-500/40' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {currentStep < totalSteps - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
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
