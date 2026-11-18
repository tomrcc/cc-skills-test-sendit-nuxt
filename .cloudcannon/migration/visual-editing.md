# Phase 4 — Visual editing (Nuxt)

Site: `sendit-nuxt`. Nuxt 3.5.3, Nuxt Content 2.6.0 (`documentDriven: true`), staying on Content v2. Replaces `@cloudcannon/visual-editor-connector` and `data-cms-bind` with `@cloudcannon/editable-regions` 0.0.22 (Bookshop step 5).

Every census row below is implemented in the repo; rows without regions carry their reason in Justification.

## Checklist

Connector removal (`nuxt/visual-editing.md § Sites using the visual editor connector`)

- [x] `@cloudcannon/visual-editor-connector` removed from `package.json` (`npm uninstall`, lockfile updated)
- [x] `onCloudCannonChanges` / `stopCloudCannonChanges` and the reactive `blocks` copy removed from `pages/[...slug].vue`; it renders `pageData.content_blocks` straight from `useContent()`
- [x] Census rows for every `data-cms-bind` element: all 20 were block roots (`#content_blocks.N`) → the blocks loop is now the `content_blocks` array with per-item `data-component`; nothing kept
- [x] Every `data-cms-bind` removed, and the `dataBinding` prop with it (all block components, `Blocks.vue`); `components/test.vue` deleted (user's decision)
- [x] `grep -rn "visual-editor-connector\|onCloudCannonChanges" --exclude-dir=node_modules .` → only the migration notes
- [x] Build command unchanged (`npm run generate`); nothing to update in `initial-site-settings.json`

Setup and infrastructure (`nuxt/visual-editing.md`)

- [x] `@cloudcannon/editable-regions` in `dependencies` (`^0.0.22`)
- [x] `nuxt.config.js` sets `vue.compilerOptions.isCustomElement` for `editable-` tags (Nuxt 3.5 schema passes it to the Vue compiler; the built HTML keeps every `<editable-*>` element)
- [x] One `<EditableRegions>` per rendered page, wrapping the header, the page and the footer: in `app.vue` (around `<Nav>`, `<NuxtLayout>`, `<Footer>`), and in `error.vue`. Every built page has exactly one `data-editable="_dynamic"`, and no region before it
- [x] `plugins/cloudcannon.client.ts` imports `../cloudcannon/registerComponents` inside the `inEditorMode` check
- [x] No connector, no `onCloudCannonChanges`
- [x] Nothing imports `registerVueComponent` or the component map at the top level (only `registerComponents.ts`, which the plugin imports dynamically)
- [x] `nuxt generate` exit 0; `ERROR`/`WARN` lines identical to the baseline log (§ Build and baseline)

Universal completeness (`visual-editing.md`)

- [x] Editor enablement: `pages` and `blog` have `visual`; `data` has none of its own pages
- [x] Census coverage: every row wired or justified
- [x] Array containers: `content_blocks`, `numbers`, `slider`, `hero_images`, `team_members`, `pricing_tier`, `features`, `FAQ`, `terms_and_conditions`, `@data[nav].items`, footer `social`, `sections.N.links`
- [x] Per-loop census: every loop in a registered component has `array` / `array-item` and text or image regions on its visible fields, except footer social items (icon only, justified) and the terms side menu (justified)
- [x] Nested editables in array items
- [x] Array path scope: every region inside an `array-item` is relative
- [x] Array container purity: every array wrapper holds only its items (and the nav's `RawTemplate`); `hero_images` got its own `display: contents` wrapper so the static `.pattern` stays outside
- [x] Image editables: every stored image path renders on an `<img data-editable="image">`
- [x] Child component labels: hardcoded labels moved into content in Phase 3; remaining hardcoded text is decorative or the error page
- [x] Shared partials backed by data: nav (`@data[nav]` primitives), footer (`@data[footer]` component)
- [x] Data file completeness: every visible value in nav/footer is in the data file except the logos' `alt` (content.md Q5) and the computed year
- [x] Cross-collection select wiring: none (blog `author` is free text)
- [x] `_inputs` audit: every `data-prop` path has an explicit input of the matching type (§ Inputs)
- [x] Schema-file seed audit: `.cloudcannon/schemas/post.md` and `blog-index.md` seed every wired field; `page.md` seeds `content_blocks: []`; each block's fields come from its structure value
- [x] Markdown body: `data-prop="@content"` on the post body wrapper
- [x] Source editables: none (Nuxt: no source regions in `.vue` files; hardcoded text was moved into content in Phase 3)
- [x] Conditional guards: images guarded on their path (`v-if="image"`, `featuredImg?.image`), counter prefix/suffix on their value
- [x] Inline vs block text: `html` inputs with inline toolbars → `data-type="text"` on `<p>`/`<div>` hosts with `v-html`; terms `description` (lists, `p h4`) → `data-type="block"` on a `<div>`; plain text/textarea inputs → default `span`
- [x] Component prop contract: `Footer` takes the data file's keys as props; blocks take their item's keys
- [x] Cross-collection editable guard: n/a (no component renders both front matter items and queried items)
- [x] `<template>` blueprints: nav items (not inside a registered component) through `RawTemplate`; every other array is a sub-array of a re-rendered component that keeps its empty container
- [x] Data file input config: `file_config` for nav and footer reaches every bound key

Nuxt items

- [x] Collection and data file config unchanged from Phase 2
- [x] Regions inside the root (checked on all 19 pages)
- [x] Component names resolve: every `_type` in content and structure values (19) and `footer` are keys in `componentMap.ts`
- [x] Registered components take props: blocks and `Footer` have no `await`, query or import of data
- [x] Images in registered components sit in image regions bound to their path
- [x] Rich text hosts: every `text`/`block` region gets its HTML through `v-html` on the host; the post body renders `<ContentDoc />` inside the host
- [x] Blueprints through `RawTemplate`, never a `<template>` tag in an SFC
- [x] Spread props: `<component :is v-bind="block">`, `<Footer v-bind="footerData">` under `data-prop="@data[footer]"`

Page builder

- [x] Array wrapper: `data-editable="array" data-prop="content_blocks" data-component-key="_type"` (no `data-id-key`: same field)
- [x] Block items: `data-editable="array-item"` + `:data-component="block._type"` on a `<div>` the loop renders around each block; component roots stay plain
- [x] Widget nested editables and sub-arrays: per census
- [x] UI component variants: both branches of `general/header` (`remove_top_padding`), `general/feature` (`reversed`), pricing price (`has_discount`) and the FAQ's first/other items carry the same regions
- [x] Component keys match `_type`; all block types registered (shared `blockMap`, throw on unknown `_type` kept)
- [x] Build output: `/` has 1 `data-component-key`, 9 block `data-component`s, 36 `array-item`s

Pre-handoff sweep

- [x] Census walk-through: each row checked against the template
- [x] Shared-UI table: Header/Navigation → `data/nav.json`, primitive regions (§ Decisions); footer link columns → `data/footer.json`, links arrays, columns by index; footer credits → `copyright`; CTA, share block, author card, announcement bar → the site has none (the blog author is a free-text name, no card)
- [x] Build grep: every page has `@data[nav].items`, `@data[nav].button.text`, `@data[nav].logo`, `@data[footer]`, `copyright`, `sections.0.links`; posts have `@content` and both `@file[/content/blog/index.md]` labels

## Section census

Treatments per `cloudcannon-visual-editing/visual-editing.md § Section census`. In every block, paths are relative to the `content_blocks` item. Image regions sit on the `<img>` itself (`data-editable="image"`), so no wrapper changes the layout.

| Page | Section | Treatment | Binding plan | Data completeness | Justification |
| --- | --- | --- | --- | --- | --- |
| All pages | Root | `EditableRegions` | One root in `app.vue` around `<Nav>`, `<NuxtLayout>`, `<Footer>`; one in `error.vue` | — | — |
| All pages | Nav (`components/nav.vue`) | data-file (primitive regions) | Logo `data-prop-src="@data[nav].logo"`; menu `<ul>` `array` `@data[nav].items`, `<li>` `array-item`, `<editable-text data-prop="text">`, `RawTemplate` blueprint; button `<editable-text data-prop="@data[nav].button.text">` | Logo `alt` hardcoded (`Nav-Logo`) — content.md Q5. Link targets are `href`s → sidebar | — |
| All pages | Footer (`components/footer.vue`) | data-file + component | `app.vue` imports `data/footer.json`, renders `<editable-component data-component="footer" data-prop="@data[footer]"><Footer v-bind="footer"/>`; inside: `image` `logo`, `text` `copyright`, `array` `social`, columns bound by index `sections.N.title`, `array` `sections.N.links` with `text` | Logo `alt` hardcoded (`logo`) — content.md Q5. "Copyright <year>" stays code | Columns by index: the logo column and the link columns share one Bootstrap `.row`, and `.row > *` gives every column its gutter, so a `display: contents` array wrapper would drop it |
| All pages | Footer social icons | array (CRUD) inside the footer component | `social` array, `<li>` `array-item` | Icon is a class from a select; network name is screen-reader text | No visible text to put a region on; the icon select re-renders the footer |
| Pages (`content/*.md`) | Blocks loop (`components/Blocks.vue`) | array (page builder) | `<div data-editable="array" data-prop="content_blocks" data-component-key="_type">`; each block in `<div data-editable="array-item" :data-component="block._type">` | — | — |
| `/`, `/about/` | `home/hero` | component + text + image | `title` (h1), `description` (`<p v-html>`, `data-type="text"`), `button.text`, `image` + `image_alt` | All in content | — |
| `/`, `/about/` | `general/counter` | component + text + array | `title`, `title_suffix`, `description`; `numbers` array on `.counter-up-wrapper` (`data-direction="row"`), items: `number`, `text`, `prefix`, `suffix` | `alternate_style` → sidebar switch, re-render | — |
| `/` | `home/video` | component + image | `image` + `image_alt` | `video_url` is an `href` → sidebar | — |
| `/`, `/features/` | `general/header` | component + text | `title`, `title_suffix`, `description` in both `remove_top_padding` branches | Switch → sidebar | — |
| `/`, `/features/` | `general/feature` | component + text + image | `image`, `title`, `description`, `button.text` in both `reversed` branches | Switch → sidebar | — |
| `/`, `/features/` | `general/testimonial` | component + text + array | `title`, `title_suffix`, `description`; `slider` array on `.row`, items: `image`, `author`, `designation`, `message` | — | — |
| `/about/` | `about/hero` | component + text + array + image | `title`, `description`, `button.text`; `hero_images` array on a `display: contents` wrapper inside `.about-hero-two-banner` (static `.pattern` stays outside), items: `image` + `image_alt` | `placement` select → sidebar, re-render | — |
| `/about/` | `about/video` | component + text + image | `title`, `description`, `button.text`, `video.image` + `video.image_alt` | `video.link` is an `href` → sidebar | — |
| `/about/` | `about/team` | component + text + array | `title`; `team_members` array on `.row`, items: `image`, `name`, `designation` | — | — |
| `/features/` | `feature/hero` | component + text + image | `title`, `description`, `button.text`, `image` | — | — |
| `/pricing/` | `pricing/hero` | component + text | `title`, `description` | — | — |
| `/pricing/` | `pricing/table` | component + array | `pricing_tier` array on `.row`, items: `tier`, `description`, `price`, `discount_price`, `button.text`; `features` array on `<ul>`, items: `item` | `currency_symbol`, `highlight_tier`, `has_discount`, `active_feature` → sidebar, re-render | — |
| `/pricing/` | `general/faq` | component + text + array | `title`, `title_suffix`, `description`; `FAQ` array on `.accordion`, items: `title` (`p.header-content`), `description` (`.accordion-body`, `data-type="text"`) | Item number `0N` computed | — |
| `/contact/` | `contact/hero` | component + text | `title`, `description` | — | — |
| `/contact/` | `contact/form` | component + text | `address.heading`, `address.address`, `phone.heading`, `phone.cell`, `email.heading`, `email.email`, `form.heading`, `form.<field>.heading` ×4, `form.submit_button.text` | Placeholders are attributes → sidebar | — |
| `/privacy/` | `privacy/hero` | component + text | `title` | — | — |
| `/privacy/` | `privacy/terms-and-conditions` | component + array | `terms_and_conditions` array on `.scrollspy-example`, items: `heading`, `description` (`data-type="block"`) | Side menu repeats the headings as `#item<N>` links | Side menu: a second copy of the same headings inside links; edited through the sections, and the block re-renders it |
| `/login/` | `general/login` | component + text | `title`, `fullname.heading`, `email.heading`, `checkbox_text`, `forgot_password_button.text`, `log_in_button.text`, `divider_text`, `google_button_text`, `facebook_button_text`, `sign_up_button.text` | Placeholders and links → sidebar | — |
| `/signup/` | `general/signup` | component + text | `title`, `form.fullname.heading`, `form.email.heading`, `form.password.heading`, `form.retype_password.heading`, `form.checkbox_text`, `form.sign_up_text`, `form.divider_text`, `form.google_button_text`, `form.facebook_button_text`, `form.log_in_button.text` | Placeholders and links → sidebar | — |
| `/blog/` (`content/blog/index.md`) | Blog hero (`layouts/blog.vue`) | text | `title` (h1), `description` (`<p>`, textarea → `span`) | — | — |
| `/blog/` | Post grid, pagination | sidebar-only | — | Each card is another post's title, thumbnail and tags | Computed: a query sorted and limited by `pagination.size`; edited on each post. `pagination.size` → sidebar |
| `/tags/*`, `/blog/page/*` | Blog hero, filtered grid | none | — | Same blog index data | No file builds these pages, so the editor never opens them; the hero is edited on `/blog/` (audit census: No) |
| Blog posts | Title, author | text | `title` (h2), `<editable-text data-prop="author">` | — | — |
| Blog posts | "Written by:" label, "Recent Blog" heading | text, other file | `@file[/content/blog/index.md].author_label`, `@file[/content/blog/index.md].recent_posts_heading` | Values live in the blog index (Phase 3) | — |
| Blog posts | Date | sidebar-only | — | — | A date: luxon-formatted, and dates must not be text regions; datetime picker in the sidebar |
| Blog posts | Featured image | image | `data-prop-src="featuredImg.image" data-prop-alt="featuredImg.image_alt"` | — | — |
| Blog posts | Body | text (`@content`) | `data-editable="text" data-prop="@content"` on the existing wrapper `<div>`, `<ContentRenderer>` inside | Plain markdown, no MDC | — |
| Blog posts | Recent posts | sidebar-only | — | Other posts' titles and thumbnails | Computed: a query over the collection (first three by file order); each post is edited on its own page |
| Error page (`error.vue`) | Error block | none | — | Hardcoded in `error.vue` | Not a page editors open (no file builds it; audit census: No) |

## What changed

Setup:

- `package.json` / `package-lock.json`: `@cloudcannon/visual-editor-connector` removed; `@cloudcannon/editable-regions@^0.0.22` added to `dependencies`.
- `nuxt.config.js`: `vue.compilerOptions.isCustomElement`.
- `app.vue`: `<EditableRegions>` around the nav, layout and footer; imports `data/footer.json` and renders `<editable-component data-component="footer" data-prop="@data[footer]"><Footer v-bind="footerData"/>`. `error.vue`: the same.
- `plugins/cloudcannon.client.ts` (new): in editor mode only, a capture-phase click guard (a click on a text region inside a link or button doesn't navigate or submit), then the dynamic import of the registration file.
- `cloudcannon/registerComponents.ts` (new); `cloudcannon/componentMap.ts`: `componentMap` adds `footer`.
- `components/RawTemplate.vue` (new).

Connector:

- `pages/[...slug].vue`: connector calls, `onMounted`/`onBeforeUnmount` and the `blocks` ref removed.
- `components/Blocks.vue`: the array wrapper and per-block array-item `<div>`s; `:data-binding` removed.
- All 20 block components: `:data-cms-bind="dataBinding"` and the `dataBinding` prop removed. `components/test.vue` deleted.

Regions: every block component (per census), `components/nav.vue`, `components/footer.vue` (now props-only), `layouts/blog.vue`, `pages/blog/[slug].vue` (also `featuredImg?.image` guard).

Styles:

- `assets/style/components/_hero.scss`: `.about-hero-two-banner-images { display: contents }` — the `hero_images` array wrapper; the images stay absolutely positioned against the banner (all their rules are descendant selectors).
- `assets/style/components/_form.scss`: a `:has()` copy of `.contact-hero + .contact`, as its own rule. The block wrappers stop the two sections being siblings; without it the form loses its −28.2rem overlap with the hero.
- `assets/style/main.scss`: editor-only `.cms-editor-active [data-editable="array"]:empty` box, so an empty list (every array structure defaults to `[]`) has room for "Add item".

Docs: `.cloudcannon/README.md` gains "Editing on the page"; `README.md` names the plugin and registration file.

## Inputs

Every `data-prop` path checked against its input:

- Block fields: `title`, `title_suffix`, `button.text`, labels and headings → `text`; `description` → `html` with inline toolbar (`data-type="text"`); terms `description` → `html` with `p h4` and lists (`data-type="block"`); images → `image`, alts → `text`; counter `number`, pricing `price`/`discount_price` → `text`, values quoted.
- Item structures: `counter_numbers`, `testimonial_items`, `about_hero_images`, `team_members`, `pricing_tiers`, `pricing_features`, `faq_items`, `terms_sections`, `nav_links`, `footer_sections`, `social_links` — each bound key has an input.
- Blog: `title`, `author`, `author_label`, `recent_posts_heading` → `text`; `description` → `textarea` (span region); `featuredImg.image` → `image`.
- Data files: nav `logo`, `items[].text`, `button.text`; footer `logo`, `copyright`, `sections[].title`, `sections[].links[].text` — all in `file_config`.

## Build and baseline

Clean build (`.nuxt`, `.output`, `dist` deleted), `npm run generate`: exit 0, 19 pages (same list). `ERROR`/`WARN` lines, with timestamps and pids normalised, are identical to `.cloudcannon/migration/generate.log` (two Node deprecations, payload extraction, `<NuxtLayout>` in `app.vue`, Browserslist, the footer's `/404` and its four content queries). `npx @cloudcannon/cli validate`: exit 0, 25 files valid.

Text / `<img>` / inline-style snapshot (`temp/snap.cjs` against `temp/snap1.json`): image counts and inline styles identical on every page. Text identical on every page except `/pricing/`, which is Phase 3's (`**USD**` → bold, `&#39;` → `'`). `snap.cjs` turns every tag into a space, so `$<editable-text>0</editable-text>` reads as `$ 0`; the HTML has no space there and the page renders `$0`.

Body markup (`temp/markup.cjs`, then region attributes, `<editable-text>`/`<editable-component>` tags and `<template>` blueprints removed, whitespace next to tags ignored). Every remaining difference:

- From this phase: one `<div>` per page (the `EditableRegions` root); on block pages one array `<div>` plus one `<div>` per block; on `/about/` the `about-hero-two-banner-images` wrapper; `data-cms-bind` gone from every block root.
- From Phase 2/3 (recorded in content.md): image `alt`s from content; pricing `deactive` icons, `<strong>USD</strong>`, `'`; `/` gains the default layout's `<div>`; the footer's `/about`, `/contact`, `/features`, `/pricing` links lose `router-link-active`; canonical URLs on those four pages end in `/`.

Before stripping, the added attributes are only `data-editable`, `data-prop*`, `data-type`, `data-component(-key)`, `data-direction`, the `<editable-*>` elements and the nav blueprint `<template>` — counted per page in § Checklist.

Compiled CSS (`entry.*.css`, rules sorted): three added rules, the ones in § What changed; nothing removed. `ProseCode` CSS byte-identical.

The registration chunk (`registerComponents.*.js`, 679 bytes) appears on pages only as a `<link rel="prefetch">`, which Nuxt 3.5 adds for every dynamic import; it never runs outside the editor. Entry JS grows 4 KB (the `EditableRegions` root and the editor-only plugin).

## Decisions and why

- **One root in `app.vue`, not in each layout.** The site renders `<Nav>` and `<Footer>` in `app.vue` around `<NuxtLayout>`, so a root in `layouts/default.vue` and `layouts/blog.vue` would leave the nav and footer regions outside it. `error.vue` renders its own nav and footer, so it gets its own root.
- **Nav: primitive `@data[nav]` regions, not a component** (nuxt/visual-editing-reference.md § Registered components, rule 2). Each field maps to one element; only `href`s are computed, and they show after a rebuild. Re-rendering the nav would also reset the classes `script.js` adds (`sticky-nav`, `bg-nav`). The shared-UI table's "data-file + component" default gives way to the Nuxt rule.
- **Footer: registered component under `@data[footer]`** (rule 3). Its output is computed (icon classes, the year before the copyright), so `app.vue`/`error.vue` load the data and pass it as props.
- **Footer columns bound by index.** The logo column and the link columns are siblings in one Bootstrap `.row`, whose `.row > *` rule gives each column its gutter padding; an array wrapper (even `display: contents`) stops that rule matching. Editors edit column headings and links on the page and add or reorder whole columns in Data → Footer.
- **Image regions on the `<img>`**, not `<editable-image>` wrappers, so no element is added inside banners and cards. The Nuxt doc's wrapper form is equivalent (editable-regions.md § Image editing).
- **`hero_images` gets a `display: contents` wrapper** rather than bind-by-index: the images use only descendant selectors, so the wrapper changes nothing visible, and editors keep add/remove/reorder.
- **Terms side menu has no regions.** It repeats each section's `heading` as an anchor link; the sections carry the regions, and the block re-renders the menu.
- **Editor click guard in the plugin.** Many text regions sit in links (nav, CTAs) and submit buttons (login, sign-up, contact). Without it a click navigates the preview or submits a form that posts back to the page. The guard runs only in the editor; the FAQ still opens on click because Bootstrap's toggle doesn't check `defaultPrevented`.
- **Blog post labels through `@file[/content/blog/index.md]`.** "Written by:" and "Recent Blog" live in the blog index (Phase 3), so a region bound to the post would write to the wrong file.
- **Blog listing grid and recent posts: no regions.** Both are queries (sorted, limited) over other posts; each post is edited on its own page. The audit census marked them leave-as-code.
- **Contact `:has()` rule kept separate** from the original selector, so a browser without `:has()` doesn't drop both.

Content v2 adaptations of v3-oriented guidance:

- **`<ContentDoc />` stays inside the `@content` host** in place of `<ContentRenderer :value>`. In v2, `ContentDoc` also sets the page head from the document (`useContentHead`); swapping it changed every post's `<title>` and meta description (tested, then reverted). It renders the same `ContentRenderer` body.
- **`@file` path is the repository path with extension** (`/content/blog/index.md`). v2 has no collection ids; the file the editor writes is the file on disk.
- **Blog hero regions use relative paths** (`title`, `description`). In document-driven v2, `/blog/` is built from `content/blog/index.md`, which is the file open in the editor there; the tag and pagination pages that share the layout have no file and are never opened.
- **Paths at the root** (`plugins/`, `cloudcannon/`, `components/`): Nuxt 3 without `app/`.

## Open questions

1. **`@file[...]` on blog posts.** Default: `@file[/content/blog/index.md].author_label` and `.recent_posts_heading`. Phase 5's editor test should confirm that clicking "Written by:" on a post edits the Blog Index. If it errors, the fallback is to drop those two regions and edit the labels on the Blog Index in the sidebar.
2. **Global jQuery bindings after a re-render.** `script.js` binds Magnific Popup (`.popup-vimeo`) and the password toggle (`.viewPassword`) once at load; after an edit re-renders `home/video`, `about/video` or `general/signup`, the play button opens the Vimeo link in the preview instead of a popup, and the eye icon stops toggling. Default: leave (preview-only; production is unaffected). Binding them by delegation from `document` would fix it.
3. **Footer link columns on the page.** Default: columns by index (add/remove/reorder in Data → Footer). Moving the logo column out of the `.row`, or copying Bootstrap's `.row > *` gutter rules onto a wrapper, would allow on-page column CRUD at the cost of a markup/CSS change.
4. **Nav and footer logo `alt`.** Still hardcoded (content.md Q5). Default: leave.
5. **Browsers without CSS anchor positioning.** The runtime then sets `position: relative` on every array item, which would pull the absolutely positioned `about/hero` images into flow inside the editor. Default: leave (preview-only); check the About page in Phase 5's editor test.
6. **Click guard.** Default: on. Remove it from `plugins/cloudcannon.client.ts` if editors would rather follow links in the preview than edit their text there.
