# Screenshots + Theme Toggle Design

**Date:** 2026-02-24
**Status:** Approved

## Goal

Incorporate 9 real Android app screenshots into the landing page beautifully, alongside a dark/light theme toggle. Default to dark mode. Screenshots swap between dark/light app variants based on current theme.

---

## Image Organization

All images move from `Assets/` into `public/screenshots/dark/` and `public/screenshots/light/` with clean, consistent names.

| Clean name | Dark source | Light source |
|---|---|---|
| `home-front.jpg` | `RealTimeHomePage.jpg` | `light/front.jpg` |
| `home-back.jpg` | `RealTimeHomePageback.jpg` | `light/back.jpg` |
| `set-logging.jpg` | `SetLogging.jpg` | `light/logsetting.jpg` |
| `calendar-track.jpg` | `CalendarTrack.jpg` | `light/trackCalendar.jpg` |
| `month-pf.jpg` | `MontSummaryPF.jpg` | `light/monthSumamrtPF.jpg` |
| `month-balance.jpg` | `MonthSummaryPFBalance.jpg` | `light/monthSumamryPFBalanceChart.jpg` |
| `month-graph.jpg` | *(light only)* | `light/monthsummary1ermgrasphPF.jpg` |
| `day-summary.jpg` | `daySummary.jpg` | *(dark only — shown in both modes)* |
| `week-summary.jpg` | `WeekSummarypremiumFeat.jpg` | *(dark only — shown in both modes)* |
| `general.jpg` | `Screenshot_20260224_060701_YesCoach.jpg` | *(dark only — shown in both modes)* |

---

## Theme System

- **Package:** `next-themes`
- **Default theme:** dark
- **Mechanism:** `next-themes` adds a `dark` class to `<html>` and persists to localStorage
- **CSS:** Add `.dark` class overrides to `globals.css` with deep dark background/foreground values
- **Toggle:** Sun/moon icon button in the header (right side of nav)

---

## Page Structure

### Header (updated)
Add a `ThemeToggle` component (sun/moon icon button) on the right side of the header nav.

### Hero (updated)
Two-column layout on large screens:
- Left: existing headline + subtext (unchanged copy)
- Right: stacked phone mockups — `home-back.jpg` behind at slight rotation/offset, `home-front.jpg` in front in a CSS phone frame
- Both images swap with theme
- Mobile: phone mockup stacks below text

### Feature section (redesigned)
Replace the 4 gradient cards with 4 alternating full-width split rows. Each row: text one side, phone screenshot the other, alternating left/right.

| # | Text side | Screenshot | Modes |
|---|---|---|---|
| 1 | Left | `set-logging` | Both |
| 2 | Right | `day-summary` | Dark image in both modes |
| 3 | Left | `calendar-track` | Both |
| 4 | Right | `week-summary` | Dark image in both modes |

### Monthly insights strip (new section)
Between features and the Promise section. Title: "More of what's inside."

- Desktop: 3–4 column grid
- Mobile: horizontal scroll
- Shows: `month-pf`, `month-balance`, `month-graph` (light mode only, not rendered in dark), `general`
- Each in a CSS phone frame

### Unchanged
- Promise/quote section
- Email signup section
- Footer

---

## Components

### `AppScreenshot`
```
props: {
  dark: string          // path to dark image
  light?: string        // path to light image (optional)
  alt: string
  className?: string
}
```
Uses `useTheme()` from `next-themes`. Shows dark image in dark mode, light image in light mode. If `light` not provided, always shows dark image. No silent fallbacks — if a light image path is provided but wrong, it fails visibly.

### `ThemeToggle`
Icon button using a sun icon (light mode) / moon icon (dark mode). Uses `useTheme()`.

### `PhoneFrame`
CSS wrapper that renders a minimal phone bezel around a screenshot. Styled to match current theme border colors.

---

## CSS Dark Mode Values

Add to `globals.css` under `.dark`:
- `--background`: near black (`oklch(0.10 0 0)`)
- `--foreground`: near white (`oklch(0.96 0 0)`)
- `--card`: slightly lighter than background
- `--muted-foreground`: mid gray
- `--border`: subtle dark border
- Primary/secondary/accent hues remain the same, adjusted lightness for dark contrast

---

## Technical notes

- `next-themes` requires wrapping the app in `<ThemeProvider>` in `layout.tsx`
- `ThemeToggle` and `AppScreenshot` must be client components (`'use client'`)
- Images served from `public/screenshots/` — no import needed, just paths
- `next/image` used for all screenshots (width/height from known 1080×2340 dimensions)
- `suppressHydrationWarning` on `<html>` tag (required by next-themes)
