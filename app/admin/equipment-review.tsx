// Equipment sheets (YesCoachReact runbook CONTENT_API_DEPLOY.md §11.3): one card per equipment key,
// each draft beside the style reference with the image-checker's verdict, and the decision.
// Approving copies the sheet to refs/equipment/<key>.webp, where exercise pictures read it; it never
// reaches phones, so there is no Publish. An approved sheet is replaced by approving another.
import { useCallback, useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { Check, X } from 'lucide-react'
import { STYLE_URL, imageUrl, listSheets, reviewCandidate } from '@/lib/adminApi'
import type { SheetCandidate } from '@/lib/adminApi'
import { Decide, ItemError, useReview } from './parts'

const img = 'w-full h-auto aspect-square rounded-md border border-border bg-background'
const keyOf = (identity: string): string => identity.slice('equipment:'.length)

function Verdict({ check }: { check: SheetCandidate['check'] }) {
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

function Draft({ candidate, refresh }: { candidate: SheetCandidate; refresh: () => Promise<void> }) {
  const { run } = useReview()
  const key = keyOf(candidate.identity)
  const id = `${candidate.identity}|sheet-${candidate.sha256}`
  const decide = async (decision: { decision: 'approve' } | { decision: 'reject'; note: string }) => {
    const ok = await run(id, (token) => reviewCandidate(token, candidate.identity, candidate.sha256, decision))
    if (ok) await refresh()
    return ok
  }
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 lg:max-w-[616px]">
        <figure className="space-y-1">
          <img src={imageUrl(candidate.sha256)} alt={candidate.alt} width={candidate.w} height={candidate.h} className={img} />
          <figcaption className="text-xs text-muted-foreground">Sheet</figcaption>
        </figure>
        <figure className="space-y-1">
          <img src={STYLE_URL} alt="Style reference" width={1024} height={1024} className={img} />
          <figcaption className="text-xs text-muted-foreground">Style</figcaption>
        </figure>
      </div>
      <Verdict check={candidate.check} />
      <Decide
        id={id}
        name={`sheet, ${key}`}
        state="review"
        onApprove={() => void decide({ decision: 'approve' })}
        onReject={(note) => decide({ decision: 'reject', note })}
      />
      <ItemError id={id} />
    </div>
  )
}

function KeyCard({ keyName, candidates, refresh }: { keyName: string; candidates: SheetCandidate[]; refresh: () => Promise<void> }) {
  const drafts = candidates.filter((c) => c.status === 'draft')
  const inUse = candidates.find((c) => c.status === 'approved')
  return (
    <section aria-label={keyName} className="space-y-3 rounded-lg border border-border bg-card p-4">
      <h2 className="text-base font-semibold">{keyName}</h2>
      {inUse && (
        <figure className="space-y-1 lg:max-w-[300px]">
          <img src={imageUrl(inUse.sha256)} alt={inUse.alt} width={inUse.w} height={inUse.h} className={img} />
          <figcaption className="text-xs text-muted-foreground">In use</figcaption>
        </figure>
      )}
      {drafts.map((c) => (
        <Draft key={c.sha256} candidate={c} refresh={refresh} />
      ))}
    </section>
  )
}

/** The Equipment tab: keys with a draft first, then keys with only an approved sheet. */
export default function EquipmentReview({ user }: { user: User }) {
  const [items, setItems] = useState<SheetCandidate[] | null>(null)
  const [failed, setFailed] = useState<string | null>(null)
  const refresh = useCallback(async () => {
    try {
      setItems((await listSheets(await user.getIdToken())).items.filter((c) => c.status !== 'rejected'))
      setFailed(null)
    } catch (err) {
      setFailed(err instanceof Error ? err.message : String(err))
    }
  }, [user])
  useEffect(() => {
    void refresh()
  }, [refresh])

  if (failed) {
    return (
      <p role="alert" className="text-sm text-destructive">
        Couldn&apos;t load sheets: {failed}
      </p>
    )
  }
  if (!items) return <div aria-hidden className="h-28 rounded-lg border border-border bg-card motion-safe:animate-pulse" />
  const byKey = new Map<string, SheetCandidate[]>()
  for (const c of items) byKey.set(keyOf(c.identity), [...(byKey.get(keyOf(c.identity)) ?? []), c])
  const keys = [...byKey.keys()].sort((a, b) => {
    const waiting = (k: string) => (byKey.get(k)!.some((c) => c.status === 'draft') ? 0 : 1)
    return waiting(a) - waiting(b) || a.localeCompare(b)
  })
  if (keys.length === 0) return <p className="py-8 text-center text-muted-foreground">No sheets yet</p>
  return (
    <div className="space-y-4">
      {keys.map((k) => (
        <KeyCard key={k} keyName={k} candidates={byKey.get(k)!} refresh={refresh} />
      ))}
    </div>
  )
}
