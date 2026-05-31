import type { CSSProperties } from "react";

interface GlassGridProps {
  /** Mullion spacing in px. cellX = vertical mullion pitch, cellY = horizontal. */
  cellX?: number;
  cellY?: number;
  /** Line color — any CSS color. Defaults to azure accent. */
  color?: string;
  /** Layer opacity (the lines render solid; this fades the whole grid). */
  opacity?: number;
  lineWidth?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Curtain-wall mullion grid — the brand's ownable motif. A pure-CSS hairline
 * lattice (no DOM nodes) that frames glass like a unitized facade. Absolutely
 * positioned; the parent must be `relative`. Decorative only (aria-hidden).
 */
export default function GlassGrid({
  cellX = 68,
  cellY = 112,
  color = "var(--color-accent)",
  opacity = 0.14,
  lineWidth = 1,
  className,
  style,
}: GlassGridProps) {
  const vertical = `repeating-linear-gradient(to right, ${color} 0, ${color} ${lineWidth}px, transparent ${lineWidth}px, transparent ${cellX}px)`;
  const horizontal = `repeating-linear-gradient(to bottom, ${color} 0, ${color} ${lineWidth}px, transparent ${lineWidth}px, transparent ${cellY}px)`;
  return (
    <div
      aria-hidden="true"
      className={["pointer-events-none absolute inset-0", className].filter(Boolean).join(" ")}
      style={{ opacity, backgroundImage: `${vertical}, ${horizontal}`, ...style }}
    />
  );
}
