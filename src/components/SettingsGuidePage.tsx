'use client'

import Link from 'next/link'
import {
  BookOpen,
  ChevronRight,
  User,
  Settings,
  HardDrive,
  Palette,
  Play,
  BookOpen as BookOpenIcon,
  Download,
  Puzzle,
  FileText,
  Info,
  Key,
  Hand,
  Layout,
  Database,
  type LucideProps,
} from 'lucide-react'
import type { SettingsCategory, SettingItem } from '@/lib/settings-data'
import GuideSidebar from '@/components/GuideSidebar'

// ============ ICON MAP ============

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  User,
  Settings,
  HardDrive,
  Palette,
  Play,
  BookOpen: BookOpenIcon,
  Download,
  Puzzle,
  FileText,
  Info,
  Key,
  Hand,
  Layout,
  Database,
}

// ============ TYPE BADGE STYLES ============

const TYPE_STYLES: Record<SettingItem['type'], { label: string; color: string; bg: string; border: string }> = {
  toggle: { label: 'Toggle', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  selector: { label: 'Selector', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  slider: { label: 'Slider', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  button: { label: 'Button', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  dialog: { label: 'Dialog', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  info: { label: 'Info', color: 'text-gray-400', bg: 'bg-white/5', border: 'border-white/10' },
  editor: { label: 'Editor', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  reorderable: { label: 'Reorderable', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
}

// ============ SECTION COLORS ============

const SECTION_COLORS = [
  'border-l-violet-400',
  'border-l-sky-400',
  'border-l-emerald-400',
  'border-l-amber-400',
  'border-l-pink-400',
  'border-l-cyan-400',
  'border-l-orange-400',
  'border-l-rose-400',
]

// ============ COMPONENT ============

interface SettingsGuidePageProps {
  category: SettingsCategory
}

export default function SettingsGuidePage({ category }: SettingsGuidePageProps) {
  const CategoryIcon = ICON_MAP[category.icon]

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
            <div className="flex items-center gap-1.5">
              <Link href="/guides" className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-medium text-white bg-white/10 border border-white/20 transition-all">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Guides</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-5 sm:py-8 flex-1 max-w-4xl mx-auto w-full">
        {/* Sidebar FAB */}
        <GuideSidebar />

        {/* Breadcrumb Path */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          <User className="w-3.5 h-3.5 text-gray-500" />
          {category.path.map((crumb, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-gray-500">{crumb}</span>
              {i < category.path.length - 1 && (
                <ChevronRight className="w-3 h-3 text-gray-700" />
              )}
            </div>
          ))}
          <ChevronRight className="w-3 h-3 text-gray-700" />
          <span className="text-xs font-semibold text-white">{category.name}</span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-3 mb-1">
          {CategoryIcon && (
            <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center ${category.color}`}>
              <CategoryIcon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{category.name}</h1>
            <p className="text-sm text-gray-400">{category.description}</p>
          </div>
        </div>

        {/* Quick Jump - Section Links */}
        <div className="flex items-center gap-2 mb-6 mt-6 overflow-x-auto pb-1">
          {category.sections.map((section, idx) => (
            <a
              key={section.title}
              href={`#section-${idx}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap border bg-white/[0.02] border-white/[0.06] text-gray-400 hover:text-gray-200 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all"
            >
              <span className="text-gray-600">{idx + 1}</span>
              <span>{section.title}</span>
            </a>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {category.sections.map((section, sectionIdx) => (
            <section key={section.title} id={`section-${sectionIdx}`}>
              {/* Section Header */}
              <div className={`flex items-center gap-2.5 mb-3 pb-2 border-b border-l-2 ${SECTION_COLORS[sectionIdx % SECTION_COLORS.length]} pl-3`}>
                <h2 className="text-sm sm:text-base font-bold text-gray-200">{section.title}</h2>
                <span className="text-[10px] font-medium text-gray-600 bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 rounded">
                  {section.items.length} {section.items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Setting Items */}
              <div className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <SettingItemCard key={itemIdx} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#0a0a0f]/80">
        <div className="px-4 sm:px-6 py-4 max-w-4xl mx-auto w-full flex items-center justify-between">
          <span className="text-xs text-gray-700">AnymeX Settings Guide</span>
          <Link href="/guides" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Guides</Link>
        </div>
      </footer>
    </div>
  )
}

// ============ SETTING ITEM CARD ============

function SettingItemCard({ item }: { item: SettingItem }) {
  const style = TYPE_STYLES[item.type]

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-3 sm:p-4 hover:bg-white/[0.025] transition-colors">
      {/* Top Row: Name + Type Badge */}
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-sm font-semibold text-white">{item.name}</h3>
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${style.color} ${style.bg} border ${style.border}`}>
              {style.label}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-[13px] text-gray-400 leading-relaxed">{item.description}</p>

          {/* Options / Range */}
          {(item.options || item.range) && (
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              {item.range && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.03] text-gray-400 border border-white/[0.06]">
                  <span className="text-gray-600">Range:</span> {item.range}
                </span>
              )}
              {item.options && item.options.map((opt) => (
                <span key={opt} className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.03] text-gray-400 border border-white/[0.06]">
                  {item.default === opt && <span className="text-amber-400 mr-1">★</span>}
                  {opt}
                </span>
              ))}
            </div>
          )}

          {/* Default (when no options to show inline) */}
          {item.default && !item.options && (
            <p className="mt-1.5 text-[11px] text-gray-500">
              Default: <span className="text-gray-400 font-medium">{item.default}</span>
            </p>
          )}

          {/* Platform */}
          {item.platform && (
            <p className="mt-1.5 text-[11px] text-gray-500">
              <span className="text-sky-500/80 font-medium">{item.platform}</span>
            </p>
          )}

          {/* Conditional */}
          {item.conditional && (
            <p className="mt-1.5 text-[11px] text-gray-500">
              <span className="text-amber-500/80">⚠</span> {item.conditional}
            </p>
          )}

          {/* Warning */}
          {item.warning && (
            <p className="mt-1.5 text-[11px] text-rose-400/80">
              <span className="text-rose-400">⚠</span> {item.warning}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}