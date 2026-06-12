// Shared chrome — barrel. Header/footer markup live in ./partials/*, and the
// runtime interactivity lives in src/chrome.ts (bundled via src/shared.ts).
export { renderHeader } from './partials/header.mjs'
export { renderFooter } from './partials/footer.mjs'

// Tiny pre-paint script (must stay inline in <head> to avoid a theme flash).
export const THEME_INIT = `<script>(function(){try{var t=localStorage.getItem('brw-theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();</script>`

export function activeFromFilename(filename) {
  return String(filename).replace(/\\/g, '/').split('/').pop().replace(/\.html$/, '')
}
