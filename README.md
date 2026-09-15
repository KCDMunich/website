# Cloud Native Summit Munich Website

The production website lives in [`web/`](web/) and is built with Next.js App Router.

## Local development

```bash
cd web
nvm install
nvm use
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

## Validation

Run these commands from the repository root:

```bash
npm run lint --prefix web
npm test --prefix web
npm run build --prefix web
```

## Vercel deployment

Keep the existing Vercel project that owns the production domains; do not import a replacement
project or move DNS. Follow the [deployment and rollback checklist](web/README.md#deploy-on-vercel)
before merging the migration. It covers `web` as Root Directory, Next.js build settings,
environment variables, and a Preview deployment in that same project.

Project settings affect subsequent deployments, not just this PR. A successful preview in another
Vercel project does not validate the production project's configuration.

See [`web/README.md`](web/README.md) for application and environment details. Local development
requires Node.js 24.19.0 or newer within major 24; `web/.nvmrc` selects the local version.

## Editor tooling

VS Code runs ESLint from `web/`. The root Prettier and Markdownlint settings are retained for the
recommended editor extensions; there is no npm formatting script or lint-staged/Commitlint hook.

## Repository structure

```text
├── web/                    # Next.js website
├── cloudflare/schedule-stats/  # Optional schedule statistics Worker
└── docs/                   # Project documentation
```
