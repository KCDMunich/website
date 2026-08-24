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

**`.env.example` is the canonical reference** for site phases, presets, and the variable matrix.
It documents the full lifecycle (`teaser → cfp → tickets → live → recap`), copy-paste presets for
common situations, and which variables apply in which stage.

Quick overview:

| Variable | Role |
| -------- | ---- |
| `EVENT_STAGE` | Main presentation phase (build-time; redeploy on Vercel after changes) |
| `PROGRAM_PUBLISHED` / `TICKETS_SOLD_OUT` | Only while `EVENT_STAGE=tickets` |
| `CFP_URL` | Required only while `EVENT_STAGE=cfp` |
| `ANNOUNCED_SPEAKER_IDS` | Early speaker preview before full program publication |
| `SPONSORSHIP_PHASE` | Independent sponsor campaign (`closed` or `recruiting`) |
| `SESSIONIZE_EVENT_ID` | Schedule and speaker data |
| `FIENTA_*` | Server-side ticket API (see `.env.example`) |

Edition dates, venues, ticket URLs, and gallery links live in `lib/event-config.ts` — not in env vars.
In the teaser stage, schedule and speaker routes present the completed edition as a clearly labeled,
indexable archive. CFP and early ticket stages switch speakers to the upcoming preview while keeping
the upcoming schedule hidden and `noIndex` until the new program is published.

### Annual edition rotation

`lib/event-config.ts` keeps the completed edition, the upcoming edition, and the sponsorship
campaign separate so copy cannot accidentally sell or recap the wrong year:

- `archive`: the completed edition, including its gallery, recordings, speakers, and schedule.
- `upcoming`: the edition currently being announced, accepting proposals, selling tickets, or live.
- `sponsorship`: the edition for which partner recruitment is currently open.

For the 2026 recap, `archive` is 2026 while `upcoming` and `sponsorship` are 2027. Before changing
to `EVENT_STAGE=tickets` or `live`, fill `upcoming.dateLabel`, `upcoming.venue`, and
`upcoming.ticketUrl`; the build fails with an actionable error if required ticketing or live-event
content is missing.

**Local:** set in `.env.local` (copy from `.env.example`).

**Vercel:** Project → **Settings** → **Environment Variables** → update the lifecycle states → **Redeploy** (these values are read at build time).

## Build

```bash
cd web
npm run build
npm run start
```

## Project structure

```text
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
