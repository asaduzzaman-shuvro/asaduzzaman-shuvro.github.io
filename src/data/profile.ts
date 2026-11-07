// Single source of truth for personal info.

const since = 2014;
const norwaySince = 2017; // SPENN, then DN Media Group from 2021 — both via Cefalo
// Computed at build time, so "12 years" doesn't go stale.
const years = new Date().getFullYear() - since;

const summaryLead =
  `iOS engineer with ${years} years building native apps in Swift, SwiftUI and UIKit, currently a Staff Software Engineer consulting for DN Media Group via Cefalo.`;
// The summary positions, the bullets prove — no claim twice. Proof (bridge, Swift 6, SDUI, the
// numbers) lives in the experience bullets; this names the stack, the product, the backend range
// since 2025, Norway, and the team, in about 85 words with the relocation sentence.
const summaryBody =
  `Hands-on across DN Media Group’s eight news apps, including DN, Norway’s leading business daily, and since 2025 across the Java and Spring Boot services behind them. Nine years working daily with Norwegian product teams in Oslo. Leads a five-engineer iOS and backend team through architecture standards, code review and mentoring; several engineers have moved into senior roles.`;

export const profile = {
  name: 'A K M Asaduzzaman',
  handle: 'shuvro', // short id used in brutalist mono labels
  role: 'Staff Software Engineer',
  tagline: 'iOS',

  // One-line value statement shown in the hero (kept short — it gets set huge).
  pitch:
    'I build iOS apps that ship — news, fintech and social — and the services behind them.',

  // Default <title> — role plus the stack people search for.
  title: 'A K M Asaduzzaman — Staff Software Engineer, iOS (Swift, SwiftUI)',

  // Default <meta name="description"> (~150 chars) — the pitch is too short for search snippets.
  metaDescription:
    `A K M Asaduzzaman, Staff Software Engineer (iOS) in Dhaka, relocating to Europe. ${years} years of Swift, SwiftUI and UIKit; nine years consulting for Norwegian companies.`,

  // Slightly longer bio for the About section. Punchy, first-person.
  bio: [
    `I’m an iOS engineer with ${years} years of Swift, SwiftUI and UIKit — now a Staff Software Engineer consulting for DN Media Group (via Cefalo), where I lead the team behind its news apps (DN, TradeWinds, Upstream and more) while staying hands-on in the code and driving architecture decisions across iOS and backend.`,
    `I’ve worked for Norwegian companies since ${norwaySince} — first SPENN, a cashless payments startup in Rwanda and Tanzania, then DN Media Group — with product, design and editorial teams in Oslo, onsite and remote. Along the way: a 290K-download news app at a 99.3% crash-free rate, and the backend behind it, Java, Spring and RabbitMQ services moving 100K+ events a day.`,
    'Now I care about three things: software that feels instant, architecture simple enough to move fast, and growing the engineers who build it.',
  ],

  // Résumé-voice summary for the printable /cv page (the bio above is the site's voice). Split
  // in two so a tailored copy can put the level note (src/data/cv.ts) right after the lead. The
  // move is stated once, in the header line, not here. `summary` is the join, for the page's
  // meta description.
  summaryLead,
  summaryBody,
  summary: `${summaryLead} ${summaryBody}`,

  location: 'Dhaka, Bangladesh',
  // Printed on the LinkedIn banner, and the CV/letter default (src/data/cv.ts builds the same
  // line from `destination`). Names no country and ranks none — one employer reads a CV, and the
  // site is read by all of them. Says nothing about who pays: "self-funded" gave away relocation
  // money Nordic employers often cover. Covers the move only — a non-EU hire still needs the
  // employer's permit application.
  relocation: 'Relocating to Europe',
  company: 'Cefalo', // legal employer (JSON-LD worksFor)
  client: 'DN Media Group', // who the work is for — recruiters know this name, not Cefalo
  since,
  // Contact-section copy.
  availability:
    // Names no country: a hiring manager in Stockholm or Vienna who reads "Norway first" learns
    // they are second choice. The ranking lives only in the (gitignored) job-search notes.
    'Open to Staff or Senior iOS roles in the Nordics and Central Europe — relocating, and already working with Oslo teams every day. The fastest way to reach me is email.',

  email: 'asaduzzaman.duet@gmail.com',
  linkedin: 'https://www.linkedin.com/in/asaduzzamanshuvro/',
  github: 'https://github.com/asaduzzaman-shuvro',
  // CV lives in /public — a redacted copy of the resume (no phone/address).
  cv: '/cv.pdf',
} as const;

