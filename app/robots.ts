import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yescoach.app/sitemap.xml',
    host: 'https://yescoach.app',
  }
}
