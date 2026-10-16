import type { Metadata } from 'next'
import Link from 'next/link'
import { PromptBuilder } from '@/components/prompt-builder'
import { playStoreUrl } from '@/lib/playStore'


const description =
  'Ask ChatGPT, Claude, or Gemini for a workout with the YesCoach prompt, copy the reply, and tap Paste workout. Free on Android. Exercises YesCoach lacks are swapped for the closest match.'

export const metadata: Metadata = {
  title: 'Import a ChatGPT workout | YesCoach',
  description,
  alternates: { canonical: 'https://yescoach.fit/ai' },
  openGraph: {
    title: 'Import a ChatGPT workout | YesCoach',
    description,
    url: 'https://yescoach.fit/ai',
    type: 'article',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Import a ChatGPT workout | YesCoach',
    description,
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
}

const steps = [
  {
    title: 'Ask your AI',
    body: 'Paste it into ChatGPT, Claude, Gemini, or any other AI chat. Any AI that can write JSON works. It writes one workout in the YesCoach format.',
  },
  {
    title: 'Copy the whole reply',
    body: 'Select everything the AI wrote, code block included. Or download the .json file it offers.',
  },
  {
    title: 'Import it',
    body: 'In YesCoach, open the Plan tab on an empty day and tap Import from AI. Tap Paste workout, or Choose a file for a download. In the ChatGPT app you can also use Share to send the reply to YesCoach, then tap Import shared workout.',
  },
]

const faqs = [
  {
    question: 'Can ChatGPT make a workout plan?',
    answer:
      'Yes. ChatGPT, Claude, and Gemini can all write a workout from your focus, session length, and equipment. The prompt on this page makes them write it in a format YesCoach can import.',
  },
  {
    question: 'How do I import a workout from ChatGPT?',
    answer:
      'Copy the prompt on this page, paste it into ChatGPT, and copy its whole reply. In YesCoach, open the Plan tab on an empty day, tap Import from AI, then tap Paste workout.',
  },
  {
    question: 'What if YesCoach does not have an exercise the AI picked?',
    answer:
      'YesCoach swaps it for the closest match and tells you which exercise it used. The workout still imports.',
  },
  {
    question: 'Can I import a whole program?',
    answer:
      'Yes. Switch the prompt to Program so the AI writes every day. In YesCoach, open the Plan tab with no workout in progress, tap the Programs icon at the top, then Import and pick the file.',
  },
  {
    question: 'Does the AI need to browse the web?',
    answer:
      'No. The prompt carries the format and the exercise parts that fit your choices, so any AI chat can write the workout, even one that cannot open links. An AI that can browse may also use the full exercise list.',
  },
  {
    question: 'Is YesCoach free?',
    answer: 'Yes. Importing workouts and programs, logging sets, and the muscle map are free on Android.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function AiPage() {
  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="border-b border-border/70">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10 lg:py-20">
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            ChatGPT, Claude, Gemini
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl">
            Your AI wrote the workout plan. Now follow it.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mt-4">
            Copy the prompt, ask ChatGPT, Claude, or Gemini, then paste the reply into YesCoach. Every set you log
            shows on your muscle map.
          </p>
          <div className="mt-10 max-w-3xl">
            <PromptBuilder />
            <p className="mt-4 text-sm text-muted-foreground">
              New to YesCoach?{' '}
              <a
                href={playStoreUrl({ source: 'ai-page', campaign: 'ai-import', content: 'hero' })}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Get it free on Android
              </a>
              , then import the workout from the Plan tab.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 grid gap-14">
          <figure className="max-w-xs">
            <img
              src="/blog/watch-a-lift-light-up/shot-c-heatmap-7sets.webp"
              alt="YesCoach muscle map after seven sets of bench press, chest, front delts and triceps lit"
              width={500}
              height={844}
              className="w-full h-auto rounded-2xl border border-border"
            />
            <figcaption className="text-sm text-muted-foreground mt-3">Seven logged sets of bench press on the map.</figcaption>
          </figure>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">After you copy the prompt</h2>
            <ol className="space-y-6 max-w-3xl">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="text-primary font-semibold tabular-nums" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{step.title}</p>
                    <p className="text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>



          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">Common questions</h2>
            <dl className="space-y-8 max-w-3xl">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-lg font-semibold text-foreground mb-2">{faq.question}</dt>
                  <dd className="text-muted-foreground">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t border-border pt-10 text-muted-foreground">
            <p>
              Prefer a ready-made plan? YesCoach ships ten free programs.{' '}
              <Link href="/blog/programs-and-protocols" className="text-primary hover:underline">
                See the beginner programs and mobility routines
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