// Search-engine ownership tokens (the `content` of each verification meta tag). Empty = tag
// not rendered. Google: Search Console → URL-prefix property → HTML tag. Bing: Webmaster
// Tools → Add site → HTML meta tag (or import from Search Console and skip this one).
export const seo = {
  // Default 1200×630 social-share image (Base.astro) — also the BlogPosting image.
  ogImage: '/og.png',
  googleSiteVerification: '',
  bingSiteVerification: '',
} as const;

// Production iOS apps for DN Media Group (formerly NHST), in release order — the App Store
// shelf on the home page and the "Apps" line on the CV. Events apps are left out on purpose.
// `caseStudy` is a projects-collection id; an icon at src/assets/apps/<slug>.png is optional.
export const shippedApps = [
  { slug: 'dn', name: 'DN', blurb: 'Norway’s leading business daily', appStore: 'https://apps.apple.com/app/id1518764819', caseStudy: 'dn-news-app' },
  { slug: 'tradewinds', name: 'TradeWinds', blurb: 'Global shipping news', appStore: 'https://apps.apple.com/app/id1554813945' },
  { slug: 'upstream', name: 'Upstream', blurb: 'Global oil and gas news', appStore: 'https://apps.apple.com/app/id1566323676' },
  { slug: 'fiskeribladet', name: 'Fiskeribladet', blurb: 'Norwegian fisheries and aquaculture news', appStore: 'https://apps.apple.com/app/id1573885807' },
  { slug: 'intrafish', name: 'IntraFish', blurb: 'Global seafood industry news', appStore: 'https://apps.apple.com/app/id1585967329' },
  { slug: 'recharge', name: 'Recharge', blurb: 'Global renewable energy news', appStore: 'https://apps.apple.com/app/id1587666027' },
  { slug: 'intrafish-norge', name: 'IntraFish Norge', blurb: 'Seafood industry news, in Norwegian', appStore: 'https://apps.apple.com/app/id1606877205' },
  { slug: 'europower', name: 'Europower', blurb: 'Nordic power market news', appStore: 'https://apps.apple.com/app/id1620143505' },
] as const satisfies readonly { slug: string; name: string; blurb: string; appStore: string; caseStudy?: string }[];

// Hero copy. The headline names both tracks (hands-on iOS + leading the team); `em` is set in
// italic accent. The lead says who the work is for, client first.
export const hero = {
  kicker: `${profile.role} · iOS · Dhaka → Europe`,
  headline: { before: 'I build iOS apps, ', em: 'and lead the team', after: ' that ships them.' },
  lead:
    'Staff Software Engineer for DN Media Group, consultant via Cefalo. Hands-on in Swift and SwiftUI across eight news apps and the Java services behind them, and leading the five-engineer iOS and backend team that builds them.',
} as const;

// The numbers strip under the app shelf. Static figures, each with what it counts — no
// animated counters. The 290K downloads are the DN app's alone, never the eight apps' total.
export const numbers = [
  { value: '8', label: 'news apps on the App Store', note: 'DN Media Group' },
  { value: '5', label: 'engineers led', note: 'iOS and backend' },
  { value: '60%', label: 'faster releases', note: 'after modularization' },
  { value: '99.3%', label: 'crash-free', note: 'DN app · 290K downloads' },
] as const;

