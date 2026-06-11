import { readFileSync, writeFileSync } from 'fs'
const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const path = root + '/portfolio.html'
let html = readFileSync(path, 'utf8')

const g = (n) => `./images/gallery/${n}.webp`
const range = (p, a, b) => Array.from({length: b - a + 1}, (_, i) => g(`${p}-${a + i}`))

const PROJECTS = [
  { tag: 'non-profit', label: 'Non-Profit', name: 'Know Human Trafficking', blurb: 'Full 53 ft trailer wrap', imgs: range('kht', 1, 10) },
  { tag: 'retail', label: 'Restaurant', name: "Kelsey's", blurb: 'Box-truck brand campaign', imgs: range('kelseys', 1, 5) },
  { tag: 'automotive', label: 'Automotive', name: 'Yokohama Tire', blurb: '53 ft trailer wrap', imgs: [g('yokohama-1')] },
  { tag: 'non-profit', label: 'Non-Profit', name: 'The Kidney Foundation', blurb: 'Awareness campaign', imgs: [g('kidney-1')] },
  { tag: 'other', label: 'Telecom', name: 'TELUS', blurb: 'National brand wrap', imgs: [g('telus-1')] },
  { tag: 'other', label: 'Beverage', name: 'Old Flame Brewing', blurb: 'Craft brewery box-truck wrap', imgs: [g('oldflame-1')] },
  { tag: 'transport', label: 'Transport', name: 'Fleet Installations', blurb: 'Trailer graphics in the bay', imgs: range('fleet', 1, 4) },
  { tag: 'other', label: 'Real Estate', name: 'Guelph & Granite Homes', blurb: 'Site & builder signage', imgs: range('guelph', 1, 4) },
  { tag: 'other', label: 'Signage', name: 'Brampton Projects', blurb: 'Facility & fleet graphics', imgs: range('brampton', 1, 2) },
]

const MORE = ['ALS Society of Canada','The Salvation Army','Pathwise Credit Union',"Women's Trucking Federation",'Xplornet','Feed The Need','Algoma Orchards',"Ren's Pet Depot",'Bessada Kia','City of Woodstock','Big Country Raw','Bowmanville Hospital','Jensen Trailers','Beyond Meat','Recipe Unlimited']

const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'

const cards = PROJECTS.map((p, i) => `
      <div class="portfolio-card fade-up" data-tag="${p.tag}" data-title="${p.name}" data-images="${p.imgs.join('|')}"${i % 4 ? ` style="transition-delay:${(i % 4) * 0.05}s"` : ''}>
        <div class="portfolio-card-media"><img src="${p.imgs[0]}" alt="${p.name} truck wrap" loading="lazy" /></div>
        <div class="portfolio-card-body">
          <div class="portfolio-tag">${p.label}</div>
          <h4>${p.name}</h4>
          <p>${p.blurb}</p>
          <span class="portfolio-view">${p.imgs.length > 1 ? p.imgs.length + ' photos · view gallery' : 'View photo'} ${arrow}</span>
        </div>
      </div>`).join('\n')

const section = `<section class="section" style="background:var(--c-bg)">
  <div class="container">

    <a class="gallery-featured fade-up" data-title="Know Human Trafficking" data-images="${range('kht', 1, 10).join('|')}">
      <img src="${g('kht-3')}" alt="Know Human Trafficking full trailer wrap" loading="lazy" />
      <div class="gallery-featured-cap">
        <div class="tag">Featured Project · Non-Profit</div>
        <h3>Know Human Trafficking</h3>
        <div class="meta">Full 53 ft trailer wrap · 10 photos — click to open the gallery</div>
      </div>
    </a>

    <div class="filter-bar fade-up">
      <button class="filter-chip is-active" data-filter="all">All Projects</button>
      <button class="filter-chip" data-filter="non-profit">Non-Profit</button>
      <button class="filter-chip" data-filter="transport">Transport</button>
      <button class="filter-chip" data-filter="automotive">Automotive</button>
      <button class="filter-chip" data-filter="retail">Retail</button>
      <button class="filter-chip" data-filter="other">Other</button>
    </div>

    <div class="portfolio-grid">
${cards}
    </div>

    <div class="section-header centered fade-up mt-lg">
      <span class="label">And Many More</span>
      <h2>Trusted by Brands Across Canada</h2>
    </div>
    <div class="filter-bar" style="justify-content:center">
      ${MORE.map(m => `<span class="filter-chip" style="cursor:default">${m}</span>`).join('\n      ')}
    </div>
  </div>
</section>`

// Replace the first content section (between page-hero and the CTA section)
const startMarker = '<section class="section" style="background:var(--c-bg)">'
const endMarker = '<section class="section cta-section">'
const start = html.indexOf(startMarker)
const end = html.indexOf(endMarker)
if (start === -1 || end === -1) { console.error('markers not found'); process.exit(1) }
html = html.slice(0, start) + section + '\n\n' + html.slice(end)
writeFileSync(path, html, 'utf8')
console.log('portfolio.html gallery rebuilt — ' + PROJECTS.length + ' projects, featured splash + lightbox hooks.')
