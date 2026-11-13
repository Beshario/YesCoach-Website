// Pieces every item on the content page shares: its status, its history line, approve, and reject with a comment.
import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode, RefObject } from 'react'
import { Button } from '@/components/ui/button'
import { ApiError, refusal } from '@/lib/adminApi'
import type { History, RecordStatus } from '@/lib/adminApi'
import { STATUS_LABELS, historyLine } from './labels'

/** Runs one API action with the signed-in token, then reloads the page's data; false when it failed (the page shows why). */
export type Run = (action: (token: string) => Promise<unknown>) => Promise<boolean>

/** The API's limit on a review comment (YesCoachReact workers/content-api/src/records.ts shortNote). */
const NOTE_MAX = 200

export function ItemState({ status, history, needsReview }: { status: RecordStatus; history: History; needsReview: boolean }) {
  return (
    <p className="text-xs text-muted-foreground">
      <span
        className={`mr-2 inline-block rounded border px-1.5 py-0.5 font-medium ${needsReview ? 'border-primary text-foreground' : 'border-border'}`}
      >
        {STATUS_LABELS[status]}
      </span>
      {historyLine(history)}
    </p>
  )
}

interface OpenerProps {
  ref: RefObject<HTMLButtonElement | null>
  onClick: () => void
}

/**
 * Rejecting asks for a one-line comment in place of the buttons, at the spot
 * the owner pressed: Send stays disabled until there is text, Escape or Cancel
 * puts the buttons back and focus on the button that opened it. The comment is
 * the feedback the next attempt reads.
 */
function WithRejectComment({
  busy,
  onReject,
  buttons,
}: {
  busy: boolean
  onReject: (note: string) => Promise<boolean>
  /** The buttons, given the props of the one that opens the comment. */
  buttons: (opens: OpenerProps) => ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState('')
  const opener = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef(false)
  const close = () => {
    returnFocus.current = true
    setOpen(false)
    setNote('')
  }

  useEffect(() => {
    if (open || !returnFocus.current) return
    returnFocus.current = false
    opener.current?.focus()
  }, [open])

  if (!open) return <>{buttons({ ref: opener, onClick: () => setOpen(true) })}</>

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (await onReject(note.trim())) close()
  }

  return (
    <form className="space-y-2" onSubmit={(e) => void send(e)} onKeyDown={(e) => e.key === 'Escape' && close()}>
      <input
        aria-label="Rejection comment"
        value={note}
        maxLength={NOTE_MAX}
        autoFocus
        onChange={(e) => setNote(e.target.value)}
        className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
      />
      <div className="flex gap-2">
        <Button type="submit" className="h-11 flex-1" disabled={busy || !note.trim()}>
          Send
        </Button>
        <Button type="button" variant="outline" className="h-11 flex-1" disabled={busy} onClick={close}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export function Decide({ busy, onApprove, onReject }: { busy: boolean; onApprove: () => void; onReject: (note: string) => Promise<boolean> }) {
  return (
    <WithRejectComment
      busy={busy}
      onReject={onReject}
      buttons={(opens) => (
        <div className="flex gap-2">
          <Button className="h-11 flex-1" disabled={busy} onClick={onApprove}>
            Approve
          </Button>
          <Button variant="outline" className="h-11 flex-1" disabled={busy} {...opens}>
            Reject
          </Button>
        </div>
      )}
    />
  )
}

/** Withdrawing the approved picture is a rejection too, with its comment. */
export function Withdraw({ busy, onReject }: { busy: boolean; onReject: (note: string) => Promise<boolean> }) {
  return (
    <WithRejectComment
      busy={busy}
      onReject={onReject}
      buttons={(opens) => (
        <Button variant="outline" className="h-11 w-full" disabled={busy} {...opens}>
          Withdraw
        </Button>
      )}
    />
  )
}

/** Draft and in-review records can be approved or rejected; approved and published ones change by an edit. */
export const reviewable = (status: RecordStatus): boolean => status === 'draft' || status === 'in_review'

/** An owner edit: saved approved for the next Publish, or refused with the API's reason. */
export async function saveEdit(edit: Promise<unknown>): Promise<unknown> {
  try {
    return await edit
  } catch (err) {
    throw err instanceof ApiError && err.status !== 403 ? new Error(`Not saved: ${refusal(err)}`) : err
  }
}
