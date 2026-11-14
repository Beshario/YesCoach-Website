// An exercise's cue set: read, approve or reject, or edit in place (saved for the next Publish).
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { editContent, reviewRecord } from '@/lib/adminApi'
import type { ContentRecord, Cues, RecordItem } from '@/lib/adminApi'
import { recordState } from './model'
import { Decide, ItemError, ItemHeading, SentBack, useReview } from './parts'

const field = 'h-11 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm text-foreground'
const LISTS = [
  ['setup', 'Setup'],
  ['execution', 'Execution'],
] as const

export default function CuesItem({ identity, name, item }: { identity: string; name: string; item: RecordItem<ContentRecord> }) {
  const { run, saving } = useReview()
  const id = item.key
  const cues = item.record.body as unknown as Cues
  const state = recordState(item)
  const [draft, setDraft] = useState<Cues | null>(null)
  const label = `cues, ${name}`

  const change = (list: keyof Cues, lines: string[]) => setDraft((d) => (d ? { ...d, [list]: lines } : d))

  async function save() {
    if (!draft) return
    const body = { setup: draft.setup.map((c) => c.trim()).filter(Boolean), execution: draft.execution.map((c) => c.trim()).filter(Boolean) }
    if (await run(id, (token) => editContent(token, identity, 'cues', body))) {
      setDraft(null)
      document.getElementById(id)?.focus()
    }
  }

  return (
    <section aria-labelledby={id} className="space-y-3">
      <ItemHeading id={id} title="Cues" state={state}>
        {!draft && (
          <Button variant="ghost" className="h-11" disabled={saving(id)} aria-label={`Edit ${label}`} onClick={() => setDraft({ setup: [...cues.setup], execution: [...cues.execution] })}>
            Edit
          </Button>
        )}
      </ItemHeading>
      {state === 'sent_back' && <SentBack item={item} />}

      {LISTS.map(([list, title]) =>
        draft ? (
          <fieldset key={list} className="space-y-2">
            <legend className="text-xs font-medium text-muted-foreground">{title}</legend>
            {draft[list].map((cue, i) => (
              <div key={i} className="flex gap-2">
                <input
                  aria-label={`${title} ${i + 1}`}
                  value={cue}
                  onChange={(e) => change(list, draft[list].map((c, j) => (j === i ? e.target.value : c)))}
                  className={field}
                />
                <Button variant="outline" className="h-11" aria-label={`Remove cue, ${title} ${i + 1}, ${name}`} onClick={() => change(list, draft[list].filter((_, j) => j !== i))}>
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="ghost" className="h-11" onClick={() => change(list, [...draft[list], ''])}>
              Add cue
            </Button>
          </fieldset>
        ) : (
          <div key={list}>
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <ol className="list-decimal space-y-1 pl-5 text-sm">
              {cues[list].map((cue, i) => (
                <li key={i}>{cue}</li>
              ))}
            </ol>
          </div>
        ),
      )}

      <ItemError id={id} />
      {draft ? (
        <div className="flex gap-2">
          <Button className="h-11 flex-1" disabled={saving(id)} onClick={() => void save()}>
            Save
          </Button>
          <Button variant="outline" className="h-11 flex-1" disabled={saving(id)} onClick={() => setDraft(null)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Decide
          id={id}
          name={label}
          state={state}
          onApprove={() => void run(id, (token) => reviewRecord(token, id, { decision: 'approve' }))}
          onReject={(note) => run(id, (token) => reviewRecord(token, id, { decision: 'reject', note }))}
          // The API undoes an approval of a record not yet live (content-api src/records.ts review).
          onUndo={item.history.action === 'approve' && item.publishedIn === null ? () => void run(id, (token) => reviewRecord(token, id, { decision: 'reset' })) : undefined}
        />
      )}
    </section>
  )
}
