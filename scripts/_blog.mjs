import { readFileSync, writeFileSync } from 'fs'
const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const path = root + '/blog.html'
let html = readFileSync(path, 'utf8')
const imgs = [
  ['./images/gallery/oldflame-1.webp', 'Fleet vehicle wrap'],
  ['./images/gallery/kelseys-1.webp', 'Wrapped truck on the road'],
  ['./images/gallery/kht-1.webp', 'Non-profit awareness wrap'],
  ['./images/gallery/yokohama-1.webp', '53 ft trailer wrap'],
  ['./images/gallery/telus-1.webp', 'National brand truck wrap'],
]
let i = 0
html = html.replace(/<div class="blog-card-img"[^>]*>\s*<div class="media-placeholder"[\s\S]*?<\/div>\s*<\/div>/g, () => {
  const [src, alt] = imgs[i++] || imgs[imgs.length - 1]
  return `<div class="blog-card-img"><img src="${src}" alt="${alt}" loading="lazy" /></div>`
})
writeFileSync(path, html, 'utf8')
console.log('blog: replaced ' + i + ' covers')
