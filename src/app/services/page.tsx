"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Curtain Wall Systems",
    description:
      "Our core capability. We install unitized and stick-built curtain wall systems on high-rise commercial and mixed-use buildings. From initial layout and coordination through final water testing, our crew handles the full installation scope. We work with all major curtain wall manufacturers and have the field experience to solve problems before they become schedule impacts.",
    features: [
      "Unitized panel installation",
      "Stick-built curtain wall",
      "Structural silicone glazing",
      "Pressure-equalized systems",
      "Multi-story span systems",
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    title: "Window Systems",
    description:
      "Precision installation of commercial window systems — punch windows, ribbon windows, and operable units. Every window is installed plumb, level, and weathertight. We coordinate with waterproofing and other envelope trades to ensure continuity of the building's weather barrier.",
    features: [
      "Punch window installation",
      "Ribbon window systems",
      "Operable/awning windows",
      "Thermally broken frames",
      "High-performance glazing",
    ],
    image: "/services/window-systems.png",
  },
  {
    title: "Storefront & Entrances",
    description:
      "Ground-level storefront systems, entrance doors, and vestibules for commercial and retail spaces. These are the first thing people see and touch — we treat them accordingly. Clean lines, smooth operation, and proper hardware installation every time.",
    features: [
      "Aluminum storefront framing",
      "Entrance door systems",
      "Automatic door operators",
      "Vestibule assemblies",
      "ADA-compliant hardware",
    ],
    image: "/services/storefront.png",
  },
  {
    title: "Specialty Glazing",
    description:
      "Glass railings, skylights, canopies, and custom architectural glass features. When the architect draws something that doesn't come out of a catalog, we figure out how to build it. Our crew has the skills to handle one-off installations that require craft and problem-solving.",
    features: [
      "Glass railing systems",
      "Skylight installation",
      "Glass canopies",
      "Custom architectural features",
      "Point-supported glazing",
    ],
    image: "/services/specialty-glazing.png",
  },
  {
    title: "Layout & Coordination",
    description:
      "Before a single panel goes up, we're on site with total stations running layout points. We coordinate with the GC's BIM model to identify and resolve clashes before they hit the field. Good layout is the difference between a project that flows and one that grinds.",
    features: [
      "Field survey & layout",
      "BIM coordination",
      "Clash detection",
      "Embed & anchor placement",
      "Tolerance management",
    ],
    image: "/services/layout.png",
  },
  {
    title: "QA/QC & Closeout",
    description:
      "Water testing, thermal imaging, visual inspections, and systematic punch list management. We don't just install — we verify. Our QC process catches issues before the building envelope consultant does, and our closeout packages are clean and complete.",
    features: [
      "AAMA water testing",
      "Thermal imaging",
      "Visual quality inspections",
      "Punch list management",
      "Closeout documentation",
    ],
    image: "/services/qaqc.png",
  },
];

export default function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".svc-block").forEach((block) => {
        gsap.from(block, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 80%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <main>
      <PageHero
        tag="Capabilities"
        title={"Full-Service\nCommercial Glazing"}
        subtitle="One crew, one point of contact, from layout to final punch. We handle the full scope of commercial glass installation."
      />

      <section ref={ref} className="py-16 md:py-24">
        {services.map((svc, i) => (
          <div
            key={i}
            className={`svc-block grid grid-cols-1 lg:grid-cols-2 border-b border-glass ${
              i % 2 === 1 ? "lg:direction-rtl" : ""
            }`}
          >
            <div className={`px-6 md:px-12 lg:px-20 py-16 md:py-24 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="w-12 h-px bg-navy mb-6" />
              <h2 className="font-bebas text-4xl md:text-5xl text-navy mb-4">{svc.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{svc.description}</p>
              <ul className="space-y-2">
                {svc.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-steel rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`relative overflow-hidden min-h-[300px] lg:min-h-0 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <img
                src={svc.image}
                alt={svc.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-navy text-white text-center">
        <h2 className="font-bebas text-[clamp(40px,5vw,64px)] mb-4">Need A Glazing Partner?</h2>
        <p className="text-white/50 max-w-md mx-auto mb-10">
          We&apos;re always looking for the next great project. Let&apos;s talk scope.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center bg-white text-navy px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-steel hover:text-white transition-colors duration-300"
        >
          Get In Touch
        </Link>
      </section>
    </main>
  );
}
