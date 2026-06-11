// Generic image optimizer: resize + convert any folder of images to web-sized .webp.
// Usage:  node scripts/optimize-images.mjs <sourceDir> [maxWidth=1200] [outSubdir=""]
// Outputs into public/images/<outSubdir>/ and prints a size report.
import sharp from 'sharp'
import { readdirSync, mkdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const [, , srcArg, widthArg, subdir = ''] = process.argv
if (!srcArg) { console.error('Usage: node scripts/optimize-images.mjs <sourceDir> [maxWidth] [outSubdir]'); process.exit(1) }

const src = srcArg.replace(/^\/([A-Z]:)/, '$1')
const width = parseInt(widthArg || '1200', 10)
const out = join(root, 'public/images', subdir)
mkdirSync(out, { recursive: true })

const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'])
const files = readdirSync(src).filter(f => exts.has(extname(f).toLowerCase()) && statSync(join(src, f)).isFile())
if (!files.length) { console.error('No images found in ' + src); process.exit(1) }

const slug = (s) => basename(s, extname(s)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

let total = 0, ok = 0
for (const f of files) {
  try {
    const buf = await sharp(join(src, f)).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 72 }).toBuffer()
    const name = slug(f) + '.webp'
    await sharp(buf).toFile(join(out, name))
    total += buf.length; ok++
    console.log(`  ${name.padEnd(34)} ${String(Math.round(buf.length / 1024)).padStart(5)} KB`)
  } catch (e) { console.log(`  ERR ${f}: ${e.message.slice(0, 50)}`) }
}
console.log(`\nDone — ${ok}/${files.length} → public/images/${subdir} (~${(total / 1024 / 1024).toFixed(1)} MB)`)
