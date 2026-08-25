'use client'

import { Suspense } from 'react'
import { useParams } from 'next/navigation'
import { SETTINGS_CATEGORIES } from '@/lib/settings-data'
import SettingsGuidePage from '@/components/SettingsGuidePage'

function SettingsCategoryContent() {
  const params = useParams<{ category: string }>()
  const category = SETTINGS_CATEGORIES.find(c => c.slug === params.category)

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-gray-100">
        <div className="text-center">
          <p className="text-6xl mb-4">404</p>
          <h1 className="text-xl font-bold text-white mb-2">Settings Category Not Found</h1>
          <p className="text-sm text-gray-400 mb-6">
            The category &ldquo;{params.category}&rdquo; doesn&rsquo;t exist.
          </p>
          <a
            href="/guides"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-white/10 border border-white/20 text-white hover:bg-white/[0.15] transition-all"
          >
            ← Back to Guides
          </a>
        </div>
      </div>
    )
  }

  return <SettingsGuidePage category={category} />
}

export default function SettingsCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-gray-100">
          <div className="w-8 h-8 border-2 border-white/20 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 mt-3">Loading...</p>
        </div>
      }
    >
      <SettingsCategoryContent />
    </Suspense>
  )
}

export function generateStaticParams() {
  return SETTINGS_CATEGORIES.map(c => ({
    category: c.slug,
  }))
}
