/**
 * Attribution-tagged Play Store install links.
 *
 * The Google Play `referrer` parameter is a URL-encoded utm string. Every
 * user-facing CTA on the site funnels through this helper so Play Console
 * install-referrer reports can distinguish where a lifter came from.
 *
 * Never hand-roll the URL at the callsite — a bare Play Store link is an
 * untracked link, which quietly zeros out that install in analytics.
 *
 * Do NOT use this for schema.org fields (downloadUrl, installUrl, sameAs) —
 * those should remain canonical.
 */

const PLAY_STORE_BASE = 'https://play.google.com/store/apps/details?id=com.yescoach.fit'

export interface PlayStoreLinkParams {
  /** Where on the site the click originated: 'home', 'blog', 'landing', 'nav', etc. */
  source: string
  /** The specific page/post/campaign, e.g. 'programs-protocols' or 'hero'. */
  campaign: string
  /** Optional position/variant tag, e.g. 'hero', 'footer', 'inline-cta'. */
  content?: string
}

export function playStoreUrl({ source, campaign, content }: PlayStoreLinkParams): string {
  const referrer = [
    `utm_source=${encodeURIComponent(source)}`,
    'utm_medium=web',
    `utm_campaign=${encodeURIComponent(campaign)}`,
    content ? `utm_content=${encodeURIComponent(content)}` : null,
  ]
    .filter(Boolean)
    .join('&')

  return `${PLAY_STORE_BASE}&referrer=${encodeURIComponent(referrer)}`
}
