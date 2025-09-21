# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains all React code: use `components/shared` for reusable widgets, `components/pages` for page-specific shells, and `pages/` for routed entries.
- Gatsby build hooks live in `gatsby/` (`create-pages.js`, `create-schema-customization.js`, etc.); treat this folder as the boundary for data loading and node APIs.
- Content-driven sections belong in `content/` (MDX) and long-lived assets in `static/`; never edit `public/` because it is generated output.

## Build, Test, and Development Commands
- `npm run start` launches `gatsby develop` with hot reload; pair it with `npm run clean` if cached queries misbehave.
- `npm run build` produces the production bundle, and `npm run serve` previews that bundle locally.
- `npm run lint` runs ESLint + Markdownlint, `npm run lint:fix` applies safe fixes, and `npm run format` enforces Prettier across the tree.

## Coding Style & Naming Conventions
- Follow the Airbnb React rule-set with Prettier formatting (2 spaces, 100-char line width, required semicolons, single quotes).
- Export React components as arrow functions and keep prop order stable; imports must honor the enforced group ordering (`builtin`→`external`→`internal`).
- Name files and folders in `kebab-case`; colocate styles/assets with their owning component to keep module boundaries clear.

## Testing Guidelines
- There is no bundled test runner yet; prioritize adding Jest + React Testing Library when introducing complex UI flows and wire it via an `npm test` script.
- Place component tests under `src/**/__tests__/` and prefer accessibility-driven selectors; mock network work through Axios instances, not global fetch.
- Every PR must, at minimum, keep `npm run lint` and `npm run build` green until dedicated coverage thresholds are defined.

## Commit & Pull Request Guidelines
- Commits must follow Conventional Commit syntax (e.g., `feat: add hero carousel`); hook consistency is enforced by Commitlint.
- Open PRs with a concise summary, linked issue, and before/after screenshots for visible UI changes; document any feature flags or env toggles.
- Confirm that `package-lock.json` remains in sync and note follow-up tasks or TODOs directly in the PR description.

## Security & Configuration Tips
- Copy `.env.example` to `.env` and prefix any client-exposed variable with `GATSBY_`; never check real secrets into source control.
- Review third-party additions for license compatibility and keep dependencies updated; log ADR-worthy decisions in `DEPENDENCY_UPDATES.md` or a new entry in `/docs` when added.
