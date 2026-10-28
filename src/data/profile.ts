// Single source of truth for personal info.

const since = 2014;
const norwaySince = 2017; // SPENN, then DN Media Group from 2021 — both via Cefalo
// Computed at build time, so "12 years" doesn't go stale.
const years = new Date().getFullYear() - since;

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

  // Résumé-voice summary for the printable /cv page (the bio above is the site's voice).
  summary:
    `iOS engineer with ${years} years of experience building native apps in Swift, SwiftUI and UIKit, now a Staff Software Engineer consulting for DN Media Group via Cefalo. Leads the team behind DN Media Group’s news apps, including a 290K-download news app at a 99.3% crash-free rate, while staying hands-on in the code and driving architecture decisions. Nine years working for Norwegian companies — SPENN from ${norwaySince}, DN Media Group from 2021 — daily with product and design teams in Oslo, including onsite. Has shipped fintech, media and social apps used by hundreds of thousands of people. Writes clean, well-tested code, and leads and mentors engineers across iOS and backend.`,

  location: 'Dhaka, Bangladesh',
  // Printed on the CV and letter headers — documents one employer reads — so it names no country
  // and ranks none. The site is where "Norway first, open to the Nordics and Central Europe"
  // lives (`availability`); the strip and About say "Dhaka → Europe". Covers the move only — a
  // non-EU hire still needs the employer's permit application.
  relocation: 'Relocating to Europe, self-funded',
  company: 'Cefalo', // legal employer (JSON-LD worksFor)
  client: 'DN Media Group', // who the work is for — recruiters know this name, not Cefalo
  since,
  // Contact-section copy.
  availability:
    'Open to Staff or Senior iOS roles in Europe — Norway first, and open to the Nordics and Central Europe — relocating, and already working with Oslo teams every day. The fastest way to reach me is email.',

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

// The "status strip" — a brutalist system bar of quick facts.
export const statusItems = [
  { label: 'stack', value: 'Swift · SwiftUI · UIKit' },
  { label: 'shipped for', value: 'Media · Fintech · Social' },
  { label: 'based', value: 'Dhaka → Europe' },
  { label: 'shipping since', value: String(profile.since) },
] as const;

// "What I do" — three bold statements, not a logo grid. Each carries a skill group.
export const statements = [
  {
    area: 'Mobile',
    headline: 'Mobile in front.',
    blurb:
      'Native iOS apps from architecture to App Store — feeds that scroll without a hitch, crash-free rates that hold, and security built in from day one.',
    skills: ['Swift', 'Swift 6', 'SwiftUI', 'UIKit', 'Liquid Glass (iOS 26)', 'Combine', 'Swift Concurrency', 'Observation', 'SwiftData', 'Objective-C', 'MVVM', 'MVVM-C', 'Clean Architecture', 'Modularization', 'Swift Package Manager', 'XCTest', 'XCUITest', 'Accessibility', 'PDFKit', 'SSL pinning', 'Encryption', 'OWASP Mobile Top 10', 'Push notifications', 'WebRTC', 'Fastlane', 'CI/CD', 'Crashlytics', 'Charles Proxy'],
  },
  {
    area: 'Backend',
    headline: 'Backend behind it.',
    blurb:
      'The services and integrations that power the apps — event-driven, reliable, and built to handle real traffic.',
    skills: ['Java', 'Spring Boot 3', 'RabbitMQ', 'Braze', 'REST APIs'],
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
    period: '2025 — now',
    role: 'Staff Software Engineer',
    company: 'DN Media Group · consultant via Cefalo',
    bullets: [
      'Lead the iOS and backend teams (5 engineers) — project planning, stakeholder communication, on-time delivery.',
      'Set architecture and engineering standards across iOS (Swift, SwiftUI) and backend (Java, Spring, RabbitMQ).',
      'Built and shipped iOS features in Swift and SwiftUI with product and design, from discovery to release — including sign-in and authentication flows and an in-app PDF reader.',
      'Built and run a Java connector between client services and Braze, handling 100K+ engagement events a day, while still contributing to mobile app features.',
      'Mentor engineers through code reviews and design discussions, with a focus on scalability, security and performance.',
    ],
    apps: ['DN', 'TradeWinds'],
  },
  {
    period: '2021 — 2025',
    role: 'Senior Software Engineer',
    company: 'DN Media Group · consultant via Cefalo',
    bullets: [
      'Led the iOS team that designed and shipped eight production apps.',
      'Spearheaded the DN news app — 290K downloads, 30K+ daily / 200K+ weekly active users, 99.3% crash-free.',
      'Introduced modularization and team-wide practices that cut release time by 60%.',
      'Mentored engineers into senior roles.',
    ],
    apps: shippedApps.map((app) => app.name),
  },
  {
    period: '2017 — 2021',
    role: 'Software Engineer',
    company: 'SPENN · consultant via Cefalo',
    bullets: [
      'Built SPENN, a cashless payments app launched in Rwanda and Tanzania, used by 30K people a week.',
      'Hardened it for finance — encryption, SSL pinning, and data protection against attacks.',
      'Delivered business-critical features end to end within financial regulations.',
    ],
    apps: ['SPENN'],
  },
  {
    period: '2016 — 2017',
    role: 'Software Engineer',
    company: 'GagaGugu Ltd',
    bullets: [
      'Built a social app with real-time audio/video calls (WebRTC), UDP-based messaging, a timeline feed, and contact sync.',
      'Shipped a Share Extension for cross-app sharing, and designed the timeline feed (posts and reactions).',
    ],
    apps: [],
  },
  {
    period: '2014 — 2016',
    role: 'Earlier',
    company: 'AdvanceApp Bangladesh · Arena Mobile BD · Nested Apps',
    bullets: [
      'A fishing community and e-commerce app that grew to 50K+ active users, plus real-time shipment tracking.',
      'MyBL for Banglalink, one of Bangladesh’s leading mobile carriers (150K downloads), with key architecture calls.',
      'Kaler Kantho, the news app of a leading Bangladeshi daily, and Shipero for tracking parcels and goods.',
      'A cartoon image maker (100K downloads) with a custom lazy-loading image grid.',
    ],
    apps: ['MyBL', 'Kaler Kantho', 'Shipero', 'investFeed'],
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
