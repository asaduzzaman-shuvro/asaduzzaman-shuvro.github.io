// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://asaduzzaman-shuvro.github.io';

// Sitemap <lastmod> for blog URLs. Content collections aren't available at config time, so read
// the frontmatter directly. Post id = filename without `.md`, matching the glob loader.
// Drafts are skipped so they never leak a date into the sitemap.
function blogLastmods() {
  const dir = './src/content/blog';
  /** @type {Map<string, Date>} */
  const byUrl = new Map();
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const fm = fs.readFileSync(path.join(dir, file), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const field = (/** @type {string} */ key) =>
      fm.match(new RegExp(`^${key}:\\s*['"]?([^'"\\n]+?)['"]?\\s*$`, 'm'))?.[1];
    if (field('draft') === 'true') continue;
    const date = field('updatedDate') ?? field('pubDate');
    if (!date || Number.isNaN(Date.parse(date))) continue;
    byUrl.set(`${SITE}/blog/${file.replace(/\.md$/, '')}/`, new Date(date));
  }
  // The blog index only changes when a post does. (The home page also renders profile.ts and
  // projects, which carry no dates — no lastmod beats a wrong one.)
  const newest = Math.max(0, ...[...byUrl.values()].map((d) => d.valueOf()));
  if (newest) byUrl.set(`${SITE}/blog/`, new Date(newest));
  return byUrl;
}
const lastmods = blogLastmods();

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Pages serves /x/index.html; links without the slash cost a 301 redirect.
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // /og/ is the share-card render target, not a page.
      filter: (page) => page !== `${SITE}/og/`,
      serialize(item) {
        const lastmod = lastmods.get(item.url);
        return lastmod ? { ...item, lastmod: lastmod.toISOString() } : item;
      },
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
