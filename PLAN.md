# PLAN.md — Kaan Eskikalci Portfolio Website

> Living document. We update this together as the project progresses.
> Last updated: 2026-06-18

## Progress (current status)

**Built, deployed, and filled with real content — Phases 0–9 done.** The site is
live on Vercel and now showcases real projects on both sides. Run it locally with
`npm run dev`.

- ✅ Phase 0 — Astro project scaffolded (Node already installed)
- ✅ Phase 1 — Layout, sticky nav (mobile hamburger), footer, global theme
- ✅ Phase 2 — Home two-section split (Art | Development)
- ✅ Phase 3 — Content collections + schemas + 3 placeholder projects per side
- ✅ Phase 4 — Responsive section grids with reusable `ProjectCard`
- ✅ Phase 5 — Detail pages (art = visuals-first, dev = build-first) + lite
  video / Sketchfab embeds
- ✅ Phase 6 — About (bio, photo, grouped skills) + Contact
- ✅ Phase 7 — Sitemap, robots.txt, SEO meta, README, accessibility basics
- ✅ Phase 8 — Deployed to Vercel; live and auto-redeploys on every push
- ✅ Phase 9 — Real content in place (see "Real content" below); all
  placeholders removed
- ⬜ Phase 10 — Custom domain (later)

### Real content (current)
- **Real photo** on the About page (`src/assets/portrait.jpg`).
- **Socials fixed** (GitHub/LinkedIn URLs) in `src/consts.ts`.
- **New section — Resume & Certificates** (`/resume`): CV download + 6
  certificate PDFs. Data lives in `RESUME` / `CERTIFICATES` in `src/consts.ts`;
  PDFs are in `public/files/`.
- **Art & Game Design — 5 real projects** (sorted alphabetically): 3D Modern
  House, 3D Animation on Blender, Unreal Engine Cutscene Studies, GDD & LDD
  Examples, UI Design — Dealer Sim.
- **Development — 6 real projects** (manual `order`): KAM (graduation project,
  featured), 8/9, Yerinde Duramayan Adam, Unreal FPS Shooter, Unreal Action
  Adventure, Unity 2D Action.
- **Documents as PDFs:** `.docx` files are converted to PDF (via Word) and
  served from `public/files/`, linked from a project's `links`.

### Schema/template additions made during Phase 9
- Art: `videos` (string[]) — show multiple YouTube videos on one detail page.
- Art/Dev shared: `period` (string) — display a date range (e.g. "2022–2025")
  instead of a single `year` (which is still used for sorting).
- Dev: `gallery` (image[]) — screenshot grid on dev detail pages (mirrors art).
- Dev: `order` (number) — manual sort position on `/dev` (lower = first; items
  without `order` fall back to newest year).

> **Dev note:** after adding/removing a content `.md` file or changing the
> schema, the Astro dev server's content cache can go stale (errors like
> `ImageNotFound` / `LocalImageUsedWrongly`). Fix: stop the dev server, delete
> `.astro` and `node_modules/.vite`, then restart.

### Defaults chosen during the build (easy to change)
- **Theme:** dark by default (makes renders/screenshots pop). All colors are
  CSS variables in `src/styles/global.css` — flip to light there.
- **Fonts:** clean system font stack for now (instant, zero requests). Swap in
  Inter during a later polish pass via `--font-sans`.
- **Contact:** kept as its own page *and* repeated in the footer.
- Site-wide text, nav, socials, and skills live in `src/consts.ts`.

## Context

