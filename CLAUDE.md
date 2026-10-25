# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio + blog for A K M Asaduzzaman (Staff Software Engineer, positioned iOS-first
with backend as a secondary strength), built with Astro + Tailwind CSS v4, statically generated
and deployed to GitHub Pages.

## Commands

```sh
npm run dev      # dev server at http://localhost:4321
npm run build    # static build to ./dist (also runs content sync + type gen)
npm run preview  # serve the built ./dist locally
npm run cv       # render /cv → public/cv.pdf and /og → public/og.png (headless Chrome; deploy runs it)
npm run og       # same script as `cv` — both assets come from one build
```

There is no test suite. The quality gate is the production build plus Lighthouse against
`npm run preview` (target: ≥90 — currently 100 — on all four categories). To run it:
`npx lighthouse@latest http://localhost:4321/ --only-categories=performance,accessibility,best-practices,seo`.

## Architecture

- **`src/data/profile.ts` is the single source of truth** for all personal data — name,
  bio, contact, social links, the contextual skill groups, and `shippedApps` (the App Store
  shelf in `AppShelf.astro`; optional icons at `src/assets/apps/<slug>.png`, else a monogram).
  Components and layouts import from here; do not hardcode personal info in components.
- **Content is markdown collections, not components.** `src/content.config.ts` defines two
  collections via the glob loader:
  - `projects/` — case studies, sorted by `order` alone via `sortProjects()` in
    `src/data/projects.ts` (home grid and CV), so iOS work leads; the first card is
    featured. `type` (`professional` | `open-source`) is only a label. `links` is an object
    with optional `github`/`appstore`/`live` URLs. `cover` and `gallery` are `{ src, alt }`
    images relative to the entry (`./<slug>/feed.png`), optimized by `astro:assets`.
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
  Props cover `type="article"` (+ `publishedTime`/`modifiedTime`) for blog posts and
  `noindex`; a `head` slot takes per-page JSON-LD.
- **Structured data** lives in `src/data/schema.ts` (Person/WebSite on home, BlogPosting,
  CreativeWork for projects), built from `profile.ts`. Always serialize with its `jsonLd()`
  (escapes `<`) into `<script is:inline type="application/ld+json" slot="head" set:html=…>`.
- **Sitemap** (`@astrojs/sitemap` in `astro.config.mjs`): `filter` drops `/og/`; `serialize`
  adds `<lastmod>` to blog posts (and `/blog/`) by reading their frontmatter with `fs`,
  since collections aren't available at config time. Drafts are skipped. Pages without a real
  date get no lastmod — don't invent one.

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
- **`text-base` is a color, not a size.** The `--color-base` token makes `text-base` paint
  text in the page background (invisible). Use `text-[1rem]` for 16px type.
- **Internal links end in `/`** (`/blog/`, `/projects/x/`). `trailingSlash: 'always'` in
  `astro.config.mjs` matches how Pages serves `x/index.html`; a link without the slash costs
  a 301 in production and 404s in dev. Anchors (`/#work`) and files (`/cv.pdf`) are exempt.

## Build gotcha (do not remove)

`package.json` has `"overrides": { "vite": "7.3.5" }`. Astro 6 runs Vite 7, but
`@tailwindcss/vite` otherwise pulls its own Vite 8, and the two majors have incompatible
plugin bindings — the build fails with `Missing field tsconfigPaths`. The override forces a
single Vite. Re-test the build before changing or removing it.

`npm audit` reports a transitive esbuild dev-server advisory whose "fix" downgrades Astro to
2.x. Ignore it — it doesn't affect a static build, and the downgrade would break the site.

## Deployment

Live at https://asaduzzaman.xyz, **served from cPanel** (Hostever: nameservers
`dns1`–`dns4.hostever.com`, `A` → the cPanel server). GitHub Pages
(`asaduzzaman-shuvro.github.io`) is a secondary copy that 301s to the custom domain.

