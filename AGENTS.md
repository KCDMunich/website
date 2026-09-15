# Repository Guidelines

## Project Structure & Module Organization

- `web/` contains the Next.js application: use `web/components` for UI, `web/app` for routes, and `web/lib` for server-side data and configuration.
- Content-driven sections belong in `web/content/`; static assets belong in `web/public/`.
- `cloudflare/schedule-stats/` contains the optional Cloudflare Worker for schedule statistics.

## Build, Test, and Development Commands

- `npm run dev --prefix web` launches the Next.js development server.
- `npm run build --prefix web` produces the production bundle.
- `npm run lint --prefix web` runs ESLint and `npm test --prefix web` runs the Vitest suite.

## Coding Style & Naming Conventions

- Follow the formatting and linting rules configured in `web/`; preserve the existing TypeScript and React patterns.
- Name files and folders in `kebab-case`; colocate styles/assets with their owning component to keep module boundaries clear.

## Testing Guidelines

- Place tests alongside the relevant `web/` modules and prefer accessibility-driven selectors.
- Every PR must, at minimum, keep `npm run lint --prefix web`, `npm test --prefix web`, and `npm run build --prefix web` green.

## Commit & Pull Request Guidelines

- Commits must follow Conventional Commit syntax (e.g., `feat: add hero carousel`); hook consistency is enforced by Commitlint.
- Open PRs with a concise summary, linked issue, and before/after screenshots for visible UI changes; document any feature flags or env toggles.
- Confirm that `web/package-lock.json` remains in sync and note follow-up tasks or TODOs directly in the PR description.

## Security & Configuration Tips

- Copy `web/.env.example` to `web/.env.local`; never check real secrets into source control.
- Review third-party additions for license compatibility and keep dependencies updated; log ADR-worthy decisions in `DEPENDENCY_UPDATES.md` or a new entry in `/docs` when added.
