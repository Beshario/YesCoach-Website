// Pieces every item on the content page shares: the page's per-item state (saving, errors,
// the one open comment), the state chip, and the decide row with its inline reject comment.
import { createContext, useContext, useEffect, useId, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Check, CircleDot, CornerUpLeft, Globe, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { RecordItem } from '@/lib/adminApi'
import type { ItemState } from './model'
import { STATE_LABELS, byLine } from './labels'

/** The API's limit on a review comment (YesCoachReact workers/content-api/src/records.ts shortNote). */
const NOTE_MAX = 200

/** The page's per-item state, so one item saves while the rest of the page stays live. */
export interface ReviewState {
  /** Runs one API action for one item, then refreshes the list in place; false when it failed (the item shows why). */
  run: (id: string, action: (token: string) => Promise<unknown>) => Promise<boolean>
  saving: (id: string) => boolean
  error: (id: string) => string | null
  /** The one open reject comment on the page, and every item's unsent text until the page reloads. */
  rejectOpen: string | null
  setRejectOpen: (id: string | null) => void
  note: (id: string) => string
  setNote: (id: string, text: string) => void
}

export const Review = createContext<ReviewState | null>(null)

export function useReview(): ReviewState {
  const review = useContext(Review)
  if (!review) throw new Error('useReview outside the content page')
  return review
}

const CHIP: Record<ItemState, { icon: typeof Check; className: string }> = {
  review: { icon: CircleDot, className: 'border-primary text-foreground' },
  going_out: { icon: Check, className: 'border-foreground bg-muted text-foreground' },
  sent_back: { icon: CornerUpLeft, className: 'border-destructive text-foreground' },
  published: { icon: Globe, className: 'border-border text-muted-foreground' },
}

/** A state as text and icon, never colour alone; a spinner replaces the icon while the item saves. */
export function Chip({ state, saving = false }: { state: ItemState; saving?: boolean }) {
  const { icon: Icon, className } = CHIP[state]
  return (
    <span className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-xs font-medium ${className}`}>
      {saving ? <LoaderCircle aria-hidden className="size-3 animate-spin motion-reduce:animate-none" /> : <Icon aria-hidden className="size-3" />}
      {saving ? 'Saving' : STATE_LABELS[state]}
    </span>
  )
}

/** An item's heading: its name and state chip, with any item-level control on the right. */
export function ItemHeading({ id, title, state, children }: { id: string; title: string; state: ItemState; children?: ReactNode }) {
  const { saving } = useReview()
  return (
    <div className="flex min-h-11 items-center justify-between gap-2">
      <h3 id={id} tabIndex={-1} className="flex flex-wrap items-center gap-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {title}
        <Chip state={state} saving={saving(id)} />
      </h3>
      {children}
    </div>
  )
}

/** A sent-back item: the owner's comment in full, who and when. */
export function SentBack({ item }: { item: RecordItem }) {
  if (!item.rejection) throw new Error(`${item.key} is sent back with no rejection`)
  return (
    <p className="rounded-md border border-border px-3 py-2 text-sm">
      {item.rejection.note}
      <span className="block text-xs text-muted-foreground">{byLine(item.rejection.by, item.rejection.at)}</span>
    </p>
  )
}

/** An item's failed save, at the item, announced. */
export function ItemError({ id }: { id: string }) {
  const message = useReview().error(id)
  return message ? (
    <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-foreground">
      {message}
    </p>
  ) : null
}

/**
 * The reject comment, inside the item under its buttons: the content above stays in view while
 * the owner writes. Send back refuses an empty comment at the field; Escape or Cancel closes it,
 * keeps the text for this item, and puts focus back on the button that opened it.
 */
function RejectComment({ id, name, hint, onSend, onClose }: { id: string; name: string; hint: string; onSend: (note: string) => void; onClose: () => void }) {
  const { note, setNote, saving } = useReview()
  const fieldId = useId()
  const hintId = useId()
  const errorId = useId()
  const text = note(id)
  const ref = useRef<HTMLTextAreaElement>(null)
  const [tried, setTried] = useState(false)

  useEffect(() => {
    ref.current?.focus()
    ref.current?.scrollIntoView({ block: 'nearest' })
  }, [])

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!text.trim()) {
      setTried(true)
      ref.current?.focus()
      return
    }
    onSend(text.trim())
  }

  const empty = !text.trim()
  const showError = tried && empty
  return (
    <form className="space-y-2 rounded-md border border-border p-3" onSubmit={send} onKeyDown={(e) => e.key === 'Escape' && onClose()}>
      <label htmlFor={fieldId} className="block text-sm font-medium">
        What should change? <span className="font-normal text-muted-foreground">(required)</span>
        <span className="sr-only">, {name}</span>
      </label>
      <textarea
        id={fieldId}
        ref={ref}
        rows={3}
        value={text}
        maxLength={NOTE_MAX}
        aria-describedby={showError ? `${hintId} ${errorId}` : hintId}
        aria-invalid={showError || undefined}
        onChange={(e) => setNote(id, e.target.value.replace(/[\r\n]+/g, ' '))}
        className="field-sizing-content min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
      />
      <p id={hintId} className="text-xs text-muted-foreground">
        {hint}
      </p>
      {showError && (
        <p id={errorId} className="text-sm text-destructive">
          Comment required
        </p>
      )}
      <div className="flex justify-between gap-2">
        <Button type="button" variant="outline" className="h-11" disabled={saving(id)} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="h-11" aria-disabled={empty || undefined} disabled={saving(id)} aria-label={`Send back ${name}`}>
          Send back
        </Button>
      </div>
    </form>
  )
}

/** Focus a control that replaced the one the owner pressed, so focus is never lost to the page. */
function useKeepFocus(key: string) {
  const ref = useRef<HTMLButtonElement>(null)
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (document.activeElement === document.body || document.activeElement === null) ref.current?.focus()
  }, [key])
  return ref
}

interface DecideProps {
  id: string
  /** The item and exercise, for accessible names: "picture, Back squat". */
  name: string
  state: ItemState
  onApprove: () => void
  onReject: (note: string) => Promise<boolean>
  /** Undo of an approval, where the API has one (records only). */
  onUndo?: () => void
  /** Withdraw an approved or live picture: a rejection with a comment. */
  withdraw?: boolean
}

/**
 * Approve and Reject on an item that needs review; once approved, Undo in the same spot
 * (same row, same width) so the thumb is not displaced and a mis-tap costs one tap.
 */
export function Decide({ id, name, state, onApprove, onReject, onUndo, withdraw = false }: DecideProps) {
  const { rejectOpen, setRejectOpen, setNote, saving } = useReview()
  const open = rejectOpen === id
  const busy = saving(id)
  const mode = state === 'review' ? 'decide' : withdraw ? 'withdraw' : state === 'going_out' && onUndo ? 'undo' : 'none'
  const keep = useKeepFocus(mode)
  const opener = useRef<HTMLButtonElement>(null)

  const close = () => {
    setRejectOpen(null)
    requestAnimationFrame(() => opener.current?.focus())
  }
  async function send(note: string) {
    if (await onReject(note)) {
      setNote(id, '')
      setRejectOpen(null)
      document.getElementById(id)?.focus()
    }
  }

  if (mode === 'none') return null
  const comment = open && (
    <RejectComment
      id={id}
      name={name}
      hint={withdraw && state === 'published' ? 'Stays live until you publish.' : 'Sent with the next attempt.'}
      onSend={(note) => void send(note)}
      onClose={close}
    />
  )
  if (mode === 'undo') {
    return (
      <div className="flex">
        <Button ref={keep} variant="outline" className="h-11 flex-1" disabled={busy} aria-label={`Undo approval, ${name}`} onClick={onUndo}>
          Undo
        </Button>
      </div>
    )
  }
  if (mode === 'withdraw') {
    return (
      <div className="space-y-2">
        <Button
          ref={(el) => {
            opener.current = el
            keep.current = el
          }}
          variant="outline"
          className="h-11 w-full"
          disabled={busy}
          aria-expanded={open}
          aria-label={`Withdraw ${name}`}
          onClick={() => setRejectOpen(open ? null : id)}
        >
          Withdraw
        </Button>
        {comment}
      </div>
    )
  }
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button ref={keep} className="h-11 flex-1" disabled={busy} aria-label={`Approve ${name}`} onClick={onApprove}>
          Approve
        </Button>
        <Button
          ref={opener}
          variant="outline"
          className={`h-11 flex-1 ${open ? 'border-2 border-foreground' : ''}`}
          disabled={busy}
          aria-pressed={open}
          aria-label={`Reject ${name}`}
          onClick={() => setRejectOpen(open ? null : id)}
        >
          Reject
        </Button>
      </div>
      {comment}
    </div>
  )
}
