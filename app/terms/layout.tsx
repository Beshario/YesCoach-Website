import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | YesCoach',
  description: 'YesCoach terms and conditions. Learn about our beta service terms.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://yescoach.app/terms',
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
