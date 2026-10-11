/**
 * Builds the /ai prompt from the visitor's choices.
 *
 * Nothing is assumed: an unanswered choice is never filled with a default. The
 * core ones (focus, length, where, level) are instead listed for the AI to ask
 * about, and the optional ones (warm-up, supersets) are left to the AI.
 */

export const SPEC_URL = 'https://yescoach.fit/ai/yescoach-format.txt'

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
}

export interface ChoiceGroup {
  key: keyof Choices
  label: string
  options: Option[]
  /** Shown only when this returns true. */
  when?: (c: Choices) => boolean
}

const strength = (c: Choices) => c.kind !== 'mobility'

export const GROUPS: ChoiceGroup[] = [
  {
    key: 'kind',
    label: 'Type',
    options: [
      { value: 'strength', label: 'Strength' },
      { value: 'mobility', label: 'Mobility' },
    ],
  },
  {
    key: 'focus',
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
    key: 'days',
    label: 'Days per week',
    when: (c) => c.mode === 'program',
    options: ['2', '3', '4', '5', '6'].map((d) => ({ value: d, label: d })),
  },
  {
    key: 'minutes',
    label: 'Time',
    options: ['15', '30', '45', '60', '75'].map((m) => ({ value: m, label: `${m} min` })),
  },
  {
    key: 'where',
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
    label: 'Level',
    options: [
      { value: 'Beginner', label: 'Beginner' },
      { value: 'Intermediate', label: 'Intermediate' },
      { value: 'Advanced', label: 'Advanced' },
    ],
  },
  {
    key: 'warmup',
    label: 'Warm-up',
    when: strength,
    options: [
      { value: 'yes', label: 'Include' },
      { value: 'no', label: 'Skip' },
    ],
  },
  {
    key: 'supersets',
    label: 'Supersets',
    when: strength,
    options: [
      { value: 'yes', label: 'Use them' },
      { value: 'no', label: 'None' },
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

/** Topics the AI should ask about when the visitor left them open. */
function openQuestions(c: Choices): string[] {
  const open: string[] = []
  if (!c.kind) open.push('strength or mobility')
  if (!c.focus) open.push('focus')
  if (c.mode === 'program' && !c.days) open.push('days per week')
  if (!c.minutes) open.push('session length')
  if (c.kind !== 'mobility' && !c.where) open.push('equipment')
  if (!c.level) open.push('experience')
  return open
}

export function buildPrompt(c: Choices): string {
  const program = c.mode === 'program'
  const lines: string[] = []

  lines.push(
    program
      ? 'Build me a workout program I can import into the YesCoach app.'
      : 'Build me one workout I can import into the YesCoach app.',
    '',
    `First, read ${SPEC_URL} and follow it exactly.${program ? '' : ' Write exactly one day.'}`,
    'If you cannot open that link, stop and ask me to paste its contents here before you continue.',
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
  if (about.length) lines.push('', 'About me:', ...about)

  const open = openQuestions(c)
  if (open.length) {
    lines.push('', `Before you write it, ask me about: ${open.join(', ')}. Also ask about injuries or anything to avoid.`)
  } else {
    lines.push('', 'Before you write it, ask me about injuries or anything to avoid.')
  }

  lines.push(
    '',
    program
      ? 'Give me the program as a downloadable .json file.'
      : 'Give me the workout as one JSON code block, or a downloadable .json file.',
  )
  return lines.join('\n')
}

export function answeredCount(c: Choices): number {
  return visibleGroups(c).filter((g) => c[g.key] !== undefined).length
}
