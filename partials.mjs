// ============================================================
// BIG RIG WRAPS — shared chrome (header, drawer nav, footer, JS)
// Injected at build + dev time by the Vite plugin in vite.config.ts.
// One definition → every page. Edit nav / footer here only.
// ============================================================

const PHONE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`

const GROUP = {
  'transport-truck': 'services', 'fleet-graphics': 'services',
  'custom-signs': 'services', 'ooh-advertising': 'services',
  about: 'company', agencies: 'company', 'fleet-partner': 'company', sustainability: 'company',
  testimonials: 'work', portfolio: 'work', charities: 'work',
}

const SERVICES = [
  ['./transport-truck.html', 'Transport Truck Advertising', '26ft & 53ft mobile billboards on highways nationwide'],
  ['./fleet-graphics.html', 'Fleet Graphics', 'Premium vinyl wraps for your whole fleet'],
  ['./custom-signs.html', 'Custom Signs', 'Banners, billboards, interior graphics & A-frames'],
  ['./ooh-advertising.html', 'OOH Advertising', 'The full out-of-home playbook'],
]
const COMPANY = [
  ['./about.html', 'About Us', 'Wrapping trucks since 2013'],
  ['./agencies.html', 'For Agencies', 'Add high-recall OOH to your media mix'],
  ['./fleet-partner.html', 'Become a Fleet Partner', 'Earn revenue from routes you already drive'],
  ['./sustainability.html', 'Sustainability', 'Platinum Green Business Bureau member'],
]
const WORK = [
  ['./portfolio.html', 'Photo Gallery', 'Real wraps on real roads'],
  ['./testimonials.html', 'Testimonials', 'What clients say'],
  ['./charities.html', 'Charities & NPOs', 'Amplifying causes that matter'],
]

const BRAND = `
    <a class="brand" href="./index.html" aria-label="Big Rig Wraps home">
      <span class="brand-plate"><img src="./images/brw-logo.webp" alt="Big Rig Wraps — Award-Winning Fleet Graphics" width="265" height="64" /></span>
    </a>`

function drawerGroup(title, items, active) {
  return `
      <div class="drawer-group">
        <span class="drawer-group-title">${title}</span>
        ${items.map(([href, label, desc]) => {
          const cur = href.replace('./', '').replace('.html', '') === active ? ' is-current' : ''
          return `<a class="drawer-link${cur}" href="${href}"><span class="dl-title">${label}${ARROW}</span><small>${desc}</small></a>`
        }).join('')}
      </div>`
}

export function renderHeader(active = '') {
  return `
<a class="floating-quote" href="./quote.html">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  <span>Free Quote</span>
</a>

<header class="masthead" id="masthead">
  <div class="masthead-inner">
    ${BRAND}
    <div class="masthead-actions">
      <a class="phone-pill" href="tel:18559727463">${PHONE_SVG}<span>1-855-972-7463</span></a>
      <a class="btn btn-accent btn-sm masthead-quote" href="./quote.html">Get a Quote</a>
      <button class="menu-btn" id="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">
        <span class="menu-btn-lines"><span></span><span></span></span>
        <span class="menu-btn-text">Menu</span>
      </button>
    </div>
  </div>
</header>

<div class="drawer-scrim" id="drawer-scrim"></div>
<aside class="drawer" id="drawer" aria-hidden="true" aria-label="Site menu">
  <div class="drawer-head">
    ${BRAND}
    <button class="drawer-close" id="drawer-close" aria-label="Close menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
  </div>
  <nav class="drawer-nav" aria-label="Primary">
    ${drawerGroup('Services', SERVICES, active)}
    ${drawerGroup('Company', COMPANY, active)}
    ${drawerGroup('Our Work', WORK, active)}
    <a class="drawer-solo${active === 'blog' ? ' is-current' : ''}" href="./blog.html">Insights${ARROW}</a>
  </nav>
  <div class="drawer-foot">
    <a class="btn btn-accent" href="./quote.html">Get a Free Quote</a>
    <a class="phone-pill phone-pill--block" href="tel:18559727463">${PHONE_SVG}<span>1-855-972-7463</span></a>
    <div class="drawer-social">
      <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
      <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
      <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
      <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2C5.1 20 12 20 12 20s6.9 0 8.6-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z"/><polygon points="9.75 15 15.5 12 9.75 9" fill="#0a0a0b"/></svg></a>
    </div>
  </div>
