// ============================================================
// BIG RIG WRAPS — shared chrome v3 (navbar, sheet, bottom bar, footer, JS)
// Injected at build + dev by the Vite plugin in vite.config.ts.
// ============================================================

const CHEV = `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>`
const ICON = {
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  quote: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`,
}
const GROUP = { 'transport-truck':'services','fleet-graphics':'services','custom-signs':'services','ooh-advertising':'services',
  about:'company',agencies:'company','fleet-partner':'company',sustainability:'company',
  testimonials:'work',portfolio:'work',charities:'work',blog:'insights' }

const SERVICES = [
  ['./transport-truck.html','Transport Truck Advertising','26ft & 53ft mobile billboards'],
  ['./fleet-graphics.html','Fleet Graphics','Premium wraps for your whole fleet'],
  ['./custom-signs.html','Custom Signs','Banners, billboards & interior graphics'],
  ['./ooh-advertising.html','OOH Advertising','The full out-of-home playbook'],
]
const COMPANY = [
  ['./about.html','About Us','Wrapping trucks since 2013'],
  ['./agencies.html','For Agencies','Add OOH to your media mix'],
  ['./fleet-partner.html','Become a Fleet Partner','Earn from routes you already drive'],
  ['./sustainability.html','Sustainability','Platinum Green Business Bureau'],
]
const WORK = [
  ['./portfolio.html','Photo Gallery','Real wraps on real roads'],
  ['./testimonials.html','Testimonials','What clients say'],
  ['./charities.html','Charities & NPOs','Causes we amplify'],
]
const LOGO = `<a class="brand" href="./index.html" aria-label="Big Rig Wraps home"><img src="./images/brw-logo.webp" alt="Big Rig Wraps — Award-Winning Fleet Graphics" width="265" height="64" /></a>`

const menu = (key, items) => `
        <div class="nav-item has-menu" data-group="${key}">
          <button class="nav-link" aria-haspopup="true">${key === 'services' ? 'Services' : 'Company'} ${CHEV}</button>
          <div class="nav-menu"><div class="nav-menu-inner">
            ${items.map(([h, t, d]) => `<a href="${h}"><b>${t}</b><span>${d}</span></a>`).join('')}
          </div></div>
        </div>`

const sheetGroup = (title, items) => `
    <div class="sheet-group"><span class="sheet-group-title">${title}</span>
      ${items.map(([h, t, d]) => `<a href="${h}">${t}<small>${d}</small></a>`).join('')}
    </div>`

const SOCIAL = `
  <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
  <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
  <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
  <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2C5.1 20 12 20 12 20s6.9 0 8.6-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z"/><polygon points="9.75 15 15.5 12 9.75 9" fill="#060505"/></svg></a>`

export function renderHeader(active = '') {
  const g = GROUP[active] || ''
  const cur = (k) => g === k ? ' current' : ''
  return `
<a class="floating-quote" href="./quote.html">${ICON.quote}<span>Free Quote</span></a>

<header class="navbar" id="navbar">
  <div class="navbar-inner">
    ${LOGO}
    <nav class="nav-links" aria-label="Primary">
      ${menu('services', SERVICES)}
      <a class="nav-link${cur('work')}" href="./portfolio.html">Work</a>
      ${menu('company', COMPANY)}
      <a class="nav-link${cur('insights')}" href="./blog.html">Insights</a>
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
  <div class="sheet-group"><a href="./blog.html">Insights</a></div>
  <div class="sheet-foot">
    <a class="btn btn-accent" href="./quote.html">Get a Free Quote</a>
    <a class="nav-phone" data-tel style="font-size:1rem">${ICON.phone}<span class="tel-out"></span></a>
    <div class="colophon-social" style="margin-top:.4rem">${SOCIAL}</div>
  </div>
</div>

<nav class="bottombar" aria-label="Quick actions">
  <a class="bottombar-btn" data-tel aria-label="Call us">${ICON.phone}<span>Call</span></a>
  <a class="bottombar-btn cta" href="./quote.html">${ICON.quote}<span>Quote</span></a>
  <button class="bottombar-btn" id="bottombar-menu" aria-label="Open menu">${ICON.menu}<span>Menu</span></button>
</nav>`
}

export function renderFooter() {
  return `
<footer class="colophon">
  <div class="container">
    <div class="colophon-grid">
      <div class="colophon-brand">
        ${LOGO}
        <p class="colophon-tag">Canada's transport-truck advertising company. Turning highways into high-impact marketing since 2013.</p>
        <div class="colophon-social">${SOCIAL}</div>
      </div>
      <div class="colophon-col"><h5>Services</h5>
        <a href="./transport-truck.html">Transport Truck Ads</a><a href="./fleet-graphics.html">Fleet Graphics</a><a href="./custom-signs.html">Custom Signs</a><a href="./ooh-advertising.html">OOH Advertising</a></div>
      <div class="colophon-col"><h5>Company</h5>
        <a href="./about.html">About Us</a><a href="./agencies.html">For Agencies</a><a href="./fleet-partner.html">Fleet Partners</a><a href="./sustainability.html">Sustainability</a></div>
      <div class="colophon-col"><h5>Explore</h5>
        <a href="./portfolio.html">Portfolio</a><a href="./testimonials.html">Testimonials</a><a href="./charities.html">Charities &amp; NPOs</a><a href="./blog.html">Insights</a></div>
      <div class="colophon-col colophon-contact"><h5>Get in touch</h5>
        <a class="colophon-phone" data-tel><span class="tel-out"></span></a>
        <a class="btn btn-outline btn-sm" href="./quote.html">Request a Quote</a></div>
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
  var nav=document.getElementById('navbar'), fq=document.querySelector('.floating-quote');
  var onScroll=function(){ if(nav)nav.classList.toggle('stuck',window.scrollY>16); if(fq)fq.classList.toggle('show',window.scrollY>620); };
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  // Phone assembly (kept out of source as char codes)
  var d=String.fromCharCode(49,56,53,53,57,55,50,55,52,54,51);
  var disp=d[0]+'-'+d.slice(1,4)+'-'+d.slice(4,7)+'-'+d.slice(7);
  document.querySelectorAll('[data-tel]').forEach(function(a){ a.setAttribute('href','tel:'+d); });
  document.querySelectorAll('.tel-out').forEach(function(s){ s.textContent=disp; });

  // Theme toggle
  document.querySelectorAll('.theme-toggle').forEach(function(b){ b.addEventListener('click',function(){
    var n=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',n); try{localStorage.setItem('brw-theme',n)}catch(e){}
  }); });

  // Mobile sheet
  var sheet=document.getElementById('sheet'), burger=document.getElementById('nav-burger'), bbMenu=document.getElementById('bottombar-menu');
  function setSheet(open){ if(!sheet)return; sheet.classList.toggle('open',open); if(burger){burger.classList.toggle('open',open);burger.setAttribute('aria-expanded',String(open));}
    sheet.setAttribute('aria-hidden',String(!open)); document.body.style.overflow=open?'hidden':''; }
  function toggleSheet(){ setSheet(!sheet.classList.contains('open')); }
  if(burger) burger.addEventListener('click',toggleSheet);
  if(bbMenu) bbMenu.addEventListener('click',toggleSheet);
  var sheetClose=document.getElementById('sheet-close');
  if(sheetClose) sheetClose.addEventListener('click',function(){ setSheet(false); });
  document.querySelectorAll('#sheet a').forEach(function(a){ a.addEventListener('click',function(){ setSheet(false); }); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') setSheet(false); });

  // Hero video — autoplay once on desktop (motion-OK), then glide to next section
  var hv=document.getElementById('hero-video');
  if(hv){ var s=hv.querySelector('source[data-src]');
    var reduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    var saveData=navigator.connection && navigator.connection.saveData;
    var allow=!reduced && !saveData;
    if(allow && s){ hv.muted=true; hv.setAttribute('autoplay',''); s.src=s.getAttribute('data-src'); hv.load(); var p=hv.play(); if(p&&p.catch)p.catch(function(){});
      var userMoved=false;
      window.addEventListener('scroll',function(){ if(window.scrollY>40) userMoved=true; },{passive:true});
      hv.addEventListener('ended',function(){
        if(userMoved || window.scrollY>40) return; // don't yank a visitor who's already scrolling
        var hero=document.querySelector('.hero-cine'), next=hero&&hero.nextElementSibling;
        if(next){ var navH=(nav?nav.offsetHeight:72); var y=next.getBoundingClientRect().top+window.scrollY-navH;
          window.scrollTo({top:y,behavior:'smooth'}); }
      });
    }
  }

  // Reveal
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:.12,rootMargin:'0px 0px -60px 0px'});
    document.querySelectorAll('.reveal,.fade-up').forEach(function(el){io.observe(el);});
  } else { document.querySelectorAll('.reveal,.fade-up').forEach(function(el){el.classList.add('in');}); }

  // Count-up
  if('IntersectionObserver' in window){
    var co=new IntersectionObserver(function(es){es.forEach(function(en){ if(!en.isIntersecting)return;
      var el=en.target,target=parseFloat(el.getAttribute('data-count')||'0'),suf=el.getAttribute('data-suffix')||'',pre=el.getAttribute('data-prefix')||'',dur=1500,t0=null,isF=String(target).indexOf('.')>-1;
      function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3),v=target*e;el.textContent=pre+(isF?v.toFixed(1):Math.round(v).toLocaleString())+suf;if(p<1)requestAnimationFrame(step);}
      requestAnimationFrame(step); co.unobserve(el);
    });},{threshold:.5});
    document.querySelectorAll('[data-count]').forEach(function(el){co.observe(el);});
  }

  // Marquee clone
  document.querySelectorAll('.marquee-track').forEach(function(tr){ if(tr.dataset.cloned)return; tr.dataset.cloned='1'; tr.parentElement.appendChild(tr.cloneNode(true)); });

  // Lightbox
  (function(){
    var triggers=document.querySelectorAll('[data-images]'); if(!triggers.length)return;
    var lb,img,title,count,thumbs,list=[],cur=0;
    function build(){ lb=document.createElement('div'); lb.className='lightbox';
      lb.innerHTML='<div class="lightbox-top"><div><div class="lightbox-title"></div><div class="lightbox-count"></div></div><button class="lightbox-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div><div class="lightbox-stage"><button class="lightbox-nav lightbox-prev" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 18l-6-6 6-6"/></svg></button><img class="lightbox-img" alt=""><button class="lightbox-nav lightbox-next" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 18l6-6-6-6"/></svg></button></div><div class="lightbox-thumbs"></div>';
      document.body.appendChild(lb); img=lb.querySelector('.lightbox-img'); title=lb.querySelector('.lightbox-title'); count=lb.querySelector('.lightbox-count'); thumbs=lb.querySelector('.lightbox-thumbs');
      lb.querySelector('.lightbox-close').onclick=close; lb.querySelector('.lightbox-prev').onclick=function(){go(cur-1)}; lb.querySelector('.lightbox-next').onclick=function(){go(cur+1)};
      lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lightbox-stage'))close();}); }
    function go(i){cur=(i+list.length)%list.length;img.src=list[cur];count.textContent=(cur+1)+' / '+list.length;var ts=thumbs.querySelectorAll('.lightbox-thumb');ts.forEach(function(t,j){t.classList.toggle('active',j===cur);});if(ts[cur])ts[cur].scrollIntoView({inline:'center',block:'nearest'});}
    function open(images,t){if(!lb)build();list=images;title.textContent=t||'';thumbs.innerHTML='';images.forEach(function(src,j){var im=document.createElement('img');im.className='lightbox-thumb';im.src=src;im.loading='lazy';im.onclick=function(){go(j)};thumbs.appendChild(im);});go(0);lb.classList.add('open');document.body.classList.add('lb-open');}
    function close(){if(lb){lb.classList.remove('open');document.body.classList.remove('lb-open');}}
    triggers.forEach(function(t){t.addEventListener('click',function(e){e.preventDefault();var im=(t.getAttribute('data-images')||'').split('|').filter(Boolean);if(im.length)open(im,t.getAttribute('data-title')||'');});});
    document.addEventListener('keydown',function(e){if(!lb||!lb.classList.contains('open'))return;if(e.key==='Escape')close();else if(e.key==='ArrowRight')go(cur+1);else if(e.key==='ArrowLeft')go(cur-1);});
  })();

  // Rail arrows + drag
  document.querySelectorAll('[data-rail]').forEach(function(rail){
    var prev=rail.querySelector('[data-rail-prev]'),next=rail.querySelector('[data-rail-next]'),track=rail.querySelector('[data-rail-track]'); if(!track)return;
    function by(dir){track.scrollBy({left:dir*Math.min(track.clientWidth*.8,520),behavior:'smooth'});}
    if(prev)prev.addEventListener('click',function(){by(-1)}); if(next)next.addEventListener('click',function(){by(1)});
  });
  document.querySelectorAll('[data-rail-track]').forEach(function(t){
    var down=false,sx=0,sl=0;
    t.addEventListener('pointerdown',function(e){down=true;sx=e.clientX;sl=t.scrollLeft;t.classList.add('dragging');});
    window.addEventListener('pointerup',function(){down=false;t.classList.remove('dragging');});
    t.addEventListener('pointermove',function(e){if(!down)return;t.scrollLeft=sl-(e.clientX-sx);});
  });

  // Magnetic (desktop, motion-OK)
  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    document.querySelectorAll('.magnetic').forEach(function(el){
      el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.transform='translate('+((e.clientX-(r.left+r.width/2))*.3)+'px,'+((e.clientY-(r.top+r.height/2))*.3)+'px)';});
      el.addEventListener('pointerleave',function(){el.style.transform='';});
    });
  }
})();
</script>`

export const THEME_INIT = `<script>(function(){try{var t=localStorage.getItem('brw-theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();</script>`

export function activeFromFilename(filename) {
  return String(filename).replace(/\\/g, '/').split('/').pop().replace(/\.html$/, '')
}
