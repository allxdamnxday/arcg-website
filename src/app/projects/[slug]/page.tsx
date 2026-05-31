import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects, getProject } from "@/lib/projects";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    // Matches the staged /projects index — drop when real photography lands.
    robots: { index: false, follow: true },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: [project.image],
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main>
      {/* Hero Image */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Reveal variant="clip" immediate className="absolute inset-0" style={{ clipPath: "inset(0)" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </Reveal>
        <Reveal variant="stagger" y={30} immediate delay={0.4} className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-silver mb-3">
            {project.client} · {project.location}
          </p>
          <h1 className="font-bebas text-[clamp(48px,8vw,96px)] text-white leading-[0.95]">
            {project.title}
          </h1>
        </Reveal>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-glass">
        <Reveal variant="stagger" y={30} className="grid grid-cols-2 md:grid-cols-4">
          {project.stats.map((stat, i) => (
            <div
              key={i}
              className="px-6 md:px-10 py-8 text-center border-r border-glass last:border-r-0"
            >
              <div className="font-bebas text-3xl text-navy mb-1">{stat.value}</div>
              <div className="text-xs font-medium uppercase tracking-[0.15em] text-silver-dark">
                {stat.label}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <Reveal className="max-w-3xl">
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
        </Reveal>
      </section>

      {/* Photo Gallery Placeholder */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-warm">
        <h2 className="font-bebas text-3xl text-navy mb-8">Project Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="aspect-[4/3] bg-glass rounded-sm flex items-center justify-center">
              <span className="text-silver-dark text-sm">Photo {n}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-silver-dark mt-6 text-center">Project photography coming soon</p>
      </section>

      {/* Navigation */}
      <section className="border-t border-glass">
        <div className="grid grid-cols-2">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="px-6 md:px-12 py-10 hover:bg-warm transition-colors group"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-silver-dark mb-2">
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
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-silver-dark mb-2">
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
