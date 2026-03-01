"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={ref}>
      <PageHero
        tag="About Us"
        title={"Built On Craft,\nDriven By Precision"}
        subtitle="AR Contract Glazing is a Los Angeles-based commercial glazing subcontractor. We install glass on buildings that define the skyline."
      />

      {/* Story */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="about-reveal">
            <div className="w-12 h-px bg-navy mb-6" />
            <h2 className="font-bebas text-4xl md:text-5xl text-navy mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                AR Contract Glazing was founded by Alfonso Rodriguez with a simple idea: build a
                glazing company that does the work right, treats its people well, and delivers on
                every promise. No shortcuts, no excuses.
              </p>
              <p>
                Starting with a small crew on mid-rise projects in Los Angeles, we&apos;ve grown into
                a trusted subcontractor for some of the largest general contractors on the West
                Coast. Our work ranges from high-rise curtain wall installations to precision retail
                storefronts — always with the same commitment to quality.
              </p>
              <p>
                Our field crews are trained professionals who take pride in their craft — whether
                on union-signatory projects or open-shop work across the country. It&apos;s not just
                about hanging glass — it&apos;s about building something that lasts.
              </p>
            </div>
          </div>
          <div className="about-reveal relative overflow-hidden rounded-sm min-h-[400px]">
            {/* TODO: Replace with real crew/site photo */}
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
              alt="Construction crew at work"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-warm">
        <div className="about-reveal max-w-4xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-4">What Drives Us</p>
          <h2 className="font-bebas text-4xl md:text-5xl text-navy">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Precision",
              desc: "Curtain wall tolerances are measured in millimeters. We bring that same precision to every aspect of our work — from layout to closeout.",
            },
            {
              title: "Safety",
              desc: "Our crew works at height, on active job sites, every day. Safety isn't a poster on the wall — it's how we operate. Period.",
            },
            {
              title: "Integrity",
              desc: "We say what we'll do, and we do what we say. If there's a problem, we own it and fix it. That's how you build a reputation.",
            },
          ].map((v, i) => (
            <div key={i} className="about-reveal text-center">
              <div className="w-12 h-px bg-navy mx-auto mb-6" />
              <h3 className="font-bebas text-2xl text-navy mb-3">{v.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="about-reveal max-w-4xl">
          <div className="w-12 h-px bg-navy mb-6" />
          <h2 className="font-bebas text-4xl md:text-5xl text-navy mb-8">Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-navy mb-3">Licenses & Certifications</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• California Contractor License C17-621340</li>
                <li>• OSHA 30-Hour Certified (all supervisors)</li>
                <li>• Fall Protection Competent Person trained</li>
                <li>• Aerial Lift & Scaffold certified</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-navy mb-3">Affiliations</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Signatory contractor — Ironworkers union</li>
                <li>• Experienced across union and open-shop projects</li>
                <li>• Active on projects throughout the United States</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key People */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-navy text-white">
        <div className="about-reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-4">Leadership</p>
          <h2 className="font-bebas text-4xl md:text-5xl mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alfonso Rodriguez", role: "Owner / Principal", desc: "Founded ARCG with decades of glazing field experience. Knows every system, every condition." },
              { name: "Julien", role: "Project Superintendent", desc: "Runs the field. Coordinates crews, manages schedules, and ensures quality on every floor." },
              { name: "Braden Freeman", role: "Operations Administrator", desc: "Keeps the office running — project controls, payroll, compliance, and technology." },
            ].map((p, i) => (
              <div key={i} className="border border-white/10 p-8">
                <div className="w-16 h-16 bg-white/10 rounded-full mb-4 flex items-center justify-center">
                  <span className="font-bebas text-2xl text-steel">
                    {p.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
                <p className="text-xs uppercase tracking-wider text-steel mb-3">{p.role}</p>
                <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-warm">
        <div className="about-reveal max-w-2xl">
          <div className="w-24 h-px bg-navy mb-8" />
          <h2 className="font-bebas text-[clamp(40px,5vw,64px)] text-navy leading-[0.95] mb-6">
            Want To Work With Us?
          </h2>
          <p className="text-lg text-gray-500 mb-10">
            Whether you&apos;re a GC looking for a glazing partner or a skilled glazier looking for a crew — reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-navy text-white px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-steel transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center border-2 border-navy text-navy px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-navy hover:text-white transition-all"
            >
              View Careers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
