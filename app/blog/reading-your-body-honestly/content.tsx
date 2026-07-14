'use client'

import { motion } from "framer-motion"
import Link from "next/link"

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.yescoach.fit"

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
              Log a set. See which muscles did the work, and how hard.
            </p>
          </div>

          {/* Hero: side-by-side B + C */}
          <figure className="mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-3 shadow-sm">
                <img
                  src="/blog/reading-your-body-honestly/shot-b-heatmap-3sets.webp"
                  alt="YesCoach live heatmap after 3 sets of bench press — chest, front delts, triceps starting to warm"
                  width={500}
                  height={844}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-3 shadow-sm">
                <img
                  src="/blog/reading-your-body-honestly/shot-c-heatmap-7sets.webp"
                  alt="Same heatmap after 7 sets — same muscle chain, deeper red and orange"
                  width={500}
                  height={844}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            <figcaption className="text-center text-sm text-muted-foreground mt-4">
              <strong>3 sets → 7 sets. Watch the chain deepen.</strong>
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
                    src="/blog/reading-your-body-honestly/shot-a-bench-info.webp"
                    alt="YesCoach ExerciseDetailPage for bench press — front and back body map with chest, front delts, and triceps highlighted, plus Equipment and Variant chips"
                    width={500}
                    height={844}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </figure>

              <p>
                Bench press is a horizontal push. Chest, front delts, triceps. The app shows the chain before you lift.
              </p>
            </motion.section>

            {/* Section 2: Log a set. Watch it answer. */}
            <section>
              <h2 className="text-2xl font-semibold mb-5 text-foreground">Log a set. Watch it answer.</h2>
              <p>
                Three sets in — chest and front delts warm. Seven sets in — deeper, same chain. Nothing else lights, because nothing else did the work.
              </p>
            </section>

            {/* Section 3: SEO — search intent */}
            <section>
              <h2 className="text-2xl font-semibold mb-5 text-foreground">What muscles does bench press actually work?</h2>
              <p>
                The flat barbell bench loads three muscle groups as primary movers: pectoralis major (chest), anterior deltoid (front shoulder), and triceps. YesCoach shows this on the live body-map as you log. Brightness reflects mechanical dose — torque absorbed and proximity to failure, from the RIR you log.
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
                <div className="relative rounded-2xl border border-border/80 shadow-sm overflow-hidden">
                  <img
                    src="/blog/reading-your-body-honestly/shot-c-heatmap-7sets.webp"
                    alt="YesCoach live heatmap after 7 sets of bench press — chest, front delts, and triceps lit deep orange and red"
                    width={500}
                    height={844}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
                      Horizontal Push
                    </span>
                  </div>
                </div>
                <figcaption className="text-center text-sm text-muted-foreground mt-3">
                  Bench press. Horizontal push. This is what it lights up.
                </figcaption>
              </figure>
            </motion.section>

            {/* Close */}
            <section>
              <p className="mb-2">Log your first set. Watch it happen.</p>
              <p>Free while it is early.</p>
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
              See your first set light up in 10 seconds
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Add an exercise. Log a set. See your body answer back.
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
