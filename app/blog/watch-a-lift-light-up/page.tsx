import type { Metadata } from "next"
import BlogPostContent from "./content"

const description = "Which muscles does the bench press work? YesCoach renders a live recruitment map — joint torque distributed to pectoralis major, anterior deltoid, and triceps brachii — and updates it set by set as you log."

export const metadata: Metadata = {
  title: "Watch a lift light up — YesCoach",
  description,
  authors: [{ name: 'YesCoach' }],
  openGraph: {
    title: "Watch a lift light up — YesCoach",
    description,
    url: "https://yescoach.fit/blog/watch-a-lift-light-up",
    siteName: "YesCoach",
    type: "article",
    publishedTime: "2026-07-11T00:00:00Z",
    images: [{ url: '/blog/watch-a-lift-light-up/shot-c-heatmap-7sets.webp', width: 500, height: 844, alt: 'YesCoach live heatmap after 7 sets of bench press — chest, front delts, triceps lit warm' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch a lift light up — YesCoach",
    description,
    images: ['/blog/watch-a-lift-light-up/shot-c-heatmap-7sets.webp'],
  },
  alternates: {
    canonical: "https://yescoach.fit/blog/watch-a-lift-light-up",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Watch a lift light up",
  "description": description,
  "author": { "@type": "Organization", "name": "YesCoach" },
  "publisher": { "@type": "Organization", "name": "YesCoach", "url": "https://yescoach.fit" },
  "datePublished": "2026-07-11",
  "dateModified": "2026-07-13",
  "mainEntityOfPage": "https://yescoach.fit/blog/watch-a-lift-light-up",
  "image": "https://yescoach.fit/blog/watch-a-lift-light-up/shot-c-heatmap-7sets.webp",
}

export default function ReadingYourBodyHonestly() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostContent />
    </>
  )
}
