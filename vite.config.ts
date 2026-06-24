import { defineConfig, type Plugin } from 'vite'
import { resolve } from 'path'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { renderHeader, renderFooter, THEME_INIT, activeFromFilename, renderTestimonialGrid, renderTestimonialSlider, ANALYTICS_HEAD, CONSENT_BANNER } from './partials.mjs'

const cardsFile = resolve(__dirname, 'generated/blog-cards.html')

// Inject shared chrome (header / footer / interactivity) + generated blog cards.
function chrome(): Plugin {
  return {
    name: 'brw-chrome',
    configureServer(server) {
      // serve the CMS at the bare /admin and /admin/ URLs in dev (MPA has no dir index)
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/admin' || req.url === '/admin/') req.url = '/admin/index.html'
        next()
      })
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const active = activeFromFilename(ctx.filename)
        const HEAD_ASSETS =
          `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" />\n` +
          `  <link rel="stylesheet" href="/src/styles/main.css" />`
        let out = html
          .replace('<head>', `<head>\n  ${THEME_INIT}`)
          .replace('</head>', `  ${HEAD_ASSETS}${ANALYTICS_HEAD}\n</head>`)
          .replace('<!--#HEADER-->', renderHeader(active))
          .replace('<!--#FOOTER-->', renderFooter() + CONSENT_BANNER)
        if (out.includes('<!--BLOG_CARDS-->')) {
          const cards = existsSync(cardsFile) ? readFileSync(cardsFile, 'utf8') : ''
          out = out.replace('<!--BLOG_CARDS-->', cards)
        }
        if (out.includes('<!--TESTIMONIALS_HOME-->')) out = out.replace('<!--TESTIMONIALS_HOME-->', renderTestimonialSlider())
        if (out.includes('<!--TESTIMONIALS_GRID-->')) out = out.replace('<!--TESTIMONIALS_GRID-->', renderTestimonialGrid())
        return out
      },
    },
  }
}

// Static pages + any generated post-*.html (blog posts).
const pages: Record<string, string> = {
  index: 'index.html', 'ooh-advertising': 'ooh-advertising.html', 'transport-truck': 'transport-truck.html',
  'fleet-graphics': 'fleet-graphics.html', 'custom-signs': 'custom-signs.html', about: 'about.html',
  agencies: 'agencies.html', 'fleet-partner': 'fleet-partner.html', sustainability: 'sustainability.html',
  projects: 'projects.html', testimonials: 'testimonials.html', videos: 'videos.html', charities: 'charities.html',
  services: 'services.html',
  news: 'news.html', quote: 'quote.html', pricing: 'pricing.html', faq: 'faq.html', privacy: 'privacy.html',
}
const input: Record<string, string> = {}
for (const [k, v] of Object.entries(pages)) input[k] = resolve(__dirname, v)
for (const f of readdirSync(__dirname).filter(f => /^post-.+\.html$/.test(f))) {
  input[f.replace(/\.html$/, '')] = resolve(__dirname, f)
}

export default defineConfig({
  base: './',
  appType: 'mpa', // multi-page: no SPA fallback (so /admin/ serves the CMS, not the home page)
  plugins: [chrome()],
  build: { rollupOptions: { input } },
})
