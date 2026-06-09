'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Download,
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

  return (
    <aside className="hidden lg:block w-56 flex-shrink-0">
      <div className="sticky top-20 space-y-1">
        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2 px-2">Guides</p>
        {GUIDES.map(guide => {
          const isActive = pathname === guide.href
          return (
            <Link
              key={guide.href}
              href={guide.href}
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
    </aside>
  )
}
