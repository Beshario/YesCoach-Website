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
              <span>2 min read</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
              Reading your body honestly
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Every color on the body map traces back to torque you actually produced.
            </p>
          </div>

          {/* Hero image — live heatmap capture */}
          <figure className="mb-14">
            <div className="mx-auto max-w-sm rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-3 shadow-sm">
              <img
                src="/blog/reading-your-body-honestly/hero.webp"
                alt="YesCoach live heatmap after a mixed training week — chest and front delts warm, quads deep red, showing muscle-specific dose"
                width={1170}
                height={2532}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <figcaption className="text-center text-sm text-muted-foreground mt-4">
              A training week reflected on the body map. Warm where the work went.
            </figcaption>
          </figure>

          <div className="space-y-12 text-lg text-muted-foreground">

            {/* Section 1: How color happens */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-5 text-foreground">How the color happens</h2>

              {/* Physics chain callout */}
              <div className="border border-border/80 bg-card/85 backdrop-blur-sm p-5 rounded-xl mb-5">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-mono font-semibold shrink-0">01</span>
                    <span>Load + range of motion → joint torque</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-mono font-semibold shrink-0">02</span>
                    <span>Joint torque × moment arm → per-muscle contribution</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-mono font-semibold shrink-0">03</span>
                    <span>Contribution ÷ muscle capacity → intensity, mapped to color</span>
                  </div>
                </div>
              </div>

              <p>
                Log a set. The engine walks the chain. Add twenty kilos, every color downstream climbs. Switch from Romanian to conventional deadlift and the knee angle changes — quads come in, posterior chain redistributes. The map answers to what you actually did.
              </p>
            </motion.section>

            {/* Section 2: History */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-5 text-foreground">Per-muscle history, same chain</h2>
              <p>
                Stack each session's dose against the muscle's recovery curve. A muscle worked heavy three days ago sits at different readiness than one last touched a week ago. The map shows it today, without you having to remember.
              </p>
            </motion.section>

            {/* Section 3: Close */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-2">Log a set. Watch the physics answer.</p>
              <p>Free while it is early.</p>
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
              Log a set. Watch it answer back.
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
