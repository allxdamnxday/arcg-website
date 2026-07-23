// Curated design-system entry for the claude.ai/design sync.
// Re-exports only the presentational primitives that make sense as standalone,
// on-brand building blocks. The app-coupled components (Nav, PageHero, Reveal,
// forms, scroll utilities) are intentionally excluded — they depend on Next
// routing, GSAP, or API routes and aren't reusable design-system parts.
// Source of truth stays src/components/*; this file only selects and names.
export { default as Button } from "../src/components/Button";
export { default as Section } from "../src/components/Section";
export { default as SectionHeader } from "../src/components/SectionHeader";
export { default as GlassGrid } from "../src/components/GlassGrid";
