# Phase 5 — Build and test (Nuxt)

Read: `migrate-to-cloudcannon/build.md`, `nuxt/build.md`, `handoff.md`, `cloudcannon-configuration/build-commands.md`, `nuxt/configuration.md` § Build settings.

## Checklist

- [x] Clean build: `.nuxt/`, `.output/`, `dist` deleted (no `node_modules/.cache/nuxt/`); `npm ci` then `npm run generate` from `initial-site-settings.json`, on Node 18.20.3 / npm 10.7.0. No environment variables. Exit 0.
- [x] Frozen install: `node_modules/` deleted, `npm ci` on Node 18 exit 0. One `EBADENGINE` warning (Open question 1).
- [x] No render errors beyond the baseline's: `/404` (footer link, audit Q5) and its four content queries. Node 24's two deprecation lines are gone on Node 18; every other `WARN` is the baseline's.
- [x] Every page in the output: 19 `index.html`, the baseline list; each has a `_payload.json`.
- [x] Collection URLs: all 8 `content/*.md` (`/[slug]/`) and 7 `content/blog/*.md` (`/blog/[slug]/`, index → `/blog/`) match a built `index.html`.
- [x] Schema keys: the only `_schema` is `blog_index`, a key under `blog.schemas`; `add_options` use `default`.
- [x] Schema round-trip: only `content/index.md` lacks keys (`permalink`, `seo.*`). Filled with `.cloudcannon/schemas/page.md` defaults and built: home `<head>` identical, snapshot identical (the template reads every `seo` key with `||` and `if (seo.no_index)`). Restored byte-for-byte.
- [x] Regions: `_dynamic` 19 (one root per page), `array` 115, `array-item` 488, `image` 71, `text` 223. Home 93, About 102, a post 36; each of the 6 posts has the `@file[/content/blog/index.md]` labels.
- [x] Images: every `<img src>` resolves under `.output/public` (no remote images).
- [x] Config validates: `npx @cloudcannon/cli validate` exit 0, every file valid (run on Node 24: the CLI needs `util.styleText`, missing in Node 18).
- [x] Search index: none on the site.
- [x] Hydration: headless Chrome, build served locally, console captured on `/`, `/about/`, `/pricing/`, `/blog/`, `/blog/email-delivery-tips/`, `/tags/email/`, `/privacy/`. No Vue hydration message. Only `/privacy/` logs `Uncaught TypeError … 'classList'` from `bootstrap.bundle.min.js`; the baseline build logs the same line.
- [ ] Client navigation (link from home to a content page, in a browser): not run; each page's `_payload.json` exists.
- [x] Hook files gone: `.cloudcannon/prebuild` and `preinstall` deleted (`postbuild` went in Phase 3).
- [x] Hand off: § Handoff.

## What changed

- `package.json`: `generate:theme` (`node scripts/generate-theme.js`) runs first in `generate`, `dev` and `build`; `prebuild:fetch-theme-color` removed; `packageManager: npm@10.7.0`.
- `scripts/generate-theme.js` (new, replaces `public/js/fetch-theme-color.js`): writes the four colours set in `data/theme.json` to `assets/style/_theme.scss`, which is gitignored. Synchronous, so a bad `theme.json` fails the build.
- `assets/style/_variables.scss`: `@import 'theme';` before the colour variables; the four theme colours keep their values as `!default`.
- `.nvmrc` (new): `18`. `initial-site-settings.json`: `node_version: "file"`.
- `.gitignore`: `assets/style/_theme.scss`.
- Deleted: `.cloudcannon/prebuild`, `.cloudcannon/preinstall`, `public/js/fetch-theme-color.js`.
- `README.md`: Setup names Node 18 / `nvm use`, `npm ci`, and the theme step.

## Baseline comparison

Against `temp/baseline-run1/` and `temp/snap1.json`:

- Text / `<img>` / inline-style snapshot: only `/pricing/` differs (Phase 3: `**USD**` → bold). Two clean builds in this phase produce identical snapshots.
- Compiled CSS (`entry.*.css`, rules sorted): exactly Phase 4's three added rules; nothing else, so the theme colours compile the same. `ProseCode` CSS byte-identical.
- Output files: `js/fetch-theme-color.js` gone (it was a build script shipped as a public file); `_nuxt/` gains `Blocks`, `Blocks.vue`, `componentMap`, `RawTemplate`, `registerComponents` and loses `test` (Phases 3–4).
- Theme step works: a `_theme.scss` with only `$color-primary: #123456` compiled `main.scss` with that colour in 53 places and the other three at their defaults.

