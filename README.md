# Big Rig Wraps — website

Static marketing site (Vite + multi-page HTML/CSS/TS) deployed to **GitHub Pages**.
Light/dark theme, cinematic hero, photo gallery + lightbox, and a **local Markdown blog with a CMS editor**.

Live: https://shehan-sj.github.io/brw-revamp/

---

## Prerequisites
- [Node.js](https://nodejs.org/) 18+ (includes `npm`).
- First time only, install dependencies:
  ```bash
  npm install
  ```
- On Windows, if PowerShell blocks `npm` with a script-execution error, run once:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```

## Common commands
| Command | What it does |
|---|---|
| `npm run dev` | Start the local site (hot reload). Use the **URL it prints**. |
| `npm run cms` | Start the local CMS server (Decap, port 8081) — needed to edit blog posts. |
| `npm run build` | Production build into `dist/` (also generates blog pages). |
| `npm run preview` | Serve the built `dist/` locally. |

---

## ✍️ Writing a blog post (local CMS → git)

You author posts on your own machine; nothing is hosted by a third party.

1. **Open two terminals** in the project folder and run one command in each:
   ```bash
   npm run cms      # terminal 1  → local content backend (keep it running)
   npm run dev      # terminal 2  → the site
   ```
2. **Open the editor** at the **port `npm run dev` printed** + `/admin/`, e.g.
   `http://localhost:5173/admin/`
   > ⚠️ If port 5173 is busy, Vite uses 5174/5175 — **always use the port shown in the `npm run dev` terminal**, not an assumed 5173. Opening the wrong port is what causes "blank/home page" or "config 404".
3. Click **Login** (the local backend needs no password), then **New Post** (or edit an existing one).
   Fill in **Title, Date, Tag, Cover image, Excerpt, Body**, then **Publish/Save**.
   - This writes a Markdown file to `content/blog/` and any image to `public/images/blog/`.
4. **See it locally:** restart `npm run dev` (or run `npm run build`) so the blog list regenerates.
5. **Publish to the live site:**
   ```bash
   git add .
   git commit -m "Add blog post: <title>"
   git push
   ```
   GitHub Actions rebuilds and deploys automatically (~40s).

You can also just create/edit the Markdown files in `content/blog/` by hand — same result.

### Post format (`content/blog/<slug>.md`)
```markdown
---
title: My Post Title
date: 2026-06-11
tag: Strategy
cover: /images/blog/my-cover.webp
excerpt: One or two sentences shown on the blog list.
---

Body in **Markdown** — headings, lists, > quotes, [links](./quote.html), images.
```

---

## Deploying
Every push to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/`.
Pages must be set to **Settings → Pages → Source: GitHub Actions** (one-time).

> Tip: after a deploy, check the live site in an **incognito tab** — mobile browsers cache aggressively.

## Project layout
```
index.html, about.html, …   # static pages (share header/footer via partials.mjs)
content/blog/*.md           # blog posts (source of truth)
public/admin/               # local CMS (Decap) — config.yml + index.html
public/images/              # optimized webp imagery (+ gallery/)
src/style.css               # design system (light + dark themes)
partials.mjs                # shared navbar/footer/scripts (injected at build by vite.config.ts)
scripts/                    # build helpers (gen-blog, image optimizers, fix-html)
```

## Project skills (Claude Code)
`/add-photos` · `/new-page` · `/audit` · `/design-review` · `/deploy` — see `.claude/skills/`.
