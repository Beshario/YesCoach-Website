import type { Metadata } from "next"
import BlogPostContent from "./content"


const SLUG = "do-squats-work-glutes-or-quads-more"
const URL = `https://yescoach.fit/blog/${SLUG}`
const TITLE = "Do squats work glutes or quads more? It depends"
const FULL_TITLE = `${TITLE} · YesCoach`
const description = "Squats train both. Bar position, stance width and depth shift the split toward glutes or quads. What the studies found and how to pick your squat."
const HERO = `/blog/${SLUG}/two-squats-side-by-side.webp`
const HERO_ALT = "YesCoach body map for a back squat next to a wide-stance (sumo) squat, glutes and quads shaded by estimated muscle work"

export const metadata: Metadata = {
  title: FULL_TITLE,
  description,
  authors: [{ name: 'YesCoach' }],
  openGraph: {
    title: FULL_TITLE,
    description,
    url: URL,
    siteName: "YesCoach",
    type: "article",
    publishedTime: "2026-11-27T00:00:00Z",
    images: [{ url: HERO, width: 1620, height: 817, alt: HERO_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: FULL_TITLE,
    description,
    images: [HERO],
  },
  alternates: {
    canonical: URL,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": TITLE,
  "description": description,
  "author": { "@type": "Organization", "name": "YesCoach" },
  "publisher": { "@type": "Organization", "name": "YesCoach", "url": "https://yescoach.fit" },
  "datePublished": "2026-11-27",
  "mainEntityOfPage": URL,
  "image": `https://yescoach.fit${HERO}`,
}

export default function DoSquatsWorkGlutesOrQuadsMore() {
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
