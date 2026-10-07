import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyBlock } from '@/components/copy-block'
import { playStoreUrl } from '@/lib/playStore'

const SPEC_PATH = '/ai/yescoach-format.txt'
const SPEC_URL = `https://yescoach.fit${SPEC_PATH}`

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

const prompt = `Build me a workout program I can import into the YesCoach app.

First, read ${SPEC_URL} and follow it exactly. It has the file format and the only exercise IDs the app accepts.
If you cannot open that link, stop and ask me to paste its contents here before you continue.

About me:
- Goal: [build muscle / get stronger / fix lower back pain / ...]
- Days per week: [3]
- Session length: [45 minutes]
- Equipment: [full gym / dumbbells only / no equipment]
- Experience: [beginner / intermediate / advanced]
- Injuries or limits: [none]

Give me the program as a downloadable .json file.`

const workoutPrompt = `Build me one workout I can import into the YesCoach app.

First, read ${SPEC_URL} and follow it exactly. Write exactly one day.
If you cannot open that link, stop and ask me to paste its contents here before you continue.

About me:
- Focus: [push / pull / legs / full body]
- Session length: [45 minutes]
- Equipment: [full gym / dumbbells only / no equipment]
- Experience: [beginner / intermediate / advanced]
- Injuries or limits: [none]

Give me the workout as a downloadable .json file, or as one JSON code block.`

const steps = [
  {
    title: 'Copy the prompt',
    body: 'Use the prompt below, or tap Get the prompt in YesCoach. Fill in the brackets with your focus, session length, and equipment.',
  },
  {
    title: 'Ask your AI',
    body: 'Paste it into ChatGPT, Claude, Gemini, or any AI chat. It writes one workout in the YesCoach format.',
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
      'Yes. Use the program prompt on this page so the AI writes every day. In YesCoach, open the Plan tab with no workout in progress, tap the Programs icon at the top, then Import and pick the file.',
  },
  {
    question: 'What if the AI cannot open the link?',
    answer:
      'Use the Copy full instructions button and paste the text into the same chat. It contains the file format and the full exercise list, so the AI does not need to browse.',
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
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            ChatGPT, Claude, Gemini
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl">
            Your AI wrote the workout plan. Now follow it.
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mt-6">
            Ask ChatGPT, Claude, or Gemini for a workout with our prompt. Copy the reply, tap Paste workout in
            YesCoach, and log every set. The muscle map shows what each session trained.
          </p>
          <div className="mt-8">
            <a
              href={playStoreUrl({ source: 'ai-page', campaign: 'ai-import', content: 'hero' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Get YesCoach free on Android
            </a>
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
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Import a workout from AI in four steps</h2>
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
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">The prompt</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              Copy this into your AI chat and fill in the brackets. It asks for one workout.
            </p>
            <CopyBlock label="Copy prompt" text={workoutPrompt} />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">One workout or a whole program</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              Import from AI takes one workout for the day you are on. For a multi-week program, copy this prompt
              instead. In YesCoach, open the Plan tab with no workout in progress, tap the Programs icon at the top,
              then Import, and pick the file.
            </p>
            <CopyBlock label="Copy program prompt" text={prompt} />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Exercises YesCoach does not have yet</h2>
            <p className="text-muted-foreground max-w-3xl">
              If the AI picks an exercise YesCoach lacks, YesCoach swaps in the closest match. The import
              message names each exercise it used, so you can swap it again.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              If the AI can&apos;t open links
            </h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              Some AI chats cannot browse. Copy the full instructions and paste them into the same chat. They
              include the file format and the complete exercise list.{' '}
              <a href={SPEC_PATH} className="text-primary hover:underline">
                View the instructions
              </a>
              .
            </p>
            <CopyBlock label="Copy full instructions" source={SPEC_PATH} />
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
