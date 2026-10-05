import type { MetadataRoute } from 'next'
import registry from '@/lib/pages.json'

export const dynamic = 'force-static'

const BASE_URL = 'https://yescoach.fit'

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

/** Real per-page dates from lib/pages.json, so crawlers can trust lastmod. */
export default function sitemap(): MetadataRoute.Sitemap {
  return registry.pages.map((page) => {
    const lastModified = new Date(`${page.lastModified}T00:00:00Z`)
    if (Number.isNaN(lastModified.getTime())) {
      throw new Error(`sitemap: invalid lastModified "${page.lastModified}" for ${page.path}`)
    }
    return {
      url: `${BASE_URL}${page.path === '/' ? '/' : page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency as ChangeFrequency,
      priority: page.priority,
    }
  })
}
