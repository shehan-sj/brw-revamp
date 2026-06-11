import { readFileSync, writeFileSync } from 'fs'
const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

// page -> [image, alt]
const MAP = {
  'fleet-graphics.html': ['./images/gallery/oldflame-1.webp', 'Wrapped fleet box truck'],
  'custom-signs.html':   ['./images/gallery/guelph-1.webp', 'Custom site signage'],
  'agencies.html':       ['./images/gallery/yokohama-1.webp', 'Yokohama trailer wrap on the road'],
  'charities.html':      ['./images/gallery/kht-1.webp', 'Know Human Trafficking awareness wrap'],
  'sustainability.html': ['./images/gallery/kelseys-1.webp', "Kelsey's truck on the road"],
}

// matches a media-placeholder block (with optional inline style), incl. its inner svg/span
const re = /<div class="media-placeholder"[^>]*>[\s\S]*?<\/div>/

let done = 0
for (const [file, [img, alt]] of Object.entries(MAP)) {
  const path = root + '/' + file
  let html = readFileSync(path, 'utf8')
  if (re.test(html)) {
    html = html.replace(re, `<img src="${img}" alt="${alt}" loading="lazy" />`)
    writeFileSync(path, html, 'utf8')
    done++
    console.log('  filled: ' + file)
  } else {
    console.log('  no placeholder: ' + file)
  }
}
console.log('\nDone — ' + done + ' filled.')
