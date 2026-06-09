'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import {
  User,
  Settings,
  Download,
  Bell,
  FolderOpen,
  Search,
  Play,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ListChecks,
  Smartphone,
  Package,
  Copy,
  ExternalLink,
  RefreshCw,
  CircleDot,
  Shield,
  HardDrive,
  FileSearch,
  Zap,
  Layers,
  Globe,
  SlidersHorizontal,
  Wifi,
  RotateCcw,
  Check,
} from 'lucide-react'

// ============ STEP DATA ============

interface Step {
  title: string
  icon: React.ReactNode
  path: { label: string; icon?: React.ReactNode }[]
  instruction: string
  tip?: string
  details?: React.ReactNode
}

interface Phase {
  title: string
  icon: React.ReactNode
  color: string
  border: string
  bg: string
  steps: Step[]
}

const PHASES: Phase[] = [
  {
    title: 'Setup Permissions',
    icon: <Shield className="w-4 h-4" />,
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    steps: [
      {
        title: 'Open Profile',
        icon: <User className="w-4 h-4" />,
        path: [{ label: 'AnymeX', icon: <Smartphone className="w-3 h-3" /> }, { label: 'Profile', icon: <User className="w-3 h-3" /> }],
        instruction: 'Open the AnymeX app and tap on your Profile icon.',
        tip: 'Profile is usually in the top-left or top-right corner.',
      },
      {
        title: 'Go to Downloads',
        icon: <Download className="w-4 h-4" />,
        path: [{ label: 'Profile' }, { label: 'Downloads', icon: <Download className="w-3 h-3" /> }],
        instruction: 'Tap on "Downloads" in the Profile menu.',
      },
      {
        title: 'Allow Notifications',
        icon: <Bell className="w-4 h-4" />,
        path: [{ label: 'Downloads' }, { label: 'Allow Notifications' }],
        instruction: 'Enable notification permission so AnymeX can notify you about download progress.',
      },
      {
        title: 'Allow Background Run',
        icon: <Shield className="w-4 h-4" />,
        path: [{ label: 'Downloads' }, { label: 'Allow Background Run' }],
        instruction: 'Enable background run permission so downloads continue even when the app is minimized.',
        tip: 'Without this, downloads will pause when you switch to another app.',
      },
      {
        title: 'Click Set',
        icon: <Settings className="w-4 h-4" />,
        path: [{ label: 'Downloads' }, { label: 'Set' }],
        instruction: 'Click the "Set" button next to background usage.',
      },
      {
        title: 'Allow Background Usage',
        icon: <Wifi className="w-4 h-4" />,
        path: [{ label: 'Set' }, { label: 'Allow Background Usage' }],
        instruction: 'Tap "Allow Background Usage" to grant background access.',
      },
      {
        title: 'Select Unrestricted',
        icon: <Zap className="w-4 h-4" />,
        path: [{ label: 'Allow Background Usage' }, { label: 'Unrestricted' }, { label: 'Go Back' }],
        instruction: 'Choose "Unrestricted" so downloads never get throttled. Then go back to AnymeX.',
        tip: 'Unrestricted mode = full speed downloads without battery optimization killing them.',
      },
    ],
  },
  {
    title: 'Configure Downloads',
    icon: <FolderOpen className="w-4 h-4" />,
    color: 'text-sky-400',
    border: 'border-sky-500/20',
    bg: 'bg-sky-500/5',
    steps: [
      {
        title: 'Select Download Folder',
        icon: <FolderOpen className="w-4 h-4" />,
        path: [{ label: 'Downloads' }, { label: 'Select Folder' }],
        instruction: 'Choose the folder where you want downloads stored on your device.',
        tip: 'Pick a folder with enough storage — anime episodes can be large!',
      },
      {
        title: 'Start New Download',
        icon: <CircleDot className="w-4 h-4" />,
        path: [{ label: 'Downloads' }, { label: 'New Download' }],
        instruction: 'Tap "New Download" to start searching for content.',
      },
    ],
  },
  {
    title: 'Search & Select',
    icon: <FileSearch className="w-4 h-4" />,
    color: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    steps: [
      {
        title: 'Choose Anime or Manga',
        icon: <Layers className="w-4 h-4" />,
        path: [{ label: 'New Download' }, { label: 'Anime', icon: <Play className="w-3 h-3" /> }, { label: 'or Manga', icon: <BookOpen className="w-3 h-3" /> }],
        instruction: 'Select "Anime" or "Manga" depending on what you want to download.',
        details: (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="p-2.5 rounded-lg bg-violet-500/5 border border-violet-500/15">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Play className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-violet-300">Anime</span>
              </div>
              <p className="text-[11px] text-gray-500">Episodes as video</p>
            </div>
            <div className="p-2.5 rounded-lg bg-violet-500/5 border border-violet-500/15">
              <div className="flex items-center gap-1.5 mb-0.5">
                <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-violet-300">Manga</span>
              </div>
              <p className="text-[11px] text-gray-500">Chapters as images</p>
            </div>
          </div>
        ),
      },
      {
        title: 'Search for Title',
        icon: <Search className="w-4 h-4" />,
        path: [{ label: 'Search' }, { label: 'Type Title' }],
        instruction: 'Search for the anime or manga you want to download.',
        tip: 'English or Japanese title — both usually work!',
      },
      {
        title: 'Wait for Loading',
        icon: <RefreshCw className="w-4 h-4" />,
        path: [{ label: 'Search' }, { label: 'Wait for Results' }],
        instruction: 'Wait for results to load from your installed extensions.',
        tip: 'More extensions = more results. Don\'t find it? Install more extensions first.',
      },
      {
        title: 'Select Source',
        icon: <Globe className="w-4 h-4" />,
        path: [{ label: 'Results' }, { label: 'Click Item (from your extension)' }],
        instruction: 'Click the item from the extension/source you want to download from.',
        tip: 'Different sources may have different quality. Try another if one doesn\'t work.',
      },
    ],
  },
  {
    title: 'Download',
    icon: <Download className="w-4 h-4" />,
    color: 'text-emerald-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    steps: [
      {
        title: 'Select Episodes/Chapters',
        icon: <ListChecks className="w-4 h-4" />,
        path: [{ label: 'Select Episodes' }, { label: 'Multi-select or Select All' }],
        instruction: 'Select the episodes or chapters you want to download.',
        details: (
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
              <div className="flex items-center gap-1.5 mb-0.5">
                <CircleDot className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">Multi-Select</span>
              </div>
              <p className="text-[11px] text-gray-500">Tap each one</p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">Select All</span>
              </div>
              <p className="text-[11px] text-gray-500">Grab everything</p>
            </div>
          </div>
        ),
        tip: 'Tap on each episode to select, or use Select All to grab everything at once.',
      },
      {
        title: 'Click Download',
        icon: <Download className="w-4 h-4" />,
        path: [{ label: 'Download X Episodes/Chapters' }],
        instruction: 'Click "Download X Episodes/Chapters" (X = number selected).',
      },
      {
        title: 'Choose Quality',
        icon: <SlidersHorizontal className="w-4 h-4" />,
        path: [{ label: 'Download X' }, { label: 'Choose Quality' }],
        instruction: 'Pick your quality. Higher = bigger files.',
        details: (
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">1080p</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/5 text-gray-400 border border-white/10">720p</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/5 text-gray-400 border border-white/10">480p</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/5 text-gray-400 border border-white/10">360p</span>
          </div>
        ),
        tip: '720p is a good balance — looks good, not too huge.',
      },
      {
        title: 'Confirm Download',
        icon: <CheckCircle2 className="w-4 h-4" />,
        path: [{ label: 'Choose Quality' }, { label: 'Download' }],
        instruction: 'Hit Download. That\'s it — download starts!',
        tip: 'You can start watching/reading while downloads are still going.',
      },
    ],
  },
  {
    title: 'View Downloads',
    icon: <CheckCircle2 className="w-4 h-4" />,
    color: 'text-rose-400',
    border: 'border-rose-500/20',
    bg: 'bg-rose-500/5',
    steps: [
      {
        title: 'View Download Queue',
        icon: <ListChecks className="w-4 h-4" />,
        path: [{ label: 'Top-right Download Icon', icon: <Download className="w-3 h-3" /> }, { label: 'Queue' }],
        instruction: 'Tap the Download icon (top-right corner) to see active downloads.',
        tip: 'You can also see progress in your phone\'s notification bar.',
      },
      {
        title: 'View Downloaded Media',
        icon: <HardDrive className="w-4 h-4" />,
        path: [{ label: 'Downloads' }, { label: 'Media' }],
        instruction: 'Downloaded episodes/chapters appear in Downloads → Media.',
        tip: 'Works offline — no internet needed to watch/read downloaded content!',
      },
    ],
  },
]