// The "Leading" section: a scope line, then outcomes in three columns. Only facts already
// stated in the experience bullets or the bio — no invented cadences, roadmaps or headcounts.
export const leadership = {
  scope:
    'I lead DN Media Group’s five-engineer iOS and backend team as a consultant via Cefalo: eight news apps on iOS and the Java and Spring Boot services behind them. I stay hands-on in the code.',
  columns: [
    {
      title: 'People',
      points: [
        'Mentoring through code review that has moved several engineers into senior roles.',
        'Built the team’s AI tooling on Claude Code, from review agents to a tickets-to-branches plugin, used daily by all five engineers.',
      ],
    },
    {
      title: 'Delivery',
      points: [
        'Introduced modularization with clear module ownership: release time cut by 60%, with five engineers shipping in parallel.',
        'Own the testing standard: unit, integration and XCUITest flows run on every pull request.',
      ],
    },
    {
      title: 'Planning & collaboration',
      points: [
        'Plan and ship features with product and design, from discovery to release.',
        'Set the architecture and engineering standards across Swift and SwiftUI, and Java and Spring Boot.',
        `${new Date().getFullYear() - norwaySince} years working every day with Norwegian product, design and editorial teams in Oslo.`,
      ],
    },
  ],
} as const;

// "What I do" — three bold statements, not a logo grid. Each carries a skill group.
export const statements = [
  {
    area: 'Mobile',
    headline: 'Mobile in front.',
    blurb:
      'Native iOS apps from architecture to App Store — feeds that scroll without a hitch, crash-free rates that hold, and security built in from day one.',
    skills: ['Swift', 'Swift 6', 'SwiftUI', 'UIKit', 'Liquid Glass (iOS 26)', 'Combine', 'Swift Concurrency', 'Observation', 'SwiftData', 'Objective-C', 'MVVM', 'MVVM-C', 'Clean Architecture', 'Modularization', 'Server-driven UI', 'Swift Package Manager', 'XCFramework', 'WKWebView', 'Web-to-native bridge', 'XCTest', 'XCUITest', 'Accessibility', 'PDFKit', 'SSL pinning', 'Encryption', 'OWASP Mobile Top 10', 'Push notifications', 'WebRTC', 'Fastlane', 'CI/CD', 'Crashlytics'],
  },
  {
    area: 'Backend & web',
    headline: 'Backend behind it.',
    blurb:
      'The services and integrations that power the apps — event-driven, reliable, and built to handle real traffic.',
    skills: ['Java', 'Spring Boot 3', 'RabbitMQ', 'Braze', 'REST APIs', 'TypeScript', 'Vue.js', 'Node.js'],
  },
  {
    area: 'Leadership',
    headline: 'A team around it.',
    blurb:
      'Leading iOS and backend engineers as a servant leader — clearing the way from plan to production, with architecture standards, stakeholder communication, and code review that levels people up.',
    skills: ['Team leadership', 'Servant leadership', 'Mentoring', 'Code review', 'Stakeholder communication', 'Product discovery', 'Agile delivery', 'Cross-functional collaboration'],
  },
  {
    area: 'AI',
    headline: 'AI in the loop.',
    blurb:
      'I build the tooling, not just use it — custom review agents, and a team plugin for tickets, QA notes and branches, built on Claude Code and used by the team every day. I also work in Codex and Cursor. Engineering judgment and human review stay in charge.',
    skills: ['Claude Code', 'Codex', 'Cursor', 'AI-assisted development', 'AI code review', 'Agentic workflows'],
  },
] as const;

