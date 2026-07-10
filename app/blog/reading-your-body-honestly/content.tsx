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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6 lg:px-12"
        >
          {/* Article header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span>YesCoach</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-07-10">July 10, 2026</time>
              <span aria-hidden="true">·</span>
              <span>3 min read</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
              Reading your body honestly
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Most apps color muscles by tag. YesCoach colors them by dose computed from joint torque — every number traces back to the movement.
            </p>
          </div>

          {/* Hero image placeholder */}
          <div className="aspect-[16/10] bg-muted rounded-2xl border border-border/80 flex items-center justify-center mb-14">
            <p className="text-sm text-muted-foreground">Live heatmap — hero image coming</p>
          </div>

          <div className="space-y-12 text-lg text-muted-foreground">

            {/* Section 1: Hook */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4">
                You finish a set of Romanian deadlifts. Hamstrings pumped, lower back talking. Which muscles absorbed which share of the load, and how close did each one get to its ceiling? Most apps answer by looking up a spreadsheet. They tagged the exercise to a muscle group years ago and they color accordingly. The heatmap looks informative and means almost nothing.
              </p>
              <p>
                Start with the physics of what you did instead.
              </p>
            </motion.section>

            {/* Section 2: The live heatmap */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-5 text-foreground">The live heatmap: physics, not tags</h2>
              <p className="mb-4">
                When you log a set, the engine computes joint torque from the load moved, the range of motion, and the mechanical position of each joint. That torque distributes to muscles based on their moment arms and anatomical role in the pattern. A muscle with high leverage at the joint axis takes a larger share. One assisting from a disadvantaged angle takes less. The result is a per-muscle number: mechanical stress absorbed, calibrated to that muscle's capacity.
              </p>
              <p className="mb-4">
                That number colors the map.
              </p>

              {/* Physics chain callout */}
              <div className="border border-border/80 bg-card/85 backdrop-blur-sm p-5 rounded-xl my-6">
                <p className="text-sm font-semibold text-foreground mb-3">The physics chain at a glance</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-mono font-semibold shrink-0">01</span>
                    <span>Load + range of motion → joint torque at each joint in the lift</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-mono font-semibold shrink-0">02</span>
                    <span>Joint torque × moment arm → mechanical contribution per muscle</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-mono font-semibold shrink-0">03</span>
                    <span>Contribution ÷ muscle capacity → intensity, mapped to color</span>
                  </div>
                </div>
              </div>

              <p className="mb-4">
                Take the Romanian deadlift from the hook. At the bottom of the movement, with the torso nearly horizontal, the hip extensors — glutes, hamstrings — are the primary producers of torque at the hip joint. They carry the bulk. The spinal erectors stabilize against the moment arm of the torso itself. The knee flexor role the hamstrings also play gets added on top. Log that set, tap the notification, watch the body map answer: posterior chain lit deep, spinal erectors moderate, quads quiet. Now load twenty kilos more. The hip torque climbs. So does every color downstream.
              </p>
              <p className="mb-4">
                Switch to a conventional deadlift at the same load and the knee angle changes. The quads come into play at the bottom. The color splits differently — less isolated to the posterior chain, more distributed. The map reflects what changed in the movement.
              </p>
              <p>
                Every number traces back to an equation. Follow it backward: that shade exists because that muscle crossed that torque threshold at that load. No score to take on faith.
              </p>
            </motion.section>

            {/* Section 3: Reading your body honestly */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-5 text-foreground">Reading your body honestly</h2>
              <p className="mb-4">
                After a pull day, the heatmap shows not just that your lats worked, but how hard relative to their capacity, and how that compares to last Tuesday. If your biceps run consistently hotter than your lats across several sessions, that pattern is visible — not a narrative constructed from memory, but a geometric fact.
              </p>

              {/* Pull quote callout */}
              <div className="border border-border/80 bg-card/85 backdrop-blur-sm p-5 rounded-xl my-6">
                <p className="text-base text-foreground leading-relaxed">
                  "Per-muscle history is the same physics chain, accumulated — each session's dose stacked against the muscle's recovery curve to show where things stand right now."
                </p>
              </div>

              <p className="mb-4">
                Per-muscle history is not a dashboard to configure. It is the same calculation extended across time. A muscle that took heavy load three days ago is not at the same readiness as one that last worked a week ago. The map reflects this. The colors shift accordingly.
              </p>
              <p>
                Good training intuition is a continuous version of this same reading. The heatmap makes it explicit and persistent — available on the days when memory is unreliable, which is most days.
              </p>
            </motion.section>

            {/* Section 4: Soft close */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4">
                A body map that answers to mechanics is clarifying. Log a set. See the result. The map lights up according to what you did — which is more interesting than the category it was filed under.
              </p>
              <p>
                Free while it is early.
              </p>
            </motion.section>

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
              See your own body light up
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Log a set. Watch the physics answer back.
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
