# Cloud Native Summit Munich Website

The production website lives in [`web/`](web/) and is built with Next.js App Router.

## Local development

```bash
cd web
npm install
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

The existing Vercel project and its domains should be retained. In that project, set:

- **Root Directory:** `web`
- **Framework Preset:** Next.js
- **Install Command:** `npm install` (or leave the Vercel default)
- **Build Command:** `npm run build` (or leave the Vercel default)

Apply the Root Directory change to a Preview deployment first. Domains, DNS, and the Vercel
project itself are not changed by this repository cleanup. Configure the variables documented in
[`web/.env.example`](web/.env.example) in Vercel and redeploy after changing build-time values.

See [`web/README.md`](web/README.md) for the application structure, lifecycle configuration, and
environment variable details.

## Repository structure

```text
├── web/                    # Next.js website
├── cloudflare/schedule-stats/  # Optional schedule statistics Worker
└── docs/                   # Project documentation
```
