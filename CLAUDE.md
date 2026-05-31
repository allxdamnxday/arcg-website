# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Next.js dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve the production build
```

No linter, test runner, or typecheck script is configured. Type errors surface via `npm run build` (and the editor's `next` TS plugin).

## Stack

Marketing site for AR Contract Glazing. Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · GSAP for animation · Resend for the contact form. Import alias `@/*` → `src/*`.

## Architecture

### Server pages + `<Reveal>` islands; metadata via sibling `layout.tsx`

Static content pages — about, careers, services, projects — are **Server Components**. Animation is isolated in the `<Reveal>` client island (see GSAP section), so the page itself stays server-rendered. Only **home** (bespoke hero timeline) and **contact** (form state) keep `"use client"`. Server pages can export `metadata` directly, but to keep one consistent convention, about/careers/services/projects/contact still put per-page SEO in a co-located **server** `layout.tsx` that exports `metadata` and renders `children` unchanged — see [src/app/services/layout.tsx](src/app/services/layout.tsx) (`title`, `description`, `alternates.canonical`). The dynamic project route is the exception: it exports `generateMetadata` in-page (see Project content model). When adding a page, add both files. Global metadata (title template, OpenGraph, `metadataBase`) is set once in [src/app/layout.tsx](src/app/layout.tsx).

### Tailwind v4 — theme lives in CSS, not a config file

There is no `tailwind.config.js`. Design tokens are defined in the `@theme` block of [src/app/globals.css](src/app/globals.css), which is what generates the brand color utilities used everywhere: `navy`, `navy-deep`, `steel`, `silver`, `silver-dark`, `glass`, `warm` (e.g. `text-navy`, `bg-warm`, `border-glass`). Add or change colors there. Fonts (`Inter` body, `Bebas Neue` display) are loaded with `next/font/google` in [src/app/layout.tsx](src/app/layout.tsx) and exposed as CSS variables (`--font-inter`, `--font-bebas`) on `<html>`; globals.css points `body` and `.font-bebas` at those variables. Use `next/font` (not a CDN `@font-face`) when adding fonts — it self-hosts the files and avoids layout shift.

### GSAP animation convention

Scroll/entrance animation is centralized in the **[`<Reveal>`](src/components/Reveal.tsx)** client component. It wraps children in a ref'd `<div>` and runs the standard pattern internally: `gsap.matchMedia()` gated on `(prefers-reduced-motion: no-preference)`, a ref-scoped `gsap.context()`, and cleanup via `ctx.revert()` / `mm.revert()`. Props: `variant` (`fade-up` | `stagger` | `clip`), `y`, `start`, `delay`, and **`immediate`** (omit the ScrollTrigger and play on mount — required for above-the-fold content like a hero overlay, which otherwise mis-evaluates its trigger and stays invisible). Reach for `<Reveal>` for new animated blocks; this is what lets the static pages stay Server Components.

Two surfaces keep bespoke `useEffect` timelines instead of `<Reveal>` (same matchMedia + context + revert pattern): the **home** hero/stat-counter sequence in [src/app/page.tsx](src/app/page.tsx) (className hooks `.hero-line`, `.stat-num`, `.section-reveal`, `.h-line`, etc.) and the **[PageHero](src/components/PageHero.tsx)** load timeline. Preserve the reduced-motion gating and cleanup when editing any of them. (The old CSS-only fallback classes `.reveal-text` / `.line-grow` / `.stagger-in` were dead and have been removed — don't reintroduce them.)

### Shared primitives (`src/components/`)

- **[Button.tsx](src/components/Button.tsx)** — `variant` (primary/ghost/white) × `size`. Renders a `<Link>` for internal `href`, a plain `<a>` for external (`http`/`mailto`/`tel`), or a `<button>` when no `href`. Use this rather than hand-rolling buttons/links.
- **[Section.tsx](src/components/Section.tsx)** — standard vertical padding + `tone` background + the shared horizontal container padding (`px-6 md:px-12 lg:px-20`).
- **[SectionHeader.tsx](src/components/SectionHeader.tsx)** — tag/title/subtitle with light/dark tone.
- **Nav.tsx** is fixed and transparent only at the top of the homepage (opaque elsewhere and after scroll).

### Content sources of truth

Two typed `src/lib` modules are the single source for repeated content; pages import from them rather than hardcoding:

- **[src/lib/services.ts](src/lib/services.ts)** — typed `Service[]`. Both the home services section and [services/page.tsx](src/app/services/page.tsx) import it (home renders a teaser subset). Edit a service once here.
- **[src/lib/projects.ts](src/lib/projects.ts)** — typed `Project[]` plus `getProject(slug)` and `getFeaturedProjects()`. The home "Selected Work" section derives from `getFeaturedProjects()`.

The dynamic route [src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx) is a **Server Component** with proper SSG: `generateStaticParams()` (from project slugs), async `generateMetadata({ params })` (per-project title/description/canonical), and `notFound()` for unknown slugs (a real 404, not a 200). Prev/next links are computed server-side from array order. Note: the **Projects nav link and route are intentionally hidden** until real photography is ready (commented out in Nav.tsx; `/projects` is absent from sitemap; both the index and detail routes carry `robots: { index: false }`; images are Unsplash placeholders — see the TODO in projects.ts). Remove the `noindex` staging when real photos land.

### Contact form

[src/app/api/contact/route.ts](src/app/api/contact/route.ts) is a `nodejs`-runtime POST handler that emails via Resend. It includes a **honeypot** (`website` field — if filled, it returns `ok` without sending) and HTML-escapes every field before composing the email. Requires `RESEND_API_KEY`; `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` are optional overrides.

### SEO / domain

The production domain `https://arcontractglazing.com` is hard-coded in three places: [src/app/layout.tsx](src/app/layout.tsx) (`metadataBase`), [src/app/sitemap.ts](src/app/sitemap.ts), and [src/app/robots.ts](src/app/robots.ts). Update all three together if the domain changes. Remote images are restricted to `images.unsplash.com` in [next.config.ts](next.config.ts) — add hostnames there before using images from new sources.

## Environment variables

| Var | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes (contact form) | Resend API auth; without it the route returns 500 |
| `CONTACT_TO_EMAIL` | no | Inbox for inquiries (default `info@arcontractglazing.com`) |
| `CONTACT_FROM_EMAIL` | no | From header (default `onboarding@resend.dev`) |
