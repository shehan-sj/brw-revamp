// @ts-nocheck
// Cinematic motion layer: smooth momentum scroll (Lenis), scroll-linked
// parallax, a top scroll-progress bar, and a kinetic hero headline.
// Loaded after chrome.ts; degrades fully under prefers-reduced-motion.
import Lenis from 'lenis'

;(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ---- Smooth momentum scroll ----
  var lenis = null
  if (!reduced) {
    lenis = new Lenis({ duration: 1.05, easing: function (t) { return 1 - Math.pow(1 - t, 3) }, smoothWheel: true })
    window.__lenis = lenis
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    // route in-page anchors through Lenis
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href')
      if (id && id.length > 1) a.addEventListener('click', function (e) {
        var t = document.querySelector(id); if (!t) return
        e.preventDefault(); lenis.scrollTo(t, { offset: -72 })
      })
    })
  }

  // ---- Scroll progress bar ----
  var bar = document.createElement('div'); bar.className = 'scroll-progress'
  document.body.appendChild(bar)
  function progress() {
    var h = document.documentElement.scrollHeight - window.innerHeight
    bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ')'
  }

  // ---- Parallax (translate inner media as it crosses the viewport) ----
  // auto-tag inner-page two-column images so every page gets subtle depth
  document.querySelectorAll('.two-col-media').forEach(function (el) {
    if (!el.hasAttribute('data-parallax')) el.setAttribute('data-parallax', '0.06')
  })
  var px = [].slice.call(document.querySelectorAll('[data-parallax]'))
  function parallax() {
    if (reduced) return
    var vh = window.innerHeight
    for (var i = 0; i < px.length; i++) {
      var el = px[i], r = el.getBoundingClientRect()
      if (r.bottom < -200 || r.top > vh + 200) continue
      var speed = parseFloat(el.getAttribute('data-parallax') || '0.15')
      var center = (r.top + r.height / 2) - vh / 2
      el.style.setProperty('--py', (center * -speed).toFixed(1) + 'px')
    }
  }

  // rAF loop keeps parallax + progress in lockstep with Lenis
  function loop() { progress(); parallax(); requestAnimationFrame(loop) }
  requestAnimationFrame(loop)

  // ---- Kinetic inner-page headings: wrap each <br>-delimited line for reveal ----
  document.querySelectorAll('.page-hero h1').forEach(function (h) {
    if (h.querySelector('.line')) return
    var parts = h.innerHTML.split(/<br\s*\/?>/i)
    h.innerHTML = parts.map(function (p) { return '<span class="line"><span>' + p + '</span></span>' }).join('')
  })
})()
