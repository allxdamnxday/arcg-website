import { Button } from "arcg-website";

const row = { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" } as const;

// Primary — the default call to action on light surfaces.
export function Primary() {
  return (
    <div style={row}>
      <Button variant="primary">Request a bid</Button>
      <Button variant="primary" size="sm">View line card</Button>
    </div>
  );
}

// Ghost — secondary action, outlined navy on light surfaces.
export function Ghost() {
  return (
    <div style={row}>
      <Button variant="ghost">Our capabilities</Button>
      <Button variant="ghost" size="sm">Download spec</Button>
    </div>
  );
}

// White / ghost-light — the two variants built for navy and photo backgrounds.
export function OnDark() {
  return (
    <div style={{ ...row, background: "var(--color-navy-deep)", padding: 32, borderRadius: 4 }}>
      <Button variant="white">Start your project</Button>
      <Button variant="ghost-light">Talk to the shop</Button>
    </div>
  );
}

// States — loading spinner, disabled, and an external mailto link.
export function States() {
  return (
    <div style={row}>
      <Button variant="primary" loading>Submitting</Button>
      <Button variant="primary" disabled>Bidding closed</Button>
      <Button variant="ghost" href="mailto:estimating@arcontractglazing.com">Email estimating</Button>
    </div>
  );
}
