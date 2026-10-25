import type { CollectionEntry } from 'astro:content';

/** Home grid and CV order: by `order` alone, so iOS work can lead whatever its `type`. */
export const sortProjects = (projects: CollectionEntry<'projects'>[]) =>
  [...projects].sort((a, b) => a.data.order - b.data.order);
