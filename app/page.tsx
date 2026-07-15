'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from '@/components/theme-toggle'
import { PhoneFrame } from '@/components/phone-frame'
import { AppScreenshot } from '@/components/app-screenshot'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <img src="/logo.png" alt="" className="h-5 w-auto" />
            <span className="text-lg font-semibold tracking-tight">YesCoach</span>
          </Link>
          <span className="hidden sm:inline text-sm text-muted-foreground">
            Body model · free · local · private
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.yescoach.fit"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold px-3 py-1.5 hover:opacity-90 transition-opacity"
            >
              Get it — Android
            </a>
            <Link href="/blog/reading-your-body-honestly" className="inline-flex items-center px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,143,227,0.10),transparent_30%),radial-gradient(circle_at_75%_30%,rgba(230,126,34,0.12),transparent_20%)]"
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Text */}
            <div className="space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"
              >
                On Google Play · Free · Local · Private
              </motion.p>
              <div className="space-y-5">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                  className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl text-balance"
                >
                  See what your
                  <span className="block text-primary">training is doing.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.16 }}
                  className="text-xl text-muted-foreground max-w-2xl"
                >
                  A live body map, updated every set.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.24 }}
                className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.25)] max-w-xl"
              >
                <p className="text-base font-semibold text-foreground mb-4">
                  Free. Runs on your phone. No account.
                </p>
                <div>
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.yescoach.fit"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download free — Android
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Phone mockups */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[540px] flex items-center justify-center lg:justify-end"
            >
              {/* Back phone — behind, rotated */}
              <div className="absolute left-6 lg:left-0 top-4 rotate-[-7deg] opacity-60 w-[170px] sm:w-[190px] z-0">
                <PhoneFrame>
                  <AppScreenshot
                    dark="/screenshots/dark/home-back.webp"
                    light="/screenshots/light/home-back.webp"
                    alt="YesCoach app back view"
                    priority
                  />
                </PhoneFrame>
              </div>

              {/* Front phone — in front, slight counter-rotation */}
              <div className="relative rotate-[2deg] w-[210px] ml-24 lg:ml-32 z-10">
                <PhoneFrame>
                  <AppScreenshot
                    dark="/screenshots/dark/home-front.webp"
                    light="/screenshots/light/home-front.webp"
                    alt="YesCoach app home screen"
                  />
                </PhoneFrame>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* From first principles */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4"
          >
            From first principles
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl lg:text-2xl text-foreground mb-3"
          >
            Per-muscle dose derived from joint torque, moment arms, and effort — not category tags.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground"
          >
            Change your stance, grip, or implement and the recruitment recalculates. The engine models each exercise as a movement pattern with anatomical joint actions, not a lookup row.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold mb-4 text-foreground"
          >
            A model of your body.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg mb-20 max-w-2xl"
          >
            Every set updates the model. Muscle dose, recovery state, cumulative tonnage, balance — recomputed every session.
          </motion.p>

          <div className="space-y-24">

            {/* Row 1: text left, screenshot right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Fast to log. Easy to understand.</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Weight. Reps. RIR. Logged in seconds. Every set feeds the model. No tagging, no setup.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-[210px]">
                  <PhoneFrame>
                    <AppScreenshot
                      dark="/screenshots/dark/set-logging.webp"
                      light="/screenshots/light/set-logging.webp"
                      alt="Logging a set: weight, reps, RIR and rest timer"
                    />
                  </PhoneFrame>
                </div>
              </div>
            </motion.div>

            {/* Row 2: screenshot left (dark mode only), text right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="flex justify-center gap-4 lg:order-1 order-2">
                <div className="w-[165px]">
                  <PhoneFrame>
                    <AppScreenshot
                      dark="/screenshots/dark/day-summary.webp"
                      light="/screenshots/light/day-summary.webp"
                      alt="Day summary showing muscle work body map"
                    />
                  </PhoneFrame>
                </div>
                <div className="w-[165px]">
                  <PhoneFrame>
                    <AppScreenshot
                      dark="/screenshots/dark/day-summary-exercises.webp"
                      light="/screenshots/light/day-summary-exercises.webp"
                      alt="Day summary with highlighted exercises per muscle"
                    />
                  </PhoneFrame>
                </div>
              </div>
              <div className="space-y-4 lg:order-2 order-1">
                <h3 className="text-2xl font-bold text-primary">After every session, see the session.</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  A color-coded body map shows which muscles were stressed and how hard — front and back. Tap any muscle to see the exercises that worked it. A picture, not a list.
                </p>
              </div>
            </motion.div>

            {/* Row 3: text left, screenshot right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Patterns emerge.</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Weekly rhythm. Monthly balance. Long-term accumulation. Strength trends beside muscle exposure. Drill month → week → day → exercise.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-[210px]">
                  <PhoneFrame>
                    <AppScreenshot
                      dark="/screenshots/dark/calendar-track.webp"
                      light="/screenshots/light/calendar-track.webp"
                      alt="Training calendar with color-coded sessions"
                    />
                  </PhoneFrame>
                </div>
              </div>
            </motion.div>

            {/* Row 4: text only — reduces screenshot fatigue */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center space-y-4"
            >
              <h3 className="text-2xl font-bold text-primary">Start with a proven structure.</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Push/Pull/Legs. Upper/Lower. Or build your own. Your plan lives in the app — ready when you show up.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-semibold text-foreground mb-6"
          >
            Log a set. See your recruitment map.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm">
              <a
                href="https://play.google.com/store/apps/details?id=com.yescoach.fit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download free — Android
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Monthly Insights */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold mb-4 text-foreground text-center"
          >
            More of what's inside
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mb-12 text-lg text-center"
          >
            Monthly breakdowns, balance charts, and the details that make training clearer.
          </motion.p>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:overflow-visible lg:flex-wrap lg:justify-center lg:snap-none">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0 }}
              viewport={{ once: true }}
              className="flex-shrink-0 snap-start w-[185px]"
            >
              <PhoneFrame>
                <AppScreenshot
                  dark="/screenshots/dark/month-pf.webp"
                  light="/screenshots/light/month-pf.webp"
                  alt="Month summary: sessions, sets, volume and muscle exposure map"
                />
              </PhoneFrame>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 snap-start w-[185px]"
            >
              <PhoneFrame>
                <AppScreenshot
                  dark="/screenshots/dark/month-balance.webp"
                  light="/screenshots/light/month-balance.webp"
                  alt="Monthly muscle balance chart"
                />
              </PhoneFrame>
            </motion.div>

            {/*
              This screenshot only exists in light mode (no dark equivalent).
              We pass the light image as the `dark` prop so AppScreenshot always renders it,
              but `dark:hidden` on the wrapper ensures it is never shown in dark mode.
              If this class is ever removed, audit that a dark version exists first.
            */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
              className="dark:hidden flex-shrink-0 snap-start w-[185px]"
            >
              <PhoneFrame>
                <AppScreenshot
                  dark="/screenshots/light/month-graph.webp"
                  alt="Monthly performance graph"
                />
              </PhoneFrame>
            </motion.div>

            {/* Dark mode only — no light equivalent yet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
              className="hidden dark:block flex-shrink-0 snap-start w-[185px]"
            >
              <PhoneFrame>
                <AppScreenshot
                  dark="/screenshots/dark/general.webp"
                  alt="YesCoach app overview"
                />
              </PhoneFrame>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Free · Local · Private */}
      <section className="py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold mb-4 text-primary"
          >
            Free. Local. Private.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg mb-12 max-w-2xl"
          >
            A fast lifter's log with a body it can reason about. Every feature, no time limit, running on your phone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-4 mb-14"
          >
            {[
              { label: "Free forever", detail: "Every feature. No ads. No paywall." },
              { label: "Local-first", detail: "Training history lives in device storage." },
              { label: "No account", detail: "Install, open, log. Nothing to sign up for." },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-foreground mb-1">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm">
              <a
                href="https://play.google.com/store/apps/details?id=com.yescoach.fit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download free — Android
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                q: "Is it really free?",
                a: "Yes. Every feature. No ads, no paywall, no time limit. The engine isn't gated."
              },
              {
                q: "Where does my training data live?",
                a: "In local storage on your device. It is not uploaded to a server, not sold, not shared."
              },
              {
                q: "How does the body map work?",
                a: "Each exercise is modeled as a movement pattern with joint actions. Per-muscle dose is derived from joint torque, moment arms, and the reps in reserve you report. Change stance, grip, or implement; recruitment recalculates."
              },
              {
                q: "Android only?",
                a: "Android is live on Google Play. iOS is on the roadmap."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="border-t border-border pt-6"
              >
                <p className="font-semibold text-foreground mb-2">{item.q}</p>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="YesCoach" className="h-7 w-auto" />
          </div>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <a href="https://twitter.com/YCoach58265" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Follow on X
            </a>
            <span aria-hidden="true">·</span>
            <a href="mailto:contact@yescoach.fit" className="hover:text-foreground transition-colors">
              contact@yescoach.fit
            </a>
            <span aria-hidden="true">·</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/blog/reading-your-body-honestly" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <span aria-hidden="true">·</span>
            <span>© 2026 YesCoach</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
