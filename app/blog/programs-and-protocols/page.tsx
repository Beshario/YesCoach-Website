import type { Metadata } from "next"
import BlogPostContent from "./content"

const description = "Three beginner strength programs (gym, dumbbells, bodyweight) and seven daily mobility routines for lower back, hips, desk posture, shoulders, knees, and ankles — with the evidence behind the dose."

export const metadata: Metadata = {
  title: "How to start strength training at home (3 programs, 7 mobility routines) · YesCoach",
  description,
  authors: [{ name: 'YesCoach' }],
  openGraph: {
    title: "How to start strength training at home · YesCoach",
    description,
    url: "https://yescoach.fit/blog/programs-and-protocols",
    siteName: "YesCoach",
    type: "article",
    publishedTime: "2026-09-03T00:00:00Z",
    images: [{ url: '/blog/programs-and-protocols/programs-full-shelf.jpg', width: 923, height: 1996, alt: 'YesCoach Programs picker: three preset training splits and seven Pain & Mobility protocols' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to start strength training at home · YesCoach",
    description,
    images: ['/blog/programs-and-protocols/programs-full-shelf.jpg'],
  },
  alternates: {
    canonical: "https://yescoach.fit/blog/programs-and-protocols",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to start strength training at home",
  "description": description,
  "author": { "@type": "Organization", "name": "YesCoach" },
  "publisher": { "@type": "Organization", "name": "YesCoach", "url": "https://yescoach.fit" },
  "datePublished": "2026-09-03",
  "dateModified": "2026-09-03",
  "mainEntityOfPage": "https://yescoach.fit/blog/programs-and-protocols",
  "image": "https://yescoach.fit/blog/programs-and-protocols/programs-full-shelf.jpg",
}

export default function ProgramsAndProtocolsPage() {
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
