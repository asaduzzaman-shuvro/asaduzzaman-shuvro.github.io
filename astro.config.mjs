// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://asaduzzaman-shuvro.github.io',
  // Pages serves /x/index.html; links without the slash cost a 301 redirect.
  trailingSlash: 'always',
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
