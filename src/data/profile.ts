// Single source of truth for personal info. Update placeholders marked TODO.

export const profile = {
  name: 'Asaduzzaman Shuvro',
  role: 'Engineering Lead',
  tagline: 'Mobile & Backend',
  // One-line value statement shown in the hero.
  pitch:
    'Engineering lead shipping polished iOS apps and the backends behind them — Swift & SwiftUI on the front, Java & TypeScript on the server.',
  // Slightly longer bio for the About section.
  bio: [
    'I lead engineering at Cefalo, where I build mobile-first products end to end — from SwiftUI interfaces and offline-first sync down to the services and APIs that power them.',
    'I care about shipping things that feel fast and reliable, mentoring the team around me, and keeping architecture simple enough to move quickly.',
  ],
  location: 'Bangladesh', // TODO: confirm/refine
  company: 'Cefalo',

  email: 'asaduzzaman@cefalo.com',
  // TODO: replace with your real LinkedIn URL
  linkedin: 'https://www.linkedin.com/in/asaduzzaman-shuvro/',
  github: 'https://github.com/asaduzzaman-shuvro',
  // CV lives in /public; replace the placeholder file before launch.
  cv: '/cv.pdf',
} as const;

// Skills grouped with context — no logo soup. Each group lists what was actually built.
export const skillGroups = [
  {
    title: 'iOS & Mobile',
    blurb: 'Native apps from architecture to App Store.',
    skills: ['Swift', 'SwiftUI', 'UIKit', 'Combine', 'CloudKit', 'MultipeerConnectivity', 'Core Data'],
  },
  {
    title: 'Backend & Web',
    blurb: 'Services, APIs, and the occasional full-stack tool.',
    skills: ['Java', 'TypeScript', 'Node.js', 'Next.js', 'Prisma', 'AWS S3', 'REST APIs'],
  },
  {
    title: 'Leadership & Craft',
    blurb: 'Taking products from idea to shipped, with a team.',
    skills: ['Team leadership', 'Delivery & planning', 'Mentoring', 'Code review', 'System design', 'Design patterns'],
  },
] as const;

// Social links rendered in the contact section and footer.
export const socials = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
] as const;
