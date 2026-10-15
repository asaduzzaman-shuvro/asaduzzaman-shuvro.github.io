#!/usr/bin/env bash
# Build the site and publish ./dist to the gh-pages branch.
# Used because the gh token currently lacks the `workflow` scope needed for the
# GitHub Actions deploy. To switch to auto-deploy-on-push instead, run:
#   gh auth refresh -h github.com -s workflow
# then restore docs/deploy-workflow.yml.disabled to .github/workflows/deploy.yml,
# commit, push, and set the Pages source back to "GitHub Actions".
set -euo pipefail

cd "$(dirname "$0")/.."

echo "▶ Rendering CV + share card → public/cv.pdf, public/og.png…"
bash scripts/render-assets.sh

echo "▶ Building…"
npm run build
touch dist/.nojekyll

WT=$(mktemp -d)
echo "▶ Publishing dist → gh-pages…"
git worktree add --orphan -b gh-pages-tmp "$WT" >/dev/null 2>&1 || git worktree add "$WT" gh-pages
rm -rf "${WT:?}/"* 2>/dev/null || true
cp -R dist/. "$WT/"
(
  cd "$WT"
  git add -A
  git commit -q -m "Deploy site $(date -u +%Y-%m-%dT%H:%M:%SZ)" || { echo "nothing to deploy"; exit 0; }
  git branch -M gh-pages
  git push -f -u origin gh-pages
)
git worktree remove --force "$WT"
echo "✓ Deployed → https://asaduzzaman.xyz/"
