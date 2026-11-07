#!/usr/bin/env bash
# Print the application pair — the tailored CV (/cv) and the letter (/letter) — to PDFs outside
# the repo. Run via `npm run apply` (optionally `npm run apply -- <output dir>`; `npm run letter`
# is the same script). Per-application values come from the gitignored src/data/cv.local.json
# (headline, destination, permit, start date) and src/data/letter.local.json (company, role,
# greeting, opening, country). The build runs with LETTER=1 so the letter page renders and
# CV_LOCAL=1 so the CV reads its local file; the final plain build leaves dist/ exactly as a
# deploy would see it — no letter, and public/cv.pdf untouched.
set -euo pipefail

cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-4331}"
OUT_DIR="${1:-$HOME/Downloads}"
CV_OUT="$OUT_DIR/A K M Asaduzzaman - CV.pdf"
LETTER_OUT="$OUT_DIR/A K M Asaduzzaman - Cover letter.pdf"

[ -f src/data/cv.local.json ] || echo "No src/data/cv.local.json — the CV prints the public defaults (real title, Europe)." >&2
[ -f src/data/letter.local.json ] || echo "No src/data/letter.local.json — the letter prints its placeholders." >&2

LETTER=1 CV_LOCAL=1 npm run build >/dev/null

npx astro preview --port "$PORT" >/dev/null 2>&1 &
PREVIEW_PID=$!
trap 'kill "$PREVIEW_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  curl -sf -o /dev/null "http://localhost:$PORT/letter/" && break
  sleep 0.5
done

mkdir -p "$OUT_DIR"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$CV_OUT" "http://localhost:$PORT/cv/" 2>/dev/null
echo "Wrote $CV_OUT"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$LETTER_OUT" "http://localhost:$PORT/letter/" 2>/dev/null
echo "Wrote $LETTER_OUT"

kill "$PREVIEW_PID" 2>/dev/null || true
# Leave dist/ clean: a plain build has no /letter/ and the public CV.
npm run build >/dev/null
