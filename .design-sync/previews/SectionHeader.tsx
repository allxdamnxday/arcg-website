import { SectionHeader } from "arcg-website";

// Default — tag, Bebas Neue title, and a supporting line on a light surface.
export function Default() {
  return (
    <SectionHeader
      tag="Capabilities"
      title="Unitized curtain wall, engineered to spec"
      subtitle="Shop-fabricated panels sequenced to the hoist schedule and set by our own union glaziers."
    />
  );
}

// Centered with a hairline rule above the tag — used to open full-bleed sections.
export function Centered() {
  return (
    <SectionHeader
      align="center"
      lineAbove
      tag="Contract glazing"
      title="Built for the field"
      subtitle="Design-assist through punch, with the crews and the shop under one roof."
    />
  );
}

// Display size — the large hero heading (text-display).
export function Display() {
  return <SectionHeader titleSize="lg" tag="Selected work" title="Glass that carries the elevation" />;
}

// Dark tone — white title and azure accent for navy and photo backgrounds.
export function OnDark() {
  return (
    <div style={{ background: "var(--color-navy-deep)", padding: 40, borderRadius: 4 }}>
      <SectionHeader
        tone="dark"
        tag="At height"
        title="High-rise curtain wall"
        subtitle="Swing-stage and mast-climber access, delivered on the GC's schedule."
      />
    </div>
  );
}
