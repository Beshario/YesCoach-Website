'use client'

import { useState } from 'react'

interface CopyBlockProps {
  label: string
  /** Text shown and copied. Omit `source` when this is the full text. */
  text?: string
  /** Fetch the text to copy from this URL instead of `text` (keeps large specs out of the HTML). */
  source?: string
}

export function CopyBlock({ label, text, source }: CopyBlockProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function copy() {
    try {
      const value = source ? await (await fetch(source)).text() : text
      if (!value) throw new Error('CopyBlock: nothing to copy')
      await navigator.clipboard.writeText(value)
      setState('copied')
    } catch {
      setState('failed')
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card">
      {text && (
        <pre className="whitespace-pre-wrap break-words p-5 text-sm text-foreground font-mono">{text}</pre>
      )}
      <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {state === 'copied' && 'Copied'}
          {state === 'failed' && 'Copy failed. Select the text and copy it manually.'}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-[44px] items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground hover:bg-accent/90"
        >
          {label}
        </button>
      </div>
    </div>
  )
}
