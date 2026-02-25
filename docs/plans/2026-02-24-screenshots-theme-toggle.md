# Screenshots + Theme Toggle Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Incorporate 9 real app screenshots into the landing page with phone mockup frames, redesign the feature section into an alternating split layout, add a monthly insights showcase strip, and wire up a dark/light theme toggle defaulting to dark.

**Architecture:** `next-themes` handles theme persistence and class injection on `<html>`. Tailwind v4 dark variant is reconfigured to use the `.dark` class. Three new components (`PhoneFrame`, `AppScreenshot`, `ThemeToggle`) compose together throughout the page. Images live in `public/screenshots/dark/` and `public/screenshots/light/` with clean names.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, next-themes, framer-motion, lucide-react, next/image

---

## Image Mapping Reference

| `public/` path | Source file |
|---|---|
| `screenshots/dark/home-front.jpg` | `Assets/RealTimeHomePage.jpg` |
| `screenshots/dark/home-back.jpg` | `Assets/RealTimeHomePageback.jpg` |
| `screenshots/dark/set-logging.jpg` | `Assets/SetLogging.jpg` |
| `screenshots/dark/day-summary.jpg` | `Assets/daySummary.jpg` |
| `screenshots/dark/calendar-track.jpg` | `Assets/CalendarTrack.jpg` |
| `screenshots/dark/week-summary.jpg` | `Assets/WeekSummarypremiumFeat.jpg` |
| `screenshots/dark/month-pf.jpg` | `Assets/MontSummaryPF.jpg` |
| `screenshots/dark/month-balance.jpg` | `Assets/MonthSummaryPFBalance.jpg` |
| `screenshots/dark/general.jpg` | `Assets/Screenshot_20260224_060701_YesCoach.jpg` |
| `screenshots/light/home-front.jpg` | `Assets/light/front.jpg` |
| `screenshots/light/home-back.jpg` | `Assets/light/back.jpg` |
| `screenshots/light/set-logging.jpg` | `Assets/light/logsetting.jpg` |
| `screenshots/light/calendar-track.jpg` | `Assets/light/trackCalendar.jpg` |
| `screenshots/light/month-pf.jpg` | `Assets/light/monthSumamrtPF.jpg` |
| `screenshots/light/month-balance.jpg` | `Assets/light/monthSumamryPFBalanceChart.jpg` |
| `screenshots/light/month-graph.jpg` | `Assets/light/monthsummary1ermgrasphPF.jpg` |

---

### Task 1: Copy images to public and install next-themes

**Files:**
- Create: `public/screenshots/dark/` (directory + 9 images)
- Create: `public/screenshots/light/` (directory + 7 images)
- Modify: `package.json` (next-themes added by npm)

**Step 1: Create screenshot directories and copy images**

```bash
mkdir -p public/screenshots/dark public/screenshots/light

cp Assets/RealTimeHomePage.jpg           public/screenshots/dark/home-front.jpg
cp Assets/RealTimeHomePageback.jpg       public/screenshots/dark/home-back.jpg
cp Assets/SetLogging.jpg                 public/screenshots/dark/set-logging.jpg
cp Assets/daySummary.jpg                 public/screenshots/dark/day-summary.jpg
cp Assets/CalendarTrack.jpg              public/screenshots/dark/calendar-track.jpg
cp "Assets/WeekSummarypremiumFeat.jpg"   public/screenshots/dark/week-summary.jpg
cp Assets/MontSummaryPF.jpg              public/screenshots/dark/month-pf.jpg
cp Assets/MonthSummaryPFBalance.jpg      public/screenshots/dark/month-balance.jpg
cp "Assets/Screenshot_20260224_060701_YesCoach.jpg" public/screenshots/dark/general.jpg

cp Assets/light/front.jpg                         public/screenshots/light/home-front.jpg
cp Assets/light/back.jpg                          public/screenshots/light/home-back.jpg
cp Assets/light/logsetting.jpg                    public/screenshots/light/set-logging.jpg
cp Assets/light/trackCalendar.jpg                 public/screenshots/light/calendar-track.jpg
cp "Assets/light/monthSumamrtPF.jpg"              public/screenshots/light/month-pf.jpg
cp "Assets/light/monthSumamryPFBalanceChart.jpg"  public/screenshots/light/month-balance.jpg
cp "Assets/light/monthsummary1ermgrasphPF.jpg"    public/screenshots/light/month-graph.jpg
```

**Step 2: Verify all files copied**

```bash
ls public/screenshots/dark/ | wc -l
ls public/screenshots/light/ | wc -l
```

Expected: `9` and `7`

**Step 3: Install next-themes**

```bash
npm install next-themes
```

Expected: next-themes added to `package.json` dependencies

