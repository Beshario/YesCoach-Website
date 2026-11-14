// An exercise's picture: each candidate beside its heat map, the image-checker's verdict under the
// pair, the alt text that ships with it, and the decision. A rejection's comment is the correction
// for the next picture (runbook CONTENT_API_DEPLOY.md §11.1, --redo). The owner's own upload is a
// per-card repair (owner decision D3, 2026-11-13).
import { useRef } from 'react'
import type { FormEvent } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { imageUrl, mapUrl, reviewCandidate, uploadCandidate } from '@/lib/adminApi'
import type { Exercise, ImageItem } from '@/lib/adminApi'
import type { ItemState } from './model'
import { historyLine } from './labels'
import { Decide, ItemError, ItemHeading, useReview } from './parts'

const field = 'h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground'

function Verdict({ check }: { check: ImageItem['check'] }) {
  if (!check) return <p className="text-sm text-muted-foreground">Not checked</p>
  const match = check.verdict === 'match'
  const Icon = match ? Check : X
  return (
    <p className={`text-sm ${match ? 'text-foreground' : 'text-destructive'}`}>
      <span className="inline-flex items-center gap-1 font-semibold">
        <Icon aria-hidden className="size-4" />
        {match ? 'Matches' : "Doesn't match"}
      </span>
      <span className="block text-foreground">{check.note}</span>
    </p>
  )
}

/** The picture and its heat map, side by side, captioned. Nothing tints the map. */
function Pair({ identity, name, candidate, stacked = false }: { identity: string; name: string; candidate: ImageItem; stacked?: boolean }) {
  const figure = 'space-y-1'
  const img = 'w-full h-auto aspect-square rounded-md border border-border bg-background'
  return (
    <div className={stacked ? 'space-y-4' : 'grid grid-cols-2 gap-2 lg:max-w-[616px]'}>
      <figure className={figure}>
        <img src={imageUrl(candidate.sha256)} alt={candidate.alt} width={candidate.w} height={candidate.h} className={img} />
        <figcaption className="text-xs text-muted-foreground">Picture</figcaption>
      </figure>
      <figure className={figure}>
        <img src={mapUrl(identity)} alt={`Heat map for ${name}`} width={1024} height={1024} className={img} />
        <figcaption className="text-xs text-muted-foreground">Heat map</figcaption>
      </figure>
    </div>
  )
}

function Candidate({ identity, name, candidate, state }: { identity: string; name: string; candidate: ImageItem; state: ItemState }) {
  const { run } = useReview()
  const id = `${identity}|picture`
  const dialog = useRef<HTMLDialogElement>(null)
  const enlarge = useRef<HTMLButtonElement>(null)
  const label = `picture, ${name}`
  const decide = (decision: { decision: 'approve' } | { decision: 'reject'; note: string }) =>
    run(id, (token) => reviewCandidate(token, identity, candidate.sha256, decision))

  return (
    <div className="space-y-3">
      <Pair identity={identity} name={name} candidate={candidate} />
      <Button ref={enlarge} variant="outline" className="h-11 w-full lg:hidden" aria-label={`Enlarge picture and heat map, ${name}`} onClick={() => dialog.current?.showModal()}>
        Enlarge
      </Button>
      <Verdict check={candidate.check} />
      <p className="text-sm">
        <span className="text-muted-foreground">Alt text </span>
        {candidate.alt}
      </p>
      <Decide
        id={id}
        name={label}
        state={state}
        withdraw={candidate.status === 'approved'}
        onApprove={() => void decide({ decision: 'approve' })}
        onReject={(note) => decide({ decision: 'reject', note })}
      />
      <details className="text-sm">
        <summary className="flex min-h-11 cursor-pointer items-center">Details</summary>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
          <dt className="text-muted-foreground">Model</dt>
          <dd>{candidate.model}</dd>
          <dt className="text-muted-foreground">Prompt version</dt>
          <dd>{candidate.promptVersion}</dd>
          <dt className="text-muted-foreground">Size</dt>
          <dd>
            {candidate.w} × {candidate.h} px, {Math.round(candidate.bytes / 1000)} KB
          </dd>
          <dd className="col-span-2 text-muted-foreground">{historyLine(candidate.history)}</dd>
        </dl>
      </details>

      <dialog
        ref={dialog}
        aria-label={`Picture and heat map, ${name}`}
        onClose={() => enlarge.current?.focus()}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-md rounded-lg border border-border bg-card p-4 text-foreground backdrop:bg-black/60"
      >
        <div className="space-y-3">
          <Pair identity={identity} name={name} candidate={candidate} stacked />
          <Verdict check={candidate.check} />
          <div className="flex gap-2">
            {state === 'review' && (
              <Button
                className="h-11 flex-1"
                aria-label={`Approve ${label}`}
                onClick={() => {
                  dialog.current?.close()
                  void decide({ decision: 'approve' })
                }}
              >
                Approve
              </Button>
            )}
            <Button variant="outline" className="h-11 flex-1" onClick={() => dialog.current?.close()}>
              Close
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

function Upload({ identity, name }: { identity: string; name: string }) {
  const { run, saving } = useReview()
  const id = `${identity}|picture`

  function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const text = (field: string) => String(data.get(field)).trim()
    void run(id, async (token) => {
      await uploadCandidate(token, identity, data.get('file') as File, { alt: text('alt'), model: text('model'), promptVersion: text('promptVersion') })
      form.reset()
    })
  }

  return (
    <details className="text-sm">
      <summary className="flex min-h-11 cursor-pointer items-center" aria-label={`Upload picture, ${name}`}>
        Upload picture
      </summary>
      <form onSubmit={upload} className="space-y-3 pt-2">
        <label className="block space-y-1">
          <span>File</span>
          <input name="file" type="file" accept="image/webp" required className="block min-h-11 w-full text-sm" />
        </label>
        <label className="block space-y-1">
          <span>Alt text</span>
          <input name="alt" required className={field} />
        </label>
        <label className="block space-y-1">
          <span>Model</span>
          <input name="model" required className={field} />
        </label>
        <label className="block space-y-1">
          <span>Prompt version</span>
          <input name="promptVersion" required className={field} />
        </label>
        <Button type="submit" className="h-11" disabled={saving(id)}>
          Upload
        </Button>
      </form>
    </details>
  )
}

/**
 * Drafts newest first, each to decide; with none, the approved picture with Withdraw.
 * `state` is the item's (model.ts pictureState); null when the exercise has no picture yet.
 */
export default function Picture({ exercise, name, state }: { exercise: Exercise; name: string; state: ItemState | null }) {
  const id = `${exercise.identity}|picture`
  const drafts = exercise.images.filter((i) => i.status === 'draft')
  const shown = drafts.length > 0 ? drafts : exercise.images.filter((i) => i.status === 'approved')
  return (
    <section aria-labelledby={id} className="space-y-3">
      {state ? (
        <ItemHeading id={id} title="Picture" state={state} />
      ) : (
        <h3 id={id} tabIndex={-1} className="flex min-h-11 items-center text-sm font-semibold">
          Picture
        </h3>
      )}
      {shown.map((c) => (
        <Candidate key={c.sha256} identity={exercise.identity} name={name} candidate={c} state={c.status === 'draft' ? 'review' : state!} />
      ))}
      <ItemError id={id} />
      <Upload identity={exercise.identity} name={name} />
    </section>
  )
}

