# Portfolio research — 02: Inventory of my public work

Date: 2026-06-13. Source: GitHub profile [asaduzzaman-shuvro](https://github.com/asaduzzaman-shuvro) (24 repos: 13 public, 11 private; mostly Swift).

## Profile snapshot

- **Dominant language:** Swift (iOS) by a wide margin; also TypeScript, Java, some Python/JS.
- **Profile gaps to fix before launch:** no bio, no company, no location, no blog URL, no pinned repos, repos lack descriptions/topics. These are cheap, high-visibility wins.
- **Reality check:** most public repos are practice/learning projects or forks of books/libraries. The portfolio's centerpiece must be **professional case studies** (per interview), with GitHub as supporting evidence.

## Showcase candidates (best → weakest)

### 1. TripSplit (repo: `TripSplitter`, Swift) — strongest
Brand-new, actively developed SwiftUI iOS app for splitting group/trip expenses. Clean MVVM layout (`Models/`, `Services/`, `ViewModels/`, `Views/`), with genuinely interesting tech: **CloudKit sync, Multipeer (offline peer-to-peer) connectivity, settlement calculation, invite codes**. Demonstrates exactly the "iOS lead" identity.
- To do: add a README with screenshots, repo description, and topics; it currently has none.

### 2. S3-Viewer (TypeScript / Next.js 16) — best backend/full-stack proof
Web app for browsing/previewing an S3 bucket behind a password gate: presigned URLs, constant-time auth check, rate limiting, Edge + Node dual runtime, Prisma + SQLite. Already has an excellent README. This is the proof of the "mobile **+ backend**" identity.

### 3. SocialFeedManager (Java, 2018) — older backend evidence
Java client that aggregates feeds from Facebook/Twitter/Instagram. Shows Java/API-integration history but is 8 years old — mention briefly or skip.

### Supporting (mention only if needed)
- `SwiftUIPractice`, `AdapterPattern`, `DesignPattern` (private) — learning/patterns work; signals continuous learning, not showcase material.
- Forks (Combine book, SwiftUI Apprentice, firebase-ios-sdk, Parchment…) — exclude from the portfolio.

## Professional work (not on GitHub)

Engineering lead at **Cefalo** — work projects are the intended centerpiece but live in private/employer repos. Needed from the user before content writing:
- Which apps/products can be named publicly (confidentiality check) — see open items in [01-interview.md](01-interview.md).
- App Store links for shipped apps.
- Per project: role, team size, problem, tech, and one or two measurable outcomes.

## Recommended actions (feed into 04-requirements)

1. Feature **TripSplit** and **S3-Viewer** as the two open-source projects alongside 2–4 professional case studies.
2. Before launch: write a TripSplit README with screenshots, add descriptions/topics to featured repos, pin them, and fill in the GitHub bio.
3. Collect App Store links, LinkedIn URL, and CV file from the user.
