// Post-build fixes so the site works when opened directly from the filesystem (file://).
//
// 1. Remove `crossorigin` from <link rel="stylesheet"> — Chrome blocks it on file://
// 2. Inject an inline (non-module) nav toggle script on every page so the mobile
//    hamburger and mobile dropdowns work without ES-module loading.

import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const distDir = new URL('../dist', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

// Inline nav script — no dependencies, works on file://
const NAV_SCRIPT = `
<script>
(function(){
  var header  = document.getElementById('site-header');
  var toggle  = document.getElementById('nav-toggle');
  var nav     = document.getElementById('main-nav');

  // Sticky header
  if (header) {
    window.addEventListener('scroll', function(){
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Mobile hamburger
  if (toggle && nav) {
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.addEventListener('click', function(e){
      if (header && !header.contains(e.target)) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Mobile dropdown toggles (desktop handled by CSS :hover)
  document.querySelectorAll('.dropdown-toggle').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var item = btn.closest('.nav-item');
      if (!item) return;
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.has-dropdown').forEach(function(i){ i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Scroll-reveal
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-up').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.fade-up').forEach(function(el){ el.classList.add('visible'); });
  }

  // Portfolio filter (portfolio page only)
  var filterBtns = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('.portfolio-card');
  if (filterBtns.length) {
    filterBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        filterBtns.forEach(function(b){
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');
        var filter = btn.getAttribute('data-filter');
        cards.forEach(function(card){
          var tag = card.getAttribute('data-tag');
          card.style.display = (!filter || filter === 'all' || tag === filter) ? '' : 'none';
        });
      });
    });
  }
})();
</script>`

const htmlFiles = readdirSync(distDir).filter(f => f.endsWith('.html'))

let patched = 0
for (const file of htmlFiles) {
  const filePath = join(distDir, file)
  let content = readFileSync(filePath, 'utf8')
  const original = content

  // 1. Remove crossorigin from stylesheet links
  content = content.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet"')

  // 2. Inject inline nav script just before </body>
  if (!content.includes('id="site-header"')) {
    // skip pages without the nav (shouldn't happen)
  } else if (!content.includes('/* brw-nav-inline */')) {
    content = content.replace('</body>', NAV_SCRIPT + '\n</body>')
  }

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8')
    patched++
    console.log(`  patched: ${file}`)
  }
}

console.log(`\nDone — ${patched} file(s) patched.`)
