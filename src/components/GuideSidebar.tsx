'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Download,
  Menu,
  X,
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
      {/* Hamburger toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 border border-white/[0.06] transition-all mb-4"
        aria-label="Toggle guides navigation"
      >
        <Menu className="w-4 h-4" />
        <span>Guides</span>
      </button>

      {/* Overlay backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-[#0a0a0f] border-r border-white/[0.06] z-50
          transform transition-transform duration-200 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:sticky lg:top-20 lg:h-auto lg:w-56 lg:flex-shrink-0 lg:translate-x-0 lg:z-auto lg:transition-none
          ${open ? 'lg:block' : 'lg:block'}
        `}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Guides</p>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2 lg:p-0">
          <p className="hidden lg:block text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2 px-3">Guides</p>
          <div className="space-y-1">
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
          </div>
        </div>
      </aside>
    </>
  )
}
