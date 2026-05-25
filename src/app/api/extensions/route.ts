import { NextResponse } from 'next/server'
import { fetchAllExtensions } from '@/lib/repo-fetcher'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const extensions = await fetchAllExtensions()
    return NextResponse.json(extensions, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
      }
    })
  } catch (err) {
    console.error('Failed to fetch extensions:', err)
    return NextResponse.json({ error: 'Failed to fetch extensions' }, { status: 500 })
  }
}
