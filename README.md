# YesCoach Website

Marketing site for the YesCoach app. Next.js (App Router, static export) deployed to
**Cloudflare Pages** with `main` as the production branch.

## Stack

- Next.js 16 (App Router, `output: 'export'`)
- Tailwind + DaisyUI-style tokens via shadcn/ui
- Framer Motion for hero animation
- Hosted on Cloudflare Pages; DNS via Cloudflare (registrar: Namecheap)

## Local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # emits ./out/ for the static export
```

## Routes

- `/` — landing (`app/page.tsx`)
- `/privacy` — privacy policy (`app/privacy/page.tsx`)
- `/terms` — terms & conditions (`app/terms/page.tsx`)
- `/strength-training-recovery-app` — SEO landing (`app/strength-training-recovery-app/page.tsx`)
- `/robots.txt`, `/sitemap.xml` — generated from `app/robots.ts` and `app/sitemap.ts`

## Conventions

- Production branch is `main`. No PR workflow on this repo — commit directly.
- Domain: **yescoach.fit** (was Netlify on .app; migrated June 2026).
