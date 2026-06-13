// Shared chrome — barrel. Header/footer markup live in ./partials/*, and the
// runtime interactivity lives in src/chrome.ts (bundled via src/shared.ts).
export { renderHeader } from './partials/header.mjs'
export { renderFooter } from './partials/footer.mjs'
export { renderTestimonialGrid, renderTestimonialSlider } from './partials/testimonials.mjs'

// Tiny pre-paint script (must stay inline in <head> to avoid a theme flash).
export const THEME_INIT = `<script>(function(){try{var t=localStorage.getItem('brw-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();</script>`

export function activeFromFilename(filename) {
  return String(filename).replace(/\\/g, '/').split('/').pop().replace(/\.html$/, '')
}

/* ---------- Analytics (Google Analytics 4) ----------
   Paste your GA4 Measurement ID below (looks like 'G-ABCD1234') to switch it on.
   Leave it empty and nothing is injected — the site stays analytics-free. */
export const GA_ID = 'G-8XXJB62LKG'

// GA4 with Consent Mode v2: analytics cookies stay denied until the visitor
// accepts the cookie notice; on accept (stored choice) we grant on load.
export const ANALYTICS_HEAD = GA_ID ? `
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
  gtag('js',new Date());
  gtag('consent','default',{'analytics_storage':'denied'});
  try{if(localStorage.getItem('brw-consent')==='granted')gtag('consent','update',{'analytics_storage':'granted'});}catch(e){}
  gtag('config','${GA_ID}',{anonymize_ip:true});</script>` : ''

// Dismissible cookie-consent notice (only rendered when analytics is enabled).
export const CONSENT_BANNER = GA_ID ? `
<div class="consent" id="consent" hidden role="dialog" aria-label="Cookie notice">
  <p>We use cookies to measure traffic and improve the site. See our <a href="./privacy.html">privacy policy</a>.</p>
  <div class="consent-actions">
    <button class="btn btn-sm btn-outline" data-consent="decline" type="button">Decline</button>
    <button class="btn btn-sm btn-accent" data-consent="accept" type="button">Accept</button>
  </div>
</div>` : ''
