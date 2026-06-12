// Build the blog from Markdown: reads content/blog/*.md and generates
//   • generated/blog-cards.html  (injected into blog.html by the Vite plugin)
//   • post-<slug>.html           (one page per post, with shared chrome markers)
// Run before `vite build` (and `vite`). Generated HTML is gitignored.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const SRC = join(root, 'content/blog')
const GEN = join(root, 'generated')
mkdirSync(GEN, { recursive: true })

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const rel = (p) => p ? ('.' + (p.startsWith('/') ? p : '/' + p)) : ''      // /images/x → ./images/x
const fmtDate = (d) => { const dt = new Date(d); return isNaN(dt) ? String(d) : dt.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }) }

let files = []
try { files = readdirSync(SRC).filter(f => f.endsWith('.md')) } catch { files = [] }

const posts = files.map(f => {
  const slug = f.replace(/\.md$/, '')
  const { data, content } = matter(readFileSync(join(SRC, f), 'utf8'))
  return { slug, title: data.title || slug, date: data.date || '2026-01-01', tag: data.tag || 'News',
    cover: rel(data.cover), excerpt: data.excerpt || '', bodyHtml: marked.parse(content) }
}).sort((a, b) => new Date(b.date) - new Date(a.date))

const arrow = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'

// ---- blog listing cards ----
const cards = posts.map(p => `
      <a class="blog-card fade-up" href="./post-${p.slug}.html">
        <div class="blog-card-img">${p.cover ? `<img src="${p.cover}" alt="${esc(p.title)}" loading="lazy" />` : ''}</div>
        <div class="blog-card-body">
          <div class="blog-meta"><span class="blog-date">${fmtDate(p.date)}</span><span class="blog-tag">${esc(p.tag)}</span></div>
          <h4>${esc(p.title)}</h4>
          <p>${esc(p.excerpt)}</p>
          <span class="blog-read-more">Read More ${arrow}</span>
        </div>
      </a>`).join('\n')
writeFileSync(join(GEN, 'blog-cards.html'), cards || '<p class="lede">No posts yet — add one in the local CMS.</p>')

// ---- individual post pages ----
const page = (p) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${esc(p.excerpt)}" />
  <title>${esc(p.title)} | Big Rig Wraps</title>
  <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
<body>
<!--#HEADER-->
<article class="section pt-nav">
  <div class="container">
    <div class="post-wrap">
      <a class="post-back" href="./blog.html">${'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'} All posts</a>
      <div class="post-head">
        <span class="label">${esc(p.tag)}</span>
        <h1>${esc(p.title)}</h1>
        <div class="post-meta">${fmtDate(p.date)} · Big Rig Wraps</div>
      </div>
      ${p.cover ? `<img class="post-cover" src="${p.cover}" alt="${esc(p.title)}" />` : ''}
      <div class="prose">${p.bodyHtml}</div>
    </div>
  </div>
</article>
<section class="section cta-section">
  <div class="container">
    <h2 class="fade-up">Ready to Roll?</h2>
    <p class="fade-up">Put your brand on the highway — get a custom quote within 48 hours.</p>
    <div class="cta-actions fade-up"><a href="./quote.html" class="btn btn-accent btn-lg">Get a Free Quote</a></div>
  </div>
</section>
<!--#FOOTER-->
<script type="module" src="./src/page.ts"></script>
</body>
</html>`

for (const p of posts) writeFileSync(join(root, `post-${p.slug}.html`), page(p))

console.log(`gen-blog: ${posts.length} post(s) → post-*.html + generated/blog-cards.html`)
posts.forEach(p => console.log(`  • ${p.slug}`))
