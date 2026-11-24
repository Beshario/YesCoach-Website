'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { Button } from '@/components/ui/button'

/**
 * Google Analytics loads only after the visitor taps Accept. No choice yet, or
 * Decline, means no GA script and no GA cookies. The choice is kept in this
 * browser; the privacy page can reopen the banner (openAnalyticsChoice).
 */
const GA_ID = 'G-4BW7GGLKBX'
const STORAGE_KEY = 'yc-site-analytics'
const REOPEN_EVENT = 'yc-site-analytics-reopen'

type Choice = 'granted' | 'denied'

function readChoice(): Choice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

function saveChoice(choice: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Storage blocked: the choice holds for this page view only, and the banner asks again next visit.
  }
}

/** GA's own cookies (_ga, _ga_<id>), on this host and the parent domain. */
function clearGaCookies() {
  const names = document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(n => n.startsWith('_ga'))
  const domains = ['', location.hostname, `.${location.hostname.replace(/^www\./, '')}`]
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}

export function openAnalyticsChoice() {
  window.dispatchEvent(new Event(REOPEN_EVENT))
}

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<Choice | null>(null)
  const [asking, setAsking] = useState(false)

  useEffect(() => {
    const stored = readChoice()
    setChoice(stored)
    setAsking(stored === null)
    const reopen = () => setAsking(true)
    window.addEventListener(REOPEN_EVENT, reopen)
    return () => window.removeEventListener(REOPEN_EVENT, reopen)
  }, [])

  function decide(next: Choice) {
    saveChoice(next)
    setAsking(false)
    if (next === 'denied' && choice === 'granted') {
      // GA is already running on this page: clear its cookies and reload without it.
      clearGaCookies()
      location.reload()
      return
    }
    setChoice(next)
  }

  return (
    <>
      {choice === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      {asking && (
        <div
          role="dialog"
          aria-label="Website analytics"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-lg border border-border bg-background p-4 shadow-lg"
        >
          <p className="text-sm text-muted-foreground">
            Allow Google Analytics cookies to count visits?{' '}
            <Link href="/privacy#website" className="text-primary hover:underline">
              Privacy
            </Link>
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="outline" size="lg" onClick={() => decide('denied')}>
              Decline
            </Button>
            <Button size="lg" onClick={() => decide('granted')}>
              Accept
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
