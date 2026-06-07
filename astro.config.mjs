// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Astro configuration.
// `site` is used to generate absolute URLs (sitemap, social tags). Update this
// to your real domain once you connect one in Vercel (see PLAN.md §6).
export default defineConfig({
  site: 'https://kaanportfolio.vercel.app',
  integrations: [sitemap()],
});
