/**
 * Scores an AI reply to the yescoach.fit/ai prompt the way the app's import
 * does (src/services/plan/AiPlanImportService.ts + PrescriptionResolver):
 *   - an unknown PATTERN rejects the whole file;
 *   - an id the catalog lacks is swapped for the closest exercise in the same
 *     pattern, or, when the pattern has nothing the kit allows, rejects the file;
 *   - an implement outside the chosen kit is an equipment miss (the app does
 *     not catch it today; the prompt must prevent it).
 * The swap test is an approximation (any same-pattern id the kit allows counts
 * as a possible swap); the app's nearest-match ranking is not reproduced.
 *
 * Pure: no imports, no I/O, so the app or an MCP server can reuse it as is.
 */

export interface CatalogEntry {
  id: string
  name: string
  kind: 'strength' | 'mobility'
}

export type RowOutcome = 'kept' | 'swap' | 'no_match' | 'unknown_pattern' | 'malformed'

export interface RowReport {
  id: string
  name: string
  outcome: RowOutcome
  /** The row's implement is outside the kit. */
  equipment: boolean
}

export interface ReplyReport {
  /** Whether the app would import the reply (no parse failure, no rejecting row). */
  imports: boolean
  /** Set when the reply has no readable plan. */
  parseError?: string
  rows: RowReport[]
}

/** Same extraction as the app: a bare document, else the first balanced object holding `yescoach_program`. */
export function extractPlanJson(text: string): string {
  const trimmed = text.trim()
  try {
    JSON.parse(trimmed)
    return trimmed
  } catch {
    // fall through to prose-wrapped extraction
  }
  const fenced = [...trimmed.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map((m) => m[1])
  const source = fenced.find((b) => b.includes('yescoach_program')) ?? trimmed
  for (let start = source.indexOf('{'); start !== -1; start = source.indexOf('{', start + 1)) {
    const candidate = balancedObjectAt(source, start)
    if (candidate === null) continue
    if (candidate.includes('yescoach_program')) return candidate
    start += candidate.length - 1
  }
  throw new Error('no plan found in the reply')
}

function balancedObjectAt(text: string, start: number): string | null {
  let depth = 0
  let inString = false
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (inString) {
      if (ch === '\\') i++
      else if (ch === '"') inString = false
    } else if (ch === '"') inString = true
    else if (ch === '{') depth++
    else if (ch === '}' && --depth === 0) return text.slice(start, i + 1)
  }
  return null
}

/**
 * @param kit implements the visitor's kit allows (e.g. ['bodyweight', 'dumbbell']); undefined = any.
 */
export function validateReply(reply: string, catalog: CatalogEntry[], kit?: string[]): ReplyReport {
  let rawRows: { exerciseId?: unknown; exerciseName?: unknown }[]
  try {
    const plan = JSON.parse(extractPlanJson(reply))
    rawRows = plan.program.days.flatMap((d: { exercises: unknown[] }) => d.exercises)
  } catch (err) {
    return { imports: false, parseError: (err as Error).message, rows: [] }
  }

  const ids = new Set(catalog.map((e) => e.id))
  const patterns = new Set(catalog.map((e) => e.id.split(':')[0]))
  const kitAllows = (id: string) => !kit || kit.includes(id.split(':')[2])

  const rows = rawRows.map((r): RowReport => {
    const id = typeof r.exerciseId === 'string' ? r.exerciseId : ''
    const name = typeof r.exerciseName === 'string' ? r.exerciseName : ''
    const parts = id.split(':')
    const equipment = parts.length === 4 && !!kit && !kit.includes(parts[2])
    if (parts.length !== 4 || parts.some((p) => !p)) return { id, name, outcome: 'malformed', equipment }
    if (ids.has(id)) return { id, name, outcome: 'kept', equipment }
    if (!patterns.has(parts[0])) return { id, name, outcome: 'unknown_pattern', equipment }
    const swappable = catalog.some((e) => e.id.startsWith(`${parts[0]}:`) && kitAllows(e.id))
    return { id, name, outcome: swappable ? 'swap' : 'no_match', equipment }
  })

  const rejects = rows.some((r) => r.outcome === 'unknown_pattern' || r.outcome === 'no_match' || r.outcome === 'malformed')
  return { imports: !rejects, rows }
}
