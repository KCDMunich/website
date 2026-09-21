# Cloud Native Summit Munich Website

Next.js App Router application for [cloudnativesummit.de](https://cloudnativesummit.de).

## Local development

Requires Node.js >=24.19.0 and <25, plus npm. From the repository root:

```bash
cd web
nvm install
nvm use
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. Copy the env example only on first setup; do not overwrite an
existing `.env.local`. The file is ignored by Git. Never commit API keys.

Run inside `web/`:

```bash
npm run lint
npm test
npm run build
npm run start
```

`start` serves the production build; use `dev` for development.

## Configuration

[`.env.example`](.env.example) lists all supported variables and phase presets.

- **Local:** set values in `web/.env.local` and restart the development server.
- **Vercel:** set values in the correct project's **Settings > Environment Variables**,
  selecting **Preview** or **Production**, then create a new deployment.
- Neither `.env.local` nor `.env.example` automatically configures Vercel.
- Only public values may use `NEXT_PUBLIC_`; API keys must remain server-side.

### Event lifecycle

`EVENT_STAGE` controls homepage sections, hero copy, navigation, and metadata:

| Stage | Visitor experience |
| ----- | ------------------ |
| `teaser` | Save the date and previous-edition archive; no ticket section |
| `tickets` | Ticket sales, CFP section, and program previews or publication |
| `live` | On-site information and schedule |
| `recap` | Photos, recordings, and partner thanks |

During `tickets`, `PROGRAM_PUBLISHED` controls program publication and `TICKETS_SOLD_OUT`
replaces purchase actions with the sold-out presentation. Both default to `false`.
`ANNOUNCED_SPEAKER_IDS` enables early speaker previews. Leave it empty to hide the speaker section,
header/mobile/footer links, and speaker hero CTA during unpublished ticket stages.
Add Sessionize IDs and redeploy to show announcements, or set `PROGRAM_PUBLISHED=true` in the
ticket stage for the full lineup. Archive and live lineups are unaffected. Direct preview routes
remain reachable with `noIndex`; no extra visibility switch is needed.
`SPONSORSHIP_PHASE=closed|recruiting` controls sponsor recruitment independently.

Edition content lives in [`lib/event-config.ts`](lib/event-config.ts):

| Configuration | Purpose |
| ------------- | ------- |
| `archive` | Completed edition: recordings, gallery, and archive labels |
| `upcoming` | Next edition: date, venue, and ticket link |
| `campaigns` | Active campaign links, including the CFP form |
| `sponsorship` | Edition accepting partner enquiries |

Keep these aligned when rotating editions. `SESSIONIZE_EVENT_ID` selects schedule and speaker
data. Do not publish the upcoming program until that source is ready.

### Sponsors by edition

[`lib/sponsors-data.ts`](lib/sponsors-data.ts) keeps separate `sponsorsByEdition` lists:

- `2026`: the existing partner archive; these logos are not treated as 2027 confirmations.
- `2027`: initially empty; add only confirmed partners with their `name`, `icon`, `url`, and `tier`.

The homepage shows the recruiting card first (when `SPONSORSHIP_PHASE=recruiting`), followed by
the upcoming edition's partners and then the explicitly year-labelled archive. An empty edition
has no heading, placeholder, or logo grid. Empty tiers are also hidden.
`SPONSORSHIP_PHASE=closed` hides only the recruiting card, not either partner list.

Adding the first confirmed 2027 partner and deploying makes that edition's group visible
automatically. Assets live in `public/icons-src/`. When rotating `EVENT_CONFIG` editions, also
add the corresponding year in `sponsorsByEdition` (an empty list is valid); a missing year is a
configuration error rather than a fallback to old sponsors.

## Fienta tickets

We display current ticket types and link to Fienta for checkout. There is no embedded store.
For the 2027 event, set the following in Vercel **Preview** first:

```dotenv
EVENT_STAGE=tickets
PROGRAM_PUBLISHED=false
TICKETS_SOLD_OUT=false
FIENTA_EVENT_ID=201687
FIENTA_ORGANIZER_ID=36183
FIENTA_LOCALE=en
FIENTA_EVENT_URL=https://fienta.com/cloud-native-summit-201687
```

Also set **`FIENTA_API_KEY`** to the private token with access to this event. An existing key
can be reused if it has access and is assigned to the same project and environment.
Do not prefix it with `NEXT_PUBLIC_` or paste it into documentation, issues, or PRs.

`FIENTA_BASE_URL` defaults to `https://fienta.com/api/v1`; `FIENTA_SERIES_ID` is optional.
Keep `upcoming.ticketUrl` aligned with `FIENTA_EVENT_URL`: the hero link uses the former.
Header ticket links jump to the homepage ticket section; its purchase button opens Fienta.

The browser calls `/api/fienta-event`. The server loads ticket types using the
[authenticated Fienta API](https://fienta.com/help/api); the public event listing alone does
not provide ticket cards. No public proxy URL variable is needed.

### Visibility and troubleshooting

Code-protected tickets and tickets outside a valid visibility window are excluded server-side.
Only normalized display fields, including remaining quantities for public tickets, are returned.
API keys and access codes are never included. Requests and responses are not cached.

| Symptom | What to check |
| ------- | ------------- |
| Entire ticket section missing | Build used `EVENT_STAGE=tickets`; redeploy after changing it |
| Section shows sold out | `TICKETS_SOLD_OUT` is not `true` unintentionally |
| Section visible but no cards | Event ID, API-key access, and public ticket visibility/sale dates |
| API returns `X-Fienta-Configured: false` | Missing event ID or failed event lookup; the header does not distinguish these causes |
| Local works but Preview does not | Variables belong to that Vercel project and Preview scope, including any branch restrictions |

Without ticket details, the shop link remains available. Before Production, compare prices,
VAT, and availability with the live store. When replacing an older cached API implementation,
invalidate existing `/api/fienta-event` cache entries in Vercel.

## Deploy on Vercel

Keep the existing project with the production domains. Do not create a replacement project
or move DNS. Record current settings and the last known-good Production deployment for rollback.

Under **Settings > Build and Deployment**:

| Setting | Value |
| ------- | ----- |
| Root Directory | `web` (no leading slash) |
| Framework Preset | Next.js |
| Build / Install / Development overrides | Off; use framework defaults and package scripts |
| Output Directory override | Off; Next.js default, not Gatsby's `public` |
| Node.js Version | 24.x; supported range is declared in `package.json` |

`.nvmrc` configures local tooling, not Vercel's runtime. Save each changed settings section.
Project settings affect subsequent deployments, not just this PR, but saving them does not
replace the currently serving deployment.

### Preview and production

1. Configure **Preview** variables, including `NEXT_PUBLIC_SITE_URL=https://cloudnativesummit.de`.
   Push the PR branch to trigger a preview through the Git integration, or redeploy it after
   env-only changes. A local commit alone does not trigger Vercel.
2. Verify the deployed commit and project in the PR checks. A green deployment from a separate
   Vercel project does not validate the project that owns the production domains.
3. Check the homepage, desktop/mobile navigation, schedule and speaker detail routes, legal
   pages, media, video consent, enabled APIs, `/robots.txt`, `/sitemap.xml`, and the
   `/mission-statement/` redirect.
4. Configure **Production** variables separately. Merge only after preview verification;
   a merge into the configured production branch normally deploys automatically.
   Confirm the result on the existing domains.

### Rollback

Restore the recorded known-good deployment using Vercel's rollback controls without moving
domains. Keep that deployment available until cutover is verified.
Before rebuilding an old Gatsby revision, restore its recorded project settings; the old source
cannot be rebuilt with the new `web`/Next.js settings. Revert the migration in Git separately
if needed.

## Project structure

```text
web/
├── app/                    # Routes and API handlers
├── components/             # Layout, homepage, schedule, speakers, UI
├── content/static-pages/   # Vision, imprint, privacy policy
├── lib/                    # Event configuration and data integrations
└── public/                 # Source assets: images, fonts, videos, icons
```

Static pages use Markdown with `title` and `slug` frontmatter. Their routed entries live in
`app/`. `public/` contains source assets; `.next/` is generated output.

Favicons use a square crop of the navbar artwork in `public/icons-src/navLogo-timeless.svg`
(`viewBox="272 0 700 700"`), without the wordmark. Keep `app/favicon.ico` and the SVG/PNG
icons in `public/` aligned when changing the branding. `lib/metadata.ts` registers the SVG,
32px PNG, and Apple touch icon; Next.js registers the ICO automatically.
