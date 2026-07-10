import type { Metadata } from "next"
import BlogPostContent from "./content"

export const metadata: Metadata = {
  title: "Reading your body honestly — YesCoach",
  description: "Most apps color muscles by tag. YesCoach colors them by dose computed from joint torque — every number traces back to the movement.",
  openGraph: {
    title: "Reading your body honestly — YesCoach",
    description: "Most apps color muscles by tag. YesCoach colors them by dose computed from joint torque — every number traces back to the movement.",
    url: "https://yescoach.fit/blog/reading-your-body-honestly",
    siteName: "YesCoach",
    type: "article",
    publishedTime: "2026-07-10T00:00:00Z",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reading your body honestly — YesCoach",
    description: "Most apps color muscles by tag. YesCoach colors them by dose computed from joint torque — every number traces back to the movement.",
  },
  alternates: {
    canonical: "https://yescoach.fit/blog/reading-your-body-honestly",
  },
}

export default function ReadingYourBodyHonestly() {
  return <BlogPostContent />
}
