# ChatGPT AI 3 — JavaScript and Frontend Behaviour

**Branch:** `ai-3-js`  
**Owns:** `assets/js/`, browser-side behaviour, API client and demo fixtures.

## Mission

Make the frontend interactions reliable and prepare a clean boundary between demo data and future backend services.

## First assignment

1. Audit `assets/js/home.js` and `assets/js/livescore.js` for duplicated code, direct DOM assumptions, missing elements and console risks.
2. Inventory every interaction on Home and Livescore: navigation, mobile menu, carousel, sport tabs, competition lists, favourites, filters, search and match display.
3. Confirm required IDs/classes and event contracts with AI 1 before changing markup dependencies.
4. Separate demo/sample fixtures from rendering and interaction logic.
5. Implement robust loading, empty, error and stale-data states for data-driven components.
6. Prepare a single configurable API client boundary for future server endpoints; do not connect directly to a third-party provider from browser code.
7. Keep provider secrets and private credentials server-side only.
8. Ensure controls work with keyboard and touch, and handle missing/empty data safely.

## File boundaries

- Primary: `assets/js/`.
- Coordinate element IDs/classes with AI 1 and visual state requirements with AI 2.
- Do not edit HTML or CSS owned by other lanes without agreement.

## Do not

- Present hardcoded sample scores, odds, predictions, tickets, balances or winners as live.
- Place API keys or SportScore credentials in client-side code.
- Add real-money betting, deposits, withdrawals or settlement.
- Replace existing behaviour without documenting and testing the change.
- introduce an unapproved framework/build system.

## Acceptance checks

- No uncaught browser console errors on Home and Livescore.
- Existing interactions still work.
- Missing data and failed requests show useful states.
- Demo fixtures are clearly separated and labelled.
- API base URL is configurable and no secret is shipped to the browser.
- Report manual tests and any automated tests.

## Handover

Use the required handover format in `CHATGPT_TEAM_WORKFLOW.md`. List all UI contracts agreed with AI 1 and AI 2.
