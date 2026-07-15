# YesCoach-Website — voice & content rules

Read this before writing or editing any user-facing prose in this repo (blog posts,
landing pages, FAQ, meta descriptions, CTA copy). It applies to every subagent
working here — copy critics, implementers, design agents.

The rules exist because the founder has course-corrected them into place across
multiple review cycles. Break them and you'll waste a round.

## What YesCoach is (one line)

A biomechanical body-model that turns each logged set into a per-muscle recruitment
map. Free Android app, local storage, no account.

## Voice — the non-negotiables

### 1. Free stands on its own
`Free` is the strongest word on the site. Do **not** dress it up.

- ❌ "Every feature, forever. No ads, no paywall, no time limit."
- ❌ "Free · The engine isn't gated · No hidden tiers"
- ✅ "Free."
- ✅ "Free. Runs on your phone. No account."

If you're stacking qualifiers behind `Free`, you're weakening it.

### 2. No negation triples
Every "not X" or "no Y, no Z" pattern reads as insecurity. Cut them.

- ❌ "Per-muscle dose derived from joint torque — not category tags."
- ❌ "A picture, not a list."
- ❌ "No ads, no paywall, no time limit."
- ❌ "Not uploaded, not sold, not shared."
- ✅ "Per-muscle dose derived from joint torque."
- ✅ "A color-coded body map. Tap any muscle to see the exercises that worked it."
- ✅ "Every feature."
- ✅ "On your device."

Positive phrasing where the negation carried a fact. Deletion where it was decoration.

### 3. Focus on what YesCoach does — never what other apps don't
No contrast framing. The uniqueness is real; it doesn't need a foil.

- ❌ "Unlike other apps that tag exercises to muscles, YesCoach…"
- ❌ "Most trackers just count sets."
- ❌ "Typical apps use static labels."
- ✅ "YesCoach computes per-muscle dose from joint torque, moment arms, and RIR."

One-sentence contrast is fine when the framing is "we do *more than* X"
(e.g. "Tracks session-level muscle stress across every logged workout" implicitly
adds beyond just workout counting). Never a paragraph.

### 4. Cut adverbs and softeners
Delete these when they aren't carrying a fact:

- `-ly` softeners: really, actually, quickly, easily, simply, literally, clearly, obviously, completely, currently, essentially, effectively, powerfully, seamlessly, effortlessly
- Fillers: just, only, quite, very, really, sort of, kind of, super, pretty, a bit
- Empty intensifiers: powerful, unique, amazing, revolutionary, seamless, effortless, next-gen, cutting-edge

Keep `-ly` adverbs that carry technical meaning: horizontally, vertically, anatomically, biomechanically, primarily.

### 5. Scientific over colloquial
When precision helps, use anatomical / biomechanical vocabulary. It reads as
credible and captures search intent.

- ✅ "pectoralis major (shoulder horizontal adduction)"
- ✅ "anterior deltoid (shoulder flexion)"
- ✅ "triceps brachii (elbow extension)"
- ✅ "joint torque, moment arms, RIR (reps in reserve)"
- ✅ "horizontal push," "hinge," "vertical pull" (pattern classifications)
- ❌ "muscle stuff," "the shoulder area," "how hard your body worked"

The scientific tone is a moat and a differentiator. Use it, don't hedge it.

### 6. Every sentence earns its keep
If deleting a sentence doesn't lose a fact or an emotion, delete it.
Blog posts run 100–200 words. Home page sections stay tight. Media
carries meaning; prose supports.

## Forbidden mentions

These have been explicitly ruled out. Do not reintroduce them:

- **Paid tier, coaching, premium, subscription, "coming soon"** — the marketing
  surface is free-only. (Terms §6 keeps a generic future-features clause for
  legal flexibility — that's the only exception.)
- **"Built by one engineer," "side project," "solo built"** — humble framing
  belongs on the founder's resume, not the marketing surface.
- **"Beta," "v0.01," "MVP," "early access"** — signals unfinished. Say
  "on Google Play" instead.
- **"Awareness layer"** — old framing, dropped when the paid tier was cut.

## Trust triad

The three words that repeat across the site — header, hero pill, dedicated
section, FAQ:

**Free · Local · Private**

Use verbatim. This is the brand's short-form pitch. Deviations dilute it.

## Structural rules

- **CTA density**: every scroll-length of the home page should have a
  Download button in view. Current touch points: header pill, hero card,
  mid-page after Features, in the Free·Local·Private section.
- **Section rhythm**: hero → credibility (From First Principles) → proof
  (Features with screenshots) → depth (Monthly Insights) → conversion
  (Free·Local·Private + FAQ). Don't stack two feature sections in a row
  without a CTA between them.
- **Motion**: `viewport={{ once: true }}` always. `once: false` re-fires
  animations on scroll-back and reads as "still loading."
- **Screenshot fatigue**: cap 5–6 phone mockups per page. If a text block
  can stand on its own, cut the mockup.
- **Tap targets**: every interactive element ≥ 44px height. Use `px-2 py-2`
  on inline nav links.

## When you're editing prose

1. Read this file first.
2. Grep the file you're touching for the forbidden patterns above.
3. Draft the edit. Read it aloud. If any sentence sounds like marketing, cut a word.
4. If unsure whether a claim is honest: cut it or ask.

## When you're generating a new page

- Give it a scientific-tone H2 that captures search intent (e.g. "What muscles
  does the bench press work?") — high-intent, indexable.
- Use anatomical names in body copy for SEO.
- Include a `canonical`, OpenGraph image, Twitter card, and Article JSON-LD
  in `page.tsx` (see `app/blog/reading-your-body-honestly/page.tsx` for the
  pattern).
- Every page ends with a Download CTA card.

## History of this doc

Written after a 3-round review cycle where the founder pushed back on
paid-tier mentions, "one engineer" framing, negation triples, adverb bloat,
and dressed-up variants of `Free`. The rules above are what survived.
Update this doc when a new rule earns its place; don't add speculative rules.
