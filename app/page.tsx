'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { EmailForm } from "@/components/email-form"
import { ThemeToggle } from '@/components/theme-toggle'
import { PhoneFrame } from '@/components/phone-frame'
import { AppScreenshot } from '@/components/app-screenshot'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <img src="/logo.png" alt="YesCoach logo" className="h-5 w-auto" />
            <span className="text-lg font-semibold tracking-tight">YesCoach</span>
          </Link>
          <span className="hidden sm:inline text-sm text-muted-foreground">
            Biomechanics-based strength training
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Text */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
              >
                See what your training is doing.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-xl text-muted-foreground space-y-1"
              >
                <p>You put in the work.</p>
                <p>But are the right muscles working?</p>
                <p>Are you recovered enough to push today?</p>
                <p>Is your training balanced over time?</p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-base text-muted-foreground leading-relaxed"
              >
                Session by session, patterns unfold. Week by week, the picture builds.
              </motion.p>
            </div>

            {/* Phone mockups */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[540px] flex items-center justify-center lg:justify-end"
            >
              {/* Back phone — behind, rotated */}
              <div className="absolute left-4 lg:left-0 top-4 rotate-[-7deg] opacity-60 w-[190px] z-0">
                <PhoneFrame>
                  <AppScreenshot
                    dark="/screenshots/dark/home-back.jpg"
                    light="/screenshots/light/home-back.jpg"
                    alt="YesCoach app back view"
                  />
                </PhoneFrame>
              </div>

              {/* Front phone — in front, slight counter-rotation */}
              <div className="relative rotate-[2deg] w-[210px] ml-24 lg:ml-32 z-10">
                <PhoneFrame>
                  <AppScreenshot
                    dark="/screenshots/dark/home-front.jpg"
                    light="/screenshots/light/home-front.jpg"
                    alt="YesCoach app home screen"
                  />
                </PhoneFrame>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Twitter CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            viewport={{ once: false }}
            className="text-muted-foreground mb-6"
          >
            Building in the open. Thinking through problems, sharing what works, what doesn't.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            viewport={{ once: false }}
          >
            <Button asChild size="lg" className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white">
              <a href="https://twitter.com/YCoach58265" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
                Follow along on Twitter
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: false }}
            className="text-3xl lg:text-4xl font-bold mb-20 text-foreground"
          >
            What you get
          </motion.h2>

          <div className="space-y-24">

            {/* Row 1: text left, screenshot right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Log sets the way you actually train</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Weight, reps, and how hard it felt — logged in seconds. Every set feeds the model that builds a real picture of your training over time.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-[210px]">
                  <PhoneFrame>
                    <AppScreenshot
                      dark="/screenshots/dark/set-logging.jpg"
                      light="/screenshots/light/set-logging.jpg"
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
              viewport={{ once: false }}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <div className="hidden dark:flex justify-center lg:order-1 order-2">
                <div className="w-[210px]">
                  <PhoneFrame>
                    <AppScreenshot
                      dark="/screenshots/dark/day-summary.jpg"
                      alt="Day summary showing muscle work body map"
                    />
                  </PhoneFrame>
                </div>
              </div>
              <div className="space-y-4 lg:order-2 order-1">
                <h3 className="text-2xl font-bold text-primary">See exactly what you worked</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  After each session, a color-coded body map shows which muscles you hit and how hard — front and back. Not a list of exercises. A picture of the session.
                </p>
              </div>
            </motion.div>

            {/* Row 3: text left, screenshot right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Every session, on the map</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  A color-coded calendar shows when you trained and how hard. Spot gaps, see your rhythm, and navigate back to any day in your history.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-[210px]">
                  <PhoneFrame>
                    <AppScreenshot
                      dark="/screenshots/dark/calendar-track.jpg"
                      light="/screenshots/light/calendar-track.jpg"
                      alt="Training calendar with color-coded sessions"
                    />
                  </PhoneFrame>
                </div>
              </div>
            </motion.div>

            {/* Row 4: screenshot left, text right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="flex justify-center lg:order-1 order-2">
                <div className="w-[210px]">
                  <PhoneFrame>
                    <AppScreenshot
                      dark="/screenshots/dark/week-summary.jpg"
                      light="/screenshots/light/week-summary.jpg"
                      alt="Programs screen showing preset and custom training programs"
                    />
                  </PhoneFrame>
                </div>
              </div>
              <div className="space-y-4 lg:order-2 order-1">
                <h3 className="text-2xl font-bold text-primary">Start with a proven program</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Pick from structures like Push/Pull/Legs or Upper/Lower, or build your own. Your training plan lives in the app, ready to load when you show up.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Monthly Insights */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: false }}
            className="text-3xl lg:text-4xl font-bold mb-4 text-foreground text-center"
          >
            More of what's inside
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: false }}
            className="text-muted-foreground mb-12 text-lg text-center"
          >
            Monthly breakdowns, balance charts, and the details that make training clearer.
          </motion.p>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:overflow-visible lg:flex-wrap lg:justify-center lg:snap-none">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0 }}
              viewport={{ once: false }}
              className="flex-shrink-0 snap-start w-[185px]"
            >
              <PhoneFrame>
                <AppScreenshot
                  dark="/screenshots/dark/month-pf.jpg"
                  light="/screenshots/light/month-pf.jpg"
                  alt="Month summary: sessions, sets, volume and muscle exposure map"
                />
              </PhoneFrame>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: false }}
              className="flex-shrink-0 snap-start w-[185px]"
            >
              <PhoneFrame>
                <AppScreenshot
                  dark="/screenshots/dark/month-balance.jpg"
                  light="/screenshots/light/month-balance.jpg"
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
              viewport={{ once: false }}
              className="dark:hidden flex-shrink-0 snap-start w-[185px]"
            >
              <PhoneFrame>
                <AppScreenshot
                  dark="/screenshots/light/month-graph.jpg"
                  alt="Monthly performance graph"
                />
              </PhoneFrame>
            </motion.div>

            {/* Dark mode only — no light equivalent yet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: false }}
              className="hidden dark:block flex-shrink-0 snap-start w-[185px]"
            >
              <PhoneFrame>
                <AppScreenshot
                  dark="/screenshots/dark/general.jpg"
                  alt="YesCoach app overview"
                />
              </PhoneFrame>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            viewport={{ once: false }}
            className="space-y-4 text-center"
          >
            <p className="text-2xl text-foreground">
              <span className="text-accent font-semibold">Clarity builds confidence.</span>
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              viewport={{ once: false }}
              className="text-xl text-muted-foreground"
            >
              When you can see what's happening, you train with intention — and trust grows naturally.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: false }}
              className="text-lg text-muted-foreground pt-4"
            >
              You already do the work. YesCoach helps you understand it.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-32 border-t border-border">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            viewport={{ once: false }}
            className="text-3xl font-bold mb-4 text-primary"
          >
            Currently building
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            viewport={{ once: false }}
            className="text-muted-foreground mb-8"
          >
            Curious where this goes? Follow along as it takes shape.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <EmailForm />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="YesCoach logo" className="h-7 w-auto" />
          </div>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
            <span>·</span>
            <span>© 2026 YesCoach</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
