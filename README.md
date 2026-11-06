# MatchBeacon — Sports Platform

MatchBeacon is a sports platform frontend for football, basketball and tennis, with planned modules for Livescore, Predictions, SureBet, SportNews, WHOT, Loyalty and user accounts.

**Brand name:** MatchBeacon  
**Primary dark brand colour:** `#0d1b30`  
**Product principle:** Deploy the frontend first while backend services are developed and connected in parallel.

## Current frontend

- `index.html` — homepage
- `pages/livescore.html` — Livescore page
- `assets/css/` — page stylesheets
- `assets/js/` — browser-side behaviour and demo fixtures
- `assets/brand/` — MatchBeacon vector logo assets and colour palette
- `docs/` — product, team and development guidance

HTML, CSS and JavaScript are kept separate. Preserve this separation when extending the frontend.

## Run locally

Open `index.html` in a browser, or open the repository folder in VS Code and use the Live Server extension.

## Data and release boundaries

The current frontend contains sample/demo content. Scores, fixtures, odds, predictions, tickets, balances and winners must not be represented as verified live information until connected to approved services.

Release 1 is non-cash:
- No deposits or withdrawals.
- No cash wallet or real-money bet placement.
- No odds acceptance or settlement.
- Reward coins are not cash and are not withdrawable.

SportScore remains subject to confirmation of access, attribution, commercial display, caching, storage and other usage terms before production integration.

## Deployment

The frontend is deployed through Vercel at https://playpadi.vercel.app. Use preview deployments for review and merge approved changes through pull requests. The project owner approves merges to `main` and production releases.

## Repository note

The GitHub repository slug and existing file paths may continue to contain the former project name for compatibility. This does not change the user-facing app name: **MatchBeacon**.
