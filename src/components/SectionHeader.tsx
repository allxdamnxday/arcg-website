import type { ReactNode } from "react";

type Tone = "light" | "dark";
type Align = "left" | "center";
type TitleSize = "md" | "lg";

interface SectionHeaderProps {
  tag?: string;
  title: string | ReactNode;
  subtitle?: string;
  lineAbove?: boolean;
  tone?: Tone;
  align?: Align;
  titleSize?: TitleSize;
  className?: string;
}

const TITLE_SIZE: Record<TitleSize, string> = {
  md: "text-h1",
  lg: "text-display",
};

export default function SectionHeader({
  tag,
  title,
  subtitle,
  lineAbove = false,
  tone = "light",
  align = "left",
  titleSize = "md",
  className,
}: SectionHeaderProps) {
  const titleColor = tone === "dark" ? "text-white" : "text-navy";
  const subtitleColor = tone === "dark" ? "text-white/60" : "text-gray-600";
  const lineColor = tone === "dark" ? "bg-white" : "bg-navy";
  const alignCls = align === "center" ? "text-center" : "";
  const lineMxCls = align === "center" ? "mx-auto" : "";

  return (
    <div className={[alignCls, className].filter(Boolean).join(" ")}>
      {lineAbove && <div className={`h-px ${lineColor} w-12 mb-6 ${lineMxCls}`} />}
      {tag && (
        <p className={`eyebrow mb-4 ${tone === "dark" ? "text-accent" : "text-accent-ink"}`}>{tag}</p>
      )}
      <h2 className={`section-reveal font-bebas ${TITLE_SIZE[titleSize]} ${titleColor} text-balance`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg ${subtitleColor} max-w-lg mt-6 leading-relaxed`}>{subtitle}</p>
      )}
    </div>
  );
}
