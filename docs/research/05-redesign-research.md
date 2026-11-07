# Portfolio research — 05: Redesign (leadership, iOS, "catchy")

Date: 2026-11-07. Method: three parallel web-research passes. Every site was fetched live on that
date. The fetcher read page text and markup, not pixels, so visual notes are inferred. Check a
site in a browser before copying from it.

## Why a redesign

- **The look is not catchy.** The site is dark near-black with an acid-lime accent, a blueprint
  grid, mono uppercase labels and Space Grotesk. That "terminal" look is shared by a large share
  of developer portfolios.
- **The site under-sells leadership.** Team management, planning and cross-team collaboration
  appear as one "What I do" card ("A team around it.") and one CV bullet.

## 1. Making leadership credible

Most well-known engineering leaders run blogs or coaching storefronts, not portfolios. Real
leadership proof (scope, numbers, outcomes) is rare online, so a site that has it stands out.

| Site | What it does well |
|---|---|
| [Mike McQuaid CV](https://mikemcquaid.com/cv/) | One scope line per role, then verb-first outcome bullets with a baseline: "Cut pull request to production from five working days to same-day". People metrics (engagement, eNPS) sit next to delivery metrics. |
| [Tanya Reilly](https://noidea.dog/) | No hero. Opens on one large, multi-year cross-team project, written up externally. |
| [Sarah Drasner](https://sarah.dev/) | States scope by what the teams own ("Core Infrastructure teams that power Search, YouTube…"), not "I managed X". |
| [Addy Osmani](https://addyosmani.com/) | Case-study tiles that link to outcome write-ups. |
| [Arpit Bhayani](https://arpitbhayani.me/) | Names both tracks plainly: IC roles, and "built and led" teams. |
| [Tania Rascia](https://www.taniarascia.com/) | A dated story timeline, and what "principal" means in her own work. |
| [Lara Hogan](https://larahogan.me/) | Short third-party quotes ("What people are saying"). |
| [Tom Weightman](https://www.tomweightman.com/) | Staff iOS at Figma. Each entry is "product + my part", with awards and press. Shows no team leadership, which is the gap to fill. |

**Patterns:**

1. A scope line, then outcome bullets with numbers and a baseline.
2. People and team outcomes kept separate from delivery outcomes.
3. One flagship cross-team project with a full write-up: situation, my role, decisions, outcome.
4. Both tracks named plainly: a hands-on engineer who also leads.
5. Outside proof (peer or report quotes, awards, press) instead of adjectives.
6. Optionally, a how-I-work page or year-in-review, placed after the results, never in place of them.

**Anti-patterns:**

- Marketing counters and logo walls, as on [Pat Kua](https://www.patkua.com/).
- A manager README with no outcomes, as on [Jasper Valero](https://jaspervalero.com/my-manager-readme/).
- Follower or star counts presented as impact.

## 2. Making iOS work feel tangible

| Site | Pattern worth taking |
|---|---|
| [Sam Soffes](https://soff.es) ([résumé](https://soff.es/resume)) | A "Previously" strip of real app icons (Podcasts, Lyft, GitHub). Each role reads "Staff iOS Engineer (2017–2020) @ Lyft" plus one sentence on what he owned. The clearest model for crediting employer apps. |
| [Marcos Tanaka](https://www.marcosatanaka.com) | The same section repeated for every app: device shot, short pitch, award inline, then the App Store badge. A press-quote wall. |
| [Sindre Sorhus](https://sindresorhus.com/apps) | One line of aggregate stats, then icon cards with platform tags. |
| [Sam Henri Gold](https://samhenri.gold) | "What I did / How I did it" tag rows on each card. Clients credited by icon and link; private clients left unnamed. |
| [Alexander Grebenyuk](https://kean.blog) | Hard numbers, plus an engineering post about his employer's app (Pocket Casts). |
| [Steve Troughton-Smith](https://www.highcaffeinecontent.com) | Real, colourful icons do all the visual work. No screenshots. |
| [Kerem Uslular](https://portfolio-1hf.pages.dev/) | Captioned device shots, and engineering-scale numbers (tests, apps on one architecture). |

**Patterns:**

1. Real App Store icons with the iOS corner shape, each linked to its App Store page.
2. One repeated per-app template.
3. Captioned real screenshots in honest frames.
4. Hard engineering numbers (crash-free rate, team size, scale), not just downloads.
5. Role and stack rows on each project.
6. Restraint: the strong examples are quiet and typographic.

**Crediting employer apps:** name the app, then the company, then the part you owned or led.
Nobody writes "I built X" for a team app.

**Avoid:**

- Autoplay video that hurts LCP. If a screen recording is needed, use a poster image and lazy-load it.
- Tilted 3D fake phones.
- Unverifiable logo walls.

## 3. What "catchy" means for a job-hunting engineer

Awwwards portfolio winners are almost all agencies, so they are the wrong benchmark. The 3D and
OS-metaphor sites fail the 30-second recruiter test and Lighthouse:
[Bruno Simon](https://bruno-simon.com), [Henry Heffernan](https://henryheffernan.com) and
[daedalOS](https://dustinbrett.com). Memorable engineer sites get there through distinctive
typography and one strong visual hook.

**Sites worth studying:**

- [olivierlarose.com](https://olivierlarose.com): editorial framing with issue numbering, and a
  Project / Category / Client / Year table. Drop its WebGL.
- [jakub.kr](https://jakub.kr): light-first, with serif italics mixed into a sans page.
- [sarah.dev](https://sarah.dev): display serif, and a staff-level leadership story.
- [rsms.me](https://rsms.me): strict typography.
- [lynnandtonic.com](https://lynnandtonic.com): paper texture, a contents-page nav, a numbered
  yearly redesign.
- [paco.me](https://paco.me), [rauno.me](https://rauno.me) and
  [emilkowal.ski](https://emilkowal.ski): restraint and craft, but thin on career proof.
- [brittanychiang.com](https://brittanychiang.com): it reads well in 30 seconds, but it is the
  most copied developer portfolio, so it won't stand out.

**Trends seen on live sites:**

- **Light-first pages.** jakub.kr and leerob.com set a light `theme-color`.
- **Serif and sans mixed on one page.** emilkowal.ski, delba.dev, leerob.com.
- **Page transitions in CSS.** `@view-transition { navigation: auto }` animates between separate
  static pages and suits Astro (seen on maggieappleton.com).
- **OKLCH colour and variable fonts.**
- **Saying you are job hunting.** [delba.dev](https://delba.dev) opens with "I'm looking for my
  next role".
- **Not seen.** Bento grids and scroll-driven CSS animation are much discussed, but neither was
  confirmed on a live portfolio.

## Directions considered

| | Direction | Fit |
|---|---|---|
| A | App shelf, Apple-like: light, system type, icons as hero | Most "iOS" |
| B | Editorial / magazine: display serif, numbered case-study index, paper tones | Strong for staff-level judgment |
| **C** | **B + A: editorial headlines, app-icon shelf as the hook, light-first with a real dark mode, leadership proof section** | **Chosen** |
| D | Refresh the current dark/lime look | Doesn't fix "not catchy" |

Ruled out: playful-lab sites (too front-end or devrel) and 3D/OS-metaphor sites (too slow, and they hide the content).

## Decisions (2026-11-07)

- **Direction C.**
- **Leadership gets equal billing.** The hero names both tracks: a hands-on iOS engineer who also
  leads the team. Leadership gets its own section with numbers.
- **Source of claims.** Leadership proof uses only facts already in `src/data/profile.ts`:
  - a 5-engineer iOS and backend team, with several engineers moved into senior roles
  - modularization that cut release time 60% and let five engineers ship in parallel
  - eight apps
  - the DN app: 290K downloads, 200K+ weekly active users, 99.3% crash-free
  - 100K+ events a day
  - AI tooling used daily by the team

  The 290K downloads belong to the DN app alone, not to all eight apps. Peer quotes go in only if
  real ones are collected.
