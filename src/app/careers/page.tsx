"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const openings = [
  {
    title: "Journeyman Glazier / Ironworker",
    type: "Full-Time",
    location: "Los Angeles, CA (Field)",
    description:
      "Experienced curtain wall and window installers needed for active high-rise projects. Minimum 3 years commercial glazing experience. We work on both union and open-shop projects across the US.",
    requirements: [
      "3+ years commercial glazing experience",
      "Curtain wall installation experience preferred",
      "OSHA 10 certification minimum",
      "Comfortable working at height",
      "Valid CA driver's license",
    ],
  },
  {
    title: "Apprentice Glazier",
    type: "Full-Time · Apprenticeship",
    location: "Los Angeles, CA (Field)",
    description:
      "Looking for motivated individuals to join our crew and learn the trade. You'll learn curtain wall installation from experienced journeymen while earning competitive wages and benefits.",
    requirements: [
      "High school diploma or GED",
      "Physically fit — this is demanding work",
      "Reliable transportation",
      "Willingness to learn and work hard",
      "No fear of heights",
      "Basic tool knowledge helpful",
    ],
  },
  {
    title: "Foreman",
    type: "Full-Time",
    location: "Los Angeles, CA (Field)",
    description:
      "Lead a crew of 4-8 glaziers on commercial projects. Responsible for daily production, quality, safety, and coordination with the GC. You need to know how to read drawings, manage people, and keep a floor moving.",
    requirements: [
      "5+ years commercial glazing experience",
      "Prior foreman or lead experience",
      "Ability to read architectural and shop drawings",
      "Strong communication skills",
      "OSHA 30 certification",
      "Experience with daily reporting",
    ],
  },
];

export default function CareersPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".career-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={ref}>
      <PageHero
        tag="Join The Crew"
        title={"Build The LA\nSkyline With Us"}
        subtitle="We're always looking for skilled glaziers who take pride in their work. Competitive wages, great benefits, real projects."
      />

      {/* Why ARCG */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="career-reveal max-w-4xl">
          <div className="w-12 h-px bg-navy mb-6" />
          <h2 className="font-bebas text-4xl md:text-5xl text-navy mb-6">Why ARCG?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Competitive Pay & Benefits", desc: "Strong compensation packages — health insurance, retirement benefits, and paid time off. We take care of our people." },
              { title: "Real Projects", desc: "We work on the biggest buildings in LA. High-rises, landmarks, the kind of work you can point to and say 'I built that.'" },
              { title: "Steady Work", desc: "We maintain a consistent backlog. When one project wraps, the next one is already lined up. No gaps, no scrambling." },
              { title: "Respect", desc: "We treat our crew like professionals because that's what they are. No games, no drama. Show up, do good work, go home safe." },
            ].map((item, i) => (
              <div key={i} className="border-l-2 border-steel pl-6">
                <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-warm">
        <div className="career-reveal mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-4">Current Openings</p>
          <h2 className="font-bebas text-4xl md:text-5xl text-navy">Open Positions</h2>
        </div>

        <div className="space-y-6 max-w-4xl">
          {openings.map((job, i) => (
            <div key={i} className="career-reveal bg-white border border-glass p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="font-bebas text-2xl md:text-3xl text-navy">{job.title}</h3>
                  <p className="text-sm text-steel mt-1">{job.type} · {job.location}</p>
                </div>
                <a
                  href={`mailto:info@ARCglazing.com?subject=Application: ${job.title}`}
                  className="mt-4 md:mt-0 inline-flex items-center justify-center bg-navy text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-steel transition-colors flex-shrink-0"
                >
                  Apply Now
                </a>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{job.description}</p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-silver mb-3">Requirements</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {job.requirements.map((req, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-steel rounded-full flex-shrink-0 mt-1.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General Application */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-navy text-white text-center">
        <h2 className="font-bebas text-[clamp(40px,5vw,64px)] mb-4">Don&apos;t See Your Role?</h2>
        <p className="text-white/50 max-w-md mx-auto mb-10">
          We&apos;re always interested in hearing from skilled glaziers. Send us your info and we&apos;ll keep you in mind.
        </p>
        <a
          href="mailto:info@ARCglazing.com?subject=General Application"
          className="inline-flex items-center justify-center bg-white text-navy px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-steel hover:text-white transition-colors duration-300"
        >
          Send Your Info
        </a>
      </section>
    </main>
  );
}
