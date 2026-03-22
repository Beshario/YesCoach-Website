'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <img src="/logo.png" alt="YesCoach logo" className="h-5 w-auto" />
            <span className="font-semibold">YesCoach</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6 lg:px-12"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-foreground">
            Terms & Conditions
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Last Updated: March 4, 2026
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground mb-4">
                These Terms govern your use of the YesCoach app and related services. By using YesCoach, you agree to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                2. Accounts and Identity Data
              </h2>
              <p className="text-muted-foreground mb-4">
                You may use certain parts of YesCoach without creating an account. If you choose to create an account or sign in, you agree to provide accurate information.
              </p>
              <p className="text-muted-foreground mb-4">
                YesCoach does not collect your name or email unless you choose to sign up or sign in.
              </p>
              <p className="text-muted-foreground mb-4">
                If you sign in, your account identifier may be linked to analytics events for product reliability and usage analysis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                3. Training Data and Analytics
              </h2>
              <p className="text-muted-foreground mb-4">
                Workout log content (for example exercises, sets, reps, and load entries) is designed to stay primarily in local app storage on your device.
              </p>
              <p className="text-muted-foreground mb-4">
                We may collect discrete product usage events, such as app open, session start/complete, and pricing/payment funnel events.
              </p>
              <p className="text-muted-foreground">
                Additional details are described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                4. Beta Service Notice
              </h2>
              <p className="text-muted-foreground mb-4">
                YesCoach is in beta. Features may change, break, or be removed at any time.
              </p>
              <p className="text-muted-foreground">
                Data models and availability may evolve as the product matures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                5. Health Disclaimer
              </h2>
              <div className="bg-muted rounded-lg p-6 mb-4">
                <p className="text-foreground font-semibold">
                  YesCoach is not medical advice.
                </p>
              </div>
              <p className="text-muted-foreground mb-4">
                The app provides informational and educational insights only. You are responsible for your own training decisions and physical well-being.
              </p>
              <p className="text-muted-foreground">
                Consult a qualified professional before starting any new exercise program.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                6. Payments and Subscriptions
              </h2>
              <p className="text-muted-foreground mb-4">
                During beta, the full YesCoach app is offered free of charge.
              </p>
              <p className="text-muted-foreground mb-4">
                Paid features or subscriptions, when offered, are optional.
              </p>
              <p className="text-muted-foreground mb-4">
                Pricing, features, billing cycles, and availability may change.
              </p>
              <p className="text-muted-foreground">
                Payments are processed by third-party providers and app stores. Their terms also apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                7. Acceptable Use
              </h2>
              <p className="text-muted-foreground mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Misuse the app</li>
                <li>Attempt to reverse engineer or disrupt the service</li>
                <li>Use the app for unlawful purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                8. Intellectual Property
              </h2>
              <p className="text-muted-foreground">
                YesCoach, including software, designs, and content, is protected by applicable intellectual property laws. You may not copy, modify, or distribute YesCoach except as allowed by law or with written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                9. Disclaimer and Limitation of Liability
              </h2>
              <p className="text-muted-foreground mb-4">
                YesCoach is provided "as is" and "as available."
              </p>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, we are not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Data loss</li>
                <li>Service interruptions</li>
                <li>Training outcomes or injuries</li>
                <li>Indirect, incidental, special, or consequential damages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                10. Suspension and Termination
              </h2>
              <p className="text-muted-foreground">
                We may suspend or terminate access if these Terms are violated, if required by law, or to protect the service and users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                11. Children
              </h2>
              <p className="text-muted-foreground">
                YesCoach is not directed to children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                12. Changes to These Terms
              </h2>
              <p className="text-muted-foreground">
                We may update these Terms from time to time. Continued use after updates means the updated Terms apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                13. Contact
              </h2>
              <p className="text-muted-foreground">
                For legal, privacy, or account requests:{' '}
                <a
                  href="mailto:contact@yescoach.fit"
                  className="text-primary hover:underline"
                >
                  contact@yescoach.fit
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="YesCoach logo" className="h-7 w-auto" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
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
