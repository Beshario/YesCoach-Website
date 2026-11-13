'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebaseWeb'
import catalog from '@/lib/exerciseCatalog.json'
import { ApiError, listContent, publish, refusal, reviewRecord, uploadCandidate } from '@/lib/adminApi'
import type { ContentList, Exercise, PublishItem, Source } from '@/lib/adminApi'
import Pictures from './image-review'
import Videos from './videos'
import CuesSection from './cues'
import { exerciseName } from './labels'
import { Decide, ItemState, reviewable } from './parts'
import type { Run } from './parts'

const field = 'h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground'

function errorText(err: unknown): string {
  if (err instanceof ApiError && err.status === 403) return 'Not an admin'
  return err instanceof Error ? err.message : String(err)
}

const needsReview = (e: Exercise): boolean => e.images.some((i) => i.needsReview) || e.records.some((r) => r.needsReview)
const recordOf = (e: Exercise, kind: string) => e.records.find((r) => r.record.kind === kind)

/** What a publish item names, for the dry-run list. */
function itemName(item: PublishItem, sources: Map<string, Source>): string {
  if (item.section === 'sources') return sources.get(item.key)?.name ?? item.key
  const [identity, kind] = item.key.split('|')
  return item.section === 'content' ? `${exerciseName(identity)} · ${kind}` : item.key
}

export default function ContentReview() {
  // undefined until Firebase reports the session, null when signed out.
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [onlyReview, setOnlyReview] = useState(true)
  const [content, setContent] = useState<ContentList | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  // The dry run's list, shown before the real publish; null when the panel is closed.
  const [outgoing, setOutgoing] = useState<PublishItem[] | null>(null)

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  const load = useCallback(async () => {
    if (!user) return
    setError(null)
    try {
      setContent(await listContent(await user.getIdToken()))
    } catch (err) {
      setError(errorText(err))
    }
  }, [user])

  useEffect(() => {
    void load()
  }, [load])

  const run: Run = async (action) => {
    if (!user) return false
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      const result = await action(await user.getIdToken())
      const version = (result as { manifestVersion?: number } | null)?.manifestVersion
      if (version !== undefined) setNotice(`Published v${version}`)
      await load()
      return true
    } catch (err) {
      setError(errorText(err))
      return false
    } finally {
      setBusy(false)
    }
  }

  async function dryRun() {
    if (!user) return
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      setOutgoing((await publish(await user.getIdToken(), true)).items)
    } catch (err) {
      if (err instanceof ApiError && err.status === 409 && (err.body as { error?: string }).error === 'nothing_to_publish') setNotice('Nothing to publish')
      else setError(err instanceof ApiError && err.status !== 403 ? `Not published: ${refusal(err)}` : errorText(err))
    } finally {
      setBusy(false)
    }
  }

  async function publishNow() {
    if (await run((token) => publish(token, false))) setOutgoing(null)
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
    })
  }

  const sources = useMemo(() => new Map((content?.sources ?? []).map((s) => [s.record.id, s.record])), [content])
  const exercises = content?.exercises.filter((e) => !onlyReview || needsReview(e)) ?? []
  const sourceItems = content?.sources.filter((s) => !onlyReview || s.needsReview) ?? []

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border/70 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-5 w-auto" />
            <h1 className="text-base font-semibold tracking-tight">Content</h1>
          </div>
          {user && (
            <div className="flex gap-2">
              <Button className="h-11" disabled={busy} onClick={() => void dryRun()}>
                Publish
              </Button>
              <Button variant="outline" className="h-11" onClick={() => void signOut(auth)}>
                Sign out
              </Button>
            </div>
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
        {notice && (
          <p role="status" className="rounded-md border border-border bg-card px-4 py-3 text-sm">
            {notice}
          </p>
        )}

        {outgoing && (
          <section aria-labelledby="going-out" className="max-w-xl space-y-3 rounded-lg border border-primary bg-card p-4">
            <h2 id="going-out" className="text-lg font-semibold">
              Going out
            </h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {outgoing.map((item) => (
                <li key={`${item.section}|${item.key}`}>{itemName(item, sources)}</li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Button className="h-11 flex-1" disabled={busy} onClick={() => void publishNow()}>
                Publish now
              </Button>
              <Button variant="outline" className="h-11 flex-1" disabled={busy} onClick={() => setOutgoing(null)}>
                Cancel
              </Button>
            </div>
          </section>
        )}

        {user && (
          <>
            <div role="group" aria-label="Filter" className="inline-flex rounded-md border border-border p-1 gap-1">
              {([true, false] as const).map((only) => (
                <Button key={String(only)} variant={only === onlyReview ? 'default' : 'ghost'} className="h-11" aria-pressed={only === onlyReview} onClick={() => setOnlyReview(only)}>
                  {only ? 'Needs review' : 'All'}
                </Button>
              ))}
            </div>

            {content === null && !error && <p className="text-muted-foreground">Loading</p>}
            {content && exercises.length === 0 && sourceItems.length === 0 && <p className="text-muted-foreground">Nothing here</p>}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 items-start">
              {exercises.map((e) => (
                <article key={e.identity} className="max-w-md space-y-5 rounded-lg border border-border bg-card p-3">
                  <h2 className="text-lg font-semibold leading-tight">
                    {exerciseName(e.identity)}
                    <span className="block font-mono text-xs font-normal text-muted-foreground">{e.identity}</span>
                  </h2>
                  <Pictures identity={e.identity} images={e.images} record={recordOf(e, 'image')} busy={busy} run={run} />
                  <Videos identity={e.identity} item={recordOf(e, 'youtube')} sources={sources} busy={busy} run={run} />
                  <CuesSection identity={e.identity} item={recordOf(e, 'cues')} busy={busy} run={run} />
                </article>
              ))}
            </div>

            {sourceItems.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-lg font-semibold">Sources</h2>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 items-start">
                  {sourceItems.map((s) => (
                    <article key={s.key} className="max-w-md space-y-2 rounded-lg border border-border bg-card p-3 text-sm">
                      <a href={`https://www.youtube.com/channel/${s.record.channelId}`} target="_blank" rel="noopener" className="font-medium underline underline-offset-4">
                        {s.record.emoji} {s.record.name}
                      </a>
                      <ItemState status={s.status} history={s.history} needsReview={s.needsReview} />
                      {reviewable(s.status) && (
                        <Decide
                          busy={busy}
                          onApprove={() => void run((token) => reviewRecord(token, 'sources', s.key, { decision: 'approve' }))}
                          onReject={(note) => run((token) => reviewRecord(token, 'sources', s.key, { decision: 'reject', note }))}
                        />
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

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
