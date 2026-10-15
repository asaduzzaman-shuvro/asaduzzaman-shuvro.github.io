# Portfolio

Personal portfolio and blog for **A K M Asaduzzaman** — Staff Software Engineer, Mobile & Backend.
Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), deployed
to GitHub Pages.

## Commands

```sh
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build to ./dist
npm run preview    # preview the production build
npm run deploy     # build and publish ./dist to the gh-pages branch (GitHub Pages)
npm run zip        # build and zip ./dist for cPanel → dist/<domain>-site.zip
```

Live at <https://asaduzzaman.xyz>. Deploys publish the build to the `gh-pages`
branch (see `scripts/deploy.sh`). To switch to auto-deploy on `git push`, see the
Deployment notes in `CLAUDE.md`.

## Structure

| Path | What |
|------|------|
| `src/data/profile.ts` | **Single source of truth** for name, bio, contact, links, and skills. Edit this first. |
| `src/content/projects/` | Project case studies (markdown). `draft: true` entries are hidden in production. |
| `src/content/blog/` | Blog posts (markdown). `draft: true` entries are hidden in production. |
| `src/content.config.ts` | Content collection schemas (projects, blog). |
| `src/components/` | Section components (Hero, Projects, Skills, About, Contact, BlogTeaser, Header, Footer). |
| `src/pages/` | Routes: `index.astro`, `projects/[slug]`, `blog/`, `rss.xml.js`. |
| `src/layouts/Base.astro` | Shared HTML shell — meta/OG tags, dark-mode, fonts, scroll-reveal. |
| `public/` | Static assets. See `public/README-assets.md` for placeholders to replace. |

## Adding content

- **A project:** add `src/content/projects/<slug>.md` with the frontmatter fields from
  `content.config.ts`. Set `draft: false` to publish. Professional projects sort before
  open-source ones, then by `order`.
- **A blog post:** add `src/content/blog/<slug>.md` with `title`, `description`, `pubDate`,
  `tags`. It appears in `/blog`, the home-page teaser, and the RSS feed automatically.

## Before launch

See `public/README-assets.md` and the `[TODO]` markers in `src/data/profile.ts` and the
placeholder project entries.

## Notes

- `overrides.vite` in `package.json` pins a single Vite version so the Tailwind Vite plugin
  and Astro 6 share one copy — don't remove it without re-testing the build.
- `docs/plans/` is gitignored (local-only working docs); `docs/research/` is committed.
