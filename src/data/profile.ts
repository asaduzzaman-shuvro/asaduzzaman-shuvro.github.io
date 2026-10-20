// Single source of truth for personal info.

export const profile = {
  name: 'A K M Asaduzzaman',
  handle: 'shuvro', // short id used in brutalist mono labels
  role: 'Staff Software Engineer',
  tagline: 'Mobile & Backend',

  // One-line value statement shown in the hero (kept short — it gets set huge).
  pitch:
    'I build iOS apps that ship — and the backends that keep them fast, offline or on.',

  // Default <title> — role plus the stack people search for.
  title: 'A K M Asaduzzaman — Staff Software Engineer (iOS & Backend)',

  // Default <meta name="description"> (~150 chars) — the pitch is too short for search snippets.
  metaDescription:
    'A K M Asaduzzaman, Staff Software Engineer in Dhaka. Leads iOS (Swift, SwiftUI) and backend (Java, Spring) teams at Cefalo for NHST Media Group apps.',

  // Slightly longer bio for the About section. Punchy, first-person.
  bio: [
    'I’m a Staff Software Engineer at Cefalo, leading the iOS and backend teams behind news apps for NHST Media Group — DN, TradeWinds, Upstream and more.',
    'I spent a decade going deep on iOS — eight production apps, a 290K-download news app at a 99.3% crash-free rate — then crossed into the backend: Java, Spring and RabbitMQ services moving 100K+ events a day.',
    'Now I care about three things: software that feels instant, architecture simple enough to move fast, and growing the engineers who build it.',
  ],

  // Résumé-voice summary for the printable /cv page (the bio above is the site's voice).
  summary:
    'Staff Software Engineer with an iOS-first background and growing expertise in backend development, building high-performance, reliable applications from end to end. Experienced in technical leadership, code reviews, and mentoring engineers to deliver high-quality results.',

  location: 'Dhaka, Bangladesh',
  company: 'Cefalo',
  since: 2014,
  availability: 'Open to interesting problems',

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

// The "status strip" — a brutalist system bar of quick facts.
export const statusItems = [
  { label: 'role', value: 'Staff Software Engineer' },
  { label: 'stack', value: 'Swift · Java · Spring' },
  { label: 'based', value: profile.location },
  { label: 'shipping since', value: String(profile.since) },
] as const;

// "What I do" — three bold statements, not a logo grid. Each carries a skill group.
export const statements = [
  {
    area: 'Mobile',
    headline: 'Mobile in front.',
    blurb:
      'Native iOS apps from architecture to App Store — feeds that scroll without a hitch, crash-free rates that hold, and security built in from day one.',
    skills: ['Swift', 'SwiftUI', 'UIKit', 'MVVM', 'Clean Architecture', 'Modularization', 'SSL pinning', 'Encryption', 'Push notifications', 'WebRTC', 'Fastlane', 'CI/CD', 'Charles Proxy'],
  },
  {
    area: 'Backend',
    headline: 'Backend behind it.',
    blurb:
      'The services and integrations that power the apps — event-driven, reliable, and built to handle real traffic.',
    skills: ['Java', 'Spring Boot 3', 'RabbitMQ', 'Braze', 'REST APIs', 'TypeScript', 'Node.js', 'Git'],
  },
  {
    area: 'Leadership',
    headline: 'A team around it.',
    blurb:
      'Leading iOS and backend engineers from plan to production — architecture standards, stakeholder communication, and code review that levels people up.',
    skills: ['Team leadership', 'Mentoring', 'Code review', 'Stakeholder communication', 'Agile delivery', 'Cross-functional collaboration', 'OWASP Mobile Top 10'],
  },
] as const;

// Condensed work history for the Experience section. Years only — keep it scannable.
export const experience = [
  {
    period: '2025 — now',
    role: 'Staff Software Engineer',
    company: 'Cefalo',
    bullets: [
      'Lead the iOS and backend teams (5 engineers) — project planning, stakeholder communication, on-time delivery.',
      'Set architecture and engineering standards across iOS (Swift, SwiftUI) and backend (Java, Spring, RabbitMQ).',
      'Built and run a Java connector between client services and Braze, handling 100K+ engagement events a day, while still contributing to mobile app features.',
      'Mentor engineers through code reviews and design discussions, with a focus on scalability, security and performance.',
    ],
    apps: ['DN', 'TradeWinds'],
  },
  {
    period: '2021 — 2025',
    role: 'Senior Software Engineer',
    company: 'Cefalo',
    bullets: [
      'Led the iOS team that designed and shipped eight production apps.',
      'Spearheaded the DN news app — 290K downloads, 30K+ daily / 200K+ weekly active users, 99.3% crash-free.',
      'Introduced modularization and team-wide practices that cut release time by 60%.',
      'Mentored engineers into senior roles.',
    ],
    apps: ['Europower', 'Upstream', 'Recharge'],
  },
  {
    period: '2017 — 2021',
    role: 'Software Engineer',
    company: 'Cefalo',
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
      'Built a social app with real-time audio/video calls (WebRTC), a timeline feed, and contact sync.',
      'Shipped a Share Extension for cross-app sharing, and led the sub-team behind the timeline.',
    ],
    apps: [],
  },
  {
    period: '2014 — 2016',
    role: 'Earlier',
    company: 'AdvanceApp Bangladesh · Arena Mobile BD · Nested Apps',
    bullets: [
      'A fishing community and e-commerce app that grew to 50K+ active users, plus real-time shipment tracking.',
      'MyBL for one of Bangladesh’s leading mobile carriers (150K downloads), with key architecture calls.',
      'A cartoon image maker (100K downloads) with a custom lazy-loading image grid.',
    ],
    apps: ['MyBL', 'investFeed'],
  },
] as const;

export const education = {
  degree: 'B.Sc. Computer Science & Engineering',
  school: 'Dhaka University of Engineering & Technology (DUET)',
  year: 2014,
} as const;

export const interests = ['Software engineering', 'Watching cricket', 'Gardening'] as const;

export const languages = [
  { name: 'English', level: 'Full professional' },
  { name: 'Bengali', level: 'Native' },
] as const;

// Social links rendered in the contact section and footer.
export const socials = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
] as const;
