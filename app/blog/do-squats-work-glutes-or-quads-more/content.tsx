'use client'

import { motion } from "framer-motion"
import Link from "next/link"

const SLUG = "do-squats-work-glutes-or-quads-more"
// Tag is fixed by the approved draft (utm_medium=post); playStoreUrl() would force utm_medium=web.
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.yescoach.fit&referrer=utm_source%3Dblog%26utm_medium%3Dpost%26utm_campaign%3Dblog_squats_glutes_quads"

const linkClass = "text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"

function Cite({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  )
}

function Shot({ file, alt, caption, width, height, className = "", priority = false }: {
  file: string; alt: string; caption: string; width: number; height: number; className?: string; priority?: boolean
}) {
  return (
    <figure className={className}>
      <div className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-3 shadow-sm">
        <img
          src={`/blog/${SLUG}/${file}`}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          {...(priority ? { fetchPriority: "high" as const } : {})}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <figcaption className="text-center text-sm text-muted-foreground mt-3">{caption}</figcaption>
    </figure>
  )
}

const sources = [
  { text: "Glassbrook DJ, Helms ER, Brown SR, Storey AG. A review of the biomechanical differences between the high-bar and low-bar back-squat. J Strength Cond Res. 2017.", url: "https://pubmed.ncbi.nlm.nih.gov/28570490/" },
  { text: "Paoli A, Marcolin G, Petrone N. The effect of stance width on the electromyographical activity of eight superficial thigh muscles during back squat with different bar loads. J Strength Cond Res. 2009.", url: "https://pubmed.ncbi.nlm.nih.gov/19130646/" },
  { text: "McCaw ST, Melrose DR. Stance width and bar load effects on leg muscle activity during the parallel squat. Med Sci Sports Exerc. 1999.", url: "https://pubmed.ncbi.nlm.nih.gov/10188748/" },
  { text: "Kubo K, Ikebukuro T, Yata H. Effects of squat training with different depths on lower limb muscle volumes. Eur J Appl Physiol. 2019.", url: "https://pubmed.ncbi.nlm.nih.gov/31230110/" },
  { text: "Contreras B, Vigotsky AD, Schoenfeld BJ, Beardsley C, Cronin J. A comparison of gluteus maximus, biceps femoris, and vastus lateralis EMG amplitude in the parallel, full, and front squat variations in resistance-trained females. J Appl Biomech. 2016.", url: "https://pubmed.ncbi.nlm.nih.gov/26252837/" },
  { text: "Bozkurt Ö, Erdağ D, Tinazci C, Burgul N, Bekiroğulları H. Mechanobiological and neuromuscular responses to foot-position variations during front and back squat exercises. Front Physiol. 2025.", url: "https://doi.org/10.3389/fphys.2025.1727141" },
]