</aside>`
}

export function renderFooter() {
  return `
<footer class="colophon">
  <div class="hazard hazard--top"></div>
  <div class="container">
    <div class="colophon-grid">
      <div class="colophon-brand">
        ${BRAND}
        <p class="colophon-tag">Canada's transport-truck advertising company. Turning highways into high-impact marketing since 2013.</p>
        <div class="colophon-social">
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
          <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
          <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2C5.1 20 12 20 12 20s6.9 0 8.6-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z"/><polygon points="9.75 15 15.5 12 9.75 9" fill="#0a0a0b"/></svg></a>
        </div>
      </div>
      <div class="colophon-col">
        <h5>Services</h5>
        <a href="./transport-truck.html">Transport Truck Ads</a>
        <a href="./fleet-graphics.html">Fleet Graphics</a>
        <a href="./custom-signs.html">Custom Signs</a>
        <a href="./ooh-advertising.html">OOH Advertising</a>
      </div>
      <div class="colophon-col">
        <h5>Company</h5>
        <a href="./about.html">About Us</a>
        <a href="./agencies.html">For Agencies</a>
        <a href="./fleet-partner.html">Fleet Partners</a>
        <a href="./sustainability.html">Sustainability</a>
      </div>
      <div class="colophon-col">
        <h5>Explore</h5>
        <a href="./portfolio.html">Portfolio</a>
        <a href="./testimonials.html">Testimonials</a>
        <a href="./charities.html">Charities &amp; NPOs</a>
        <a href="./blog.html">Insights</a>
      </div>
      <div class="colophon-col colophon-contact">
        <h5>Get in touch</h5>
        <a class="colophon-phone" href="tel:18559727463">1-855-972-7463</a>
        <a class="btn btn-outline btn-sm" href="./quote.html">Request a Quote</a>
      </div>
    </div>
    <div class="colophon-base">
      <p>&copy; 2026 Big Rig Wraps Transport Truck Advertising. All rights reserved.</p>
      <nav><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></nav>
    </div>
  </div>
