// Fails the build when a route is missing from lib/pages.json, or an entry is malformed,
// so a new page cannot ship without a sitemap date or IndexNow coverage.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const registry = JSON.parse(readFileSync('lib/pages.json', 'utf8'))
const problems = []

function pageFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return pageFiles(full)
    return name === 'page.tsx' ? [full] : []
  })
}

const routes = pageFiles('app').map((file) => {
  const dir = relative('app', file).split(sep).slice(0, -1).join('/')
  return dir === '' ? '/' : `/${dir}`
})

const registered = new Set(registry.pages.map((p) => p.path))
for (const route of routes) {
  if (!registered.has(route)) problems.push(`app route ${route} has no entry in lib/pages.json`)
}
for (const page of registry.pages) {
  if (!routes.includes(page.path)) problems.push(`lib/pages.json lists ${page.path} but no app/**/page.tsx serves it`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(page.lastModified)) problems.push(`${page.path}: lastModified must be YYYY-MM-DD`)
}
for (const entry of [...registry.pages, ...registry.files]) {
  if (!Array.isArray(entry.sources) || entry.sources.length === 0) problems.push(`${entry.path}: sources must list at least one path`)
}

if (problems.length) {
  console.error('check-pages failed:\n- ' + problems.join('\n- '))
  process.exit(1)
}
console.log(`check-pages: ${routes.length} routes registered`)
