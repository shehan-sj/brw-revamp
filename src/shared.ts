// ============================================================
// Shared interactive behaviours — included on every page
// ============================================================
import './style.css'

// ---- Sticky nav ----
const header = document.getElementById('site-header')
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('nav-toggle')
const mainNav   = document.getElementById('main-nav')

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open')
    navToggle.classList.toggle('open', open)
    navToggle.setAttribute('aria-expanded', String(open))
    document.body.style.overflow = open ? 'hidden' : ''
  })

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header?.contains(e.target as Node)) {
      mainNav.classList.remove('open')
      navToggle.classList.remove('open')
      navToggle.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
    }
  })
}

// ---- Desktop dropdowns ----
document.querySelectorAll<HTMLElement>('.nav-item.has-dropdown').forEach((item) => {
  const toggle = item.querySelector<HTMLElement>('.dropdown-toggle')
  if (!toggle) return

  toggle.addEventListener('click', (e) => {
    e.stopPropagation()
    const isOpen = item.classList.contains('open')
    // Close all others
    document.querySelectorAll('.nav-item.has-dropdown').forEach(i => i.classList.remove('open'))
    if (!isOpen) item.classList.add('open')
  })

  document.addEventListener('click', () => {
    item.classList.remove('open')
  })
})

// ---- Scroll-reveal animations ----
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
)

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
