// Labels for the owner's content page (wording: the cx-writer agent, 2026-11-13).
import type { History, RecordStatus } from '@/lib/adminApi'
import catalog from '@/lib/exerciseCatalog.json'

export const STATUS_LABELS: Record<RecordStatus, string> = {
  draft: 'Draft',
  in_review: 'In review',
  approved: 'Approved',
  published: 'Published',
}

const ACTIONS: Record<History['action'], string> = {
  approve: 'Approved',
  reject: 'Rejected',
  edit: 'Edited',
  reset: 'Back to review',
  update: 'Updated',
}

const WHO: Record<History['by'], string> = { owner: 'You', agent: 'Agent', seed: 'Seed', migration: 'Migration' }

const exerciseNames = new Map(catalog.map((e) => [e.id, e.name]))

/** The catalog's name for an identity; a pattern-level identity has none and shows as itself. */
export const exerciseName = (identity: string): string => exerciseNames.get(identity) ?? identity

export function historyLine(h: History): string {
  const when = new Date(h.at).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  return [ACTIONS[h.action], WHO[h.by], when, h.note].filter(Boolean).join(' · ')
}
