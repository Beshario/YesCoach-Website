// Client for the admin routes of the YesCoach content API (YesCoachReact
// workers/content-api/src: content.ts, records.ts, images.ts, publish.ts).
// Every call carries the signed-in user's Firebase ID token; the API decides
// who is an admin.
export const API_URL = 'https://yescoach-api.zbeshapps.workers.dev'
export const CDN_URL = 'https://content.yescoach.fit'

/** The local image-checker's verdict against the heat map (YesCoachReact runbook CONTENT_API_DEPLOY.md §11.1). */
export interface Check {
  verdict: 'match' | 'mismatch'
  note: string
  by: string
  at: string
}

/** The latest thing that happened to an item (content.ts History). */
export interface History {
  action: 'approve' | 'reject' | 'edit' | 'reset' | 'update'
  by: 'owner' | 'agent' | 'seed' | 'migration'
  at: string
  note: string | null
}

export interface ImageItem {
  sha256: string
  status: 'draft' | 'approved'
  alt: string
  w: number
  h: number
  bytes: number
  model: string
  promptVersion: string
  check: Check | null
  needsReview: boolean
  history: History
}

export type RecordStatus = 'draft' | 'in_review' | 'approved' | 'published'

export interface Cues {
  setup: string[]
  execution: string[]
}

export interface YoutubeLink {
  videoId: string
  format: 'short' | 'video'
  startSec: number
  sourceId: string
  title: string
  language: string
}

export interface Source {
  id: string
  name: string
  channelId: string
  type: 'creator' | 'institution'
  partner: boolean
  language: string
  emoji: string
}

export interface RecordItem<R = unknown> {
  section: 'content' | 'sources'
  key: string
  status: RecordStatus
  record: R
  publishedIn: number | null
  needsReview: boolean
  history: History
}

export type ContentRecord = { identity: string; kind: string; version: number; body: Record<string, unknown> }

export interface Exercise {
  identity: string
  images: ImageItem[]
  records: RecordItem<ContentRecord>[]
}

export interface ContentList {
  exercises: Exercise[]
  sources: RecordItem<Source>[]
}

export interface PublishItem {
  section: 'implements' | 'content' | 'sources'
  key: string
}

export interface PublishResult {
  manifestVersion: number
  items: PublishItem[]
}

export interface UploadMeta {
  model: string
  promptVersion: string
  alt: string
}

/** A non-2xx answer: the HTTP status and the API's error body. */
export class ApiError extends Error {
  constructor(readonly status: number, readonly body: unknown) {
    super(`${status} ${JSON.stringify(body)}`)
  }
}

/** Why the API refused, in its own words: publish's problems, the validator's problem, or the error code. */
export function refusal(err: ApiError): string {
  const body = err.body as { error?: string; problems?: string[]; problem?: string }
  return body.problems?.join('; ') ?? body.problem ?? body.error ?? err.message
}

export const imageUrl = (sha256: string): string => `${CDN_URL}/img/${sha256}.webp`
/** The heat-map reference the picture was generated from (R2 refs/, served by the CDN). */
export const mapUrl = (identity: string): string => `${CDN_URL}/refs/maps/${encodeURIComponent(identity)}.png`

const candidatePath = (identity: string): string => `/v1/admin/images/${encodeURIComponent(identity)}/candidates`
const jsonInit = (body: unknown): RequestInit => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

async function call<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...init.headers },
  })
  const body = await res.json()
  if (!res.ok) throw new ApiError(res.status, body)
  return body as T
}

export function listContent(token: string): Promise<ContentList> {
  return call<ContentList>(token, '/v1/admin/content')
}

/** The owner's edit: approved and published at once. A publish refusal is an ApiError and nothing is saved. */
export function editContent(token: string, identity: string, kind: 'cues' | 'youtube', body: Cues | { links: YoutubeLink[] }) {
  return call<PublishResult>(token, `/v1/admin/content/${encodeURIComponent(identity)}/${kind}`, jsonInit({ body }))
}

export function reviewRecord(token: string, section: 'content' | 'sources', key: string, decision: 'approve' | 'reject') {
  return call(token, `/v1/admin/records/${section}/${encodeURIComponent(key)}/review`, jsonInit({ decision }))
}

export function reviewCandidate(token: string, identity: string, sha256: string, decision: 'approve' | 'reject') {
  return call(token, `${candidatePath(identity)}/${sha256}/review`, jsonInit({ decision }))
}

export function publish(token: string, dryRun: boolean) {
  return call<PublishResult>(token, `/v1/admin/publish${dryRun ? '?dryRun=1' : ''}`, { method: 'POST' })
}

export function uploadCandidate(token: string, identity: string, file: File, meta: UploadMeta) {
  const query = new URLSearchParams({ ...meta })
  return call(token, `${candidatePath(identity)}?${query}`, {
    method: 'POST',
    headers: { 'Content-Type': 'image/webp' },
    body: file,
  })
}
