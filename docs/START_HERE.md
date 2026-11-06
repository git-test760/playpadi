# MatchBeacon — START HERE

This pack contains the initial team structure and shared rules for the MatchBeacon build.

## Files
- `MatchBeacon_AI_TEAM.md` — responsibilities for the first four AI accounts and expandable specialist roles.
- `MatchBeacon_DEVELOPMENT_CONTRACT.md` — shared GitHub, branch, code, API, testing and release rules.

## Immediate setup order
1. Create one private GitHub repository named `matchbeacon`.
2. Upload the current frontend source and the approved product documents.
3. Add these two Markdown files under `docs/`.
4. Connect the repository to Vercel. Deploy the current frontend as a preview first.
5. Create the four AI task branches. Do not give every AI a separate repository.
6. Start with frontend separation and deployment. Backend foundation proceeds in parallel.
7. Merge through pull requests only, after checks and owner approval.

## Before assigning the accounts
Confirm the exact AI platform/account for each lane and whether it can access GitHub directly. If an account cannot write to GitHub, have it return a patch or complete changed files for review; do not let it work from an outdated project copy.

## Non-negotiable
The investor preview must clearly identify demo/sample data. SportScore must not be treated as an approved production data source until its access and usage terms are confirmed. Release 1 has no real-money deposits, withdrawals or betting.
