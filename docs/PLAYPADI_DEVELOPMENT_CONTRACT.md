# MatchBeacon DEVELOPMENT CONTRACT

**Version:** 1.0  
**Date:** 3 November 2026  
**Applies to:** Every AI account, developer and contributor working on MatchBeacon.

## 1. Single source of truth

- GitHub is the source of truth for code.
- The approved Product Specification, this contract and the AI Responsibility Register are the source of truth for scope and working rules.
- Do not treat an AI chat, local copy or private branch as the latest approved project.
- Before starting a task, fetch/pull the latest approved branch and read the relevant project documents.

## 2. Repository layout

Use this target structure. If the existing project has a different structure, inspect it first and propose a migration rather than blindly overwriting files.

```text
matchbeacon/
├── apps/
│   ├── web/
│   │   ├── pages/
│   │   ├── partials/
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   ├── js/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   └── index.html
│   └── api/
│       ├── src/
│       └── tests/
├── packages/
│   └── contract/
│       └── openapi.yaml
├── db/
│   └── migrations/
├── docs/
│   ├── PRODUCT_SPEC.md
│   ├── AI_TEAM.md
│   ├── DEVELOPMENT_CONTRACT.md
│   └── decisions/
├── tests/
└── .github/
    └── workflows/
```

The web app is the first deployment priority. The API and database are built alongside it in stages. Keep the website deployable even while API work is incomplete.

## 3. Branch and pull request workflow

- `main` = approved production code only.
- `integration` = shared integration branch, if the team needs it.
- Each task gets its own branch, for example `ai-1/home-page-html`, `ai-2/responsive-css`, `ai-3/livescore-ui-js`, `ai-4/api-foundation`.
- One AI must not directly overwrite another AI's active work.
- Submit changes through a pull request.
- A pull request must state: task, files changed, behaviour changed, tests/checks run, known limitations and screenshots for UI changes.
- Resolve conflicts deliberately; do not accept all incoming changes automatically.
- The project owner approves merges to `main`.
- Connect Vercel to the GitHub repository. Use preview deployments for pull requests and production deployment from approved `main`.

## 4. File ownership and coordination

Follow the AI Responsibility Register for folder ownership.

- HTML owner coordinates shared markup and page structure.
- CSS owner coordinates styles and design tokens.
- JavaScript owner coordinates browser behaviour and API client.
- Integration owner coordinates contracts, tests, CI, backend foundation and deployment.
- Product specialists may be added later with explicit module and folder ownership.
- Shared files such as navigation, global styles, API contracts and package configuration require coordination before editing.
- Do not rename or move files owned by another lane without approval.

## 5. API-first agreement

- All frontend/backend communication uses documented JSON endpoints.
- `packages/contract/openapi.yaml` is the agreed API contract.
- Propose and review endpoint/schema changes in the contract before implementing both client and server.
- API base URL must come from environment/configuration, not be hardcoded throughout the code.
- Use a consistent error response shape:
  `{ "error": { "code": "ERROR_CODE", "message": "Readable message" } }`
- Validate request and response data.
- The browser must never contain provider secrets, database credentials or private API keys.
- Provider-specific payloads must be mapped into MatchBeacon's own stable data model.

## 6. Frontend rules

- Preserve the approved brand, page hierarchy and existing useful UI.
- Split HTML, CSS and JavaScript into maintainable files.
- Reuse shared navigation, header and footer where practical.
- Every data-driven component must support loading, empty, error and stale-data states.
- Keep demo/sample data separate from live API code and label it clearly.
- Never present sample scores, predictions, SureBet tickets, coin balances or winners as verified live data.
- Test responsive layouts at 1440, 1024, 768 and 390 pixels.
- Include page titles, descriptions, social metadata, sitemap, keyboard access, visible focus, contrast and screen-reader labels.

## 7. Sports provider rules

- Provider integration is server-side, through a dedicated adapter.
- Do not assume SportScore is approved until the actual provider/product, credentials, rate limits, attribution requirements and written usage terms have been checked.
- Confirm whether the permitted use includes public display, commercial use, caching, storage, redistribution and the intended territory.
- Confirm betting/odds rights separately before any Release 2 use.
- Store provider secrets only in server-side environment variables.
- Record data freshness and show a clear last-updated/stale indicator.
- Keep provider mapping separate from frontend components so another provider can be substituted.

## 8. Release boundaries

### Release 1 — no real-money movement
Permitted scope: accounts, live scores, fixtures/results, favourites, content, predictions, SureBet informational tickets, reward coins, free WHOT tournaments, loyalty, winners, search and admin.

- 100 reward coins = ₦1 display equivalent.
- Reward coins are not cash and cannot be withdrawn in Release 1.
- Coin balance changes must be ledger-based, transactional and idempotent.
- Balances must never become negative.
- Do not build or activate deposits, withdrawals, cash wallet, bet placement, odds acceptance or settlement in Release 1.

### Release 2 — gated
Cash wallet, deposits, withdrawals, betting, odds and settlement require a separate approved plan and clearance of licensing, payment-provider acceptance, data rights, compliance and hosting terms. This document does not provide legal advice.

## 9. Backend and data rules

The Product Specification recommends Node.js + TypeScript + Fastify, PostgreSQL, Redis where needed, background workers and REST APIs. Use these as the baseline unless a documented decision changes them.

- Store timestamps consistently in UTC; format for the user's locale in the UI.
- Use database migrations; never make undocumented production schema edits.
- Protect authentication endpoints with validation and rate limits.
- Hash passwords using a suitable modern password-hashing algorithm.
- Protect admin routes with role-based access and audit important actions.
- Keep personal data minimal and access-controlled.
- Do not log passwords, OTPs, tokens or payment secrets.

## 10. Testing and quality gates

Before a pull request is ready:
- Run formatting/linting and relevant unit tests.
- Run API contract/schema tests for endpoint changes.
- Run provider adapter tests using recorded fixtures, including provider-unavailable cases.
- Run browser checks for changed pages and responsive breakpoints.
- Check console errors and broken links.
- Confirm no secrets or personal data are committed.
- CI must pass before merge.

Before production:
- Review environment variables and hosting terms.
- Confirm data provider permissions and attribution.
- Confirm privacy notice, responsible-gambling/18+ messaging where applicable.
- Check performance, backups, monitoring and rollback plan.
- Project owner approves release.

## 11. AI task handover format

Every AI handover must include:

```text
TASK:
OWNER:
BRANCH:
FILES CREATED/CHANGED:
WHAT WAS COMPLETED:
WHAT WAS NOT COMPLETED:
HOW TO TEST:
TEST RESULTS:
KNOWN ISSUES:
DEPENDENCIES / NEXT OWNER:
PULL REQUEST:
```

Do not say a task is complete if it has not been run or tested. Distinguish verified behaviour from assumptions.

## 12. Change control

If a requirement is unclear or conflicts with the Product Specification:
1. Stop only the affected work.
2. State the exact conflict and affected files/modules.
3. Offer the smallest safe options.
4. Wait for the project owner's decision before changing scope.

Do not silently remove features, redesign approved screens, change provider, alter coin rules or introduce Release 2 functionality.
