# Phase 2 — Configuration (Nuxt)

Site: `sendit-nuxt`. Nuxt 3.5.3, Nuxt Content 2.6.0 (`documentDriven: true`), staying on Content v2 (user's answer). Bookshop structures-only setup being migrated to editable regions (Bookshop step 2 done here).

The config file is **`cloudcannon.config.yaml`** (the site's existing file, `.yaml` extension). Later phases edit this file; don't create a `cloudcannon.config.yml` beside it.

## Checklist

Shared (`cloudcannon-configuration/configuration.md` § Verification checklist) and Nuxt (`cloudcannon-configuration/nuxt/configuration.md`) items.

Blocking gates

- [x] Structures — four rules: field completeness (see § Structure completeness — 2 blocks need Phase 3 template work first), array/object linkage, previews, nested object preview icons
- [x] `npx @cloudcannon/cli validate` passes (exit 0, 24 files valid)

Files

- [x] `cloudcannon.config.yaml` exists and is valid YAML
- [x] Build settings nested under `build` in `.cloudcannon/initial-site-settings.json`
- [ ] The build command alone produces the complete output — **deferred to Phase 5**: the theme-colour prebuild hook still lives in `.cloudcannon/prebuild`. Today the SCSS already matches `data/theme.json`, so output is complete, but an edit to Theme only lands once Phase 5 folds the step into `generate`
- [x] `.cloudcannon/README.md` exists

Collections

- [x] Entry for every audit collection: `pages`, `blog`, `data`
- [x] No defunct keys (`output: true` removed)
- [x] No non-content directories
- [x] No single-file collections
- [x] `collection_groups`: Content (pages, blog), Settings (data)
- [x] Every collection has a `url` with trailing slash, or `disable_url: true`
- [x] Computed URL equals built path for every file (§ URL check)
- [x] Blog index has its own schema (`blog_index`)

Inputs

- [x] Images, dates, selects, hidden fields configured
- [x] Every field has an explicit input (§ Input checks)
- [x] Every `select`/`multiselect` has options (`_select_data.open_graph_types`, `_select_data.social_icons`, inline placement values, `data.tags`)
- [x] Icon field (footer social `icon`) is a select with `value_key: id`, named values, `allow_create: true` (Phosphor CSS resolves any `ph-*` class)
- [x] Enum-like keys in structure values have inputs (`placement`, social `icon`)
- [x] Numeric values on text inputs quoted (counter `number`, pricing `price`/`discount_price`)
- [x] Developer-only fields hidden (`layout`, `_schema`, `permalink`, `_type`, site favicons)
- [x] `file_config` uses the array format

Images

- [x] `paths.uploads: public/images`, `paths.static: public`; every stored path is under `public/images/` and builds unchanged

Editors

- [x] `_enabled_editors`: pages `[visual, data]`, blog `[visual, content, data]`, data `[data]`
- [x] No `.md` collection that builds no page (the blog index builds `/blog/`)

Content specifics

- [x] Styled HTML in front matter: only the privacy terms (`<p>`, `<ul>`), on an `html` input with list buttons
- [x] No `<br />` in content or data
- [x] `markdown.options.table: true` (renderer supports GFM tables; no tables in content today)
- [x] Toolbar keys off where `markdown.options` is off (no `subscript`/`superscript` in `_editables.content`)
- [x] Every switch has a conditional render (`alternate_style`, `remove_top_padding`, `reversed`, `highlight_tier`, `has_discount`, `active_feature`, `seo.no_index`)
- [x] No text regions with template fallbacks yet (Phase 4)
- [x] No `type: markdown` inputs
- [x] No YAML anchors, aliases or merge keys
- [x] Schema defaults match existing content (no backfill needed: new keys only appear on files Phase 3 changes)
- [x] Tags multiselect uses `values: data.tags`
- [x] `data/tags.json` is a top-level array of strings typed with `$[*]`
- [x] No `length === 0 ? showAll : showSelected` toggles

Schemas and the Add button

- [x] `add_options`: Page (pages), Blog Post (blog); Blog Index left off
- [x] Every front matter key is in its schema (diffed per collection)
- [x] Only `_schema` value in use is `blog_index`, a key under `blog.schemas`
- [x] `disable_add` on `data`
- [x] `new_preview_url` on both creatable collections
- [x] `new_preview_url` choices follow the rule (`/` for pages; a post for blog)
- [x] No `draft` field
- [x] Page-builder schema present

Nuxt

- [x] `"ssg": "nuxtjs"`
- [x] `build_command` runs `nuxt generate` (`npm run generate`)
- [x] `output_path: .output/public`
- [x] Every page a collection file builds is in `.output/public` (19 pages, same as baseline) and unlinked new pages build (§ Reachability)
- [x] No browser fetches to `server/api` (none exist)
- [x] No collection over `.vue` files
- [x] Every editor field in its Nuxt Content collection schema — n/a on Content v2 (§ Decisions)
- [x] No collection whose files each have a hard-coded page (pages share the catch-all; blog posts share `[slug].vue`)
- [x] Collection `url`s resolve every file to its page
- [x] Every stored image path shows an image, production paths unchanged

## What was configured

- **`cloudcannon.config.yaml`** rewritten: `timezone`, `paths`, `markdown`, three collections, groups, `data_config`, `_editables.content`, global SEO inputs, `_select_data`, `_structures`, `file_config` for each data file.
- **Collections**
  - `pages` — `content/`, glob `*.md` (flat; `blog/` stays out), `url: /[slug]/`, one `default` schema (`.cloudcannon/schemas/page.md`), `content_blocks` linked to `_structures.content_blocks`.
  - `blog` — `content/blog/`, glob `*.md`, `url: /blog/[slug]/`, schemas `default` (post) and `blog_index`; `date` gets `instance_value: NOW`; tags multiselect from `data.tags`.
  - `data` — `data/*.json`, `disable_url`, no add/folder/file actions.
- **`data_config`**: `nav`, `footer`, `site`, `theme`, `tags`.
- **Structures** — split co-located: one `*.cloudcannon.structure-value.yml` beside each block component (19), pulled in by `values_from_glob: /components/**/*.cloudcannon.structure-value.yml`. Item structures in the main config: `counter_numbers`, `testimonial_items`, `about_hero_images`, `team_members`, `pricing_tiers`, `pricing_features`, `faq_items`, `terms_sections`, `nav_links` (nav items and footer column links), `footer_sections`, `social_links`.
- **Shared inputs** in `.cloudcannon/inputs/`: `heading`, `title-suffix`, `description-html`, `button`, pulled into structure values with `_inputs_from_glob`.
- **`.cloudcannon/initial-site-settings.json`** rewritten to the nested format: `npm ci`, `npm run generate`, `.output/public`, `node_version: "18"`, `preserved_paths: node_modules/,.nuxt/`, `mode: hosted`.
- **`.cloudcannon/README.md`** for editors.
- **`.gitignore`**: `.cloudcannon/migration/*.schema.json`.

### Bookshop structures (step 2)

Generated with `npx @bookshop/generate@latest` (3.20.0; no Bookshop package installed) in `temp/bookshop-generate/` (deleted), `--skip-live --skip-components`. 20 structure values came out; 19 written. Changes from the generated output:

- `_bookshop_name` → `_type` in every value; no `id_key` (`_type` is the default).
- `privacy/privacy` written as **`privacy/terms-and-conditions`** (the name content and the component use), from its blueprint.
- `general/error` **not written**: only `error.vue` renders it with a hardcoded block; it is not a page section (Open question 6).
- Inline item structures moved to named `_structures` entries; previews and `picker_preview` added everywhere.
- Bookshop `_inputs` placed where their fields are: `placement`/`image` moved onto `about_hero_images`; `description: markdown` cascaded onto item structures with no `description` (counter numbers, testimonial items, pricing features, hero images) dropped; `features: array` on pricing table moved to `pricing_tiers`.
- `description` inputs changed from `markdown` to `html`: every component renders `description` with `v-html` and no markdown step.
- Blueprint fixes: home hero `button.url` → `button.link` (the component reads `link`); feature hero `button.link: /sign-up` → `/signup` (no `/sign-up` page); contact hero title `Let&#39;s talk.` → `Let's talk.` (Vue escapes it).
- Invalid preview icons replaced: `phone` → `call`, `email` → `mail`, `drive_file_rename_outline` → `chat`.
- Contact form `phone.image`, `phone.image_alt`, `email.image`, `email.image_alt` left out of the value: the component hardcodes those icons from `~/assets` and never reads them (dead keys; Phase 3 removes them from `content/contact.md`).
- New label fields added to `general/login` and `general/signup` values (hardcoded strings moving into the blocks, user's answer).

## URL check

`npm run generate` from a clean cache (`.nuxt`, `.output`, `dist` deleted), then `find .output/public -name index.html`. 19 pages, the same list as the baseline. Every collection file:

- `content/index.md` → `/` ✓; `about`, `features`, `pricing`, `contact`, `privacy`, `login`, `signup` → `/<name>/` ✓
- `content/blog/index.md` → `/blog/` ✓; the 6 posts → `/blog/<filename>/` ✓ (the `5-`/`7-` prefixes are followed by `-`, not `.`, so Nuxt Content keeps them; `[slug]` matches)

Baseline diff (`node temp/snap.cjs .output/public` against `temp/snap1.json`): **0 differences** in visible text, `<img>` counts and inline styles across all pages; both CSS files keep the baseline hashes. The build's only ERROR is still the footer's `/404` link.

### Reachability

`nuxt.config.js` gets a `prerender:routes` hook adding a route for every `content/*.md` (the hook exists in Nuxt 3.5: `@nuxt/schema` types it, `nuxt/dist/index.mjs` calls it). Tested: a temporary unlinked `content/zz-unlinked-check.md` built to `/zz-unlinked-check/index.html`; the file was then deleted and the site rebuilt. Blog posts need no hook: every post appears on `/blog/` or its pagination pages.

## Input checks

- **Structure values:** every `_inputs` key (including those from `_inputs_from_glob`) names a field in its `value`, and every leaf in `value` has an input.
- **Data files:** every leaf key in `nav`, `footer`, `site`, `theme` matches a `file_config` input; no input names a missing key.
- **Collections:** front matter keys of pages and posts diffed against `page.md` / `post.md`; no extras.
- **Icons:** every literal icon in the config, structure values and input files checked against the schema's icon enum.

## Structure completeness

Per-instance diff of every `content_blocks` item (and nested array items) against its structure value, after the mechanical fixes below. Remaining gaps, all Phase 3:

- `content/login.md` `general/login`: needs `forgot_password_button{text,link}`, `divider_text`, `google_button_text`, `facebook_button_text`
- `content/signup.md` `general/signup`: needs `form.divider_text`, `form.google_button_text`, `form.facebook_button_text`

These go in together with the template change that reads them, using the current hardcoded strings as values, so the baseline doesn't change.

## Changes outside configuration files

Small cross-phase fixes (user's answer: fix mechanical mismatches and list them). Baseline diff after all of them: 0.

- `content/index.md`: `alternateStyle` → `alternate_style` (the key the component reads); removed `layout: custom` (no `layouts/custom.vue`, the build already used the default layout); removed the commented-out `content_blocks` at the end of the front matter (comments are lost on save).
- `content/index.md`, `content/about.md`: counter `number` values quoted; empty `prefix:`/`suffix:` added to items missing them.
- `content/features.md`: `remove_top_padding: false` added to the `general/header` block.
- `content/pricing.md`: `price` and `discount_price` quoted.
- `content/blog/index.md`: `_schema: blog_index` added; dead `thumbImg: {image: e, image_alt: e}` and the unrendered `content_blocks` removed.
- `utils/generate-head.js`: reads `seo.canonical_url` (was `seo.cannonical_url`, which no content has). No page sets it, so output is unchanged.
- `data/nav.json`, `data/footer.json`, `data/site.json`: embedded `_inputs` removed; their inputs live in `file_config`.
- `data/tags.json`: new, `["blog","email","marketing","technology"]` (the tags in use) — the dataset for the tags multiselect.
- `nuxt.config.js`: `prerender:routes` hook (§ Reachability).
- `schemas/` removed; its two files are replaced by `.cloudcannon/schemas/page.md` and `post.md` (nothing else referenced them).

## For Phase 3

- **Bookshop step 3 (one step):** rename `_bookshop_name` → `_type` in all content (no schema file has it), build the component map keyed by the full names, give components top-level props. The structure values already use `_type`; until the rename, the editor can't match existing blocks to structures.
- **Bookshop step 4:** remove `npx @bookshop/generate` and the `rm -rf node_modules; npm i` line from `.cloudcannon/postbuild`; delete `component-library/` (all 20 `*.bookshop.yml` now have values, or are deliberately dropped: `general/error`).
- **Hardcoded strings into content** (user's answer):
  - `pages/blog/[slug].vue`: "Recent Blog" → `recent_posts_heading`, "Written by:" → `author_label`, both read from `content/blog/index.md` (add them there with those values; the `blog_index` schema already has them).
  - `general/login` and `general/signup`: the fields in § Structure completeness.
- **Template-side key fixes:** `pricing/table.vue` icon class reads `feature.is_active` → `feature.active_feature` (changes the pricing page's HTML: unticked features gain `deactive` on the icon — expected diff); use `currency_symbol` in place of the literal `$` (no visible change while every tier uses `$`).
- **Contact form:** remove `phone.image`, `phone.image_alt`, `email.image`, `email.image_alt` from `content/contact.md`.
- **Alt text:** components hardcode `alt` (`banner-image`, `card-images`, `team-member-1 png`, `aboutfeature`, `logo`) while content has `image_alt`; read the content value (visible-text snapshot unaffected; HTML changes).
- **`description` rendering:** inputs are `html` because templates use `v-html`. Many wrap it in `<p v-html>`; an `html` value saved with its own `<p>` nests paragraphs. Phase 4's text regions on these `<p>`s save inline HTML, which is safe; if the sidebar input saves `<p>…</p>`, change the wrapper to a `<div>` in the same component (check CSS that targets `p`).
- **FAQ:** the first item renders `description` with `{{ }}`, the rest with `v-html`; make all `v-html` (the input is `html`). `**USD**` in `content/pricing.md` prints literally under `v-html`; default is to change it to `<strong>USD</strong>` (Open question 3).
- `layouts/blog.vue` reads the blog index itself — Phase 4 concern, noted in the audit.

## Decisions and why

- **Stay on Nuxt Content v2; adaptations of v3 guidance:**
  - No `content.config.ts`, so collection `path`s come from the folders the pages read: `queryContent()`/`useContent()` over `content/` (pages, catch-all) and `queryContent('blog')` (posts).
  - "Add every field to the Nuxt Content collection `schema`" doesn't apply: v2 puts every front matter key on the document, nothing nests under `meta`.
  - Pages stay at `content/*.md`, not `content/pages/`: v2's document-driven mode routes by file path, so moving them would change every URL. `pages` uses glob `*.md` so `content/blog/` stays in `blog`.
  - The `prerender:routes` hook reads `content/` directly (v2 has no collection source to read).
  - URLs use the v2 `_path` rule (file path, `index` → folder), which `[slug]` matches.
- **Kept `cloudcannon.config.yaml`** (existing file, valid name) rather than renaming to `.yml`.
- **Split co-located structures** (19 block types ≥ 5); structure-value files live beside each Vue component, named after the component file.
- **`description` is `html` with an inline-only toolbar** for every block (`v-html`, no markdown step); terms sections get lists and `p`/`h4`.
- **Blog index lives in `blog` with its own schema**, off the Add menu; it builds `/blog/` and its `[slug]` is empty, so the collection URL fits.
- **`new_preview_url`:** pages → `/` (the home page renders through the same catch-all and default layout); blog → `/blog/email-delivery-tips/` (named in the README; deleting that post leaves new posts without a preview).
- **Tags are an editor-owned dataset** (`data/tags.json`), because each tag gets a page and editors may need new ones.
- **`permalink` kept in content and schema, hidden:** nothing reads it (URLs come from file paths), and the audit default keeps it.
- **Site favicons hidden:** `favicon_icon`/`favicon_image` are read by nothing (favicons are hardcoded in `nuxt.config.js`).
- **`timezone: Etc/UTC`:** the site sets none, and every post date is stored in UTC (`…Z`).
- **`markdown`:** commonmark with `gfm`, `strikethrough`, `table`, `html` on — Nuxt Content v2 runs `remark-gfm` and `rehype-raw`. Subscript/superscript stay off (`~x~` is GFM strikethrough there).
- **Node 18:** `build.node_version: "18"` in initial site settings (user's answer). The site has no `.nvmrc`/`engines`; `.cloudcannon/preinstall` (`nvm use 16`) stays until Phase 5 removes the hooks.
- **Build settings:** `npm ci` (lockfile v3), `npm run generate`, `.output/public`. Folding the theme-colour prebuild into `generate` is Phase 5 (audit decision); that script rewrites tracked `assets/style/_variables.scss`, so Phase 5 must make it deterministic or write to an ignored file (build-commands.md § Steps before the build).
- **Hosting is CloudCannon** (`mode: hosted`, user's answer).

## Open questions

1. **Timezone.** Default taken: `Etc/UTC`. Change it if the business works in a specific zone (it changes how dates show in the editor).
2. **`.nvmrc`.** Default taken: `node_version: "18"` set directly. Adding `.nvmrc` with `18` and switching to `"file"` would keep local and CloudCannon builds on the same version.
3. **FAQ `**USD**`.** Default: Phase 3 changes it to `<strong>USD</strong>` (the field is HTML), so the page shows bold "USD" instead of literal asterisks.
4. **Login/sign-up label field names.** Default: the names in § Structure completeness (`forgot_password_button`, `divider_text`, `google_button_text`, `facebook_button_text`).
5. **Theme colours.** Default: editable in Data → Theme, effective once Phase 5 runs the theme step in the build. Until then an edit there changes nothing on the site.
6. **Error block.** Default: no `general/error` structure; the 404 page stays code (audit Q8/Q9 defaults). Say if editors should be able to place it as a page section.
