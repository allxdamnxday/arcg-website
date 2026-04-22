import type { ReactNode } from "react";

type Tone = "light" | "warm" | "navy" | "navy-deep";
type Size = "sm" | "md" | "lg";

interface SectionProps {
  size?: Size;
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
  as?: "section" | "div";
}

const PAD_Y: Record<Size, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-36",
};

const TONE: Record<Tone, string> = {
  light: "",
  warm: "bg-warm",
  navy: "bg-navy text-white",
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
