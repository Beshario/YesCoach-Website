// Labels for the owner's content page (wording: the cx-writer agent, 2026-11-13;
// design: YesCoachReact docs/design/ADMIN_REVIEW_PAGE.md §11).
import type { History } from '@/lib/adminApi'
import catalog from '@/lib/exerciseCatalog.json'
import type { ItemKind, ItemState, Tab } from './model'

export const TAB_LABELS: Record<Tab, string> = { review: 'Review', going_out: 'Going out', published: 'Published' }

export const STATE_LABELS: Record<ItemState, string> = {
  review: 'Needs review',
  going_out: 'Going out',
  sent_back: 'Sent back',
  published: 'Published',
}

export const KIND_LABELS: Record<ItemKind, string> = { picture: 'Picture', cues: 'Cues', videos: 'Videos' }

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

export const when = (at: string): string =>
  new Date(at).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

export function historyLine(h: History): string {
  return [ACTIONS[h.action], WHO[h.by], when(h.at), h.note].filter(Boolean).join(' · ')
}

export const byLine = (by: History['by'], at: string): string => `${WHO[by]} · ${when(at)}`

/** A video's start as m:ss. */
export function clock(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

export const progressLine = (done: number, total: number): string => `${done} of ${total} exercises`
export const doneLine = (name: string, done: number, total: number): string => `${name} done, ${progressLine(done, total)}`
export const couldntSave = (reason: string): string => `Couldn't save: ${reason}`
export const sheetSummary = (items: number, exercises: number): string =>
  `${items} ${items === 1 ? 'item' : 'items'} in ${exercises} ${exercises === 1 ? 'exercise' : 'exercises'}`
export const SHEET_CONSEQUENCE = 'Phones update within 1 min of the next app open, or now via Account → Check for updates.'
export const opensInNewTab = (name: string): string => `${name}, opens in new tab`
