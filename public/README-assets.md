# Replace these placeholder assets before launch

- **`cv.pdf`** — generated from the `/cv` page by `npm run cv` (and on every `npm run deploy`). Don't replace it by hand; edit `src/data/profile.ts` instead.
- **`og.svg`** — social-share preview image. An SVG placeholder ships now; replace with a 1200×630 PNG (`og.png`) and update the default `image` in `src/layouts/Base.astro` for best compatibility with link unfurlers.
