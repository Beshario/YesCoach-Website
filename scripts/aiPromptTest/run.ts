/**
 * Test harness for the yescoach.fit/ai prompt. Run from the website root:
 *
 *   npx --yes tsx scripts/aiPromptTest/run.ts measure          prompt length + phantom share per case (exit 1 if any)
 *   npx --yes tsx scripts/aiPromptTest/run.ts fixtures         validator vs the saved replies (exit 1 on mismatch)
 *   npx --yes tsx scripts/aiPromptTest/run.ts prompts <dir>    write each case's prompt to <dir>/<case>.txt
 *   npx --yes tsx scripts/aiPromptTest/run.ts score <dir>      score real replies saved as <dir>/<case>-<model>.txt
 *
 * cases.json holds visitor choices (add one when a user reports a bad combination).
 * fixtures/ holds saved replies; fixtures/expected.json states what the validator must say.
 * Phantom share = ids the prompt lets the AI write that are not real catalog ids.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { buildPrompt, kitFor, type Choices } from '../../lib/aiPrompt'
import catalog from '../../lib/exerciseCatalog.json'
import { validateReply, type CatalogEntry } from './validate'
import { offeredIds } from './promptIds'

const here = __dirname
const entries = catalog as CatalogEntry[]
const real = new Set(entries.map((e) => e.id))
const cases = JSON.parse(readFileSync(join(here, 'cases.json'), 'utf8')) as Record<string, Choices>

function measure() {
  let phantoms = 0
  console.log('case'.padEnd(22), 'chars'.padStart(6), 'offered'.padStart(8), 'phantom'.padStart(8), 'share'.padStart(7))
  for (const [name, choices] of Object.entries(cases)) {
    const text = buildPrompt(choices).text
    const offered = offeredIds(text)
    const phantom = offered.filter((id) => !real.has(id)).length
    phantoms += phantom
    const share = offered.length ? ((100 * phantom) / offered.length).toFixed(1) + '%' : '-'
    console.log(name.padEnd(22), String(text.length).padStart(6), String(offered.length).padStart(8), String(phantom).padStart(8), share.padStart(7))
  }
  if (phantoms) process.exit(1)
}

function implementMix(ids: string[]): string {
  const n: Record<string, number> = {}
  for (const id of ids) n[id.split(':')[2] ?? '?'] = (n[id.split(':')[2] ?? '?'] ?? 0) + 1
  return Object.entries(n).map(([k, v]) => `${k}:${v}`).join(' ')
}

function report(label: string, reply: string, choices: Choices) {
  const r = validateReply(reply, entries, kitFor(choices))
  const count = (o: string) => r.rows.filter((x) => x.outcome === o).length
  const equipment = r.rows.filter((x) => x.equipment).length
  const line = r.parseError
    ? `${label}: PARSE FAIL (${r.parseError})`
    : `${label}: ${r.imports ? 'imports' : 'REJECTED'}, ${r.rows.length} rows: kept ${count('kept')}, swap ${count('swap')}, no_match ${count('no_match')}, unknown_pattern ${count('unknown_pattern')}, malformed ${count('malformed')}, equipment ${equipment}, implements ${implementMix(r.rows.map((x) => x.id))}`
  console.log(line)
  return r
}

function fixtures() {
  const dir = join(here, 'fixtures')
  const expected = JSON.parse(readFileSync(join(dir, 'expected.json'), 'utf8')) as Record<
    string,
    { case: string; imports: boolean; parseError?: boolean; outcomes?: Record<string, number>; equipment?: number }
  >
  let bad = 0
  for (const [file, want] of Object.entries(expected)) {
    const r = report(file, readFileSync(join(dir, file), 'utf8'), cases[want.case])
    const got = (o: string) => r.rows.filter((x) => x.outcome === o).length
    const problems: string[] = []
    if (r.imports !== want.imports) problems.push(`imports ${r.imports}, expected ${want.imports}`)
    if (want.parseError !== undefined && !!r.parseError !== want.parseError) problems.push(`parseError ${!!r.parseError}, expected ${want.parseError}`)
    for (const [o, n] of Object.entries(want.outcomes ?? {})) if (got(o) !== n) problems.push(`${o} ${got(o)}, expected ${n}`)
    if (want.equipment !== undefined && r.rows.filter((x) => x.equipment).length !== want.equipment) problems.push('equipment count differs')
    if (problems.length) {
      bad++
      console.log('   MISMATCH: ' + problems.join('; '))
    }
  }
  console.log(bad ? `${bad} fixture(s) mismatch` : 'all fixtures match')
  process.exit(bad ? 1 : 0)
}

function prompts(dir: string) {
  mkdirSync(dir, { recursive: true })
  for (const [name, choices] of Object.entries(cases)) writeFileSync(join(dir, `${name}.txt`), buildPrompt(choices).text)
  console.log(`${Object.keys(cases).length} prompts in ${dir}`)
}

function score(dir: string) {
  let bad = 0
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.txt')).sort()) {
    const name = file.slice(0, -4)
    const choices = cases[name.slice(0, name.lastIndexOf('-'))]
    if (!choices) { console.log(`${name}: no case`); continue }
    const r = report(name, readFileSync(join(dir, file), 'utf8'), choices)
    if (!r.imports || r.rows.some((x) => x.outcome !== 'kept' || x.equipment)) bad++
  }
  console.log(`${bad} reply(ies) with at least one miss`)
  process.exit(bad ? 1 : 0)
}

const [cmd, arg] = process.argv.slice(2)
if (cmd === 'measure') measure()
else if (cmd === 'fixtures') fixtures()
else if (cmd === 'prompts' && arg) prompts(arg)
else if (cmd === 'score' && arg) score(arg)
else { console.error('usage: run.ts measure | fixtures | prompts <dir> | score <dir>'); process.exit(2) }
