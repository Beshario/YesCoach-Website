'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import type { ReactNode } from "react"
import { openAnalyticsChoice } from "@/components/analytics-consent"

const EMAIL = "contact@yescoach.fit"

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section>
      <h2 id={id} className="text-2xl font-semibold mb-4 text-foreground scroll-mt-24">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function Line({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p>
      <span className="text-foreground font-medium">{label}:</span> {children}
    </p>
  )
}

const mail = (
  <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">
    {EMAIL}
  </a>
)

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
            Last updated: November 24, 2026
          </p>

          <div className="space-y-8 text-muted-foreground">
            <Section title="1. Who we are">
              <p>YesCoach is made by Zbesh Apps, a business of Zbesh Tech Inc. Zbesh Tech Inc. controls the data this policy describes. This policy covers the YesCoach app and this website.</p>
              <p>The person accountable for privacy at Zbesh Tech Inc. answers questions and complaints at {mail}.</p>
              <p>Most of what you do in YesCoach stays on your phone. Each section below names one thing you can do and what leaves your phone when you do it.</p>
            </Section>

            <Section title="2. If you use the app without an account">
              <p>Your workouts, plans, goals, pain reports, settings and the exercises you add are stored on your phone. We do not receive them.</p>
              <p>The app downloads exercise content and pictures from our server. These downloads carry no account or workout data. Like any web request, our host, Cloudflare, sees your device&apos;s IP address.</p>
              <p>Reminders are scheduled on your phone.</p>
              <p>Resetting the app in Account, or uninstalling it, deletes this data. A reset keeps your privacy choices.</p>
            </Section>

            <Section title="3. If you make an account">
              <p>You can sign in with Google, Apple, or an email and password. Google&apos;s Firebase Authentication holds your email, an account ID, and the name your sign-in provider shares, if any.</p>
              <p>An account does not copy your workouts anywhere. They stay on your phone. If you lose your phone, an account will not bring them back. A backup file will (section 8).</p>
              <p>You need an account for the AI coach (section 5) and for muscle requests (section 6). What those features keep on our server is stored under a one-way code made from your account ID, not under your email or the ID itself.</p>
              <p>Keep your sign-in details safe. Anyone who signs in as you can use these features as you.</p>
            </Section>

            <Section title="4. If you allow analytics">
              <p>Analytics are off until you allow them. You can turn them off any time in Account.</p>
              <Line label="What we send">which screens and features you use, sessions you start and finish, and each set you log with its exercise, load, reps and effort. Also the app version, device type, and where you installed the app from.</Line>
              <Line label="What we do not send">your name, email, account ID, or text you type.</Line>
              <Line label="Identity">events are linked to a random ID made on your phone. They are not linked to your account, even when you are signed in.</Line>
              <Line label="Session recordings">with analytics on, we may record how you move through screens to find bugs. Text you type is hidden. Recording stops on screens where you report pain or answer setup questions.</Line>
              <Line label="Where it goes">PostHog, our analytics provider, on servers in the United States. Events are deleted after 3 months and recordings after 30 days.</Line>
            </Section>

            <Section title="5. If you use the AI coach">
              <p>The coach asks your permission before its first request. Declining changes nothing else in the app. You can turn it off any time in Account, and nothing more is sent.</p>
              <Line label="What we send">the place you train and the time you chose. How recovered each muscle group looks and when you last trained it hard. Your active goals and their progress. Your pain reports, with severity, trend and how long ago. This is health data. How often you train and your usual session length. Your recent sessions, as days ago, muscles worked and hard sets. The exercises your equipment allows. Notes you asked the coach to remember. Today&apos;s workout from your plan, if you follow one. Your note for the day, up to 200 characters, if you type one.</Line>
              <Line label="What we do not send">your name, email, account ID, body measurements, or the loads you lifted.</Line>
              <Line label="Where it goes">our server, run on Cloudflare, passes the request to Anthropic&apos;s API, which writes the plan. Anthropic receives the one-way code, not your account. Anthropic deletes API requests within 30 days, unless they are flagged for breaking its usage policy or the law requires longer.</Line>
              <Line label="What we keep">not the request, the note or the plan. We keep counts of your coach uses per day, week and month, the exercises the coach suggested to you and the ones you added, and, for 30 days, a reason code for any attempt that failed. Our AI gateway keeps metadata only, such as size, cost and timing. Our server logs hold errors and timings, never your request, and are deleted after 7 days at most.</Line>
              <p>Uses are limited per day and per week. Because the note is text you type, do not put personal information in it.</p>
            </Section>

            <Section title="6. If you request muscles for your own exercise">
              <p>You can add your own exercise with no muscle data. If you are signed in, you can tick Request muscles so we add them for everyone. This is off until you tick it.</p>
              <Line label="What we send">the exercise name you typed, how it is logged (weight and reps, reps only, or timed), your phone&apos;s language, and a random ID for the exercise. It is linked to your account by the one-way code. We never send your sets, loads or workout history.</Line>
              <Line label="When it sends">the request waits on your phone until you are signed in and online. Only the account that ticked the box can send it. Delete the exercise before it sends and nothing is sent. Each person can send up to 20 requests a day.</Line>
              <Line label="What we keep">a request nobody approves is deleted 180 days after you send it. A request we approve is kept, linked to the one-way code, as the record of why we added the exercise. If we add the muscles for everyone, the exercise joins the app&apos;s catalog with no link to you. Your own exercise stays on your phone either way.</Line>
              <p>Because the name is text you type, do not put personal information in it.</p>
            </Section>

            <Section id="health-connect" title="7. If you connect Health Connect">
              <p>On Android, you can choose to send your finished workouts to Health Connect, so they appear in the health apps you use. This is optional and off until you turn it on.</p>
              <Line label="What we write">each finished workout as an exercise session, with its exercises, sets and reps. On devices where Health Connect supports it, we also write weight, set order and effort.</Line>
              <Line label="What we read">nothing. YesCoach does not read data from Health Connect.</Line>
              <Line label="Where it goes">the data moves from your phone to Health Connect on the same phone. The workout data is not sent to YesCoach servers or analytics. If you have allowed analytics, we record events about the feature, such as whether a write succeeded and how many sets it had, never the workout data itself (section 4).</Line>
              <Line label="Your control">you can disconnect in YesCoach under Account, Settings, Connected apps, or in Health Connect. Deleting a session, deleting your account, or resetting the app deletes the workout records YesCoach wrote. You can also remove them in Health Connect.</Line>
              <p>YesCoach&apos;s use and transfer of information received from Health Connect will adhere to the Health Connect Permissions policy, including the Limited Use requirements. We use this data only to provide the Health Connect feature you see in the app. We do not use it for advertising, credit or insurance decisions, or medical devices. We do not sell it, and we do not share it with analytics or other third parties, except where the law requires.</p>
              <Line label="Security">Health Connect stores this data on your phone under Android&apos;s protections. YesCoach does not copy it anywhere else.</Line>
            </Section>

            <Section title="8. If you export a backup">
              <p>In Account, you can save a full backup or a CSV of your workouts. The file is made on your phone and goes where you save or share it. We never receive it. Anyone you give the file to can read your training data.</p>
            </Section>

            <Section title="9. If you open a video">
              <p>Exercise videos open on YouTube. YouTube&apos;s own privacy policy applies there. YesCoach sends YouTube nothing about you.</p>
            </Section>

            <Section title="10. If you delete your account">
              <p>In the app, go to Account, Data, Delete My Account. It deletes, in order: the workout records YesCoach wrote to Health Connect, everything our server holds under your one-way code (coach records and muscle requests), your sign-in account, the data on your phone, your privacy choices, and the app&apos;s analytics ID. <Link href="/delete-account" className="text-primary hover:underline">How to delete your account</Link>.</p>
              <p>We keep one record: the one-way code and the date you deleted, so the deleted account cannot send us data again. It holds no email or account ID.</p>
              <p>Analytics already sent stay under the random ID until they expire (section 4). To delete them sooner, or if you no longer have the app, email {mail}. We reply within 30 days.</p>
            </Section>

            <Section title="11. Purchases">
              <p>YesCoach has no in-app purchases right now. We hold no payment details.</p>
            </Section>

            <Section id="website" title="12. If you visit yescoach.fit">
              <p>This website can use Google Analytics to count visits and see which pages are read. It loads only if you tap Accept on the banner. Until then, and after Decline, no Google Analytics script runs and no Google Analytics cookies are set.</p>
              <p>Your choice is kept in this browser.{' '}
                <button type="button" onClick={openAnalyticsChoice} className="text-primary hover:underline">
                  Change your choice
                </button>
              </p>
            </Section>

            <Section title="13. Who processes data for us">
              <ul className="list-disc pl-6 space-y-2">
                <li>Google: sign-in (Firebase Authentication), app distribution (Google Play), and website analytics if you accept them.</li>
                <li>PostHog: app analytics and session recordings, only if you allow them.</li>
                <li>Cloudflare: our server, our AI gateway, and exercise content downloads.</li>
                <li>Anthropic: writes coach plans, only if you use the coach.</li>
              </ul>
              <p>We use this data to run the features you choose, keep the service secure, fix bugs, see how the app is used, and answer support and legal requests.</p>
            </Section>

            <Section title="14. How long we keep it">
              <ul className="list-disc pl-6 space-y-2">
                <li>Data on your phone: until you delete it, reset the app or uninstall it.</li>
                <li>Analytics: events 3 months, session recordings 30 days.</li>
                <li>Coach records: failure codes 30 days. Use counts and exercise suggestions until you delete your account. Server logs 7 days at most. Anthropic: 30 days (section 5).</li>
                <li>Muscle requests: 180 days if nobody approves them. Approved ones until you delete your account.</li>
                <li>Your sign-in account: until you delete it.</li>
                <li>Emails you send us: as long as we need to answer them.</li>
              </ul>
              <p>Processor records may be kept longer where the law, tax rules or fraud prevention require it.</p>
            </Section>

            <Section title="15. Your rights">
              <p>Subject to applicable law, you can ask us to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Show you the information linked to your account.</li>
                <li>Correct or update it.</li>
                <li>Delete it. <Link href="/delete-account" className="text-primary hover:underline">How to delete your account</Link>.</li>
                <li>Stop or limit some processing, where the law allows.</li>
              </ul>
              <p>Requests: {mail}</p>
            </Section>

            <Section title="16. Children">
              <p>YesCoach is not directed to children under 13. If you believe a child has given us personal information, contact us.</p>
            </Section>

            <Section title="17. Changes">
              <p>We may update this policy. The date at the top shows the latest version. Continued use after an update means the updated policy applies.</p>
            </Section>
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
