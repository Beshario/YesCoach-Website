// One exercise: its name and identity, a chip per item so the whole exercise reads at a glance,
// and, open, its Picture, Cues and Videos. A card with nothing left to review collapses to its
// header; one the owner opened stays open.
import { ChevronDown } from 'lucide-react'
import type { Exercise, Source } from '@/lib/adminApi'
import { itemStates, recordOf } from './model'
import type { ItemKind } from './model'
import { KIND_LABELS, exerciseName } from './labels'
import { Chip } from './parts'
import Picture from './image-review'
import CuesItem from './cues'
import VideosItem from './videos'

export const cardHeadingId = (identity: string): string => `card-${identity}`

const KINDS: ItemKind[] = ['picture', 'cues', 'videos']

export default function ExerciseCard({
  exercise,
  sources,
  open,
  onToggle,
}: {
  exercise: Exercise
  sources: Map<string, Source>
  open: boolean
  onToggle: () => void
}) {
  const name = exerciseName(exercise.identity)
  const states = itemStates(exercise)
  const check = states.picture === 'review' ? exercise.images.find((i) => i.status === 'draft')?.check : undefined
  const cues = recordOf(exercise, 'cues')
  const videos = recordOf(exercise, 'videos')
  const bodyId = `${cardHeadingId(exercise.identity)}-body`

  return (
    <article aria-labelledby={cardHeadingId(exercise.identity)} className="rounded-lg border border-border bg-card">
      <h2 className="text-lg font-semibold leading-tight">
        <button
          id={cardHeadingId(exercise.identity)}
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={onToggle}
          className="flex min-h-11 w-full items-start gap-3 rounded-lg p-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="min-w-0 flex-1 space-y-2">
            <span className="block">{name}</span>
            <span className="block break-all font-mono text-xs font-normal text-muted-foreground">{exercise.identity}</span>
            <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-normal">
              {KINDS.filter((k) => states[k]).map((k) => (
                <span key={k} className="inline-flex items-center gap-1">
                  {KIND_LABELS[k]}
                  <Chip state={states[k]!} />
                </span>
              ))}
              {check && (
                <span className={check.verdict === 'match' ? 'text-foreground' : 'font-medium text-destructive'}>
                  {check.verdict === 'match' ? 'Matches' : "Doesn't match"}
                </span>
              )}
            </span>
          </span>
          <ChevronDown aria-hidden className={`mt-1 size-5 shrink-0 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} />
        </button>
      </h2>
      {open && (
        <div id={bodyId} className="grid gap-6 border-t border-border p-3 lg:grid-cols-2 lg:gap-8">
          <Picture exercise={exercise} name={name} state={states.picture ?? null} />
          <div className="space-y-6">
            {cues && <CuesItem identity={exercise.identity} name={name} item={cues} />}
            {videos && <VideosItem identity={exercise.identity} name={name} item={videos} sources={sources} />}
          </div>
        </div>
      )}
    </article>
  )
}
