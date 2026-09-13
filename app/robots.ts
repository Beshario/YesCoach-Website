import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

/**
 * Retrieval bots (answer engines citing us live) and training bots (corpora
 * that shape what models know about YesCoach) are both allowed. We want to be
 * cited AND to be known. The "block training, allow retrieval" split is a
 * publisher-monetization stance and does not apply to a free app that gains
 * from discovery.
 *
 * They are named explicitly rather than left to the `*` rule so a future
 * per-bot decision is a one-line edit instead of a rewrite.
 *
 * /cdn-cgi/ is Cloudflare's email-obfuscation path. Google 404s on it.
 */
const AI_CRAWLERS = [
  // Retrieval: fetch a page at answer time and cite it
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Claude-SearchBot',
  'Claude-User',
  // Training: crawl for model corpora
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'CCBot',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'meta-externalagent',
  'Bytespider',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/cdn-cgi/',
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: '/cdn-cgi/',
      })),
    ],
    sitemap: 'https://yescoach.fit/sitemap.xml',
    host: 'https://yescoach.fit',
  }
}
