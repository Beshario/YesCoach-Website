/**
 * Builds the /ai prompt from the visitor's choices.
 *
 * The copied prompt is self-contained: format rules, an example, and the
 * exercise id parts (lib/exerciseCatalog.json grouped by pattern, filtered by
 * the choices) travel in the prompt, so the AI never has to open a link or ask
 * a question. The full id list stays at /ai/yescoach-format.txt for an AI that
 * can read it; a pairing the parts allow but the app lacks is swapped on
 * import. Choices the visitor leaves open are not defaulted here; the AI picks.
 */

import catalog from './exerciseCatalog.json'

export type Mode = 'workout' | 'program'
export type Kind = 'strength' | 'mobility'

export interface Choices {
  mode: Mode
  kind?: Kind
  focus?: string
  minutes?: string
  where?: string
  level?: string
  warmup?: 'yes' | 'no'
  supersets?: 'yes' | 'no'
  days?: string
}

export interface Option {
  value: string
  label: string
  /** Label in the summary line when `label` alone reads ambiguously there. */
  short?: string
}

export interface ChoiceGroup {
  key: keyof Choices
  label: string
  /** Core groups show by default; 'more' sit behind More options. */
  tier: 'core' | 'more'
  options: Option[]
  /** Shown only when this returns true. */
  when?: (c: Choices) => boolean
}

const strength = (c: Choices) => c.kind !== 'mobility'

export const GROUPS: ChoiceGroup[] = [
  {
    key: 'days',
    tier: 'core',
    label: 'Days per week',
    when: (c) => c.mode === 'program',
    options: ['2', '3', '4', '5', '6'].map((d) => ({ value: d, label: d, short: `${d} days/week` })),
  },
  {
    key: 'kind',
    tier: 'core',
    label: 'Type',
    options: [
      { value: 'strength', label: 'Strength' },
      { value: 'mobility', label: 'Mobility' },
    ],
  },
  {
    key: 'focus',
    tier: 'core',
    label: 'Focus',
    when: strength,
    options: [
      { value: 'Push (chest, shoulders, triceps)', label: 'Push' },
      { value: 'Pull (back, biceps)', label: 'Pull' },
      { value: 'Legs', label: 'Legs' },
      { value: 'Upper body', label: 'Upper' },
      { value: 'Lower body', label: 'Lower' },
      { value: 'Full body', label: 'Full body' },
    ],
  },
  {
    key: 'focus',
    tier: 'core',
    label: 'Focus',
    when: (c) => c.kind === 'mobility',
    options: [
      { value: 'Lower back', label: 'Lower back' },
      { value: 'Hips', label: 'Hips' },
      { value: 'Shoulders', label: 'Shoulders' },
      { value: 'Desk posture', label: 'Desk posture' },
      { value: 'Knees and ankles', label: 'Knees & ankles' },
      { value: 'Full body', label: 'Full body' },
    ],
  },
  {
    key: 'minutes',
    tier: 'core',
    label: 'Time',
    options: ['15', '30', '45', '60', '75'].map((m) => ({ value: m, label: `${m} min` })),
  },
  {
    key: 'where',
    tier: 'core',
    label: 'Where',
    when: strength,
    options: [
      { value: 'Gym, full equipment', label: 'Gym' },
      { value: 'Home, dumbbells only', label: 'Home, dumbbells' },
      { value: 'Home, no equipment', label: 'Home, no equipment' },
    ],
  },
  {
    key: 'level',
    tier: 'more',
    label: 'Level',
    options: [
      { value: 'Beginner', label: 'Beginner' },
      { value: 'Intermediate', label: 'Intermediate' },
      { value: 'Advanced', label: 'Advanced' },
    ],
  },
  {
    key: 'warmup',
    tier: 'more',
    label: 'Warm-up',
    when: strength,
    options: [
      { value: 'yes', label: 'Include', short: 'With warm-up' },
      { value: 'no', label: 'Skip', short: 'No warm-up' },
    ],
  },
  {
    key: 'supersets',
    tier: 'more',
    label: 'Supersets',
    when: strength,
    options: [
      { value: 'yes', label: 'Use them', short: 'With supersets' },
      { value: 'no', label: 'None', short: 'No supersets' },
    ],
  },
]

