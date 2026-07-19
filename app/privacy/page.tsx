import type { Metadata } from "next"
import PrivacyContent from "./content"

export const metadata: Metadata = {
  title: "Privacy Policy · YesCoach",
  description: "How YesCoach collects, uses, and protects your training data and account information.",
  alternates: {
    canonical: "https://yescoach.fit/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
