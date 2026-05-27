'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    window.location.replace('/extensions')
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-gray-100">
      <div className="w-8 h-8 border-2 border-white/20 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500 mt-3">Redirecting...</p>
    </div>
  )
}
