# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio + blog for Asaduzzaman Shuvro (Engineering Lead, Mobile & Backend),
built with Astro + Tailwind CSS v4, statically generated and deployed to GitHub Pages.

## Commands

```sh
npm run dev      # dev server at http://localhost:4321
npm run build    # static build to ./dist (also runs content sync + type gen)
npm run preview  # serve the built ./dist locally
```

There is no test suite. The quality gate is the production build plus Lighthouse against
`npm run preview` (target: ≥90 — currently 100 — on all four categories). To run it:
`npx lighthouse@latest http://localhost:4321/ --only-categories=performance,accessibility,best-practices,seo`.

## Architecture

- **`src/data/profile.ts` is the single source of truth** for all personal data — name,
  bio, contact, social links, and the contextual skill groups. Components and layouts
  import from here; do not hardcode personal info in components.
- **Content is markdown collections, not components.** `src/content.config.ts` defines two
  collections via the glob loader:
  - `projects/` — case studies. `type` (`professional` | `open-source`) controls sort
    order (professional first, then by `order`). `links` is an object with optional
    `github`/`appstore`/`live` URLs.
  - `blog/` — posts, sorted by `pubDate` descending.
  Both schemas have a `draft` boolean. **Draft filtering is environment-based**: every
  `getCollection` call filters with `import.meta.env.PROD ? !data.draft : true`, so drafts
  are visible in `dev` but excluded from production builds and `getStaticPaths`. The same
  ternary must be repeated wherever a collection is queried — keep it consistent.
- **Pages**: `src/pages/index.astro` composes the one-page site from `src/components/`
  section files. Detail routes are `projects/[slug].astro` and `blog/[slug].astro` (slug =
  the entry `id`). `rss.xml.js` builds the feed from the blog collection.
- **`src/layouts/Base.astro`** is the shared shell: meta/OG/Twitter tags, sitemap + RSS
  links, self-hosted font imports, the pre-paint dark-mode script, and the global
  IntersectionObserver that adds `.is-visible` to `.reveal` elements for scroll animations.

## Conventions that matter

- **Dark mode** is class-based (`.dark` on `<html>`), set before paint by an inline script
  in `Base.astro` reading `localStorage.theme` (falls back to `prefers-color-scheme`).
  Tailwind's dark variant is wired via `@custom-variant dark` in `src/styles/global.css`,
  not a config file (Tailwind v4 is CSS-first — theme tokens live in the `@theme` block in
  that file, there is no `tailwind.config.js`).
- **Animations** use the `.reveal` class (hidden until scrolled into view). Anything inside
  `@media (prefers-reduced-motion: reduce)` in `global.css` disables them — respect that
  when adding motion.
- **Accent color** is exposed as `--color-accent-*` theme tokens; use `text-accent-600`,
  `bg-accent-500`, etc., rather than raw hex.

## Build gotcha (do not remove)

`package.json` has `"overrides": { "vite": "7.3.5" }`. Astro 6 runs Vite 7, but
`@tailwindcss/vite` otherwise pulls its own Vite 8, and the two majors have incompatible
plugin bindings — the build fails with `Missing field tsconfigPaths`. The override forces a
single Vite. Re-test the build before changing or removing it.

`npm audit` reports a transitive esbuild dev-server advisory whose "fix" downgrades Astro to
2.x. Ignore it — it doesn't affect a static build, and the downgrade would break the site.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml` (`withastro/action` →
`actions/deploy-pages`). The repo is `asaduzzaman-shuvro.github.io`; Pages source must be
set to "GitHub Actions". `astro.config.mjs` `site` must match the deployed origin (used for
canonical URLs, sitemap, and RSS).

## Placeholders to replace (see `public/README-assets.md`)

`public/cv.pdf` (missing — the Download CV buttons 404 until added), `public/og.svg`
(replace with a 1200×630 PNG), the About-section photo, the placeholder LinkedIn URL in
`profile.ts`, and the two `draft: true` professional case studies in `src/content/projects/`.

## Working docs

`docs/research/` (committed) holds the research that shaped this site. `docs/plans/` is
gitignored (local-only planning scratch).
