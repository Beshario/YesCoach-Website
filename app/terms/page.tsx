'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <img src="/logo.png" alt="" className="h-5 w-auto" />
            <span className="font-semibold">YesCoach</span>
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
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-foreground">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Last updated: June 23, 2026
          </p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance</h2>
              <p>These Terms govern your use of the YesCoach app and related services. By using YesCoach, you agree to these Terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Accounts</h2>
              <p className="mb-3">You may use parts of YesCoach without an account. If you create an account or sign in, you agree to provide accurate information.</p>
              <p>If you sign in, your account identifier may be linked to analytics events for product reliability and usage analysis.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Training Data and Analytics</h2>
              <p className="mb-3">Workout log content (exercises, sets, reps, load) is stored primarily on your device.</p>
              <p className="mb-3">We collect discrete product usage events such as app open, session start/complete, and pricing/payment funnel events.</p>
              <p>Details: <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Service Notice</h2>
              <p className="mb-3">YesCoach is in active development. Features may change, break, or be removed.</p>
              <p>Data models and availability may evolve as the product matures.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Health Disclaimer</h2>
              <p className="mb-3">YesCoach is not medical advice. The app provides informational and educational insights only.</p>
              <p className="mb-3">You are responsible for your own training decisions and physical well-being.</p>
              <p>Consult a qualified professional before starting any new exercise program.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Payments and Subscriptions</h2>
              <p className="mb-3">Paid features (coaching, in development) and any future subscriptions are optional.</p>
              <p className="mb-3">Pricing, features, billing cycles, and availability may change.</p>
              <p>Payments are processed by third-party providers and app stores; their terms also apply.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Acceptable Use</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Misuse the app.</li>
                <li>Attempt to reverse engineer or disrupt the service.</li>
                <li>Use the app for unlawful purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Intellectual Property</h2>
              <p>YesCoach, including software, designs, and content, is protected by applicable intellectual property laws. You may not copy, modify, or distribute YesCoach except as allowed by law or with written permission.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Disclaimer and Limitation of Liability</h2>
              <p className="mb-3">YesCoach is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo;</p>
              <p className="mb-3">To the maximum extent permitted by law, we are not liable for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data loss.</li>
                <li>Service interruptions.</li>
                <li>Training outcomes or injuries.</li>
                <li>Indirect, incidental, special, or consequential damages.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Suspension and Termination</h2>
              <p>We may suspend or terminate access if these Terms are violated, if required by law, or to protect the service and users.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Children</h2>
              <p>YesCoach is not directed to children under 13.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Changes</h2>
              <p>These Terms may be updated. Continued use after updates means the updated Terms apply.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Contact</h2>
              <p>
                For legal, privacy, or account requests:{' '}
                <a href="mailto:contact@yescoach.fit" className="text-primary hover:underline">
                  contact@yescoach.fit
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="YesCoach" className="h-7 w-auto" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
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
