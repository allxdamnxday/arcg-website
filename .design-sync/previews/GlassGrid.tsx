import { GlassGrid } from "arcg-website";

// On navy — the default azure mullion lattice over a dark surface (the brand motif).
export function OnNavy() {
  return (
    <div style={{ position: "relative", height: 240, background: "var(--color-navy-deep)", overflow: "hidden", borderRadius: 4 }}>
      <GlassGrid />
      <div style={{ position: "relative", padding: 36, color: "#fff" }}>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent)" }}>
          Ownable motif
        </p>
        <p className="font-bebas" style={{ margin: "8px 0 0", fontSize: 40, lineHeight: 0.95 }}>
          Curtain-wall mullions
        </p>
      </div>
    </div>
  );
}

// Steel on light — muted lines for light surfaces (never above 0.2 opacity).
export function SteelOnLight() {
  return (
    <div style={{ position: "relative", height: 240, background: "var(--color-warm)", overflow: "hidden", border: "1px solid var(--color-glass)", borderRadius: 4 }}>
      <GlassGrid color="var(--color-steel)" opacity={0.18} cellX={48} cellY={80} />
      <div style={{ position: "relative", padding: 36 }}>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-ink)" }}>
          Tuned for light
        </p>
        <p className="font-bebas" style={{ margin: "8px 0 0", fontSize: 40, lineHeight: 0.95, color: "var(--color-navy)" }}>
          Tighter pitch, steel hairlines
        </p>
      </div>
    </div>
  );
}
