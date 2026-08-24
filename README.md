# OutLate — GitHub-ready beta

Files you need in the repository root:

- `index.html`
- `_worker.js`
- `README.md`

## Why Cloudflare Pages rather than GitHub Pages?
`index.html` is static, but the setlist.fm API key must remain secret and setlist.fm does not permit frontend/browser API calls. `_worker.js` is the tiny server-side layer that safely calls setlist.fm.

GitHub remains the source of truth. Cloudflare Pages connects to the GitHub repo and automatically deploys each change.

## Cloudflare setup
- Production branch: `main`
- Build command: `exit 0`
- Build output directory: `.`
- Secret name: `SETLIST_FM_API_KEY`

Do not commit the API key to GitHub.

## Current live features
- setlist.fm artist lookup
- up to 20 recent setlists requested
- up to 12 complete setlists analysed in-browser
- encore frequency
- typical encore song count
- estimated encore time (OutLate estimate, not setlist.fm runtime)
- common final main-set song before the encore
- spoiler-aware exit cue
- stay-to-end / skip-encore / leave-early comparisons

## Still manual
- Expected finish
- Last useful departure
- Journey time after boarding

Before monetising the product, contact setlist.fm about commercial API permission.
