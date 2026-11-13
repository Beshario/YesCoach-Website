// Pieces every item on the content page shares: its status, its history line, approve and reject.
import { Button } from '@/components/ui/button'
import { ApiError, refusal } from '@/lib/adminApi'
import type { History, RecordStatus } from '@/lib/adminApi'
import { STATUS_LABELS, historyLine } from './labels'

/** Runs one API action with the signed-in token, then reloads the page's data; false when it failed (the page shows why). */
export type Run = (action: (token: string) => Promise<unknown>) => Promise<boolean>

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

export function Decide({ busy, onApprove, onReject }: { busy: boolean; onApprove: () => void; onReject: () => void }) {
  return (
    <div className="flex gap-2">
      <Button className="h-11 flex-1" disabled={busy} onClick={onApprove}>
        Approve
      </Button>
      <Button variant="outline" className="h-11 flex-1" disabled={busy} onClick={onReject}>
        Reject
      </Button>
    </div>
  )
}

/** Draft and in-review records can be approved or rejected; approved and published ones change by an edit. */
export const reviewable = (status: RecordStatus): boolean => status === 'draft' || status === 'in_review'

/** An owner edit: approved and published at once, or refused with the API's reason. */
export async function publishEdit(edit: Promise<unknown>): Promise<unknown> {
  try {
    return await edit
  } catch (err) {
    throw err instanceof ApiError && err.status !== 403 ? new Error(`Not published: ${refusal(err)}`) : err
  }
}
