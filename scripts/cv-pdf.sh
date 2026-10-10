#!/usr/bin/env bash
# Render the /cv page to public/cv.pdf with headless Chrome.
# Builds the site, serves it with `astro preview`, prints, then stops the server.
set -euo pipefail

cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-4329}"
OUT="public/cv.pdf"

npm run build >/dev/null

npx astro preview --port "$PORT" >/dev/null 2>&1 &
PREVIEW_PID=$!
trap 'kill "$PREVIEW_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  curl -sf -o /dev/null "http://localhost:$PORT/cv/" && break
  sleep 0.5
done

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "http://localhost:$PORT/cv/" 2>/dev/null

echo "Wrote $OUT"
