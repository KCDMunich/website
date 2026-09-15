# Cloud Native Summit Munich — Next.js Website

This directory contains the sole implementation of the
[cloudnativesummit.de](https://cloudnativesummit.de) website, built with Next.js App Router.

## Prerequisites

- Node.js >=24.19.0 and <25 (see `package.json`; `.nvmrc` pins the local version)
- npm

## Local development

From the repository root:

```bash
cd web
nvm install
nvm use
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

### Fienta ticket display

Ticket purchases take place on Fienta, not in an embedded store. To enable the ticket section,
set `EVENT_STAGE=tickets`, `PROGRAM_PUBLISHED=false` until the new program is ready, and
`TICKETS_SOLD_OUT=false`. This also changes hero copy and navigation to the ticket-sales phase.

For the 2027 event, configure the following in Vercel Preview first:

| Variable | Value |
| -------- | ----- |
| `FIENTA_EVENT_ID` | `201687` |
| `FIENTA_ORGANIZER_ID` | `36183` |
| `FIENTA_LOCALE` | `en` |
| `FIENTA_EVENT_URL` | `https://fienta.com/cloud-native-summit-201687` |
| `FIENTA_API_KEY` | Private API token with access to this event |

`FIENTA_BASE_URL` defaults to `https://fienta.com/api/v1`; `FIENTA_SERIES_ID` is optional.
The browser calls our own `/api/fienta-event` route; no public proxy URL variable is needed.
The [Fienta API](https://fienta.com/help/api) requires bearer authentication for individual
ticket types. The public event listing confirms the event but does not supply the ticket cards.
Without those details, the section links to the Fienta store rather than announcing future sales.

The server excludes code-protected tickets and tickets outside their visibility window before
returning any ticket details. Invalid visibility dates are excluded and logged without ticket
data. The response exposes only the normalized display fields, including remaining quantities
for public tickets; it never returns access codes or API tokens.
Fienta requests and public API responses are not cached, so visibility changes are checked on
each request. When deploying this protection over an older version, invalidate any previously
cached `/api/fienta-event` responses in Vercel; the new headers do not retroactively remove them.

Keep the API token only in Vercel's server-side environment or ignored `.env.local`.
Do not share or commit it. Before production, verify returned ticket types, price/VAT semantics,
and availability against the live store. Apply the same variables to Production only after preview
verification and redeploy. Keep `upcoming.ticketUrl` in `lib/event-config.ts` aligned with
`FIENTA_EVENT_URL`, since hero and header links use that configuration directly.

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

Use the **existing project that owns the production domains**. Do not create a replacement project
or change domain/DNS assignments for this migration.

### Before changing settings

Record the project's current build settings, production branch, and last known-good Production
deployment URL/ID. Confirm that deployment is available for rollback. Coordinate changes with
other contributors: project build settings apply to subsequent deployments, not only this PR.
Saving settings does not replace the currently serving deployment.

### Build and environment settings

In the existing project's **Settings > Build and Deployment**, configure:

| Setting | Value |
| ------- | ----- |
| Root Directory | `web` (no leading slash) |
| Framework Preset | Next.js |
| Build Command override | Off; use the `build` script in `web/package.json` |
| Output Directory override | Off; use Next.js default, not Gatsby's `public` |
| Install Command override | Off; use npm detected from `web/package-lock.json` |
| Development Command override | Off |
| Node.js Version | 24.x; `package.json` also declares the supported Node range |

The `.nvmrc` file is for local tooling; do not rely on it alone to configure Vercel's runtime.
Save both the framework and Root Directory sections when changed.

Configure variables from [`.env.example`](.env.example) for **Preview and Production** separately.
Keep secrets server-side; do not copy private values into documentation or the PR.
Keep `NEXT_PUBLIC_SITE_URL` set to the canonical production URL. Replace legacy `GATSBY_*`
configuration with the documented Next.js equivalents where applicable. Build-time changes
require a new deployment.

### Preview and production cutover

Create a new **Preview** deployment of the updated PR branch in that same project. Verify its
commit SHA and build settings; a green check from a separate Vercel project is not sufficient.
Do not promote the preview to Production during validation.

Check `/`, `/schedule/`, `/app/schedule/`, a session detail route, `/speakers/`, a speaker detail
route, `/team/`, `/vision/`, and both legal pages. Also check the `/mission-statement/` redirect,
images/fonts/video, mobile navigation, schedule favorites, video consent, `/robots.txt`,
`/sitemap.xml`, and the API integrations enabled for the selected event stage.

Only merge after the updated PR is conflict-free and the preview is verified. A merge into the
configured production branch normally triggers a Production deployment automatically; avoid an
additional manual deploy unless needed. Verify the resulting deployment on the existing domains.

### Rollback

If production regresses, use Vercel's rollback controls to restore the recorded known-good
deployment without moving domains. Restore the recorded project settings before rebuilding an
older Gatsby revision; the old source cannot be rebuilt with the new `web`/Next.js settings.
Revert the migration in Git separately if needed. Keep the old deployment available until the
cutover has been verified.

## Content

Static legal and informational pages live in `content/static-pages/` as Markdown files with frontmatter:

```yaml
---
title: Page Title
slug: url-slug
---
```

Pages are rendered at `/{slug}` (e.g. `/vision`, `/imprint-data-privacy`, `/privacy-policy`).
