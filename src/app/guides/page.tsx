'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import {
  Download,
  BookOpen,
  Package,
  Copy,
  ChevronRight,
  Shield,
} from 'lucide-react'

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
              <Link href="/guides" className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-medium text-white bg-white/10 border border-white/20 transition-all">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Guides</span>
              </Link>
            </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {/* Quick tip */}
        <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
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
