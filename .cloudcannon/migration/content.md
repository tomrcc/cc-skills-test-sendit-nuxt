# Phase 3 — Content (Nuxt)

Site: `sendit-nuxt`. Nuxt 3.5.3, Nuxt Content 2.6.0 (`documentDriven: true`), staying on Content v2. Bookshop steps 3 (rename, resolve, dispatch) and 4 (remove Bookshop) done here; connector and `data-cms-bind` stay for Phase 4.

## Checklist

From `migrate-to-cloudcannon/content.md` (review checklist and addendum), `nuxt/content.md`, `nuxt/page-building.md`, `cloudcannon-bookshop/nuxt/migrating-to-editable-regions.md`, and the Phase 3 handoff in `configuration.md`.

Parity and build

- [x] Parity baseline: `temp/baseline-run1/` (Phase 1). Compared on visible text, link `href`s, image file names, `alt`, `<title>`/meta description, plus body markup per page and compiled CSS (§ Baseline comparison)
- [x] Build early, build often: clean build after step 3, after step 4, and after the content changes

Bookshop

- [x] Step 3 — `_bookshop_name` → `_type` in every content file (no schema or structure value had it); `grep -rn _bookshop_name` outside `.cloudcannon/migration/` → no matches
- [x] Step 3 — component map `cloudcannon/componentMap.ts` (`blockMap` with the 19 full names, `componentMap` spreads it); each component imported directly
- [x] Step 3 — `components/Blocks.vue` renders from `blockMap` and throws on an unknown `_type`; the name transform in `pages/[...slug].vue` deleted
- [x] Step 3 — components take top-level props (19 blocks + `general/error`); the loop still passes `dataBinding`
- [x] Step 4 — `.cloudcannon/postbuild` deleted (all three lines served `@bookshop/generate`); `component-library/` deleted; no `@bookshop/*` packages, plugins, scripts, aliases or `.gitignore` entries existed; README's Bookshop lines rewritten
- [x] Step 4 — rebuilt and diffed: identical to the step 3 build

Front matter consistency

- [x] Required fields present in every file (§ Field completeness)
- [x] Defaults written into files: blog labels and login/sign-up labels now in content; `pagination.size: 9` already in the file
- [x] Every key in the schema: `content/blog/index.md`'s new keys are in `.cloudcannon/schemas/blog-index.md`; pages and posts gained no top-level keys
- [x] `draft`: none used
- [x] Dates: all 6 posts use `YYYY-MM-DDT00:00:00Z`
- [x] Image paths: every content and data image is a `/images/…` path under `public/`

Field naming

- [x] Field names match what components read (pricing icon now reads `active_feature`)
- [x] No reserved keys used as fields
- [x] Consistent names: `image`/`image_alt` everywhere

Other review items

