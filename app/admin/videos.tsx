// An exercise's YouTube links: open each for review, approve or reject the set, or edit in place
// (saved for the next Publish). Each link shows its creator, name and channel, the way the link
// itself is shown; the API names the creator from the video's channel when the owner saves.
import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { editContent, reviewRecord } from '@/lib/adminApi'
import type { ContentRecord, LinkInput, RecordItem, Source, YoutubeLink } from '@/lib/adminApi'
import { parseYoutubeUrl, youtubeUrl } from '@/lib/youtube'
import { recordState } from './model'
import { clock, couldntSave, opensInNewTab } from './labels'
import { Decide, ItemError, ItemHeading, SentBack, useReview } from './parts'

const field = 'h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground'
const outLink = 'inline-flex min-h-11 items-center gap-1 font-medium underline underline-offset-4'

interface LinkDraft {
  title: string
  url: string
  language: string
}

/** The links a save sends. Throws, naming the link, when a URL is not a YouTube one. */
function linksOf(drafts: LinkDraft[]): LinkInput[] {
  return drafts.map((d, i) => {
    const clip = parseYoutubeUrl(d.url)
    if (!clip) throw new Error(couldntSave(`link ${i + 1} is not a YouTube URL`))
    return { ...clip, title: d.title.trim(), language: d.language.trim() }
  })
}

function LinkRow({ link, source, name, opened, onOpen }: { link: YoutubeLink; source: Source | undefined; name: string; opened: boolean; onOpen: () => void }) {
  if (!source) throw new Error(`${name}: video ${link.videoId} names source "${link.sourceId}", which the API did not list`)
  return (
    <li>
      <a href={youtubeUrl(link)} target="_blank" rel="noopener" className={`${outLink} visited:text-muted-foreground`} aria-label={opensInNewTab(link.title)} onClick={onOpen}>
        {link.title}
        <ExternalLink aria-hidden className="size-3.5 shrink-0" />
        {opened && <span className="ml-1 rounded border border-border px-1 text-xs font-normal no-underline">Opened</span>}
      </a>
      <p className="flex flex-wrap items-center gap-x-1 text-xs text-muted-foreground">
        <a
          href={`https://www.youtube.com/channel/${source.channelId}`}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-11 items-center gap-1 text-foreground underline underline-offset-4"
          aria-label={opensInNewTab(source.name)}
        >
          {source.name}
          <ExternalLink aria-hidden className="size-3 shrink-0" />
        </a>
        <span aria-hidden>·</span>
        <span>{link.format === 'short' ? 'Short' : 'Video'}</span>
        {link.startSec > 0 && (
          <>
            <span aria-hidden>·</span>
            <span>Starts {clock(link.startSec)}</span>
          </>
        )}
      </p>
    </li>
  )
}

export default function VideosItem({ identity, name, item, sources }: { identity: string; name: string; item: RecordItem<ContentRecord>; sources: Map<string, Source> }) {
  const { run, saving } = useReview()
  const id = item.key
  const links = (item.record.body as unknown as { links: YoutubeLink[] }).links
  const state = recordState(item)
  const [draft, setDraft] = useState<LinkDraft[] | null>(null)
  // Links opened this session, so the owner sees which they have watched; never a gate on approval.
  const [opened, setOpened] = useState<Set<string>>(new Set())
  const label = `videos, ${name}`

  const change = (i: number, patch: Partial<LinkDraft>) => setDraft((d) => d && d.map((l, j) => (j === i ? { ...l, ...patch } : l)))

  async function save() {
    if (!draft) return
    if (await run(id, (token) => editContent(token, identity, 'youtube', { links: linksOf(draft) }))) {
      setDraft(null)
      document.getElementById(id)?.focus()
    }
  }

  return (
    <section aria-labelledby={id} className="space-y-3">
      <ItemHeading id={id} title="Videos" state={state}>
        {!draft && (
          <Button
            variant="ghost"
            className="h-11"
            disabled={saving(id)}
            aria-label={`Edit ${label}`}
            onClick={() => setDraft(links.map((l) => ({ title: l.title, url: youtubeUrl(l), language: l.language })))}
          >
            Edit
          </Button>
        )}
      </ItemHeading>
      {state === 'sent_back' && <SentBack item={item} />}

      {draft ? (
        <>
          {draft.map((l, i) => (
            <fieldset key={i} className="space-y-2 rounded-md border border-border p-2">
              <legend className="sr-only">Link {i + 1}</legend>
              <label className="block space-y-1 text-xs">
                <span>Title</span>
                <input value={l.title} onChange={(e) => change(i, { title: e.target.value })} className={field} />
              </label>
              <label className="block space-y-1 text-xs">
                <span>YouTube URL</span>
                <input value={l.url} inputMode="url" onChange={(e) => change(i, { url: e.target.value })} className={field} />
              </label>
              <label className="block space-y-1 text-xs">
                <span>Language</span>
                <input value={l.language} maxLength={3} onChange={(e) => change(i, { language: e.target.value })} className={field} />
              </label>
              <Button variant="outline" className="h-11 w-full" aria-label={`Remove video ${i + 1}, ${name}`} onClick={() => setDraft(draft.filter((_, j) => j !== i))}>
                Remove
              </Button>
            </fieldset>
          ))}
          <Button variant="ghost" className="h-11" onClick={() => setDraft([...draft, { title: '', url: '', language: '' }])}>
            Add video
          </Button>
          <ItemError id={id} />
          <div className="flex gap-2">
            <Button className="h-11 flex-1" disabled={saving(id)} onClick={() => void save()}>
              Save
            </Button>
            <Button variant="outline" className="h-11 flex-1" disabled={saving(id)} onClick={() => setDraft(null)}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <ul className="space-y-2 text-sm">
            {links.map((l) => (
              <LinkRow
                key={l.videoId}
                link={l}
                source={sources.get(l.sourceId)}
                name={name}
                opened={opened.has(l.videoId)}
                onOpen={() => setOpened((s) => new Set(s).add(l.videoId))}
              />
            ))}
          </ul>
          <ItemError id={id} />
          <Decide
            id={id}
            name={label}
            state={state}
            onApprove={() => void run(id, (token) => reviewRecord(token, id, { decision: 'approve' }))}
            onReject={(note) => run(id, (token) => reviewRecord(token, id, { decision: 'reject', note }))}
            // The API undoes an approval of a record not yet live (content-api src/records.ts review).
          onUndo={item.history.action === 'approve' && item.publishedIn === null ? () => void run(id, (token) => reviewRecord(token, id, { decision: 'reset' })) : undefined}
          />
        </>
      )}
    </section>
  )
}
