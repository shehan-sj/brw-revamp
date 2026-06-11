// Resize + optimize selected source graphics from Media/ into public/images/
// as web-sized .webp. Run: node scripts/process-images.mjs
import sharp from 'sharp'
import { mkdirSync } from 'fs'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const OUT = root + '/public/images'
mkdirSync(OUT, { recursive: true })

// [source, outName, width, {fit, alpha}]
const JOBS = [
  // hero + services + showcase (photos)
  ['Media/BRW Truck Ad/References/OldFlame (1).jpg', 'hero-truck.webp', 1200],
  ['Media/BRW Truck Ad/References/OldFlame (1).jpg', 'wrap-oldflame.webp', 820],
  ['Media/Portfolio Photos/image001.jpg', 'install-1.webp', 820],
  ['Media/Portfolio Photos/image002.jpg', 'install-2.webp', 820],
  ['Media/Portfolio Photos/image004.jpg', 'install-3.webp', 820],
  ['Media/Portfolio Photos/Brampton.jpeg', 'facility.webp', 820],
  ['Media/Portfolio Photos/brampton2.jpeg', 'project-brampton.webp', 820],
  ['Media/Portfolio Photos/Guelph.jpeg', 'project-guelph.webp', 820],
  ['Media/Portfolio Photos/Guelph-2.jpeg', 'project-guelph-2.webp', 820],
  ['Media/Portfolio Photos/Guelph-3.jpeg', 'project-guelph-3.webp', 820],
  // about
  ['Media/team.webp', 'team.webp', 1200],
  // blog
  ['Media/Blog cover - 1.png', 'blog-indigenous.webp', 900],
  // brand billboard ad (their own creative) — ultra-wide
  ['Media/BRW Truck Ad/BRW AD TRUCK SIDE 312 X 100 IN JPG FORMAT.jpg', 'billboard-ad.webp', 1800],
  // truck silhouettes (transparent) for transport-truck page
  ['Media/Truck Templates/26_.png', 'truck-26.webp', 900, { alpha: true }],
  ['Media/Truck Templates/53_.png', 'truck-53.webp', 1000, { alpha: true }],
  ['Media/Truck Templates/Rear Door.png', 'truck-rear.webp', 520, { alpha: true }],
  // award badge
  ['Media/Logos/CIRCLE/BRW - CIRCLE LOGO ORIGINAL - AWARD WINNING BORDER V2.png', 'award-badge.webp', 360, { alpha: true }],
]

let total = 0
for (const [src, name, width, opts = {}] of JOBS) {
  try {
    const pipe = sharp(root + '/' + src).resize({ width, withoutEnlargement: true })
    const buf = await pipe.webp({ quality: opts.alpha ? 90 : 72, alphaQuality: 100 }).toBuffer()
    await sharp(buf).toFile(OUT + '/' + name)
    const kb = Math.round(buf.length / 1024)
    total += kb
    console.log(`  ${name.padEnd(24)} ${String(kb).padStart(5)} KB`)
  } catch (e) {
    console.log(`  ERR ${name}: ${e.message.slice(0, 60)}`)
  }
}
console.log(`\nDone — ${JOBS.length} images, ~${Math.round(total / 1024 * 10) / 10} MB total.`)
