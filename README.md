# KaanPortfolio

Personal portfolio website for **Kaan Eskikalci** — game designer & developer.
Built with [Astro](https://astro.build/). See [PLAN.md](./PLAN.md) for the full
design and roadmap.

## Run it locally

You need [Node.js](https://nodejs.org/) (LTS). Then:

```bash
npm install      # once, to install dependencies
npm run dev      # start the dev server at http://localhost:4321
```

Other commands:

```bash
npm run build    # build the production site into dist/
npm run preview  # preview the production build locally
```

## Where things live

| What | Where |
|------|-------|
| Site name, tagline, nav, socials, skills | `src/consts.ts` |
| Colors, fonts, spacing (theme) | `src/styles/global.css` (`:root` block) |
| Page layout (header/footer/SEO) | `src/layouts/BaseLayout.astro` |
| Pages | `src/pages/` |
| Art projects | `src/content/art/*.md` |
| Dev projects | `src/content/dev/*.md` |
| Images used by projects | `src/assets/` |

## Add a project

Create a new Markdown file in `src/content/art/` or `src/content/dev/`. Copy an
existing file as a template — the fields at the top (the "frontmatter") are
validated, so you'll get a clear error if something's missing. Put cover/gallery
images in `src/assets/` and reference them with a relative path.

- **Video:** add a YouTube id as `video: "abc123"`.
- **3D model (art):** add a Sketchfab id as `sketchfab: "..."`.
- **Playable build (dev):** add a link as `playable: "https://itch.io/..."`.

## Deploy (free)

Push to GitHub, then import the repo at [vercel.com](https://vercel.com/). Vercel
auto-detects Astro — no configuration needed. Every push redeploys. To attach a
custom domain later, add it in the Vercel project's Domains settings. See
[PLAN.md](./PLAN.md) §6 for details and the GitHub Pages alternative.
