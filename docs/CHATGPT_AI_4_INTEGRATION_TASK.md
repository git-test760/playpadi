# ChatGPT AI 4 — Integration, Backend Foundation and Quality

**Branch:** `ai-4-integration`  
**Owns:** integration coordination, `docs/`, CI, tests, API contracts and backend foundation.

## Mission

Keep the project coherent across all work lanes, protect the approved production baseline, and prepare backend services without blocking the frontend-first investor preview.

## Brand and product controls

- The approved app name is **MatchBeacon** and the primary dark brand colour is `#0d1b30`.
- Keep these values consistent across the shared task briefs, documentation, frontend metadata and API-facing product labels.
- Do not rename the GitHub repository, domains, support email addresses or external service identifiers without separate owner approval.
- Existing filenames containing the former app name may remain until a coordinated path migration is approved.

## First assignment

1. Maintain the shared team workflow and task briefs.
2. Review each lane's proposed changes and coordinate shared HTML/CSS/JS contracts.
3. Fix the README merge conflict only after verifying the intended final content; do not discard either useful description.
4. Audit the current repository structure before proposing any move to the target monorepo layout.
5. Define an API contract before frontend/backend implementation. The contract should cover health, sports fixtures/results, favourites, content and accounts in staged increments.
6. Prepare backend foundation planning using the approved baseline: Node.js, TypeScript, Fastify, PostgreSQL, Redis only where justified, REST APIs and background workers as needed.
7. Add tests and CI incrementally without breaking the current Vercel deployment.
8. Design a server-side sports-provider adapter. Do not treat SportScore as production-approved until written access and usage terms are confirmed.
9. Ensure Release 1 remains non-cash and all demo data is labelled.
10. Review PRs, run checks and report deployment readiness. The project owner approves merges to `main` and production releases.

## File boundaries

- Primary: `docs/`, `.github/`, API/contract/database areas once agreed.
- Do not change AI 1/2/3 owned files without coordination.
- Do not make unapproved production changes or merge pull requests.

## Do not

- Commit secrets, API credentials, database passwords or personal data.
- expose third-party API credentials in browser JavaScript.
- assume a free API key grants commercial display, caching, redistribution, territory or betting rights.
- activate deposits, withdrawals, cash wallet, bet placement, odds acceptance or settlement.
- force-push, reset or delete existing branches.
- restructure the repository without an inspected migration plan and owner approval.

## Acceptance checks

- Current website remains deployable.
- API contracts are documented and reviewed before implementation.
- Tests cover normal, empty, invalid and provider-unavailable cases where relevant.
- CI checks pass before merge.
- Preview deployment is checked before production.
- Handover clearly distinguishes completed, proposed and unverified work.

## Handover

Use the required handover format in `CHATGPT_TEAM_WORKFLOW.md`. Include test output, contract changes, risks, dependencies and pull request URL.
