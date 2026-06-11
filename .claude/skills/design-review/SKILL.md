---
name: design-review
description: Critique the Big Rig Wraps site's UI/UX and accessibility, then propose concrete fixes. Use when the user wants a design review, UX/a11y audit, polish pass, or asks "how does this look / is this accessible / review the design".
allowed-tools: Bash, Read, Grep, Glob, Edit
---

## Design & accessibility review — Big Rig Wraps

Review the **current diff** (or a page the user names) against the checklist below. This is a critique pass: report findings grouped by severity (🔴 broken · 🟠 should-fix · 🟡 polish), each with the file/line and a concrete fix. Apply fixes only after the user approves. Quality of the *recommendation* matters more than quantity — skip nits that don't affect the experience.

### Project context (check against this)
- Design tokens + components live in `src/style.css`. Colors are CSS variables (`--ink`, `--paper`, `--accent #d9540a`, `--muted`, `--line`…).
- **Two themes**: light is `:root`; dark is `html[data-theme="dark"]`. Every visual change must work in BOTH — check dark explicitly.
- Chrome (header/drawer/footer) is injected from `partials.mjs`; type scale uses Anton (display) + Inter (body). Breakpoints in use: 1000 / 860 / 640 / 600 / 560 / 480.
- Interactive pieces: slide-in drawer, lightbox (`data-images`), drag rails, magnetic buttons, scroll reveals, theme toggle.

### How to inspect
1. `npm run build` (must pass).
2. If a preview server + browser eval is available, read **computed styles** (background, color, font-size, grid-template-columns) and measure layout (overflow, element rects) at desktop **and** mobile (375px). Compute contrast ratios from real rendered colors. Prefer measured facts over assumptions.
3. Otherwise audit statically from `src/style.css` + the HTML.

### A11y checklist (WCAG-leaning)
- **Contrast**: body/UI text ≥ 4.5:1, large/bold text ≥ 3:1, against the ACTUAL rendered bg — in light AND dark. Watch `--muted`/`--dim` on tinted panels, text over images, and accent-on-white.
- **Tap targets**: interactive controls ≥ ~44×44px (nav buttons, filter chips, lightbox arrows, social icons, theme toggle).
- **Focus states**: keyboard focus must be visible on links, buttons, form fields, drawer/lightbox controls (don't rely on `:hover` only). Add `:focus-visible` styles if missing.
- **Images**: every `<img>` has a meaningful `alt` (decorative → `alt=""`). Below-the-fold → `loading="lazy"`.
- **Headings**: one `<h1>` per page; no skipped levels; headings describe sections (not used purely for size).
- **Semantics/labels**: icon-only buttons have `aria-label`; form inputs have associated `<label>`; the drawer/lightbox are keyboard-operable and `Esc`-closable.
- **Motion**: honor `prefers-reduced-motion` (marquee, parallax, reveals, drag). Confirm the reduced path exists.
- **Forms**: required fields marked; clear error affordances; inputs not relying on placeholder as the only label.

### UI/UX polish checklist
- **Responsive**: no horizontal overflow at 320/375/768/1024/1440; hero, grids, and cards reflow sensibly; text never clipped; images keep aspect (no squish).
- **Rhythm & alignment**: consistent section spacing, gutters, and grid alignment; avoid orphaned/awkward whitespace.
- **Hierarchy**: clear primary action per view; eyebrow → headline → body → CTA flow; one dominant CTA color (accent) — don't dilute it.
- **Imagery**: covers use `object-fit: cover`; placeholders never ship; consistent corner radius/border treatment; light & dark both look intentional.
- **States**: hover/active/disabled/empty/loading all considered; links look clickable; cards signal interactivity (cursor, lift).
- **Consistency**: reuse tokens/classes instead of one-off hex/px; buttons, cards, badges share styling; copy tone consistent.
- **Performance-as-UX**: no oversized images (>~300 KB), lazy-load below the fold, avoid layout shift (set width/height or aspect-ratio on media).

### Output
Concise report: severity-grouped findings (file:line + fix), then a short "what's already good" list, then offer to apply the fixes. Re-verify any applied fix in both themes and at mobile width.
