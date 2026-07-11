import type { Metadata } from "next"
import BlogPostContent from "./content"

const description = "Most apps color muscles by tag. YesCoach colors them by dose computed from joint torque — every number traces back to the movement."

export const metadata: Metadata = {
  title: "Reading your body honestly — YesCoach",
  description,
  authors: [{ name: 'YesCoach' }],
  openGraph: {
    title: "Reading your body honestly — YesCoach",
    description,
    url: "https://yescoach.fit/blog/reading-your-body-honestly",
    siteName: "YesCoach",
    type: "article",
    publishedTime: "2026-07-10T00:00:00Z",
    images: [{ url: '/blog/reading-your-body-honestly/hero.webp', width: 1170, height: 2532, alt: 'YesCoach live heatmap showing a training week — chest, shoulders, and quads lit warm' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reading your body honestly — YesCoach",
    description,
    images: ['/blog/reading-your-body-honestly/hero.webp'],
  },
  alternates: {
    canonical: "https://yescoach.fit/blog/reading-your-body-honestly",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Reading your body honestly",
  "description": description,
  "author": { "@type": "Organization", "name": "YesCoach" },
  "publisher": { "@type": "Organization", "name": "YesCoach", "url": "https://yescoach.fit" },
  "datePublished": "2026-07-10",
  "dateModified": "2026-07-10",
  "mainEntityOfPage": "https://yescoach.fit/blog/reading-your-body-honestly",
  "image": "https://yescoach.fit/blog/reading-your-body-honestly/hero.webp",
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
