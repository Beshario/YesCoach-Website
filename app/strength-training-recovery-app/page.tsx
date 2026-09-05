import type { Metadata } from 'next'
import Link from 'next/link'
import { playStoreUrl } from '@/lib/playStore'

export const metadata: Metadata = {
  title: 'Strength Training Recovery App | YesCoach',
  description:
    'YesCoach is a strength training recovery app that helps you see muscle load, understand recovery state, and track training patterns over time.',
  alternates: {
    canonical: 'https://yescoach.fit/strength-training-recovery-app',
  },
  openGraph: {
    title: 'Strength Training Recovery App | YesCoach',
    description:
      'Track muscle load, recovery state, and training patterns with YesCoach.',
    url: 'https://yescoach.fit/strength-training-recovery-app',
    type: 'article',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strength Training Recovery App | YesCoach',
    description:
      'Track muscle load, recovery state, and training patterns with YesCoach.',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
}

export default function StrengthTrainingRecoveryAppPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border/70">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            Strength Training Recovery App
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl">
            A clearer way to track recovery between strength training sessions.
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mt-6">
            YesCoach helps lifters understand which muscles were stressed, how training accumulates over time, and when the body may be ready to push again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href={playStoreUrl({ source: 'landing-recovery', campaign: 'recovery-seo', content: 'hero' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Try the Android Beta
            </a>
            <a
              href="https://twitter.com/YCoach58265"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Follow development on X
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 grid gap-12">
          <div className="grid lg:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">See muscle load</h3>
              <p className="text-muted-foreground">
                After each session, YesCoach shows which muscles took the work so training stress is easier to read than a raw logbook.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">Track recovery state</h3>
              <p className="text-muted-foreground">
                Recovery is easier to judge when session stress, accumulated training, and recent patterns are visible in one place.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">Spot patterns over time</h3>
              <p className="text-muted-foreground">
                Use weekly and monthly views to see balance, exposure, and how your training evolves.
              </p>
            </article>
          </div>

          <div className="rounded-3xl border border-border bg-muted/50 p-8 lg:p-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground mb-4">
              What makes a strength training recovery app useful?
            </h2>
            <div className="grid gap-4 text-muted-foreground text-lg">
              <p>
                Recovery is whether recent training loaded the right tissues, whether the week is balanced, and whether the next session fits what the body has already done.
              </p>
              <p>
                YesCoach makes the training effect visible. Log, review muscle emphasis after the session, and track how training accumulates.
              </p>
              <p>
                That makes it easier to answer practical questions: should you push, repeat, back off, or adjust the plan?
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6 items-start">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                Why YesCoach fits this category
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>Tracks session-level muscle stress across every logged workout.</li>
                <li>Connects set logging to recovery interpretation.</li>
                <li>Shows weekly and monthly patterns alongside daily snapshots.</li>
                <li>Built for strength training.</li>
              </ul>
            </div>

            <aside className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Next step</h2>
              <p className="text-muted-foreground mb-5">
                Try the beta, then send feedback on what feels useful, unclear, or missing.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={playStoreUrl({ source: 'landing-recovery', campaign: 'recovery-seo', content: 'next-step' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Open on Google Play
                </a>
                <a
                  href="mailto:contact@yescoach.fit"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Send feedback
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