</footer>`
}

export const CHROME_SCRIPT = `<script>
(function(){
  var mast = document.getElementById('masthead');
  var fq = document.querySelector('.floating-quote');
  var onScroll = function(){
    if (mast) mast.classList.toggle('is-stuck', window.scrollY > 16);
    if (fq) fq.classList.toggle('show', window.scrollY > 560);
  };
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // Slide-in drawer (used at all screen sizes)
  var drawer = document.getElementById('drawer');
  var scrim  = document.getElementById('drawer-scrim');
  var openBtn = document.getElementById('menu-btn');
  var closeBtn = document.getElementById('drawer-close');
  function setDrawer(open){
    if(!drawer) return;
    drawer.classList.toggle('is-open', open);
    if(scrim) scrim.classList.toggle('is-open', open);
    if(openBtn){ openBtn.classList.toggle('is-open', open); openBtn.setAttribute('aria-expanded', String(open)); }
    drawer.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if(openBtn) openBtn.addEventListener('click', function(){ setDrawer(!drawer.classList.contains('is-open')); });
  if(closeBtn) closeBtn.addEventListener('click', function(){ setDrawer(false); });
  if(scrim) scrim.addEventListener('click', function(){ setDrawer(false); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') setDrawer(false); });
  document.querySelectorAll('.drawer a').forEach(function(a){ a.addEventListener('click', function(){ setDrawer(false); }); });

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
    document.querySelectorAll('.reveal, .fade-up').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal, .fade-up').forEach(function(el){ el.classList.add('in'); });
  }

  // Count-up stats
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.getAttribute('data-count')||'0');
        var suf = el.getAttribute('data-suffix')||'', pre = el.getAttribute('data-prefix')||'';
        var dur = 1500, t0 = null, isF = String(target).indexOf('.')>-1;
        function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1), e=1-Math.pow(1-p,3), v=target*e;
          el.textContent = pre + (isF? v.toFixed(1): Math.round(v).toLocaleString()) + suf;
          if(p<1) requestAnimationFrame(step); }
        requestAnimationFrame(step); co.unobserve(el);
      });
    }, {threshold:0.5});
    document.querySelectorAll('[data-count]').forEach(function(el){ co.observe(el); });
  }

  // Marquee clone
  document.querySelectorAll('.marquee-track').forEach(function(tr){
    if(tr.dataset.cloned) return; tr.dataset.cloned='1';
    tr.parentElement.appendChild(tr.cloneNode(true));
  });

  // Horizontal showcase arrows
  document.querySelectorAll('[data-rail]').forEach(function(rail){
    var prev = rail.querySelector('[data-rail-prev]');
    var next = rail.querySelector('[data-rail-next]');
    var track = rail.querySelector('[data-rail-track]');
    if(!track) return;
    function by(d){ track.scrollBy({left:d*Math.min(track.clientWidth*0.8,520), behavior:'smooth'}); }
    if(prev) prev.addEventListener('click', function(){ by(-1); });
    if(next) next.addEventListener('click', function(){ by(1); });
  });

  // Portfolio filter
  var fbtns = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('.portfolio-card');
  if(fbtns.length){
    fbtns.forEach(function(b){ b.addEventListener('click', function(){
      fbtns.forEach(function(x){ x.classList.remove('is-active'); });
      b.classList.add('is-active');
      var f = b.getAttribute('data-filter');
      cards.forEach(function(c){ var t=c.getAttribute('data-tag');
        c.style.display = (!f||f==='all'||t===f)?'':'none'; });
    }); });
  }

  // Drag-to-scroll on any rail track (works on touch natively too)
  document.querySelectorAll('[data-rail-track]').forEach(function(t){
    var down=false, sx=0, sl=0, moved=false;
    t.addEventListener('pointerdown', function(e){ down=true; moved=false; sx=e.clientX; sl=t.scrollLeft; t.classList.add('dragging'); });
    window.addEventListener('pointerup', function(){ down=false; t.classList.remove('dragging'); });
    t.addEventListener('pointermove', function(e){ if(!down) return; var dx=e.clientX-sx; if(Math.abs(dx)>4) moved=true; t.scrollLeft=sl-dx; });
    t.addEventListener('click', function(e){ if(moved){ e.preventDefault(); } }, true);
  });

  // Pointer-driven flourishes (desktop, motion-OK only)
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var still = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (fine && !still) {
    // Magnetic elements
    document.querySelectorAll('.magnetic').forEach(function(el){
      el.addEventListener('pointermove', function(e){
        var r=el.getBoundingClientRect();
        var x=(e.clientX-(r.left+r.width/2))*0.3, y=(e.clientY-(r.top+r.height/2))*0.3;
        el.style.transform='translate('+x+'px,'+y+'px)';
      });
      el.addEventListener('pointerleave', function(){ el.style.transform=''; });
    });
    // Hero parallax (tilt frame, drift badge)
    var hero=document.querySelector('.hero'), frame=document.querySelector('.hero-frame'), badge=document.querySelector('.hero-badge');
    if(hero && frame){
      hero.addEventListener('pointermove', function(e){
        var r=hero.getBoundingClientRect();
        var px=(e.clientX-r.left)/r.width-0.5, py=(e.clientY-r.top)/r.height-0.5;
        frame.style.transform='perspective(1000px) rotateY('+(px*5)+'deg) rotateX('+(-py*5)+'deg)';
        if(badge) badge.style.transform='translate('+(px*18)+'px,'+(py*18)+'px)';
      });
      hero.addEventListener('pointerleave', function(){ frame.style.transform=''; if(badge) badge.style.transform=''; });
    }
  }
})();
</script>`

export function activeFromFilename(filename) {
  const m = String(filename).replace(/\\/g, '/').split('/').pop() || ''
  return m.replace(/\.html$/, '')
}
