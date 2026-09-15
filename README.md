# Cloud Native Summit Munich Website

The website lives in [`web/`](web/) and is built with Next.js App Router.

## Local development

```bash
cd web
nvm install
nvm use
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. Copy the env example only on first setup; keep existing local values.
Node.js 24.19.0 or newer within major 24 is required.

## Validation

Run these commands from the repository root:

```bash
npm run lint --prefix web
npm test --prefix web
npm run build --prefix web
```

## Vercel deployment

Keep the existing Vercel project that owns the production domains; do not import a replacement
project or move DNS. Use **Root Directory `web`** and **Framework Preset Next.js**.
Follow the [deployment and rollback checklist](web/README.md#deploy-on-vercel).

Set environment variables in Vercel separately for Preview and Production. `.env.local` stays
local, and `.env.example` is documentation, not automatic Vercel configuration.

See [Fienta ticket setup](web/README.md#fienta-tickets) to enable ticket cards and the shop link.

## Editor tooling

VS Code runs ESLint from `web/`. The root Prettier and Markdownlint settings are retained for the
recommended editor extensions; there is no npm formatting script or lint-staged/Commitlint hook.

## Repository structure

```text
├── web/                       # Next.js website
├── cloudflare/schedule-stats/  # Optional schedule statistics Worker
└── docs/                      # Project documentation
```
