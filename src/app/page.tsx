"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Hero entrance
        const tl = gsap.timeline();
        tl.from(".hero-line", { width: 0, duration: 1.2, ease: "power4.inOut" })
          .from(".hero-tag", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
          .from(".hero-title span", { y: 120, opacity: 0, duration: 1, stagger: 0.15, ease: "power4.out" }, "-=0.4")
          .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4")
          .from(".hero-btn", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, "-=0.3")
          .from(".hero-image", { clipPath: "inset(100% 0 0 0)", duration: 1.4, ease: "power4.inOut" }, "-=1.2");

        // Stats counter
        gsap.from(".stat-num", {
          textContent: 0,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
        });

        gsap.from(".stat-item", {
          opacity: 0, y: 60, stagger: 0.15, duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
        });

        // Credentials strip reveal
        gsap.from(".cred-item", {
          opacity: 0, y: 20, stagger: 0.08, duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cred-strip", start: "top 85%" },
        });

        // Selected work text cards
        gsap.from(".work-card", {
          opacity: 0, y: 60, stagger: 0.12, duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: workRef.current, start: "top 80%" },
        });

        // Section titles
        gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((el) => {
          gsap.from(el, {
            clipPath: "inset(0 100% 0 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        });

        // Service cards
        gsap.from(".service-card", {
          opacity: 0, y: 60, stagger: 0.1, duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: servicesRef.current, start: "top 70%" },
        });

        // Horizontal lines
        gsap.utils.toArray<HTMLElement>(".h-line").forEach((line) => {
          gsap.from(line, {
            scaleX: 0,
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: { trigger: line, start: "top 85%" },
          });
        });

        // CTA
        gsap.from(".cta-content > *", {
          opacity: 0, y: 50, stagger: 0.15, duration: 0.8,
          scrollTrigger: { trigger: ctaRef.current, start: "top 75%" },
        });
      });

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <main>
      {/* HERO */}
      <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden bg-warm">
        <div className="absolute top-0 left-0 w-full h-px bg-glass" />
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-32 lg:py-0">
            <div className="hero-line h-px bg-navy w-24 mb-8 origin-left" />
            <p className="hero-tag text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-6">
              Commercial Glazing · Los Angeles
            </p>
            <h1 className="hero-title font-bebas text-[clamp(56px,8vw,100px)] leading-[0.95] text-navy mb-6 overflow-hidden">
              <span className="block">Precision</span>
              <span className="block">Glass At</span>
              <span className="block">Every Level</span>
            </h1>
            <p className="hero-sub text-lg text-gray-600 max-w-md leading-relaxed mb-10">
              High-rise curtain wall systems, installed with craft.
              Skilled glaziers building the Los Angeles skyline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contact" className="hero-btn">Request a Bid</Button>
              <Button href="/services" variant="ghost" className="hero-btn">Our Services</Button>
            </div>
          </div>

          <div className="hero-image relative overflow-hidden lg:min-h-screen" style={{ clipPath: "inset(0)" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=85"
              className="absolute inset-0 w-full h-full object-cover scale-110"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-navy/20" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="border-y border-glass">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { num: "10", suffix: "+", label: "Years Experience" },
            { num: "50", suffix: "+", label: "Projects Completed" },
            { num: "500", suffix: "K+", label: "Sq Ft Installed" },
            { num: "0", suffix: "", label: "Safety Incidents" },
          ].map((s, i) => (
            <div
              key={i}
              className="stat-item px-6 md:px-10 py-12 md:py-16 text-center border-r border-glass last:border-r-0 [&:nth-child(2)]:max-lg:border-r-0"
            >
              <div className="font-bebas text-[clamp(40px,5vw,64px)] text-navy leading-none mb-1">
                <span className="stat-num">{s.num}</span>
                {s.suffix}
              </div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-silver-dark">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CREDENTIALS STRIP */}
      <section className="cred-strip border-b border-glass bg-warm">
        <div className="px-6 md:px-12 lg:px-20 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.15em] text-silver-dark">
          <span className="cred-item">California C17-621340</span>
          <span className="hidden sm:inline text-glass">·</span>
          <span className="cred-item">Union Signatory</span>
          <span className="hidden sm:inline text-glass">·</span>
          <span className="cred-item">10+ Years</span>
          <span className="hidden sm:inline text-glass">·</span>
          <span className="cred-item">Based in Los Angeles</span>
        </div>
      </section>

      {/* SELECTED WORK — text-only until photos are ready */}
      <section ref={workRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <SectionHeader tag="Selected Work" title="Recent Projects" className="mb-12" />

        <div className="h-line h-px bg-glass w-full origin-left mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-glass">
          {[
            {
              title: "Hollywood Park Hotel",
              client: "Clayco",
              location: "Inglewood, CA",
              scope: "12-Story Curtain Wall",
              year: "2024 – Present",
              status: "Active",
            },
            {
              title: "David Yurman Flagship",
              client: "Bellapart",
              location: "Beverly Hills, CA",
              scope: "Specialty Storefront",
              year: "2024",
              status: "Complete",
            },
            {
              title: "Mixed-Use Tower",
              client: "Ventana DBS",
              location: "Los Angeles, CA",
              scope: "Curtain Wall & Windows",
              year: "2023",
              status: "Complete",
            },
          ].map((p, i) => (
            <div key={i} className="work-card bg-white p-8 md:p-10 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-4">
                {p.client} · {p.location}
              </p>
              <h3 className="font-bebas text-3xl md:text-4xl text-navy leading-[0.95] mb-6">{p.title}</h3>
              <div className="mt-auto pt-6 border-t border-glass text-sm text-gray-600 space-y-1">
                <p>{p.scope}</p>
                <p className="text-silver-dark">{p.year} · {p.status}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-silver-dark mt-8 text-center md:text-left">
          Full project gallery coming soon.
        </p>
      </section>

      {/* SERVICES */}
      <section ref={servicesRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-navy text-white">
        <SectionHeader
          tag="Capabilities"
          title="What We Do"
          subtitle="Full-service commercial glazing. One crew, one point of contact, from layout to final punch."
          tone="dark"
          className="mb-16"
        />
        <div className="h-line h-px bg-white/10 w-full origin-left mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {[
            { title: "Curtain Wall Systems", desc: "High-rise unitized and stick-built curtain wall. Our core — every floor, every condition." },
            { title: "Window Systems", desc: "Punch windows, ribbon windows, and operable units. Precision fit, weathertight." },
            { title: "Storefront & Entrances", desc: "Ground-level glazing, entrance systems, and doors for commercial spaces." },
            { title: "Specialty Glazing", desc: "Glass railings, skylights, canopies, and custom architectural features." },
            { title: "Layout & Coordination", desc: "Field survey, BIM coordination, and precision layout. We catch problems early." },
            { title: "QA/QC & Closeout", desc: "Water testing, thermal imaging, punch list management. Clean handover." },
          ].map((s, i) => (
            <div key={i} className="service-card bg-navy p-8 md:p-10 group hover:bg-white/5 transition-colors duration-500">
              <div className="w-10 h-px bg-steel mb-6 group-hover:w-16 transition-all duration-500" />
              <h3 className="font-bebas text-2xl md:text-3xl mb-3 leading-none">{s.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 text-white font-semibold text-sm uppercase tracking-widest hover:text-steel transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <span>View All Services</span>
            <span className="w-8 h-px bg-current" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-32 md:py-44 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-warm" />
        <div className="cta-content relative z-10 max-w-3xl">
          <div className="w-24 h-px bg-navy mb-8" />
          <h2 className="font-bebas text-[clamp(48px,6vw,80px)] text-navy leading-[0.95] mb-6">
            Let&apos;s Build
            <br />
            Something Notable
          </h2>
          <p className="text-lg text-gray-600 max-w-md mb-10 leading-relaxed">
            Whether you&apos;re a GC bidding a tower or a developer planning a landmark — we should talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact">Get In Touch</Button>
            <Button href="tel:2132937298" variant="ghost">(213) 293-7298</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
