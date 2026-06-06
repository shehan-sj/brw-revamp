import './shared'

// ============================================================
// Home Page — Gallery Carousel
// ============================================================

interface GallerySlide {
  client: string
  gradient: string
  tag?: string
}

const SLIDES: GallerySlide[] = [
  { client: 'Know Human Trafficking',       gradient: 'linear-gradient(135deg,#1e0a3c,#4a0090)', tag: 'Non-Profit' },
  { client: 'ALS Society of Canada',         gradient: 'linear-gradient(135deg,#0a2440,#0060b0)', tag: 'Non-Profit' },
  { client: 'Yokohama Tire',                 gradient: 'linear-gradient(135deg,#1a1a1a,#d00000)', tag: 'Automotive' },
  { client: "Kelsey's",                      gradient: 'linear-gradient(135deg,#1e0a0a,#8b0000)', tag: 'Restaurant' },
  { client: 'The Salvation Army',            gradient: 'linear-gradient(135deg,#0a0a1e,#cc0000)', tag: 'Non-Profit' },
  { client: 'The Kidney Foundation',         gradient: 'linear-gradient(135deg,#0a1e3c,#0050a0)', tag: 'Non-Profit' },
  { client: 'Pathwise Credit Union',         gradient: 'linear-gradient(135deg,#0a2010,#006030)', tag: 'Finance' },
  { client: "Women's Trucking Federation",   gradient: 'linear-gradient(135deg,#1a0a1e,#7b00d4)', tag: 'Industry' },
  { client: 'Xplornet',                      gradient: 'linear-gradient(135deg,#001428,#007cc2)', tag: 'Telecom' },
  { client: 'Feed The Need',                 gradient: 'linear-gradient(135deg,#1e1200,#c07000)', tag: 'Non-Profit' },
  { client: 'Algoma Orchards',               gradient: 'linear-gradient(135deg,#0e1e00,#4a7800)', tag: 'Agriculture' },
  { client: "Ren's Pet Depot",               gradient: 'linear-gradient(135deg,#1e1000,#c04a00)', tag: 'Retail' },
  { client: 'Stylelit',                      gradient: 'linear-gradient(135deg,#1a0010,#a0006a)', tag: 'Fashion' },
  { client: 'Jensen Trailers',               gradient: 'linear-gradient(135deg,#0a0a0a,#3a3a3a)', tag: 'Transport' },
  { client: 'Easthill Outdoors',             gradient: 'linear-gradient(135deg,#051e0a,#005020)', tag: 'Outdoors' },
  { client: 'Bessada Kia',                   gradient: 'linear-gradient(135deg,#0a1428,#003c8c)', tag: 'Automotive' },
  { client: 'City of Woodstock',             gradient: 'linear-gradient(135deg,#0a1e0a,#004c14)', tag: 'Municipal' },
  { client: 'Big Country Raw',               gradient: 'linear-gradient(135deg,#1e0e00,#783000)', tag: 'Pet Food' },
  { client: 'Old Flame Brewing',             gradient: 'linear-gradient(135deg,#1a0a00,#a04000)', tag: 'Beverage' },
  { client: 'Bowmanville Hospital Foundation', gradient: 'linear-gradient(135deg,#001428,#005080)', tag: 'Healthcare' },
  { client: "Dr. D's Super 7",               gradient: 'linear-gradient(135deg,#0a001e,#5000a0)', tag: 'Health' },
  { client: 'Power Pole',                    gradient: 'linear-gradient(135deg,#0a0014,#280060)', tag: 'Fishing' },
  { client: 'Rockbrune Bros Moving',         gradient: 'linear-gradient(135deg,#141400,#504400)', tag: 'Moving' },
  { client: 'L.M.B Transport Inc.',          gradient: 'linear-gradient(135deg,#001800,#003c00)', tag: 'Transport' },
  { client: 'Invisible Fence',               gradient: 'linear-gradient(135deg,#001428,#0a4060)', tag: 'Pet Care' },
  { client: 'YWCA Durham',                   gradient: 'linear-gradient(135deg,#1e0028,#780096)', tag: 'Non-Profit' },
]

