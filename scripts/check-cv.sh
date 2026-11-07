#!/usr/bin/env bash
# Check one rendered CV PDF: page count, words, em/en dashes, repeated six-word phrases, banned
# tools. Usage: scripts/check-cv.sh <pdf> [facts.md]
# Banned tools come from the "## Banned tools" section of the facts file (default
# src/data/cv.facts.md), one per line or a comma list. Exits 1 on any problem; the build-cv
# skill's builder loops until this prints ALL GOOD.
set -euo pipefail
PDF="${1:?usage: scripts/check-cv.sh <pdf> [facts.md]}"
FACTS="${2:-$(cd "$(dirname "$0")/.." && pwd)/src/data/cv.facts.md}"
command -v pdftotext >/dev/null || { echo "pdftotext missing: brew install poppler"; exit 1; }
python3 - "$PDF" "$FACTS" <<'PY'
import collections, re, subprocess, sys
pdf, facts = sys.argv[1], sys.argv[2]
run = lambda *a: subprocess.run(list(a), capture_output=True, text=True).stdout
pages = int(re.search(r"Pages:\s+(\d+)", run("pdfinfo", pdf)).group(1))
text = run("pdftotext", "-layout", pdf, "-")
words = len(text.split())
problems = []
if pages > 2: problems.append(f"{pages} pages: two is the norm, cut content")
dashes = len(re.findall("[–—]", text))
if dashes: problems.append(f"{dashes} em or en dash(es): use a comma, a colon or a new sentence")
prose = "\n".join(l for l in text.split("\n") if not re.search(r"\b20\d\d\s*-\s*(now|20\d\d)\b", l))
w = re.findall(r"[a-z0-9%+/&-]+", re.sub(r"\s+", " ", prose.lower()))
reps = [p for p, c in collections.Counter(" ".join(w[i:i+6]) for i in range(len(w) - 5)).items() if c > 1]
if reps: problems.append(f"{len(reps)} repeated six-word phrase(s): " + " | ".join(reps[:3]))
banned = []
try:
    m = re.search(r"^## Banned tools\s*\n(.*?)(?=^## |\Z)", open(facts).read(), re.S | re.M)
    if m: banned = [t.strip(" -*\t") for t in re.split(r"[,\n]", m.group(1)) if t.strip(" -*\t")]
    else: problems.append(f"no '## Banned tools' section in {facts}")
except FileNotFoundError:
    problems.append(f"facts file missing: {facts} (banned tools not checked)")
for t in banned:
    if re.search(r"(?<![A-Za-z])" + re.escape(t.lower()) + r"(?![A-Za-z])", text.lower()):
        problems.append(f"banned tool on the page: {t}")
print(f"  {pdf}\n  pages {pages}  words {words}  dashes {dashes}  repeats {len(reps)}  banned tools checked {len(banned)}")
print("  ALL GOOD" if not problems else "  PROBLEMS:\n    " + "\n    ".join(problems))
sys.exit(1 if problems else 0)
PY
