import type { ReactNode } from "react";

type Tone = "light" | "warm" | "navy" | "navy-deep";
type Size = "sm" | "md" | "lg" | "xl";

interface SectionProps {
  size?: Size;
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
  as?: "section" | "div";
}

// Vertical rhythm law: sm = strips/bars, md = default content section,
// lg = full-bleed statement sections (dark capability blocks), xl = final page
// CTA only (one xl per page max).
const PAD_Y: Record<Size, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-36",
  xl: "py-32 md:py-44",
};

const TONE: Record<Tone, string> = {
  light: "",
  warm: "bg-warm",
  // Subtle top-to-bottom depth on dark sections — part of the tonal ladder.
  navy: "bg-gradient-to-b from-navy to-navy-deep text-white",
  "navy-deep": "bg-navy-deep text-white",
};

const CONTAINER_X = "px-6 md:px-12 lg:px-20";

export default function Section({
  size = "md",
  tone = "light",
  id,
  className,
  children,
  as: As = "section",
}: SectionProps) {
  const cls = [CONTAINER_X, PAD_Y[size], TONE[tone], className].filter(Boolean).join(" ");
  return (
    <As id={id} className={cls}>
      {children}
    </As>
  );
}
