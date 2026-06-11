import sharp from 'sharp'
import { mkdirSync, copyFileSync, existsSync } from 'fs'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const M = (p) => root + '/' + p
mkdirSync(root + '/public/images/brand', { recursive: true })
mkdirSync(root + '/public/images/industries', { recursive: true })
mkdirSync(root + '/public/video', { recursive: true })

const JOBS = [
  ['Media/Logos/CIRCLE/BRW - CIRCLE LOGO ORIGINAL - AWARD WINNING BORDER V2.png', 'brand/award.webp', 520, true],
  ['Media/Logos/10TH ANNIVERSARY/10TH YEAR ANNIVERSARY LOGO PNG.png', 'brand/award-10yr.webp', 520, true],
  ['Media/Logos/SQUARE/BRW -  SQUARE LOGO WHITE v2.png', 'brand/logo-white.webp', 600, true],
  ['Media/Sales media/Real Estate.png', 'industries/real-estate.webp', 900, false],
  ['Media/Sales media/Mortgage Brokers.png', 'industries/mortgage.webp', 900, false],
]
for (const [src, out, w, alpha] of JOBS) {
  try {
    const buf = await sharp(M(src)).resize({ width: w, withoutEnlargement: true }).webp({ quality: alpha ? 92 : 74, alphaQuality: 100 }).toBuffer()
    await sharp(buf).toFile(root + '/public/images/' + out)
    console.log(`  ${out.padEnd(28)} ${Math.round(buf.length / 1024)} KB`)
  } catch (e) { console.log(`  ERR ${out}: ${e.message.slice(0, 50)}`) }
}

// stage hero video (smallest Cowan clip) + a poster from an existing wrap
const vid = M('Media/Copy of Cowan Trailer clip 1.mp4')
if (existsSync(vid)) { copyFileSync(vid, root + '/public/video/hero.mp4'); console.log('  video/hero.mp4 copied') }
console.log('done')
