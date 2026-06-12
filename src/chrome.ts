// @ts-nocheck
// Shared site interactivity (navbar, theme, mobile sheet, hero video, reveals,
// counters, marquee, lightbox, rails, magnetic). Bundled once by Vite and loaded
// via src/shared.ts on every page — no inline scripts in the HTML.
(function () {
  var nav = document.getElementById('navbar'), fq = document.querySelector('.floating-quote')
  var onScroll = function () {
    if (nav) nav.classList.toggle('stuck', window.scrollY > 16)
    if (fq) fq.classList.toggle('show', window.scrollY > 620)
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll()

  // Phone assembly (kept out of source as char codes)
  var d = String.fromCharCode(49, 56, 53, 53, 57, 55, 50, 55, 52, 54, 51)
  var disp = d[0] + '-' + d.slice(1, 4) + '-' + d.slice(4, 7) + '-' + d.slice(7)
  document.querySelectorAll('[data-tel]').forEach(function (a) { a.setAttribute('href', 'tel:' + d) })
  document.querySelectorAll('.tel-out').forEach(function (s) { s.textContent = disp })

  // Theme toggle
  document.querySelectorAll('.theme-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      var n = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', n); try { localStorage.setItem('brw-theme', n) } catch (e) {}
    })
  })

  // Mobile sheet
  var sheet = document.getElementById('sheet'), burger = document.getElementById('nav-burger'), bbMenu = document.getElementById('bottombar-menu')
  function setSheet(open) {
    if (!sheet) return
    sheet.classList.toggle('open', open)
    if (burger) { burger.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open)) }
    sheet.setAttribute('aria-hidden', String(!open)); document.body.style.overflow = open ? 'hidden' : ''
  }
  function toggleSheet() { setSheet(!sheet.classList.contains('open')) }
  if (burger) burger.addEventListener('click', toggleSheet)
  if (bbMenu) bbMenu.addEventListener('click', toggleSheet)
  var sheetClose = document.getElementById('sheet-close')
  if (sheetClose) sheetClose.addEventListener('click', function () { setSheet(false) })
  document.querySelectorAll('#sheet a').forEach(function (a) { a.addEventListener('click', function () { setSheet(false) }) })
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setSheet(false) })

  // Hero video — autoplay once on desktop (motion-OK), then glide to next section
  var hv = document.getElementById('hero-video')
  if (hv) {
    var s = hv.querySelector('source[data-src]')
    var reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    var saveData = navigator.connection && navigator.connection.saveData
    var allow = !reduced && !saveData
    if (allow && s) {
      hv.muted = true; hv.setAttribute('autoplay', ''); s.src = s.getAttribute('data-src'); hv.load()
      var p = hv.play(); if (p && p.catch) p.catch(function () {})
      var userMoved = false
      window.addEventListener('scroll', function () { if (window.scrollY > 40) userMoved = true }, { passive: true })
      hv.addEventListener('ended', function () {
        if (userMoved || window.scrollY > 40) return
        var hero = document.querySelector('.cine-hero'), next = hero && hero.nextElementSibling
        if (next) { var navH = (nav ? nav.offsetHeight : 72); var y = next.getBoundingClientRect().top + window.scrollY - navH; window.scrollTo({ top: y, behavior: 'smooth' }) }
      })
    }
  }

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) } }) }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
    document.querySelectorAll('.reveal,.fade-up').forEach(function (el) { io.observe(el) })
  } else { document.querySelectorAll('.reveal,.fade-up').forEach(function (el) { el.classList.add('in') }) }

  // Count-up
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return
        var el = en.target, target = parseFloat(el.getAttribute('data-count') || '0'), suf = el.getAttribute('data-suffix') || '', pre = el.getAttribute('data-prefix') || '', dur = 1500, t0 = null, isF = String(target).indexOf('.') > -1
        function step(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3), v = target * e; el.textContent = pre + (isF ? v.toFixed(1) : Math.round(v).toLocaleString()) + suf; if (p < 1) requestAnimationFrame(step) }
        requestAnimationFrame(step); co.unobserve(el)
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('[data-count]').forEach(function (el) { co.observe(el) })
  }

  // Marquee clone
  document.querySelectorAll('.marquee-track').forEach(function (tr) { if (tr.dataset.cloned || tr.dataset.swing !== undefined) return; tr.dataset.cloned = '1'; tr.parentElement.appendChild(tr.cloneNode(true)) })

  // Testimonial carousel (auto-rotate, dot controls, pause on hover)
  document.querySelectorAll('[data-testi]').forEach(function (c) {
    var slides = [].slice.call(c.querySelectorAll('.testi-slide'))
    var dots = [].slice.call(c.querySelectorAll('.testi-dot'))
    if (slides.length < 2) return
    var i = 0, timer = null
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    function show(n) {
      slides[i].classList.remove('is-active'); if (dots[i]) dots[i].classList.remove('is-active')
      i = (n + slides.length) % slides.length
      slides[i].classList.add('is-active'); if (dots[i]) dots[i].classList.add('is-active')
    }
    function start() { if (!reduce) { stop(); timer = window.setInterval(function () { show(i + 1) }, 5500) } }
    function stop() { if (timer) { clearInterval(timer); timer = null } }
    dots.forEach(function (d, n) { d.addEventListener('click', function () { show(n); start() }) })
    c.addEventListener('mouseenter', stop); c.addEventListener('mouseleave', start)
    start()
  })

  // YouTube video facade -> modal player (loads the iframe only on click)
  ;(function () {
    var cards = document.querySelectorAll('[data-yt]'); if (!cards.length) return
    var modal: any, frame: any
    function close() {
      if (!modal) return
      modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true')
      frame.innerHTML = ''; document.body.style.overflow = ''
    }
    function build() {
      modal = document.createElement('div')
      modal.className = 'video-modal'; modal.setAttribute('aria-hidden', 'true')
      modal.innerHTML = '<div class="video-modal-backdrop"></div><div class="video-modal-box"><button class="video-modal-close" aria-label="Close video">×</button><div class="video-modal-frame"></div></div>'
      document.body.appendChild(modal)
      frame = modal.querySelector('.video-modal-frame')
      modal.querySelector('.video-modal-backdrop').addEventListener('click', close)
      modal.querySelector('.video-modal-close').addEventListener('click', close)
      document.addEventListener('keydown', function (e: any) { if (e.key === 'Escape') close() })
    }
    function open(id: string, title: string) {
      if (!modal) build()
      frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + (title || 'Video testimonial') + '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'
    }
    cards.forEach(function (c) {
      c.addEventListener('click', function () { open(c.getAttribute('data-yt'), c.getAttribute('data-vtitle') || '') })
    })
  })()

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q'); var a = item.querySelector('.faq-a')
    if (!q || !a) return
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open')
      item.classList.toggle('open')
      q.setAttribute('aria-expanded', String(!isOpen))
      a.style.maxHeight = isOpen ? '' : a.scrollHeight + 'px'
    })
  })

  // Lightbox
  ;(function () {
    var triggers = document.querySelectorAll('[data-images]'); if (!triggers.length) return
    var lb, img, title, count, thumbs, list = [], cur = 0
    function build() {
      lb = document.createElement('div'); lb.className = 'lightbox'
      lb.innerHTML = '<div class="lightbox-top"><div><div class="lightbox-title"></div><div class="lightbox-count"></div></div><button class="lightbox-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div><div class="lightbox-stage"><button class="lightbox-nav lightbox-prev" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 18l-6-6 6-6"/></svg></button><img class="lightbox-img" alt=""><button class="lightbox-nav lightbox-next" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 18l6-6-6-6"/></svg></button></div><div class="lightbox-thumbs"></div>'
      document.body.appendChild(lb); img = lb.querySelector('.lightbox-img'); title = lb.querySelector('.lightbox-title'); count = lb.querySelector('.lightbox-count'); thumbs = lb.querySelector('.lightbox-thumbs')
      lb.querySelector('.lightbox-close').onclick = close; lb.querySelector('.lightbox-prev').onclick = function () { go(cur - 1) }; lb.querySelector('.lightbox-next').onclick = function () { go(cur + 1) }
      lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lightbox-stage')) close() })
    }
    function go(i) { cur = (i + list.length) % list.length; img.src = list[cur]; count.textContent = (cur + 1) + ' / ' + list.length; var ts = thumbs.querySelectorAll('.lightbox-thumb'); ts.forEach(function (t, j) { t.classList.toggle('active', j === cur) }); if (ts[cur]) ts[cur].scrollIntoView({ inline: 'center', block: 'nearest' }) }
    function open(images, t) { if (!lb) build(); list = images; title.textContent = t || ''; thumbs.innerHTML = ''; images.forEach(function (src, j) { var im = document.createElement('img'); im.className = 'lightbox-thumb'; im.src = src; im.loading = 'lazy'; im.onclick = function () { go(j) }; thumbs.appendChild(im) }); go(0); lb.classList.add('open'); document.body.classList.add('lb-open') }
    function close() { if (lb) { lb.classList.remove('open'); document.body.classList.remove('lb-open') } }
    triggers.forEach(function (t) { t.addEventListener('click', function (e) { e.preventDefault(); var im = (t.getAttribute('data-images') || '').split('|').filter(Boolean); if (im.length) open(im, t.getAttribute('data-title') || '') }) })
    document.addEventListener('keydown', function (e) { if (!lb || !lb.classList.contains('open')) return; if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') go(cur + 1); else if (e.key === 'ArrowLeft') go(cur - 1) })
  })()

  // Rail arrows + drag
  document.querySelectorAll('[data-rail]').forEach(function (rail) {
    var prev = rail.querySelector('[data-rail-prev]'), next = rail.querySelector('[data-rail-next]'), track = rail.querySelector('[data-rail-track]'); if (!track) return
    function by(dir) { track.scrollBy({ left: dir * Math.min(track.clientWidth * 0.8, 520), behavior: 'smooth' }) }
    if (prev) prev.addEventListener('click', function () { by(-1) }); if (next) next.addEventListener('click', function () { by(1) })
  })
  document.querySelectorAll('[data-rail-track]').forEach(function (t) {
    var down = false, sx = 0, sl = 0
    t.addEventListener('pointerdown', function (e) { down = true; sx = e.clientX; sl = t.scrollLeft; t.classList.add('dragging') })
    window.addEventListener('pointerup', function () { down = false; t.classList.remove('dragging') })
    t.addEventListener('pointermove', function (e) { if (!down) return; t.scrollLeft = sl - (e.clientX - sx) })
  })

  // Magnetic (desktop, motion-OK)
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    document.querySelectorAll('.magnetic').forEach(function (el) {
      el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); el.style.transform = 'translate(' + ((e.clientX - (r.left + r.width / 2)) * 0.3) + 'px,' + ((e.clientY - (r.top + r.height / 2)) * 0.3) + 'px)' })
      el.addEventListener('pointerleave', function () { el.style.transform = '' })
    })
  }
})()
