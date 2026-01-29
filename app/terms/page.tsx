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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
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
            Last Updated: 15/01/2026
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                1. Pre-Alpha Status
              </h2>
              <p className="text-muted-foreground mb-4">
                YesCoach is currently in pre-alpha. Features may change, break, or be removed at any time. Data may be reset.
              </p>
              <p className="text-muted-foreground">
                By using the app, you acknowledge this early stage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                2. Accounts & Data
              </h2>
              <p className="text-muted-foreground mb-4">
                We may collect name and email for access, feedback, and updates.
              </p>
              <p className="text-muted-foreground mb-4">
                Training data is currently stored locally and/or in early backend systems.
              </p>
              <p className="text-muted-foreground mb-4">
                The app provides export and import functionality so you can back up your training data. While we do our best to maintain data integrity and work with you on data preservation, we make no guarantees about data persistence during pre-alpha. You are responsible for backing up your data using the export feature.
              </p>
              <p className="text-muted-foreground">
                You can request deletion of your data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                3. Health Disclaimer
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
                4. Payments (If Applicable)
              </h2>
              <p className="text-muted-foreground mb-4">
                Founder access or paid features, when enabled, are optional and meant to support development.
              </p>
              <p className="text-muted-foreground">
                Pricing, features, and availability may change as the product evolves.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                5. Acceptable Use
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
                6. Limitation of Liability
              </h2>
              <p className="text-muted-foreground mb-4">
                YesCoach is provided "as is" during pre-alpha.
              </p>
              <p className="text-muted-foreground mb-4">
                We are not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Data loss</li>
                <li>Service interruptions</li>
                <li>Training outcomes or injuries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                7. Changes to These Terms
              </h2>
              <p className="text-muted-foreground">
                These terms may be updated as the product matures. Continued use of the app means acceptance of updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                8. Contact
              </h2>
              <p className="text-muted-foreground">
                For questions or data requests:{' '}
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
