---
name: new-page
description: Scaffold a new page on the Big Rig Wraps site with the shared header/footer, design system, and routing. Use when the user wants to add a new page (e.g. FAQ, Pricing, Contact, a new service) to the site.
allowed-tools: Bash, Read, Edit, Write, Glob
---

## Add a new page to the Big Rig Wraps site

Pages are root-level `*.html` files. The header/footer come from `<!--#HEADER-->` / `<!--#FOOTER-->` markers, expanded at build/dev time by the Vite plugin in `vite.config.ts` (defined in `partials.mjs`). CSS + theme + interactivity load via the module script. Styling uses the design system in `src/style.css` (tokens like `--ink`, `--accent`, classes like `.section`, `.page-hero`, `.container`, `.btn`, `.two-col`, etc.). Light/dark theme is automatic.

### Steps

1. **Pick a slug** (kebab-case, e.g. `pricing` → `pricing.html`).

2. **Create `<slug>.html`** at the repo root using this skeleton:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <meta name="description" content="<one-line SEO description>" />
     <title><Page Title> | Big Rig Wraps</title>
     <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
     <link rel="preconnect" href="https://fonts.googleapis.com" />
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   </head>
   <body>
   <!--#HEADER-->

   <div class="page-hero">
     <div class="container">
       <span class="label"><Eyebrow></span>
       <h1><Headline></h1>
       <p><Intro sentence.></p>
     </div>
   </div>

   <section class="section">
     <div class="container">
       <!-- content using .section-head, .two-col, .feature-list, .btn, etc. -->
     </div>
   </section>

   <section class="section cta-section">
     <div class="container">
       <h2 class="fade-up">Ready to Roll?</h2>
       <p class="fade-up">Get a custom quote within 48 hours.</p>
       <div class="cta-actions fade-up">
         <a href="./quote.html" class="btn btn-primary btn-lg">Get a Free Quote</a>
       </div>
     </div>
   </section>

   <!--#FOOTER-->
   <script type="module" src="./src/page.ts"></script>
   </body>
   </html>
   ```
   Use `reveal` or `fade-up` on elements you want to animate in.

3. **Register it in `vite.config.ts`** — add to `rollupOptions.input`:
   ```js
   '<slug>': resolve(__dirname, '<slug>.html'),
   ```

4. **Add nav/footer links (optional)** by editing `partials.mjs` — add the page to the relevant drawer group (`SERVICES` / `COMPANY` / `WORK`) and/or the `renderFooter()` columns. This updates every page at once.

5. **Build & verify:**
   ```bash
   npm run build
   ```
   Confirm `dist/<slug>.html` exists and contains the injected `class="masthead"` + `class="colophon"` (markers expanded) and a `<link rel="stylesheet">` (no `crossorigin`).

6. Match existing tone/structure of sibling pages. Do NOT push unless asked.
