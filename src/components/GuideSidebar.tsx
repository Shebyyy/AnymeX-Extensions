'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Download,
  Menu,
  X,
  Settings,
  ChevronRight,
} from 'lucide-react'

const GUIDES = [
  {
    title: 'Setup Guide',
    description: 'Install & configure AnymeX',
    icon: <BookOpen className="w-4 h-4" />,
    href: '/guide',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    title: 'Download Guide',
    description: 'Download anime & manga',
    icon: <Download className="w-4 h-4" />,
    href: '/download-guide',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
]

export default function GuideSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Sticky wrapper */}
      <div className="sticky top-14 z-30 h-0">
        <button
          onClick={() => setOpen(!open)}
          className="absolute -left-10 top-1 w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.12] transition-all backdrop-blur-sm"
          aria-label="Toggle guides"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sliding sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-[#0a0a0f] border-r border-white/[0.06] z-50 transform transition-transform duration-200 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Guides</p>
          <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-3 space-y-1">
          {GUIDES.map(guide => {
            const isActive = pathname === guide.href
            return (
              <Link
                key={guide.href}
                href={guide.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? `${guide.bg} ${guide.color} border ${guide.border} font-semibold`
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <span className="flex-shrink-0">{guide.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate">{guide.title}</p>
                  <p className={`text-[10px] truncate ${isActive ? 'opacity-70' : 'text-gray-600'}`}>{guide.description}</p>
                </div>
              </Link>
            )
          })}

          {/* Settings section */}
          <div className="pt-3 mt-2 border-t border-white/[0.06]">
            <Link
              href="/guides"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:bg-white/[0.03] border border-transparent transition-all"
            >
              <Settings className="w-4 h-4 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium truncate">Settings Guides</p>
                <p className="text-[10px] text-gray-600 truncate">15 categories</p>
              </div>
              <ChevronRight className="w-3 h-3 flex-shrink-0 text-gray-600" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
