import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
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
  metadataBase: new URL('https://yescoach.app'),
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
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YesCoach | Biomechanics-Based Strength Training App',
    description: 'See which muscles are working, track recovery status, and understand your training patterns. Science-backed strength training built from biomechanics up.',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
  alternates: {
    canonical: 'https://yescoach.app/',
  },
  icons: {
    icon: [
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-64.png', sizes: '64x64', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: '/icon-180.png', sizes: '180x180', type: 'image/png' },
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4BW7GGLKBX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4BW7GGLKBX');
          `}
        </Script>
      </body>
    </html>
  )
}
