import type { Metadata } from 'next'
import Link from 'next/link'

const description =
  'How to delete your YesCoach account and data: in the app under Account, Data, Delete My Account, or by email to contact@yescoach.fit.'

export const metadata: Metadata = {
  title: 'Delete your account · YesCoach',
  description,
  alternates: { canonical: 'https://yescoach.fit/delete-account' },
  robots: { index: true, follow: true },
}

const EMAIL = 'contact@yescoach.fit'
const strong = 'text-foreground'

export default function DeleteAccountPage() {
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
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-10 text-muted-foreground">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">Delete your YesCoach account and data</h1>
            <p>This page is for the YesCoach app on Android, developed by YesCoach.</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">In the app</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Open YesCoach and tap <strong className={strong}>Account</strong>.</li>
              <li>Open the <strong className={strong}>Data</strong> tab.</li>
              <li>Tap <strong className={strong}>Delete My Account</strong> and confirm.</li>
            </ol>
            <p>If the app asks you to sign in again, sign out, sign back in, and repeat the steps.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">By email</h2>
            <p>
              If you no longer have the app, email{' '}
              <a href={`mailto:${EMAIL}?subject=Delete%20my%20YesCoach%20account`} className="text-primary hover:underline">
                {EMAIL}
              </a>{' '}
              with the subject &quot;Delete my YesCoach account&quot;, from the Google account you signed in with. We
              delete your account and data within 30 days and reply to confirm.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">What is deleted</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your sign-in account (Google sign-in through Firebase).</li>
              <li>All workouts, plans, goals, settings, and other data stored in the app on your phone.</li>
              <li>The workout records YesCoach wrote to Health Connect, while YesCoach is connected to it.</li>
              <li>Your privacy and terms choices stored in the app.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Usage analytics</h2>
            <p>
              If you allowed usage analytics, past analytics events are held by our analytics provider, PostHog, under
              a random ID. Deleting your account in the app stops new analytics from being linked to you. Analytics
              events are deleted after 3 months and session recordings after 30 days. To delete them sooner, email{' '}
              {EMAIL} and we delete them within 30 days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">What is kept</h2>
            <p>
              Nothing tied to your account is kept after deletion, except emails you sent us, which we keep only as
              long as needed to answer them.
            </p>
            <p>
              Read the full{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                privacy policy
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
