// One-time migration: replace the inline <header>/<footer> blocks in each page
// with the <!--#HEADER--> / <!--#FOOTER--> markers the Vite chrome plugin expands.
import { readdirSync, readFileSync, writeFileSync } from 'fs'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const files = readdirSync(root).filter(f => f.endsWith('.html'))

let changed = 0
for (const file of files) {
  if (file === 'index.html') continue // already authored with markers
  const path = root + '/' + file
  let html = readFileSync(path, 'utf8')
  const before = html

  html = html.replace(/<header class="site-header"[\s\S]*?<\/header>/, '<!--#HEADER-->')
  html = html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, '<!--#FOOTER-->')

  if (html !== before) {
    writeFileSync(path, html, 'utf8')
    changed++
    console.log('  migrated: ' + file +
      (html.includes('<!--#HEADER-->') ? '' : '  [WARN: no header marker]') +
      (html.includes('<!--#FOOTER-->') ? '' : '  [WARN: no footer marker]'))
  } else {
    console.log('  skipped (no match): ' + file)
  }
}
console.log('\nDone — ' + changed + ' file(s) migrated.')
