'use client'

import { motion } from "framer-motion"
import Link from "next/link"

export default function PrivacyContent() {
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

      <main className="py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6 lg:px-12"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Last updated: October 4, 2026
          </p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Scope</h2>
              <p>How YesCoach handles your information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Process</h2>
              <p className="mb-3">Depending on how you use the app:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Account info if you sign up or sign in: email and account identifiers.</li>
                <li>Training data you enter: exercises, sets, reps, load.</li>
                <li>Usage events: app open, session start/complete, pricing and payment funnel.</li>
                <li>Technical data: app version, device type, diagnostics.</li>
              </ul>
              <p>Name and email are collected if you create an account or sign in.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Local Training Data</h2>
              <p>Workout log content is stored primarily on your device. Analytics receive product events (e.g. session start), not per-set workout details.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Analytics Identity</h2>
              <p>Analytics are anonymous by default. If you sign in, events may be linked to your account identifier for product reliability and usage analysis.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. How We Use Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Operate the app and account access.</li>
                <li>Service security, quality, and debugging.</li>
                <li>Measure product usage.</li>
                <li>Subscription and billing integration.</li>
                <li>Support, legal, and compliance requests.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Third-Party Processors</h2>
              <p className="mb-3">Third-party providers handle authentication, analytics, subscriptions, payments, and app-store operations.</p>
              <p>Payment details are handled by payment processors and app stores; YesCoach does not store card details.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Retention</h2>
              <p className="mb-3">Data is retained as long as needed for the purposes described, legal obligations, and dispute resolution.</p>
              <p>Local data can be removed via in-app reset or by uninstalling the app. Account-linked data and processor records may persist for operational, legal, tax, and anti-fraud requirements.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Your Rights</h2>
              <p className="mb-3">Subject to applicable law, you may request to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Access information associated with your account.</li>
                <li>Correct or update account information.</li>
                <li>Delete your account-linked data.</li>
                <li>Object to or restrict certain processing where applicable.</li>
              </ul>
              <p>
                Requests:{' '}
                <a href="mailto:contact@yescoach.fit" className="text-primary hover:underline">
                  contact@yescoach.fit
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Children</h2>
              <p>YesCoach is not directed to children under 13. If you believe a child has provided personal information, contact us.</p>
            </section>

            <section>
              <h2 id="health-connect" className="text-2xl font-semibold mb-4 text-foreground scroll-mt-24">10. Health Connect</h2>
              <p className="mb-3">On Android, you can choose to send your finished workouts to Health Connect, so they appear in the health apps you use. This is optional and off until you turn it on.</p>
              <p className="mb-3">What we write: each finished workout as an exercise session, with its exercises, sets and reps. On devices where Health Connect supports it, we also write weight, set order and effort.</p>
              <p className="mb-3">What we read: nothing. YesCoach does not read data from Health Connect.</p>
              <p className="mb-3">Where it goes: the data moves from your device to Health Connect on the same device. It is not sent to YesCoach servers.</p>
              <p className="mb-3">Your control: you can disconnect in YesCoach under Account, Settings, Connected apps, or in Health Connect. Deleting a session, deleting your account, or resetting the app deletes the workout records YesCoach wrote. You can also remove them in Health Connect.</p>
              <p className="mb-3">YesCoach's use and transfer of information received from Health Connect will adhere to the Health Connect Permissions policy, including the Limited Use requirements. We use this data only to provide the Health Connect feature you see in the app. We do not use it for advertising, credit or insurance decisions, or medical devices. We do not sell it, and we do not share it with analytics or other third parties, except where the law requires.</p>
              <p className="mb-3">Security: Health Connect stores this data on your device under Android's protections. YesCoach does not copy it anywhere else.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Changes</h2>
              <p>This Policy may be updated. Continued use after updates means the updated Policy applies.</p>
            </section>
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-border py-12">
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
