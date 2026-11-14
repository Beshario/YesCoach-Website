// The one deliberate act: what the dry run says is going out, grouped by exercise, what
// publishing does for phones, then Publish now. A bottom sheet on a phone, a centred dialog
// on a desktop; native <dialog> gives the focus trap, Escape and the inert page.
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import type { PublishItem, Source } from '@/lib/adminApi'
import { exerciseName, SHEET_CONSEQUENCE, sheetSummary } from './labels'

const KIND: Record<string, string> = { image: 'Picture', cues: 'Cues', youtube: 'Videos' }

/** Going-out items as rows: one per exercise with its kinds, then one per creator a video takes with it. */
function rows(items: PublishItem[], sources: Map<string, Source>): { key: string; name: string; what: string }[] {
  const byExercise = new Map<string, string[]>()
  const other: { key: string; name: string; what: string }[] = []
  for (const item of items) {
    if (item.section === 'content') {
      const at = item.key.lastIndexOf('|')
      const identity = item.key.slice(0, at)
      const kind = item.key.slice(at + 1)
      byExercise.set(identity, [...(byExercise.get(identity) ?? []), KIND[kind] ?? kind])
    } else if (item.section === 'sources') {
      const source = sources.get(item.key)
      if (!source) throw new Error(`Publish lists source "${item.key}", which the API did not list`)
      other.push({ key: `sources|${item.key}`, name: source.name, what: 'Creator' })
    } else {
      other.push({ key: `${item.section}|${item.key}`, name: item.key, what: item.section })
    }
  }
  const exercises = [...byExercise].map(([identity, kinds]) => ({ key: identity, name: exerciseName(identity), what: kinds.join(', ') }))
  return [...exercises, ...other]
}

export interface SheetState {
  /** The dry run's list; null when the dry run itself was refused. */
  items: PublishItem[] | null
  error: string | null
  publishing: boolean
}

export default function PublishSheet({
  sheet,
  sources,
  onPublish,
  onClose,
}: {
  sheet: SheetState
  sources: Map<string, Source>
  onPublish: () => void
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    dialog.current?.showModal()
  }, [])

  const list = sheet.items ? rows(sheet.items, sources) : []
  const exercises = sheet.items ? new Set(sheet.items.filter((i) => i.section === 'content').map((i) => i.key.slice(0, i.key.lastIndexOf('|')))).size : 0

  return (
    <dialog
      ref={dialog}
      aria-labelledby="sheet-title"
      onCancel={(e) => {
        if (sheet.publishing) e.preventDefault()
      }}
      onClose={onClose}
      className="mx-0 mb-0 mt-auto max-h-[85dvh] w-full max-w-full flex-col open:flex rounded-t-xl border border-border bg-card text-foreground backdrop:bg-black/60 sm:m-auto sm:max-w-md sm:rounded-xl"
    >
      <div className="space-y-1 border-b border-border p-4">
        <h2 id="sheet-title" className="text-lg font-semibold">
          Going out
        </h2>
        {sheet.items && <p className="text-sm text-muted-foreground">{sheetSummary(sheet.items.length, exercises)}</p>}
      </div>
      {list.length > 0 && (
        <ul className="min-h-0 flex-1 divide-y divide-border overflow-y-auto px-4 text-sm">
          {list.map((r) => (
            <li key={r.key} className="flex justify-between gap-4 py-2">
              <span className="min-w-0 break-words font-medium">{r.name}</span>
              <span className="shrink-0 text-muted-foreground">{r.what}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="space-y-3 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <p className="text-sm">{SHEET_CONSEQUENCE}</p>
        {sheet.error && (
          <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm">
            {sheet.error}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="outline" className="h-11" disabled={sheet.publishing} onClick={() => dialog.current?.close()}>
            Cancel
          </Button>
          {sheet.items && (
            <Button className="h-11" disabled={sheet.publishing} onClick={onPublish}>
              Publish now
            </Button>
          )}
        </div>
      </div>
    </dialog>
  )
}
