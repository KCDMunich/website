# Dependency security updates

## 2026-11-10

The dependency audit of main found vulnerable production and development packages.
The package counts include transitive effects and do not establish that every advisory
is exploitable in this application.

- Upgrade Next.js and its ESLint configuration together from 16.3.2 to 16.4.6, including
  the image optimization and cache security fixes. Resolve sharp to at least 0.35.5
  for the upstream image decoder fixes.
- Upgrade Vitest from 4.1.11 to 4.1.12 and refresh compatible vulnerable transitive
  dependencies, including Vite, source-map-js, baseline-browser-mapping, js-yaml,
  brace-expansion, browserslist, and zod.
- Require Node.js 24.22.2 or newer within major 24 in package.json, .nvmrc, and the
  setup documentation. This includes the October Node.js security release. Keep
  Vercel on the 24.x release line and confirm its actual runtime version when
  validating the preview and production deployment.

### Temporary minimatch override

The installed typescript-eslint 8.62.1 and upstream 8.72.2 both require minimatch
^10.2.2. That range cannot resolve the fix for CVE-2026-118764, which is available
in minimatch 11.0.1. Override only the minimatch dependency of
@typescript-eslint/typescript-estree to 11.0.1 instead of
downgrading eslint-config-next or changing the minimatch 3.x dependencies used by
other ESLint packages.

The parser uses minimatch's named matching function with the `dot` option; this API
is available in 11.0.1. The new version supports Node.js 24. Its BlueOak-1.0.0 license
is unchanged from the previous minimatch major; its new
@isaacs/nonrecursive-glob-match dependency uses the same permissive license.
The full ESLint run and a parser project-service integration check validate the
override. Remove it once typescript-eslint declares a compatible patched minimatch
version itself.

### Validation

Validated on macOS arm64 with Node.js 24.22.2 and npm 11.19.1:

- Fresh `npm ci --prefix web` completed without changing the lockfile.
- `npm run lint --prefix web` passed.
- `npm test --prefix web` passed: 51 tests in 5 files.
- `npm run build --prefix web` passed, including TypeScript and static generation,
  with network access for the Sessionize sitemap data.
- A parser project-service check exercised `allowDefaultProject` with minimatch
  11.0.1 and returned a TypeScript program successfully.
- `npm audit --package-lock-only --prefix web` reported no vulnerabilities,
  including development dependencies.

Follow-up: npm reports that the existing ESLint 9 release is no longer supported.
Plan migration to a supported ESLint major separately from this advisory remediation.

### References

- [Next.js 16.4.6](https://github.com/vercel/next.js/releases/tag/v16.4.6)
- [Next.js October security update](https://nextjs.org/blog/nextjs-security-update-october-14-2026)
- [Next.js November security fixes](https://github.com/vercel/next.js/releases/tag/v16.4.5)
- [Vitest mock registration fix](https://github.com/vitest-dev/vitest/security/advisories/GHSA-qxg6-89mg-rqv8)
- [minimatch CVE-2026-118764](https://github.com/advisories/GHSA-g3hv-75wg-m249)
- [Node.js October security release](https://nodejs.org/en/blog/release/v24.22.1/)
- [Node.js 24.22.2](https://nodejs.org/en/blog/release/v24.22.2)
