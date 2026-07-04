"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Variant = "fade-up" | "stagger" | "clip" | "glass" | "line";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  y?: number;
  start?: string;
  delay?: number;
  /** Play on mount instead of on scroll. Use for above-the-fold (hero) content. */
  immediate?: boolean;
  /** Continuous scrubbed parallax, in yPercent (e.g. -12). Pair with clip/glass, not fade-up. */
  parallax?: number;
  /** Anchor id passed through to the rendered wrapper. */
  id?: string;
  className?: string;
  style?: CSSProperties;
}

export default function Reveal({
  children,
  variant = "fade-up",
  y = 40,
  start = "top 80%",
  delay = 0,
  immediate = false,
  parallax,
  id,
  className,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const scrollTrigger = immediate ? undefined : { trigger: el, start };
        if (variant === "stagger") {
          gsap.from(el.children, {
            opacity: 0,
            y,
            duration: 0.8,
            stagger: 0.09,
            delay,
            ease: "power3.out",
            scrollTrigger,
          });
        } else if (variant === "clip") {
          gsap.from(el, {
            clipPath: "inset(100% 0 0 0)",
            duration: 1.2,
            delay,
            ease: EASE.struct,
            scrollTrigger,
          });
        } else if (variant === "glass") {
          // Panel seating into its mullion frame: a clean left-to-right wipe.
          gsap.from(el, {
            clipPath: "inset(0 0 0 100%)",
            duration: 1.1,
            delay,
            ease: EASE.struct,
            scrollTrigger,
          });
        } else if (variant === "line") {
          // Structural rule drawing itself in from the left.
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.1,
            delay,
            ease: EASE.struct,
            scrollTrigger,
          });
        } else {
          gsap.from(el, {
            opacity: 0,
            y,
            duration: 0.8,
            delay,
            ease: "power3.out",
            scrollTrigger,
          });
        }

        if (parallax) {
          gsap.to(el, {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [variant, y, start, delay, immediate, parallax]);

  return (
    <div ref={ref} id={id} className={className} style={style}>
      {children}
    </div>
  );
}
