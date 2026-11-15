'use client'

// The owner's content review (YesCoachReact docs/design/ADMIN_REVIEW_PAGE.md): three tabs, one card
// per exercise in a stable order, each decision saved for its own item while the rest of the page
// stays live, and one deliberate Publish from the bar at the foot.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebaseWeb'
import { ApiError, listContent, publish, refusal } from '@/lib/adminApi'
import type { ContentList, Exercise } from '@/lib/adminApi'
import { TABS, goingOutCount, identityOf, needsReview, snapshot } from './model'
import type { Snapshot, Tab } from './model'
import { TAB_LABELS, couldntSave, doneLine, exerciseName, progressLine } from './labels'
import { Review } from './parts'
import type { ReviewState } from './parts'
import ExerciseCard, { cardHeadingId } from './exercise-card'
import PublishSheet from './publish-sheet'
import EquipmentReview from './equipment-review'
import type { SheetState } from './publish-sheet'

/** The content tabs, then Equipment: sheets the exercise pictures are drawn with, outside Publish. */
type View = Tab | 'equipment'
const VIEWS: View[] = [...TABS, 'equipment']
const VIEW_LABELS: Record<View, string> = { ...TAB_LABELS, equipment: 'Equipment' }

type Load = { state: 'loading' } | { state: 'forbidden' } | { state: 'failed'; message: string } | { state: 'ready'; content: ContentList; snap: Snapshot }

const reason = (err: unknown): string => (err instanceof ApiError ? refusal(err) : err instanceof Error ? err.message : String(err))

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 h-14 border-b border-border/70 bg-background">
        <div className="mx-auto flex h-full max-w-6xl items-center gap-2 px-4 sm:px-6">
          <img src="/logo.png" alt="" className="h-5 w-auto" />
          <h1 className="text-base font-semibold tracking-tight">Content</h1>
        </div>
      </header>
      {children}
    </div>
  )
}

function Skeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div aria-hidden className="space-y-3">
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="h-28 rounded-lg border border-border bg-card motion-safe:animate-pulse" />
      ))}
    </div>
  )
}

function SignedOut() {
  const [error, setError] = useState<string | null>(null)
  return (
    <main className="mx-auto max-w-6xl space-y-3 px-4 py-8 sm:px-6">
      <Button className="h-11" onClick={() => void signInWithPopup(auth, new GoogleAuthProvider()).catch((err) => setError(reason(err)))}>
        Sign in with Google
      </Button>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </main>
  )
}

export default function ContentReview() {
  // undefined until Firebase reports the session, null when signed out.
  const [user, setUser] = useState<User | null | undefined>(undefined)
  useEffect(() => onAuthStateChanged(auth, setUser), [])

  if (user === undefined) {
    return (
      <Shell>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <Skeleton />
        </main>
      </Shell>
    )
  }
  return <Shell>{user ? <Signed user={user} /> : <SignedOut />}</Shell>
}

