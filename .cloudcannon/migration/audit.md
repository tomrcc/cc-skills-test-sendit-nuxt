# Phase 1 — Audit (Nuxt)

Site: `sendit-nuxt` (CloudCannon's Sendit Nuxt template). Site sits at the repository root; one CloudCannon site.

## Checklist

- [x] Quick checks run and recorded
- [x] 1. Static generation readiness (incl. versions, package manager, `generate` script, `app.baseURL`, pages missing from baseline)
- [x] 1. Earlier CloudCannon setup routed (connector, `data-cms-bind`, Bookshop, hooks)
- [x] Bookshop step 1 — baseline built twice from clean cache and recorded
- [x] 2. Content sources (collections, data files, content in `.vue`, fetches, MDC components)
- [x] 3. Pages and routing
- [x] 4. Layouts and components, classifying static pages, census table, follow-on censuses
- [x] 5. Build pipeline
- [x] 6. Flags and special patterns
- [x] Site-wide facts, forms, hydration, load-time behaviour, markdown-extension syntax
- [x] 7. Sizing

## SSG detection

- `npx @cloudcannon/cli configure detect-ssg` → `other`, every score 0 (nuxtjs: 0). Re-run in this phase, same result.
- Actual SSG: Nuxt 3 (`nuxt ^3.5.2`, locked 3.5.3) with `@nuxt/content ^2.6.0` (locked 2.6.0) in `documentDriven: true` mode. Guide used: `migrate-to-cloudcannon/nuxt/`.

## Quick-check output

Versions and source directory:

```
12:    "@nuxt/content": "^2.6.0",
15:    "nuxt": "^3.5.2",
components
pages
```

Locked (package-lock v3): nuxt 3.5.3, @nuxt/content 2.6.0, vue 3.3.4, nitropack 2.4.1, @cloudcannon/visual-editor-connector 1.0.2, sass 1.63.2. Source directory is the root (no `app/`).

Nuxt config (`nuxt.config.js`):

```
./nuxt.config.js:11:        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
./nuxt.config.js:34:  content: {
```

No `ssr`, `prerender`, `routeRules`, `nitro`, `baseURL`, `runtimeConfig`, `image`, `i18n` or `hooks`. `content: { documentDriven: true }`. `components: { global: true, dirs: ['~/components'] }`. `app.head.script` loads jQuery, Bootstrap bundle, Waypoints, Magnific Popup (twice: `.min.js` and `.js`) and `/js/script.js`. Global CSS from `public/` (bootstrap, phosphor, magnific) plus `assets/style/main.scss`.

Content config: none (no `content.config.*` — Nuxt Content v2).

Server routes and middleware: `find server -type f -not -name tsconfig.json` → nothing. `server/` holds only `tsconfig.json`. No `middleware` directory.

Calls the browser makes (`useFetch|useLazyFetch|useAsyncData|$fetch|server: false|lazy: true` in `.vue`/`.ts`): no matches. Content is read with `queryContent` / `useContent()` (Nuxt Content v2) at render time; prerender writes the query results to `/api/_content/query/*.json`.

Earlier CloudCannon setup:

```
11:    "@cloudcannon/visual-editor-connector": "^1.0.2",
cloudcannon.config.yaml
.cloudcannon: initial-site-settings.json postbuild prebuild preinstall
```

Content and data files: `content/{index,about,features,pricing,contact,privacy,login,signup}.md`, `content/blog/index.md` + 6 posts, `schemas/{page,post}.md`, `data/{nav,site,theme,footer}.json`, 20 `component-library/components/**/*.bookshop.yml`, `cloudcannon.config.yaml`, `public/phosphor-icons/font/Phosphor.json` (icon font metadata, not content).

Numeric ordering prefixes:

```
content/blog/7-things-you-didnt-know-about-email.md
content/blog/5-things-to-improve-your-email-templates.md
```

Not ordering prefixes — the digit is followed by `-`, not `.`, so Nuxt Content keeps it in the path. Both build at `/blog/<filename>`.

## Unchanged-baseline `nuxt generate`

Run on Node v24.22.1 / npm 11.19.1 after `npm ci` (EBADENGINE warnings only: a dependency wants Node ≤19). Exit 0. Full log: `.cloudcannon/migration/generate.log`.

`ERROR`/`WARN` lines:

- `DEP0180`, `DEP0187` Node deprecation warnings (logged as ERROR, harmless).
- `WARN Using experimental payload extraction for full-static output`.
- `[@nuxt/content] WARN Using <NuxtLayout> inside app.vue will cause unwanted layout shifting`.
- `WARN Browserslist: caniuse-lite is outdated`.
- `ERROR [nuxt] [request error] [fatal] [404] Page Not Found` → `/404 (Error: [404] Page Not Found)`. The footer links to `/404`, the crawler follows it, and `[...slug].vue` throws 404 because no `content/404.md` exists. Expected: not a missing page.
- Four `/api/_content/query/*.json (Error: [404] Document not found!)` — content queries made while rendering `/404`.

Pages built (`find .output/public -name index.html | sort`), 19:

```
/  /about/  /blog/  /blog/5-things-to-improve-your-email-templates/
/blog/7-things-you-didnt-know-about-email/  /blog/best-email-sending-services/
/blog/email-delivery-tips/  /blog/how-to-host-better-email-marketing-campaigns/
/blog/what-are-the-best-email-clients/  /contact/  /features/  /login/  /pricing/
/privacy/  /signup/  /tags/blog/  /tags/email/  /tags/marketing/  /tags/technology/
```

Plus `200.html` and `404.html`, both empty SPA shells (6 characters of visible text) — the error page is not prerendered with content.

`nuxt generate` creates `dist` as a symlink to `.output/public`.

### Bookshop baseline (step 1 of the Bookshop migration)

Built twice from a clean cache (`.nuxt`, `.output`, `dist` deleted between runs). Visible text, `<img>` count and inline `style` attributes per page are identical across both runs; both compiled CSS files (`entry.a20a6e25.css`, `ProseCode.e63e49c6.css`) are byte-identical. Raw HTML differs only in build hashes/payload ids.

Kept for later diffs (gitignored `temp/`, delete after Phase 5):

- `temp/baseline-run1/` — the full first build output
- `temp/snap1.json` — per-page visible text, `<img>` count, inline styles
- `temp/snap.cjs` — the script that produced it (`node temp/snap.cjs <output dir>`)

Per page (imgs / inline styles): `/` 10/2, `/about/` 16/9, `/features/` 9/0, `/pricing/` 7/0, `/contact/` 5/1, `/privacy/` 2/0, `/login/` 2/0, `/signup/` 2/0, `/blog/` 8/0, each post 6/1, `/tags/blog/` 8/0, `/tags/marketing/` 6/0, `/tags/email/` 3/0, `/tags/technology/` 3/0.

Blog listings sort by `createdAt`, a key no post has, so their order is file order. Compare listing pages as a set / by item count, not by order.

## 1. Static generation readiness

Nothing from the blocking table:

- `server/` — only `tsconfig.json`; no `server/api`, `server/routes` or `server/middleware`.
- No auth modules, no `useCookie`.
- No `routeRules`, no `ssr: false`.
- Only failing page is `/404`, which is a footer link to a page that doesn't exist (see baseline).

Versions and settings:

- Nuxt 3.5.3, Vue 3.3.4 — Vue 3, in scope for `@cloudcannon/editable-regions/vue`.
- **Nuxt Content 2.6.0 with `documentDriven: true`** — `queryContent`, `useContent()`, `_path`, `<ContentDoc />`, no `content.config.ts`. Per nuxt/audit.md this is an **ask-the-user** item before Phase 2 (see Open questions, Q1).
- Node: no `.nvmrc`, `.node-version` or `engines`. `.cloudcannon/preinstall` runs `nvm use 16`. A locked dependency's engines range is `^14.18 || ^16.10 || 17 || 18 || 19`. The baseline builds on Node 24 anyway.
- Package manager: npm, `package-lock.json` lockfileVersion 3, no `packageManager` field.
- `generate` script: present (`nuxt generate`).
- `app.baseURL`: not set (site served from `/`).
- Pages missing from the baseline: none. Every content file has a built page. `/blog/page/[[pagenumber]]` and `/tags/[tagPaged]/page/[pagenumber]` build nothing because 6 posts < page size 9 — correct today; they appear once a listing passes 9 posts and are reached through pagination links.

### Earlier CloudCannon setup

Bookshop confirmed (`component-library/bookshop/bookshop.config.js`, 20 `*.bookshop.yml`, `npx "@bookshop/generate"` in postbuild, `_bookshop_name` in content). Read `cloudcannon-bookshop/SKILL.md`, `nuxt/overview.md`, `nuxt/bookshop.md`, `migrating-to-editable-regions.md` and `nuxt/migrating-to-editable-regions.md`.

- **`@cloudcannon/visual-editor-connector` 1.0.2** — `pages/[...slug].vue` calls `onCloudCannonChanges` / `stopCloudCannonChanges` to replace `content_blocks` live. → Phase 4, visual-editing.md § Sites using the visual editor connector.
- **`data-cms-bind`** — every block component's root element binds `:data-cms-bind="dataBinding"`; the loop passes `` `#content_blocks.${index}` ``. Also in `components/test.vue` (an unused demo component). → Phase 4.
- **Bookshop (structures only)** — no Bookshop engine, no `@bookshop/*` package in `package.json`; `bookshop.config.js` is `export default {}`. `[...slug].vue` turns `_bookshop_name` (`home/hero`) into a global component name (`HomeHero`) with `<component :is>`. Components take `props: ['block', 'dataBinding']`. Per the Bookshop migration file: structures → Phase 2, rename/resolve/dispatch + removal → Phase 3, regions → Phase 4, verify → Phase 5. No Bookshop version to pin (none installed) → use `@bookshop/generate@latest` when generating structures in Phase 2.
- **Hook steps other than Bookshop's** → Phase 5 (build-commands.md § `.cloudcannon/` hook files):
  - `.cloudcannon/preinstall`: `nvm use 16`
  - `.cloudcannon/prebuild`: `npm run prebuild:fetch-theme-color` → `node public/js/fetch-theme-color.js`, which rewrites `$color-primary`, `$color-secondary`, `$color-anchor`, `$color-background-effects` in `assets/style/_variables.scss` from `data/theme.json`. Today the SCSS already matches `theme.json`, so the baseline is the same with or without it.
  - `.cloudcannon/postbuild`: `rm -rf node_modules; npm i;` before the Bookshop step.
- **`cloudcannon.config.yaml`** exists (`paths`, `collections_config` for `data`, `pages`, `blog`, global `_inputs`, and `_structures.features` with an empty value). It has no `_structures.content_blocks` — those only ever existed in Bookshop's build output.
- **`.cloudcannon/initial-site-settings.json`** uses the flat format (`build_configuration.build_command`, `output_path: dist`) with `ssg: nuxtjs`. Phase 2 rewrites it (nested `build`, output `.output/public`).

Bookshop name mismatches found (for Phase 2 structures and Phase 3 component map):

- `privacy/terms-and-conditions` is used in `content/privacy.md` and has a Vue component, but **no `*.bookshop.yml`** — so no structure existed for it.
- `privacy/privacy.bookshop.yml` exists but **no `components/privacy/privacy/` Vue component** — a structure for a block that can't render. Its blueprint matches `privacy/terms-and-conditions` (`terms_and_conditions[]`), so it was the intended structure under a wrong name.
- `general/error` has a structure but is only used directly by `error.vue`, never in content.

`_bookshop_name` values in use (content + schemas): `about/hero`, `about/team`, `about/video`, `contact/form`, `contact/hero`, `feature/hero`, `general/counter`, `general/faq`, `general/feature`, `general/header`, `general/login`, `general/signup`, `general/testimonial`, `home/hero`, `home/video`, `pricing/hero`, `pricing/table`, `privacy/hero`, `privacy/terms-and-conditions`.

## 2. Content sources

### Nuxt Content (v2, no collections file)

Everything under `content/` is queryable. Two groups:

**Pages** — `content/*.md`, 8 files, rendered by `pages/[...slug].vue` through `useContent()` (document-driven, path from file location). URL = `/<filename>`, `index.md` → `/`.

- Fields: `title` (all), `permalink` (all but index — **read by nothing**; URL comes from the file path), `seo{page_description, canonical_url, featured_image, author_twitter_handle, open_graph_type, no_index}` (all but index; read by `utils/generate-head.js`), `content_blocks[]` (all), `layout: custom` (index only — document-driven mode reads `layout`; no `layouts/custom.vue` exists, build still uses default).
- Body: none; all content is in `content_blocks`.
- Rendering: blocks loop in `[...slug].vue`.
- Ordering: n/a.

**Blog** — `content/blog/`, 6 posts + `index.md`.

- Post fields (all 6 identical key sets): `date` (ISO), `title`, `tags[]`, `author` (free-text name), `thumbImg{image, image_alt}`, `featuredImg{image, image_alt}`, `seo{… featured_image_alt}`. Markdown body rendered by `<ContentDoc />` in `pages/blog/[slug].vue`.
- `content/blog/index.md` is the blog listing's settings, not a post: `title`, `description` (read by `layouts/blog.vue` hero), `pagination.size: 9` (read by listing pages), `seo`, plus dead keys `thumbImg{image: e, image_alt: e}` and a `content_blocks` with one `home/hero` that nothing renders (`/blog` is `pages/blog/index.vue`, not the catch-all).
- Paths: `/blog/<filename>`; `pages/blog/[slug].vue` renders via `useContent()` (document-driven by route path).
- Ordering: listings call `.sort({ createdAt: 'asc' })`; no file has `createdAt`, so order is file order. `date` exists but isn't used for sorting.
- Tags: `blog` ×6, `marketing` ×4, `email` ×1, `technology` ×1.

### Data files the site imports itself

- `data/nav.json` — imported by `components/nav.vue`: `logo`, `items[{link, text}]`, `button{link, text}`.
- `data/footer.json` — imported by `components/footer.vue`: `logo`, `copyright`, `social[{link, icon, icon_alt}]`, `sections[{title, links[{link, text}]}]`.
- `data/site.json` — imported by `utils/generate-head.js`: `BaseURL` (`http://example.org`), `site_title`, `description` ("…built with Eleventy" — stale copy), `image`, `twitter_image`, `twitter_site`; `favicon_icon`, `favicon_image` read by nothing (favicons are hardcoded in `nuxt.config.js`).
- `data/theme.json` — read only by the prebuild script (colour variables). Not imported by the app.
- nav/footer/site JSON each carry an `_inputs` block inside the data — CloudCannon inputs embedded in the file.

All four are shared lookups, not like-shaped collections — data files stay data files.

### Content in `.vue` files (hardcoded text)

- `pages/blog/[slug].vue`: "Written by:", "Recent Blog" heading.
- `components/general/error/error.vue`: "Try Again" button; `error.vue` passes a hardcoded block (`description: 'Something is wrong here!'`, image, alt).
- `components/general/login/login.vue`: "Forget Password", "or", "Sign In with Google", "Sign In with FB".
- `components/general/signup/signup.vue`: "or", "Sign In with Google", "Sign In with FaceBook".
- `components/footer.vue`: "Copyright <year>" prefix (computed year — keep as code).
- Alt text hardcoded in several components (`alt="aboutfeature"`, `alt="team-member-1 png"`, `alt="banner-image"`, `alt="card-images"`, `alt="logo"`) although content supplies `image_alt`.

### Fetches

None to outside APIs.

### `app.config.ts`

None.

### MDC components

None. Blog bodies are plain markdown: no `::`, no inline `:name{}`, no inline HTML. Snippets not needed.

### Markdown-extension syntax

No markdown plugins configured beyond Nuxt Content defaults. Grep of `content/blog` for footnotes, `$$`, alerts: 0 matches. Nothing to protect.

## 3. Pages and routing

Every route file under `pages/`:

- `pages/[...slug].vue` — catch-all, document-driven. Renders `content/*.md` pages: `/`, `/about`, `/features`, `/pricing`, `/contact`, `/privacy`, `/login`, `/signup`. Missing file → `createError({ statusCode: 404, fatal: true })`. Owns the blocks loop + connector.
- `pages/blog/index.vue` — `/blog` listing (layout `blog`), page 1 of posts, size from `content/blog/index.md`.
- `pages/blog/[slug].vue` — blog post (6 pages). Also queries 3 "recent" posts.
- `pages/blog/page/[[pagenumber]].vue` — listing pagination `/blog/page/N` (none built today).
- `pages/tags/[tag].vue` — tag listing page 1 (`/tags/blog`, `/tags/email`, `/tags/marketing`, `/tags/technology`).
- `pages/tags/[tagPaged]/page/[pagenumber].vue` — tag pagination (none built today).
- `error.vue` — error page (Nav + `GeneralError` with hardcoded block + Footer).

Pages that should not build as working features: `/login` and `/signup` — forms with no action and no backend (template demo pages). See Open questions Q3.

Links that go nowhere: footer → `/404` (no page; triggers the build's only ERROR) and `/sitemap.xml` (no sitemap module, not generated).

## 4. Layouts and components

- `app.vue` — `<Nav>`, `<NuxtLayout><NuxtPage/></NuxtLayout>`, `<Footer>` around every page.
- `layouts/default.vue` — bare `<div><slot/></div>`. Used by `[...slug].vue` and blog posts.
- `layouts/blog.vue` — blog hero (`title`, `description` from `content/blog/index.md` via its own `queryContent`) + `<slot/>`. Used by `/blog`, `/blog/page/*`, `/tags/*`. **Reads data itself** — Phase 4 must give it props or a region bound to the blog index file.
- `components/nav.vue`, `components/footer.vue` — **read data themselves** (JSON imports). Shared UI → data files (already). Phase 4 regions bind to the data files.
- `components/blog-layout.vue`, `components/pagination-controls.vue` — listing grid and pagination; computed, leave as code.
- `components/test.vue` — unused demo (`count` button, `data-cms-bind`). Nothing references it.
- Block components (19 used + `general/error`), all `props: ['block', 'dataBinding']`, read only from `block` — no data reads of their own, no `useRoute`, no fetches. Phase 3 must reshape them to top-level props (nuxt/migrating-to-editable-regions.md § Components take the block as props).
- UI libraries: Bootstrap 5 (CSS + JS from `public/`), jQuery, Magnific Popup, Waypoints. No Nuxt UI / PrimeVue / Vuetify.
- Client-only components: none (`<ClientOnly>` / `.client.vue` not used).
- Images: plain `<img>` (with a stray `format="webp"` attribute — no `@nuxt/image`). Content images from `public/images/…`; decorative images from `~/assets/images/…` (bundled).

Visual-editing candidates: every block (heroes, counter, feature, header, testimonial, FAQ, pricing table, team, video, contact form, privacy). Sidebar-only: nav structure, footer link columns, SEO fields, `pagination.size`, theme colours.

### Classifying static pages

All 8 `content/*.md` pages are already a page-builder `pages` collection (`content_blocks`, one blocks loop, components the project owns, `schemas/page.md`). The census confirms keeping that model; nothing moves from `.vue` into content except the hardcoded strings listed above.

### Census table

| Page file | Distinct content sections | Layout repeated on other pages? | Editor will add similar pages? | Recommended pattern | Needs editable region? |
| --- | --- | --- | --- | --- | --- |
| `content/index.md` (via `pages/[...slug].vue`) | home/hero, general/counter, home/video, general/header, general/feature ×3, general/testimonial | No (blocks shared with features/about) | Yes (landing pages) | Page builder — `pages` collection (keep) | Yes |
| `content/about.md` | about/hero, general/counter, about/video, about/team | No | Yes | Page builder — `pages` (keep) | Yes |
| `content/features.md` | feature/hero, general/header, general/feature ×3, general/testimonial | No | Yes | Page builder — `pages` (keep) | Yes |
| `content/pricing.md` | pricing/hero, pricing/table, general/faq | No | Maybe | Page builder — `pages` (keep) | Yes |
| `content/contact.md` | contact/hero, contact/form | No | Maybe | Page builder — `pages` (keep) | Yes |
| `content/privacy.md` | privacy/hero, privacy/terms-and-conditions (HTML strings) | Yes (terms-like pages) | Maybe | Page builder — `pages` (keep; long-form block) | Yes |
| `content/login.md` | general/login | No | No | Page builder — `pages` (keep) | Yes |
| `content/signup.md` | general/signup | No | No | Page builder — `pages` (keep) | Yes |
| `pages/blog/index.vue` + `layouts/blog.vue` (intro from `content/blog/index.md`) | hero title + description, post grid, pagination | Yes (tags listings share the layout) | No | Listing with editable intro — `content/blog/index.md` with its own schema | Yes (hero title, description) |
| `pages/tags/[tag].vue`, tag + blog pagination pages | same blog hero (blog index data), filtered grid | Yes | No | Generated listing — leave as code; hero shares blog index data | No (hero is the blog index's; edit on `/blog`) |
| `pages/blog/[slug].vue` | title, date, author, featured image, body, "Recent Blog" | Yes (all posts) | Yes | Fixed-schema `blog` collection (keep) | Yes (title, author, featured image, body) |
| `components/nav.vue` | logo, items, button | Yes (every page) | No | `data/nav.json` data file | Yes |
| `components/footer.vue` | logo, copyright, social, link sections | Yes (every page) | No | `data/footer.json` data file | Yes |
| `error.vue` | error image + message, "Try Again" | No | No | Hardcoded template — leave as code | No |

### Follow-on censuses

Primitive-vs-computed (page files):

- `pages/[...slug].vue` — only the blocks loop; computed `formatBookshopName` transform → replaced by the component map in Phase 3.
- `pages/blog/[slug].vue` — `pageData.title`, `pageData.author`, `featuredImg` primitive. `blogDate` computed (luxon format) — date display, keep as computed text (not a region). `recommendedBlogPosts` is a query over another collection → computed, leave as code.
- `layouts/blog.vue` — `title`, `description` primitive, but the layout queries them itself → Phase 4 passes them in or binds the region to `content/blog/index.md`.
- Listing pages — all computed (queries, pagination) → leave as code.
- `components/footer.vue` — copyright string concatenates the current year → split the region to the `copyright` value only.

Frontmatter co-location: every block component reads one `content_blocks[i]` item — co-located. Nav and footer each read one data file. Blog post fields are flat top-level keys — co-located. Only `layouts/blog.vue` reads another file (blog index).

## 5. Build pipeline

- Scripts: `generate: nuxt generate`, `build: nuxt build`, `dev`, `preview`, `prebuild:fetch-theme-color`.
- CloudCannon today: `initial-site-settings.json` build command `npm run generate`, output `dist`; hooks preinstall (`nvm use 16`), prebuild (theme colours), postbuild (reinstall + `@bookshop/generate`).
- Environment variables: none (`.env` absent, no `runtimeConfig`, no `process.env` in config).
- Network-at-build modules: none (`@nuxt/fonts`, `nuxt-og-image`, sitemap not used). `_variables.scss` imports Google Fonts by URL — fetched by the browser, not the build.
- Hosting config: none (`vercel.json`, `netlify.toml`, `.github/workflows`, `nitro.preset`, `_headers`, `_redirects` all absent). README has a "Deploy to CloudCannon" button.

## 6. Flags and special patterns

- **Positional CSS selectors on future array containers:**
  - `assets/style/components/_counter.scss`: `.counter-up-content:nth-child(2), :nth-child(4)` (below lg) — the counter `numbers` list.
  - `assets/style/components/_table.scss` `&:last-child` and `assets/style/components/_feature.scss` `&:last-child` on list items — pricing `features`, feature lists.
  - `assets/style/components/privacy/_privacy.scss` `.nav-item:last-child` — privacy side nav (`terms_and_conditions` rendered twice).
  - Phase 4 checks `<template>` blueprints against these.
- **Global DOM scripts** — `public/js/script.js` on `$(document).ready`: Magnific Popup bound once to `.popup-vimeo` (home/video, about/video), password toggle `.viewPassword` (signup), `.nav-link` active toggling, scrollspy for `#scrol-nav` (privacy; the `getElementById("#scrol-nav")` check never matches, so it never runs), sticky nav on scroll. Bootstrap `data-bs-toggle` accordion (FAQ) and collapse (nav). FAQ `activeAccordion` uses `document.getElementsByClassName('shows')`. Re-rendered blocks lose the Magnific binding.
- **Numbers displayed as text** — counter `numbers[].number` (200, 2016, 40, 44325/4322); pricing `price`, `discount_price` (0, 199, 125, 499, 350). Text regions need strings.
- **Styled HTML in strings** — `privacy/terms-and-conditions` `description` holds `<p>` / `<ul><li>` rendered with `v-html` (Bookshop `_inputs.description.type: html`). Most `description` fields render with `v-html` but hold plain text. FAQ: first item renders `description` as text (`{{ }}`), others with `v-html`; the `**USD**` markdown is shown raw either way.
- **Load-time behaviour** — no reveal/fade-in animations, no `IntersectionObserver`, no `setInterval`. Waypoints is loaded but nothing calls it (no count-up). `opacity: 0` in `_globals.scss` is the nav dropdown menu (unused markup). Video popups and accordion depend on scripts (above).
- **Dead or mismatched keys** (Phase 2/3 field diff):
  - `content/index.md` counter uses `alternateStyle`; the component reads `alternate_style` (about.md uses the right key).
  - `pricing/table.vue` icon class reads `feature.is_active`; content has `active_feature` (the `<li>` reads it correctly).
  - `utils/generate-head.js` reads `seo.cannonical_url`; content and `_inputs` use `canonical_url` — canonical override never applies.
  - `cloudcannon.config.yaml` `_inputs.faivcon_image` (typo), plus `pagination.data`, `pagination.alias`, `isActive`, `logo_url` — keys no content has.
  - `content/blog/index.md` `thumbImg: e/e` and unused `content_blocks`.
  - Pricing table prints `$` literally and ignores `currency_symbol`.

## Site-wide facts

- Package manager: npm (lockfile v3), no `packageManager` pin.
- Repository: site at the root; one CloudCannon site.
- Production hosting: nothing in the repo besides the CloudCannon deploy button and `.cloudcannon/` setup → default: CloudCannon hosts production (Q2).
- Headers and redirects: none anywhere.

### Forms

- `contact/form` — `<form method="post">` with no action, `_gotcha` honeypot, `_replyto` email field. With CloudCannon hosting → posts to a CloudCannon Inbox (`inbox_key` hidden field) in Phase 3/4.
- `general/login`, `general/signup` — sign-in / sign-up forms, no action, no backend. Can't work on static hosting → ask (Q3).

### Existing hydration errors

Not checked in a browser in this phase. Pages for the user (or a later phase with a browser) to load with the console open: `/` (default layout, blocks loop), `/blog/` (blog layout), `/blog/email-delivery-tips/` (post), `/pricing/` (FAQ accordion, `v-html`). Likely sources to watch: `footer.vue` `new Date()` year (server vs client same year — fine unless across New Year), `<NuxtLayout>` in `app.vue` warning, nested `<p v-html>` holding block HTML in privacy.

## 7. Sizing

- Total pages (content file or static route; listings, tags, pagination excluded): 8 `content/*.md` pages + 1 blog index + 6 posts + `error.vue` = **16** (threshold >30: ok)
- Hardcoded template → YAML conversions: **0** — every page is already in `content_blocks` or a fixed-schema collection; the remaining hardcoded strings are a handful of labels inside components (threshold >15: ok)
- Distinct collections: **3** — `pages`, `blog`, `data` (threshold >5: ok)
- Tripped: **0/3** → no `plan.md`; one subagent per phase.

## Decisions and why

- **Keep the page-builder `pages` collection for all 8 `content/*.md` pages.** They already use `content_blocks` with project-owned components; editors add pages from `schemas/page.md`.
- **Keep `blog` as a fixed-schema collection**; `content/blog/index.md` becomes its own schema (listing intro + `pagination.size`) — in the same collection folder or as a `pages`-style entry, decided in Phase 2.
- **Keep nav/footer/site/theme as data files** in `data/`. `theme.json` stays a data file even though only the build reads it.
- **Migrate off Bookshop and the visual editor connector** (Nuxt is marked Migrate). Step mapping: structures from real `@bookshop/generate@latest` output in Phase 2; rename `_bookshop_name` → `_type` + component map + top-level props in one Phase 3 step, then remove Bookshop; connector and `data-cms-bind` removed in Phase 4.
- **Name the privacy structure `privacy/terms-and-conditions`** (the name content and the component use), built from `privacy/privacy.bookshop.yml`'s blueprint. Drop the `privacy/privacy` name.
- **Treat `/404` as not a page.** The footer's `/404` link causes the build's only ERROR; leave the link for the user (Q5) rather than change content now.
- **Baseline = the 19 built pages + `temp/baseline-run1/` snapshot.** Diff after every structural step in Phases 3–5. Compare blog/tag listings by set and count, not order.
- **Output path is `.output/public`, not `dist`** (cloudcannon-configuration/nuxt/configuration.md) — Phase 2 rewrites `initial-site-settings.json`.
- **Hook steps:** theme-colour prebuild and Node version move into the build command / settings in Phase 5; `rm -rf node_modules; npm i` in postbuild existed only to run `@bookshop/generate` and goes with it.
- **No structural changes made in this phase.** Only additions: `.cloudcannon/migration/{audit.md,generate.log}` and gitignored `temp/` (baseline snapshot); `node_modules/`, `.nuxt/`, `.output/`, `dist` from the build.

## Open questions

1. **Nuxt Content v2 → v3?** (ask before Phase 2 — nuxt/audit.md requires it) The site uses Content 2.6 document-driven mode; the skills' Nuxt Content rules are written for v3. Options: (a) stay on v2 — no schema file, paths from `_path`, document-driven rendering stays; less change, but Phase 2–4 adapt v3 guidance by hand; (b) upgrade to v3 in this migration — `content.config.ts` collections, `queryCollection`, a real catch-all page; larger change touching every page and the blog queries, likely needing a newer Nuxt 3 too. **Default taken: none — needs the user's answer.** Recommendation: (a) stay on v2 for this migration (the site's content reading is small and already page-builder shaped; the upgrade is orthogonal to CloudCannon and doubles the diff surface), unless the user wants the upgrade anyway.
2. **Where is production hosted?** Default: CloudCannon (deploy button, existing `.cloudcannon/` setup). Affects the contact form (Inbox) and routing.
3. **Login and sign-up pages** have forms with no backend. Default: keep them as static, editable demo pages (they're template pages), forms inert.
4. **Node version on CloudCannon.** Preinstall pins 16 (EOL); locked deps declare up to 19; local baseline built on 24. Default: Node 18 in build settings in Phase 5, verify the build there.
5. **Footer links to `/404` and `/sitemap.xml`** go nowhere. Default: leave content as is (editors can change links in `data/footer.json`).
6. **Blog `author` is free text** in each post. Default: keep as a text field; no authors data file (no author card exists, only a name).
7. **Dead/mismatched keys** (§ 6). Default: Phase 2/3 fix the mechanical ones (`alternateStyle` → `alternate_style`, `is_active` read, `cannonical_url` read, `_inputs` typos) as small cross-phase fixes and list them; delete dead keys (`permalink` stays — harmless and editors may expect it; `thumbImg: e` and the unused `content_blocks` in `content/blog/index.md` removed).
8. **Hardcoded strings** in login/signup/error/blog post ("Recent Blog", "Written by:", "Sign In with Google"…). Default: move "Recent Blog" and "Written by:" into the blog index file; login/signup button labels into their blocks; leave `error.vue` as code.
9. **`components/test.vue`** is unused. Default: leave it until Phase 4, which removes it with the connector bindings.
