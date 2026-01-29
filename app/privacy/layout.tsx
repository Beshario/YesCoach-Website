import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | YesCoach',
  description: 'YesCoach privacy policy. Learn how we handle your data during pre-alpha development.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://yescoach.app/privacy',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