## Decisions and why

- **Theme colours go to a gitignored partial**, not back into `_variables.scss`. build-commands.md bars a pre-build step from rewriting a tracked file: after an editor changes Data → Theme, every local build would otherwise leave a modified `_variables.scss` that nobody edited. Defaults stay in the tracked file (`!default`), so a colour removed from `theme.json` still compiles.
- **The theme step runs in `dev` and `build` too**, because `_variables.scss` imports the generated partial and a fresh clone has none.
- **Script moved out of `public/`**: it isn't a site asset, and in `public/` it shipped in every build.
- **Node 18 through `.nvmrc` + `node_version: "file"`** (user's answer), the build-commands.md row for a site with `.nvmrc`; local `nvm use` and CloudCannon read the same file.
- **npm pinned to 10.7.0**, the version tested here (Node 18.20.3's bundled npm). The lockfile is v3 and installs cleanly with it.
- **`temp/` removed entirely**: the migration created it (Phase 1). `temp` was already in `.gitignore` in the original repo; the entry stays.
- **`.cloudcannon/migration/generate.log` kept** as the audit's baseline record; `*.log` already ignores it.

## Open questions

1. **Node 18 vs `@cloudcannon/editable-regions`.** The package declares `engines.node >=20.19.0`; `npm ci` on 18 only warns, and the build and pages work (the package runs in the browser; the build just bundles it). Node 18 is end-of-life, and the CloudCannon CLI already needs a newer Node. Default: Node 18 as decided. Recommendation: `.nvmrc` → `22` (CloudCannon's default); the audit's baseline built fine on Node 24 despite `@nuxt/kit`/`@nuxt/schema` 3.5 declaring `≤19`.
2. **npm version on CloudCannon.** Default: `packageManager: npm@10.7.0`. If CloudCannon's Node 18 image ships a different npm 10, the build log shows it (Handoff step 1); `npm ci` with any npm 10 reads lockfile v3.
3. **Colour input format.** Default: the `color` inputs save hex, which Sass `mix()` accepts. If an editor's saved value isn't hex (for example `rgba(...)`), the theme step writes it as is and `mix()` still accepts it; a named or malformed value fails the build with a Sass error.
4. **Client navigation** not run in a browser. Default: unverified; it uses the payloads Nuxt writes per page, all present.
5. Carried over: canonical trailing slash (content.md Q1), contact form Inbox (content.md Q3, after the site exists on CloudCannon), jQuery bindings after a re-render (visual-editing.md Q2), footer `/404` link (audit Q5).

## Handoff

Checks run here: clean `npm ci` + `npm run generate` on Node 18 (exit 0, 19 pages), baseline snapshot and CSS diff (only explained differences), `cloudcannon validate` (pass), collection URLs, schema keys and round-trip, region counts, images, console on 7 pages.

Local commands (Node 18: `nvm use`):

- Dev: `npm ci`, then `npm run dev` (http://localhost:3000)
- Production build: `npm run generate` (output `.output/public`)
- Preview the build: `npx serve .output/public`

CloudCannon checks, after the site is created from this repo (one answer each):

1. Open the log of the site's first build: paste the line that shows the Node version.
2. Did that build succeed? (yes/no)
3. Data collection → open `theme.json`, change Primary Color to `#1f6feb`, save, wait for the build: on the hosted site, is the home page hero's main button (red today) now blue? (yes/no — set it back afterwards)
4. Blog collection → open "Email delivery tips" in the Visual Editor, click "Written by:" on the page, type an extra word, save: does the commit change `content/blog/index.md` (and not the post)? (yes/no)
5. Pages collection → open About in the Visual Editor: do the two hero images sit where they do on the hosted page, not stacked in the flow? (yes/no)
6. Pages collection → open Home: click the hero heading and type — does the text change on the page? (yes/no)
7. Same page: click the hero image — does the image picker open? (yes/no)
8. Same page: in the sidebar's Page sections list, can you drag a section to a new position and see the page reorder? (yes/no)
9. On any page, edit a navigation link's text and save: does the commit change only `data/nav.json`? (yes/no)

Send back: the answers by number, and for any "no", the page URL and what you clicked.
