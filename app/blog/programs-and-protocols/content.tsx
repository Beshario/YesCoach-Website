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
              Three beginner programs for gym, dumbbells, or bodyweight. Seven daily mobility routines for the parts that hurt. All under the Programs tab.
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
                YesCoach v0.1.17 adds ten preset programs. Three are beginner training splits. Seven are daily mobility routines for common pain and posture issues.
              </p>
              <p>
                To find them: open the app, tap <strong className="text-foreground">Programs</strong> (bottom nav). Training presets are at the top. Scroll down for the Pain &amp; Mobility shelf.
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
                Pick by what equipment you have. Each is a 3-day week, built on the minimum-effective-dose literature (Androulakis-Korakakis et al., 2020): beginners gain strength from 1-3 working sets per exercise, once per week per muscle group. Low volume is the starting line, not a compromise.
              </p>
              <ul className="space-y-3 list-none pl-0">
                <li><strong className="text-foreground">First 4 Weeks.</strong> Gentle 3-day full-body gym starter. Builds the habit before the load.</li>
                <li><strong className="text-foreground">Dumbbells Only.</strong> 3-day split around one pair of dumbbells plus bodyweight. Goblet squat, dumbbell RDL, and split squat cover the hinge and squat patterns at loads a home lifter can reach.</li>
                <li><strong className="text-foreground">No Equipment.</strong> 3-day bodyweight program. A chair, a table, a step. Bodyweight squat, push-up, plank, walking lunge, split squat.</li>
              </ul>
              <p>
                Tap a program to see the sessions. Tap <strong className="text-foreground">Start</strong> to schedule it on your Plan.
              </p>
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
              <h2 className="text-2xl font-semibold text-foreground">My back / hip / shoulder hurts. What do I do?</h2>
              <p>
                Open <strong className="text-foreground">Programs</strong>, scroll to <strong className="text-foreground">Pain &amp; Mobility</strong>, tap the routine that matches. Each protocol is one session you run daily. Stretches sit at the minimum-effective dose (about 2 sets of 30 seconds per muscle group; total accumulated stretch time is the strongest predictor of ROM gain). Where the pattern needs it, brief activation of underused muscles is included.
              </p>
              <figure className="py-4">
                <div className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-3 shadow-sm max-w-sm mx-auto">
                  <img
                    src="/blog/programs-and-protocols/pain-mobility-shelf.jpg"
                    alt="Pain & Mobility shelf in YesCoach: Ankle Mobility, Knee Health, Pelvic Tilt Reset, Lower Back Relief, Desk & Posture, Hip Mobility, each with move count and cadence"
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
              <div className="overflow-x-auto">
                <table className="w-full text-left text-base">
                  <thead>
                    <tr className="border-b border-border/70 text-sm text-muted-foreground">
                      <th className="py-2 pr-3 font-medium">Protocol</th>
                      <th className="py-2 pr-3 font-medium">Targets</th>
                      <th className="py-2 font-medium">Moves</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-border/40"><td className="py-2 pr-3 font-medium">Lower Back Relief</td><td className="py-2 pr-3">Hip flexors, hamstrings, thoracic</td><td className="py-2">8</td></tr>
                    <tr className="border-b border-border/40"><td className="py-2 pr-3 font-medium">Hip Mobility</td><td className="py-2 pr-3">Flexors, adductors, glutes, rotators</td><td className="py-2">7</td></tr>
                    <tr className="border-b border-border/40"><td className="py-2 pr-3 font-medium">Desk &amp; Posture</td><td className="py-2 pr-3">Hip flexors, chest, deep neck, scap retractors</td><td className="py-2">8</td></tr>
                    <tr className="border-b border-border/40"><td className="py-2 pr-3 font-medium">Pelvic Tilt Reset</td><td className="py-2 pr-3">Hip flexor release, glute bridges, anti-extension core</td><td className="py-2">7</td></tr>
                    <tr className="border-b border-border/40"><td className="py-2 pr-3 font-medium">Shoulder Health</td><td className="py-2 pr-3">Cuff, scap, thoracic</td><td className="py-2">7</td></tr>
                    <tr className="border-b border-border/40"><td className="py-2 pr-3 font-medium">Knee Health</td><td className="py-2 pr-3">Quads, hamstrings, calves, hip stability</td><td className="py-2">7</td></tr>
                    <tr><td className="py-2 pr-3 font-medium">Ankle Mobility</td><td className="py-2 pr-3">Calf, soleus, dorsiflexion</td><td className="py-2">6</td></tr>
                  </tbody>
                </table>
              </div>
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
              <h2 className="text-2xl font-semibold text-foreground">Why training and mobility sit on separate shelves</h2>
              <p>
                A training program is measured in sets per week. A protocol is measured in sessions per day. Showing a daily routine as "3 sets/week" understates its cadence by about 7x. Protocols now render with a moves-and-cadence readout instead.
              </p>
              <p>
                Two shelves in the picker also keep two different questions from competing. "What should I lift?" goes on the training shelf. "My back hurts" goes on Pain &amp; Mobility.
              </p>
            </motion.section>

          </div>
        </motion.div>
      </main>
    </div>
  )
}
