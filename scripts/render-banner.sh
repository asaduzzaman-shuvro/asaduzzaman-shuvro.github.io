#!/usr/bin/env bash
# Screenshot the LinkedIn banner (/banner, 1584×396) to a PNG outside the repo. Run via
# `npm run banner` (optionally `npm run banner -- <output.png>`). Nothing is written to public/:
# the banner is uploaded to LinkedIn by hand and never ships with the site. The page itself is
# noindex and filtered from the sitemap (astro.config.mjs), like /og/.
set -euo pipefail

cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-4333}"
OUT="${1:-$HOME/Downloads/linkedin-banner.png}"

npm run build >/dev/null

npx astro preview --port "$PORT" >/dev/null 2>&1 &
PREVIEW_PID=$!
trap 'kill "$PREVIEW_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  curl -sf -o /dev/null "http://localhost:$PORT/banner/" && break
  sleep 0.5
done

# --virtual-time-budget lets the self-hosted fonts load and paint before the capture.
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1584,396 \
  --virtual-time-budget=2000 --screenshot="$OUT" "http://localhost:$PORT/banner/" 2>/dev/null
echo "Wrote $OUT"