export default function BlogPostContent() {
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
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto px-6 lg:px-12"
        >
          <div className="mb-10">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span>Beshari Jamal</span>
              <span aria-hidden="true">·</span>
              <time dateTime="2026-11-27">November 27, 2026</time>
              <span aria-hidden="true">·</span>
              <span>4 min read</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
              Do squats work glutes or quads more? It depends on the squat
            </h1>
            <p className="text-xl text-muted-foreground">
              Both, every rep. Which one leads depends on bar position, depth and stance width: a high-bar squat leans on the quads, and a deeper, wider, low-bar squat gives more to the glutes.
            </p>
          </div>

          <Shot
            file="two-squats-side-by-side.webp"
            alt="YesCoach body map for a back squat next to a wide-stance (sumo) squat, glutes and quads shaded by estimated muscle work"
            caption="Same sets, two stances. Estimated muscle work*."
            width={1620}
            height={817}
            className="mb-12"
            priority
          />

          <div className="space-y-12 text-lg text-muted-foreground">
            <p>The sections below cover what each change does, what the studies measured, and which squat to pick for your goal.</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Bar position</h2>
              <p>
                High-bar and low-bar back squats move the load differently. A 2017 review by Glassbrook and colleagues in the Journal of Strength and Conditioning Research found the high-bar squat has more knee bend, less hip bend, a more upright torso and a deeper position. The low-bar squat has more hip bend and more forward lean. Across the studies it covered, the low-bar squat showed more erector spinae, adductor and glute activity, and the high-bar squat showed more quadriceps activity. <Cite href="https://pubmed.ncbi.nlm.nih.gov/28570490/">Review abstract on PubMed</Cite>.
              </p>
              <p>
                If you want more quads, a high bar on the upper traps and an upright chest points the work at the knee. If you want more glutes, a low bar on the rear delts sends more of it to the hips.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Stance width</h2>
              <p>
                Paoli and colleagues put surface EMG on eight thigh and hip muscles in six experienced lifters. They squatted at three stance widths with no load, 30% and 70% of their one-rep max. Only the gluteus maximus changed with stance: it was more active at the widest stance, at no load and at 70%. The other seven muscles, quads included, showed no difference. <Cite href="https://pubmed.ncbi.nlm.nih.gov/19130646/">Paoli 2009 on PubMed</Cite>.
              </p>
              <p>
                McCaw and Melrose reached a matching conclusion with nine male lifters and three stances (narrow, shoulder width, wide): stance width did not isolate anything inside the quadriceps, and it did change activity in the adductor and glute region. <Cite href="https://pubmed.ncbi.nlm.nih.gov/10188748/">McCaw and Melrose 1999 on PubMed</Cite>.
              </p>
              <p>
                Both samples are small. Read them as a pointer: going wider asks more of the glutes and inner thigh, and going narrower does not turn the squat into a quad isolation.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Depth</h2>
              <p>
                Kubo and colleagues assigned 17 men to 10 weeks of full squats (knees bent to about 140 degrees) or half squats (about 90 degrees), twice a week, and measured muscle volume with MRI. Knee extensor volume rose about the same in both groups (4.9% full, 4.6% half). Glute volume rose 6.7% with full squats and 2.2% with half squats, and the adductors rose 6.2% against 2.7%. <Cite href="https://pubmed.ncbi.nlm.nih.gov/31230110/">Kubo 2019 on PubMed</Cite>.
              </p>
              <p>
                So depth moves the glute number far more than the quad number. If your squats stop high, the quads still get their growth, and the glutes get less of it.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Front, full and parallel</h2>
              <p>
                Contreras and colleagues recorded EMG from the upper and lower gluteus maximus, biceps femoris and vastus lateralis in 13 trained women doing front, full and parallel squats at an estimated 10-rep max. They found no difference in any muscle between the three. The authors also noted the front squat may give a similar training stimulus to the back squat with lighter loads. <Cite href="https://pubmed.ncbi.nlm.nih.gov/26252837/">Contreras 2016 on PubMed</Cite>.
              </p>
              <p>
                Within that set of variations, the choice rests on what you can load and hold well, because the EMG split did not separate them.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Foot position</h2>
              <p>
                A 2025 study of 12 trained men squatted at 70% of their one-rep max with a flat foot, raised heels or a raised forefoot. Quadriceps activation was greater with the flat foot and raised heels than with a raised forefoot. <Cite href="https://doi.org/10.3389/fphys.2025.1727141">Bozkurt 2025 in Frontiers in Physiology</Cite>.
              </p>
              <p>
                I did not find a study on toe-out angle I could read and trust, so this post makes no claim about it. Pick the angle that lets you reach depth with your knees tracking over your toes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">What to do</h2>
              <p>
                <strong className="text-foreground">For more glutes:</strong> squat to full depth, use a stance a little wider than shoulder width, and try a low bar if your shoulders allow it. Add a hip-dominant lift on another day.
              </p>
              <p>
                <strong className="text-foreground">For more quads:</strong> use a high bar, an upright torso and a flat foot or slightly raised heels. Depth is your call here: in Kubo&apos;s study the quads grew about the same with half and full squats, and full depth added glute work on top.
              </p>
              <p>
                <strong className="text-foreground">If you want both:</strong> full-depth squats at a moderate stance train both. Pick one squat you can repeat and add weight to over time.
              </p>
            </section>

            <Shot
              file="high-bar-back-squat.webp"
              alt="YesCoach body map after 5 sets of high-bar back squat"
              caption="High-bar back squat, 5 sets. Estimated muscle work*."
              width={810}
              height={737}
              className="mx-auto max-w-xl"
            />

            <Shot
              file="wide-stance-squat.webp"
              alt="YesCoach body map after 5 sets of wide-stance (sumo) squat, glutes warmer"
              caption="Wide-stance (sumo) squat, 5 sets. Estimated muscle work*."
              width={810}
              height={737}
              className="mx-auto max-w-xl"
            />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">See the split for your own sets</h2>
              <p>
                Log your squats in YesCoach and the body map shows the estimated* muscle work for each set, so you can compare your own variations. <Cite href={PLAY_STORE_URL}>Get YesCoach on Android</Cite>.
              </p>
              <p className="text-base">
                *Muscle work in YesCoach is an estimate from the sets you log. EMG studies measure muscle activation, which is not the same as muscle growth.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Sources</h2>
              <ul className="list-disc pl-6 space-y-3 text-base">
                {sources.map((s) => (
                  <li key={s.url}>
                    {s.text}{" "}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} break-all`}>{s.url}</a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-16 border-t border-border/70 pt-8">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Related</p>
            <ul className="space-y-2 text-base">
              <li>
                <Link href="/blog/watch-a-lift-light-up" className="text-primary hover:opacity-80 transition-opacity">
                  Watch a lift light up
                </Link>
              </li>
              <li>
                <Link href="/blog/programs-and-protocols" className="text-primary hover:opacity-80 transition-opacity">
                  How to start strength training at home
                </Link>
              </li>
            </ul>
          </div>
        </motion.article>
      </main>

      <footer className="border-t border-border py-12 mt-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="YesCoach" className="h-7 w-auto" />
          </div>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span aria-hidden="true">·</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <span aria-hidden="true">·</span>
            <span>© 2026 YesCoach</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
