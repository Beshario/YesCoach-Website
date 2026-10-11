'use client'

import { useMemo, useState } from 'react'
import { answeredCount, buildPrompt, pruneChoices, visibleGroups, type Choices, type Mode } from '@/lib/aiPrompt'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type CopyState = 'idle' | 'copied' | 'failed'

const MODES: { value: Mode; label: string }[] = [
  { value: 'workout', label: 'One workout' },
  { value: 'program', label: 'Program' },
]

const chipBase =
  'min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
const chipOff = 'border-border bg-background text-foreground hover:bg-muted'
const chipOn = 'border-primary bg-primary text-primary-foreground'

function CopyButton({ onCopy, state, className = '' }: { onCopy: () => void; state: CopyState; className?: string }) {
  return (
    <button
      type="button"
      onClick={onCopy}
      className={`inline-flex min-h-[48px] items-center justify-center rounded-md bg-accent px-6 text-base font-semibold text-accent-foreground hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 ${className}`}
    >
      {state === 'copied' ? 'Copied' : 'Copy prompt'}
    </button>
  )
}

export function PromptBuilder() {
  const [choices, setChoices] = useState<Choices>({ mode: 'workout' })
  const [copy, setCopy] = useState<CopyState>('idle')
  const prompt = useMemo(() => buildPrompt(choices), [choices])
  const groups = visibleGroups(choices)
  const answered = answeredCount(choices)

  function update(next: Choices) {
    setChoices(pruneChoices(next))
    setCopy('idle')
  }

  function toggle(key: keyof Choices, value: string) {
    update({ ...choices, [key]: choices[key] === value ? undefined : value })
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopy('copied')
      window.gtag?.('event', 'ai_prompt_copied', { mode: choices.mode, kind: choices.kind ?? 'open', answered })
    } catch {
      setCopy('failed')
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 sm:p-5">
        <div role="radiogroup" aria-label="What to ask for" className="inline-flex rounded-full border border-border bg-muted p-1">
          {MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              role="radio"
              aria-checked={choices.mode === m.value}
              onClick={() => update({ ...choices, mode: m.value })}
              className={`min-h-[40px] rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 ${
                choices.mode === m.value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <CopyButton onCopy={copyPrompt} state={copy} className="w-full sm:w-auto" />
      </div>

      <pre
        aria-label="Prompt preview"
        tabIndex={0}
        className="max-h-64 overflow-auto whitespace-pre-wrap break-words p-4 sm:p-5 font-mono text-sm leading-relaxed text-foreground"
      >
        {prompt}
      </pre>

      <div className="border-t border-border p-4 sm:p-5">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Tailor it (optional)</p>
          {answered > 0 && (
            <button
              type="button"
              onClick={() => update({ mode: choices.mode })}
              className="min-h-[44px] text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Clear choices
            </button>
          )}
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          Tap to set, tap again to clear. Anything you leave open, the AI asks you about.
        </p>

        <div className="space-y-5">
          {groups.map((group) => (
            <fieldset key={`${group.key}-${group.label}`}>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {group.label}
              </legend>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => {
                  const on = choices[group.key] === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(group.key, option.value)}
                      className={`${chipBase} ${on ? chipOn : chipOff}`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <CopyButton onCopy={copyPrompt} state={copy} className="w-full sm:w-auto" />
          <span className="text-sm text-muted-foreground" aria-live="polite">
            {copy === 'copied' && 'Now paste it into ChatGPT, Claude, or Gemini.'}
            {copy === 'failed' && 'Copy failed. Select the prompt text above and copy it manually.'}
          </span>
        </div>
      </div>
    </div>
  )
}
