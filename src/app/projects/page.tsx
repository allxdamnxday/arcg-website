"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import { projects } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".proj-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <main>
      <PageHero
        tag="Our Work"
        title={"Projects That\nSpeak For Themselves"}
        subtitle="From high-rise curtain walls to precision retail storefronts — every project built to last."
      />

      <section ref={gridRef} className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`proj-card group relative overflow-hidden rounded-sm cursor-pointer block ${
                i === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-silver mb-2">
                  {project.client} · {project.location}
                </p>
                <h3
                  className={`font-bebas text-white ${
                    i === 0 ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"
                  }`}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-white/60 mt-2">{project.scope} · {project.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
