'use client'

import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebaseWeb'
import catalog from '@/lib/exerciseCatalog.json'
import { ApiError, STATUSES, imageUrl, listCandidates, mapUrl, reviewCandidate, uploadCandidate } from '@/lib/adminApi'
import type { Candidate, Status } from '@/lib/adminApi'

const exerciseNames = new Map(catalog.map((e) => [e.id, e.name]))
const STATUS_LABELS: Record<Status, string> = { draft: 'Draft', approved: 'Approved', rejected: 'Rejected' }
const field = 'h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground'

function errorText(err: unknown): string {
  if (err instanceof ApiError && err.status === 403) return 'Not an admin'
  return err instanceof Error ? err.message : String(err)
}

function byIdentity(items: Candidate[]): [string, Candidate[]][] {
  const groups = new Map<string, Candidate[]>()
  for (const item of items) groups.set(item.identity, [...(groups.get(item.identity) ?? []), item])
  return [...groups]
}

export default function ImageReview() {
  // undefined until Firebase reports the session, null when signed out.
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [status, setStatus] = useState<Status>('draft')
  const [items, setItems] = useState<Candidate[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  const load = useCallback(async () => {
    if (!user) return
    setItems(null)
    setError(null)
    try {
      setItems(await listCandidates(await user.getIdToken(), status))
    } catch (err) {
      setError(errorText(err))
    }
  }, [user, status])

  useEffect(() => {
    void load()
  }, [load])

  async function run(action: (token: string) => Promise<unknown>) {
    if (!user) return
    setBusy(true)
    setError(null)
    try {
      await action(await user.getIdToken())
      await load()
    } catch (err) {
      setError(errorText(err))
    } finally {
      setBusy(false)
    }
  }

  function review(c: Candidate, decision: 'approve' | 'reject') {
    if (c.status === 'approved' && !window.confirm(`Withdraw the picture for ${c.identity}?`)) return
    void run((token) => reviewCandidate(token, c.identity, c.sha256, decision))
  }

  function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const text = (name: string) => String(data.get(name)).trim()
    void run(async (token) => {
      await uploadCandidate(token, text('identity'), data.get('file') as File, {
        alt: text('alt'),
        model: text('model'),
        promptVersion: text('promptVersion'),
      })
      form.reset()
      setStatus('draft')
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-5 w-auto" />
            <h1 className="text-base font-semibold tracking-tight">Images</h1>
          </div>
          {user && (
            <Button variant="outline" className="h-11" onClick={() => void signOut(auth)}>
              Sign out
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {user === null && (
          <Button className="h-11" onClick={() => void signInWithPopup(auth, new GoogleAuthProvider()).catch((err) => setError(errorText(err)))}>
            Sign in
          </Button>
        )}
        {error && (
          <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">
            {error}
          </p>
        )}

        {user && (
          <>
            <div role="group" aria-label="Status" className="inline-flex rounded-md border border-border p-1 gap-1">
              {STATUSES.map((s) => (
                <Button key={s} variant={s === status ? 'default' : 'ghost'} className="h-11" aria-pressed={s === status} onClick={() => setStatus(s)}>
                  {STATUS_LABELS[s]}
                </Button>
              ))}
            </div>

            {items === null && !error && <p className="text-muted-foreground">Loading</p>}
            {items?.length === 0 && <p className="text-muted-foreground">Nothing here</p>}
            {items &&
              byIdentity(items).map(([identity, candidates]) => (
                <section key={identity} className="space-y-3">
                  <h2 className="text-lg font-semibold">
                    {exerciseNames.get(identity) ?? identity}
                    <span className="ml-2 font-mono text-xs text-muted-foreground">{identity}</span>
                  </h2>
                  <div className="grid gap-4 lg:grid-cols-2">
                    {candidates.map((c) => (
                      <article key={c.sha256} className="rounded-lg border border-border bg-card overflow-hidden">
                        <div className="grid grid-cols-2">
                          <img src={imageUrl(c.sha256)} alt={c.alt} width={c.w} height={c.h} className="w-full h-auto aspect-square bg-muted" />
                          <img src={mapUrl(identity)} alt="Heat map" width={1024} height={1024} className="w-full h-auto aspect-square bg-muted" />
                        </div>
                        <div className="p-3 space-y-3 text-sm">
                          {c.check && (
                            <p className={c.check.verdict === 'match' ? 'text-foreground' : 'text-destructive'}>
                              <span className="font-semibold">{c.check.verdict === 'match' ? 'Matches' : "Doesn't match"}</span>
                              {' · '}
                              {c.check.note}
                            </p>
                          )}
                          <p className="text-muted-foreground">
                            {c.model} · {c.promptVersion} · {Math.round(c.bytes / 1000)} KB
                          </p>
                          <div className="flex gap-2">
                            {c.status === 'draft' && (
                              <>
                                <Button className="h-11 flex-1" disabled={busy} onClick={() => review(c, 'approve')}>
                                  Approve
                                </Button>
                                <Button variant="outline" className="h-11 flex-1" disabled={busy} onClick={() => review(c, 'reject')}>
                                  Reject
                                </Button>
                              </>
                            )}
                            {c.status === 'approved' && (
                              <Button variant="outline" className="h-11 flex-1" disabled={busy} onClick={() => review(c, 'reject')}>
                                Withdraw
                              </Button>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}

            <form onSubmit={upload} className="max-w-xl space-y-3 rounded-lg border border-border bg-card p-4">
              <h2 className="text-lg font-semibold">Upload</h2>
              <label className="block space-y-1 text-sm">
                <span>Exercise</span>
                <input name="identity" list="exercise-ids" required className={field} />
              </label>
              <datalist id="exercise-ids">
                {catalog.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </datalist>
              <label className="block space-y-1 text-sm">
                <span>Alt text</span>
                <input name="alt" required className={field} />
              </label>
              <label className="block space-y-1 text-sm">
                <span>Model</span>
                <input name="model" required className={field} />
              </label>
              <label className="block space-y-1 text-sm">
                <span>Prompt version</span>
                <input name="promptVersion" required className={field} />
              </label>
              <label className="block space-y-1 text-sm">
                <span>File</span>
                <input name="file" type="file" accept="image/webp" required className="block min-h-11 w-full text-sm" />
              </label>
              <Button type="submit" className="h-11" disabled={busy}>
                Upload
              </Button>
            </form>
          </>
        )}
      </main>
    </div>
  )
}
