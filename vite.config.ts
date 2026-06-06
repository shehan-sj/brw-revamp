import { defineConfig, type Plugin } from 'vite'
import { resolve } from 'path'
import { renderHeader, renderFooter, CHROME_SCRIPT, activeFromFilename } from './partials.mjs'

// Inject shared chrome (header / footer / interactivity) into every HTML entry,
// in dev and build alike. Edit markup in partials.mjs.
function chrome(): Plugin {
  return {
    name: 'brw-chrome',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const active = activeFromFilename(ctx.filename)
        return html
          .replace('<!--#HEADER-->', renderHeader(active))
          .replace('<!--#FOOTER-->', renderFooter())
          .replace('</body>', `${CHROME_SCRIPT}\n</body>`)
      },
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [chrome()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        'ooh-advertising': resolve(__dirname, 'ooh-advertising.html'),
        'transport-truck': resolve(__dirname, 'transport-truck.html'),
        'fleet-graphics': resolve(__dirname, 'fleet-graphics.html'),
        'custom-signs': resolve(__dirname, 'custom-signs.html'),
        about: resolve(__dirname, 'about.html'),
        agencies: resolve(__dirname, 'agencies.html'),
        'fleet-partner': resolve(__dirname, 'fleet-partner.html'),
        sustainability: resolve(__dirname, 'sustainability.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        testimonials: resolve(__dirname, 'testimonials.html'),
        charities: resolve(__dirname, 'charities.html'),
        blog: resolve(__dirname, 'blog.html'),
        quote: resolve(__dirname, 'quote.html'),
      },
    },
  },
})
