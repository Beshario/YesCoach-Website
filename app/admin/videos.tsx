// An exercise's YouTube links: open each for review, approve or reject the set, or edit in place (saved for the next Publish).
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { editContent, reviewRecord } from '@/lib/adminApi'
import type { ContentRecord, RecordItem, Source, YoutubeLink } from '@/lib/adminApi'
import { parseYoutubeUrl, youtubeUrl } from '@/lib/youtube'
import { Decide, ItemState, reviewable, saveEdit } from './parts'
import type { Run } from './parts'

const field = 'h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground'

interface LinkDraft {
  title: string
  url: string
  sourceId: string
}

/** The links an edit sends: each URL parsed, each language its source's. Throws, naming the link, when one is not usable. */
function linksOf(drafts: LinkDraft[], sources: Map<string, Source>): YoutubeLink[] {
  return drafts.map((d, i) => {
    const clip = parseYoutubeUrl(d.url)
    if (!clip) throw new Error(`Not saved: link ${i + 1} is not a YouTube URL`)
    const source = sources.get(d.sourceId)
    if (!source) throw new Error(`Not saved: link ${i + 1} has no source`)
    return { ...clip, sourceId: source.id, title: d.title.trim(), language: source.language }
  })
}

export default function Videos({
  identity,
  item,
  sources,
  busy,
  run,
}: {
  identity: string
  item: RecordItem<ContentRecord> | undefined
  sources: Map<string, Source>
  busy: boolean
  run: Run
}) {
  const links = (item?.record.body.links ?? []) as YoutubeLink[]
  const [draft, setDraft] = useState<LinkDraft[] | null>(null)

  const change = (i: number, patch: Partial<LinkDraft>) => setDraft((d) => d && d.map((l, j) => (j === i ? { ...l, ...patch } : l)))

  async function save() {
    if (!draft) return
    const ok = await run(async (token) => saveEdit(editContent(token, identity, 'youtube', { links: linksOf(draft, sources) })))
    if (ok) setDraft(null)
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Videos</h3>
        {!draft && (
          <Button
            variant="ghost"
            className="h-11"
            disabled={busy}
            onClick={() => setDraft(links.map((l) => ({ title: l.title, url: youtubeUrl(l), sourceId: l.sourceId })))}
          >
            Edit
          </Button>
        )}
      </div>
      {item && <ItemState status={item.status} history={item.history} needsReview={item.needsReview} />}

      {draft ? (
        <>
          {draft.map((l, i) => (
            <fieldset key={i} className="space-y-2 rounded-md border border-border p-2">
              <label className="block space-y-1 text-xs">
                <span>Title</span>
                <input value={l.title} onChange={(e) => change(i, { title: e.target.value })} className={field} />
              </label>
              <label className="block space-y-1 text-xs">
                <span>YouTube URL</span>
                <input value={l.url} inputMode="url" onChange={(e) => change(i, { url: e.target.value })} className={field} />
              </label>
              <label className="block space-y-1 text-xs">
                <span>Source</span>
                <select value={l.sourceId} onChange={(e) => change(i, { sourceId: e.target.value })} className={field}>
                  <option value="" disabled>
                    Source
                  </option>
                  {[...sources.values()].map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.emoji} {s.name}
                    </option>
                  ))}
                </select>
              </label>
              <Button variant="outline" className="h-11 w-full" onClick={() => setDraft(draft.filter((_, j) => j !== i))}>
                Remove
              </Button>
            </fieldset>
          ))}
          <Button variant="ghost" className="h-11" onClick={() => setDraft([...draft, { title: '', url: '', sourceId: '' }])}>
            Add video
          </Button>
          <div className="flex gap-2">
            <Button className="h-11 flex-1" disabled={busy} onClick={() => void save()}>
              Save
            </Button>
            <Button variant="outline" className="h-11 flex-1" disabled={busy} onClick={() => setDraft(null)}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <ul className="space-y-2 text-sm">
            {links.map((l) => {
              const source = sources.get(l.sourceId)
              return (
                <li key={l.videoId}>
                  <a href={youtubeUrl(l)} target="_blank" rel="noopener" className="font-medium underline underline-offset-4">
                    {l.title}
                  </a>
                  <span className="block text-xs text-muted-foreground">
                    {source ? `${source.emoji} ${source.name}` : l.sourceId} · {l.format}
                    {l.startSec > 0 && ` · ${l.startSec}s`}
                  </span>
                </li>
              )
            })}
          </ul>
          {item && reviewable(item.status) && (
            <Decide
              busy={busy}
              onApprove={() => void run((token) => reviewRecord(token, 'content', item.key, { decision: 'approve' }))}
              onReject={(note) => run((token) => reviewRecord(token, 'content', item.key, { decision: 'reject', note }))}
            />
          )}
        </>
      )}
    </section>
  )
}
