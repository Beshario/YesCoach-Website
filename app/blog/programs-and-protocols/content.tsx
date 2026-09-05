'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { playStoreUrl } from '@/lib/playStore'

const CAMPAIGN = 'programs-protocols'
const TRAINING_CTA = playStoreUrl({ source: 'blog', campaign: CAMPAIGN, content: 'training-cta' })
const PROTOCOL_CTA = playStoreUrl({ source: 'blog', campaign: CAMPAIGN, content: 'protocol-cta' })

export default function BlogPostContent() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/70">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-5">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <img src="/logo.png" alt="" className="h-5 w-auto" />
            <span className="text-base font-semibold tracking-tight">YesCoach</span>
          </Link>
        </div>
      </header>

      <main className="py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto px-6 lg:px-12"
        >
          <div className="mb-10">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span>YesCoach</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-09-03">September 3, 2026</time>
              <span aria-hidden="true">·</span>
              <span>3 min read</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
              How to start strength training at home
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Three beginner programs — gym, dumbbells, or nothing at all — plus seven daily mobility routines for the parts that hurt.
            </p>
          </div>

          <figure className="mb-14">
            <div className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-3 shadow-sm max-w-sm mx-auto">
              <img
                src="/blog/programs-and-protocols/programs-full-shelf.jpg"
                alt="YesCoach Programs picker with three preset training splits and a Pain & Mobility shelf below"
                width={923}
                height={1996}
                loading="eager"
                fetchPriority="high"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <figcaption className="text-center text-sm text-muted-foreground mt-4">
              <strong>Two shelves, two questions.</strong> Training on top, Pain &amp; Mobility below.
            </figcaption>
          </figure>

          <div className="space-y-12 text-lg text-muted-foreground">

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <p>
                Until this week, YesCoach shipped with three preset splits — Push/Pull/Legs, Upper/Lower, and Full Body. All three assume you already train, already have a gym, and already know what a compound lift feels like.
              </p>
              <p>
                Most people opening a strength app on day one do not fit that description. They want to <em>start</em>. Or their back hurts and they want it to stop. So v0.1.17 doubles the preset library and, more importantly, splits it into two categories that answer two different questions.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-foreground">Which beginner program should I pick?</h2>
              <p>
                Three new starter programs, each a 3-day week, each built on the minimum-effective-dose literature (Androulakis-Korakakis et al., 2020) — beginners gain strength from as few as 1–3 working sets per exercise, once per week per muscle group. Low volume is not a compromise. It is the starting line.
              </p>
              <ul className="space-y-3 list-none pl-0">
                <li><strong className="text-foreground">First 4 Weeks</strong> — a gentle 3-day full-body gym starter that builds the habit before it builds the load.</li>
                <li><strong className="text-foreground">Dumbbells Only</strong> — a 3-day split around a pair of dumbbells and bodyweight. Goblet squat and dumbbell RDL cover the barbell hinge and squat at loads a home lifter can actually reach.</li>
                <li><strong className="text-foreground">No Equipment</strong> — a 3-day bodyweight program. A chair, a table, a step. Bodyweight squat, push-up, plank, walking lunge, split squat.</li>
              </ul>
              <p className="pt-2">
                <a href={TRAINING_CTA} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-foreground font-medium hover:bg-muted transition-colors">
                  Start First 4 Weeks →
                </a>
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-foreground">My back / hip / shoulder hurts — what do I actually do?</h2>
              <p>
                A protocol is not a training program. It is a single session you can run daily — a targeted mix of stretches at the minimum-effective dose (~2 sets of 30 seconds per muscle group; total accumulated stretch duration is the strongest predictor of ROM gain) paired with brief activation of whichever underused muscles the pattern demands.
              </p>
              <figure className="py-4">
                <div className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-3 shadow-sm max-w-sm mx-auto">
                  <img
                    src="/blog/programs-and-protocols/pain-mobility-shelf.jpg"
                    alt="Pain & Mobility shelf in YesCoach: Ankle Mobility, Knee Health, Pelvic Tilt Reset, Lower Back Relief, Desk & Posture, Hip Mobility — each with move count and cadence"
                    width={923}
                    height={1996}
                    loading="lazy"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <figcaption className="text-center text-sm text-muted-foreground mt-4">
                  <strong>Honest readouts.</strong> Moves and cadence, not sets/week.
                </figcaption>
              </figure>
              <ul className="space-y-3 list-none pl-0">
                <li><strong className="text-foreground">Lower Back Relief</strong> — hip flexor, hamstring, and thoracic mobility. Restricted hip flexor and hamstring length is itself a risk factor for non-specific LBP.</li>
                <li><strong className="text-foreground">Hip Mobility</strong> — full coverage: flexors, adductors, glutes, rotators.</li>
                <li><strong className="text-foreground">Desk &amp; Posture</strong> — stretch what sitting shortens (hip flexors, chest), wake up what sitting silences (deep neck flexors, scapular retractors).</li>
                <li><strong className="text-foreground">Pelvic Tilt Reset</strong> — brief hip flexor release paired with glute bridges and anti-extension core work, which the modern EMG evidence favors over stretching alone.</li>
                <li><strong className="text-foreground">Shoulder Health</strong> — cuff, scap, thoracic mobility.</li>
                <li><strong className="text-foreground">Knee Health</strong> — quads, hamstrings, calves, hip stability.</li>
                <li><strong className="text-foreground">Ankle Mobility</strong> — calf, soleus, dorsiflexion drills.</li>
              </ul>
              <p className="pt-2">
                <a href={PROTOCOL_CTA} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-foreground font-medium hover:bg-muted transition-colors">
                  Open the Pain &amp; Mobility shelf →
                </a>
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-foreground">Why training and mobility live on separate shelves</h2>
              <p>
                A training program is measured in sets per week. A protocol is measured in sessions per day. Displaying a daily mobility routine as "3 sets/week" understates its actual cadence by about 7×, which is why protocols now render with an honest moves-and-cadence readout instead of the training metric they were quietly borrowing.
              </p>
              <p>
                The two categories live on separate shelves in the picker — training on one, "Pain &amp; Mobility" on the other — so the first question ("what should I lift?") stops competing with the second ("my back hurts") for the same space.
              </p>
            </motion.section>

          </div>
        </motion.div>
      </main>
    </div>
  )
}
