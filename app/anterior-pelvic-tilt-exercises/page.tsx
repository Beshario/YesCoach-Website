import type { Metadata } from 'next'
import Link from 'next/link'
import { playStoreUrl } from '@/lib/playStore'

export const metadata: Metadata = {
  title: 'Anterior Pelvic Tilt Exercises: The Pelvic Tilt Reset | YesCoach',
  description:
    'A 7-move routine that releases tight hip flexors and lumbar erectors while strengthening glutes and anterior core to level the pelvis. Free in the YesCoach app.',
  alternates: {
    canonical: 'https://yescoach.fit/anterior-pelvic-tilt-exercises',
  },
  openGraph: {
    title: 'Anterior Pelvic Tilt Exercises: The Pelvic Tilt Reset | YesCoach',
    description:
      'Release tight hip flexors and lumbar erectors, strengthen glutes and anterior core, and level the pelvis with a 20-25 minute daily routine.',
    url: 'https://yescoach.fit/anterior-pelvic-tilt-exercises',
    type: 'article',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anterior Pelvic Tilt Exercises: The Pelvic Tilt Reset | YesCoach',
    description:
      'Release tight hip flexors and lumbar erectors, strengthen glutes and anterior core, and level the pelvis with a 20-25 minute daily routine.',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
}

const protocolExercises = [
  { name: 'Half-Kneeling Hip Flexor Stretch', sets: '2', reps: '60s/side', load: 'Bodyweight' },
  { name: 'Bird Dog', sets: '2', reps: '8-10/side', load: 'Bodyweight' },
  { name: 'Prone Hip Extension', sets: '3', reps: '10-12/side', load: 'Bodyweight' },
  { name: 'Plank', sets: '3', reps: '30-45s', load: 'Bodyweight' },
  { name: 'Dead Bug', sets: '3', reps: '8-10/side', load: 'Bodyweight' },
  { name: 'Glute Bridge', sets: '3', reps: '12-15', load: 'Bodyweight' },
  { name: 'Knees-to-Chest Stretch', sets: '2', reps: '30s', load: 'Bodyweight' },
]

const faqs = [
  {
    question: 'What exercises fix anterior pelvic tilt?',
    answer:
      'A combination of hip flexor and lumbar release paired with glute and anterior core strengthening. YesCoach\'s Pelvic Tilt Reset protocol runs a Half-Kneeling Hip Flexor Stretch, Bird Dog, Prone Hip Extension, Plank, Dead Bug, Glute Bridge, and a Knees-to-Chest Stretch in one 20-25 minute session, targeting both sides of the imbalance instead of just the tight side.',
  },
  {
    question: 'What causes anterior pelvic tilt?',
    answer:
      'Kendall\'s lower crossed syndrome describes it as short hip flexors and lumbar erectors paired with underactive glutes and abdominals. The hips get pulled forward and down at the front, tilting the pelvis and exaggerating the low back arch.',
  },
  {
    question: 'Does stretching alone fix anterior pelvic tilt?',
    answer:
      'No. Modern EMG-based research supports strengthening the weak side of the pattern more than passive stretching by itself. That is why the Pelvic Tilt Reset pairs brief hip flexor and lumbar release with glute bridges, prone hip extension, and anti-extension core work rather than stretching alone.',
  },
  {
    question: 'How often should I do pelvic tilt exercises?',
    answer:
      'Daily. The Pelvic Tilt Reset is built as a short daily session, 20-25 minutes, since postural patterns respond to consistent, frequent input more than occasional long sessions.',
  },
  {
    question: 'What is anti-extension core work and why does it matter for pelvic tilt?',
    answer:
      'Anti-extension exercises like the Plank and Dead Bug train the abdominals to resist the low back arching and the pelvis tilting forward under load. That directly opposes the pattern of an anteriorly tilted pelvis, which is why they sit alongside the glute work in the protocol.',
  },
  {
    question: 'Where do I find this routine in the app?',
    answer:
      'Open the Pain & Mobility shelf in YesCoach and select Pelvic Tilt Reset. Every exercise includes cueing notes, like posteriorly tilting the pelvis on the Glute Bridge and Plank, so the exercise trains the correct pattern instead of reinforcing the tilt.',
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

export default function AnteriorPelvicTiltExercisesPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="border-b border-border/70">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            Anterior Pelvic Tilt Exercises
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl">
            Anterior pelvic tilt exercises: a 7-move daily routine.
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mt-6">
            Anterior pelvic tilt responds to release of tight hip flexors and lumbar erectors combined with strengthening of the glutes and anterior core. YesCoach's Pelvic Tilt Reset runs both sides of that pattern in one 20-25 minute session: hip flexor and lumbar release, then Bird Dog, Prone Hip Extension, Plank, Dead Bug, and Glute Bridge, done daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href={playStoreUrl({ source: 'landing-pelvic-tilt', campaign: 'pelvic-seo', content: 'hero' })}
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
          <div className="rounded-3xl border border-border bg-muted/50 p-8 lg:p-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground mb-4">
              Why does anterior pelvic tilt happen?
            </h2>
            <div className="grid gap-4 text-muted-foreground text-lg">
              <p>
                Kendall's lower crossed syndrome describes anterior pelvic tilt as short hip flexors and lumbar erectors paired with underactive glutes and abdominals. The front of the hip pulls tight while the muscles meant to hold the pelvis level and the spine neutral go quiet.
              </p>
              <p>
                Modern EMG-based research supports strengthening that weak side more than stretching alone. A routine that only stretches the hip flexors leaves the glutes and core exactly as underactive as before.
              </p>
              <p>
                The Pelvic Tilt Reset in YesCoach pairs both halves: brief hip flexor and lumbar release, then glute bridges, prone hip extension, and anti-extension core work in the same session.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              The Pelvic Tilt Reset: move list
            </h2>
            <p className="text-muted-foreground mb-6">
              20-25 minutes, done daily. Each move includes a cueing note in the app so the pattern trains correctly instead of reinforcing the tilt.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-4 text-sm font-semibold text-foreground">Exercise</th>
                    <th className="py-3 pr-4 text-sm font-semibold text-foreground">Sets</th>
                    <th className="py-3 pr-4 text-sm font-semibold text-foreground">Reps</th>
                    <th className="py-3 text-sm font-semibold text-foreground">Load</th>
                  </tr>
                </thead>
                <tbody>
                  {protocolExercises.map((ex) => (
                    <tr key={ex.name} className="border-b border-border/60">
                      <td className="py-3 pr-4 text-muted-foreground">{ex.name}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{ex.sets}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{ex.reps}</td>
                      <td className="py-3 text-muted-foreground">{ex.load}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6 items-start">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                How each move targets the pattern
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>Half-Kneeling Hip Flexor Stretch and Knees-to-Chest Stretch release the tight front-of-hip and lumbar side.</li>
                <li>Glute Bridge and Prone Hip Extension strengthen the underactive glutes that should be holding the pelvis level.</li>
                <li>Plank and Dead Bug train anti-extension: resisting the low back arch and forward pelvic tilt under load.</li>
                <li>Bird Dog trains the two sides together, keeping the pelvis level while the limbs move.</li>
              </ul>
            </div>

            <aside className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Where to find it</h2>
              <p className="text-muted-foreground mb-5">
                Open the Pain & Mobility shelf in YesCoach and select Pelvic Tilt Reset.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={playStoreUrl({ source: 'landing-pelvic-tilt', campaign: 'pelvic-seo', content: 'next-step' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Open on Google Play
                </a>
                <Link
                  href="/blog/programs-and-protocols"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  See all protocols
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Back to YesCoach
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
