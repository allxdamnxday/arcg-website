import { Section, SectionHeader } from "arcg-website";

// Light — the default content tone.
export function Light() {
  return (
    <Section size="sm" tone="light">
      <SectionHeader
        tag="Scope"
        title="Curtain wall & storefront"
        subtitle="Unitized systems, window wall, and architectural glass for commercial builds."
      />
    </Section>
  );
}

// Warm — a subtle off-white shift to separate stacked light sections.
export function Warm() {
  return (
    <Section size="sm" tone="warm">
      <SectionHeader
        tag="Process"
        title="Design-assist to close-out"
        subtitle="We price it, engineer it, fabricate it, and set it — one accountable crew."
      />
    </Section>
  );
}

// Navy — the navy→navy-deep gradient statement block; pairs with a dark header.
export function Navy() {
  return (
    <Section size="sm" tone="navy">
      <SectionHeader
        tone="dark"
        tag="Capabilities"
        title="Engineered to spec"
        subtitle="Thermally-broken systems, sequenced to the hoist and set by union glaziers."
      />
    </Section>
  );
}

// Navy-deep — the darkest floor, used to anchor the bottom of a page.
export function NavyDeep() {
  return (
    <Section size="sm" tone="navy-deep">
      <SectionHeader
        tone="dark"
        tag="Get in touch"
        title="Start your project"
        subtitle="Send drawings and a schedule; we'll turn a budget number around fast."
      />
    </Section>
  );
}
