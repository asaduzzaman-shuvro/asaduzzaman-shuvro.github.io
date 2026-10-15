#!/usr/bin/env bash
# Render the generated public assets with headless Chrome, from one build + one preview server:
#   /cv/ → public/cv.pdf   (printed résumé)
#   /og/ → public/og.png   (1200×630 social-share card)
# Then stops the server. Run via `npm run cv` or `npm run og` (same script).
set -euo pipefail

cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-4329}"
CV_OUT="public/cv.pdf"
OG_OUT="public/og.png"

npm run build >/dev/null

npx astro preview --port "$PORT" >/dev/null 2>&1 &
PREVIEW_PID=$!
trap 'kill "$PREVIEW_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  curl -sf -o /dev/null "http://localhost:$PORT/cv/" && break
  sleep 0.5
done

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$CV_OUT" "http://localhost:$PORT/cv/" 2>/dev/null
echo "Wrote $CV_OUT"

# --virtual-time-budget lets the self-hosted fonts load and paint before the capture.
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 \
  --virtual-time-budget=2000 --screenshot="$OG_OUT" "http://localhost:$PORT/og/" 2>/dev/null
echo "Wrote $OG_OUT"