---

### Task 2: Configure dark mode CSS

**Files:**
- Modify: `app/globals.css`

**Step 1: Add `@custom-variant dark` and `.dark` CSS variable overrides**

At the very top of `globals.css` (before `@import "tailwindcss"`), add:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Then inside the existing `@layer base { }` block (after the `:root { }` block), add:

```css
  .dark {
    --background: oklch(0.10 0 0);
    --foreground: oklch(0.96 0 0);

    --card: oklch(0.13 0 0);
    --card-foreground: oklch(0.96 0 0);

    --popover: oklch(0.13 0 0);
    --popover-foreground: oklch(0.96 0 0);

    --primary: oklch(0.65 0.15 250);
    --primary-foreground: oklch(0.10 0 0);

    --secondary: oklch(0.60 0.22 25);
    --secondary-foreground: oklch(0.10 0 0);

    --accent: oklch(0.72 0.15 45);
    --accent-foreground: oklch(0.10 0 0);

    --destructive: oklch(0.60 0.22 25);
    --destructive-foreground: oklch(0.10 0 0);

    --muted: oklch(0.18 0 0);
    --muted-foreground: oklch(0.62 0 0);

    --border: oklch(0.25 0 0);
    --input: oklch(0.25 0 0);
    --ring: oklch(0.65 0.15 250);
  }
```

**Step 2: Build to verify no CSS errors**

```bash
npm run build
```

Expected: Build succeeds, no errors.

---

### Task 3: Wrap app in ThemeProvider

**Files:**
- Create: `components/theme-provider.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create the ThemeProvider component**

Create `components/theme-provider.tsx`:

```tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}
```

**Step 2: Update layout.tsx**

In `app/layout.tsx`:
- Add `import { ThemeProvider } from '@/components/theme-provider'` at the top
- Add `suppressHydrationWarning` to the `<html>` tag
- Wrap `{children}` (and its surrounding `<Script>` tags) with `<ThemeProvider>`

The body should look like:

```tsx
<html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
  <head>
    {/* existing ld+json script unchanged */}
  </head>
  <body className="font-sans antialiased">
    <ThemeProvider>
      {children}
    </ThemeProvider>
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-4BW7GGLKBX" strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">
      {`...`}
    </Script>
  </body>
</html>
```

**Step 3: Build to verify no errors**

```bash
npm run build
```

Expected: Build succeeds.

---

### Task 4: Create ThemeToggle component

**Files:**
- Create: `components/theme-toggle.tsx`

**Step 1: Create the component**

Create `components/theme-toggle.tsx`:

```tsx
'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Render sun by default (dark mode = click to go light)
  // avoids layout shift before mount
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}
```

**Step 2: Build to verify**

```bash
npm run build
```

Expected: Build succeeds.

---

### Task 5: Create PhoneFrame and AppScreenshot components

**Files:**
- Create: `components/phone-frame.tsx`
- Create: `components/app-screenshot.tsx`

**Step 1: Create PhoneFrame**

Create `components/phone-frame.tsx`:

```tsx
import { cn } from '@/lib/utils'

