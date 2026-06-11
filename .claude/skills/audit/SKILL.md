---
name: audit
description: Run a pre-deploy health check on the Big Rig Wraps site — build, then scan for oversized images, missing alt text, leftover placeholders, broken internal links, and leaked secrets. Use before pushing or when the user asks to check/audit/QA the site.
allowed-tools: Bash, Read, Grep, Glob
---

## Pre-deploy audit for the Big Rig Wraps site

Run these checks and report findings grouped by severity. Fix only what the user approves.

1. **Build cleanly:**
   ```bash
   npm run build
   ```
   Any error/warning is a blocker.

2. **Oversized images** (anything over ~300 KB should usually be re-optimized with `scripts/optimize-images.mjs`):
   ```bash
   find public/images -type f -printf '%s\t%p\n' | awk -F'\t' '$1>307200{printf "%6d KB  %s\n",$1/1024,$2}' | sort -rn
   ```

3. **Leftover placeholders** (should be none on a finished site):
   ```bash
   grep -rln 'media-placeholder\|class="media-slot"\|>Truck photo<\|>Fleet photo<' ./*.html
   ```

4. **Images missing alt text:**
   ```bash
   grep -rnoE '<img [^>]*>' ./*.html | grep -v 'alt=' || echo "all images have alt"
   ```

5. **Broken internal links** — every `href="./x.html"` should resolve to a real file:
   ```bash
   for h in $(grep -rhoE 'href="\./[a-z0-9-]+\.html"' ./*.html partials.mjs | sed -E 's/.*"\.\/([^"]+)".*/\1/' | sort -u); do [ -f "$h" ] || echo "MISSING: $h"; done; echo "link check done"
   ```

6. **Leaked secrets** (must be zero):
   ```bash
   grep -rnaE 'sk-[A-Za-z0-9]{16}' --include=*.html --include=*.ts --include=*.mjs --include=*.js . | grep -v node_modules || echo "no secrets in source"
   ```

7. **Marker integrity** — every page should still build with chrome injected:
   ```bash
   grep -Lc 'class="masthead"' dist/*.html && echo "(any file listed above is MISSING the header)"
   ```

8. **Report** a concise summary: blockers first, then warnings, then a green checklist of what passed. Offer to fix issues; do not push.
