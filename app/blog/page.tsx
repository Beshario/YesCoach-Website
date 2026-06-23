import type { Metadata } from 'next'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const metadata: Metadata = {
  title: 'Blog | YesCoach',
  description: 'Biomechanical breakdowns of training questions. Variation comparisons, joint torque explainers, and the math behind muscle activation.',
  alternates: {
    canonical: 'https://yescoach.fit/blog',
  },
  openGraph: {
    title: 'Blog | YesCoach',
    description: 'Biomechanical breakdowns of training questions.',
    url: 'https://yescoach.fit/blog',
    type: 'website',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
  twitter: {
    card: 'summary',
    site: '@YCoach58265',
    creator: '@YCoach58265',
    title: 'Blog | YesCoach',
    description: 'Biomechanical breakdowns of training questions.',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
}

interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
}

function getAllPosts(): PostMeta[] {
  const blogDir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(blogDir)) return []
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))
  return files
    .map(filename => {
      const filePath = path.join(blogDir, filename)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(content)
      return {
        slug: data.slug || filename.replace(/\.md$/, ''),
        title: data.title || filename,
        description: data.description || '',
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/70">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-5">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <img src="/logo.png" alt="" className="h-5 w-auto" />
            <span className="text-base font-semibold tracking-tight">YesCoach</span>
          </Link>
        </div>
      </header>

      <main className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">Blog</p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Biomechanical breakdowns.
          </h1>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
            Variation comparisons, joint torque explainers, and the math behind muscle activation.
          </p>

          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet.</p>
          ) : (
            <ul className="space-y-12">
              {posts.map(post => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground">{post.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
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
