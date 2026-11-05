import type { Metadata } from 'next'
import Link from 'next/link'
import { playStoreUrl } from '@/lib/playStore'

const SLUG = 'train-with-ai'
const URL = `https://yescoach.fit/blog/${SLUG}`
const PUBLISHED = '2026-11-04'
const HEADLINE = 'How to train with AI: make a workout plan with ChatGPT, then track it'
const description =
  'How to use ChatGPT, Claude, or Gemini to make a workout plan: what to put in the prompt, what AI plans get wrong, and why logging every set decides whether the plan works.'
const HERO = `/blog/${SLUG}/imported-plan.jpg`
const INSTALL_CTA = playStoreUrl({ source: 'blog', campaign: SLUG, content: 'track-cta' })

export const metadata: Metadata = {
  title: 'How to make a workout plan with ChatGPT · YesCoach',
  description,
  authors: [{ name: 'YesCoach' }],
  alternates: { canonical: URL },
  openGraph: {
    title: 'How to make a workout plan with ChatGPT · YesCoach',
    description,
    url: URL,
    siteName: 'YesCoach',
    type: 'article',
    publishedTime: `${PUBLISHED}T00:00:00Z`,
    images: [{ url: HERO, width: 900, height: 1948, alt: 'A ChatGPT pull workout imported into the YesCoach Plan tab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to make a workout plan with ChatGPT · YesCoach',
    description,
    images: [HERO],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: HEADLINE,
  description,
  author: { '@type': 'Organization', name: 'YesCoach' },
  publisher: { '@type': 'Organization', name: 'YesCoach', url: 'https://yescoach.fit' },
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: URL,
  image: `https://yescoach.fit${HERO}`,
}

const strong = 'text-foreground'
const link = 'text-primary underline underline-offset-4 hover:opacity-80'

function Shot({ src, alt, caption, eager }: { src: string; alt: string; caption: string; eager?: boolean }) {
  return (
    <figure className="py-4">
      <div className="rounded-2xl border border-border/80 bg-card/85 p-3 shadow-sm max-w-xs mx-auto">
        <img
          src={`/blog/${SLUG}/${src}`}
          alt={alt}
          width={900}
          height={1948}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <figcaption className="text-center text-sm text-muted-foreground mt-3">{caption}</figcaption>
    </figure>
  )
}

export default function TrainWithAiPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="border-b border-border/70">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-5">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <img src="/logo.png" alt="" className="h-5 w-auto" />
            <span className="text-base font-semibold tracking-tight">YesCoach</span>
          </Link>
        </div>
      </header>

      <main className="py-16 lg:py-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span>YesCoach</span>
              <span aria-hidden="true">·</span>
              <time dateTime={PUBLISHED}>November 4, 2026</time>
              <span aria-hidden="true">·</span>
              <span>5 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">{HEADLINE}</h1>
            <p className="text-xl text-muted-foreground">
              Give ChatGPT, Claude, or Gemini your goal, days per week, session length, equipment, and level. Ask for
              exercises, sets, reps, rest, and effort. Check the plan for gaps. Then log every set, so the next plan
              starts from what you lifted.
            </p>
          </div>

          <div className="space-y-12 text-lg text-muted-foreground">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Can ChatGPT make a workout plan?</h2>
              <p>
                Yes, as a draft. In a 2024 study in <em>Biology of Sport</em>, Washif and colleagues asked GPT-3.5 and
                GPT-4 to write 12-week resistance training programs for hypothetical 20-year-old intermediate lifters.
                The programs had phases, sets, intensities, and rest periods. The authors concluded ChatGPT works as a
                tool for a draft program and that the drafts need fine-tuning by someone with training expertise before
                use (
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10955742/"
                  className={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Washif et al., 2024
                </a>
                ).
              </p>
              <p>
                Two things shape that draft: what you put in the prompt, and what you do with the plan after you train
                it.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">What to put in a ChatGPT workout prompt</h2>
              <p>An AI plans from the chat alone. Give it what a coach asks in a first session:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong className={strong}>Goal.</strong> Strength, muscle size, or mobility. Name the lift or body
                  part if you have one in mind.
                </li>
                <li>
                  <strong className={strong}>Time.</strong> Days per week and minutes per session.
                </li>
                <li>
                  <strong className={strong}>Equipment.</strong> Full gym, dumbbells, or bodyweight. List the weights you
                  have at home.
                </li>
                <li>
                  <strong className={strong}>Level.</strong> How long you have lifted and a recent set, such as 60 kg
                  for 5 reps on the bench press.
                </li>
                <li>
                  <strong className={strong}>Limits.</strong> Injuries, pain, and movements to avoid.
                </li>
                <li>
                  <strong className={strong}>Format.</strong> Exercise, sets, reps, rest in seconds, and reps in
                  reserve (RIR) for each line.
                </li>
              </ol>
              <p>A prompt with all six reads like this:</p>
              <blockquote className="border-l-4 border-primary/60 pl-4 text-base text-foreground">
                Write a 45-minute pull workout for a full gym. I have lifted for one year. My best row is 60 kg for 8.
                My lower back tires fast, so keep bent-over work to 3 sets. For each exercise give sets, reps, rest in
                seconds, and reps in reserve.
              </blockquote>
              <p>
                The{' '}
                <Link href="/ai" className={link}>
                  ChatGPT workout plan prompt
                </Link>{' '}
                builds this for you: tap your focus, time, place, and level, then copy. It also asks the AI to reply in
                a format YesCoach imports.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">What AI workout plans get wrong</h2>
              <p>Read the reply before you train it. Check these six things:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className={strong}>Sets per muscle.</strong> Count the hard sets each muscle gets across the
                  week. Look for chest and arms stacked high while the back, hamstrings, or calves run short.
                </li>
                <li>
                  <strong className={strong}>Push and pull balance.</strong> Count pressing sets against rowing and
                  pulling sets.
                </li>
                <li>
                  <strong className={strong}>Effort.</strong> &quot;3 x 10&quot; with no RIR leaves the hardest part to
                  you. Ask for a target, such as 2 reps in reserve.
                </li>
                <li>
                  <strong className={strong}>Progression.</strong> Ask what changes in week 2. A plan without a rule for
                  adding load or reps repeats week 1.
                </li>
                <li>
                  <strong className={strong}>Equipment.</strong> Look for machines or weights you do not have.
                </li>
                <li>
                  <strong className={strong}>Time.</strong> Add up sets times rest. Five exercises at 4 sets and 3
                  minutes of rest is 60 minutes of rest alone.
                </li>
              </ul>
              <p>Ask the AI to fix what you find. It rewrites the plan in the same chat.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Why logging decides whether the plan works</h2>
              <p>
                The AI writes the plan. It does not see you train it. Write down load, reps, and how hard each set felt.
                That log answers the questions a plan cannot: did you hit the reps, did the weight go up, which muscles
                got the work.
              </p>
              <p>
                It also makes the next prompt better. Paste last week&apos;s sets into the chat and ask for next week. The
                AI now plans from your numbers, not from a guess about your level.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">How to train with an AI plan in YesCoach</h2>
              <p>
                YesCoach is a free Android app that imports a workout from any AI chat, logs every set, and shows which
                muscles the session trained.
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Open the{' '}
                  <Link href="/ai" className={link}>
                    prompt builder
                  </Link>
                  , pick <strong className={strong}>One workout</strong>, and copy the prompt.
                </li>
                <li>Paste it into ChatGPT, Claude, or Gemini. Copy the whole reply.</li>
                <li>
                  In YesCoach, open the <strong className={strong}>Plan</strong> tab on an empty day, tap{' '}
                  <strong className={strong}>Import from AI</strong>, then{' '}
                  <strong className={strong}>Paste workout</strong>.
                </li>
              </ol>
              <Shot
                src="import-from-ai.jpg"
                alt="YesCoach Import a workout from AI sheet with Get the prompt, Paste workout, and Choose a file buttons"
                caption="Plan tab, Import from AI, Paste workout."
                eager
              />
              <p>
                The workout lands on your Plan with sets, reps, RIR, rest, and supersets. If the AI picked an exercise
                YesCoach does not have, the app swaps in the closest match and tells you which one it used.
              </p>
              <Shot
                src="imported-plan.jpg"
                alt="Imported pull workout in YesCoach: Weighted Pull-Up 4 x 6-8 at RIR 2, Barbell Bent-Over Row 3 x 8-10 at RIR 2, and a reverse fly and hammer curl superset for 3 rounds"
                caption="An imported pull workout with a superset."
              />
              <p>
                For a whole program, switch the prompt to <strong className={strong}>Program</strong> and save the reply
                as a file. In the Plan tab, tap the <strong className={strong}>Programs</strong> icon, then{' '}
                <strong className={strong}>Import</strong>.
              </p>
              <p>
                Tap <strong className={strong}>Log</strong> on an exercise to record load and reps, then tap how hard
                the set felt. A rest clock starts between sets.
              </p>
              <Shot
                src="logger.jpg"
                alt="YesCoach set logger for Barbell Flat Bench Press: two sets of 85 kg for 5 logged, set 3 open with load and reps steppers and a how hard row"
                caption="Load, reps, and effort for each set."
              />
              <p>
                <strong className={strong}>Day Summary</strong> on the Track tab maps the muscles the session trained,
                with an estimated day each muscle group is fresh again.
              </p>
              <Shot
                src="day-summary.jpg"
                alt="YesCoach Day Summary for a push day: 5 exercises, 16 sets, a front and back muscle map with chest and shoulders hottest, and estimated fresh days per muscle"
                caption="What the push day trained, and when each muscle group is estimated fresh."
              />
              <p>
                Over weeks, <strong className={strong}>Month Summary</strong>, then{' '}
                <strong className={strong}>Progress</strong>, graphs estimated one-rep max (E1RM) per movement. That
                graph shows whether the AI plan is working.
              </p>
              <Shot
                src="e1rm-progress.jpg"
                alt="YesCoach Month Summary Progress tab with estimated one-rep max graphs for Barbell Flat Bench Press and Barbell Overhead Press across October 2026"
                caption="Estimated 1RM per movement across a month."
              />
              <p className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/ai"
                  className="inline-flex min-h-[44px] items-center rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  Build your prompt
                </Link>
                <a
                  href={INSTALL_CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-lg border border-border px-4 py-2 text-foreground font-medium hover:bg-muted transition-colors"
                >
                  Get YesCoach free on Android
                </a>
              </p>
            </section>
          </div>

          <div className="mt-16 border-t border-border/70 pt-8">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Related</p>
            <ul className="space-y-2 text-base">
              <li>
                <Link href="/blog/programs-and-protocols" className="text-primary hover:opacity-80 transition-opacity">
                  How to start strength training at home
                </Link>
              </li>
              <li>
                <Link href="/blog/watch-a-lift-light-up" className="text-primary hover:opacity-80 transition-opacity">
                  Watch a lift light up
                </Link>
              </li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  )
}
