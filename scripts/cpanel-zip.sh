#!/usr/bin/env bash
# Build the site and package ./dist as a zip for cPanel (Apache): extract it into public_html.
# Adds an .htaccess (404 page + redirect to https://<domain from public/CNAME>) and leaves out
# the GitHub Pages-only files (CNAME, .nojekyll).
#   npm run zip                       → ~/Downloads/<domain>-site.zip
#   npm run zip -- path/to/out.zip    → custom location
set -euo pipefail

cd "$(dirname "$0")/.."

HOST="$(tr -d '[:space:]' < public/CNAME)"
OUT="${1:-$HOME/Downloads/${HOST//./-}-site.zip}"
case "$OUT" in /*) ;; *) OUT="$PWD/$OUT" ;; esac

echo "▶ Rendering CV + share card → public/cv.pdf, public/og.png…"
bash scripts/render-assets.sh

echo "▶ Building…"
npm run build >/dev/null

cat > dist/.htaccess <<EOF
# Static Astro build. Folders serve their index.html; Apache adds the trailing slash itself.
ErrorDocument 404 /404.html
DirectoryIndex index.html

# Force https://${HOST} (no www, no plain http). Needs the SSL certificate (AutoSSL) active.
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://${HOST}%{REQUEST_URI} [L,R=301]
EOF

echo "▶ Zipping dist → ${OUT}…"
mkdir -p "$(dirname "$OUT")"
rm -f "$OUT" # zip appends to an existing archive
(cd dist && zip -qr -X "$OUT" . -x CNAME .nojekyll '*.DS_Store')

echo "✓ $(unzip -l "$OUT" | tail -1 | awk '{print $2}') files → $OUT"
echo "  Upload to public_html in cPanel File Manager, then Extract (overwrite)."
