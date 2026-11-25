/**
 * The exercise ids a built prompt lets the AI write, read back out of the
 * prompt text itself, so the phantom share is measured on what the AI sees.
 *
 * Understands both listing shapes:
 *   old  "pattern: v1, v2 | i1, i2 [| apparatus a, b]"  (every combination allowed)
 *   new  "pattern: variant:implement:apparatus, ..."     (exact ids)
 * Mobility lines are "pattern: v1, v2 [apparatus]" (old) or exact tails (new).
 * Pure: no imports.
 */
export function offeredIds(prompt: string): string[] {
  const out = new Set<string>()
  for (const line of prompt.split('\n')) {
    const m = line.match(/^([a-z][a-z0-9_-]*): (.+)$/)
    if (!m) continue
    const [, pattern, rest] = m
    if (rest.includes(' | ')) {
      const [variantPart, implementPart, apparatusPart] = rest.split(' | ')
      const variants = variantPart.split(', ')
      const implementsUsed = implementPart.split(', ')
      const apparatus = ['none', ...(apparatusPart ? apparatusPart.replace('apparatus ', '').split(', ') : [])]
      for (const v of variants) for (const i of implementsUsed) for (const a of apparatus) out.add(`${pattern}:${v}:${i}:${a}`)
    } else if (/^[a-z0-9_-]+:[a-z0-9_-]+:[a-z0-9_-]+/.test(rest)) {
      for (const tail of rest.split(', ')) out.add(`${pattern}:${tail}`)
    } else {
      // old mobility line: variants, each maybe "low [doorway]"
      for (const v of rest.split(', ')) {
        const mv = v.match(/^(\S+)(?: \[(.+)\])?$/)
        if (mv) out.add(`${pattern}:${mv[1]}:bodyweight:${mv[2] ?? 'none'}`)
      }
    }
  }
  return [...out]
}