export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative rounded-[2.5rem] border-2 border-border bg-card overflow-hidden shadow-2xl',
        className
      )}
    >
      {/* Top notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-1.5 rounded-full bg-border z-10" />
      {children}
    </div>
  )
}
```

**Step 2: Create AppScreenshot**

Create `components/app-screenshot.tsx`:

```tsx
'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function AppScreenshot({
  dark,
  light,
  alt,
  className,
}: {
  dark: string
  light?: string
  alt: string
  className?: string
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Before mount: show dark (matches defaultTheme="dark")
  const src = mounted && resolvedTheme === 'light' && light ? light : dark

  return (
    <Image
      src={src}
      alt={alt}
      width={1080}
      height={2340}
      className={cn('w-full h-full object-cover', className)}
    />
  )
}
```

Wait — `cn` is not imported above. Fix: add `import { cn } from '@/lib/utils'`.

**Step 3: Build to verify**

```bash
npm run build
```

Expected: Build succeeds.

---

### Task 6: Add ThemeToggle to header

**Files:**
- Modify: `app/page.tsx`

**Step 1: Add import**

At the top of `app/page.tsx`, add:

```tsx
import { ThemeToggle } from '@/components/theme-toggle'
```

**Step 2: Update the header**

Find the `<header>` element. Currently the flex row contains the logo/brand link and the tagline span. Add `<ThemeToggle />` as the rightmost item:

```tsx
<header className="border-b border-border/70">
  <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between gap-4">
    <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
      <img src="/logo.png" alt="YesCoach logo" className="h-5 w-auto" />
      <span className="text-lg font-semibold tracking-tight">YesCoach</span>
    </Link>
    <span className="hidden sm:inline text-sm text-muted-foreground">
      Biomechanics-based strength training
    </span>
    <ThemeToggle />
  </div>
</header>
```

**Step 3: Build and visual check**

```bash
npm run build && npm run dev
```

Open `http://localhost:3000`. Confirm:
- Toggle button visible in header (sun icon in dark mode)
- Clicking it switches to light mode (moon icon appears, background goes white)
- Clicking again returns to dark mode
- Preference persists on page refresh

---

### Task 7: Update hero section with phone mockups

**Files:**
- Modify: `app/page.tsx`

**Step 1: Add imports**

Add to the import block at the top of `app/page.tsx`:

```tsx
import { PhoneFrame } from '@/components/phone-frame'
import { AppScreenshot } from '@/components/app-screenshot'
```

**Step 2: Replace the hero section**

Replace the entire `{/* Hero Section */}` section (lines ~25–61) with:

```tsx
{/* Hero Section */}
<section className="py-20 lg:py-28">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

      {/* Text */}
      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0 }}
          className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
        >
          See what your training is doing.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-xl text-muted-foreground space-y-1"
        >
          <p>You put in the work.</p>
          <p>But are the right muscles working?</p>
          <p>Are you recovered enough to push today?</p>
          <p>Is your training balanced over time?</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-base text-muted-foreground leading-relaxed"
        >
          YesCoach helps make the invisible visible. Through biomechanical modeling and visual feedback,
          it shows muscle activation, recovery, and training patterns — grounded in proven science and
          how the body actually works.
        </motion.p>
      </div>

      {/* Phone mockups */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative h-[480px] flex items-center justify-center lg:justify-end"
      >
        {/* Back phone — behind, rotated */}
        <div className="absolute left-4 lg:left-0 top-4 rotate-[-7deg] opacity-60 w-[190px] z-0">
          <PhoneFrame>
            <AppScreenshot
              dark="/screenshots/dark/home-back.jpg"
              light="/screenshots/light/home-back.jpg"
              alt="YesCoach app back view"
            />
          </PhoneFrame>
        </div>

        {/* Front phone — in front, slight counter-rotation */}
        <div className="relative rotate-[2deg] w-[210px] ml-24 lg:ml-32 z-10">
          <PhoneFrame>
            <AppScreenshot
              dark="/screenshots/dark/home-front.jpg"
              light="/screenshots/light/home-front.jpg"
              alt="YesCoach app home screen"
            />
          </PhoneFrame>
        </div>
      </motion.div>

    </div>
  </div>
</section>
```

**Step 3: Build and visual check**

```bash
npm run build && npm run dev
```

Confirm hero shows two phones side by side with the headline. Both phones swap correctly on theme toggle.

---

### Task 8: Redesign feature section as alternating split rows

**Files:**
- Modify: `app/page.tsx`

**Step 1: Replace the features section**

Remove the `{/* Features */}` section entirely and replace with:

```tsx
{/* Features */}
<section className="py-24 border-t border-border">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: false }}
      className="text-3xl lg:text-4xl font-bold mb-20 text-foreground"
    >
      What you get
    </motion.h2>

    <div className="space-y-24">

      {/* Row 1: text left, screenshot right */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: false }}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-primary">Muscle activation you can see</h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Select an exercise and see which muscles are involved — and how much. Activation is based on joint mechanics and movement, not generic labels.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="w-[210px]">
            <PhoneFrame>
              <AppScreenshot
                dark="/screenshots/dark/set-logging.jpg"
                light="/screenshots/light/set-logging.jpg"
                alt="Set logging with muscle activation"
              />
            </PhoneFrame>
          </div>
        </div>
      </motion.div>

      {/* Row 2: screenshot left, text right */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: false }}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="flex justify-center lg:justify-start lg:order-1 order-2">
          <div className="w-[210px]">
            <PhoneFrame>
              <AppScreenshot
                dark="/screenshots/dark/day-summary.jpg"
                alt="Day summary with recovery status"
              />
            </PhoneFrame>
          </div>
        </div>
        <div className="space-y-4 lg:order-2 order-1">
          <h3 className="text-2xl font-bold text-primary">Recovery you can understand</h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            See which muscle groups are fresh and which are still recovering. Plan sessions based on readiness, not just a calendar.
          </p>
        </div>
      </motion.div>

      {/* Row 3: text left, screenshot right */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: false }}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-primary">Patterns over time</h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Watch how your training accumulates. Notice imbalances early. Connect decisions to outcomes.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="w-[210px]">
            <PhoneFrame>
              <AppScreenshot
                dark="/screenshots/dark/calendar-track.jpg"
                light="/screenshots/light/calendar-track.jpg"
                alt="Calendar training tracker"
              />
            </PhoneFrame>
          </div>
        </div>
      </motion.div>

      {/* Row 4: screenshot left, text right */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: false }}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="flex justify-center lg:justify-start lg:order-1 order-2">
          <div className="w-[210px]">
            <PhoneFrame>
              <AppScreenshot
                dark="/screenshots/dark/week-summary.jpg"
                alt="Weekly summary with premium insights"
              />
            </PhoneFrame>
          </div>
        </div>
        <div className="space-y-4 lg:order-2 order-1">
          <h3 className="text-2xl font-bold text-primary">Intelligence that adapts</h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Your training history matters. Strength in one movement informs others. Suggestions evolve as your patterns evolve.
          </p>
        </div>
      </motion.div>

    </div>
  </div>
