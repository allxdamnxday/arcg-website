# AR Contract Glazing — design system conventions

A small set of on-brand primitives extracted from the ARCG marketing site
(`arcontractglazing.com`). Four components on `window.ARCG`: **Button**,
**Section**, **SectionHeader**, **GlassGrid**. Commercial-glazing brand:
deep navy, azure accent, condensed Bebas Neue display type over Inter body.

## Setup — no provider, just the stylesheet

Components are plain React with **no context or provider wrapper**. The only
requirement is that the design system's `styles.css` closure is loaded — it
`@import`s `_ds_bundle.css` (the compiled Tailwind utilities + brand tokens)
and the brand fonts (Inter, Bebas Neue). Without it components render unstyled.

`Button` renders a `<button>` by default, or an `<a>` when given `href`
(internal paths and `http`/`mailto`/`tel` alike — there is no client router in
this bundle, so every `href` is a plain anchor).

## Styling idiom — Tailwind-preset utilities + brand tokens

This is a **Tailwind CSS v4 preset**. Style your own layout glue with these
brand utility classes (the ones the components ship) and the full token set.

| Purpose | Vocabulary |
|---|---|
| Surfaces | `bg-navy`, `bg-navy-deep`, `bg-warm`, `bg-white`; dark gradient `bg-gradient-to-b from-navy to-navy-deep` |
| Text color | `text-navy`, `text-white`, `text-accent` (azure — **dark surfaces only**), `text-accent-ink` (azure that passes WCAG on light) |
| Borders | `border-navy`, `border-white` |
| Display type | `text-display`, `text-h1` + `font-bebas` (Bebas Neue); body text is Inter by default |
| Kicker label | `eyebrow` (xs, uppercase, wide tracking) |

**Full token palette** is available as CSS variables for anything not covered
by a utility: colors `var(--color-{navy,navy-deep,ink,navy-raised,steel,steel-ink,silver,silver-dark,glass,warm,accent,accent-ink})`;
type scale `var(--text-{display,h1,h2,h3})`; fonts `var(--font-{inter,bebas,sans})`;
easings `var(--ease-out-quart)`, `var(--ease-glass)`. Prefer these vars over
inventing new Tailwind classes — the shipped stylesheet only contains the
utilities the four components already use.

**Brand laws** (baked into the components; follow them in your own markup too):
- Azure `accent` is for hairlines, glows, and text **on dark surfaces**; on
  light surfaces use `accent-ink` for any accent text/link. Plain `accent`
  fails contrast as text on white.
- `Button` `variant="white"` / `"ghost-light"` are **only** for navy or photo
  backgrounds; `primary` / `ghost` are for light.
- `Section` `tone="navy"` is a navy→navy-deep gradient and sets white text;
  pair it with `SectionHeader tone="dark"`.
- `GlassGrid` (the curtain-wall mullion motif): `accent` lines on dark, `steel`
  on light, never above `opacity` 0.2 on light. Deploy sparingly as an accent.

## Where the truth lives

Read the bound `styles.css` and the `_ds_bundle.css` it imports for the exact
tokens and utilities. Each component's `.prompt.md` has usage notes and its
`.d.ts` is the prop contract — read those before composing a component.

## Idiomatic example

```tsx
import { Section, SectionHeader, Button } from "window.ARCG";

<Section tone="navy" size="lg">
  <SectionHeader
    tone="dark"
    tag="Capabilities"
    title="Unitized curtain wall, engineered to spec"
    subtitle="Shop-fabricated panels, set by our own union glaziers."
  />
  <div className="mt-8 flex gap-4">
    <Button variant="white">Request a bid</Button>
    <Button variant="ghost-light">Our capabilities</Button>
  </div>
</Section>
```
