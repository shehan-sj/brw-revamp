// One-time: convert downloaded portfolio + blog JPEGs to optimized WebP,
// rewrite blog markdown cover refs .jpg -> .webp, fix dates, and assign
// rotating fallback covers to posts that had no real featured image.
import { readdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const gallery = join(root, 'public/images/gallery')
const blogImg = join(root, 'public/images/blog')
const blogMd  = join(root, 'content/blog')

async function convertDir(dir, width) {
  if (!existsSync(dir)) return []
  const done = []
  for (const f of readdirSync(dir).filter(f => /\.jpe?g$/i.test(f))) {
    const base = f.replace(/\.jpe?g$/i, '')
    const out = join(dir, base + '.webp')
    const buf = await sharp(join(dir, f)).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 }).toBuffer()
    writeFileSync(out, buf)
    try { unlinkSync(join(dir, f)) } catch { await new Promise(r => setTimeout(r, 150)); try { unlinkSync(join(dir, f)) } catch {} }
    done.push(base)
  }
  return done
}

const g = await convertDir(gallery, 1000)
const b = await convertDir(blogImg, 1200)
console.log(`optimized: ${g.length} gallery + ${b.length} blog images → webp`)

// ---- correct publish dates (from the live bigrigwraps.ca/blog) ----
const DATES = {
  'why-your-truck-ad-strategy-should-accelerate-into-q1':'2025-12-16',
  'catching-holiday-shoppers-where-they-are-the-mobile-billboard-advantage':'2025-12-08',
  'comparing-26ft-vs-53ft-truck-advertising':'2025-11-24',
  'optimizing-transport-truck-ad-placement-for-maximum-impact':'2025-11-10',
  'how-fleet-graphics-are-contractors-secret-weapon':'2025-10-27',
  'transport-truck-advertising-is-a-game-changer-for-travel-agencies':'2025-10-07',
  'stop-intimate-partner-violence-awareness-truck-launch-press-release':'2025-10-06',
  'mobile-advertising-is-changing-the-landscape-of-canadian-marketing':'2025-09-22',
  'truck-advertising-custom-signs-for-home-builders':'2025-09-08',
  'why-your-fleet-is-your-most-valuable-advertising-asset':'2025-09-02',
  'designing-the-perfect-sign-for-your-business-front':'2025-08-26',
  'how-ooh-and-digital-ads-boost-roi-together':'2025-08-19',
  'why-your-truck-ad-design-matters':'2025-08-11',
  'why-back-door-truck-advertising-is-a-prime-spot-for-your-brand':'2025-08-04',
  'truck-advertising-a-dynamic-and-unmissable-canvas-for-media-buyers':'2025-07-22',
  'sale-of-big-rig-wraps-press-release':'2025-07-14',
  'harnessing-the-power-of-out-of-home-advertising-for-client-success':'2025-07-14',
  'the-strategic-edge-of-mobile-billboards':'2025-07-08',
  'why-truck-wraps-flourish-through-canadian-summers':'2025-06-30',
  'how-to-scale-your-business-responsibly':'2025-06-23',
  'defining-true-success-for-your-small-business':'2025-06-17',
  'how-authenticity-humanizes-your-brand-and-builds-trust':'2025-06-09',
  'why-prioritizing-customers-is-essential-for-small-businesses':'2025-06-02',
  'the-power-of-your-buildings-signage-in-shaping-customer-perception':'2025-05-26',
  'how-fleet-graphics-enhance-employee-morale-and-company-pride':'2025-05-20',
  'transform-your-fleet-into-a-powerful-marketing-force':'2025-05-12',
  'why-integrated-media-measurement-is-crucial-for-marketing-success':'2025-05-05',
  'truck-advertising-a-driving-force-across-the-marketing-funnel':'2025-04-28',
  'the-growing-threat-of-digital-ad-fraud':'2025-04-22',
  'the-evolution-of-advertising-budgeting':'2025-04-15',
  'enhancing-campaign-effectiveness-with-ooh-media-synergy':'2025-04-07',
  'effective-networking-and-business-success':'2025-03-31',
  'maximizing-impact-with-fleet-graphics-for-logistics-companies':'2025-03-24',
  'the-power-of-custom-signage-in-healthcare':'2025-03-17',
  'the-eco-friendly-benefits-of-long-lasting-vehicle-wraps':'2025-03-10',
  'why-media-buyers-should-consider-transport-truck-advertising-for-their-marketing-mix':'2025-03-03',
  'how-custom-signage-and-truck-advertising-can-help-retail-stores':'2025-02-24',
  'how-fleet-graphics-empower-non-profits':'2025-02-17',
  'the-importance-of-custom-signage-for-hotels-and-resorts':'2025-02-10',
  'how-fleet-graphics-benefit-construction-companies':'2025-02-03',
}
// rotation pool for posts with no real featured image
const POOL = ['yokohama-1','kelseys-1','kidney-1','telus-1','oldflame-1','fleet-1','fleet-2','fleet-3','guelph-1','brampton-1','kht-1','feed-the-need-1','rens-pet-1','als-1']

let i = 0, dateFixed = 0, coverFixed = 0
for (const f of readdirSync(blogMd).filter(f => f.endsWith('.md'))) {
  const slug = f.replace(/\.md$/, '')
  let md = readFileSync(join(blogMd, f), 'utf8')
  // .jpg -> .webp for any downloaded blog cover
  md = md.replace(/(cover:\s*\/images\/blog\/[^\s]+)\.jpg/i, '$1.webp')
  // correct date
  if (DATES[slug]) { md = md.replace(/^date:.*$/m, `date: ${DATES[slug]}`); dateFixed++ }
  // replace the generic fallback cover with a rotating real photo
  if (/cover:\s*\/images\/gallery\/fleet-1\.webp/.test(md)) {
    const pick = POOL[i % POOL.length]
    md = md.replace(/cover:\s*\/images\/gallery\/fleet-1\.webp/, `cover: /images/gallery/${pick}.webp`)
    coverFixed++
  }
  i++
  writeFileSync(join(blogMd, f), md)
}
console.log(`blog: ${dateFixed} dates corrected, ${coverFixed} fallback covers rotated`)
