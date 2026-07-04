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
  "inline-flex items-center justify-center min-h-[44px] font-semibold uppercase tracking-widest transition-[background-color,color,border-color,transform] duration-200 ease-out-quart active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const SIZE: Record<Size, string> = {
  md: "px-10 py-4 text-sm",
  sm: "px-6 py-3 text-xs",
};

// Hover uses steel-ink (white-on-steel-ink = 5.93:1) not steel (4.31:1). Focus
// rings use accent-ink on light variants; the white variant only appears on navy
// sections, where accent is 6.48:1.
const VARIANT: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-steel-ink active:bg-navy-deep focus-visible:ring-accent-ink",
  ghost: "border-2 border-navy text-navy hover:bg-navy hover:text-white active:bg-navy-deep active:text-white focus-visible:ring-accent-ink",
  white: "bg-white text-navy hover:bg-steel-ink hover:text-white active:bg-navy focus-visible:ring-accent",
};

function Spinner() {
  return (
    <svg aria-hidden="true" className="animate-spin h-4 w-4 mr-3" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

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
      aria-busy={loading || undefined}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
