# Portfolio research — 04: Requirements & recommendation

Date: 2026-06-13. Synthesis of [01-interview.md](01-interview.md), [02-my-work.md](02-my-work.md), [03-portfolio-best-practices.md](03-portfolio-best-practices.md). This doc is the input for the implementation plan.

## Vision

A modern, visual personal site for **Asaduzzaman Shuvro — engineering lead, mobile (Swift/SwiftUI) + backend** — serving employers, freelance clients, and the community. It leads with professional impact (case studies) and backs it with open source. Blog-ready but no blog at launch.

## Site structure (single page + project detail pages)

1. **Hero** — name, "Engineering Lead · Mobile & Backend", one-line value statement, CTAs: *View work* / *Download CV* / *Contact*.
2. **Featured projects (4–6 total)**
   - 2–4 **professional case studies** (Cefalo work; names pending confidentiality check) — each: problem → role & team size → tech decisions → outcome/metrics → App Store link where shipped.
   - 2 **open source**: **TripSplit** (SwiftUI, CloudKit + Multipeer sync) and **S3-Viewer** (Next.js 16, presigned S3 access, auth hardening).
3. **Skills with context** — grouped: iOS (Swift, SwiftUI, Combine, CloudKit), Backend (Java, TypeScript/Node, Next.js), Leadership (team lead, delivery, mentoring). No logo soup.
4. **Experience / About** — short bio + photo, Cefalo role, leadership scope.
5. **Contact** — email, LinkedIn, GitHub, CV download.

## Design requirements

- **Modern & visual** (user's explicit choice): bold accent palette, scroll/entrance animations, real project imagery (app screenshots) — tasteful motion, not a 3D gimmick; content must survive a 30-second recruiter skim.
- Dark-mode friendly, responsive/mobile-first.

## Quality bar

- Lighthouse ≥ 90 on all metrics; WCAG-basic accessibility; OG/meta tags + OG image; clean URLs.

## Recommended stack

| Decision | Choice | Why |
|---|---|---|
| Framework | **Astro** (+ a React island only if a section needs it) | Content-first, zero-JS default, markdown content collections make "blog later" free; best Lighthouse-per-effort (see 03) |
| Styling/motion | Tailwind CSS + CSS/scroll-driven animations (Framer Motion island if needed) | Achieves "modern & visual" without shipping a runtime everywhere |
| Content | Projects as markdown/MDX content collection | Case studies are content, not components; blog reuses the same machinery |
| Hosting | **GitHub Pages** at `asaduzzaman-shuvro.github.io` (free subdomain per interview); deploy via GitHub Actions | Free, zero-config domain; trivially swappable to Cloudflare Pages/Vercel later |

Alternative considered: Next.js (user already knows it via S3-Viewer) — fine, but pays a JS-runtime tax for a site with no server logic.

## Content prerequisites (user to provide before/while building)

- [ ] Confidentiality check: which Cefalo projects can be named; per-project role, team size, outcomes
- [ ] App Store links for shipped apps
- [ ] LinkedIn URL, CV file (PDF), bio paragraph + photo
- [ ] Screenshots for TripSplit; add README/description/topics to featured repos; pin them; fill GitHub bio

## Out of scope for v1

Blog (designed-for, not built), custom domain, CMS, analytics beyond a simple privacy-friendly counter.
