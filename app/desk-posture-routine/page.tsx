import type { Metadata } from 'next'
import Link from 'next/link'
import { playStoreUrl } from '@/lib/playStore'

export const metadata: Metadata = {
  title: 'Desk Posture Exercises: Stretches for Sitting All Day | YesCoach',
  description:
    'An 8-move, 10-15 minute routine for desk posture: stretches for the hip flexors, chest, and neck plus activation for the deep neck flexors and scapular retractors.',
  alternates: {
    canonical: 'https://yescoach.fit/desk-posture-routine',
  },
  openGraph: {
    title: 'Desk Posture Exercises: Stretches for Sitting All Day | YesCoach',
    description:
      'An 8-move, 10-15 minute routine for desk posture: hip flexor, chest, and neck stretches plus scapular and deep neck flexor activation.',
    url: 'https://yescoach.fit/desk-posture-routine',
    type: 'article',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desk Posture Exercises: Stretches for Sitting All Day | YesCoach',
    description:
      'An 8-move, 10-15 minute routine for desk posture: hip flexor, chest, and neck stretches plus scapular and deep neck flexor activation.',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
}

const exercises = [
  {
    name: 'Shoulder Circles',
    sets: '1 x 10/direction',
    role: 'Warm-up',
    note: 'Loosens the shoulder girdle before the stretches.',
  },
  {
    name: 'Thread the Needle',
    sets: '2 x 30s/side',
    role: 'Stretch',
    note: 'Thoracic rotation to counter a flexed, seated spine.',
  },
  {
    name: 'Cobra Stretch',
    sets: '2 x 30s',
    role: 'Stretch',
    note: 'Thoracic/lumbar extension to counter prolonged flexion.',
  },
  {
    name: 'Doorway Pec Stretch (90°)',
    sets: '2 x 30s',
    role: 'Stretch',
    note: 'Targets the anterior chest, shortened by a forward-shoulder desk posture.',
  },
  {
    name: 'Levator Scapulae Stretch',
    sets: '2 x 30s/side',
    role: 'Stretch',
    note: 'Common site of desk-posture tightness.',
  },
  {
    name: 'Chin Tuck with Flexion',
    sets: '2 x 30s',
    role: 'Activation',
    note: 'Activates the deep neck flexors that counter forward head posture.',
  },
  {
    name: 'Standing Lunge Hip Flexor Stretch',
    sets: '2 x 30s/side',
    role: 'Stretch',
    note: 'Counters hip flexor shortening from prolonged sitting.',
  },
  {
    name: 'Scapular Wall Slides',
    sets: '2 x 10-12',
    role: 'Activation',
    note: 'Activation for the scapular retractors, underused in a rounded-shoulder desk posture.',
  },
]

const faqs = [
  {
    question: 'What are the best desk posture exercises?',
    answer:
      'A routine that stretches what sitting shortens and activates what sitting turns off. That means hip flexor and chest stretches paired with deep neck flexor and scapular retractor activation, not just one or the other. YesCoach ships this as the Desk & Posture protocol: 8 moves, 10-15 minutes.',
  },
  {
    question: 'Why does sitting all day cause posture problems?',
    answer:
      'Prolonged sitting shortens the hip flexors and the anterior chest musculature while underusing the deep neck flexors and scapular retractors. The result is the familiar desk pattern: forward head, rounded shoulders, and tight hips. Stretching the shortened tissue without activating the underused muscles only fixes half the problem.',
  },
  {
    question: 'How long should each stretch hold for?',
    answer:
      'The Desk & Posture protocol uses 30 seconds for 2 sets per stretch, the minimum-effective dose used across YesCoach mobility protocols. The one exception is Shoulder Circles, a 1-set warm-up done for 10 reps per direction before the holds.',
  },
  {
    question: 'Can I do this routine every day?',
    answer:
      'Yes. It is built as a daily 10-15 minute reset, not a training session that needs recovery time. Run it at your desk, after standing up from a long sitting block, or as a wind-down before or after work.',
  },
  {
    question: 'Is chin tuck a stretch or an exercise?',
    answer:
      'Chin Tuck with Flexion is activation, not a stretch: it trains the deep neck flexors that counter forward head posture. It is held at the same 2 x 30s dose as the stretches around it for consistency, but the muscle is working, not lengthening.',
  },
  {
    question: 'Where do I find this routine in the app?',
    answer:
      'Search "Desk & Posture" under Programs, or open it from the Pain & Mobility shelf. Each exercise has its own log entry so you can track completion over time.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function DeskPostureRoutinePage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="border-b border-border/70">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            Desk Posture Exercises
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl">
            Desk posture exercises and stretches for sitting all day.
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mt-6">
            Sitting shortens the hip flexors and chest while the deep neck flexors and scapular retractors go quiet. Fix both sides in one 10-15 minute session: stretch what tightened, activate what turned off. YesCoach ships this as the Desk &amp; Posture protocol.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href={playStoreUrl({ source: 'landing-desk-posture', campaign: 'desk-seo', content: 'hero' })}
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
              <h3 className="text-xl font-semibold text-foreground mb-3">Stretch what tightened</h3>
              <p className="text-muted-foreground">
                Hip flexors, chest, and neck shorten from hours in a seated position. The routine stretches each one at a 2x30s dose.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">Activate what went quiet</h3>
              <p className="text-muted-foreground">
                Deep neck flexors and scapular retractors get underused in a rounded-shoulder desk posture. Chin Tuck with Flexion and Scapular Wall Slides bring them back online.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">Track it daily</h3>
              <p className="text-muted-foreground">
                Log the session in YesCoach and see it on your calendar alongside strength training, so posture work does not fall off.
              </p>
            </article>
          </div>

          <div className="rounded-3xl border border-border bg-muted/50 p-8 lg:p-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground mb-4">
              Why does sitting all day wreck posture?
            </h2>
            <div className="grid gap-4 text-muted-foreground text-lg">
              <p>
                Prolonged sitting shortens the hip flexors and the anterior chest musculature while underusing the deep neck flexors and scapular retractors. That combination produces the forward head, rounded shoulders, and tight hips that define desk posture.
              </p>
              <p>
                Stretching alone addresses only the shortened side. The Desk &amp; Posture session pairs stretching of the shortened structures with brief activation of the underused ones, using the same 2x30s minimum-effective stretch dose used across YesCoach's mobility protocols.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
              The Desk Reset Session: full move list
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Exercise</th>
                    <th className="px-4 py-3 font-semibold">Sets x Reps/Hold</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {exercises.map((ex) => (
                    <tr key={ex.name} className="bg-card">
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{ex.name}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{ex.sets}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{ex.role}</td>
                      <td className="px-4 py-3 text-muted-foreground">{ex.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4">
              Total time: 10-15 minutes. Run it once through, in order, at your desk or right after standing up from a long sitting block.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6 items-start">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                How to find and log this routine
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>Search "Desk & Posture" under Programs, or open it from the Pain & Mobility shelf.</li>
                <li>Each move logs individually, so a partial session still counts.</li>
                <li>Read more on protocol structure at{' '}
                  <Link href="/blog/programs-and-protocols" className="text-primary underline underline-offset-4">
                    Programs and Protocols
                  </Link>.
                </li>
                <li>Runs alongside strength training. It does not need its own recovery day.</li>
              </ul>
            </div>

            <aside className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Next step</h2>
              <p className="text-muted-foreground mb-5">
                Try the beta, run the Desk Reset Session today, and see how it feels against your usual afternoon slump.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={playStoreUrl({ source: 'landing-desk-posture', campaign: 'desk-seo', content: 'next-step' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Open on Google Play
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  See what else YesCoach tracks
                </Link>
              </div>
            </aside>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
              Common questions
            </h2>
            <dl className="space-y-8 max-w-3xl">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-lg font-semibold text-foreground mb-2">{faq.question}</dt>
                  <dd className="text-muted-foreground">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  )
}
