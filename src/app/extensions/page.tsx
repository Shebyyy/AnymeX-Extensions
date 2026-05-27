import { Suspense } from 'react'
import ExtensionsApp from '@/components/ExtensionsApp'

export const metadata = {
  title: 'AnymeX Extensions - Browse All Extensions',
  description: 'Browse and install extensions for AnymeX — all platforms, all repos, one place',
}

function ExtensionsPageContent() {
  return <ExtensionsApp view="extensions" />
}

export default function ExtensionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-gray-100">
        <div className="w-8 h-8 border-2 border-white/20 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 mt-3">Loading...</p>
      </div>
    }>
      <ExtensionsPageContent />
    </Suspense>
  )
}
