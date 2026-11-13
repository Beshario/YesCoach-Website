// A curated link's YouTube URL, both ways (YesCoachReact ContentRecord.ts
// YoutubeLink: a short opens at 0, a video at startSec).
import type { YoutubeLink } from '@/lib/adminApi'

export type Clip = Pick<YoutubeLink, 'videoId' | 'format' | 'startSec'>

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/

export function youtubeUrl(clip: Clip): string {
  if (clip.format === 'short') return `https://www.youtube.com/shorts/${clip.videoId}`
  return `https://www.youtube.com/watch?v=${clip.videoId}${clip.startSec > 0 ? `&t=${clip.startSec}s` : ''}`
}

/** Seconds from a `t` value: 90, 90s, 1m30s, 1h2m3s. */
function seconds(t: string | null): number | null {
  if (!t) return 0
  const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/.exec(t)
  if (!match) return null
  const [, h, m, s] = match
  return Number(h ?? 0) * 3600 + Number(m ?? 0) * 60 + Number(s ?? 0)
}

/** The clip a pasted URL names, or null when it names none. */
export function parseYoutubeUrl(raw: string): Clip | null {
  let url: URL
  try {
    url = new URL(raw.trim())
  } catch {
    return null
  }
  const host = url.hostname.replace(/^(www\.|m\.)/, '')
  let videoId: string | undefined
  let format: Clip['format'] = 'video'
  if (host === 'youtu.be') {
    videoId = url.pathname.slice(1)
  } else if (host === 'youtube.com') {
    const short = /^\/shorts\/([^/]+)/.exec(url.pathname)
    if (short) {
      videoId = short[1]
      format = 'short'
    } else if (url.pathname === '/watch') {
      videoId = url.searchParams.get('v') ?? undefined
    }
  }
  if (!videoId || !VIDEO_ID.test(videoId)) return null
  if (format === 'short') return { videoId, format, startSec: 0 }
  const startSec = seconds(url.searchParams.get('t') ?? url.searchParams.get('start'))
  return startSec === null ? null : { videoId, format, startSec }
}
