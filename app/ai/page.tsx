import type { Metadata } from 'next'
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Workout prompt for ChatGPT, Claude, Gemini</h1>
        <p className="mt-2 text-muted-foreground">
          Copy the prompt, paste it into your AI, then copy its whole reply. In YesCoach: Plan tab, Import from AI,
          Paste workout.
        </p>

        <div className="mt-6">
          <PromptBuilder />
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          No YesCoach yet?{' '}
          <a
            href={playStoreUrl({ source: 'ai-page', campaign: 'ai-import', content: 'hero' })}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Get it free on Android
          </a>
          .
        </p>

        <section className="mt-12" aria-labelledby="faq">
          <h2 id="faq" className="text-lg font-semibold text-foreground mb-3">Questions</h2>
          <div className="divide-y divide-border rounded-lg border border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex min-h-[44px] cursor-pointer items-center px-4 py-3 font-medium text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
                  {faq.question}
                </summary>
                <p className="px-4 pb-4 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
