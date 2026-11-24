import catalog from '@/lib/exerciseCatalog.json'

export const dynamic = 'force-static'

/**
 * /ai/exercises.json: every exercise id an AI may use in a YesCoach plan, as
 * [{id, name, kind}], for agents that fetch. It is lib/exerciseCatalog.json,
 * the list the /ai prompt is built from, so the two never differ. The
 * yescoach-api MCP route (YesCoachReact workers/content-api/src/mcp/site.ts)
 * reads this file; changing its shape breaks that reader.
 */
export function GET() {
  return new Response(JSON.stringify(catalog), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
