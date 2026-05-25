'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Copy, ExternalLink, X, ChevronDown, Check, Package, Zap, RefreshCw, EyeOff, Eye } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// ============ TYPES ============

interface Extension {
  _platform: string
  _repo: string
  _repoUrl: string
  _autoInstall: string
  _allInOneAutoInstall: string
  _fileType: string
  _manifestUrl: string
  _anymexType: string
  _allTypes: string[]
  name: string
  icon: string
  language: string
  langBase: string
  languages: string[]
  type: string
  version: string
  author: string
  [key: string]: unknown
}

interface RepoTypeUrl {
  type: string
  autoInstall: string
  manualUrl: string
  count: number
}

interface Repo {
  platform: string
  repo: string
  count: number
  types: string[]
  languages: string[]
  autoInstall: string | RepoTypeUrl[]
  allInOneAutoInstall: string
  manualUrl: string
  repoUrl: string
}

// ============ HELPERS ============

function isNsfw(ext: Extension): boolean {
  return ext.isNsfw === true || ext.nsfw === true || ext.isNsfw === 1 || ext.nsfw === 1
}

const PLATFORM_COLORS: Record<string, string> = {
  sora: 'bg-white/10 text-gray-300 border-white/20',
  mihon: 'bg-white/10 text-gray-300 border-white/20',
  aniyomi: 'bg-white/10 text-gray-300 border-white/20',
  mangayomi: 'bg-white/10 text-gray-300 border-white/20',
  cloudstream: 'bg-white/10 text-gray-300 border-white/20',
  lnreader: 'bg-white/10 text-gray-300 border-white/20',
}

const PLATFORM_TEXT: Record<string, string> = {
  sora: 'text-gray-300',
  mihon: 'text-gray-300',
  aniyomi: 'text-gray-300',
  mangayomi: 'text-gray-300',
  cloudstream: 'text-gray-300',
  lnreader: 'text-gray-300',
}

const PLATFORM_ACCENT: Record<string, string> = {
  sora: '#9ca3af', mihon: '#9ca3af', aniyomi: '#9ca3af',
  mangayomi: '#9ca3af', cloudstream: '#9ca3af', lnreader: '#9ca3af',
}

const PLATFORM_LABELS: Record<string, string> = {
  sora: 'Sora',
  mihon: 'Mihon',
  aniyomi: 'Aniyomi',
  mangayomi: 'Mangayomi',
  cloudstream: 'CloudStream',
  lnreader: 'LNReader',
}

const PLATFORM_ICON: Record<string, string> = {
  sora: 'https://static.everythingmoe.com/icons/sora.png',
  mihon: 'https://aniyomi.org/img/logo-128px.png',
  aniyomi: 'https://aniyomi.org/img/logo-128px.png',
  mangayomi: 'https://raw.githubusercontent.com/kodjodevf/mangayomi/main/assets/app_icons/icon-red.png',
  cloudstream: 'https://static.everythingmoe.com/icons/cloudstream.png',
  lnreader: 'https://raw.githubusercontent.com/LNReader/lnreader/main/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
}

const TYPE_COLORS: Record<string, string> = {
  anime: 'bg-white/10 text-gray-300 border-white/20',
  manga: 'bg-white/10 text-gray-300 border-white/20',
  novels: 'bg-white/10 text-gray-300 border-white/20',
  other: 'bg-white/10 text-gray-300 border-white/20',
}

const LANG_COLORS: Record<string, string> = {
  English: 'bg-white/10 text-gray-300 border-white/20',
  Spanish: 'bg-white/10 text-gray-300 border-white/20',
  Portuguese: 'bg-white/10 text-gray-300 border-white/20',
  Turkish: 'bg-white/10 text-gray-300 border-white/20',
  Indonesian: 'bg-white/10 text-gray-300 border-white/20',
  French: 'bg-white/10 text-gray-300 border-white/20',
  Japanese: 'bg-white/10 text-gray-300 border-white/20',
  Arabic: 'bg-white/10 text-gray-300 border-white/20',
  Chinese: 'bg-white/10 text-gray-300 border-white/20',
  Vietnamese: 'bg-white/10 text-gray-300 border-white/20',
  Thai: 'bg-white/10 text-gray-300 border-white/20',
  Russian: 'bg-white/10 text-gray-300 border-white/20',
  Italian: 'bg-white/10 text-gray-300 border-white/20',
  German: 'bg-white/10 text-gray-300 border-white/20',
  Korean: 'bg-white/10 text-gray-300 border-white/20',
  Multi: 'bg-white/10 text-gray-300 border-white/20',
  Ukrainian: 'bg-white/10 text-gray-300 border-white/20',
  Polish: 'bg-white/10 text-gray-300 border-white/20',
  Hindi: 'bg-white/10 text-gray-300 border-white/20',
}

function getTypeColor(type: string): string {
  const lower = type.toLowerCase()
  if (lower.includes('novel')) return TYPE_COLORS.novels
  if (lower.includes('manga')) return TYPE_COLORS.manga
  if (lower.includes('other')) return TYPE_COLORS.other
  // anime, movies, shows, tv, livestream, iptv, etc. → anime color
  return TYPE_COLORS.anime
}

