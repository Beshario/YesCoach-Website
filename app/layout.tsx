import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'YesCoach | Biomechanics-Based Strength Training App',
  description: 'See which muscles are working, track recovery status, and understand your training patterns. Science-backed strength training built from biomechanics up.',
  keywords: 'strength training app, muscle activation, biomechanics, workout tracker, recovery tracking, training program, fitness app, muscle recovery, exercise science',
  authors: [{ name: 'YesCoach' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://yescoach.app/',
    title: 'YesCoach | Biomechanics-Based Strength Training App',
    description: 'See which muscles are working, track recovery status, and understand your training patterns. Science-backed strength training built from biomechanics up.',
    siteName: 'YesCoach',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YesCoach | Biomechanics-Based Strength Training App',
    description: 'See which muscles are working, track recovery status, and understand your training patterns. Science-backed strength training built from biomechanics up.',
  },
  alternates: {
    canonical: 'https://yescoach.app/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'YesCoach',
              applicationCategory: 'HealthApplication',
              operatingSystem: 'Android',
              description: 'Biomechanics-based strength training app with real-time muscle activation tracking, recovery visibility, and training pattern analysis.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/PreOrder',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
