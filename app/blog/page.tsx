import type { Metadata } from "next"
import Link from "next/link"

const description = "Writing from YesCoach. How the muscle-recruitment map works, what changed in each release, and the evidence behind the training and mobility programs."

export const metadata: Metadata = {
  title: "Blog · YesCoach",
  description,
  alternates: {
    canonical: "https://yescoach.fit/blog",
  },
  openGraph: {
    title: "Blog · YesCoach",
    description,
    url: "https://yescoach.fit/blog",
    siteName: "YesCoach",
    type: "website",
  },
}

interface Post {
  slug: string
  title: string
  summary: string
  date: string
  displayDate: string
  readTime: string
}

const posts: Post[] = [
  {
    slug: "programs-and-protocols",
    title: "How to start strength training at home",
    summary: "Three beginner programs for gym, dumbbells, or bodyweight. Seven daily mobility routines for the parts that hurt.",
    date: "2026-09-03",
    displayDate: "September 3, 2026",
    readTime: "3 min read",
  },
  {
    slug: "watch-a-lift-light-up",
    title: "Watch a lift light up",
    summary: "A live recruitment map: joint torque distributed to each muscle, per set, per rep.",
    date: "2026-07-11",
    displayDate: "July 11, 2026",
    readTime: "2 min read",
  },
]

export default function BlogIndex() {
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

      <main className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3 text-foreground">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
          </div>

          <ul className="space-y-10">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border/70 pb-10 last:border-b-0">
                <article>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <time dateTime={post.date}>{post.displayDate}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight mb-2">
                    <Link href={`/blog/${post.slug}`} className="text-foreground hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-base text-muted-foreground max-w-2xl">{post.summary}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
