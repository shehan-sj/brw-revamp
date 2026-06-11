---
name: add-photos
description: Optimize new photos and wire them into the Big Rig Wraps site. Use when the user wants to add images/photos to a page, the gallery, the hero, or replace placeholders, or drops new files into a folder to be used on the site.
allowed-tools: Bash, Read, Edit, Glob, Grep
---

## Add & wire up photos for the Big Rig Wraps site

This is a Vite multi-page static site. Source pages are root `*.html` using `<!--#HEADER-->` / `<!--#FOOTER-->` markers (chrome is injected by the Vite plugin in `vite.config.ts` from `partials.mjs`). Optimized images live in `public/images/` (and `public/images/gallery/` for the portfolio lightbox). `Media/` is gitignored — never commit raw source images.

### Steps

1. **Find the source images.** Ask the user where the new photos are (a folder, or specific files). Large originals belong in `Media/` or any temp folder — they are NOT committed.

2. **Optimize them to web-sized webp** using the generic optimizer:
   ```bash
   node scripts/optimize-images.mjs "<sourceFolder>" 1200
   # or into the gallery subfolder:
   node scripts/optimize-images.mjs "<sourceFolder>" 1200 gallery
   ```
   This writes `public/images/<slug>.webp` (≤1200px wide, q72). Confirm each is well under ~250 KB.

3. **Inspect** a few with the Read tool to confirm orientation/content before placing them (truck photos are landscape; portrait shots crop in card covers).

4. **Wire them into the page(s):**
   - Replace a placeholder `<div class="media-placeholder">…</div>` or `<div class="media-slot">…</div>` with `<img src="./images/<name>.webp" alt="…" loading="lazy" />`.
   - Hero frame: `index.html` `.hero-frame` — use a 4:3-ish landscape shot.
   - Service rows: `.svc-media` in `index.html`.
   - Two-column media: `.two-col-media` on inner pages.
   - Always add a descriptive `alt`; add `loading="lazy"` for anything below the fold.

5. **Gallery / lightbox (portfolio.html):** a project card opens a lightbox when it has `data-images="a|b|c"` and `data-title="…"`. To add a project: add a `.portfolio-card` with `data-tag`, `data-title`, `data-images` (pipe-separated `./images/gallery/*.webp`), and a cover `<img>`. The lightbox JS lives in `partials.mjs` (CHROME_SCRIPT) — no extra wiring needed.

6. **Build & verify:**
   ```bash
   npm run build
   ```
   Then confirm referenced images exist in `dist/images/`, and (if a preview server is running) that no `<img>` is broken (`naturalWidth > 0`).

7. **Report** which images went where and the total added weight. Do NOT push unless asked.
