"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Variant = "fade-up" | "stagger" | "clip";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  y?: number;
  start?: string;
  delay?: number;
  /** Play on mount instead of on scroll. Use for above-the-fold (hero) content. */
  immediate?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function Reveal({
  children,
  variant = "fade-up",
  y = 50,
  start = "top 80%",
  delay = 0,
  immediate = false,
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
            stagger: 0.1,
            delay,
            ease: "power3.out",
            scrollTrigger,
          });
        } else if (variant === "clip") {
          gsap.from(el, {
            clipPath: "inset(100% 0 0 0)",
            duration: 1.4,
            delay,
            ease: "power4.inOut",
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
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [variant, y, start, delay, immediate]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
