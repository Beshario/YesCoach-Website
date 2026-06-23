import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

interface PostData {
  slug: string
  title: string
  description: string
  date: string
  html: string
}

function readAllFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
}

function getAllSlugs(): string[] {
  return readAllFiles().map(filename => {
    const filePath = path.join(BLOG_DIR, filename)
    const { data } = matter(fs.readFileSync(filePath, 'utf-8'))
    return data.slug || filename.replace(/\.md$/, '')
  })
}

function getPost(slug: string): PostData | null {
  for (const filename of readAllFiles()) {
    const filePath = path.join(BLOG_DIR, filename)
    const file = fs.readFileSync(filePath, 'utf-8')
    const { data, content: body } = matter(file)
    const fileSlug = data.slug || filename.replace(/\.md$/, '')
    if (fileSlug === slug) {
      return {
        slug: fileSlug,
        title: data.title || '',
        description: data.description || '',
        date: data.date ? new Date(data.date).toISOString() : '',
        html: marked.parse(body, { async: false }) as string,
      }
    }
  }
  return null
}

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | YesCoach`,
    description: post.description,
    alternates: { canonical: `https://yescoach.fit/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://yescoach.fit/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
    },
    twitter: {
      card: 'summary',
      site: '@YCoach58265',
      creator: '@YCoach58265',
      title: post.title,
      description: post.description,
      images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'YesCoach' },
    publisher: {
      '@type': 'Organization',
      name: 'YesCoach',
      logo: { '@type': 'ImageObject', url: 'https://yescoach.fit/icon-512.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yescoach.fit/blog/${post.slug}`,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-border/70">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-5">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <img src="/logo.png" alt="" className="h-5 w-auto" />
            <span className="text-base font-semibold tracking-tight">YesCoach</span>
          </Link>
        </div>
      </header>

      <main className="py-20 lg:py-28">
        <article className="max-w-2xl mx-auto px-6 lg:px-12">
          <p className="text-sm text-muted-foreground mb-6">
            <Link href="/blog" className="hover:text-foreground transition-colors">
              ← Blog
            </Link>
            <span aria-hidden="true" className="mx-2">·</span>
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-12 text-foreground">
            {post.title}
          </h1>
          <div
            className="text-muted-foreground leading-relaxed text-base
                       [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4
                       [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3
                       [&_p]:mb-4
                       [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6
                       [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-6
                       [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline
                       [&_strong]:text-foreground
                       [&_em]:italic
                       [&_hr]:border-border [&_hr]:my-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </main>

      <footer className="border-t border-border py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="YesCoach" className="h-7 w-auto" />
          </div>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span aria-hidden="true">·</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span aria-hidden="true">·</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <span aria-hidden="true">·</span>
            <span>© 2026 YesCoach</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
