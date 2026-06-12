// Site header: top navbar (desktop links + dropdowns), mobile sheet, bottom bar.
import { ICON, LOGO, SOCIAL } from './shared.mjs'

const CHEV = `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>`

const GROUP = {
  'transport-truck': 'services', 'fleet-graphics': 'services', 'custom-signs': 'services', 'ooh-advertising': 'services',
  about: 'company', agencies: 'company', 'fleet-partner': 'company', sustainability: 'company', faq: 'company',
  projects: 'work', testimonials: 'work', videos: 'work', charities: 'work', news: 'news', pricing: 'pricing',
}

const SERVICES = [
  ['./transport-truck.html', 'Transport Truck Advertising', '26ft & 53ft mobile billboards'],
  ['./fleet-graphics.html', 'Fleet Graphics', 'Premium wraps for your whole fleet'],
  ['./custom-signs.html', 'Custom Signs', 'Banners, billboards & interior graphics'],
  ['./ooh-advertising.html', 'OOH Advertising', 'The full out-of-home playbook'],
]
const COMPANY = [
  ['./about.html', 'About Us', 'Wrapping trucks since 2013'],
  ['./agencies.html', 'For Agencies', 'Add OOH to your media mix'],
  ['./fleet-partner.html', 'Become a Fleet Partner', 'Earn from routes you already drive'],
  ['./sustainability.html', 'Sustainability', 'Platinum Green Business Bureau'],
  ['./faq.html', 'FAQ', 'Quick answers, straight talk'],
]
const WORK = [
  ['./projects.html', 'Projects', 'Real wraps on real roads'],
  ['./testimonials.html', 'Testimonials', 'What clients say'],
  ['./videos.html', 'Videos', 'Client stories on film'],
  ['./charities.html', 'Charities & NPOs', 'Causes we amplify'],
]

const menu = (key, label, items) => `
        <div class="nav-item has-menu" data-group="${key}">
          <button class="nav-link" aria-haspopup="true">${label} ${CHEV}</button>
          <div class="nav-menu"><div class="nav-menu-inner">
            ${items.map(([h, t, d]) => `<a href="${h}"><b>${t}</b><span>${d}</span></a>`).join('')}
          </div></div>
        </div>`

const sheetGroup = (title, items) => `
    <div class="sheet-group"><span class="sheet-group-title">${title}</span>
      ${items.map(([h, t, d]) => `<a href="${h}">${t}<small>${d}</small></a>`).join('')}
    </div>`

export function renderHeader(active = '') {
  const g = GROUP[active] || ''
  const cur = (k) => g === k ? ' current' : ''
  return `
<a class="floating-quote" href="./quote.html">${ICON.quote}<span>Free Quote</span></a>

<header class="navbar" id="navbar">
  <div class="navbar-inner">
    ${LOGO}
    <nav class="nav-links" aria-label="Primary">
      ${menu('services', 'Services', SERVICES)}
      ${menu('work', 'Our Work', WORK)}
      <a class="nav-link${cur('pricing')}" href="./pricing.html">Pricing</a>
      ${menu('company', 'Company', COMPANY)}
      <a class="nav-link${cur('news')}" href="./news.html">News</a>
    </nav>
    <div class="nav-actions">
      <a class="nav-phone" data-tel>${ICON.phone}<span class="tel-out"></span></a>
      <button class="theme-toggle" aria-label="Toggle dark mode" title="Toggle theme">
        <svg class="ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        <svg class="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      </button>
      <a class="btn btn-accent btn-sm nav-quote" href="./quote.html">Get a Quote</a>
      <button class="nav-burger" id="nav-burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>

<div class="sheet" id="sheet" aria-hidden="true">
  <button class="sheet-close" id="sheet-close" aria-label="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
  ${sheetGroup('Services', SERVICES)}
  ${sheetGroup('Company', COMPANY)}
  ${sheetGroup('Our Work', WORK)}
  <div class="sheet-group"><a href="./pricing.html">Pricing</a><a href="./news.html">News</a></div>
  <div class="sheet-foot">
    <a class="btn btn-accent" href="./quote.html">Get a Free Quote</a>
    <a class="nav-phone sheet-phone" data-tel>${ICON.phone}<span class="tel-out"></span></a>
    <div class="colophon-social sheet-social">${SOCIAL}</div>
  </div>
</div>

<nav class="bottombar" aria-label="Quick actions">
  <a class="bottombar-btn" data-tel aria-label="Call us">${ICON.phone}<span>Call</span></a>
  <a class="bottombar-btn cta" href="./quote.html">${ICON.quote}<span>Quote</span></a>
  <button class="bottombar-btn" id="bottombar-menu" aria-label="Open menu">${ICON.menu}<span>Menu</span></button>
</nav>`
}
