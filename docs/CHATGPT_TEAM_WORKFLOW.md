# MatchBeacon — ChatGPT Team Workflow

**Version:** 1.0  
**Status:** Proposed working procedure  
**Repository:** https://github.com/git-test760/playpadi

## 1. Current baseline

- `main` is the approved baseline.
- The current frontend contains `index.html`, `pages/livescore.html`, separate CSS and JavaScript files, brand assets and project documentation.
- Existing pages contain static/sample content. Treat scores, odds, predictions, tickets, balances and winners as demo content unless verified through an approved service.
- The four work branches currently match `main`; no lane has independent commits yet.
- Do not replace the existing project structure with the target monorepo layout without an inspected migration plan and owner approval.

## 2. Approved brand

- App name: **MatchBeacon** (exact spelling and capitalization).
- Primary dark brand colour: `#0d1b30`.
- Preserve the existing accent palette unless the project owner approves a change.
- Do not rename repository paths, domains, email addresses or third-party identifiers as part of a visual rebrand without separate approval.

## 3. Four work lanes

| Lane | Branch | Responsibility | Main file boundary |
|---|---|---|---|
| AI 1 | `ai-1-html` | HTML, page structure, accessibility semantics | `index.html`, `pages/`, approved shared markup |
| AI 2 | `ai-2-css` | Visual system, styling, responsive behaviour | `assets/css/` |
| AI 3 | `ai-3-js` | Browser interactions, state, API-ready client | `assets/js/` |
| AI 4 | `ai-4-integration` | Integration, backend foundation, contracts, CI, QA and deployment | `docs/`, `.github/`, future API/contract/database areas |

The branch is the work lane, not an automatic connection between a ChatGPT conversation and GitHub. Each AI conversation must be explicitly given its branch, task brief and repository access method.

## 4. Work rules

1. Before editing, read this workflow, `PLAYPADI_AI_TEAM.md`, `PLAYPADI_DEVELOPMENT_CONTRACT.md` and the relevant product specification.
2. Fetch the latest `main` and the assigned branch before starting. Do not overwrite newer work.
3. Work only within the assigned file boundary. Coordinate before changing shared files.
4. Do not rename, move, delete or replace existing pages/assets as a shortcut.
5. Keep HTML, CSS and JavaScript separated.
6. Preserve the approved brand, current useful content and existing investor-facing experience.
7. Clearly label demo/sample data. Do not imply sample information is live.
8. Do not put API keys, provider secrets, database credentials or private tokens in browser code.
9. Do not implement Release 2 money movement or betting.
10. Submit changes as a pull request. Do not merge to `main` without project-owner approval.

## 5. Parallel work and integration

- AI 1 can build page structure while AI 2 audits/styles existing and new pages.
- AI 3 can extract and improve browser behaviour after agreeing element IDs/classes and markup contracts with AI 1.
- AI 4 owns integration coordination, API contract review, tests, CI and backend foundation.
- Avoid simultaneous edits to the same files. Agree interfaces first; use small pull requests.
- Integrate in small steps and test the preview after each merge.

## 6. Definition of done

A task is ready for review when it:
- Matches the approved product scope and assigned brief.
- Preserves unrelated existing behaviour and design.
- Works at 1440, 1024, 768 and 390 pixel viewport widths where relevant.
- Includes loading, empty, error and stale states for data-driven UI where relevant.
- Passes relevant checks and has manual test instructions.
- Includes screenshots for visual changes.
- Lists known issues and unfinished work honestly.

## 7. Required handover

```text
TASK:
OWNER / AI LANE:
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

## 8. Release boundary

Release 1 is non-cash. No deposits, withdrawals, cash wallet, bet placement, odds acceptance or settlement. Reward coins are not cash and are not withdrawable. Release 2 requires a separate approved plan and legal, licensing, payment, data-rights and compliance gates.
