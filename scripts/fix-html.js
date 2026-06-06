// Post-build: strip `crossorigin` from <link rel="stylesheet"> / module <script>
// tags so the built site also works when opened directly from the filesystem
// (file://). The shared chrome + interactivity are injected by the Vite plugin
// in vite.config.ts, so nothing else is needed here.
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const distDir = new URL('../dist', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const htmlFiles = readdirSync(distDir).filter(f => f.endsWith('.html'))

let patched = 0
for (const file of htmlFiles) {
  const filePath = join(distDir, file)
  const original = readFileSync(filePath, 'utf8')
  const fixed = original
    .replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet"')
    .replace(/<script type="module" crossorigin/g, '<script type="module"')
  if (fixed !== original) {
    writeFileSync(filePath, fixed, 'utf8')
    patched++
  }
}
console.log(`fix-html: ${patched} file(s) patched (crossorigin stripped).`)
