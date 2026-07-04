"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { track } from "@vercel/analytics";
import Button from "@/components/Button";
import Magnetic from "@/components/Magnetic";
import SectionHeader from "@/components/SectionHeader";
import GlassGrid from "@/components/GlassGrid";
import { EASE, STAGGER } from "@/lib/motion";
import { services } from "@/lib/services";
import { getFeaturedProjects, PROJECTS_LIVE } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

// TODO(arcg): SET A stats (30+ years, 100+ projects, 2M+ sq ft, incident/EMR figure)
// swap in here once Alfonso confirms each number in writing. Until then, ship the
// verifiable-from-project-data set below.
const STATS = [
  { num: "12", suffix: "", label: "Stories On Our Current Tower" },
  { num: "5000", suffix: "+", label: "Units On One Job" },
  { num: "6", suffix: "", label: "Scopes We Self-Perform" },
  { num: "1", suffix: "", label: "Crew, Start To Finish" },
];

export default function Home() {
  // Paint the (local, ~60KB) hero poster as early as possible — it's the LCP element.
  preload("/hero-poster.webp", { as: "image", fetchPriority: "high" });

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Hero entrance — the image clip runs parallel to the text rise (0.15s in)
        // for a cinematic overlap rather than a tail-end reveal.
        const tl = gsap.timeline({ delay: 0.25, defaults: { ease: EASE.ui } });
        tl.from(".hero-line", { scaleX: 0, duration: 1.0, ease: EASE.struct })
          .from(".hero-tag", { opacity: 0, y: 16, duration: 0.6 }, "-=0.55")
          .from(".hero-title span", { yPercent: 110, duration: 1.1, stagger: STAGGER.text, ease: EASE.text }, "-=0.35")
          .from(".hero-sub", { opacity: 0, y: 16, duration: 0.7 }, "-=0.65")
          .from(".hero-btn", { opacity: 0, y: 12, duration: 0.5, stagger: STAGGER.ui }, "-=0.45")
          .from(".hero-image", { clipPath: "inset(100% 0 0 0)", duration: 1.3, ease: EASE.struct }, 0.15);

        // Stats counter — build the count-up tweens only when the strip enters
        // view (once), so the SSR values stay put until then and there's no
        // premature "0" from a ScrollTrigger refresh. Proxy + onUpdate lets us
        // comma-format on the way up.
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
              const target = Number(el.dataset.value);
              const obj = { v: 0 };
              gsap.to(obj, {
                v: target,
                duration: 2,
                ease: "power2.out",
                snap: { v: 1 },
                onUpdate: () => {
                  el.textContent = Math.round(obj.v).toLocaleString();
                },
              });
            });
          },
        });

        gsap.from(".stat-item", {
          opacity: 0, y: 40, stagger: STAGGER.card, duration: 0.8,
          ease: EASE.content,
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
        });

        gsap.from(".cred-item", {
          opacity: 0, y: 12, stagger: 0.08, duration: 0.6,
          ease: EASE.ui,
          scrollTrigger: { trigger: ".cred-strip", start: "top 85%" },
        });

        gsap.from(".work-card", {
          opacity: 0, y: 48, stagger: STAGGER.card, duration: 0.8,
          ease: EASE.content,
          scrollTrigger: { trigger: workRef.current, start: "top 80%" },
        });

        gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((el) => {
          gsap.from(el, {
            clipPath: "inset(0 100% 0 0)",
            duration: 1.1,
            ease: EASE.struct,
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        });

        // Service cards ripple diagonally across the 3-col grid (approximate on 2-col).
        gsap.from(".service-card", {
          opacity: 0, y: 40,
          stagger: { each: 0.08, grid: [2, 3], from: 0 },
          duration: 0.8, ease: EASE.content,
          scrollTrigger: { trigger: servicesRef.current, start: "top 70%" },
        });

        gsap.utils.toArray<HTMLElement>(".h-line").forEach((line) => {
          gsap.from(line, {
            scaleX: 0,
            duration: 1.1,
            ease: EASE.struct,
            scrollTrigger: { trigger: line, start: "top 85%" },
          });
        });

        gsap.from(".cta-content > *", {
          opacity: 0, y: 50, stagger: 0.12, duration: 0.8,
          ease: EASE.content,
          scrollTrigger: { trigger: ctaRef.current, start: "top 75%" },
        });
      });

      return () => ctx.revert();
    });

    // Hero parallax — desktop only.
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        gsap.to(".hero-image video", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-title", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Pause the hero video offscreen (battery/CPU). Under reduced motion, keep it
  // paused entirely — the poster stands in.
  useEffect(() => {
    const vid = heroRef.current?.querySelector("video");
    if (!vid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      vid.removeAttribute("autoplay");
      vid.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
      },
      { threshold: 0 }
    );
    io.observe(vid);
    return () => io.disconnect();
  }, []);

  return (
    <main id="main">
      {/* HERO */}
      <section ref={heroRef} className="min-h-[100svh] flex items-center relative overflow-hidden bg-warm">
        <div className="absolute top-0 left-0 w-full h-px bg-glass" />
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[100svh]">
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-28 pb-14 lg:py-0">
            <div className="hero-line h-px bg-accent w-24 mb-8 origin-left" />
            <p className="hero-tag eyebrow text-accent-ink mb-6">
              Commercial Glazing Contractor
            </p>
            <h1 className="hero-title font-bebas text-display text-navy mb-6 overflow-hidden">
              <span className="block">We Hang</span>
              <span className="block">Glass On</span>
              <span className="block">High-Rises</span>
            </h1>
            <p className="hero-sub text-lg text-gray-600 max-w-md leading-relaxed mb-8">
              We install curtain wall, windows, and storefront for commercial GCs.
              Based in Los Angeles, working nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic className="w-full sm:w-auto">
                <Button href="/contact?type=bid" className="hero-btn w-full sm:w-auto" onClick={() => track("cta_request_bid")}>Request a Bid</Button>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto">
                <Button href="/services" variant="ghost" className="hero-btn w-full sm:w-auto">Our Services</Button>
              </Magnetic>
            </div>
          </div>

          <div className="hero-image relative overflow-hidden min-h-[45vh] lg:min-h-screen" style={{ clipPath: "inset(0)" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              preload="metadata"
              poster="/hero-poster.webp"
              className="absolute inset-0 w-full h-full object-cover scale-110"
            >
              <source src="/hero-video-720.webm" type="video/webm" />
              <source src="/hero-video-720.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-navy/20" />
            <GlassGrid cellX={88} cellY={150} opacity={0.3} />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="border-y border-glass">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="stat-item px-6 md:px-10 py-12 md:py-16 text-center border-r border-glass last:border-r-0 [&:nth-child(2)]:max-lg:border-r-0"
            >
              <div className="font-bebas text-h1 text-navy mb-1">
                <span className="stat-num" data-value={s.num}>{Number(s.num).toLocaleString()}</span>
                <span className="text-accent-ink">{s.suffix}</span>
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
          {/* TODO(arcg): confirm Local 433 for public use — else "Union Signatory" */}
          <span className="cred-item">Ironworkers Local 433</span>
          <span className="hidden sm:inline text-glass">·</span>
          <span className="cred-item">Bonded &amp; Insured</span>
          <span className="hidden sm:inline text-glass">·</span>
          <span className="cred-item">LA-Based, Nationwide</span>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section ref={workRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20">
        <SectionHeader
          tag="Selected Work"
          title="Recent Projects"
          subtitle="12 stories next to SoFi Stadium. A flagship on Rodeo Drive. Jobs we put our name on."
          className="mb-12"
        />

        <div className="h-line h-px bg-glass w-full origin-left mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-glass">
          {getFeaturedProjects().map((project) => {
            const status = project.stats.find((s) => s.label === "Status")?.value;
            const inner = (
              <>
                <p className="eyebrow text-steel-ink mb-4 transition-colors duration-300 ease-out-quart group-hover:text-accent-ink">
                  {project.sector} · {project.location}
                </p>
                <h3 className="font-bebas text-h3 text-navy mb-6 transition-colors duration-300 ease-out-quart group-hover:text-accent-ink">{project.title}</h3>
                <div className="relative mt-auto pt-6 text-sm text-gray-600 space-y-1">
                  <span aria-hidden className="absolute top-0 left-0 h-px w-full bg-glass" />
                  <span aria-hidden className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-accent-ink transition-transform duration-300 ease-out-quart group-hover:scale-x-100" />
                  <p>{project.scope}</p>
                  <p className="text-silver-dark">
                    {project.year}{status ? ` · ${status}` : ""}
                  </p>
                </div>
              </>
            );
            const cardClass = "work-card group bg-white p-8 md:p-10 flex flex-col transition-colors duration-300 ease-out-quart hover:bg-warm";
            return project.live ? (
              <Link key={project.slug} href={`/projects/${project.slug}`} className={cardClass}>{inner}</Link>
            ) : (
              <div key={project.slug} className={cardClass}>{inner}</div>
            );
          })}
        </div>

        {PROJECTS_LIVE ? (
          <Link href="/projects" className="inline-block text-sm text-accent-ink link-underline mt-8">
            View All Projects →
          </Link>
        ) : (
          <Link href="/contact?prefill=references" className="inline-block text-sm text-accent-ink link-underline mt-8">
            Full project pages are in progress — references and site photos available on request →
          </Link>
        )}
      </section>

      {/* SERVICES */}
      <section ref={servicesRef} className="relative overflow-hidden py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-navy text-white">
        <GlassGrid cellX={76} cellY={128} opacity={0.1} />
        <div className="relative z-10">
        <SectionHeader
          tag="Capabilities"
          title="What We Do"
          subtitle="We self-perform the full scope, from layout through final punch list."
          tone="dark"
          className="mb-16"
        />
        <div className="h-line h-px bg-white/10 w-full origin-left mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {services.map((s) => (
            <div key={s.title} className="service-card bg-navy p-8 md:p-10 group hover:bg-navy-raised active:bg-navy-raised transition-colors duration-300 ease-out-quart">
              <div className="w-10 h-px bg-steel mb-6 group-hover:w-16 group-hover:bg-accent transition-all duration-300 ease-out-quart" />
              <h3 className="font-bebas text-h3 mb-3">{s.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{s.summary}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 text-white font-semibold text-sm uppercase tracking-widest link-underline pb-1 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <span>View All Services</span>
            <span className="w-8 h-px bg-current" />
          </Link>
          <Link
            href="/services#process"
            className="inline-flex items-center gap-3 text-white font-semibold text-sm uppercase tracking-widest link-underline pb-1 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <span>How A Job Runs</span>
            <span className="w-8 h-px bg-current" />
          </Link>
        </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-32 md:py-44 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-warm" />
        <div className="cta-content relative z-10 max-w-3xl">
          <div className="w-24 h-px bg-accent mb-8" />
          <h2 className="font-bebas text-h1 text-navy mb-6">
            Let&apos;s Talk
            <br />
            Scope
          </h2>
          <p className="text-lg text-gray-600 max-w-md mb-10 leading-relaxed">
            Send us the drawings. We&apos;ll walk the scope and get you a bid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Magnetic className="w-full sm:w-auto">
              <Button href="/contact?type=bid" className="w-full sm:w-auto">Get In Touch</Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Button href="tel:2132937298" variant="ghost" className="w-full sm:w-auto" onClick={() => track("cta_call_clicked")}>(213) 293-7298</Button>
            </Magnetic>
          </div>
        </div>
      </section>
    </main>
  );
}