// ============ COUNT TOTAL STEPS ============

let stepNum = 0
const numberedPhases = PHASES.map(p => ({
  ...p,
  steps: p.steps.map(s => {
    stepNum++
    return { ...s, num: stepNum }
  }),
}))

// ============ MAIN COMPONENT ============

function DownloadGuideContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="px-4 sm:px-6 py-3 max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="AnymeX" className="w-7 h-7 rounded-lg object-contain" />
              <Link href="/extensions" className="text-base sm:text-lg font-semibold text-gray-100 hover:text-white transition-colors">
                AnymeX Extensions
              </Link>
            </div>
            <div className="flex items-center gap-1.5">
              <Link href="/extensions" className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-medium text-gray-500 hover:text-gray-300 transition-all">
                <Package className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Extensions</span>
              </Link>
              <Link href="/repos" className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-medium text-gray-500 hover:text-gray-300 transition-all">
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Repos</span>
              </Link>
              <Link href="/guide" className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-medium text-gray-500 hover:text-gray-300 transition-all">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Guide</span>
              </Link>
              <Link href="/download-guide" className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-medium text-white bg-white/10 border border-white/20 transition-all">
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-5 sm:py-8 flex-1 max-w-4xl mx-auto w-full">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Download Guide</h1>
        <p className="text-sm text-gray-400 mb-6">How to download anime & manga in AnymeX — step by step.</p>

        {/* Quick Jump */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {numberedPhases.map(p => (
            <a
              key={p.title}
              href={`#${p.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap border transition-all ${p.border} ${p.color} ${p.bg} hover:opacity-80`}
            >
              <span className="flex-shrink-0">{p.icon}</span>
              <span>{p.title}</span>
            </a>
          ))}
        </div>

        {/* All Steps — Just Scroll */}
        <div className="space-y-6">
          {numberedPhases.map(p => (
            <section key={p.title} id={p.title.toLowerCase().replace(/\s+/g, '-')}>
              {/* Phase Header */}
              <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${p.border}`}>
                <div className={`w-6 h-6 rounded-md ${p.bg} border ${p.border} flex items-center justify-center ${p.color} flex-shrink-0`}>
                  {p.icon}
                </div>
                <h2 className={`text-sm sm:text-base font-bold ${p.color}`}>{p.title}</h2>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {p.steps.map(s => (
                  <div
                    key={s.num}
                    className={`rounded-xl border ${p.border} bg-white/[0.01] p-3 sm:p-4`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Step Icon + Number */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-10 h-10 rounded-xl ${p.bg} border ${p.border} flex items-center justify-center ${p.color}`}>
                          {s.icon}
                        </div>
                        <span className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full ${p.bg} border ${p.border} flex items-center justify-center text-[10px] font-bold ${p.color}`}>
                          {s.num}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h3 className="text-sm font-semibold text-white mb-1">{s.title}</h3>

                        {/* Tap Path */}
                        <div className="flex items-center gap-1 flex-wrap py-1 mb-2">
                          {s.path.map((item, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs font-medium text-gray-300">
                                {item.icon}
                                {item.label}
                              </span>
                              {i < s.path.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-gray-600" />}
                            </div>
                          ))}
                        </div>

                        {/* Instruction */}
                        <p className="text-xs sm:text-sm text-gray-300">{s.instruction}</p>

                        {/* Details */}
                        {s.details}

                        {/* Tip */}
                        {s.tip && (
                          <div className="mt-2 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <p className="text-[11px] text-emerald-400/70">{s.tip}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/extensions" className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all group">
            <Package className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <div>
              <p className="text-sm font-semibold text-gray-200 group-hover:text-white">Browse Extensions</p>
              <p className="text-xs text-gray-500">Find and install extensions</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600 ml-auto" />
          </Link>
          <Link href="/guide" className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all group">
            <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <div>
              <p className="text-sm font-semibold text-gray-200 group-hover:text-white">Setup Guide</p>
              <p className="text-xs text-gray-500">How to set up AnymeX</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600 ml-auto" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#0a0a0f]/80">
        <div className="px-4 sm:px-6 py-4 max-w-4xl mx-auto w-full flex items-center justify-between">
          <span className="text-xs text-gray-700">AnymeX Download Guide</span>
          <div className="flex items-center gap-3">
            <Link href="/extensions" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Extensions</Link>
            <Link href="/repos" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Repos</Link>
            <Link href="/guide" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Guide</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ============ SUSPENSE WRAPPER ============

export default function DownloadGuidePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-gray-100">
        <div className="w-8 h-8 border-2 border-white/20 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 mt-3">Loading...</p>
      </div>
    }>
      <DownloadGuideContent />
    </Suspense>
  )
}
