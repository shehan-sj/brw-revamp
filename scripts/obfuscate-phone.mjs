// One-time: strip the plaintext phone number from all source files so it never
// appears (in the repo or the built HTML). At runtime the chrome script
// reassembles it from char codes and fills [data-tel] hrefs + .tel-out spans.
import { readdirSync, readFileSync, writeFileSync } from 'fs'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const targets = readdirSync(root).filter(f => f.endsWith('.html'))
targets.push('partials.mjs')

let changed = 0
for (const file of targets) {
  const path = root + '/' + file
  let s = readFileSync(path, 'utf8')
  const before = s
  s = s
    .replace(/href="tel:18559727463"/g, 'data-tel')
    .replace(/1-855-972-7463/g, '<span class="tel-out"></span>')
  if (s !== before) { writeFileSync(path, s, 'utf8'); changed++; console.log('  cleaned: ' + file) }
}
console.log('\nDone — ' + changed + ' file(s) cleaned.')
