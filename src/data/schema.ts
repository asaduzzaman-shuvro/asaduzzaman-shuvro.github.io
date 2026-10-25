// schema.org JSON-LD builders, fed from profile.ts. Pages render them into Base's `head` slot:
//   <script is:inline type="application/ld+json" slot="head" set:html={jsonLd(...)} />

import { profile } from './profile';

/** Serialize for a <script> body — escape `<` so a `</script>` in any text can't close the tag. */
export const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c');

const personId = (site: URL) => new URL('/#person', site).href;
const websiteId = (site: URL) => new URL('/#website', site).href;

/** Reference to the Person node, for `author` fields on other pages. */
export const personRef = (site: URL) => ({
  '@type': 'Person',
  '@id': personId(site),
  name: profile.name,
  url: site.href,
});

export function personSchema(site: URL, image?: string) {
  return {
    '@type': 'Person',
    '@id': personId(site),
    name: profile.name,
    url: site.href,
    ...(image && { image: new URL(image, site).href }),
    jobTitle: profile.role,
    description: profile.metaDescription,
    email: `mailto:${profile.email}`,
    worksFor: { '@type': 'Organization', name: profile.company },
    address: profile.location,
    sameAs: [profile.linkedin, profile.github],
  };
}

export function websiteSchema(site: URL) {
  return {
    '@type': 'WebSite',
    '@id': websiteId(site),
    url: site.href,
    name: profile.name,
    description: profile.metaDescription,
    inLanguage: 'en',
    publisher: { '@id': personId(site) },
  };
}

/** Home page: the Person and the WebSite as one linked graph. */
export function homeGraph(site: URL, image?: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [personSchema(site, image), websiteSchema(site)],
  };
}

interface PostData {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: readonly string[];
}

export function blogPostingSchema(post: PostData, url: URL, site: URL, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: url.href,
    mainEntityOfPage: url.href,
    image: new URL(image, site).href,
    datePublished: post.pubDate.toISOString(),
    dateModified: (post.updatedDate ?? post.pubDate).toISOString(),
    inLanguage: 'en',
    ...(post.tags.length > 0 && { keywords: post.tags.join(', ') }),
    author: personRef(site),
    publisher: personRef(site),
    isPartOf: { '@id': websiteId(site) },
  };
}

interface ProjectData {
  title: string;
  summary: string;
  tech: readonly string[];
}

export function projectSchema(project: ProjectData, url: URL, site: URL, image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: url.href,
    ...(project.tech.length > 0 && { keywords: project.tech.join(', ') }),
    ...(image && { image: new URL(image, site).href }),
    author: personRef(site),
    isPartOf: { '@id': websiteId(site) },
  };
}
