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
            Last Updated: March 4, 2026
          </p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                1. Scope
              </h2>
              <p>
                This Privacy Policy explains how YesCoach handles information for the YesCoach application and related services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                2. Information We Process
              </h2>
              <p className="mb-3">Depending on how you use YesCoach, we may process:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Account information you provide if you choose to sign up or sign in (for example, email address and account identifiers).
                </li>
                <li>
                  Training information you enter in the app (for example, exercises, sets, reps, load, and related workout details).
                </li>
                <li>
                  Product usage events used for analytics and funnel measurement (for example, app open, session start/complete, pricing page viewed, and payment attempt).
                </li>
                <li>
                  Technical data such as app version, device/platform type, and diagnostic signals.
                </li>
              </ul>
              <div className="bg-muted rounded-lg p-6">
                <p className="text-foreground font-semibold">
                  We do not collect your name or email unless you choose to create an account or sign in.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                3. Local Training Data
              </h2>
              <p className="mb-3">
                Workout log content is designed to stay primarily in local app storage on your device.
              </p>
              <p>
                YesCoach uses discrete product events for analytics and does not rely on detailed per-set workout log export to analytics systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                4. Analytics Identity
              </h2>
              <p className="mb-3">
                Analytics may be anonymous by default. If you sign in, analytics events may be linked to your account identifier so we can understand product reliability and behavior across sessions.
              </p>
              <p>
                We do not sell personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                5. How We Use Information
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Operate core app features and account access.</li>
                <li>Maintain service security, quality, and debugging.</li>
                <li>Measure product usage and improve user experience.</li>
                <li>Manage subscriptions and billing integrations.</li>
                <li>Respond to support, legal, and compliance requests.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                6. Third-Party Processors
              </h2>
              <p>
                We use third-party providers for defined functions, including authentication, analytics, subscriptions, payments, and app-store operations.
              </p>
              <p className="mt-3">
                Payment credentials are handled by payment processors and app stores. YesCoach does not store full payment card details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                7. Retention
              </h2>
              <p className="mb-3">
                We retain data only as long as needed for the purposes described in this Policy, legal obligations, and dispute resolution.
              </p>
              <p>
                Local data may be removed by using in-app reset/export tools or uninstalling the app. Account-linked data and processor records may persist for operational, legal, tax, and anti-fraud requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                8. Your Rights and Choices
              </h2>
              <p className="mb-3">Subject to applicable law, you may request to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Access information associated with your account.</li>
                <li>Correct or update account information.</li>
                <li>Delete your account-linked data.</li>
                <li>Object to or restrict certain processing where applicable.</li>
              </ul>
              <p>
                To exercise rights or ask questions, contact:{' '}
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
                9. Children
              </h2>
              <p>
                YesCoach is not directed to children under 13. If you believe a child has provided personal information, contact us and we will review and address the request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Policy from time to time. Continued use after updates means the updated Policy applies to your use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                11. Contact
              </h2>
              <p>
                YesCoach privacy requests: <a href="mailto:contact@yescoach.fit" className="text-primary hover:underline">contact@yescoach.fit</a>
              </p>
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
