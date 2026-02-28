"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { projects, getProject } from "@/lib/projects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".detail-image", { clipPath: "inset(100% 0 0 0)", duration: 1.4, ease: "power4.inOut" })
        .from(".detail-tag", { opacity: 0, y: 20, duration: 0.6 }, "-=0.6")
        .from(".detail-title", { opacity: 0, y: 40, duration: 0.8 }, "-=0.4")
        .from(".detail-stat", { opacity: 0, y: 30, stagger: 0.1, duration: 0.6 }, "-=0.4")
        .from(".detail-body", { opacity: 0, y: 30, duration: 0.8 }, "-=0.3");
    }, ref);
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-bebas text-6xl text-navy mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-steel hover:text-navy transition-colors">
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  // Find adjacent projects for navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main ref={ref}>
      {/* Hero Image */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="detail-image absolute inset-0" style={{ clipPath: "inset(0)" }}>
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-20">
          <p className="detail-tag text-xs font-semibold uppercase tracking-[0.2em] text-silver mb-3">
            {project.client} · {project.location}
          </p>
          <h1 className="detail-title font-bebas text-[clamp(48px,8vw,96px)] text-white leading-[0.95]">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-glass">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {project.stats.map((stat, i) => (
            <div
              key={i}
              className="detail-stat px-6 md:px-10 py-8 text-center border-r border-glass last:border-r-0"
            >
              <div className="font-bebas text-3xl text-navy mb-1">{stat.value}</div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-silver">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="detail-body max-w-3xl">
          <div className="w-16 h-px bg-navy mb-8" />
          <h2 className="font-bebas text-3xl text-navy mb-4">Project Overview</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">{project.description}</p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-glass text-navy text-xs font-semibold uppercase tracking-wider rounded-sm">
              {project.scope}
            </span>
            <span className="px-4 py-2 bg-glass text-navy text-xs font-semibold uppercase tracking-wider rounded-sm">
              {project.year}
            </span>
          </div>
        </div>
      </section>

      {/* Photo Gallery Placeholder */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-warm">
        <h2 className="font-bebas text-3xl text-navy mb-8">Project Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="aspect-[4/3] bg-glass rounded-sm flex items-center justify-center">
              <span className="text-silver text-sm">Photo {n}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-silver mt-6 text-center">Project photography coming soon</p>
      </section>

      {/* Navigation */}
      <section className="border-t border-glass">
        <div className="grid grid-cols-2">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="px-6 md:px-12 py-10 hover:bg-warm transition-colors group"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-silver mb-2">
                ← Previous
              </p>
              <p className="font-bebas text-xl md:text-2xl text-navy group-hover:text-steel transition-colors">
                {prevProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="px-6 md:px-12 py-10 text-right border-l border-glass hover:bg-warm transition-colors group"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-silver mb-2">
                Next →
              </p>
              <p className="font-bebas text-xl md:text-2xl text-navy group-hover:text-steel transition-colors">
                {nextProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </main>
  );
}
