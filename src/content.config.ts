import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Fields shared by every project, regardless of side.
// `image` is provided by Astro so cover/gallery images get optimized.
const shared = (image: () => ReturnType<typeof z.any>) => ({
  title: z.string(),
  summary: z.string(), // one-line hook shown on the card
  role: z.string(),
  tools: z.array(z.string()),
  year: z.number(), // used for sorting; for display, `period` overrides if set
  period: z.string().optional(), // optional date range to show instead, e.g. "2022–2025"
  cover: image(),
  featured: z.boolean().default(false),
  links: z
    .array(z.object({ label: z.string(), url: z.string() }))
    .default([]),
});

// ---- Art & Game Design projects ----
const art = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/art' }),
  schema: ({ image }) =>
    z.object({
      ...shared(image),
      medium: z.string(), // e.g. "3D Environment", "Level Design"
      gallery: z.array(image()).default([]),
      sketchfab: z.string().optional(), // Sketchfab model embed id
      video: z.string().optional(), // single YouTube/Vimeo id (hero)
      videos: z.array(z.string()).default([]), // multiple YouTube ids (shown in order)
    }),
});

// ---- Development projects ----
const dev = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dev' }),
  schema: ({ image }) =>
    z.object({
      ...shared(image),
      engine: z.string(), // Unity / Unreal / Custom
      language: z.array(z.string()).default([]),
      repo: z.string().optional(),
      playable: z.string().optional(), // itch.io / WebGL build link
      video: z.string().optional(),
      highlights: z.array(z.string()).default([]), // 2-4 "what I built" bullets
    }),
});

export const collections = { art, dev };
