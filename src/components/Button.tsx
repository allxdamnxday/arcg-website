import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "white";
type Size = "md" | "sm";

type SharedProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = SharedProps & {
  href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps | "href"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps | "href">;

const BASE =
  "inline-flex items-center justify-center font-semibold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const SIZE: Record<Size, string> = {
  md: "px-10 py-4 text-sm",
  sm: "px-6 py-3 text-xs",
};

const VARIANT: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-steel focus-visible:ring-navy/40",
  ghost: "border-2 border-navy text-navy hover:bg-navy hover:text-white focus-visible:ring-navy/40",
  white: "bg-white text-navy hover:bg-steel hover:text-white focus-visible:ring-white/60",
};

function classes(variant: Variant, size: Size, extra?: string) {
  return [BASE, SIZE[size], VARIANT[variant], extra].filter(Boolean).join(" ");
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  href,
  type,
  disabled,
  ...rest
}: ButtonProps) {
  const cls = classes(variant, size, className);

  if (href) {
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a href={href} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      className={cls}
      disabled={disabled || loading}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
