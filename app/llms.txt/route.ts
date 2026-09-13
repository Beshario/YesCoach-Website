export const dynamic = 'force-static'

/**
 * llms.txt — a curated index for LLM crawlers and answer engines.
 *
 * Anthropic (Claude) and Perplexity fetch this file to decide which pages to
 * read. Google does not support the spec. Keep it short: a one-line product
 * description plus one line per page saying what question that page answers.
 *
 * Update this whenever a page is added or removed. It is hand-maintained on
 * purpose; an auto-generated dump of every route defeats the point.
 */
const content = `# YesCoach

> Free Android strength training and mobility app. Log a lift and watch a live muscle-recruitment map fill in set by set. Ships ten preset programs: three beginner training splits (gym, dumbbells, bodyweight) and seven daily mobility protocols (lower back, hips, desk posture, pelvic tilt, shoulders, knees, ankles).

YesCoach computes which muscles a given exercise recruits from joint torque and moment arms, then accumulates that dose per muscle across a session. The result is a heatmap showing what a workout actually trained, not what it was labelled.

## Pages

- [Home](https://yescoach.fit/): what the app does, how the recruitment map works, and where to download it.
- [Strength training recovery app](https://yescoach.fit/strength-training-recovery-app): how YesCoach measures muscle load, tracks recovery state, and surfaces training patterns over time.
- [Blog](https://yescoach.fit/blog): index of all posts.
- [How to start strength training at home](https://yescoach.fit/blog/programs-and-protocols): the three beginner programs and seven mobility protocols, with the minimum-effective-dose evidence behind each.
- [Watch a lift light up](https://yescoach.fit/blog/watch-a-lift-light-up): how one bench press set distributes joint torque across pectoralis major, anterior deltoid, and triceps brachii.

## App

- Platform: Android 8.0 or later
- Price: free
- Download: https://play.google.com/store/apps/details?id=com.yescoach.fit
- Walkthrough video (2 min): https://youtube.com/shorts/ipL9OOfEQv4

## Legal

- [Privacy policy](https://yescoach.fit/privacy)
- [Terms and conditions](https://yescoach.fit/terms)
`

export function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
