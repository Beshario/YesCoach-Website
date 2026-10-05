// Submits the URLs whose sources changed in a push to IndexNow (Bing, Yandex, Seznam, Naver).
// Usage: node scripts/indexnow.mjs <changed file> [<changed file> ...]
// Only changed URLs are sent: IndexNow asks that unchanged URLs are not resubmitted.
import { readFileSync, readdirSync } from 'node:fs'

const HOST = 'yescoach.fit'
const registry = JSON.parse(readFileSync('lib/pages.json', 'utf8'))
const changed = process.argv.slice(2)

const keyFiles = readdirSync('public').filter((f) => /^[a-f0-9]{32}\.txt$/.test(f))
if (keyFiles.length !== 1) {
  throw new Error(`indexnow: expected exactly one IndexNow key file in public/, found ${keyFiles.length}`)
}
const key = keyFiles[0].replace('.txt', '')

const entries = [...registry.pages, ...registry.files]
const hit = entries.filter((e) => e.sources.some((src) => changed.some((f) => f === src || f.startsWith(src))))
const today = new Date().toISOString().slice(0, 10)

for (const page of registry.pages) {
  if (hit.includes(page) && page.lastModified !== today) {
    console.log(`::warning::${page.path} changed but lib/pages.json lastModified is ${page.lastModified}; set it to ${today}`)
  }
}

if (hit.length === 0) {
  console.log('indexnow: no page sources changed, nothing to submit')
  process.exit(0)
}

const urlList = hit.map((e) => `https://${HOST}${e.path}`)
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList }),
})
console.log(`indexnow: ${res.status} for ${urlList.length} URL(s)\n${urlList.join('\n')}`)
if (res.status !== 200 && res.status !== 202) {
  throw new Error(`indexnow: submission failed with ${res.status}: ${await res.text()}`)
}
