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
    images: [{ url: '/og-home.webp', width: 500, height: 844, alt: 'YesCoach live heatmap after 7 sets of bench press, chest, front delts, triceps lit warm' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@YCoach58265',
    creator: '@YCoach58265',
    title: 'YesCoach | Strength Training Recovery and Muscle Tracking App',
    description: 'Track muscle load, recovery state, and training patterns with YesCoach. A biomechanics-based strength training app for Android.',
    images: [{ url: '/og-home.webp', width: 500, height: 844, alt: 'YesCoach live heatmap after 7 sets of bench press, chest, front delts, triceps lit warm' }],
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
              '@type': 'MobileApplication',
              name: 'YesCoach',
              applicationCategory: 'HealthApplication',
              applicationSubCategory: 'Strength Training',
              operatingSystem: 'Android 8.0 or later',
              description: 'Strength training and mobility app. Log any lift and watch a live muscle-recruitment map fill in set by set. Ships ten preset programs: three beginner training splits and seven daily mobility protocols.',
              url: 'https://yescoach.fit/',
              downloadUrl: 'https://play.google.com/store/apps/details?id=com.yescoach.fit',
              installUrl: 'https://play.google.com/store/apps/details?id=com.yescoach.fit',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'Live muscle-recruitment heatmap updated per set',
                'Log any lift with load, reps, and RIR',
                'Three beginner training programs: gym, dumbbells, bodyweight',
                'Seven daily mobility protocols for lower back, hips, desk posture, pelvic tilt, shoulders, knees, and ankles',
                'Custom exercise creation',
                'Weekly volume and recovery tracking per muscle',
              ],
              sameAs: [
                'https://play.google.com/store/apps/details?id=com.yescoach.fit',
                'https://twitter.com/YCoach58265',
                'https://youtube.com/shorts/ipL9OOfEQv4',
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
