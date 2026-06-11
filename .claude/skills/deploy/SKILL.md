---
name: deploy
description: Build, commit, and push the Big Rig Wraps site to GitHub so the Pages CI redeploys. Only the user invokes this.
disable-model-invocation: true
allowed-tools: Bash
---

## Deploy the Big Rig Wraps site

Deployment is automatic: pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages (`dist/` is gitignored — CI rebuilds it). Live URL: https://shehan-sj.github.io/brw-revamp/

### Steps

1. **Verify it builds first:**
   ```bash
   npm run build
   ```
   Stop and report if the build fails — never push a broken build.

2. **Show what will ship:**
   ```bash
   git status -s && git diff --stat
   ```
   Briefly summarize the changes for the user.

3. **Confirm no secrets/large files are staged.** `Media/`, `node_modules/`, and `dist/` must stay ignored. Abort if any large binary or `sk-…` token would be committed.

4. **Commit & push** (only after the user has confirmed in their request):
   ```bash
   git add -A
   git commit -m "<concise message describing the change>"
   git push
   ```
   End the commit message with the project's Co-Authored-By line.

5. **Watch the deploy** (optional, if `gh` is available):
   ```bash
   gh run watch --exit-status 2>&1 | tail -5
   ```
   Then confirm the live site returns 200:
   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" https://shehan-sj.github.io/brw-revamp/
   ```

6. Report the result and the live URL.
