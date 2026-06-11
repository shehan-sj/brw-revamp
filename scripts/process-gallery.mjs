import sharp from 'sharp'
import { mkdirSync } from 'fs'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const LIVE = 'C:/Users/sheha/AppData/Local/Temp/live-img'
const OUT = root + '/public/images/gallery'
mkdirSync(OUT, { recursive: true })

// [absolute-or-relative source, outName]
const M = (p) => root + '/' + p
const J = [
  // Know Human Trafficking
  ...[10,11,12,13,14,15,16,17,18,20].map((n,i)=>[`${LIVE}/KHT_Portfolio${n}.jpg`, `kht-${i+1}.webp`]),
  // Kelsey's
  [`${LIVE}/kelseys-homepage.jpg`, 'kelseys-1.webp'],
  [`${LIVE}/kelseys_portfolio1.jpg`, 'kelseys-2.webp'],
  [`${LIVE}/kelseys_portfolio2.jpg`, 'kelseys-3.webp'],
  [`${LIVE}/kelseys_portfolio3.jpg`, 'kelseys-4.webp'],
  [`${LIVE}/kelseys_portfolio4.jpg`, 'kelseys-5.webp'],
  // single-photo hero clients
  [`${LIVE}/yokohama-tire-homepage.jpg`, 'yokohama-1.webp'],
  [`${LIVE}/kidney-car-homepage.jpg`, 'kidney-1.webp'],
  [`${LIVE}/telus-homepage-2.jpg`, 'telus-1.webp'],
  // Media-sourced projects
  [M('Media/BRW Truck Ad/References/OldFlame (1).jpg'), 'oldflame-1.webp'],
  [M('Media/Portfolio Photos/image001.jpg'), 'fleet-1.webp'],
  [M('Media/Portfolio Photos/image002.jpg'), 'fleet-2.webp'],
  [M('Media/Portfolio Photos/image004.jpg'), 'fleet-3.webp'],
  [M('Media/Portfolio Photos/image005.jpg'), 'fleet-4.webp'],
  [M('Media/Portfolio Photos/Guelph.jpeg'), 'guelph-1.webp'],
  [M('Media/Portfolio Photos/Guelph-2.jpeg'), 'guelph-2.webp'],
  [M('Media/Portfolio Photos/Guelph-3.jpeg'), 'guelph-3.webp'],
  [M('Media/Portfolio Photos/Granite Homes Arkell Lofts Guelph 003.jpeg'), 'guelph-4.webp'],
  [M('Media/Portfolio Photos/Brampton.jpeg'), 'brampton-1.webp'],
  [M('Media/Portfolio Photos/brampton2.jpeg'), 'brampton-2.webp'],
]

let total = 0, ok = 0
for (const [src, name] of J) {
  try {
    const buf = await sharp(src).rotate().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 72 }).toBuffer()
    await sharp(buf).toFile(OUT + '/' + name)
    total += buf.length; ok++
  } catch (e) { console.log(`ERR ${name}: ${e.message.slice(0,60)}`) }
}
console.log(`gallery: ${ok}/${J.length} images, ~${(total/1024/1024).toFixed(1)} MB`)
