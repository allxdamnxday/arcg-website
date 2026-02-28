"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PageHeroProps {
  tag: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ tag, title, subtitle }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".page-hero-line", { width: 0, duration: 1, ease: "power4.inOut" })
        .from(".page-hero-tag", { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
        .from(".page-hero-title span", { y: 80, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }, "-=0.3")
        .from(".page-hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 lg:px-20 bg-warm">
      <div className="page-hero-line h-px bg-navy w-24 mb-8 origin-left" />
      <p className="page-hero-tag text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-4">{tag}</p>
      <h1 className="page-hero-title font-bebas text-[clamp(48px,7vw,88px)] text-navy leading-[0.95] overflow-hidden">
        {title.split("\n").map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h1>
      {subtitle && (
        <p className="page-hero-sub text-lg text-gray-500 max-w-lg mt-6 leading-relaxed">{subtitle}</p>
      )}
    </section>
  );
}
