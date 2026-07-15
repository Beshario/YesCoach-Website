import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'
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
  metadataBase: new URL('https://yescoach.fit'),
  title: 'YesCoach | Strength Training Recovery and Muscle Tracking App',
  description: 'Track muscle load, recovery state, and training patterns with YesCoach. A biomechanics-based strength training app for Android.',
  keywords: 'strength training recovery app, muscle tracking app, biomechanics training app, workout recovery tracker, muscle activation app, strength training app, exercise science app, android fitness app',
  authors: [{ name: 'YesCoach' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://yescoach.fit/',
    title: 'YesCoach | Strength Training Recovery and Muscle Tracking App',
    description: 'Track muscle load, recovery state, and training patterns with YesCoach. A biomechanics-based strength training app for Android.',
    siteName: 'YesCoach',
    images: [{ url: '/og-home.webp', width: 500, height: 844, alt: 'YesCoach live heatmap after 7 sets of bench press — chest, front delts, triceps lit warm' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@YCoach58265',
    creator: '@YCoach58265',
    title: 'YesCoach | Strength Training Recovery and Muscle Tracking App',
    description: 'Track muscle load, recovery state, and training patterns with YesCoach. A biomechanics-based strength training app for Android.',
    images: [{ url: '/og-home.webp', width: 500, height: 844, alt: 'YesCoach live heatmap after 7 sets of bench press — chest, front delts, triceps lit warm' }],
  },
  alternates: {
    canonical: 'https://yescoach.fit/',
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
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
              description: 'Strength training recovery and muscle tracking app with biomechanics-based training insight.',
              url: 'https://yescoach.fit/',
              downloadUrl: 'https://play.google.com/store/apps/details?id=com.yescoach.fit',
              installUrl: 'https://play.google.com/store/apps/details?id=com.yescoach.fit',
              sameAs: [
                'https://play.google.com/store/apps/details?id=com.yescoach.fit',
                'https://twitter.com/YCoach58265',
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
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
