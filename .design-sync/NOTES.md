# design-sync notes — ARCG

## What this is
This repo is a **Next.js marketing app, not a component library**, so the
design-sync converter runs in an **off-script / synth-entry** configuration.
We sync four presentational primitives (Button, Section, SectionHeader,
GlassGrid) as an on-brand design system to claude.ai/design under
`window.ARCG`. App-coupled components (Nav, PageHero, Reveal, forms, scroll
utilities) are intentionally excluded — they depend on Next routing, GSAP, or
API routes and aren't reusable design-system parts.

## Build is deterministic but needs three repo-specific pre-steps
The scratch tooling under `.ds-sync/` and the worktree `node_modules/next`
shim are **gitignored and recreated per clone**. Before any build on a fresh
clone / new machine:

1. **Stage + install converter deps** (from repo root):
   ```sh
   BASE="<design-sync skill dir>"   # …/bundled-skills/<ver>/<hash>/design-sync
   mkdir -p .ds-sync && cp -r "$BASE"/package-build.mjs "$BASE"/package-validate.mjs "$BASE"/package-capture.mjs "$BASE"/resync.mjs "$BASE"/lib "$BASE"/storybook .ds-sync/
   echo '{"name":"ds-sync-deps","private":true}' > .ds-sync/package.json
   (cd .ds-sync && npm i esbuild ts-morph @types/react react react-dom @tailwindcss/cli @fontsource-variable/inter @fontsource/bebas-neue && npm i -D playwright)
   ```
2. **next/link shim** — the components' only runtime dep esbuild can't resolve.
   The real Next `<Link>` needs App Router context; a DS Link is just an `<a>`.
   Create `node_modules/next/{package.json,link.js}` at the **worktree root**
   (nearest-ancestor resolution wins over the main repo's real `next`). The
   shim's `link.js` default-exports `({href,children,...rest}) => createElement("a",{href,...rest},children)`.
   NOTE: this worktree lives inside the main repo, which HAS a real `next`
   install — the shim MUST out-rank it, so it must sit in the nearest
   `node_modules` above `src/components/`.
3. **Compile the Tailwind stylesheet** (cfg.cssEntry is a generated artifact —
   the repo ships Tailwind *source*, not compiled CSS). Re-run whenever a
   synced component or a preview changes:
   ```sh
   node .ds-sync/node_modules/@tailwindcss/cli/dist/index.mjs -i .design-sync/assets/ds.input.css -o .design-sync/assets/ds.css
   ```
   `ds.input.css` mirrors `src/app/globals.css`'s `@theme` (kept in sync by
   hand) and uses `@theme static` so the full brand token palette ships to
   `:root`, plus `--font-{inter,bebas,sans}` (the app injects these via
   next/font; here they resolve to the vendored woff2).

## Fonts
Inter (variable) + Bebas Neue woff2 are vendored from
`@fontsource-variable/inter` / `@fontsource/bebas-neue` into
`.design-sync/assets/fonts/` (committed) and declared in
`.design-sync/assets/fonts.css` (cfg.extraFonts). These are the real brand
faces; substitutes were not used.

## Build / verify / (re)sync command
After the three pre-steps, one driver run does build → diff → validate →
capture:
```sh
node .ds-sync/resync.mjs --config .design-sync/config.json \
  --node-modules .ds-sync/node_modules --entry .design-sync/entry.tsx \
  --out ./ds-bundle [--remote .design-sync/.cache/remote-sync.json]
```
Omit `--remote` on the first sync (no uploaded anchor yet). playwright 1.61.1
pins chromium build **1228**, which was already in this machine's
`~/AppData/Local/ms-playwright` cache — no browser download was needed.

## Upload status — DONE (first sync complete)
Uploaded to claude.ai/design project **ARCG Design System**
(`projectId 425b02a3-a5f6-41cb-83c2-858764fdf957`, pinned in config.json). All
4 components + styles + fonts shipped; `package-validate` exits 0; render check
4/4 clean; all 14 authored cells graded `good`. This is now a **re-sync**
target — fetch its `_ds_sync.json` into `.design-sync/.cache/remote-sync.json`
and pass `--remote` to the driver.

NOTE on auth: `DesignSync` first returned *"needs design-system authorization …
/design-login requires an interactive terminal"* and only started working after
an MCP reconnect within the same session. If a future run hits that error,
retry after the session reconnects, or run from an interactive `claude`
terminal where `/design-login` works.

## Known render warns
None — render check reports 4/4 clean, all 14 authored cells graded `good`.

## Re-sync risks (watch-list)
- **ds.input.css `@theme` is a hand-maintained mirror of globals.css.** If the
  app changes a brand token/type-scale value in `src/app/globals.css`, update
  `.design-sync/assets/ds.input.css` to match and recompile, or the DS drifts
  from the site. (Only the synced tokens matter.)
- **Tailwind tree-shakes utilities** to those the 4 components + previews use.
  The shipped `_ds_bundle.css` is a *subset*; the full token palette is present
  as `var(--*)` (via `@theme static`), but new utility classes the components
  don't use won't be in the closure. conventions.md tells the design agent to
  prefer the vars.
- **Scope is 4 components by design.** Adding a primitive means: re-export it in
  `.design-sync/entry.tsx`, add it to `componentSrcMap` + `dtsPropsFor`, add
  `@source` if needed, author `.design-sync/previews/<Name>.tsx`, recompile CSS.
- The `next/link` shim and `.ds-sync/` are gitignored — recreate per clone
  (see pre-steps above).
- `.d.ts` prop contracts are **hand-written** in `cfg.dtsPropsFor` (no dist
  `.d.ts` exists to extract from). If a component's source props change, update
  the matching `dtsPropsFor` entry.
