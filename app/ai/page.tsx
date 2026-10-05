import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyBlock } from '@/components/copy-block'
import { playStoreUrl } from '@/lib/playStore'

const SPEC_PATH = '/ai/yescoach-format.txt'
const SPEC_URL = `https://yescoach.fit${SPEC_PATH}`

const description =
  'Turn a ChatGPT, Claude, or Gemini workout plan into a program you can follow and track. Import it into YesCoach free and watch every set light up the muscles it worked.'

export const metadata: Metadata = {
  title: 'Track your ChatGPT workout plan | YesCoach',
  description,
  alternates: { canonical: 'https://yescoach.fit/ai' },
  openGraph: {
    title: 'Track your ChatGPT workout plan | YesCoach',
    description,
    url: 'https://yescoach.fit/ai',
    type: 'article',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'YesCoach logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Track your ChatGPT workout plan | YesCoach',
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
    title: 'Install YesCoach',
    body: 'Free on Android. No account needed.',
  },
  {
    title: 'Copy the prompt',
    body: 'Fill in the brackets with your goal, schedule, and equipment, then paste it into ChatGPT, Claude, Gemini, or any AI chat.',
  },
  {
    title: 'Let the AI read the format',
    body: 'The prompt points the AI to our format file, which lists every exercise the app can track. If the AI says it cannot open links, copy the full instructions below and paste them in.',
  },
  {
    title: 'Download the file',
    body: 'The AI gives you a .json file. Download it to your phone.',
  },
  {
    title: 'Import it',
    body: 'In YesCoach, open the Plan tab with no workout in progress, tap the Programs icon at the top, then Import (the download arrow), and pick the file.',
  },
  {
    title: 'Or import one workout',
    body: 'Use the one workout prompt below. In YesCoach, open the Plan tab on an empty day and tap Import a workout. Tap Paste workout after copying the AI reply, or Choose a file. From ChatGPT you can also use Share to YesCoach.',
  },
  {
    title: 'Train and watch the map',
    body: 'Start a session from the program. Every set you log lights up the muscles it worked.',
  },
]

const faqs = [
  {
    question: 'Can ChatGPT make a workout plan?',
    answer:
      'Yes. ChatGPT, Claude, and Gemini can all write a program from your goal, schedule, and equipment. The prompt on this page makes them write it in a format YesCoach can import, using only exercises the app can track.',
  },
  {
    question: 'How do I track a workout plan from ChatGPT?',
    answer:
      'Ask for the plan as a YesCoach .json file using the prompt above, download it, and import it in YesCoach from the Plan tab: tap the Programs icon at the top, then Import. Each session then shows up ready to log.',
  },
  {
    question: 'Can I import a single workout?',
    answer:
      'Yes. Use the one workout prompt on this page so the AI writes exactly one day. Then open the Plan tab on an empty day, tap Import a workout, and tap Paste workout or Choose a file.',
  },
  {
    question: 'What if the AI cannot open the link?',
    answer:
      'Use the Copy full instructions button and paste the text into the same chat. It contains the file format and the full exercise list, so the AI does not need to browse.',
  },
  {
    question: 'Is YesCoach free?',
    answer: 'Yes. Importing programs, logging sets, and the muscle map are free on Android.',
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
            A plan in a chat window gets lost by week two. Ask your AI for the plan as a YesCoach file, import it,
            and log every set. The muscle map shows what each session trained.
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
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">How do I track a workout plan from ChatGPT?</h2>
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
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">1. The prompt</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">Copy this into your AI chat and fill in the brackets.</p>
            <CopyBlock label="Copy prompt" text={prompt} />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">2. The prompt for one workout</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              Want a single session instead of a program? Copy this, fill in the brackets, and import the reply from
              the Plan tab with Import a workout.
            </p>
            <CopyBlock label="Copy workout prompt" text={workoutPrompt} />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              3. If the AI can&apos;t open links
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
