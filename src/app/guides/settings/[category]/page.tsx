import { notFound } from 'next/navigation'
import { SETTINGS_CATEGORIES } from '@/lib/settings-data'
import SettingsGuidePage from '@/components/SettingsGuidePage'

export function generateStaticParams() {
  return SETTINGS_CATEGORIES.map(c => ({
    category: c.slug,
  }))
}

export default async function SettingsCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const found = SETTINGS_CATEGORIES.find(c => c.slug === category)

  if (!found) {
    notFound()
  }

  return <SettingsGuidePage category={found} />
}
