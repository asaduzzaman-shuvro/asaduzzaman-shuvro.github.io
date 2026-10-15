// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://asaduzzaman-shuvro.github.io';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Pages serves /x/index.html; links without the slash cost a 301 redirect.
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // /og/ is the share-card render target, not a page.
      filter: (page) => page !== `${SITE}/og/`,
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
