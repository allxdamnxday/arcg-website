import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject, getLiveProjects, PROJECTS_LIVE } from "@/lib/projects";
import { services } from "@/lib/services";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { BLUR_NAVY } from "@/lib/image";

const SERVICE_TITLE = new Map(services.map((s) => [s.slug, s.title]));

export function generateStaticParams() {
  // Only projects with real photography get a route; staged ones stay hidden.
  return getLiveProjects().map((p) => ({ slug: p.slug }));
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
    // Matches the staged /projects index — drops when PROJECTS_LIVE flips.
    ...(PROJECTS_LIVE ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      siteName: "AR Contract Glazing",
      type: "website",
      // Only set images for a remote string src; static imports fall back to the
      // inherited root OG image.
      ...(typeof project.image === "string" ? { images: [project.image] } : {}),
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
  if (!project || !project.live) notFound();

  const live = getLiveProjects();
  const currentIndex = live.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? live[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < live.length - 1 ? live[currentIndex + 1] : null;

  return (
    <main id="main">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />

      {/* Hero Image */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-navy-deep">
        <Reveal variant="clip" immediate className="absolute inset-0" style={{ clipPath: "inset(0)" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={typeof project.image === "string" ? BLUR_NAVY : undefined}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/75 via-navy-deep/20 to-transparent" />
        </Reveal>
        <Reveal variant="stagger" y={30} immediate delay={0.4} className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-20">
          <p className="eyebrow text-silver mb-3">
            {project.sector} · {project.location}
          </p>
          <h1 className="font-bebas text-display text-white">
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
              <div className="font-bebas text-h3 text-navy mb-1">{stat.value}</div>
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
          <div className="w-12 h-px bg-accent mb-8" />
          <h2 className="font-bebas text-h2 text-navy mb-4">Project Overview</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">{project.description}</p>
          <div className="flex flex-wrap gap-3">
            {project.services.map((s) => (
              <Link
                key={s}
                href={`/services#${s}`}
                className="px-4 py-2 bg-glass text-navy text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-navy hover:text-white transition-colors duration-200 ease-out-quart focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2"
              >
                {SERVICE_TITLE.get(s) ?? s}
              </Link>
            ))}
            <span className="px-4 py-2 bg-glass text-navy text-xs font-semibold uppercase tracking-wider rounded-sm">
              {project.year}
            </span>
          </div>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-warm">
        <h2 className="font-bebas text-h2 text-navy mb-8">Project Gallery</h2>
        {PROJECTS_LIVE && project.gallery?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery.map((src, n) => (
              <div key={n} className="relative aspect-[4/3] bg-glass rounded-sm overflow-hidden">
                <Image src={src} alt={`${project.title} — photo ${n + 1}`} fill sizes="(min-width: 768px) 33vw, 50vw" placeholder="blur" blurDataURL={typeof src === "string" ? BLUR_NAVY : undefined} className="object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-glass bg-white p-10 text-center">
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Site photography for this job is being compiled. References and photos available on request.
            </p>
            <Button size="sm" variant="ghost" href="/contact?prefill=references">Request References</Button>
          </div>
        )}
      </section>

      {/* Similar scope CTA */}
      <Section tone="warm" className="text-center">
        <h2 className="font-bebas text-h1 text-navy mb-4">Similar Scope On Your Job?</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-10">
          Send the drawings. We&apos;ll walk it and get you a number.
        </p>
        <Button href="/contact?type=bid">Request a Bid</Button>
      </Section>

      {/* Navigation */}
      <section className="border-t border-glass">
        <div className="grid grid-cols-2">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="px-6 md:px-12 py-10 hover:bg-warm transition-colors duration-300 ease-out-quart group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-inset"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-silver-dark mb-2">
                ← Previous
              </p>
              <p className="font-bebas text-xl md:text-2xl text-navy group-hover:text-steel-ink transition-colors">
                {prevProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="px-6 md:px-12 py-10 text-right border-l border-glass hover:bg-warm transition-colors duration-300 ease-out-quart group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-inset"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-silver-dark mb-2">
                Next →
              </p>
              <p className="font-bebas text-xl md:text-2xl text-navy group-hover:text-steel-ink transition-colors">
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
