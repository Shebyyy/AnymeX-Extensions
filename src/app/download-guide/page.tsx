'use client'

import { useState, Suspense } from 'react'
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
  ChevronDown,
  ArrowDown,
  ListChecks,
  Monitor,
  Smartphone,
  Package,
  Copy,
  ExternalLink,
  RefreshCw,
  Check,
  CircleDot,
  Shield,
  HardDrive,
  FileSearch,
  Zap,
  Eye,
  Layers,
  Globe,
  SlidersHorizontal,
  Wifi,
  RotateCcw,
} from 'lucide-react'

// ============ TYPES ============

interface Step {
  id: string
  title: string
  icon: React.ReactNode
  breadcrumbs?: { label: string; icon?: React.ReactNode }[]
  instruction: string
  details?: React.ReactNode
  tip?: string
}

interface Phase {
  id: string
  title: string
  emoji: string
  accent: string
  accentBg: string
  accentBorder: string
  accentText: string
  steps: Step[]
}

// ============ PHASE DATA ============

const PHASES: Phase[] = [
  {
    id: 'permissions',
    title: 'Setup Permissions',
    emoji: '🔧',
    accent: 'amber',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/20',
    accentText: 'text-amber-400',
    steps: [
      {
        id: 'open-profile',
        title: 'Open Profile',
        icon: <User className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'AnymeX Home', icon: <Smartphone className="w-3.5 h-3.5" /> },
          { label: 'Profile', icon: <User className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Open the AnymeX app and tap on your Profile icon.',
        tip: 'Your profile is usually accessible from the bottom navigation bar or the top-left menu.',
      },
      {
        id: 'go-to-downloads',
        title: 'Go to Downloads',
        icon: <Download className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Profile', icon: <User className="w-3.5 h-3.5" /> },
          { label: 'Downloads', icon: <Download className="w-3.5 h-3.5" /> },
        ],
        instruction: 'In your Profile menu, tap on "Downloads" to open the download settings.',
      },
      {
        id: 'allow-notifications',
        title: 'Allow Notifications',
        icon: <Bell className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Downloads', icon: <Download className="w-3.5 h-3.5" /> },
          { label: 'Allow Notifications', icon: <Bell className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Enable the notification permission so AnymeX can notify you about download progress and completions.',
        tip: 'Notifications help you know when downloads finish, especially when running in the background.',
      },
      {
        id: 'allow-background-run',
        title: 'Allow Background Run',
        icon: <Shield className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Downloads', icon: <Download className="w-3.5 h-3.5" /> },
          { label: 'Allow Background Run', icon: <Shield className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Enable background run permission so downloads can continue even when the app is minimized.',
        tip: 'Without this permission, downloads will pause when you switch to another app.',
      },
      {
        id: 'click-set',
        title: 'Click Set',
        icon: <Settings className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Downloads', icon: <Download className="w-3.5 h-3.5" /> },
          { label: 'Set', icon: <Settings className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Click the "Set" button next to background usage to configure how AnymeX runs in the background.',
      },
      {
        id: 'allow-background-usage',
        title: 'Allow Background Usage',
        icon: <Wifi className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Set', icon: <Settings className="w-3.5 h-3.5" /> },
          { label: 'Allow Background Usage', icon: <Wifi className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Tap "Allow Background Usage" to grant AnymeX the ability to run in the background.',
      },
      {
        id: 'select-unrestricted',
        title: 'Select Unrestricted',
        icon: <Zap className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Allow Background Usage', icon: <Wifi className="w-3.5 h-3.5" /> },
          { label: 'Unrestricted', icon: <Zap className="w-3.5 h-3.5" /> },
          { label: 'Go Back', icon: <RotateCcw className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Choose "Unrestricted" mode so downloads never get throttled by battery optimization. Then go back to AnymeX.',
        tip: 'Unrestricted mode ensures your downloads run at full speed without being paused by the system.',
      },
    ],
  },
  {
    id: 'configure',
    title: 'Configure Downloads',
    emoji: '📁',
    accent: 'sky',
    accentBg: 'bg-sky-500/10',
    accentBorder: 'border-sky-500/20',
    accentText: 'text-sky-400',
    steps: [
      {
        id: 'select-folder',
        title: 'Select Download Folder',
        icon: <FolderOpen className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Downloads', icon: <Download className="w-3.5 h-3.5" /> },
          { label: 'Select Folder', icon: <FolderOpen className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Choose the folder where you want your downloaded anime and manga to be stored on your device.',
        tip: 'Pick a folder with enough storage space. Anime episodes can be large files!',
      },
      {
        id: 'new-download',
        title: 'Start New Download',
        icon: <CircleDot className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Downloads', icon: <Download className="w-3.5 h-3.5" /> },
          { label: 'New Download', icon: <CircleDot className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Click on the "New Download" button to begin searching for content to download.',
      },
    ],
  },
  {
    id: 'search',
    title: 'Search & Select',
    emoji: '🔍',
    accent: 'violet',
    accentBg: 'bg-violet-500/10',
    accentBorder: 'border-violet-500/20',
    accentText: 'text-violet-400',
    steps: [
      {
        id: 'choose-type',
        title: 'Choose Content Type',
        icon: <Layers className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'New Download', icon: <CircleDot className="w-3.5 h-3.5" /> },
          { label: 'Anime', icon: <Play className="w-3.5 h-3.5" /> },
          { label: 'or Manga', icon: <BookOpen className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Select whether you want to download "Anime" or "Manga" content.',
        details: (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/15">
              <div className="flex items-center gap-2 mb-1">
                <Play className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-violet-300">Anime</span>
              </div>
              <p className="text-xs text-gray-400">Download episodes as video files</p>
            </div>
            <div className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/15">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-violet-300">Manga</span>
              </div>
              <p className="text-xs text-gray-400">Download chapters as image files</p>
            </div>
          </div>
        ),
      },
      {
        id: 'search-title',
        title: 'Search for Title',
        icon: <Search className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Search', icon: <Search className="w-3.5 h-3.5" /> },
          { label: 'Type Title' },
        ],
        instruction: 'Type the name of the anime or manga you want to download in the search bar.',
        tip: 'Use the English or Japanese title — both usually work!',
      },
      {
        id: 'wait-loading',
        title: 'Wait for Loading',
        icon: <RefreshCw className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Search', icon: <Search className="w-3.5 h-3.5" /> },
          { label: 'Wait for Results', icon: <RefreshCw className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Wait a moment for results to load from your installed extensions.',
        tip: 'More installed extensions = more results. If you don\'t find what you\'re looking for, try installing more extensions first.',
      },
      {
        id: 'select-source',
        title: 'Select Source',
        icon: <Globe className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Results', icon: <FileSearch className="w-3.5 h-3.5" /> },
          { label: 'Click Item (from your extension)', icon: <Globe className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Click on the item from the extension/source you want to download from. Different sources may have different quality options.',
        tip: 'If one source doesn\'t work well, you can always come back and try another extension.',
      },
    ],
  },
  {
    id: 'download',
    title: 'Download Content',
    emoji: '⬇️',
    accent: 'emerald',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/20',
    accentText: 'text-emerald-400',
    steps: [
      {
        id: 'select-episodes',
        title: 'Select Episodes/Chapters',
        icon: <ListChecks className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Select Episodes', icon: <ListChecks className="w-3.5 h-3.5" /> },
          { label: 'Multi-select or Select All', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Select the episodes or chapters you want to download.',
        details: (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
                <div className="flex items-center gap-2 mb-1">
                  <CircleDot className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300">Multi-Select</span>
                </div>
                <p className="text-xs text-gray-400">Tap on individual episodes or chapters to select them one by one.</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
                <div className="flex items-center gap-2 mb-1">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300">Select All</span>
                </div>
                <p className="text-xs text-gray-400">Use the "Select All" button to select every episode or chapter at once.</p>
              </div>
            </div>
          </div>
        ),
        tip: 'You can select multiple episodes at once — just tap on each one you want!',
      },
      {
        id: 'click-download',
        title: 'Click Download',
        icon: <Download className="w-5 h-5" />,
        breadcrumbs: [
          { label: `Download X Episodes/Chapters`, icon: <Download className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Click the "Download X Episodes/Chapters" button (X = number of items selected) to proceed.',
        tip: 'The button shows the count of selected items so you can verify before downloading.',
      },
      {
        id: 'choose-quality',
        title: 'Choose Quality',
        icon: <SlidersHorizontal className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Download X', icon: <Download className="w-3.5 h-3.5" /> },
          { label: 'Choose Quality', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Pick your preferred video quality (for anime) or image quality (for manga).',
        details: (
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">1080p</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-gray-400 border border-white/10">720p</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-gray-400 border border-white/10">480p</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-gray-400 border border-white/10">360p</span>
            </div>
            <p className="text-xs text-gray-500">Higher quality = larger file size. 720p is a good balance for most users.</p>
          </div>
        ),
        tip: 'Higher quality looks better but takes more storage and longer to download.',
      },
      {
        id: 'confirm-download',
        title: 'Confirm Download',
        icon: <CheckCircle2 className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Choose Quality', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
          { label: 'Download', icon: <Download className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Click the Download button to start the download. Your episodes/chapters will begin downloading immediately!',
        tip: 'You can start watching or reading while downloads are still in progress.',
      },
    ],
  },
  {
    id: 'view',
    title: 'View Downloads',
    emoji: '✅',
    accent: 'rose',
    accentBg: 'bg-rose-500/10',
    accentBorder: 'border-rose-500/20',
    accentText: 'text-rose-400',
    steps: [
      {
        id: 'view-queue',
        title: 'View Download Queue',
        icon: <ListChecks className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Top-right Download Icon', icon: <Download className="w-3.5 h-3.5" /> },
          { label: 'Queue', icon: <ListChecks className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Click the Download icon in the top-right corner to see your active downloads and queue.',
        details: (
          <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/15">
            <p className="text-xs text-rose-400/80">
              The download queue shows all active, pending, and completed downloads. You can pause, resume, or cancel downloads from here.
            </p>
          </div>
        ),
        tip: 'You can also see download progress in your phone\'s notification bar.',
      },
      {
        id: 'view-media',
        title: 'View Downloaded Media',
        icon: <HardDrive className="w-5 h-5" />,
        breadcrumbs: [
          { label: 'Downloads', icon: <Download className="w-3.5 h-3.5" /> },
          { label: 'Media', icon: <HardDrive className="w-3.5 h-3.5" /> },
        ],
        instruction: 'Downloaded episodes and chapters appear in the Downloads > Media section for easy access.',
        details: (
          <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/15">
            <p className="text-xs text-rose-400/80">
              From the Media section, you can play downloaded anime episodes or read downloaded manga chapters offline — no internet needed!
            </p>
          </div>
        ),
        tip: 'Downloaded media is available offline, perfect for watching on the go without data!',
      },
    ],
  },
]

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

// ============ FLATTEN STEPS FOR NAVIGATION ============

interface FlatStep extends Step {
  phaseIndex: number
  stepInPhase: number
}

function flattenSteps(): FlatStep[] {
  const result: FlatStep[] = []
  PHASES.forEach((phase, pi) => {
    phase.steps.forEach((step, si) => {
      result.push({ ...step, phaseIndex: pi, stepInPhase: si })
    })
  })
  return result
}

const ALL_STEPS = flattenSteps()
const TOTAL_STEPS = ALL_STEPS.length

// ============ MAIN COMPONENT ============

function DownloadGuideContent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['permissions']))
  const [showCheckmarks, setShowCheckmarks] = useState(true)

  const step = ALL_STEPS[currentStep]
  const phase = PHASES[step.phaseIndex]

  const toggleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev)
      if (next.has(stepId)) {
        next.delete(stepId)
      } else {
        next.add(stepId)
      }
      return next
    })
  }

  const togglePhaseExpand = (phaseId: string) => {
    setExpandedPhases(prev => {
      const next = new Set(prev)
      if (next.has(phaseId)) {
        next.delete(phaseId)
      } else {
        next.add(phaseId)
      }
      return next
    })
  }

  const goToStep = (globalIndex: number) => {
    setCurrentStep(globalIndex)
    const targetPhase = PHASES[ALL_STEPS[globalIndex].phaseIndex]
    setExpandedPhases(prev => new Set([...prev, targetPhase.id]))
  }

  const goToPhase = (phaseIndex: number) => {
    const firstStepInPhase = PHASES.slice(0, phaseIndex).reduce((acc, p) => acc + p.steps.length, 0)
    setCurrentStep(firstStepInPhase)
    setExpandedPhases(prev => new Set([...prev, PHASES[phaseIndex].id]))
  }

  const completedCount = completedSteps.size
  const progressPercent = TOTAL_STEPS > 0 ? (completedCount / TOTAL_STEPS) * 100 : 0

  // Calculate step index within a phase
  const getStepGlobalIndex = (phaseIndex: number, stepInPhase: number) => {
    let idx = 0
    for (let i = 0; i < phaseIndex; i++) {
      idx += PHASES[i].steps.length
    }
    return idx + stepInPhase
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
                href="/guide"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium text-gray-500 hover:text-gray-300 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Guide</span>
              </Link>
              <Link
                href="/download-guide"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium text-white bg-white/10 border border-white/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6 sm:py-8 flex-1 max-w-4xl mx-auto w-full">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Download Guide</h1>
          <p className="text-sm text-gray-400">Step-by-step guide to downloading anime and manga in AnymeX.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Overall Progress</span>
            <span className="text-xs text-gray-400 font-medium">{completedCount}/{TOTAL_STEPS} completed</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-rose-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Phase Indicators */}
        <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1 scrollbar-none">
          {PHASES.map((p, pi) => {
            const phaseSteps = p.steps
            const phaseCompleted = phaseSteps.filter(s => completedSteps.has(s.id)).length
            const isCurrentPhase = pi === step.phaseIndex
            const isPhaseComplete = phaseCompleted === phaseSteps.length

            return (
              <button
                key={p.id}
                onClick={() => goToPhase(pi)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  isCurrentPhase
                    ? `${p.accentBg} ${p.accentText} ${p.accentBorder}`
                    : isPhaseComplete
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-white/5 text-gray-500 border-white/10 hover:bg-white/10 hover:text-gray-300'
                }`}
              >
                <span>{p.emoji}</span>
                <span className="hidden sm:inline">{p.title}</span>
                <span className="sm:hidden">{p.emoji}</span>
                {phaseCompleted > 0 && (
                  <span className={`text-[10px] ${isPhaseComplete ? 'text-emerald-400' : 'text-gray-500'}`}>
                    {phaseCompleted}/{phaseSteps.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Checkmark toggle */}
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={() => setShowCheckmarks(!showCheckmarks)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            {showCheckmarks ? 'Hide' : 'Show'} checkmarks
          </button>
        </div>

        {/* Phase Collapsible Sections */}
        <div className="space-y-3 mb-6">
          {PHASES.map((p, pi) => {
            const isExpanded = expandedPhases.has(p.id)
            const phaseSteps = p.steps
            const phaseCompleted = phaseSteps.filter(s => completedSteps.has(s.id)).length
            const isCurrentPhase = pi === step.phaseIndex

            return (
              <div
                key={p.id}
                className={`rounded-xl border overflow-hidden transition-all ${
                  isCurrentPhase ? `${p.accentBorder} bg-white/[0.02]` : 'border-white/[0.06] bg-white/[0.01]'
                }`}
              >
                {/* Phase Header */}
                <button
                  onClick={() => togglePhaseExpand(p.id)}
                  className="w-full flex items-center justify-between px-4 sm:px-5 py-3 hover:bg-white/[0.02] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{p.emoji}</span>
                    <div className="text-left">
                      <h3 className={`text-sm font-semibold ${isCurrentPhase ? p.accentText : 'text-gray-200'}`}>
                        {p.title}
                      </h3>
                      <p className="text-[11px] text-gray-500">
                        {phaseCompleted === phaseSteps.length ? 'Complete!' : `${phaseCompleted}/${phaseSteps.length} steps`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {phaseCompleted === phaseSteps.length && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Phase Steps List */}
                {isExpanded && (
                  <div className="border-t border-white/[0.06] px-4 sm:px-5 py-2">
                    {phaseSteps.map((s, si) => {
                      const globalIdx = getStepGlobalIndex(pi, si)
                      const isActive = globalIdx === currentStep
                      const isDone = completedSteps.has(s.id)

                      return (
                        <button
                          key={s.id}
                          onClick={() => goToStep(globalIdx)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 text-left ${
                            isActive
                              ? `${p.accentBg} ${p.accentText}`
                              : 'hover:bg-white/[0.03]'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            isDone && showCheckmarks
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : isActive
                              ? `${p.accentBg} ${p.accentText} border ${p.accentBorder}`
                              : 'bg-white/10 text-gray-500'
                          }`}>
                            {isDone && showCheckmarks ? <Check className="w-3.5 h-3.5" /> : globalIdx + 1}
                          </span>
                          <span className={`text-sm ${isActive ? 'font-medium text-white' : isDone ? 'text-gray-400' : 'text-gray-400'}`}>
                            {s.title}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Current Step Detail Card */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
          {/* Step Header */}
          <div className={`px-4 sm:px-6 py-4 border-b border-white/[0.06] ${phase.accentBg}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${phase.accentBg} border ${phase.accentBorder} flex items-center justify-center ${phase.accentText}`}>
                {step.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full ${phase.accentBg} border ${phase.accentBorder} flex items-center justify-center text-xs font-bold ${phase.accentText}`}>
                    {currentStep + 1}
                  </span>
                  <h2 className="text-base sm:text-lg font-semibold text-white">{step.title}</h2>
                </div>
                <p className="text-sm text-gray-400 mt-0.5">{step.instruction}</p>
              </div>
              {showCheckmarks && (
                <button
                  onClick={() => toggleStepComplete(step.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    completedSteps.has(step.id)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10'
                  }`}
                  title={completedSteps.has(step.id) ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Breadcrumb Path */}
          {step.breadcrumbs && (
            <div className="px-4 sm:px-6 py-3 border-b border-white/[0.06] bg-white/[0.01]">
              <p className="text-[10px] font-medium text-gray-600 uppercase tracking-wider mb-1.5">Tap Path</p>
              <BreadcrumbPath items={step.breadcrumbs} />
            </div>
          )}

          {/* Step Details */}
          {step.details && (
            <div className="px-4 sm:px-6 py-4 border-b border-white/[0.06]">
              {step.details}
            </div>
          )}

          {/* Tip */}
          {step.tip && (
            <div className="mx-4 sm:mx-6 my-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-400/80">{step.tip}</p>
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
            <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] scrollbar-none py-1">
              {ALL_STEPS.map((_, i) => {
                const dotPhase = PHASES[ALL_STEPS[i].phaseIndex]
                const isDone = completedSteps.has(ALL_STEPS[i].id)
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentStep(i)}
                    className={`rounded-full transition-all flex-shrink-0 ${
                      i === currentStep
                        ? `w-5 h-2 ${dotPhase.accentText.replace('text-', 'bg-')}`
                        : isDone
                        ? 'w-2 h-2 bg-emerald-500/60'
                        : 'w-2 h-2 bg-white/20'
                    }`}
                  />
                )
              })}
            </div>

            {currentStep < TOTAL_STEPS - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium ${phase.accentBg} ${phase.accentText} border ${phase.accentBorder} hover:opacity-80 transition-all`}
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
          <Link href="/guide" className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">Setup Guide</p>
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
        <p className="text-sm text-gray-500 mt-3">Loading download guide...</p>
      </div>
    }>
      <DownloadGuideContent />
    </Suspense>
  )
}
