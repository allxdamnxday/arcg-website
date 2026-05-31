import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        tag="Our Work"
        title={"Selected\nProjects"}
        subtitle="High-rise curtain wall, specialty glazing, and commercial storefront from recent years."
      />

      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              y={80}
              start="top 85%"
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={`group relative overflow-hidden rounded-sm cursor-pointer block ${
                  i === 0 ? "aspect-[21/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
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
                  <p className="text-sm text-white/70 mt-2">{project.scope} · {project.year}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
