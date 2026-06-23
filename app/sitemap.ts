import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yescoach.fit'
  const now = new Date()

  // Blog posts — generated from content/blog/*.md
  const blogDir = path.join(process.cwd(), 'content/blog')
  const blogEntries: MetadataRoute.Sitemap = []
  if (fs.existsSync(blogDir)) {
    for (const filename of fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))) {
      const filePath = path.join(blogDir, filename)
      const { data } = matter(fs.readFileSync(filePath, 'utf-8'))
      const slug = data.slug || filename.replace(/\.md$/, '')
      blogEntries.push({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: data.date ? new Date(data.date) : now,
        changeFrequency: 'yearly',
        priority: 0.6,
      })
    }
  }

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogEntries,
    {
      url: `${baseUrl}/strength-training-recovery-app`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