function Signed({ user }: { user: User }) {
  const [load, setLoad] = useState<Load>({ state: 'loading' })
  const [tab, setTab] = useState<View>('review')
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState<Set<string>>(new Set())
  const [errors, setErrors] = useState<Map<string, string>>(new Map())
  const [rejectOpen, setRejectOpen] = useState<string | null>(null)
  const [notes, setNotes] = useState<Map<string, string>>(new Map())
  // A card the owner opened or closed by hand stays that way.
  const [toggled, setToggled] = useState<Map<string, boolean>>(new Map())
  const [live, setLive] = useState('')
  const [sheet, setSheet] = useState<SheetState | null>(null)
  const [published, setPublished] = useState<string | null>(null)
  const [focusNext, setFocusNext] = useState<string | null>(null)
  const tabRefs = useRef<Record<View, HTMLButtonElement | null>>({ review: null, going_out: null, published: null, equipment: null })

  const fetchList = useCallback(async () => listContent(await user.getIdToken()), [user])

  const loadAll = useCallback(async () => {
    setLoad({ state: 'loading' })
    try {
      const content = await fetchList()
      setLoad({ state: 'ready', content, snap: snapshot(content) })
    } catch (err) {
      setLoad(err instanceof ApiError && err.status === 403 ? { state: 'forbidden' } : { state: 'failed', message: reason(err) })
    }
  }, [fetchList])

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  useEffect(() => {
    if (!focusNext) return
    const target = document.getElementById(focusNext)
    target?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    target?.focus({ preventScroll: true })
    setFocusNext(null)
  }, [focusNext])

  const content = load.state === 'ready' ? load.content : null
  const snap = load.state === 'ready' ? load.snap : null
  const byId = useMemo(() => new Map((content?.exercises ?? []).map((e) => [e.identity, e])), [content])
  const sources = useMemo(() => new Map((content?.sources ?? []).map((s) => [s.record.id, s.record])), [content])

  /** When an item's decision finishes its card's review: announce it and move to the next card that still needs review. */
  function advance(before: Exercise | undefined, next: ContentList, identity: string, snap: Snapshot) {
    const after = next.exercises.find((e) => e.identity === identity)
    if (tab !== 'review' || !before || !needsReview(before) || (after && needsReview(after)) || toggled.get(identity)) return
    const pending = new Set(next.exercises.filter(needsReview).map((e) => e.identity))
    const done = snap.toReview.filter((id) => !pending.has(id)).length
    setLive(doneLine(exerciseName(identity), done, snap.toReview.length))
    const order = snap.toReview
    const nextId = [...order.slice(order.indexOf(identity) + 1), ...order].find((id) => pending.has(id))
    if (nextId) setFocusNext(cardHeadingId(nextId))
  }

  const review: ReviewState = {
    run: async (id, action) => {
      if (load.state !== 'ready') throw new Error('An item action ran before the list loaded')
      setSaving((s) => new Set(s).add(id))
      setErrors((m) => {
        const copy = new Map(m)
        copy.delete(id)
        return copy
      })
      try {
        await action(await user.getIdToken())
      } catch (err) {
        setErrors((m) => new Map(m).set(id, err instanceof ApiError ? couldntSave(refusal(err)) : reason(err)))
        setSaving((s) => {
          const copy = new Set(s)
          copy.delete(id)
          return copy
        })
        return false
      }
      try {
        const next = await fetchList()
        const identity = identityOf(id)
        advance(byId.get(identity), next, identity, load.snap)
        setLoad({ state: 'ready', content: next, snap: load.snap })
      } catch (err) {
        setLoad({ state: 'failed', message: reason(err) })
      } finally {
        setSaving((s) => {
          const copy = new Set(s)
          copy.delete(id)
          return copy
        })
      }
      return true
    },
    saving: (id) => saving.has(id),
    error: (id) => errors.get(id) ?? null,
    rejectOpen,
    setRejectOpen,
    note: (id) => notes.get(id) ?? '',
    setNote: (id, text) => setNotes((m) => new Map(m).set(id, text)),
  }

  function selectTab(next: View) {
    setTab(next)
    if (content) setLoad({ state: 'ready', content, snap: snapshot(content) })
  }

  function onTabKey(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = VIEWS[(VIEWS.indexOf(tab) + step + VIEWS.length) % VIEWS.length]
    selectTab(next)
    tabRefs.current[next]?.focus()
  }

  async function openPublish() {
    setPublished(null)
    try {
      const { items } = await publish(await user.getIdToken(), true)
      setSheet({ items, error: null, publishing: false })
    } catch (err) {
      setSheet({ items: null, error: reason(err), publishing: false })
    }
  }

  async function publishNow() {
    if (!sheet) throw new Error('Publish now with no sheet open')
    setSheet({ ...sheet, error: null, publishing: true })
    let version: number
    try {
      version = (await publish(await user.getIdToken(), false)).manifestVersion
    } catch (err) {
      setSheet({ ...sheet, error: reason(err), publishing: false })
      return
    }
    setSheet(null)
    setPublished(`Published v${version}`)
    try {
      const next = await fetchList()
      setLoad((l) => (l.state === 'ready' ? { ...l, content: next } : l))
    } catch (err) {
      setLoad({ state: 'failed', message: reason(err) })
    }
  }

  if (load.state === 'forbidden') {
    return (
      <main className="mx-auto max-w-6xl space-y-3 px-4 py-8 sm:px-6">
        <p>This account can&apos;t review content.</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <Button variant="outline" className="h-11" onClick={() => void signOut(auth)}>
          Sign out
        </Button>
      </main>
    )
  }

  const counts = snap ? TABS.map((t) => snap.tabs[t].length) : null
  const goingOut = content ? goingOutCount(content) : 0
  const pending = content ? new Set(content.exercises.filter(needsReview).map((e) => e.identity)) : new Set<string>()
  const done = snap ? snap.toReview.filter((id) => !pending.has(id)).length : 0
  const query = search.trim().toLowerCase()
  const listed = (snap && tab !== 'equipment' ? snap.tabs[tab] : [])
    .map((id) => byId.get(id))
    .filter((e): e is Exercise => e !== undefined)
    .filter((e) => tab !== 'published' || !query || e.identity.toLowerCase().includes(query) || exerciseName(e.identity).toLowerCase().includes(query))
  const batch = tab === 'review' && snap ? listed.filter((e) => snap.toReview.includes(e.identity)) : listed
  const sentBack = tab === 'review' && snap ? listed.filter((e) => !snap.toReview.includes(e.identity)) : []
  const isOpen = (e: Exercise) => toggled.get(e.identity) ?? (tab === 'review' && needsReview(e))
  const card = (e: Exercise) => (
    <ExerciseCard
      key={e.identity}
      exercise={e}
      sources={sources}
      open={isOpen(e)}
      onToggle={() => setToggled((m) => new Map(m).set(e.identity, !isOpen(e)))}
    />
  )

  return (
    <Review.Provider value={review}>
      <p aria-live="polite" className="sr-only">
        {live}
      </p>
      <main className="mx-auto max-w-6xl space-y-4 px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-4 sm:px-6">
        <div role="tablist" aria-label="Content" className="flex gap-1 border-b border-border" onKeyDown={onTabKey}>
          {VIEWS.map((t, i) => (
            <button
              key={t}
              ref={(el) => {
                tabRefs.current[t] = el
              }}
              id={`tab-${t}`}
              role="tab"
              type="button"
              aria-selected={tab === t}
              aria-controls="tab-panel"
              aria-label={counts && i < counts.length ? `${VIEW_LABELS[t]}, ${counts[i]}` : VIEW_LABELS[t]}
              tabIndex={tab === t ? 0 : -1}
              onClick={() => selectTab(t)}
              className={`-mb-px min-h-11 border-b-2 px-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3 ${
                tab === t ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'
              }`}
            >
              {VIEW_LABELS[t]}
              {counts && i < counts.length && <span className="ml-1.5 tabular-nums">{counts[i]}</span>}
            </button>
          ))}
        </div>

        <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="space-y-4">
          {tab === 'published' && content && (
            <input
              type="search"
              value={search}
              aria-label="Search exercises"
              placeholder="Search exercises"
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
            />
          )}
          {load.state === 'loading' && <Skeleton />}
          {load.state === 'failed' && (
            <div role="alert" className="space-y-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4">
              <p className="text-sm">Couldn&apos;t load content.</p>
              <p className="text-xs text-muted-foreground">{load.message}</p>
              <Button variant="outline" className="h-11" onClick={() => void loadAll()}>
                Try again
              </Button>
            </div>
          )}
          {tab === 'equipment' && <EquipmentReview user={user} />}
          {content && tab !== 'equipment' && listed.length === 0 && (
            <div className="space-y-3 py-8 text-center">
              <p className="text-muted-foreground">
                {tab === 'review' ? 'Nothing to review' : tab === 'going_out' ? 'Nothing going out' : query ? 'No matches' : 'Nothing published'}
              </p>
              {tab === 'review' && goingOut > 0 && (
                <Button variant="outline" className="h-11" onClick={() => selectTab('going_out')}>
                  Going out
                </Button>
              )}
            </div>
          )}
          {batch.map(card)}
          {sentBack.length > 0 && (
            <details className="space-y-3">
              <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold">
                Sent back <span className="ml-1.5 tabular-nums text-muted-foreground">{sentBack.length}</span>
              </summary>
              <div className="space-y-3 pt-2">{sentBack.map(card)}</div>
            </details>
          )}
        </div>

        <footer className="pt-8">
          <button type="button" className="min-h-11 text-sm text-muted-foreground underline underline-offset-4" onClick={() => void signOut(auth)}>
            Sign out
          </button>
        </footer>
      </main>

      {content && snap && tab !== 'published' && tab !== 'equipment' && (
        <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-background pb-[env(safe-area-inset-bottom)]">
          <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
            <p role="status" className="text-sm">
              {published ?? (snap.toReview.length > 0 ? progressLine(done, snap.toReview.length) : '')}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{goingOut > 0 ? `Going out ${goingOut}` : 'Nothing going out'}</span>
              <Button className="h-11" disabled={goingOut === 0 || sheet !== null} onClick={() => void openPublish()}>
                Publish
              </Button>
            </div>
          </div>
        </div>
      )}

      {sheet && <PublishSheet sheet={sheet} sources={sources} onPublish={() => void publishNow()} onClose={() => setSheet(null)} />}
    </Review.Provider>
  )
}