- [x] Mixed-type fields: none
- [x] Content references: blog `author` is free text (user's answer)
- [x] Markdown bodies: plain markdown, no components, shortcodes or inline HTML; no plugin output to protect
- [x] Styled HTML in front matter: privacy terms (`<p>`, `<ul>`) on an `html` input; FAQ answer `<strong>USD</strong>` on an `html` input with bold
- [x] One field per visual slot: no `a || b` slots in block components (SEO fallbacks to `data/site.json` are documented defaults, not two slots)
- [x] Content in `.vue` files moved: login/sign-up labels into their blocks, "Recent Blog"/"Written by:" into the blog index
- [x] API-driven content: none
- [x] Settings in code → data files: nav/footer already data files; the footer's "Copyright <year>" prefix stays code (computed)
- [x] Data collections: `disable_url`; valid JSON; `tags.json` a top-level string array; link lists stay arrays
- [x] Images from `assets/`: only decorative images (shapes, icons, patterns) — stay imports, editors don't change them
- [x] MDC: none

Addendum

- [x] Field completeness (CRITICAL): 0 gaps (§ Field completeness)
- [x] Fields the original page didn't pass hold the resolved default: the new label fields hold the strings the templates hardcoded
- [x] No block-level HTML in front matter strings outside `html` inputs
- [x] Every array in a structure value links to its `_structures` entry (unchanged from Phase 2; validate passes)
- [x] Every visible, editor-changeable value in a data file's consuming component lives in the data file
- [x] No collection or data files created in this phase
- [x] This note records every structural change

## What changed

Bookshop step 3:

- `content/*.md` (8 files): `_bookshop_name:` → `_type:`.
- `cloudcannon/componentMap.ts` (new): `blockMap` keyed by the full `_type` names, `componentMap = { ...blockMap }`. At the repo root because the site has no `app/` source directory (`~/cloudcannon/componentMap`).
- `components/Blocks.vue` (new): renders `<component :is v-bind="block" :data-binding>` per block, no wrapper elements, so the markup matches the old loop. No `data-editable` attributes (Phase 4).
- `pages/[...slug].vue`: renders `<Blocks>`; `formatBookshopName` deleted. The connector callback now sets `blocks` to `latestValue.content_blocks` directly (no name transform needed).
- 19 block components and `general/error`: `props: ['block','dataBinding']` → one prop per top-level field of the structure value plus `dataBinding`; `block.x` → `x` in templates; `inheritAttrs: false`.
- `error.vue`: passes the error block with `v-bind` instead of `:block`.

Bookshop step 4:

- Deleted `.cloudcannon/postbuild` and `component-library/` (20 `*.bookshop.yml` + `bookshop/bookshop.config.js`).
- `README.md`: the two "structured using Bookshop" lines now name `cloudcannon/componentMap.ts` and the structure-value files.

Content and templates (Phase 2 handoff):

- `content/login.md`: `forgot_password_button{text: Forget Password, link: "#"}`, `divider_text: or`, `google_button_text: Sign In with Google`, `facebook_button_text: Sign In with FB`; `login.vue` reads them.
- `content/signup.md`: `form.divider_text`, `form.google_button_text`, `form.facebook_button_text` (`Sign In with FaceBook`); `signup.vue` reads them.
- `content/blog/index.md`: `recent_posts_heading: Recent Blog`, `author_label: "Written by:"`; `pages/blog/[slug].vue` queries them from `/blog` and renders them.
- `pricing/table.vue`: the check icon reads `feature.active_feature`; prices print `item.currency_symbol` in place of a literal `$`.
- `content/contact.md`: removed dead `phone.image`, `phone.image_alt`, `email.image`, `email.image_alt`.
- Alt text from content: `home/hero`, `home/video`, `feature/hero`, `general/feature` (×2 branches) read `image_alt`; `general/testimonial`, `about/hero`, `about/team` read `item.image_alt`; `about/video` reads `video.image_alt`; `general/error` reads `image_alt`.
- `general/faq.vue`: the first item renders `description` with `v-html` like the rest. `content/pricing.md`: `**USD**` → `<strong>USD</strong>` (configuration Q3 default).

## Field completeness

Script over every `content_blocks` item in `content/*.md`: each key of the block's structure `value` present in the block, no key in the block missing from `value`, and every array-of-objects item checked the same way against its `_structures` item value (`numbers`, `slider`, `hero_images`, `team_members`, `pricing_tier` → `features`, `FAQ`, `terms_and_conditions`). Result: **0 issues** across 8 files and 27 blocks.

## Baseline comparison

Final clean build (`.nuxt`, `.output`, `dist` deleted; `npm run generate`): exit 0, 19 pages, the same list as the baseline. The only ERRORs are the baseline's `/404` footer link and its four content queries. Both compiled CSS files byte-identical to the baseline (`entry.a20a6e25.css`, `ProseCode.e63e49c6.css`).

`node temp/snap.cjs .output/public` against `temp/snap1.json` (text, `<img>` count, inline styles): 1 page differs — `/pricing/`, the FAQ's `**USD**` now shows as bold "USD". Everything else identical.

Step 3 build and step 4 build, before any content change: block markup identical to the baseline (no `_type` or other attribute leaked onto any block root).

Fuller comparison (`temp/markup.cjs` body markup per page, plus `href`/`src`/`alt`/title/meta per page). Every difference, with its cause:

Intended in this phase:

- `/pricing/`: `**USD**` → `<strong>USD</strong>`; the 7 unticked features' check icons gain `deactive` (they now read `active_feature`); first FAQ answer's apostrophe written as `'` instead of `&#39;` (same text, `v-html` vs interpolation).
- Image `alt` on `/` (8), `/about/` (12), `/features/` (7): generic hardcoded alts (`card-images`, `logo`, `team-member-1 png`, …) replaced by each image's `image_alt` from content.
- Blog posts (6): `<span> Written by: </span>` → `<span>Written by: </span>`; `/login/`: `> Forget Password` → `>Forget Password`. Vue drops the leading space before an interpolation; it is leading whitespace in an inline element at the start of its line, so nothing renders differently.

From Phase 2's changes (not caught by the text-only snapshot, which is all Phase 2 compared):

- `/` gains a `<div>` around `<main>`: Phase 2 removed `layout: custom` from `content/index.md`. With it, no layout rendered (there is no `layouts/custom.vue`); now `layouts/default.vue` wraps the page in a bare `<div>`, as on every other page. No CSS targets the wrapper (`__nuxt`, `> main`, `main >` not used).
- `/about/`, `/contact/`, `/features/`, `/pricing/`: canonical `http://example.org/about` → `…/about/`, and the footer's `/about` link loses `router-link-active` while the nav's `/about/` link gains it. Phase 2's `prerender:routes` hook queues `/about` first; the crawl reaches `/about/` later, and both write `about/index.html`, so the trailing-slash render now wins. It is deterministic (same result in all four clean builds in this phase). The new output matches the served URL (`/about/`) and what the client router computes after hydration. Pages linked only with a trailing slash or only without one (`/login`, `/signup`, `/privacy`) are unchanged.

## Decisions and why

- **Nuxt Content v2 adaptations** (user's answer: stay on v2):
  - No `content.config.ts` schema to declare new keys in: v2 puts every front matter key on the document, so `recent_posts_heading`, `author_label` and the login/sign-up labels need nothing beyond the content files.
  - Pages stay at `content/*.md`, rendered by the document-driven catch-all through `useContent()`, not `content/pages/` with `queryCollection` (moving them changes every URL in v2's path routing). The `Blocks` renderer and block map are the v3 guidance unchanged.
  - The blog post page reads the blog index with `queryContent('blog').where({ _path: '/blog' })`, the same query `layouts/blog.vue` uses, in place of `queryCollection`.
- **`componentMap.ts` at `cloudcannon/` in the repo root**, because the root is Nuxt's source directory here; the docs' `app/cloudcannon/` assumes Nuxt 4's `app/`.
- **`inheritAttrs: false` on every block component.** `v-bind="block"` passes `_type` too; without it Vue would write `_type="…"` (and any future undeclared key) onto each block's root element. `_type` isn't declared as a prop because no component renders it.
- **Props declared as the structure value's top-level keys**, which equal the keys each template read (checked per component).
- **`general/error` reshaped too**, though it isn't in `blockMap`: it's the only other `props: ['block', …]` component, and `error.vue` is its only caller. It's still not a page section (configuration Q6).
- **`.cloudcannon/postbuild` deleted outright**: its `rm -rf node_modules; npm i` existed only to run `@bookshop/generate` (audit decision).
- **`.cloudcannon/prebuild` and `preinstall` left for Phase 5**, though the Bookshop removal checklist says to move non-Bookshop hook steps into the build command now. Configuration decided Phase 5 does it because the theme script rewrites a tracked SCSS file and must be made deterministic first; today it changes nothing (SCSS already matches `data/theme.json`).
- **Leading space before "Written by:" and "Forget Password" not preserved.** Keeping it needs a `{{ ' ' }}`-style template artifact (nuxt/content.md says to strip those), and it renders the same.
- **Decorative `~/assets` images stay imports** (pricing shapes, contact icons, about pattern, works effect): editors have no reason to change them. Contact's phone/email icons were never read from content, so their content keys were removed rather than wired up.
- **Contact form Inbox not wired here.** The `inbox_key` hidden field needs a key from the site's CloudCannon Inbox, which exists only once the site is on CloudCannon (Open question 3).
- **`temp/markup.cjs` kept** beside `snap.cjs`: it compares body markup per page (`node temp/markup.cjs <output dir> <out dir>`, then `diff -r`), which caught the alt, wrapper and active-link differences `snap.cjs` can't see. Phases 4–5 can reuse it; delete it with the baseline after Phase 5.

## Open questions

1. **Canonical URLs and the trailing slash.** Default: leave as built (`/about/` on pages the hook and nav both reach; `/blog/<post>` without a slash on posts). `generate-head.js` builds the canonical from whichever route string rendered last. Normalising it to always end in `/` (matching CloudCannon's collection URLs) is a one-line change for Phase 5 if you want consistent canonicals.
2. **`currency_symbol`.** Now rendered, so an editor's change shows. Default: keep `$` in all three tiers.
3. **Contact form Inbox.** Default: after the site is created on CloudCannon (Phase 5), create an Inbox, then add a hidden `inbox_key` input to `contact/form.vue` (value in the block or hardcoded) and set `action` per CloudCannon's "Connecting your site to an Inbox" article. Until then the form posts to the page and does nothing.
4. **Footer "Copyright" prefix.** Default: stays in code with the computed year; editors change the text after it (`copyright` in Data → Footer).
5. **Nav and footer logo `alt`** (`Nav-Logo`, `logo`) are hardcoded and no data file has a field for them. Default: leave as code; add `logo_alt` to `data/nav.json`/`footer.json` if editors should set it.
6. **Unknown `_type` fails the page, not the build.** Tested: a content file with `_type: nope/nope` logs `ERROR … No block component for _type "nope/nope"` and `/zz-throw-check (Error: [500])`, but `nuxt generate` 3.5 still exits 0. Default: leave it; the error shows in the build log. Adding `nitro.prerender.failOnError: true` would fail the build, but the footer's `/404` link would fail it too until that link is fixed (audit Q5).
