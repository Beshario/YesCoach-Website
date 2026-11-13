// An exercise's cue set: read, approve or reject, or edit in place (saved for the next Publish).
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { editContent, reviewRecord } from '@/lib/adminApi'
import type { ContentRecord, Cues, RecordItem } from '@/lib/adminApi'
import { Decide, ItemState, reviewable, saveEdit } from './parts'
import type { Run } from './parts'

const field = 'h-11 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm text-foreground'
const LISTS = [
  ['setup', 'Setup'],
  ['execution', 'Execution'],
] as const

export default function CuesSection({ identity, item, busy, run }: { identity: string; item: RecordItem<ContentRecord> | undefined; busy: boolean; run: Run }) {
  const cues = item?.record.body as Cues | undefined
  const [draft, setDraft] = useState<Cues | null>(null)

  const change = (list: keyof Cues, lines: string[]) => setDraft((d) => (d ? { ...d, [list]: lines } : d))

  async function save() {
    if (!draft) return
    const body = { setup: draft.setup.map((c) => c.trim()).filter(Boolean), execution: draft.execution.map((c) => c.trim()).filter(Boolean) }
    if (await run((token) => saveEdit(editContent(token, identity, 'cues', body)))) setDraft(null)
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Cues</h3>
        {!draft && (
          <Button variant="ghost" className="h-11" disabled={busy} onClick={() => setDraft({ setup: [...(cues?.setup ?? [])], execution: [...(cues?.execution ?? [])] })}>
            Edit
          </Button>
        )}
      </div>
      {item && <ItemState status={item.status} history={item.history} needsReview={item.needsReview} />}

      {LISTS.map(([list, label]) =>
        draft ? (
          <fieldset key={list} className="space-y-2">
            <legend className="text-xs font-medium text-muted-foreground">{label}</legend>
            {draft[list].map((cue, i) => (
              <div key={i} className="flex gap-2">
                <input
                  aria-label={`${label} ${i + 1}`}
                  value={cue}
                  onChange={(e) => change(list, draft[list].map((c, j) => (j === i ? e.target.value : c)))}
                  className={field}
                />
                <Button variant="outline" className="h-11" onClick={() => change(list, draft[list].filter((_, j) => j !== i))}>
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="ghost" className="h-11" onClick={() => change(list, [...draft[list], ''])}>
              Add cue
            </Button>
          </fieldset>
        ) : (
          cues && (
            <div key={list}>
              <p className="text-xs font-medium text-muted-foreground">{label}</p>
              <ol className="list-decimal pl-5 text-sm space-y-1">
                {cues[list].map((cue, i) => (
                  <li key={i}>{cue}</li>
                ))}
              </ol>
            </div>
          )
        ),
      )}

      {draft ? (
        <div className="flex gap-2">
          <Button className="h-11 flex-1" disabled={busy} onClick={() => void save()}>
            Save
          </Button>
          <Button variant="outline" className="h-11 flex-1" disabled={busy} onClick={() => setDraft(null)}>
            Cancel
          </Button>
        </div>
      ) : (
        item &&
        reviewable(item.status) && (
          <Decide
            busy={busy}
            onApprove={() => void run((token) => reviewRecord(token, 'content', item.key, { decision: 'approve' }))}
            onReject={(note) => run((token) => reviewRecord(token, 'content', item.key, { decision: 'reject', note }))}
          />
        )
      )}
    </section>
  )
}
