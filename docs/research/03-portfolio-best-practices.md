# Portfolio research — 03: Best practices, examples, stack

Date: 2026-06-13. Method: quick web research (sources linked inline).

## What a portfolio must do

The projects section does ~80% of the work: the site must convincingly answer "can this person build things that work?" ([RemoteWorks](https://remoteworks.pro/blog/best-web-developer-portfolio-examples)). For an engineering lead the same logic extends to "can this person lead delivery?" — case studies should show role and outcomes, not just tech.

## Essential sections

Consensus across guides ([Scrimba](https://scrimba.com/articles/how-to-build-a-web-developer-portfolio-that-gets-you-hired/), [Hostinger](https://www.hostinger.com/tutorials/web-developer-portfolio), [roadmap.sh](https://roadmap.sh/frontend/web-developer-portfolio)):

1. **Hero/intro** — name, role, one-line value statement, clear CTA (view work / contact / download CV).
2. **Projects (3–5, quality over quantity)** — each a mini case study: the problem, your role, tech choices and why, screenshots/demo, outcome. Not just screenshots and links.
3. **Skills & technologies** — with context (what you built with them), not logo soup.
4. **Experience / about** — short bio, photo, location; for a lead, team scope and delivery highlights.
5. **Contact** — email, LinkedIn, GitHub, downloadable resume.

Common mistakes: too many shallow projects, stale content, no CTA, slow pages.

## Examples worth studying

- [Bruno Simon](https://bruno-simon.com) — fully interactive 3D (drive a car through sections); the high end of "modern & visual" ([sitebuilderreport](https://www.sitebuilderreport.com/inspiration/web-developer-designer-portfolios)).
- Jordan Cruz-Correa — Windows-98 nostalgia interface; personality through interaction ([sitebuilderreport](https://www.sitebuilderreport.com/inspiration/web-developer-designer-portfolios)).
- Henri Heymans — artistic motion-driven showcase ([wearedevelopers](https://www.wearedevelopers.com/en/magazine/561/web-developer-portfolio-inspiration-and-examples-march-2025-561)).
- Big curated lists for browsing: [emmabostian/developer-portfolios](https://github.com/emmabostian/developer-portfolios), [Colorlib's 21 examples](https://colorlib.com/wp/developer-portfolios/).

Takeaway for us: "modern & visual" should mean tasteful motion (scroll/entrance animations, project imagery) — not a 3D gimmick that buries the content recruiters skim in 30 seconds.

## Quality bar

- **Performance:** 90+ on all Lighthouse metrics; a slow portfolio is a bad signal ([roadmap.sh](https://roadmap.sh/frontend/web-developer-portfolio)).
- **Responsive, mobile-first**; recruiters open these on phones ([Elementor](https://elementor.com/blog/best-web-developer-portfolio-examples/)).
- **Accessibility:** WCAG basics, keyboard/screen-reader sanity check ([Scrimba](https://scrimba.com/articles/how-to-build-a-web-developer-portfolio-that-gets-you-hired/)).
- **SEO/meta:** clean URLs, structured metadata, OG image ([templifica](https://templifica.com/blog/developer-portfolio-templates-creating-a-job-winning-portfolio)).

## Stack & hosting

2026 comparisons consistently favor **Astro for content-first portfolio sites**: zero JS by default with opt-in interactive islands, 2–3× faster loads in benchmarks, and free static hosting; Next.js earns its weight when you need server logic, auth, or real-time data — which a portfolio doesn't ([kunalganglani](https://www.kunalganglani.com/blog/astro-vs-nextjs-2026), [pagepro](https://pagepro.co/blog/astro-nextjs/), [cosmicjs](https://www.cosmicjs.com/blog/astro-vs-nextjs-2026), [alexbobes benchmarks](https://alexbobes.com/programming/astro-vs-nextjs/), [Vercel's own guide](https://vercel.com/i/astro-vs-next-js)).

Notes for our case:
- "Modern & visual" animations are fully achievable in Astro (CSS/scroll animations, or a React/Framer-Motion island just where needed).
- Astro has first-class markdown content collections — the "blog later" option costs nothing now.
- Hosting: static output deploys free on GitHub Pages, Cloudflare Pages, Netlify, or Vercel; Cloudflare/GitHub Pages stay free at any realistic traffic ([tech-insider](https://tech-insider.org/astro-vs-nextjs-2026/)).
- Next.js (user already knows it — see S3-Viewer) remains a reasonable alternative if he prefers one stack everywhere; on Vercel's free tier the difference is mostly page weight, not cost.

## Conclusion (feeds 04-requirements)

Astro + tasteful motion + 3–5 case-study projects + free static hosting (GitHub Pages or Cloudflare Pages) hits every requirement: modern & visual, blog-ready, zero cost, and a 90+ Lighthouse score by default.
