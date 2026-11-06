# MatchBeacon AI TEAM & RESPONSIBILITY REGISTER

**Version:** 1.0  
**Date:** 3 November 2026  
**Project principle:** Deploy the frontend first; build the backend in parallel and connect modules progressively.

## Brand direction

- App name: **MatchBeacon** (use this exact spelling and capitalization in user-facing content).
- Primary dark brand colour: `#0d1b30`.
- Preserve existing accent colours unless separately approved.
- Existing repository paths, filenames and the GitHub repository name are not automatically renamed by this app rebrand.

## 1. Product scope

MatchBeacon is a Nigerian sports platform for football, basketball and tennis.

**Tagline:** Your Game. Your People. Your Rewards.

The Release 1 product includes:
- Home page and responsive navigation
- Livescore, fixtures, results, competitions and favourites
- Predictions and SureBet editorial/content pages
- SportNews
- User accounts and profile
- Reward coins (100 coins = ₦1; reward coins are not cash and cannot be withdrawn in Release 1)
- WHOT game/tournaments, leaderboard and winners
- Loyalty
- Search and admin/content management

**Release 2 only, after legal, licensing, payment and data-rights gates:** cash wallet, deposits, withdrawals, betting, odds and settlement. Do not activate real-money functions in Release 1.

## 2. How the team is organised

HTML, CSS and JavaScript are technical workstreams. Livescore, Predictions, SureBet, SportNews, WHOT and Loyalty are product modules. Both dimensions must be covered.

Start with four AI work lanes. Add specialist AI accounts later without changing the repository rules.

| Lane | Initial owner | Main responsibility | Owns |
|---|---|---|---|
| A | AI Account 1 — Frontend structure | HTML and page structure | `apps/web/` page markup, shared page structure, navigation markup, accessibility semantics |
| B | AI Account 2 — Visual design | CSS and responsive layout | `apps/web/assets/css/`, design tokens, responsive rules, visual consistency |
| C | AI Account 3 — Frontend behaviour | JavaScript and API-ready UI | `apps/web/assets/js/`, navigation behaviour, filters, tabs, search UI, favourites UI, loading/empty/error states, API client |
| D | AI Account 4 — Integration and platform | Integration, quality, deployment and backend foundation | repository standards, CI, tests, API contract coordination, integration reviews, deployment checks; backend work is coordinated here initially |

The four lanes are not four separate copies of the project. They work in one GitHub repository, using separate branches and pull requests.

## 3. Product module ownership register

These are product responsibilities, not necessarily separate AI accounts at the beginning.

| Product module | Primary lane at start | Supporting lane(s) | Required outcome |
|---|---|---|---|
| Home page | A | B, C | Investor-ready landing page using clearly labelled demo content until APIs are connected |
| Livescore UI | A | B, C | Football, basketball and tennis; date, sport and status filters; competitions; match details; favourites |
| SportScore/provider adapter | D | C | Provider integration behind our own API; only use after access, terms, permitted display and commercial rights are confirmed |
| Predictions | A + C | B, D | Predictions page and home widgets; editor-managed content and clear timestamps/status |
| SureBet | A + C | B, D | SureBet ticket listing/detail UI; content is informational in Release 1, not a bet placement feature |
| SportNews | A + C | B, D | News listing and article pages; editor publishing workflow |
| WHOT | A + C | B, D | Tournament listing, join flow, leaderboard and results; game rules and tournament engine must follow the approved WHOT specification |
| Loyalty and winners | A + C | B, D | Loyalty page, rules, tiers/points if approved, masked public winners |
| Accounts/profile | A + C | B, D | Registration, OTP, login, session, profile and logged-in header |
| Reward coins | C + D | A, B | Ledger-backed reward balance and history; no cash withdrawal in Release 1 |
| Search/favourites | C + D | A, B | Search teams, competitions and matches; persistent favourites after backend connection |
| Admin/content management | D | A, C | Secure tools for users, content, tournaments, loyalty rules, reports and audit log |
| SEO/accessibility/performance | A + B | C, D | Metadata, sitemap, keyboard support, contrast, screen-reader labels, compressed/lazy-loaded images |
| QA/security/deployment | D | All | Automated checks, responsive browser checks, security review and production release approval |

### Important provider distinction

SportScore is a possible sports-data source, not the owner of every MatchBeacon feature. A sports-data provider may supply fixtures, scores, results and competitions, depending on its product and licence. Predictions, SureBet tickets and SportNews still need MatchBeacon content rules, editorial/admin tools and their own display logic.

