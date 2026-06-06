import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
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
      }
    }
  }
})
