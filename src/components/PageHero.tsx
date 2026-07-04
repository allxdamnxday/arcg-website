"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import GlassGrid from "@/components/GlassGrid";
import { EASE } from "@/lib/motion";

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
        // delay 0.25 hands off from the route-transition panel wipe (see template.tsx).
        const tl = gsap.timeline({ delay: 0.25, defaults: { ease: "power2.out" } });
        tl.from(".page-hero-line", { scaleX: 0, duration: 0.9, ease: EASE.struct })
          .from(".page-hero-tag", { opacity: 0, y: 16, duration: 0.5 }, "-=0.5")
          .from(".page-hero-title span", { yPercent: 110, duration: 1.0, stagger: 0.09, ease: EASE.text }, "-=0.3")
          .from(".page-hero-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=0.55");
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
        color="var(--color-steel)"
        opacity={0.18}
        className="left-auto right-0 w-2/3 hidden md:block"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 75%)",
          maskImage: "linear-gradient(to right, transparent, black 75%)",
        }}
      />
      <div className="relative grid grid-cols-12 gap-y-6">
        <div className="col-span-12">
          <div className="page-hero-line h-px bg-accent w-24 mb-8 origin-left" />
          <p className="page-hero-tag eyebrow text-accent-ink mb-5">{tag}</p>
          <h1 className="page-hero-title font-bebas text-display text-navy overflow-hidden">
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
