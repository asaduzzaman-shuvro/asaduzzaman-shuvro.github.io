import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  // Images are paths relative to the entry, e.g. `./dn-news-app/feed.png` (see `gallery`).
  schema: ({ image }) => z.object({
    title: z.string(),
    summary: z.string(),
    type: z.enum(['professional', 'open-source']),
    role: z.string(),
    teamSize: z.string().optional(),
    tech: z.array(z.string()).default([]),
    outcomes: z.array(z.string()).default([]),
    links: z
      .object({
        github: z.string().url().optional(),
        appstore: z.string().url().optional(),
        live: z.string().url().optional(),
      })
      .default({}),
    cover: z.object({ src: image(), alt: z.string() }).optional(),
    gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