Do not assume that free API access includes commercial website display, redistribution, attribution rights, caching rights or betting use. Record the provider's written permission and exact terms before production use. Betting/odds rights require separate confirmation.

## 4. How to expand beyond four AI accounts

Add new AI specialists by assigning a module and a folder boundary. Examples:
- Sports Data Specialist: provider adapter, score synchronisation and freshness monitoring.
- Predictions/SureBet Specialist: content model, admin workflow and module UI.
- WHOT Specialist: game engine, tournament lifecycle and tests.
- Loyalty Specialist: rules, points/tiers and winners.
- Backend Specialist: accounts, database, APIs and workers.
- QA Specialist: automated browser/API tests and release checks.

A new AI account must receive the current project brief, this register, the development contract and its task-specific brief. Never rely on chat memory as the only project documentation.

## 5. First four assignments

### AI 1 — HTML / page structure
1. Inspect the current frontend before editing.
2. Preserve the approved MatchBeacon look and existing content hierarchy.
3. Split the single-page markup into reusable page files/partials.
4. Build the missing page shells: Predictions, SureBet, WHOT Tournament, SportNews, Loyalty and App.
5. Use semantic HTML, accessible labels and consistent shared navigation/footer.
6. Do not invent live data or real balances. Label preview data as demo/sample.

### AI 2 — CSS / responsive design
1. Audit and extract existing styles without changing the approved brand unnecessarily.
2. Establish shared variables for the supplied brand palette and spacing.
3. Separate global, component and page styles.
4. Preserve the specified breakpoints and sticky navigation behaviour unless a tested improvement is approved.
5. Check desktop, tablet and mobile layouts.
6. Do not rewrite HTML or JavaScript owned by another lane without coordinating first.

### AI 3 — JavaScript / frontend functionality
1. Extract inline JavaScript into modules.
2. Implement navigation, tabs, date/sport/status filters, search interactions and favourites UI.
3. Create one API client module and a configuration point for the API base URL.
4. Provide loading, empty, error and stale-data states.
5. Keep demo data in clearly named fixtures/mock files, separate from production API code.
6. Do not put provider API secrets in browser JavaScript.

### AI 4 — Integration / backend foundation / quality
1. Create and maintain repository rules, branch protection guidance and CI.
2. Coordinate `packages/contract/openapi.yaml` before API implementation.
3. Prepare backend foundation in `apps/api/` using the agreed stack from the product spec (Node.js, TypeScript and Fastify; PostgreSQL; Redis where needed).
4. Coordinate provider research and verify SportScore access/terms before adapter work is treated as production-ready.
5. Review pull requests, run tests and prepare Vercel preview/production deployment.
6. Keep Release 2 money/betting functions disabled.

## 6. Priority order

1. **P0 — Frontend separation and deployment:** preserve the existing design, split HTML/CSS/JS/assets, make all navigation work, create missing page shells, responsive QA, deploy a stable investor-preview website.
2. **P1 — Backend foundation in parallel:** repository, CI, environments, database, API contract and health endpoint.
3. **P2 — Accounts and real sports data:** authentication, provider adapter, livescore API, freshness indicator and favourites.
4. **P3 — Content modules:** Predictions, SureBet, SportNews, banners and admin publishing.
5. **P4 — Coins, loyalty and WHOT:** reward ledger, tournament lifecycle, leaderboard and winners.
6. **P5 — Release 1 hardening:** security, privacy, accessibility, performance, backups and monitoring.
7. **Release 2:** separate approval after all legal, provider, payment and compliance gates.

The frontend can be deployed as an investor preview before all backend modules are complete. Every unconnected feature must be visibly marked as preview/demo and must not imply that sample scores, predictions, tickets, balances or winners are live.

## 7. Human approval

The project owner approves:
- Changes to brand, navigation, product scope or user journeys
- API contract changes that affect multiple lanes
- Merges to `main`
- Production deployment
- Any use of a provider's data in public production
- Any Release 2 money, odds or betting capability

No AI may independently enable real-money deposits, withdrawals or betting.

## 8. Definition of done

A task is complete only when:
- It matches the Product Specification and assigned brief.
- It does not break another module or responsive layout.
- It includes appropriate loading/empty/error states where data is involved.
- It has relevant tests or documented manual checks.
- It passes CI.
- It is submitted as a pull request with a clear summary and screenshots where UI changed.
- The project owner approves the merge.
