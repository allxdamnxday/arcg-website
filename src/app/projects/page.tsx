import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getLiveProjects } from "@/lib/projects";
import { BLUR_NAVY } from "@/lib/image";

const projects = getLiveProjects();

export default function ProjectsPage() {
  return (
    <main id="main">
      <PageHero
        tag="Our Work"
        title={"Work We've\nGlazed"}
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
                className={`group relative overflow-hidden rounded-sm cursor-pointer block bg-glass transition-[transform,box-shadow] duration-300 ease-out-quart hover:-translate-y-1 hover:shadow-2xl motion-reduce:transform-none ${
                  i === 0 ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                  placeholder="blur"
                  blurDataURL={typeof project.image === "string" ? BLUR_NAVY : undefined}
                  className="object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.03] group-active:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/25 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-12">
                  <p className="eyebrow text-silver mb-2">
                    {project.sector} · {project.location}
                  </p>
                  <h3
                    className={`font-bebas text-white ${
                      i === 0 ? "text-h1" : "text-h3"
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