</section>
```

**Step 2: Build and visual check**

```bash
npm run build && npm run dev
```

Confirm: 4 feature rows, alternating layout, screenshots visible, theme swaps images correctly.

---

### Task 9: Add monthly insights showcase strip

**Files:**
- Modify: `app/page.tsx`

**Step 1: Insert the section**

Insert this new section between the Features section and the Promise section:

```tsx
{/* Monthly Insights */}
<section className="py-24 border-t border-border">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: false }}
      className="text-3xl lg:text-4xl font-bold mb-4 text-foreground"
    >
      More of what's inside
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      viewport={{ once: false }}
      className="text-muted-foreground mb-12 text-lg"
    >
      Monthly breakdowns, balance charts, and the details that make training clearer.
    </motion.p>

    <div className="flex gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible snap-x snap-mandatory lg:snap-none">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0 }}
        viewport={{ once: false }}
        className="flex-shrink-0 snap-start w-[185px] lg:w-auto"
      >
        <PhoneFrame>
          <AppScreenshot
            dark="/screenshots/dark/month-pf.jpg"
            light="/screenshots/light/month-pf.jpg"
            alt="Monthly performance summary"
          />
        </PhoneFrame>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        viewport={{ once: false }}
        className="flex-shrink-0 snap-start w-[185px] lg:w-auto"
      >
        <PhoneFrame>
          <AppScreenshot
            dark="/screenshots/dark/month-balance.jpg"
            light="/screenshots/light/month-balance.jpg"
            alt="Monthly muscle balance chart"
          />
        </PhoneFrame>
      </motion.div>

      {/* Light-mode-only graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        viewport={{ once: false }}
        className="dark:hidden flex-shrink-0 snap-start w-[185px] lg:w-auto"
      >
        <PhoneFrame>
          <AppScreenshot
            dark="/screenshots/light/month-graph.jpg"
            alt="Monthly performance graph"
          />
        </PhoneFrame>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        viewport={{ once: false }}
        className="flex-shrink-0 snap-start w-[185px] lg:w-auto"
      >
        <PhoneFrame>
          <AppScreenshot
            dark="/screenshots/dark/general.jpg"
            alt="YesCoach app overview"
          />
        </PhoneFrame>
      </motion.div>

    </div>
  </div>
</section>
```

**Step 2: Build and visual check**

```bash
npm run build && npm run dev
```

Confirm: 4 screenshots displayed in a grid on desktop, horizontal scroll on mobile. In dark mode: 3 images visible (month-graph hidden). In light mode: all 4 visible. Images swap on theme toggle.

---

### Task 10: Final build verification and cleanup

**Files:**
- No new files

**Step 1: Full build**

```bash
npm run build
```

Expected: Build completes with 0 TypeScript errors, 0 ESLint errors.

**Step 2: Visual walkthrough in dev**

```bash
npm run dev
```

Check each section manually:
- [ ] Header: theme toggle visible, clicking switches theme, logo still left-aligned
- [ ] Hero: two phones visible, both swap on theme toggle, text readable in both modes
- [ ] Features: 4 alternating rows, screenshots visible, `set-logging` and `calendar-track` swap, `day-summary` and `week-summary` always show dark app screenshot
- [ ] Monthly strip: horizontal scroll on mobile (narrow window), 4-col grid on desktop, `month-graph` appears/disappears on theme toggle
- [ ] Promise, Email, Footer: unchanged and readable in both themes

**Step 3: Commit**

```bash
git add \
  public/screenshots/ \
  components/theme-provider.tsx \
  components/theme-toggle.tsx \
  components/phone-frame.tsx \
  components/app-screenshot.tsx \
  app/page.tsx \
  app/layout.tsx \
  app/globals.css \
  package.json \
  package-lock.json \
  docs/plans/

git commit -m "feat: add app screenshots, phone mockups, and dark/light theme toggle"
```