**Publishing to cPanel (the live site):** `npm run zip` (`scripts/cpanel-zip.sh`) re-renders
the CV + share card, builds, adds an `.htaccess` (404 page; 301 `www`/`http` →
`https://<domain>`), and zips `dist/` without the Pages-only `CNAME`/`.nojekyll` to
`dist/<domain>-site.zip` (or `npm run zip -- <path>`). The next build wipes `dist/`, so the
zip never reaches a Pages deploy. Upload it to `public_html` in
File Manager and Extract, overwriting. DNS is edited in cPanel's Zone Editor, which holds the
Google Search Console `TXT` verification record (keep it) and the SPF `TXT` record.

**Custom domain.** `public/CNAME` (`asaduzzaman.xyz`) is the **only** place the domain is
written: `astro.config.mjs` derives `SITE` from it (and fails the build if it isn't a bare
hostname), `src/pages/robots.txt.ts` generates robots from `site`, and `deploy.sh` and
`cpanel-zip.sh` read it. To change domains, edit that one file and run `npm run og`. It must
also ship in every Pages deploy — `deploy.sh` force-pushes `dist/`, and a `gh-pages` without
`CNAME` drops the custom domain from the Pages settings.

**GitHub Pages — branch-based** (`npm run deploy`, i.e. `scripts/deploy.sh`): builds and
force-pushes `dist/` to the `gh-pages` branch, which Pages serves. `dist/.nojekyll` is
required so the `_astro/` directory isn't stripped by Jekyll. This is used because the local
`gh` token lacks the `workflow` scope.

**To switch to auto-deploy-on-push (preferred):** run `gh auth refresh -h github.com -s
workflow`, move `docs/deploy-workflow.yml.disabled` back to `.github/workflows/deploy.yml`,
commit + push, and set the Pages source to "GitHub Actions" in repo settings.

`SITE` (from `public/CNAME`) is the deployed origin, used for canonical URLs, sitemap, RSS,
robots, JSON-LD, and the host printed on the CV and share card — re-run `npm run og` after
changing it.

**Search engines.** Verification tokens go in `seo` in `profile.ts` (empty = no tag rendered).
Google Search Console: prefer a *Domain* property for `asaduzzaman.xyz`, verified by a DNS
`TXT` record at the registrar (covers `www` and both schemes, no code change). The fallback is
a *URL-prefix* property with the HTML-tag method: paste the `content` value into
`seo.googleSiteVerification` and deploy. Then click Verify and submit `sitemap-index.xml`
under Sitemaps. Bing Webmaster Tools: import from Search Console (no token needed), or use its
meta-tag method with `seo.bingSiteVerification`.

## Generated assets (see `public/README-assets.md`)

**The share image is generated.** `src/pages/og.astro` is a 1200×630 brand card (noindex,
excluded from the sitemap) that `npm run og` screenshots to `public/og.png`, the default
`og:image` (`seo.ogImage` in `profile.ts`). Edit the page or the data, not the PNG.

The About photo is `src/assets/portrait.jpg` (1200px square crop, EXIF stripped), rendered via
`astro:assets` `<Image>` so the build emits small WebP variants — don't move it to `public/`.

**The CV is generated, not hand-made.** `src/pages/cv.astro` is a print-styled A4 page built
from `profile.ts` (summary, experience, skills, education, languages) plus the projects
collection; `npm run cv` (`scripts/render-assets.sh`) prints it to `public/cv.pdf`. Edit the data,
not the PDF. Keep heading letter-spacing tight on that page — wide tracking makes PDF text
extractors (and ATS parsers) split words into letters. It deliberately has no phone or
address.

Work history lives in `experience` in `profile.ts` (years only — the resume and LinkedIn
disagree on exact months). The professional case studies (`dn-news-app.md`,
`braze-connector.md`, `spenn.md`) name DN Media Group (formerly NHST Media Group) and SPENN
publicly; keep claims to what the resume states.

## Working docs

`docs/research/` (committed) holds the research that shaped this site. `docs/plans/` is
gitignored (local-only planning scratch).
