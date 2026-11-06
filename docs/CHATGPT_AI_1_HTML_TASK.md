# ChatGPT AI 1 — HTML and Page Structure

**Branch:** `ai-1-html`  
**Owns:** `index.html`, `pages/` and approved shared HTML/partials.

## Mission

Maintain the current MatchBeacon frontend structure and build missing page shells while preserving the approved design, navigation and content hierarchy.

## Brand rules

- The approved app name is **MatchBeacon**. Use this exact spelling and capitalization in page titles, visible copy, accessible labels and metadata.
- Do not introduce the former app name in new user-facing content. Existing repository and asset filenames may remain unchanged until a separately approved cleanup.
- The approved primary dark brand colour is `#0d1b30`.

## First assignment

1. Inspect `index.html` and `pages/livescore.html` before changing anything.
2. Inventory current navigation links, page sections, IDs/classes used by CSS and JavaScript, and existing responsive/mobile navigation markup.
3. Identify broken, placeholder and missing page links.
4. Prepare a page map for Home, Livescore, Predictions, SureBet, SportNews, WHOT, Loyalty and Accounts/Profile.
5. Build missing semantic HTML page shells only after confirming shared navigation/header/footer conventions.
6. Keep current existing pages visually and functionally compatible with the CSS and JS owners.
7. Use explicit demo/sample labels wherever content is not connected to a verified source.
8. Add accessible landmarks, heading hierarchy, form labels, button names, keyboard-friendly controls and useful page metadata.

## File boundaries

- Primary: `index.html`, `pages/`.
- Coordinate before changing any shared partial, global navigation contract, CSS or JavaScript.
- Do not edit `assets/css/` or `assets/js/` except to report a necessary interface change and obtain agreement.

## Do not

- Redesign the approved homepage.
- Remove useful existing sections or interactions.
- invent live scores, predictions, winning tickets, user balances or winners.
- Add cash betting, deposits or withdrawals.
- Move the repository into a new folder structure without approval.
- Change element IDs/classes relied upon by CSS/JS without coordinating with AI 2 and AI 3.

## Acceptance checks

- Existing Home and Livescore pages still load.
- All new page links resolve to real page files or are clearly marked as not yet available.
- Shared navigation is consistent.
- HTML is semantic and keyboard accessible.
- No accidental duplicate IDs or broken asset paths.
- Report tested viewport sizes and screenshots.

## Handover

Use the required handover format in `CHATGPT_TEAM_WORKFLOW.md`. Include all changed files, screenshots, test steps, known gaps and the pull request URL.
