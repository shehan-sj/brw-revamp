import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs'
const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const css = readFileSync(root + '/src/style.css', 'utf8')
const dir = root + '/src/styles'
if (existsSync(dir)) rmSync(dir, { recursive: true })
mkdirSync(dir, { recursive: true })

// split before each top banner line: ^/* ==============…
const parts = css.split(/(?=^\/\* ={20,}$)/m).filter(p => p.trim())
const slug = (t) => (t || 'misc').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 22) || 'misc'
const titleOf = (p) => (p.split('\n')[1] || '').trim()   // 2nd line of the banner box

const rename = {
  'big-rig-wraps-design-system-v3-the': 'tokens-base', 'big-rig-wraps-design-s': 'tokens-base',
  'navbar-desktop-visible-links-drop': 'nav', 'masthead-slide-in-drawer': 'nav',
  'cinematic-hero': 'hero', 'trust-strip-marquee': 'marquee', 'reveal-util': 'utilities',
  'blog-post-rendered-markdown': 'blog', 'showcase-rail-gallery': 'gallery',
  'page-hero-inner-two-col': 'page-inner', 'awards-why-features': 'why',
  'testimonials-voice-eco': 'testimonials-cta', 'how-it-works-specs-truck': 'how-it-works',
}
const imports = []
parts.forEach((p, i) => {
  const n = String(i).padStart(2, '0')
  let name = slug(titleOf(p)); name = rename[name] || name
  const fname = `${n}-${name}.css`
  writeFileSync(`${dir}/${fname}`, p.replace(/\s+$/, '') + '\n')
  imports.push(`import './styles/${fname}'`)
  console.log(`  src/styles/${fname}  (${p.trim().split('\n').length} lines)`)
})

// regenerate shared.ts to import the css modules (in order) + chrome
writeFileSync(root + '/src/shared.ts',
  `// Entry loaded (transitively) by every page. Pulls in the stylesheet modules\n` +
  `// (split by section, in cascade order) + shared interactivity — all bundled by\n` +
  `// Vite, so there is no inline CSS or JS in the HTML.\n` +
  imports.join('\n') + `\nimport './chrome'\n`)

console.log(`\n${parts.length} CSS modules + shared.ts regenerated`)
