import type { Metadata } from "next"
import TermsContent from "./content"

export const metadata: Metadata = {
  title: "Terms & Conditions — YesCoach",
  description: "The terms and conditions governing your use of the YesCoach app and related services.",
  alternates: {
    canonical: "https://yescoach.fit/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
  return <TermsContent />
}