function getManualUrl(ext: Extension): string {
  if (ext._manifestUrl) return ext._manifestUrl
  if (ext._repoUrl) return ext._repoUrl
  return ''
}

function getDomain(url: string): string {
  try {
    const u = new URL(url)
    return u.hostname.replace('www.', '')
  } catch {
    return url
  }
}

// ============ MULTI-SELECT DROPDOWN ============

interface FilterOption {
  key: string
  label: string
  count: number
  color?: string
}

function MultiSelectDropdown({
  label,
  icon: Icon,
  options,
  selected,
  onToggle,
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  options: FilterOption[]
  selected: string[]
  onToggle: (key: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectedCount = selected.length

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border transition-all ${
          selectedCount > 0
            ? 'bg-white/10 text-gray-300 border-white/20'
            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
        }`}
      >
        <Icon className="w-3.5 h-3.5" />
        {label}
        {selectedCount > 0 && (
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-[9px] font-bold text-gray-300">
            {selectedCount}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-[#16161e] border border-white/10 rounded-lg shadow-2xl p-1 max-h-72 overflow-y-auto w-56 scrollbar-thin">
          {options.map(opt => (
            <button
              key={opt.key}
              onClick={() => onToggle(opt.key)}
              className={`w-full text-left px-2.5 py-2 rounded-md text-[11px] font-medium transition-all flex items-center gap-2 ${
                selected.includes(opt.key)
                  ? (opt.color || 'bg-white/10 text-gray-300')
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${
                selected.includes(opt.key)
                  ? 'bg-white/20 border-white/40'
                  : 'border-white/20'
              }`}>
                {selected.includes(opt.key) && <Check className="w-2.5 h-2.5 text-white" />}
              </span>
              <span className="truncate flex-1">{opt.label}</span>
              <span className="opacity-40 tabular-nums flex-shrink-0">{opt.count.toLocaleString()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ============ MAIN COMPONENT ============

type ViewMode = 'extensions' | 'repos'
type CardLayout = 'grid' | 'glass'

export default function Home() {
  const [extData, setExtData] = useState<Extension[] | null>(null)
  const [search, setSearch] = useState('')
  const [platformFilter, setPlatformFilter] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [langFilter, setLangFilter] = useState<string[]>([])
  const [showNsfw, setShowNsfw] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewModeState] = useState<ViewMode>('extensions')
  const [cardLayout, setCardLayoutState] = useState<CardLayout>('grid')

  const setViewMode = useCallback((v: ViewMode) => {
    setViewModeState(v)
    try { localStorage.setItem('anymex-viewMode', v) } catch {}
  }, [])

  const setCardLayout = useCallback((c: CardLayout) => {
    setCardLayoutState(c)
    try { localStorage.setItem('anymex-cardLayout', c) } catch {}
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('anymex-viewMode')
      if (saved === 'extensions' || saved === 'repos') setViewModeState(saved)
      const savedLayout = localStorage.getItem('anymex-cardLayout')
      if (savedLayout === 'grid' || savedLayout === 'glass') setCardLayoutState(savedLayout)
    } catch {}
  }, [])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showCount, setShowCount] = useState(300)
  const { toast } = useToast()

  useEffect(() => {
    let cancelled = false
    fetch('/api/extensions', { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((d: Extension[]) => {
        if (!cancelled) {
          setExtData(d)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          console.error('Failed to fetch:', err)
          setError('Failed to load extensions. Please try again.')
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [])

  const togglePlatform = useCallback((p: string) => {
    setPlatformFilter(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    )
  }, [])

  const validFilterKeys = useMemo(() => {
    if (!platformFilter.length || !extData) return { types: null as Set<string> | null, langs: null as Set<string> | null }
    const validTypes = new Set<string>()
    const validLangs = new Set<string>()
    for (const e of extData) {
      if (!platformFilter.includes(e._platform)) continue
      if (!showNsfw && isNsfw(e)) continue
      for (const t of e._allTypes) validTypes.add(t.toLowerCase())
      const extLangs = e.languages && e.languages.length > 0 ? e.languages : [e.langBase]
      for (const l of extLangs) validLangs.add(l)
    }
    return { types: validTypes, langs: validLangs }
  }, [platformFilter, extData, showNsfw])

  const effectiveTypeFilter = validFilterKeys.types ? typeFilter.filter(t => validFilterKeys.types!.has(t)) : typeFilter
  const effectiveLangFilter = validFilterKeys.langs ? langFilter.filter(l => validFilterKeys.langs!.has(l)) : langFilter

  const toggleType = useCallback((t: string) => {
    setTypeFilter(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }, [])

  const toggleLang = useCallback((l: string) => {
    setLangFilter(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l])
  }, [])

  const copyUrl = useCallback((url: string, name: string, id?: string) => {
    navigator.clipboard.writeText(url)
    toast({ title: 'Copied!', description: `${name} URL copied to clipboard` })
    if (id) {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }, [toast])

  // ============ Derived data ============

  const filtered = useMemo(() => {
    if (!extData) return []
    let result = extData

    if (!showNsfw) {
      result = result.filter(e => !isNsfw(e))
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e._repo.toLowerCase().includes(q) ||
        e.language.toLowerCase().includes(q) ||
        e.langBase.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q) ||
        (typeof e.baseUrl === 'string' && e.baseUrl.toLowerCase().includes(q)) ||
        (typeof e.version === 'string' && e.version.toLowerCase().includes(q))
      )
    }

    if (platformFilter.length > 0) {
      result = result.filter(e => platformFilter.includes(e._platform))
    }

    if (effectiveTypeFilter.length > 0) {
      result = result.filter(e => e._allTypes.some(t => effectiveTypeFilter.includes(t.toLowerCase())))
    }

    if (effectiveLangFilter.length > 0) {
      result = result.filter(e => {
        const langs = e.languages && e.languages.length > 0 ? e.languages : [e.langBase]
        return langs.some(l => effectiveLangFilter.includes(l))
      })
    }

    return result
  }, [extData, search, platformFilter, effectiveTypeFilter, effectiveLangFilter, showNsfw])

  const repoData = useMemo(() => {
    if (!extData) return []
    const repoMap = new Map<string, { ext: Extension; repo: Repo }>()

    for (const ext of extData) {
      const key = `${ext._platform}-${ext._repo}-${ext._fileType || 'all'}`
      if (!repoMap.has(key)) {
        repoMap.set(key, {
          ext,
          repo: {
            platform: ext._platform,
            repo: ext._repo,
            count: 0,
            types: [],
            languages: [],
            autoInstall: ext._autoInstall || '',
            allInOneAutoInstall: ext._allInOneAutoInstall || '',
            manualUrl: ext._repoUrl,
            repoUrl: ext._repoUrl,
          }
        })
      }
      const entry = repoMap.get(key)!
      entry.repo.count++
      if (!entry.repo.types.includes(ext.type)) entry.repo.types.push(ext.type)
      const extLangs = ext.languages && ext.languages.length > 0 ? ext.languages : [ext.langBase]
      for (const l of extLangs) {
        if (!entry.repo.languages.includes(l)) entry.repo.languages.push(l)
      }
    }

    const result = Array.from(repoMap.values()).map(e => e.repo)

    const groupedPlatforms = new Set(['mangayomi', 'cloudstream'])
    const platformGroups = new Map<string, { platform: string; repo: string; entries: Repo[] }>()
    for (const repo of result) {
      if (groupedPlatforms.has(repo.platform)) {
        const gk = `${repo.platform}-${repo.repo}`
        if (!platformGroups.has(gk)) platformGroups.set(gk, { platform: repo.platform, repo: repo.repo, entries: [] })
        platformGroups.get(gk)!.entries.push(repo)
      }
    }

    const finalRepos: Repo[] = []
    const seenGrouped = new Set<string>()

    for (const repo of result) {
      const gk = `${repo.platform}-${repo.repo}`
      if (groupedPlatforms.has(repo.platform)) {
        if (seenGrouped.has(gk)) continue
        seenGrouped.add(gk)

        const group = platformGroups.get(gk)?.entries || []
        const total = group.reduce((a, r) => a + r.count, 0)
        const allTypes = [...new Set(group.flatMap(r => r.types))]
        const allLangs = [...new Set(group.flatMap(r => r.languages))]
        const allInOne = group.find(r => r.allInOneAutoInstall)?.allInOneAutoInstall || ''

        const typeUrls: RepoTypeUrl[] = group.map(r => ({
          type: r.types[0] || 'other',
          autoInstall: r.autoInstall as string,
          manualUrl: r.repoUrl,
          count: r.count,
        }))

        finalRepos.push({
          platform: repo.platform,
          repo: repo.repo,
          count: total,
          types: allTypes,
          languages: allLangs,
          autoInstall: typeUrls,
          allInOneAutoInstall: allInOne,
          manualUrl: repo.repoUrl,
          repoUrl: repo.repoUrl,
        })
      } else {
        finalRepos.push(repo)
      }
    }

    return finalRepos
  }, [extData])

  const filteredRepos = useMemo(() => {
    let result = repoData

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(r =>
        r.repo.toLowerCase().includes(q) ||
        r.platform.toLowerCase().includes(q) ||
        r.languages.some(l => l.toLowerCase().includes(q)) ||
        r.types.some(t => t.toLowerCase().includes(q))
      )
    }

    if (platformFilter.length > 0) {
      result = result.filter(r => platformFilter.includes(r.platform))
    }

    if (effectiveTypeFilter.length > 0) {
      result = result.filter(r => r.types.some(t => effectiveTypeFilter.includes(t.toLowerCase())))
    }

    if (effectiveLangFilter.length > 0) {
      result = result.filter(r => r.languages.some(l => effectiveLangFilter.includes(l)))
    }

    return result
  }, [repoData, search, platformFilter, effectiveTypeFilter, effectiveLangFilter])

  const stats = useMemo(() => {
    if (!extData) return { total: 0, nsfw: 0, platforms: {} as Record<string, number>, types: {} as Record<string, number>, languages: {} as Record<string, number> }
    const platforms: Record<string, number> = {}
    const types: Record<string, number> = {}
    const languages: Record<string, number> = {}
    let nsfw = 0
    for (const e of extData) {
      platforms[e._platform] = (platforms[e._platform] || 0) + 1
      for (const t of e._allTypes) types[t] = (types[t] || 0) + 1
      if (isNsfw(e)) nsfw++
      const extLangs = e.languages && e.languages.length > 0 ? e.languages : [e.langBase]
      for (const l of extLangs) {
        languages[l] = (languages[l] || 0) + 1
      }
    }
    return { total: extData.length, nsfw, platforms, types, languages }
  }, [extData])

  const filteredStats = useMemo(() => {
    if (!extData) return { platforms: {} as Record<string, number>, types: {} as Record<string, number>, languages: {} as Record<string, number> }
    let source = extData
    if (platformFilter.length > 0) {
      source = source.filter(e => platformFilter.includes(e._platform))
    }
    if (effectiveTypeFilter.length > 0) {
      source = source.filter(e => e._allTypes.some(t => effectiveTypeFilter.includes(t.toLowerCase())))
    }
    if (effectiveLangFilter.length > 0) {
      source = source.filter(e => {
        const langs = e.languages && e.languages.length > 0 ? e.languages : [e.langBase]
        return langs.some(l => effectiveLangFilter.includes(l))
      })
    }
    const platforms: Record<string, number> = {}
    const types: Record<string, number> = {}
    const languages: Record<string, number> = {}
    for (const e of source) {
      if (!showNsfw && isNsfw(e)) continue
      platforms[e._platform] = (platforms[e._platform] || 0) + 1
      for (const t of e._allTypes) types[t] = (types[t] || 0) + 1
      const extLangs = e.languages && e.languages.length > 0 ? e.languages : [e.langBase]
      for (const l of extLangs) {
        languages[l] = (languages[l] || 0) + 1
      }
    }
    return { platforms, types, languages }
  }, [extData, platformFilter, effectiveTypeFilter, effectiveLangFilter, showNsfw])

  const platformOptions = useMemo(() =>
    Object.entries(PLATFORM_LABELS)
      .filter(([key]) => stats.platforms[key])
      .map(([key, label]) => ({ key, label, count: stats.platforms[key] || 0, color: PLATFORM_COLORS[key] }))
  , [stats.platforms])

  const typeOptions = useMemo(() =>
    Object.entries(stats.types)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({ key: type.toLowerCase(), label: type, count, color: getTypeColor(type) }))
  , [stats.types])

  const langOptions = useMemo(() =>
    Object.entries(stats.languages)
      .sort((a, b) => b[1] - a[1])
      .map(([lang, count]) => ({ key: lang, label: lang, count, color: LANG_COLORS[lang] }))
  , [stats.languages])

  const clearFilters = useCallback(() => {
    setPlatformFilter([])
    setTypeFilter([])
    setLangFilter([])
    setSearch('')
  }, [])

  const hasFilters = platformFilter.length > 0 || typeFilter.length > 0 || langFilter.length > 0 || search.length > 0 || showNsfw

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="px-4 sm:px-6 py-3 sm:py-4 max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="AnymeX" className="w-7 h-7 rounded-lg object-contain" />
              <h1 className="text-base sm:text-lg font-semibold text-gray-100">
                AnymeX Extensions
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* NSFW Toggle */}
              <button
                onClick={() => setShowNsfw(!showNsfw)}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-medium transition-all ${
                  showNsfw
                    ? 'bg-white/10 text-gray-300'
                    : 'text-gray-500 hover:text-gray-400'
                }`}
                title={showNsfw ? 'Hide NSFW' : 'Show NSFW'}
              >
                {showNsfw ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">NSFW</span>
              </button>

              {/* Layout toggle */}
              <div className="flex bg-white/5 rounded-lg border border-white/10 p-0.5">
                <button
                  onClick={() => setCardLayout('grid')}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                    cardLayout === 'grid' ? 'bg-white/10 text-gray-200' : 'text-gray-500 hover:text-gray-300'
                  }`}
                  title="Grid view"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>
                </button>
                <button
                  onClick={() => setCardLayout('glass')}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                    cardLayout === 'glass' ? 'bg-white/10 text-gray-200' : 'text-gray-500 hover:text-gray-300'
                  }`}
                  title="Glass view"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="14" height="6" rx="1.5"/><rect x="1" y="9" width="14" height="6" rx="1.5"/></svg>
                </button>
              </div>

              {/* View mode toggle */}
              <div className="flex bg-white/5 rounded-lg border border-white/10 p-0.5">
                <button
                  onClick={() => { setViewMode('extensions'); setShowCount(300) }}
                  className={`px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all ${
                    viewMode === 'extensions' ? 'bg-white/10 text-gray-200' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 inline sm:mr-1" />
                  <span className="hidden sm:inline">Extensions</span>
                </button>
                <button
                  onClick={() => setViewMode('repos')}
                  className={`px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all ${
                    viewMode === 'repos' ? 'bg-white/10 text-gray-200' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 inline sm:mr-1" />
                  <span className="hidden sm:inline">Repos</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search extensions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 focus:border-white/20 focus:ring-white/10 text-gray-200 placeholder:text-gray-600 text-sm"
            />
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="absolute right-2 top-1/2 -translate-y-1/2 h-7 text-gray-500 hover:text-gray-300">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="px-3 sm:px-6 py-4 sm:py-6 flex-1 max-w-6xl mx-auto w-full">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <MultiSelectDropdown
            label="Platform"
            icon={Package}
            options={platformOptions}
            selected={platformFilter}
            onToggle={togglePlatform}
          />

          <MultiSelectDropdown
            label="Type"
            icon={Zap}
            options={typeOptions}
            selected={typeFilter}
            onToggle={toggleType}
          />

          <MultiSelectDropdown
            label="Language"
            icon={ExternalLink}
            options={langOptions}
            selected={langFilter}
            onToggle={toggleLang}
          />

          {/* Active filter pills */}
          {(platformFilter.length > 0 || typeFilter.length > 0 || langFilter.length > 0) && (
            <div className="flex flex-wrap items-center gap-1 ml-1">
              {platformFilter.map(p => {
                const opt = platformOptions.find(o => o.key === p)
                return (
                  <button
                    key={`pf-${p}`}
                    onClick={() => togglePlatform(p)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${opt?.color || PLATFORM_COLORS[p] || 'bg-white/10 text-gray-300 border-white/20'}`}
                  >
                    {opt?.label || p}
                    <X className="w-2.5 h-2.5" />
                  </button>
                )
              })}
              {typeFilter.map(t => {
                const opt = typeOptions.find(o => o.key === t)
                return (
                  <button
                    key={`tf-${t}`}
                    onClick={() => toggleType(t)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${opt?.color || getTypeColor(t) || 'bg-white/10 text-gray-300 border-white/20'}`}
                  >
                    {opt?.label || t}
                    <X className="w-2.5 h-2.5" />
                  </button>
                )
              })}
              {langFilter.map(l => {
                const opt = langOptions.find(o => o.key === l)
                return (
                  <button
                    key={`lf-${l}`}
                    onClick={() => toggleLang(l)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${opt?.color || LANG_COLORS[l] || 'bg-white/10 text-gray-300 border-white/20'}`}
                  >
                    {l}
                    <X className="w-2.5 h-2.5" />
                  </button>
                )
              })}
              <button
                onClick={clearFilters}
                className="text-[10px] text-gray-500 hover:text-gray-300 ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-3 text-xs text-gray-500">
          {viewMode === 'extensions' ? (
            <>Showing {Math.min(showCount, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()} extensions{!showNsfw && stats.nsfw > 0 ? ` (${stats.nsfw.toLocaleString()} NSFW hidden)` : ''}</>
          ) : (
            <>{filteredRepos.length} repos · {filteredRepos.reduce((a, r) => a + r.count, 0).toLocaleString()} total extensions</>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-2 border-white/20 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="bg-white/5 border-white/10 text-gray-400 hover:bg-white/10">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        )}

        {/* ========== Extensions View ========== */}
        {!loading && !error && viewMode === 'extensions' && (
          <>
            {/* Grid Layout (Design B - App Store Tiles) */}
            {cardLayout === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {filtered.slice(0, showCount).map((ext, i) => {
                  const manualUrl = getManualUrl(ext)
                  const copyId = `ext-${ext._platform}-${ext._repo}-${i}`
                  const hasVersion = ext.version && ext.version !== '' && ext.version !== 'undefined'
                  const baseUrl = typeof ext.baseUrl === 'string' ? ext.baseUrl : ''
                  const domain = baseUrl ? getDomain(baseUrl) : ''
                  const nsfw = isNsfw(ext)
                  const langs = ext.languages && ext.languages.length > 0 ? ext.languages : [ext.langBase]
                  return (
                    <div key={copyId} className={`flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all text-center ${nsfw ? 'border-white/15' : ''}`}>
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex-shrink-0 flex items-center justify-center overflow-hidden mb-2">
                        <img src={ext.icon || '/logo.png'} alt="" className="w-10 h-10 object-contain" loading="lazy" />
                      </div>

                      {/* Name + nsfw */}
                      <div className="w-full mb-1">
                        <h3 className="text-xs font-medium text-gray-100 truncate" title={ext.name}>{ext.name}</h3>
                        {nsfw && <span className="text-[8px] font-bold text-red-400 uppercase">NSFW</span>}
                      </div>

                      {/* Platform with logo */}
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        {PLATFORM_ICON[ext._platform] && <img src={PLATFORM_ICON[ext._platform]} alt="" className="w-3.5 h-3.5 rounded object-contain opacity-70" />}
                        <span className="text-[11px] text-gray-500">{PLATFORM_LABELS[ext._platform]}</span>
                      </div>

                      {/* Types */}
                      <div className="text-[11px] text-gray-400 truncate w-full mb-0.5">
                        {ext._allTypes.join(', ')}
                      </div>

                      {/* Languages */}
                      <div className="text-[10px] text-gray-500 truncate w-full mb-0.5">
                        {langs.slice(0, 3).join(', ')}{langs.length > 3 ? ` +${langs.length - 3}` : ''}
                      </div>

                      {/* Repo + version + domain */}
                      <div className="text-[10px] text-gray-600 truncate w-full mb-1">
                        {ext._repo}{domain ? ` · ${domain}` : ''}{hasVersion ? ` · v${ext.version}` : ''}
                      </div>

                      {/* Actions at bottom */}
                      <div className="mt-auto pt-1.5 w-full space-y-1">
                        {ext._autoInstall && (
                          <a href={ext._autoInstall} className="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-md text-[10px] font-semibold bg-white/[0.1] border border-white/[0.15] text-gray-200 hover:bg-white/[0.15] transition-all w-full">
                            <ExternalLink className="w-3 h-3" />Install
                          </a>
                        )}
                        {manualUrl && (
                          <button onClick={() => copyUrl(manualUrl, ext.name, copyId)} className="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-md text-[10px] font-medium bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all w-full">
                            {copiedId === copyId ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}{copiedId === copyId ? 'Copied' : 'Copy URL'}
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Glass / List Layout */}
            {cardLayout === 'glass' && (
              <div className="space-y-2">
                {filtered.slice(0, showCount).map((ext, i) => {
                  const manualUrl = getManualUrl(ext)
                  const copyId = `ext-${ext._platform}-${ext._repo}-${i}`
                  const hasVersion = ext.version && ext.version !== '' && ext.version !== 'undefined'
                  const baseUrl = typeof ext.baseUrl === 'string' ? ext.baseUrl : ''
                  const domain = baseUrl ? getDomain(baseUrl) : ''
                  const nsfw = isNsfw(ext)
                  const langs = ext.languages && ext.languages.length > 0 ? ext.languages : [ext.langBase]
                  return (
                    <div key={copyId} className={`rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all overflow-hidden shadow-lg shadow-black/20 ${nsfw ? 'border-white/15' : ''}`}>
                      <div className="flex-1 min-w-0 px-4 py-3">
                        {/* Row 1: Icon + Name (left) | Install button (top right) */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex-shrink-0 flex items-center justify-center overflow-hidden">
                            <img src={ext.icon || '/logo.png'} alt="" className="w-5 h-5 object-contain" loading="lazy" />
                          </div>
                          <div className="min-w-0 flex-1 flex items-center gap-2">
                            <h3 className="text-sm font-medium text-white truncate" title={ext.name}>{ext.name}</h3>
                            {nsfw && <span className="text-[9px] font-bold text-red-400 flex-shrink-0">18+</span>}
                            {hasVersion && <span className="text-[11px] text-gray-600 flex-shrink-0">v{ext.version}</span>}
                          </div>
                          <div className="flex-shrink-0">
                            {ext._autoInstall && <a href={ext._autoInstall} className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-[11px] font-semibold bg-white/[0.1] border border-white/[0.15] text-gray-200 hover:bg-white/[0.15] transition-all active:scale-[0.97] whitespace-nowrap"><ExternalLink className="w-3 h-3" />Install</a>}
                          </div>
                        </div>
                        {/* Row 2: Platform + Type */}
                        <div className="flex items-center gap-2 mt-1 text-[11px]">
                          {PLATFORM_ICON[ext._platform] && <img src={PLATFORM_ICON[ext._platform]} alt="" className="w-3.5 h-3.5 rounded object-contain opacity-70 flex-shrink-0" />}
                          <span className="text-gray-500">{PLATFORM_LABELS[ext._platform]}</span>
                          <span className="text-gray-700">·</span>
                          <span className="text-gray-400">{ext._allTypes.join(', ')}</span>
                        </div>
                        {/* Row 3: Language */}
                        <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                          <span className="text-gray-600">Language</span>
                          <span className="text-gray-400 truncate">{langs.slice(0, 3).join(', ')}{langs.length > 3 ? ` +${langs.length - 3}` : ''}</span>
                        </div>
                        {/* Row 4: Repo + Domain */}
                        <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                          <span className="text-gray-600">Repo</span>
                          <span className="text-gray-400 truncate">{ext._repo}{domain ? ` · ${domain}` : ''}</span>
                        </div>
                        {/* Row 5: Copy button (bottom right) */}
                        {manualUrl && (
                          <div className="flex justify-end mt-2">
                            <button onClick={() => copyUrl(manualUrl, ext.name, copyId)} className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-[11px] font-medium bg-white/[0.06] border border-white/[0.1] text-gray-400 hover:text-white hover:bg-white/[0.1] transition-all active:scale-[0.97] whitespace-nowrap">
                              {copiedId === copyId ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}{copiedId === copyId ? 'Copied!' : 'Copy URL'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Load more */}
            {filtered.length > showCount && (
              <div className="text-center py-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCount(prev => prev + 300)}
                  className="bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-300"
                >
                  Load more ({(filtered.length - showCount).toLocaleString()} remaining)
                </Button>
              </div>
            )}
          </>
        )}

        {/* ========== Repos View ========== */}
        {!loading && !error && viewMode === 'repos' && (
          <>
            {/* Grid Layout */}
            {cardLayout === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredRepos.map((repo, ri) => {
                  const repoKey = `${repo.platform}-${repo.repo}-${repo.types.join('-')}`
                  const hasTypeUrls = Array.isArray(repo.autoInstall)
                  const typeUrls = hasTypeUrls ? repo.autoInstall as RepoTypeUrl[] : []
                  const hasAllInOne = !!repo.allInOneAutoInstall
                  const addRepoUrl = hasTypeUrls ? (typeUrls[0]?.autoInstall || '') : (typeof repo.autoInstall === 'string' ? repo.autoInstall : '')
                  const isMangayomi = repo.platform === 'mangayomi'

                  return (
                    <div key={repoKey} className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all text-center">
                      {/* Platform logo */}
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex-shrink-0 flex items-center justify-center overflow-hidden mb-2 p-1.5">
                        {PLATFORM_ICON[repo.platform] ? (
                          <img src={PLATFORM_ICON[repo.platform]} alt="" className="w-full h-full object-contain" loading="lazy" />
                        ) : (
                          <span className="text-sm font-semibold text-gray-600">{repo.repo.charAt(0).toUpperCase()}</span>
                        )}
                      </div>

                      {/* Repo name */}
                      <div className="w-full mb-1">
                        <h3 className="text-xs font-medium text-gray-100 truncate" title={repo.repo}>{repo.repo}</h3>
                      </div>

                      {/* Platform + count */}
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="text-[11px] text-gray-500">{PLATFORM_LABELS[repo.platform]}</span>
                        <span className="text-[11px] text-gray-600">·</span>
                        <span className="text-[11px] text-gray-400">{repo.count} ext</span>
                      </div>

                      {/* Types */}
                      <div className="text-[11px] text-gray-500 truncate w-full mb-0.5">
                        {repo.types.slice(0, 3).join(', ')}{repo.types.length > 3 ? ` +${repo.types.length - 3}` : ''}
                      </div>

                      {/* Languages */}
                      <div className="text-[10px] text-gray-600 truncate w-full mb-1">
                        {repo.languages.slice(0, 4).join(', ')}{repo.languages.length > 4 ? ` +${repo.languages.length - 4}` : ''}
                      </div>

                      {/* Actions at bottom */}
                      <div className="mt-auto pt-1.5 w-full space-y-1">
                        {/* Deep links - all on one row */}
                        {isMangayomi && hasAllInOne ? (
                          <div className="flex items-center gap-1 w-full">
                            <a href={repo.allInOneAutoInstall} className="inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-md text-[10px] font-semibold bg-white/[0.1] border border-white/[0.15] text-gray-200 hover:bg-white/[0.15] transition-all flex-shrink-0">
                              <ExternalLink className="w-2.5 h-2.5" />All
                            </a>
                            {hasTypeUrls && typeUrls.map((tu, ti) => (
                              <a key={ti} href={tu.autoInstall} className="py-1.5 px-2 rounded-md text-[9px] font-semibold bg-white/[0.06] border border-white/[0.1] text-gray-300 hover:bg-white/[0.1] transition-all flex-1 text-center">
                                {tu.type}
                              </a>
                            ))}
                          </div>
                        ) : repo.platform === 'sora' ? null : addRepoUrl ? (
                          <a href={addRepoUrl} className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-[10px] font-semibold bg-white/[0.1] border border-white/[0.15] text-gray-200 hover:bg-white/[0.15] transition-all w-full">
                            <ExternalLink className="w-3 h-3" />Add Repo
                          </a>
                        ) : null}
                        {/* Copy buttons */}
                        {isMangayomi && hasTypeUrls ? (
                          <div className="flex items-center gap-1 w-full">
                            {typeUrls.map((tu, ti) => (
                              <button key={ti} onClick={() => copyUrl(tu.manualUrl, `${repo.repo} ${tu.type}`, `repo-${repoKey}-t${ti}`)} className="inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-md text-[10px] font-medium bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all flex-1">
                                {copiedId === `repo-${repoKey}-t${ti}` ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}{copiedId === `repo-${repoKey}-t${ti}` ? 'Copied' : tu.type}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <button onClick={() => copyUrl(repo.manualUrl || repo.repoUrl, repo.repo, `repo-${repoKey}`)} className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-[10px] font-medium bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all w-full">
                            {copiedId === `repo-${repoKey}` ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}{copiedId === `repo-${repoKey}` ? 'Copied!' : 'Copy URL'}
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Glass / List Layout */}
            {cardLayout === 'glass' && (
              <div className="space-y-2">
                {filteredRepos.map((repo, ri) => {
                  const repoKey = `${repo.platform}-${repo.repo}-${repo.types.join('-')}`
                  const hasTypeUrls = Array.isArray(repo.autoInstall)
                  const typeUrls = hasTypeUrls ? repo.autoInstall as RepoTypeUrl[] : []
                  const hasAllInOne = !!repo.allInOneAutoInstall
                  const addRepoUrl = hasTypeUrls ? (typeUrls[0]?.autoInstall || '') : (typeof repo.autoInstall === 'string' ? repo.autoInstall : '')
                  const isMangayomi = repo.platform === 'mangayomi'

                  return (
                    <div key={repoKey} className="rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all overflow-hidden shadow-lg shadow-black/20">
                      <div className="flex-1 min-w-0 px-4 py-3">
                        {/* Row 1: Icon + Name (left) | Deep links (right) */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex-shrink-0 flex items-center justify-center overflow-hidden p-1">
                            {PLATFORM_ICON[repo.platform] ? (
                              <img src={PLATFORM_ICON[repo.platform]} alt="" className="w-full h-full object-contain" loading="lazy" />
                            ) : (
                              <span className="text-[10px] font-semibold text-gray-500">{repo.repo.charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-medium text-white truncate" title={repo.repo}>{repo.repo}</h3>
                            <span className="text-[11px] text-gray-600">{PLATFORM_LABELS[repo.platform]} · {repo.count} ext</span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
                            {isMangayomi && hasAllInOne ? (
                              <>
                                <a href={repo.allInOneAutoInstall} className="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg text-[11px] font-semibold bg-white/[0.1] border border-white/[0.15] text-gray-200 hover:bg-white/[0.15] transition-all active:scale-[0.97] whitespace-nowrap">
                                  <ExternalLink className="w-3 h-3" />Add All
                                </a>
                                {hasTypeUrls && typeUrls.map((tu, ti) => (
                                  <a key={ti} href={tu.autoInstall} className="py-1.5 px-2.5 rounded-lg text-[10px] font-semibold bg-white/[0.08] border border-white/[0.1] text-gray-300 hover:bg-white/[0.12] transition-all whitespace-nowrap">
                                    {tu.type}
                                  </a>
                                ))}
                              </>
                            ) : repo.platform === 'sora' ? null : addRepoUrl ? (
                              <a href={addRepoUrl} className="inline-flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg text-[11px] font-semibold bg-white/[0.1] border border-white/[0.15] text-gray-200 hover:bg-white/[0.15] transition-all active:scale-[0.97] whitespace-nowrap">
                                <ExternalLink className="w-3 h-3" />Add Repo
                              </a>
                            ) : null}
                          </div>
                        </div>
                        {/* Row 2: Types */}
                        <div className="flex items-center gap-2 mt-1 text-[11px]">
                          <span className="text-gray-600">Types</span>
                          <span className="text-gray-400">{repo.types.join(', ')}</span>
                        </div>
                        {/* Row 3: Languages */}
                        <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                          <span className="text-gray-600">Languages</span>
                          <span className="text-gray-500 truncate">{repo.languages.slice(0, 4).join(', ')}{repo.languages.length > 4 ? ` +${repo.languages.length - 4}` : ''}</span>
                        </div>
                        {/* Row 4: Copy buttons (bottom right) */}
                        <div className="flex items-center gap-1.5 mt-2 justify-end flex-wrap">
                          {isMangayomi && hasTypeUrls ? (
                            typeUrls.map((tu, ti) => (
                              <button key={ti} onClick={() => copyUrl(tu.manualUrl, `${repo.repo} ${tu.type}`, `repo-${repoKey}-t${ti}`)} className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-[11px] font-medium bg-white/[0.06] border border-white/[0.1] text-gray-400 hover:text-white hover:bg-white/[0.1] transition-all active:scale-[0.97] whitespace-nowrap">
                                {copiedId === `repo-${repoKey}-t${ti}` ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                                {copiedId === `repo-${repoKey}-t${ti}` ? 'Copied!' : tu.type}
                              </button>
                            ))
                          ) : (
                            <button onClick={() => copyUrl(repo.manualUrl || repo.repoUrl, repo.repo, `repo-${repoKey}`)} className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-[11px] font-medium bg-white/[0.06] border border-white/[0.1] text-gray-400 hover:text-white hover:bg-white/[0.1] transition-all active:scale-[0.97] whitespace-nowrap">
                              {copiedId === `repo-${repoKey}` ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                              {copiedId === `repo-${repoKey}` ? 'Copied!' : 'Copy URL'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* No results */}
        {!loading && !error && ((viewMode === 'extensions' && filtered.length === 0 && extData) || (viewMode === 'repos' && filteredRepos.length === 0)) && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">No {viewMode === 'extensions' ? 'extensions' : 'repos'} found</p>
            <Button variant="ghost" onClick={clearFilters} className="text-gray-400">
              Clear all filters
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5">
        <div className="px-4 py-3 text-center text-[10px] text-gray-600">
          AnymeX Extensions
        </div>
      </footer>
    </div>
  )
}
