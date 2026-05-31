"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactNode;
  /** Fraction of cursor offset the element follows (0–1). */
  strength?: number;
  className?: string;
}

export default function Magnetic({ children, strength = 0.4, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    // Only on real pointers, and never under reduced motion.
    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => mm.revert();
  }, [strength]);

  return (
    <div ref={ref} className={["inline-flex", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