export function visibleGroups(c: Choices): ChoiceGroup[] {
  return GROUPS.filter((g) => !g.when || g.when(c))
}

/** Clears answers that no longer apply, e.g. a strength focus after switching to mobility. */
export function pruneChoices(c: Choices): Choices {
  const next: Choices = { mode: c.mode }
  for (const group of visibleGroups(c)) {
    const value = c[group.key]
    if (value !== undefined && group.options.some((o) => o.value === value)) {
      ;(next as unknown as Record<string, string>)[group.key] = value as string
    }
  }
  return next
}

interface CatalogEntry {
  id: string
  name: string
  kind: 'strength' | 'mobility'
}

/** Implements a home setup can use, by `where` choice. Absent = every implement. */
const HOME_IMPLEMENTS: Record<string, string[]> = {
  'Home, dumbbells only': ['bodyweight', 'dumbbell'],
  'Home, no equipment': ['bodyweight'],
}

/** The exercises this prompt offers: only what the visitor's choices allow. */
export function exercisesFor(c: Choices): CatalogEntry[] {
  const all = catalog as CatalogEntry[]
  if (c.kind === 'mobility') return all.filter((e) => e.kind === 'mobility')
  const implementsAllowed = c.where ? HOME_IMPLEMENTS[c.where] : undefined
  return all.filter((e) => {
    if (e.kind === 'mobility') return c.warmup !== 'no'
    return !implementsAllowed || implementsAllowed.includes(e.id.split(':')[2])
  })
}

/**
 * The exercises as id parts, one line per pattern: strength
 * "pattern: variants | implements" (plus a non-default apparatus), mobility
 * "pattern: variants".
 */
function partsFor(c: Choices): { strength: string[]; mobility: string[] } {
  const patterns = new Map<string, { kind: CatalogEntry['kind']; parts: [Set<string>, Set<string>, Set<string>] }>()
  for (const e of exercisesFor(c)) {
    const [pattern, ...rest] = e.id.split(':')
    const entry = patterns.get(pattern) ?? { kind: e.kind, parts: [new Set(), new Set(), new Set()] }
    rest.forEach((part, i) => entry.parts[i].add(part))
    patterns.set(pattern, entry)
  }
  const strength: string[] = []
  const mobility: string[] = []
  for (const [pattern, { kind, parts: [variants, implementsUsed, apparatus] }] of patterns) {
    const join = (set: Set<string>) => [...set].join(', ')
    if (kind === 'mobility') {
      mobility.push(`${pattern}: ${join(variants)}`)
    } else {
      const special = [...apparatus].filter((a) => a !== 'none')
      strength.push(`${pattern}: ${join(variants)} | ${join(implementsUsed)}${special.length ? ` | apparatus ${special.join(', ')}` : ''}`)
    }
  }
  return { strength, mobility }
}

const FULL_LIST_URL = 'https://yescoach.fit/ai/yescoach-format.txt'