Kaan is a game designer about to graduate, with two distinct skill sides:
**Art & Game Design** (3D, level design, visual work) and **Development**
(C++/C#, Unity & Unreal). The goal is a personal portfolio website that makes
both sides immediately obvious to a recruiter or studio, lets them scan the
work in under a minute, and looks clean/minimal so the work — not the UI — is
the focus.

This is Kaan's first web project. He's strong in C#/C++ but new to web, so the
stack is chosen to be approachable. The site must be fast, responsive
(mobile + desktop), and free to host, with a path to a custom domain later.

### Decisions already made (from clarifying questions)
- **Stack:** Astro (component-based, ships almost no JS, beginner-friendly).
- **Heavy media:** embed externally — video on YouTube/Vimeo, 3D on Sketchfab,
  playable Unity/Unreal builds link out to itch.io. Keeps the site tiny/fast.
- **Hosting:** start on a free address (Vercel), attach a custom domain later.
- **Content:** build with placeholders first; swap in real content over time.

---

## 1. Tech Stack (and why)

| Layer | Choice | Why it fits Kaan |
|------|--------|------------------|
| Framework | **Astro** | Write HTML-like `.astro` components (very close to plain HTML). Ships **zero JavaScript by default**, so pages load fast. Has a built-in "content collections" feature perfect for project entries. Free to deploy. |
| Styling | **Plain CSS with CSS variables** (no Tailwind to start) | Fewer new concepts at once. CSS variables give us one place to control colors/spacing — easy to keep the design consistent and minimal. We can add Tailwind later if desired. |
| Content format | **Markdown + frontmatter** via Astro Content Collections | Each project is one `.md` file with structured fields (title, role, tools…). Editing a project feels like editing a config file — comfortable for someone from a code background. No database needed. |
| Images | **Astro `<Image>` component** (built-in `astro:assets`) | Automatically resizes and serves modern formats (WebP/AVIF) for fast loads on mobile. |
| Hosting | **Vercel** (primary) | Auto-detects Astro, deploys on every git push, free tier is generous, gives an instant `*.vercel.app` URL and one-click custom domains later. GitHub Pages is a documented fallback (needs a small config tweak — see §6). |
| Version control | **Git + GitHub** | Already initialized. GitHub repo becomes the deploy source for Vercel. |

**Why not the alternatives:** Plain HTML/CSS gets repetitive fast (every
project page copy-pasted). Next.js/React is more powerful but ships more JS and
adds React concepts (hooks, state) that aren't needed for a content site. Astro
is the middle path: modern output, minimal new vocabulary.

**What Kaan will need to install:** Node.js (LTS) and a code editor (VS Code).
That's it — `npm create astro@latest` scaffolds the rest.

---

## 2. Site Structure / Sitemap

A small, scannable site. Two showcase sections are the heart of it.

```
/                      Home — hero + the two-section split (Art | Development)
│
├── /art               Art & Game Design — grid of art/design projects
│   └── /art/[slug]    Single art project (renders, video embeds, level breakdowns)
│
├── /dev               Development — grid of code/engine projects
│   └── /dev/[slug]    Single dev project (tech stack, repo/build links, write-up)
│
├── /resume            Resume & Certificates — CV download + certificate PDFs
├── /about             Short bio, skills, software/engines, photo
└── /contact           Email + links (LinkedIn, GitHub, itch.io, ArtStation)
                       (can also just live in the footer + About)
```

### Navigation flow
- **Top nav (always visible):** Logo/name · Art · Development · About · Contact.
- **Home** is the decision point: a clear visual split — one side "Art & Game
  Design", the other "Development" — each a large clickable card leading into
  that section. This is what communicates "I do both" in the first 3 seconds.
- Within a section, a **grid of project cards**; clicking a card opens that
  project's detail page.
- Every detail page has a **back-to-section** link and **next/prev** is optional
  (phase 2+).
- Footer repeats key links + contact so a recruiter never has to hunt.

---

## 3. Content Model

Each project = one Markdown file in a content collection. Shared fields plus a
few side-specific ones. Astro validates these with a schema so a typo (e.g.
missing title) is caught at build time.

### Shared fields (both Art and Dev)
| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Project name |
| `summary` | string | One-line hook for the card (the under-a-minute scan) |
| `role` | string | e.g. "Level Designer", "Gameplay Programmer" |
| `tools` | string[] | Tags: Unreal, Unity, Blender, C++, C#, Substance… |
| `year` | number | For sorting |
| `period` | string? | Optional display date range (e.g. "2022–2025"); overrides `year` in the UI |
| `cover` | image | Thumbnail used on the grid card |
| `featured` | boolean | Pin to top of section / show on home |
| `description` | Markdown body | Full write-up below the frontmatter |
| `links` | array | `{ label, url }` — repo, itch.io, store page, ArtStation, or PDF docs |

### Art-specific
| Field | Type | Notes |
|-------|------|-------|
| `gallery` | image[] | Multiple renders/screenshots |
| `sketchfab` | string? | Sketchfab model embed ID (optional) |
| `video` | string? | Single YouTube/Vimeo ID for turntables/walkthroughs |
| `videos` | string[] | Multiple YouTube IDs shown in order (hero); takes precedence over `video` |
| `medium` | string | e.g. "3D Environment", "Level Design", "Concept" |

### Dev-specific
| Field | Type | Notes |
|-------|------|-------|
| `engine` | string | Unity / Unreal / Custom |
| `order` | number? | Manual sort position on `/dev` (lower = first) |
| `language` | string[] | C++, C#, HLSL… |
| `repo` | string? | GitHub URL |
| `playable` | string? | itch.io / WebGL build link |
| `video` | string? | Gameplay trailer (YouTube/Vimeo ID) |
| `gallery` | image[] | Screenshot grid shown below the write-up |
| `highlights` | string[] | 2–4 bullet "what I built" points for fast scanning |

**Key difference:** Art entries lead with **visuals** (gallery/3D/video first,
text second). Dev entries lead with **what was built and how** (role,
highlights, tech, links first; media supports it).

---

## 4. Layout & Visual Direction

Goal: minimal, lots of whitespace, work-forward. Think gallery wall, not
dashboard.

### Typography
- Two fonts max: one clean **sans-serif** for everything (e.g. Inter), optional
  slightly distinct font for headings. Self-host or use a fast font CDN.
- Big, confident headings; generous line-height on body; limit line length
  (~65–75 chars) for readability.

### Color
- **Neutral base:** near-white background, near-black text (or a tasteful dark
  mode as the default — TBD with Kaan). One **single accent color** used
  sparingly for links/hover/active nav. That's the whole palette.
- Defined once as CSS variables (`--bg`, `--fg`, `--muted`, `--accent`) so the
  whole site re-themes from one file.

### Spacing & grid
- Consistent spacing scale (e.g. 4/8/16/24/48/96px) via CSS variables.
- Responsive project grid: 3 columns desktop → 2 tablet → 1 mobile, using CSS
  Grid with `auto-fit`/`minmax` (no JS).

### Handling media
- **Screenshots / 3D renders:** Astro `<Image>` for auto-optimized, lazy-loaded
  images. Consistent aspect ratios on cards so the grid looks tidy.
- **Video:** lightweight embed — show a thumbnail, load the YouTube/Vimeo
  iframe only on click (a "lite embed" pattern) so it never slows first paint.
- **3D models:** Sketchfab iframe on detail pages (lazy-loaded).
- **WebGL/playable builds:** a prominent "▶ Play on itch.io" button rather than
  embedding heavy builds — keeps the site fast and mobile-friendly.

### Accessibility & polish (cheap wins)
- Alt text on all images, sufficient color contrast, keyboard-focusable nav,
  semantic headings. Subtle hover transitions only — no heavy animation.

---

## 5. Phased Build Roadmap

Small, ordered milestones. Each one ends with something visible/working.

- **Phase 0 — Setup (foundation)**
  - Install Node.js + VS Code. Scaffold Astro project in the repo.
  - Run dev server locally; confirm the starter page loads.
  - First commit + push to GitHub.

- **Phase 1 — Skeleton & navigation**
  - Base layout component (head, nav, footer) and global CSS variables.
  - Create empty pages: Home, Art, Development, About, Contact. Nav links work.

- **Phase 2 — Home split**
  - Build the hero + two-section split (Art | Development) that defines the
    site. Make it responsive.

- **Phase 3 — Content collections**
  - Define the Art and Dev schemas (§3). Add 2–3 **placeholder** projects each
    as Markdown files with placeholder images.

- **Phase 4 — Section grids**
  - Art and Dev index pages render project cards from the collections.
    Responsive grid, consistent card design.

- **Phase 5 — Project detail pages**
  - Dynamic `[slug]` pages for each side, with the side-specific layouts
    (art = visuals-first, dev = build-first). Add lite-video + Sketchfab embeds.

- **Phase 6 — About & Contact**
  - Bio, skills/engines list, photo; contact links + footer.

- **Phase 7 — Polish & performance pass**
  - Image optimization check, mobile testing, accessibility pass, favicon,
    page titles/meta, basic SEO + social preview image.

- **Phase 8 — Deploy** (can happen as early as Phase 1 for a live preview)
  - Connect GitHub repo to Vercel; site live on `*.vercel.app`.

- **Phase 9 — Real content**
  - Replace placeholders with real projects, renders, and links over time.

- **Phase 10 — Custom domain (later)**
  - Buy a domain and attach it in Vercel.

---

## 6. Deployment Plan

### Free hosting now — Vercel (recommended)
1. Push the repo to GitHub (already a git repo).
2. Sign in to Vercel with GitHub, "Import" the repo.
3. Vercel auto-detects Astro — no config needed. Click Deploy.
4. Live at `kaanportfolio.vercel.app` (name adjustable). **Every `git push`
   auto-redeploys.**

### Fallback — GitHub Pages
- Works too, but Astro needs `site` and `base` set in `astro.config.mjs` and a
  GitHub Actions workflow to build. Slightly more setup; documented if Kaan
  prefers staying entirely on GitHub.

### Custom domain (later)
- Buy a domain (~$10–15/yr from Namecheap/Cloudflare).
- In Vercel: Project → Settings → Domains → add the domain, then set the DNS
  records Vercel shows at the registrar. HTTPS is automatic and free.
- No code change required — just config.

---

## 7. Verification (how we'll know each phase works)

- **Local:** `npm run dev` and open `localhost:4321` — visually confirm pages,
  click through nav, resize the browser to phone width to check responsiveness.
- **Build:** `npm run build` then `npm run preview` — confirms the production
  build succeeds (catches schema/typo errors).
- **Live:** after Vercel deploy, open the `*.vercel.app` URL on a real phone.
- **Performance/scan test:** run Lighthouse in Chrome DevTools (aim for high
  Performance + Accessibility); confirm a first-time visitor understands "art +
  dev" within seconds and can reach any project in two clicks.

---

## Open questions to revisit
- Light theme vs. dark-default for the minimal aesthetic? (decide in Phase 2)
- Exact font pairing and accent color. (decide in Phase 2)
- Whether Contact is its own page or folds into About + footer.
