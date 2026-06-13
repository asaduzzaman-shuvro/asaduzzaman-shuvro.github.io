import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
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
    cover: z.string().optional(),
    gallery: z.array(z.string()).default([]),
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
