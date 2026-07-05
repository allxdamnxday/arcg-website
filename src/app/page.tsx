"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { track } from "@vercel/analytics";
import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import GlassGrid from "@/components/GlassGrid";
import { EASE, STAGGER } from "@/lib/motion";
import { services } from "@/lib/services";
import { getFeaturedProjects, PROJECTS_LIVE } from "@/lib/projects";
import heroImg from "@/images/hph/hero.webp";

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
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Hero entrance — the full-bleed facade settles in (slow Ken-Burns scale)
        // while the headline rises over it.
        const tl = gsap.timeline({ delay: 0.25, defaults: { ease: EASE.ui } });
        tl.from(".hero-bg", { scale: 1.12, duration: 1.8, ease: "power2.out" }, 0)
          .from(".hero-scrim", { opacity: 0, duration: 1.1 }, 0.1)
          .from(".hero-line", { scaleX: 0, duration: 1.0, ease: EASE.struct }, 0.45)
          .from(".hero-tag", { opacity: 0, y: 16, duration: 0.6 }, "-=0.55")
          .from(".hero-title span", { yPercent: 110, duration: 1.1, stagger: STAGGER.text, ease: EASE.text }, "-=0.35")
          .from(".hero-sub", { opacity: 0, y: 16, duration: 0.7 }, "-=0.65")
          .from(".hero-btn", { opacity: 0, y: 12, duration: 0.5, stagger: STAGGER.ui }, "-=0.45");

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
        gsap.to(".hero-bg", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-content", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <main id="main">
      {/* HERO — full-bleed real curtain-wall facade (Hollywood Park / Kali Hotel) */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-navy-deep">
        {/* Facade photo, slightly over-scanned so the scroll parallax never reveals an edge */}
        <div className="hero-bg absolute -inset-[4%]">
          <Image
            src={heroImg}
            alt="AR Contract Glazing curtain wall on the Hollywood Park high-rise"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        {/* Scrim: darken the top for the nav and the bottom for the headline */}
        <div className="hero-scrim absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-deep/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
        </div>

        <div className="hero-content relative z-10 min-h-[100svh] flex flex-col justify-end px-6 md:px-12 lg:px-20 pt-32 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <div className="hero-line h-px bg-accent w-24 mb-8 origin-left" />
            <p className="hero-tag eyebrow text-accent mb-6">
              Commercial Glazing Contractor
            </p>
            <h1 className="hero-title font-bebas text-display text-white mb-6 overflow-hidden">
              <span className="block">We Hang</span>
              <span className="block">Glass On</span>
              <span className="block">High-Rises</span>
            </h1>
            <p className="hero-sub text-lg text-white/80 max-w-md leading-relaxed mb-8">
              Curtain wall, windows, and storefront for commercial GCs. Los Angeles-based,
              working nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contact?type=bid" variant="white" className="hero-btn w-full sm:w-auto" onClick={() => track("cta_request_bid")}>Request a Bid</Button>
              <Button href="/services" variant="ghost-light" className="hero-btn w-full sm:w-auto">Our Services</Button>
            </div>
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
          <span className="cred-item">Union Signatory, Nationwide</span>
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
          title="Jobs We Put Our Name On"
          subtitle="12 stories next to SoFi Stadium. A flagship on Rodeo Drive."
          className="mb-12"
        />

        <div className="h-line h-px bg-glass w-full origin-left mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-glass">
          {getFeaturedProjects().map((project) => {
            const status = project.stats.find((s) => s.label === "Status")?.value;
            const thumb = (
              <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-navy to-navy-deep">
                {project.live && project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-500 ease-out-quart group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                ) : (
                  // Branded mullion placeholder — decorative, not a fake photo. Becomes
                  // a real thumbnail automatically once the project goes live.
                  <>
                    <GlassGrid cellX={44} cellY={72} opacity={0.3} />
                    <span aria-hidden className="absolute bottom-5 left-6 w-10 h-px bg-accent/60" />
                  </>
                )}
              </div>
            );
            const inner = (
              <div className="p-8 md:p-10 flex flex-col flex-1">
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
              </div>
            );
            const cardClass = "work-card group relative z-0 bg-white flex flex-col overflow-hidden transition-[transform,box-shadow,background-color] duration-300 ease-out-quart hover:bg-warm hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl hover:z-10 motion-reduce:transform-none motion-reduce:hover:scale-100";
            return project.live ? (
              <Link key={project.slug} href={`/projects/${project.slug}`} className={cardClass}>{thumb}{inner}</Link>
            ) : (
              <div key={project.slug} className={cardClass}>{thumb}{inner}</div>
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
      <section ref={servicesRef} className="relative overflow-hidden py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-navy to-navy-deep text-white">
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
            <div key={s.title} className="service-card relative z-0 bg-navy p-8 md:p-10 group transition-[transform,background-color,box-shadow] duration-300 ease-out-quart hover:bg-navy-raised active:bg-navy-raised hover:-translate-y-1 hover:z-10 hover:ring-1 hover:ring-accent/30 motion-reduce:transform-none">
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
            <Button href="/contact?type=bid" className="w-full sm:w-auto">Get In Touch</Button>
            <Button href="tel:2132937298" variant="ghost" className="w-full sm:w-auto" onClick={() => track("cta_call_clicked")}>(213) 293-7298</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
