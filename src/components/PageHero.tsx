"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import GlassGrid from "@/components/GlassGrid";

interface PageHeroProps {
  tag: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ tag, title, subtitle }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.from(".page-hero-line", { width: 0, duration: 1, ease: "power4.inOut" })
          .from(".page-hero-tag", { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
          .from(".page-hero-title span", { y: 80, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }, "-=0.3")
          .from(".page-hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");
      }, ref);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 lg:px-20 bg-warm">
      {/* Curtain-wall mullion motif — anchored in the right negative space, fades toward the headline */}
      <GlassGrid
        cellX={84}
        cellY={140}
        opacity={0.35}
        className="left-auto right-0 w-2/3"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 75%)",
          maskImage: "linear-gradient(to right, transparent, black 75%)",
        }}
      />
      <div className="relative grid grid-cols-12 gap-y-6">
        <div className="col-span-12">
          <div className="page-hero-line h-px bg-accent w-24 mb-8 origin-left" />
          <p className="page-hero-tag text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink mb-5">{tag}</p>
          <h1 className="page-hero-title font-bebas text-[clamp(48px,9vw,132px)] text-navy leading-[0.92] tracking-[-0.01em] overflow-hidden">
            {title.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
        </div>
        {subtitle && (
          <p className="page-hero-sub col-span-12 sm:col-span-10 lg:col-span-5 lg:col-start-8 text-lg text-gray-500 leading-relaxed lg:text-right">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