const FORMAT_RULES = `FORMAT (YesCoach program format 1.2). The app rejects the whole reply if any rule is broken.
{
  "version": "1.2",
  "type": "yescoach_program",
  "program": {
    "name": "Push Day",
    "category": "training",
    "days": [
      {
        "name": "Push",
        "exercises": [
          { "exerciseId": "shoulder-circles:standard:bodyweight:none", "exerciseName": "Shoulder Circles", "sets": 1, "reps": "10", "suggestedRIR": 5, "section": "warmup" },
          { "exerciseId": "bench_press:flat:dumbbell:none", "exerciseName": "Dumbbell Flat Bench Press", "sets": 3, "reps": "8-10", "suggestedRIR": 2, "restSec": 120 },
          { "exerciseId": "shoulder_abduction:standard:dumbbell:none", "exerciseName": "Dumbbell Lateral Raise", "sets": 3, "reps": "12-15", "suggestedRIR": 1, "groupId": "A" },
          { "exerciseId": "elbow_extension:overhead:dumbbell:none", "exerciseName": "Dumbbell Overhead Extension", "sets": 3, "reps": "10-12", "suggestedRIR": 1, "groupId": "A" }
        ],
        "groups": [ { "id": "A", "type": "superset", "rounds": 3, "restBetweenSec": 15, "restAfterSec": 90 } ]
      }
    ]
  }
}
Rules:
- exerciseId: "pattern:variant:implement:apparatus", every part taken from one line of EXERCISE PARTS below. Apparatus is "none" unless the line names one. Mobility moves use implement "bodyweight". Never invent a pattern; a variant and implement the app lacks together is swapped for the closest match.
- exerciseName: a short plain name, e.g. "Incline Dumbbell Bench Press".
- category: "training" for strength, "protocol" for mobility.
- sets: whole number 1-20. suggestedRIR: whole number 0-10 (reps left in reserve; 5 for warm-up and mobility moves).
- reps: only "8", "8-10", "30s", "30-60s", "10/side", "8-10/leg" or "30s/side". Seconds for holds and stretches. Never words like AMRAP.
- restSec (optional): seconds of rest after each set. Not on group members.
- section (optional): "warmup", "power", "accessories" or "cooldown". Leave it out for main work. Never on a group member (put it on the group).
- groups (optional, supersets and circuits): each group {"id","type":"superset" or "circuit","rounds","restBetweenSec","restAfterSec"}; members carry "groupId", sit next to each other in the list, number at least 2, and their sets equal the group's rounds. Leave "groups" out when there are none.
- No comments, no trailing commas.
Before you reply, check every rule above, especially that each exerciseId is built from the parts.`

export interface BuiltPrompt {
  text: string
  exerciseCount: number
}

export function buildPrompt(c: Choices): BuiltPrompt {
  const program = c.mode === 'program'
  const head: string[] = []

  head.push(
    program
      ? 'Write me a workout program in the YesCoach format below, ready to import into the YesCoach app.'
      : 'Write me one workout in the YesCoach format below, ready to paste into the YesCoach app.',
    'Do not ask me any questions. Where I have not said something, choose what suits me and write it now.',
  )

  const about: string[] = []
  if (c.kind) about.push(`- Type: ${c.kind === 'mobility' ? 'Mobility routine' : 'Strength training'}`)
  if (c.focus) about.push(`- Focus: ${c.focus}`)
  if (c.days) about.push(`- Days per week: ${c.days}`)
  if (c.minutes) about.push(`- Session length: ${c.minutes} minutes`)
  if (c.where) about.push(`- Equipment: ${c.where}`)
  if (c.level) about.push(`- Experience: ${c.level}`)
  if (c.warmup === 'yes') about.push('- Start with a short warm-up section')
  if (c.warmup === 'no') about.push('- No warm-up section')
  if (c.supersets === 'yes') about.push('- Use supersets where they save time')
  if (c.supersets === 'no') about.push('- No supersets or circuits')
  if (about.length) head.push('', 'About me:', ...about)

  head.push(
    '',
    program
      ? 'Write one entry in "days" per session, in order. Reply with the program as one ```json code block (or a downloadable .json file), then one line on how it is split. Nothing else.'
      : 'Write exactly one entry in "days". Reply with the workout as one ```json code block, then one short line on what it trains. Nothing else.',
    '',
    FORMAT_RULES,
    '',
  )

  const parts = partsFor(c)
  head.push(
    `The exact id of every exercise is listed at ${FULL_LIST_URL}. If you can open it, copy exact ids from there that match the parts below. If you cannot, build them from the parts. Do not ask me for it.`,
    '',
    'EXERCISE PARTS. Use only these.',
    ...(parts.strength.length ? ['STRENGTH (pattern: variants | implements):', ...parts.strength] : []),
    ...(parts.mobility.length ? ['MOBILITY (pattern: variants):', ...parts.mobility] : []),
  )
  return { text: head.join('\n'), exerciseCount: exercisesFor(c).length }
}

export function answeredCount(c: Choices): number {
  return visibleGroups(c).filter((g) => c[g.key] !== undefined).length
}

/** What is set, one item per answered group, e.g. ["Strength", "Push", "45 min", "Gym"]. */
export function summary(c: Choices): string[] {
  return visibleGroups(c)
    .map((g) => g.options.find((o) => o.value === c[g.key]))
    .filter((o): o is Option => o !== undefined)
    .map((o) => o.short ?? o.label)
}
