#!/usr/bin/env bash
# Print the application letter (/letter) to a PDF outside the repo. Run via `npm run letter`
# (optionally `npm run letter -- <output.pdf>`). Per-application values come from the gitignored
# src/data/letter.local.json. The page only renders when LETTER=1, so the final plain build
# leaves dist/ exactly as a deploy would see it — with no letter in it.
set -euo pipefail

cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-4331}"
OUT="${1:-$HOME/Downloads/A K M Asaduzzaman - Cover letter.pdf}"

LETTER=1 npm run build >/dev/null

npx astro preview --port "$PORT" >/dev/null 2>&1 &
PREVIEW_PID=$!
trap 'kill "$PREVIEW_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  curl -sf -o /dev/null "http://localhost:$PORT/letter/" && break
  sleep 0.5
done

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "http://localhost:$PORT/letter/" 2>/dev/null
echo "Wrote $OUT"

kill "$PREVIEW_PID" 2>/dev/null || true
# Leave dist/ clean: a plain build has no /letter/.
npm run build >/dev/null
