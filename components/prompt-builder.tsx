'use client'

import { useMemo, useState } from 'react'
import {
  buildPrompt,
  pruneChoices,
  summary,
  visibleGroups,
  type ChoiceGroup,
  type Choices,
  type Mode,
} from '@/lib/aiPrompt'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type CopyState = 'idle' | 'copied' | 'failed'

const MODES: { value: Mode; label: string; hint: string }[] = [
  { value: 'workout', label: 'One workout', hint: 'One session for today. Paste the reply in the app.' },
  { value: 'program', label: 'Program', hint: 'Every day of a plan, as a .json file to import.' },
]

const focusRing = 'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
// Dark text on the orange accent: the theme's light accent-foreground is too faint on it.
const copyButton = `inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-lg bg-accent px-6 text-base font-semibold text-[oklch(0.18_0_0)] hover:bg-accent/90 ${focusRing}`
const label = 'font-mono text-xs font-semibold uppercase tracking-[0.14em]'

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PromptBuilder() {
  const [choices, setChoices] = useState<Choices>({ mode: 'workout' })
  const [copy, setCopy] = useState<CopyState>('idle')
  const [showMore, setShowMore] = useState(false)
  const prompt = useMemo(() => buildPrompt(choices), [choices])
  const groups = visibleGroups(choices)
  const set = summary(choices)
  const mode = MODES.find((m) => m.value === choices.mode)!

  function update(next: Choices) {
    setChoices(pruneChoices(next))
    setCopy('idle')
  }

  function toggle(key: keyof Choices, value: string) {
    update({ ...choices, [key]: choices[key] === value ? undefined : value })
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt.text)
      setCopy('copied')
      window.gtag?.('event', 'ai_prompt_copied', {
        mode: choices.mode,
        kind: choices.kind ?? 'open',
        answered: groups.filter((g) => choices[g.key] !== undefined).length,
        exercises: prompt.exerciseCount,
      })
    } catch {
      setCopy('failed')
    }
  }

  function renderGroup(group: ChoiceGroup) {
    return (
      <fieldset key={`${group.key}-${group.label}`}>
        <legend className={`mb-2 ${label} text-muted-foreground`}>{group.label}</legend>
        <div className="flex flex-wrap gap-2">
          {group.options.map((option) => {
            const on = choices[group.key] === option.value
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(group.key, option.value)}
                className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border px-3.5 text-sm font-medium transition-colors ${focusRing} ${
                  on
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                {on && <span className="text-primary"><Check /></span>}
                {option.label}
              </button>
            )
          })}
        </div>
      </fieldset>
    )
  }

  const core = groups.filter((g) => g.tier === 'core')
  const more = groups.filter((g) => g.tier === 'more')
  const moreSet = more.filter((g) => choices[g.key] !== undefined).length

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={`${label} text-primary`}>Your prompt</p>
          <div role="radiogroup" aria-label="What to ask for" className="inline-flex rounded-lg border border-border bg-muted p-1">
            {MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                role="radio"
                aria-checked={choices.mode === m.value}
                onClick={() => update({ ...choices, mode: m.value })}
                className={`min-h-[40px] rounded-md px-3.5 text-sm font-medium transition-colors ${focusRing} ${
                  choices.mode === m.value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode.hint} Choices are optional: anything you leave open, the AI chooses for you.
        </p>

        <div className="mt-5 space-y-5">{core.map(renderGroup)}</div>

        {more.length > 0 && (
          <div className="mt-5">
            <button
              type="button"
              aria-expanded={showMore}
              onClick={() => setShowMore((v) => !v)}
              className={`min-h-[44px] text-sm font-medium text-primary hover:underline ${focusRing}`}
            >
              {showMore
                ? 'Fewer options'
                : `More options: ${more.map((g) => g.label.toLowerCase()).join(', ')}${moreSet ? ` (${moreSet} set)` : ''}`}
            </button>
            {showMore && <div className="mt-3 space-y-5">{more.map(renderGroup)}</div>}
          </div>
        )}

        <details className="mt-5 rounded-lg border border-border">
          <summary className={`min-h-[44px] cursor-pointer px-4 py-3 text-sm font-medium text-foreground ${focusRing}`}>
            Preview prompt
          </summary>
          <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words border-t border-border px-4 py-3 font-mono text-sm leading-relaxed text-foreground">
            {prompt.text}
          </pre>
        </details>

      </div>

      <div className="sticky bottom-0 z-10 rounded-b-2xl border-t border-border bg-card/95 p-3 backdrop-blur sm:p-4">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">
              {set.length === 0
                ? 'Nothing set'
                : set.map((item, i) => (
                    <span key={item} className="whitespace-nowrap">
                      {i > 0 && <span className="text-muted-foreground" aria-hidden="true"> · </span>}
                      {item}
                    </span>
                  ))}
            </p>
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {copy === 'copied'
                ? 'Paste it into ChatGPT, Claude, or Gemini.'
                : copy === 'failed'
                  ? 'Copy failed. Open Preview prompt and copy it.'
                  : set.length === 0
                    ? 'The AI picks the rest.'
                    : null}
            </p>
          </div>
          <button type="button" onClick={copyPrompt} className={copyButton}>
            {copy === 'copied' ? 'Copied ✓' : 'Copy prompt'}
          </button>
        </div>
      </div>
    </div>
  )
}