// Condensed work history for the Experience section. Years only — keep it scannable.
export const experience = [
  {
    period: '2025 - now',
    role: 'Staff Software Engineer',
    company: 'DN Media Group · consultant via Cefalo',
    // Hands-on work first — the roles being applied for are senior IC roles, and a screener
    // reads the first two bullets. Leadership is one bullet; the Braze connector is in Selected work.
    bullets: [
      'Built and maintain the web-to-native bridge across all eight apps: web content posts navigation, sign-in, paywall and sharing events, native owns navigation, auth and device capabilities, and one shared contract lets each side ship independently.',
      'Migrated the shared networking, feed and auth modules to Swift 6 strict concurrency with async/await and actors, clearing data-race warnings across all eight apps.',
      'Build and ship SwiftUI features with product and design from discovery to release: sign-in and authentication flows, an in-app PDF reader, and the iOS 26 Liquid Glass adoption across the app family.',
      'Own the testing standard: unit tests for view models and networking, integration tests across the modular packages, and XCUITest flows for sign-in and critical paths, all run on every PR in GitHub Actions.',
      'Lead the iOS and backend teams (5 engineers): architecture and engineering standards across Swift/SwiftUI and Java/Spring Boot/RabbitMQ, and mentoring through code review that has moved several engineers into senior roles.',
      'Built the team’s AI tooling on Claude Code: code-review agents, a tickets-to-branches plugin, and log root-cause and deployment skills, used daily by all five engineers. Agents take the first pass; human review decides what ships.',
    ],
    apps: shippedApps.map((app) => app.name),
  },
  {
    period: '2021 - 2025',
    role: 'Senior Software Engineer',
    company: 'DN Media Group · consultant via Cefalo',
    bullets: [
      'Led the iOS team that designed and shipped eight production apps for DN Media Group’s brands.',
      'Built the server-driven UI layer used across all eight: the server defines screen composition, content and actions, the client renders from a shared component library with a fallback for unknown types, so editors change layouts without an App Store release.',
      'Introduced modularization with clear module ownership and dependency injection, cutting release time by 60% and letting five engineers ship in parallel, with Fastlane releases on GitHub Actions and Azure DevOps.',
      'Spearheaded the DN news app (290K downloads, 200K+ weekly active users, 99.3% crash-free) and engineered its feed for smooth scrolling under heavy image load with prefetching, image caching and cell reuse.',
      'Six months on the dn.no front page in TypeScript, Vue.js and Node, alongside the iOS work.',
    ],
    apps: [],
  },
  {
    period: '2017 - 2021',
    role: 'Software Engineer',
    company: 'SPENN · consultant via Cefalo',
    bullets: [
      'Built SPENN, a cashless payments app launched in Rwanda and Tanzania, used by 30K people a week.',
      'Hardened it for finance: encryption, SSL pinning, and data protection against attacks.',
      'Delivered business-critical features end to end within financial regulations.',
    ],
    apps: ['SPENN'],
  },
  {
    period: '2016 - 2017',
    role: 'Software Engineer',
    company: 'GagaGugu Ltd',
    bullets: [
      'Built a social app with real-time audio/video calls (WebRTC), UDP-based messaging, a timeline feed, and contact sync.',
      'Shipped a Share Extension for cross-app sharing, and designed the timeline feed (posts and reactions).',
    ],
    apps: [],
  },
  {
    period: '2014 - 2016',
    role: 'Earlier',
    company: 'AdvanceApp Bangladesh · Arena Mobile BD · Nested Apps',
    bullets: [
      'A fishing community and e-commerce app that grew to 50K+ active users, plus real-time shipment tracking.',
      'MyBL for Banglalink, one of Bangladesh’s leading mobile carriers (150K downloads), with key architecture calls.',
      'Kaler Kantho, the news app of a leading Bangladeshi daily, and Shipero for tracking parcels and goods.',
      'A cartoon image maker (100K downloads) with a custom lazy-loading image grid.',
    ],
    apps: [],
  },
] as const;

export const education = {
  degree: 'B.Sc. Computer Science & Engineering',
  school: 'Dhaka University of Engineering & Technology (DUET)',
  year: 2014,
} as const;

export const interests = ['Gardening', 'Watching cricket', 'Cycling'] as const;

export const languages = [
  { name: 'English', level: 'Advanced (C1)' },
  { name: 'Bengali', level: 'Native (C2)' },
] as const;

// Social links rendered in the contact section and footer.
export const socials = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
] as const;
