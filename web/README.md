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

| Variable                              | Description                                             |
| ------------------------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                | Canonical site URL                                      |
| `EVENT_STAGE`                         | Canonical event presentation stage                      |
| `PROGRAM_PUBLISHED`                   | Publish the schedule within the `tickets` stage         |
| `TICKETS_SOLD_OUT`                    | Show sold-out messaging within the `tickets` stage      |
| `SPONSORSHIP_PHASE`                   | Independent sponsor campaign state                      |
| `SESSIONIZE_EVENT_ID`                 | Sessionize event ID for schedule and speakers           |
| `NEXT_PUBLIC_SCHEDULE_STATS_ENDPOINT` | Optional endpoint for anonymous schedule favorite stats |
| `FIENTA_*`                            | Server-side Fienta API configuration                    |

### Site state

The website uses one canonical event stage. It derives hero copy, CTAs, navigation, homepage order,
program visibility, ticketing, route copy, indexing, and metadata from this value. Sponsorship stays
independent because recruiting for the next edition can begin during recap.

```dotenv
EVENT_STAGE=recap
PROGRAM_PUBLISHED=false
TICKETS_SOLD_OUT=false
SPONSORSHIP_PHASE=recruiting
```

| `EVENT_STAGE` | Visitor experience                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `teaser`      | Save the date, previous highlights, no program or ticket links                                 |
| `cfp`         | CFP campaign and selected speaker preview                                                      |
| `tickets`     | Ticket sales and early speaker preview; options publish the program or show sold-out messaging |
| `live`        | Live schedule and on-site information                                                          |
| `recap`       | Photos, recordings, archive, and partner thanks                                                |

`EVENT_STAGE=cfp` requires `CFP_URL` to point to the public submission form. `PROGRAM_PUBLISHED` and
`TICKETS_SOLD_OUT` only affect `EVENT_STAGE=tickets`; ticket sales require a ticket URL.

### Speaker announcements

CFP and ticket sales before program publication show only the explicitly announced speakers. Set
their comma-separated Sessionize IDs in `ANNOUNCED_SPEAKER_IDS`. Once `PROGRAM_PUBLISHED=true`, the
full lineup and schedule become public; the homepage shows a curated wall and `/speakers` exposes
the complete list.
Missing required content and unknown stages fail the build with actionable errors.

Schedule and speaker routes may remain directly reachable before publication, but are removed from
public navigation and the sitemap and receive `noIndex` metadata. This is presentation control, not
authorization.

Public event content such as editions, dates, gallery, video, CFP, and sponsorship links lives in
`lib/event-config.ts`; UI components do not read environment variables directly.

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
