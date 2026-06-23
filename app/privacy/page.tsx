'use client'

import { motion } from "framer-motion"
import Link from "next/link"

export default function PrivacyPage() {
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
            Last updated: June 23, 2026
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
              <p>Name and email are only collected if you create an account or sign in.</p>
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
              <p className="mb-3">Data is retained only as long as needed for the purposes described, legal obligations, and dispute resolution.</p>
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
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Changes</h2>
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
