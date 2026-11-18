# sendit-nuxt feedback

## Run notes

- `npx @cloudcannon/cli configure detect-ssg` returns "other" for this Nuxt site, with every score at 0. The agent had to work out the SSG from `package.json`.
- Decisions the user made: stay on Nuxt Content v2; Node 18 replaces the `nvm use 16` pin.
- `@cloudcannon/editable-regions` declares Node 20.19 or later, which conflicts with the Node 18 pin. `npm ci` warns, but the build still works.

## User testing

- On `cloudcannon dev`, every page in the Visual Editor shows the site's own 404 page (nav and footer present). Likely cause: the dev server serves the build under `/__output/`, so after hydration Nuxt's router sees `/__output/about/index.html`, and Content v2 document-driven mode (`documentDriven: true`) finds no document for that path. Nuxt's dev server returns 404 for `/__output/about/index.html` and 200 for `/about/`. Not a migration fault if hosting renders normally. The `cloudcannon-dev-server` skill doesn't mention client-routed frameworks and the `/__output/` prefix. content-wind (Content v3) didn't show this on its home page, and it's not yet clear why.
