# Cloud Native Summit Munich — Next.js Website

This directory contains the Next.js (App Router) version of the [cloudnativesummit.de](https://cloudnativesummit.de) website, migrated from Gatsby.

## Prerequisites

- Node.js 20+
- npm

## Local development

From the repository root:

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env.local` and adjust as needed:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://cloudnativesummit.de`) |
| `SESSIONIZE_EVENT_ID` | Sessionize event ID for schedule & speakers |
| `NEXT_PUBLIC_SCHEDULE_STATS_ENDPOINT` | Optional endpoint for anonymous schedule favorite stats |

## Build

```bash
cd web
npm run build
npm run start
```

## Project structure

```
web/
├── app/                    # Next.js App Router pages
├── components/             # React components (layout, home, schedule, speakers, …)
├── content/static-pages/   # Markdown content (vision, imprint, privacy policy)
├── lib/                    # Utilities (metadata, sessionize, markdown, …)
└── public/                 # Static assets (images, fonts, icons)
```

## Deploy on Vercel

1. Import the GitHub repository in [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `web`.
3. Framework Preset: **Next.js** (auto-detected).
4. Add environment variables from `.env.example` in the Vercel project settings.
5. Deploy.

Vercel will run `npm run build` inside `web/` and serve the production app.

## Content

Static legal and informational pages live in `content/static-pages/` as Markdown files with frontmatter:

```yaml
---
title: Page Title
slug: url-slug
---
```

Pages are rendered at `/{slug}` (e.g. `/vision`, `/imprint-data-privacy`, `/privacy-policy`).