// An exercise's picture candidates, each beside its heat map with the image-checker's verdict.
// A rejection's comment is the correction for the next picture (runbook CONTENT_API_DEPLOY.md §11.1, --redo).
import { imageUrl, mapUrl, reviewCandidate } from '@/lib/adminApi'
import type { ImageItem, RecordItem } from '@/lib/adminApi'
import { Decide, ItemState, Withdraw } from './parts'
import type { Run } from './parts'

export default function Pictures({
  identity,
  images,
  record,
  busy,
  run,
}: {
  identity: string
  images: ImageItem[]
  /** The identity's `image` record: whether the approved picture is published yet. */
  record: RecordItem | undefined
  busy: boolean
  run: Run
}) {
  const reject = (c: ImageItem) => (note: string) => run((token) => reviewCandidate(token, identity, c.sha256, { decision: 'reject', note }))

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold">Picture</h3>
      {record && <ItemState status={record.status} history={record.history} needsReview={record.needsReview} />}
      {images.map((c) => (
        <div key={c.sha256} className="space-y-2">
          <div className="grid grid-cols-2 overflow-hidden rounded-md border border-border">
            <img src={imageUrl(c.sha256)} alt={c.alt} width={c.w} height={c.h} className="w-full h-auto aspect-square bg-muted" />
            <img src={mapUrl(identity)} alt="Heat map" width={1024} height={1024} className="w-full h-auto aspect-square bg-muted" />
          </div>
          {c.check && (
            <p className={`text-sm ${c.check.verdict === 'match' ? 'text-foreground' : 'text-destructive'}`}>
              <span className="font-semibold">{c.check.verdict === 'match' ? 'Matches' : "Doesn't match"}</span>
              {' · '}
              {c.check.note}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {c.model} · {c.promptVersion} · {Math.round(c.bytes / 1000)} KB
          </p>
          <ItemState status={c.status} history={c.history} needsReview={c.needsReview} />
          {c.status === 'draft' && (
            <Decide
              busy={busy}
              onApprove={() => void run((token) => reviewCandidate(token, identity, c.sha256, { decision: 'approve' }))}
              onReject={reject(c)}
            />
          )}
          {c.status === 'approved' && <Withdraw busy={busy} onReject={reject(c)} />}
        </div>
      ))}
    </section>
  )
}
