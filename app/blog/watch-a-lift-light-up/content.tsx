'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { playStoreUrl } from '@/lib/playStore'

const PLAY_STORE_URL = playStoreUrl({ source: 'blog', campaign: 'watch-lift-light-up', content: 'cta' })

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
          {/* Article header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span>YesCoach</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-07-11">July 11, 2026</time>
              <span aria-hidden="true">·</span>
              <span>2 min read</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
              Watch a lift light up
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A live recruitment map: joint torque distributed to each muscle, per set, per rep.
            </p>
          </div>

          {/* Hero: side-by-side B + C */}
          <figure className="mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-3 shadow-sm">
                <img
                  src="/blog/watch-a-lift-light-up/shot-b-heatmap-3sets.webp"
                  alt="YesCoach live heatmap after 3 sets of bench press, chest, front delts, triceps starting to warm"
                  width={500}
                  height={844}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-3 shadow-sm">
                <img
                  src="/blog/watch-a-lift-light-up/shot-c-heatmap-7sets.webp"
                  alt="Same heatmap after 7 sets, same muscle chain, deeper red and orange"
                  width={500}
                  height={844}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            <figcaption className="text-center text-sm text-muted-foreground mt-4">
              <strong>3 sets → 7 sets. Accumulated dose per muscle.</strong>
            </figcaption>
          </figure>

          <div className="space-y-12 text-lg text-muted-foreground">

            {/* Section 1: The lift, the chain */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-5 text-foreground">The lift, the chain</h2>

              <figure className="mb-5">
                <div className="mx-auto max-w-sm rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-3 shadow-sm">
                  <img
                    src="/blog/watch-a-lift-light-up/shot-a-bench-info.webp"
                    alt="YesCoach ExerciseDetailPage for bench press, front and back body map with chest, front delts, and triceps highlighted, plus Equipment and Variant chips"
                    width={500}
                    height={844}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </figure>

              <p>
                Bench press is a compound horizontal push. Three primary movers generate the torque: <strong>pectoralis major</strong> (shoulder horizontal adduction), <strong>anterior deltoid</strong> (shoulder flexion), and <strong>triceps brachii</strong> (elbow extension). YesCoach displays this recruitment map on the exercise info page before you unrack.
              </p>
            </motion.section>

            {/* Section 2: SEO — search intent */}
            <section>
              <h2 className="text-2xl font-semibold mb-5 text-foreground">What muscles does the bench press work?</h2>
              <p>
                The flat barbell bench press recruits three primary movers: <strong>pectoralis major</strong> (shoulder horizontal adduction), <strong>anterior deltoid</strong> (shoulder flexion), and <strong>triceps brachii</strong> (elbow extension). Stabilizers (serratus anterior, rotator cuff, forearm flexors) contribute without matching dose. YesCoach computes each muscle's mechanical contribution from joint torque and the reps in reserve (RIR) you report per set, then renders the result as a heatmap that updates set by set.
              </p>
            </section>

            {/* Section 4: Shareable composite panel */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <figure className="mx-auto max-w-sm">
                <div className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
                      Horizontal Push
                    </span>
                    <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                      Bench press
                    </span>
                  </div>

                  <div className="mb-5">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                      Primary movers
                    </p>
                    <ul className="space-y-1.5 text-base text-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span>Pectoralis major</span>
                        <span className="text-xs text-muted-foreground ml-auto">shoulder h. adduction</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span>Anterior deltoid</span>
                        <span className="text-xs text-muted-foreground ml-auto">shoulder flexion</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span>Triceps brachii</span>
                        <span className="text-xs text-muted-foreground ml-auto">elbow extension</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                      Stabilizers
                    </p>
                    <ul className="space-y-1.5 text-base text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full border border-muted-foreground/60 shrink-0" aria-hidden="true" />
                        <span>Serratus anterior</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full border border-muted-foreground/60 shrink-0" aria-hidden="true" />
                        <span>Rotator cuff</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full border border-muted-foreground/60 shrink-0" aria-hidden="true" />
                        <span>Forearm flexors</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <figcaption className="text-center text-sm text-muted-foreground mt-3">
                  Recruitment breakdown. Primary movers accumulate dose; stabilizers contribute without matching it.
                </figcaption>
              </figure>
            </motion.section>

            {/* Close */}
            <section>
              <p>Log a set. Read your recruitment map.</p>
            </section>

          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 border border-border/80 bg-card/85 backdrop-blur-sm rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Your first recruitment map, in under 10 seconds
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Add an exercise. Log a set. Read the map.
            </p>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Get YesCoach on Android
            </a>
          </motion.div>

        </motion.div>
      </main>

      <footer className="border-t border-border py-12 mt-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="YesCoach" className="h-7 w-auto" />
          </div>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <span aria-hidden="true">·</span>
            <span>© 2026 YesCoach</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
