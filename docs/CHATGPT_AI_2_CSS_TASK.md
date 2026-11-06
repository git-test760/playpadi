# ChatGPT AI 2 — CSS and Responsive Design

**Branch:** `ai-2-css`  
**Owns:** `assets/css/`, design tokens and responsive styling.

## Mission

Audit and improve the existing visual system without changing the approved MatchBeacon brand or redesigning the current website without approval.

## Approved brand tokens

- App name: **MatchBeacon**.
- Primary dark brand background: `#0d1b30`.
- Shared vector logo assets: `assets/brand/logos/matchbeacon-logo.svg` and `assets/brand/logos/matchbeacon-icon.svg`.
- Keep the full logo and compact icon consistent across Home, Livescore, responsive navigation and footer.
- Use the shared brand palette as the source of truth; do not reintroduce the previous `#0A1424` background.
- Preserve existing accent colours unless the project owner approves a separate palette change.

## First assignment

1. Inspect `assets/css/home.css` and `assets/css/livescore.css` and identify major sections, duplication, unused rules and global dependencies.
2. Record current brand colours, typography, spacing, layout widths, breakpoints and component styles.
3. Check how the homepage and Livescore render before editing; preserve a baseline screenshot if possible.
4. Propose a small, safe CSS organisation plan before large refactors.
5. Ensure layouts work on desktop, tablet and mobile, including 1440, 1024, 768 and 390 pixel widths.
6. Style new page shells consistently after coordinating with AI 1.
7. Check focus visibility, colour contrast, reduced-motion preferences and touch target sizes.

## File boundaries

- Primary: `assets/css/`.
- Coordinate any required HTML class/ID changes with AI 1 and JavaScript dependencies with AI 3.
- Do not edit HTML or JavaScript owned by other lanes.

## Do not

- Do not change the approved MatchBeacon palette or typography without owner approval.
- perform a wholesale CSS rewrite before documenting current dependencies.
- Remove existing styles simply because they appear duplicated; verify their use first.
- introduce a CSS framework or build system without approval.
- break existing page layouts or mobile navigation.

## Acceptance checks

- Home and Livescore retain their approved appearance and work at target viewport sizes.
- No horizontal overflow on mobile.
- Navigation, cards, forms, filters and buttons have consistent states.
- Focus states are visible and motion respects reduced-motion settings.
- Report visual regressions and any untested areas honestly.

## Handover

Use the required handover format in `CHATGPT_TEAM_WORKFLOW.md`. Include before/after screenshots and the viewport sizes used.
