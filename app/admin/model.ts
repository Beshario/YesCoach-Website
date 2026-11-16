// What the owner sees of the API's statuses (YesCoachReact docs/design/ADMIN_REVIEW_PAGE.md §3):
// four item states, three tabs, and which exercises each tab lists.
import type { ContentList, ContentRecord, Exercise, ImageItem, RecordItem } from '@/lib/adminApi'

export type ItemKind = 'picture' | 'cues' | 'videos'
export type ItemState = 'review' | 'going_out' | 'sent_back' | 'published'
export type Tab = 'review' | 'going_out' | 'published'
export const TABS: Tab[] = ['review', 'going_out', 'published']

const RECORD_KIND: Record<Exclude<ItemKind, 'picture'>, string> = { cues: 'cues', videos: 'youtube' }

export const recordOf = (e: Exercise, kind: Exclude<ItemKind, 'picture'>): RecordItem<ContentRecord> | undefined =>
  e.records.find((r) => r.record.kind === RECORD_KIND[kind])

/** A record's state. A draft the owner rejected waits for its next attempt: sent back. */
export function recordState(r: RecordItem): ItemState {
  if (r.needsReview) return 'review'
  if (r.status === 'approved') return 'going_out'
  if (r.status === 'published') return 'published'
  return 'sent_back'
}

/**
 * The picture's state: a draft candidate needs review; otherwise the approved one
 * is going out until its `image` record is published. Null when there is no picture.
 */
export function pictureState(images: ImageItem[], record: RecordItem | undefined): ItemState | null {
  if (images.some((i) => i.status === 'draft')) return 'review'
  if (!images.some((i) => i.status === 'approved')) return null
  if (!record) throw new Error('An approved picture has no image record')
  return record.status === 'published' ? 'published' : 'going_out'
}

export const isTransparent = (c: ImageItem): boolean => c.source !== null

/** One picture to decide: a transparent copy with its dark source when both wait, else a single candidate. */
export interface PictureCard {
  shown: ImageItem
  source: ImageItem | null
}

/** Pairs each transparent copy with the source it names; the API approves the copy for either (images.ts pairOf). */
export function pictureCards(candidates: ImageItem[]): PictureCard[] {
  const sourceOf = (c: ImageItem) => candidates.find((s) => s.sha256 === c.source) ?? null
  const paired = new Set(candidates.map(sourceOf).filter((s): s is ImageItem => s !== null))
  return candidates.filter((c) => !paired.has(c)).map((c) => ({ shown: c, source: sourceOf(c) }))
}

export function itemStates(e: Exercise): Partial<Record<ItemKind, ItemState>> {
  const states: Partial<Record<ItemKind, ItemState>> = {}
  const picture = pictureState(e.images, e.records.find((r) => r.record.kind === 'image'))
  if (picture) states.picture = picture
  for (const kind of ['cues', 'videos'] as const) {
    const r = recordOf(e, kind)
    if (r) states[kind] = recordState(r)
  }
  return states
}

const has = (e: Exercise, state: ItemState): boolean => Object.values(itemStates(e)).includes(state)
export const needsReview = (e: Exercise): boolean => has(e, 'review')

/** Which exercises a tab lists. Published lists exercises that are wholly live. */
export function inTab(e: Exercise, tab: Tab): boolean {
  if (tab === 'review') return has(e, 'review') || has(e, 'sent_back')
  if (tab === 'going_out') return has(e, 'going_out')
  const states = Object.values(itemStates(e))
  return states.length > 0 && states.every((s) => s === 'published')
}

/**
 * The tabs' lists as they stood at load or at the last tab switch: deciding never
 * reorders or removes a card, and the counts change only on the next snapshot.
 */
export interface Snapshot {
  tabs: Record<Tab, string[]>
  /** The exercises that needed review: the batch, and the progress readout's denominator. */
  toReview: string[]
}

export function snapshot(content: ContentList): Snapshot {
  const ids = (keep: (e: Exercise) => boolean) => content.exercises.filter(keep).map((e) => e.identity)
  return {
    tabs: { review: ids((e) => inTab(e, 'review')), going_out: ids((e) => inTab(e, 'going_out')), published: ids((e) => inTab(e, 'published')) },
    toReview: ids(needsReview),
  }
}

/** The exercise an item id (`<identity>|picture`, or a record key `<identity>|<kind>`) belongs to. */
export const identityOf = (itemId: string): string => itemId.slice(0, itemId.lastIndexOf('|'))

/**
 * Records the next Publish sends, by the page's own count (the dry run is authoritative). Counted
 * from the records, so a withdrawn live picture (an approved image record with no frames) counts.
 */
export const goingOutCount = (content: ContentList): number =>
  content.exercises.reduce((n, e) => n + e.records.filter((r) => r.status === 'approved').length, 0)
