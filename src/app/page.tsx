"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline();
      tl.from(".hero-line", { width: 0, duration: 1.2, ease: "power4.inOut" })
        .from(".hero-tag", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-title span", { y: 120, opacity: 0, duration: 1, stagger: 0.15, ease: "power4.out" }, "-=0.4")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4")
        .from(".hero-btn", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from(".hero-image", { clipPath: "inset(100% 0 0 0)", duration: 1.4, ease: "power4.inOut" }, "-=1.2");

      // Stats counter
      gsap.from(".stat-num", {
        textContent: 0,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
      });

      // Stats fade
      gsap.from(".stat-item", {
        opacity: 0, y: 60, stagger: 0.15, duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 80%" }
      });

      // Project cards parallax + reveal
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, y: 100, duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" }
        });
        const img = card.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
          });
        }
      });

      // Section titles
      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 80%" }
        });
      });

      // Service cards stagger
      gsap.from(".service-card", {
        opacity: 0, y: 60, stagger: 0.1, duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: servicesRef.current, start: "top 70%" }
      });

      // Horizontal line animations
      gsap.utils.toArray<HTMLElement>(".h-line").forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: line, start: "top 85%" }
        });
      });

      // CTA
      gsap.from(".cta-content > *", {
        opacity: 0, y: 50, stagger: 0.15, duration: 0.8,
        scrollTrigger: { trigger: ctaRef.current, start: "top 75%" }
      });

      // Nav background on scroll
      ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
          const nav = document.querySelector(".nav-bar");
          if (nav) nav.classList.toggle("nav-scrolled", self.direction === 1 || window.scrollY > 80);
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* NAV */}
      <nav className="nav-bar fixed top-0 w-full z-50 px-6 md:px-12 h-20 flex items-center justify-between transition-all duration-500 bg-transparent [&.nav-scrolled]:bg-white/95 [&.nav-scrolled]:backdrop-blur-md [&.nav-scrolled]:border-b [&.nav-scrolled]:border-glass">
        <a href="#" className="flex items-center gap-3">
          <img src="/logo.png" alt="AR Contract Glazing" className="h-12 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
          <span className="font-bebas text-xl tracking-wider text-navy hidden sm:block">AR CONTRACT <span className="text-silver">GLAZING</span></span>
        </a>
        <div className="hidden md:flex items-center gap-10">
          <a href="#work" className="text-sm font-medium text-gray-800 hover:text-steel transition-colors">Work</a>
          <a href="#services" className="text-sm font-medium text-gray-800 hover:text-steel transition-colors">Services</a>
          <a href="#about" className="text-sm font-medium text-gray-800 hover:text-steel transition-colors">About</a>
          <a href="#contact" className="text-sm font-semibold text-navy border-2 border-navy px-6 py-2.5 hover:bg-navy hover:text-white transition-all duration-300 tracking-wide uppercase text-xs">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden bg-warm">
        <div className="absolute top-0 left-0 w-full h-px bg-glass"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
          {/* Left - Text */}
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-32 lg:py-0">
            <div className="hero-line h-px bg-navy w-24 mb-8 origin-left"></div>
            <p className="hero-tag text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-6">Commercial Glazing · Los Angeles</p>
            <h1 className="hero-title font-bebas text-[clamp(56px,8vw,100px)] leading-[0.95] text-navy mb-6 overflow-hidden">
              <span className="block">Precision</span>
              <span className="block">Glass At</span>
              <span className="block">Every Level</span>
            </h1>
            <p className="hero-sub text-lg text-gray-500 max-w-md leading-relaxed mb-10">
              High-rise curtain wall systems, installed with craft. 
              Union ironworkers building the Los Angeles skyline.
            </p>
            <a href="#work" className="hero-btn group inline-flex items-center gap-3 text-navy font-semibold text-sm uppercase tracking-widest">
              <span>View Our Work</span>
              <span className="w-12 h-px bg-navy group-hover:w-20 transition-all duration-500"></span>
            </a>
          </div>

          {/* Right - Image */}
          <div className="hero-image relative overflow-hidden lg:min-h-screen" style={{ clipPath: "inset(0)" }}>
            <img
              src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=85"
              alt="Glass curtain wall installation"
              className="absolute inset-0 w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-navy/20"></div>
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
            { num: "433", suffix: "", label: "Ironworkers Local" },
          ].map((s, i) => (
            <div key={i} className="stat-item px-6 md:px-10 py-12 md:py-16 text-center border-r border-glass last:border-r-0 [&:nth-child(2)]:max-lg:border-r-0">
              <div className="font-bebas text-[clamp(40px,5vw,64px)] text-navy leading-none mb-1">
                <span className="stat-num">{s.num}</span>{s.suffix}
              </div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-silver">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" ref={projectsRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-4">Selected Work</p>
            <h2 className="section-reveal font-bebas text-[clamp(40px,5vw,72px)] text-navy leading-none">Featured Projects</h2>
          </div>
          <div className="hidden md:block">
            <a href="#" className="text-sm font-semibold text-navy uppercase tracking-widest hover:text-steel transition-colors flex items-center gap-2">
              All Projects <span className="w-8 h-px bg-current"></span>
            </a>
          </div>
        </div>

        <div className="h-line h-px bg-glass w-full origin-left mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Large feature */}
          <div className="project-card md:col-span-2 group relative overflow-hidden rounded-sm cursor-pointer aspect-[21/9]">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85" alt="Hollywood Park Hotel" className="absolute inset-0 w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-silver mb-2">Clayco · Inglewood, CA</p>
              <h3 className="font-bebas text-4xl md:text-6xl text-white">Hollywood Park Hotel</h3>
              <p className="text-sm text-white/60 mt-2 max-w-md">12-story curtain wall system — 5,000+ units across all elevations. Our flagship project.</p>
            </div>
          </div>

          <div className="project-card group relative overflow-hidden rounded-sm cursor-pointer aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=85" alt="David Yurman" className="absolute inset-0 w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-silver mb-2">Bellapart · Beverly Hills</p>
              <h3 className="font-bebas text-3xl md:text-4xl text-white">David Yurman Flagship</h3>
            </div>
          </div>

          <div className="project-card group relative overflow-hidden rounded-sm cursor-pointer aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85" alt="Commercial Tower" className="absolute inset-0 w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-silver mb-2">Ventana DBS · Los Angeles</p>
              <h3 className="font-bebas text-3xl md:text-4xl text-white">Mixed-Use Tower</h3>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={servicesRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-navy text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-4">Capabilities</p>
        <h2 className="section-reveal font-bebas text-[clamp(40px,5vw,72px)] leading-none mb-6">What We Do</h2>
        <p className="text-lg text-white/50 max-w-lg mb-16">Full-service commercial glazing. One crew, one point of contact, from layout to final punch.</p>
        <div className="h-line h-px bg-white/10 w-full origin-left mb-16"></div>

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
              <div className="w-10 h-px bg-steel mb-6 group-hover:w-16 transition-all duration-500"></div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" ref={ctaRef} className="py-32 md:py-44 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-warm"></div>
        <div className="cta-content relative z-10 max-w-3xl">
          <div className="w-24 h-px bg-navy mb-8"></div>
          <h2 className="font-bebas text-[clamp(48px,6vw,80px)] text-navy leading-[0.95] mb-6">Let&apos;s Build<br />Something Notable</h2>
          <p className="text-lg text-gray-500 max-w-md mb-10 leading-relaxed">Whether you&apos;re a GC bidding a tower or a developer planning a landmark — we should talk.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:info@ARCglazing.com" className="inline-flex items-center justify-center bg-navy text-white px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-steel transition-colors duration-300">Get In Touch</a>
            <a href="tel:2132937298" className="inline-flex items-center justify-center border-2 border-navy text-navy px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-navy hover:text-white transition-all duration-300">(213) 293-7298</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f1f2e] text-white/50 px-6 md:px-12 lg:px-20 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <span className="font-bebas text-2xl tracking-wider text-white block mb-4">AR CONTRACT <span className="text-silver">GLAZING</span></span>
            <p className="text-sm leading-relaxed max-w-sm">Commercial glazing subcontractor specializing in high-rise curtain wall installation. Union proud, precision built. Los Angeles, California.</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-silver mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#work" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-silver mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:info@ARCglazing.com" className="hover:text-white transition-colors">info@ARCglazing.com</a></li>
              <li><a href="tel:2132937298" className="hover:text-white transition-colors">(213) 293-7298</a></li>
              <li>726 S Santa Fe #400<br />Los Angeles, CA 90021</li>
              <li className="pt-2 text-xs text-white/30">CA Lic C17-621340 · Ironworkers Local 433</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between text-xs text-white/30">
          <span>© 2026 AR Contract Glazing. All rights reserved.</span>
          <span>Built with precision.</span>
        </div>
      </footer>
    </main>
  );
}
