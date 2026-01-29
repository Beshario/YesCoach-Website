'use client'

import { motion } from "framer-motion"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
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
            Last Updated: 15/01/2026
          </p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                1. Overview
              </h2>
              <p>
                YesCoach is an early-stage, pre-alpha application. We collect only the minimum information needed to operate, improve the app, and communicate with early users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                2. Information We Collect
              </h2>
              <p className="mb-3">We may collect:</p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Name and email (for access, updates, and feedback)</li>
                <li>Basic usage data (e.g. feature usage, session completion)</li>
                <li>Device information (app version, platform, crash data)</li>
              </ul>
              <p>
                Training and body data may be stored locally and/or in early backend systems during pre-alpha.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                3. How We Use Your Information
              </h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Provide and improve the app</li>
                <li>Understand how features are used</li>
                <li>Communicate updates or important changes</li>
                <li>Fix bugs and improve reliability</li>
              </ul>
              <div className="bg-muted rounded-lg p-6">
                <p className="text-foreground font-semibold">
                  We do not sell your data.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                4. Data Storage & Retention
              </h2>
              <p className="mb-3">Because YesCoach is in pre-alpha:</p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Data may be reset or deleted as features evolve</li>
                <li>We do not guarantee long-term data persistence</li>
                <li>You may request deletion of your data at any time</li>
              </ul>
              <p>
                The app provides export and import functionality to help you preserve your training data. While we do our best to maintain data integrity and work with you on data preservation, you are responsible for regularly backing up your data using the export feature.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                5. Third-Party Services
              </h2>
              <p className="mb-3">
                We may use third-party services (e.g. analytics, payments when enabled) that process limited data on our behalf.
              </p>
              <p>
                These services are used only to support core app functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                6. Payments (If Enabled)
              </h2>
              <p className="mb-3">If payments are enabled:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment details are handled by third-party providers</li>
                <li>YesCoach does not store your full payment information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                7. Your Rights
              </h2>
              <p className="mb-3">You can:</p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Request access to your data</li>
                <li>Request data deletion</li>
                <li>Ask questions about data usage</li>
              </ul>
              <p>
                Contact us at:{' '}
                <a
                  href="mailto:contact@yescoach.fit"
                  className="text-primary hover:underline"
                >
                  contact@yescoach.fit
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                8. Changes to This Policy
              </h2>
              <p>
                This policy may change as the app matures. Continued use of the app means you accept the updated policy.
              </p>
            </section>

            <p className="text-sm italic text-muted-foreground mt-12">
              This policy applies to pre-alpha versions only.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-border py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <span>·</span>
            <span>© 2026 YesCoach</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
