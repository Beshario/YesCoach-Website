// Client for the image routes of the YesCoach content API (YesCoachReact
// workers/content-api/src/images.ts). Every call carries the signed-in user's
// Firebase ID token; the API decides who is an admin.
export const API_URL = 'https://yescoach-api.zbeshapps.workers.dev'
export const CDN_URL = 'https://content.yescoach.fit'

export const STATUSES = ['draft', 'approved', 'rejected'] as const
export type Status = (typeof STATUSES)[number]

/** The local image-checker's verdict against the heat map (YesCoachReact runbook CONTENT_API_DEPLOY.md §11.1). */
export interface Check {
  verdict: 'match' | 'mismatch'
  note: string
  by: string
  at: string
}

export interface Candidate {
  identity: string
  sha256: string
  model: string
  promptVersion: string
  status: Status
  alt: string
  w: number
  h: number
  bytes: number
  createdAt: string
  updatedAt: string
  check: Check | null
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

export const imageUrl = (sha256: string): string => `${CDN_URL}/img/${sha256}.webp`
/** The heat-map reference the picture was generated from (R2 refs/, served by the CDN). */
export const mapUrl = (identity: string): string => `${CDN_URL}/refs/maps/${encodeURIComponent(identity)}.png`

const candidatePath = (identity: string): string => `/v1/admin/images/${encodeURIComponent(identity)}/candidates`

async function call<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...init.headers },
  })
  const body = await res.json()
  if (!res.ok) throw new ApiError(res.status, body)
  return body as T
}

export async function listCandidates(token: string, status: Status): Promise<Candidate[]> {
  const { items } = await call<{ items: Candidate[] }>(token, `/v1/admin/images?status=${status}`)
  return items
}

export function reviewCandidate(token: string, identity: string, sha256: string, decision: 'approve' | 'reject') {
  return call(token, `${candidatePath(identity)}/${sha256}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ decision }),
  })
}

export function uploadCandidate(token: string, identity: string, file: File, meta: UploadMeta) {
  const query = new URLSearchParams({ ...meta })
  return call(token, `${candidatePath(identity)}?${query}`, {
    method: 'POST',
    headers: { 'Content-Type': 'image/webp' },
    body: file,
  })
}