function initGallery(): void {
  const track    = document.getElementById('gallery-track')
  const dotsWrap = document.getElementById('gallery-dots')
  const prevBtn  = document.getElementById('gallery-prev')
  const nextBtn  = document.getElementById('gallery-next')
  if (!track || !dotsWrap) return

  // If slides were pre-rendered in HTML, use them; otherwise inject from SLIDES array
  const existingSlides = track.querySelectorAll('.gallery-slide')
  const TOTAL = existingSlides.length > 0 ? existingSlides.length : SLIDES.length
  let current = 0
  let autoTimer: ReturnType<typeof setInterval>

  if (existingSlides.length === 0) {
    // Inject slides (duplicated for infinite loop feel)
    const allSlides = [...SLIDES, ...SLIDES]
    allSlides.forEach((slide) => {
      const el = document.createElement('div')
      el.className = 'gallery-slide'
      el.innerHTML = `
        <div class="gallery-slide-inner">
          <div class="slide-placeholder" style="background:${slide.gradient}"></div>
          <div class="gallery-slide-gradient"></div>
          ${slide.tag ? `<span style="position:relative;z-index:2;font-size:0.7rem;font-weight:600;color:var(--c-accent);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.25rem;display:block">${slide.tag}</span>` : ''}
          <div class="gallery-slide-label">${slide.client}</div>
        </div>
      `
      track.appendChild(el)
    })
  }

  // Build dots
  for (let i = 0; i < TOTAL; i++) {
    const dot = document.createElement('button')
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '')
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`)
    dot.addEventListener('click', () => goTo(i))
    dotsWrap.appendChild(dot)
  }

  function getSlideWidth(): number {
    const slide = track.querySelector<HTMLElement>('.gallery-slide')
    if (!slide) return 320
    const gap = 20
    return slide.offsetWidth + gap
  }

  function goTo(index: number): void {
    current = ((index % TOTAL) + TOTAL) % TOTAL
    const offset = current * getSlideWidth()
    track.style.transform = `translateX(-${offset}px)`
    dotsWrap.querySelectorAll('.gallery-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current)
    })
  }

  function next(): void { goTo(current + 1) }
  function prev(): void { goTo(current - 1) }

  prevBtn?.addEventListener('click', () => { resetTimer(); prev() })
  nextBtn?.addEventListener('click', () => { resetTimer(); next() })

  function startTimer() {
    autoTimer = setInterval(() => { next() }, 3500)
  }
  function resetTimer() {
    clearInterval(autoTimer)
    startTimer()
  }

  const section = track.closest('.gallery-section')
  section?.addEventListener('mouseenter', () => clearInterval(autoTimer))
  section?.addEventListener('mouseleave', () => startTimer())

  // Touch/swipe support
  let touchStartX = 0
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX }, { passive: true })
  track.addEventListener('touchend', (e) => {
    const dx = touchStartX - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) { resetTimer(); dx > 0 ? next() : prev() }
  })

  startTimer()
}

// ---- Animated counters ----
function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('[data-count]')
  if (!counters.length) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const el = entry.target as HTMLElement
      const target = parseFloat(el.dataset['count'] ?? '0')
      const suffix = el.dataset['suffix'] ?? ''
      const prefix = el.dataset['prefix'] ?? ''
      const duration = 1600
      const start = performance.now()
      const isFloat = String(target).includes('.')

      function tick(now: number) {
        const t = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - t, 3)
        const val = target * ease
        el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      observer.unobserve(el)
    })
  }, { threshold: 0.5 })

  counters.forEach((el) => observer.observe(el))
}

// ---- Marquee duplicate ----
function initMarquee(): void {
  const track = document.querySelector<HTMLElement>('.marquee-track')
  if (!track) return
  const clone = track.cloneNode(true) as HTMLElement
  track.parentElement?.appendChild(clone)
}

document.addEventListener('DOMContentLoaded', () => {
  initGallery()
  initCounters()
  initMarquee()
})
