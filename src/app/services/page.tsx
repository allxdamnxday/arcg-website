import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";
import { getProjectForService, PROJECTS_LIVE } from "@/lib/projects";
import { processSteps } from "@/lib/process";
import { BLUR_NAVY } from "@/lib/image";

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero
        tag="Capabilities"
        title={"One Crew,\nStart To Finish"}
        subtitle="We self-perform commercial glass from layout through water testing and closeout. Curtain wall, windows, storefront, specialty."
      />

      {/* Rows carry their own padding; outer section adds none (avoids a doubled top gap). */}
      <section>
        {services.map((svc, i) => {
          const flipped = i % 2 === 1;
          const related = getProjectForService(svc.slug);
          return (
            <Reveal
              key={i}
              id={svc.slug}
              start="top 80%"
              className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 items-stretch border-b border-glass"
            >
              <div className={`px-6 md:px-12 lg:px-20 py-16 md:py-24 lg:col-span-5 ${flipped ? "lg:order-2" : ""}`}>
                <div className="mb-6 flex items-end gap-5">
                  <span className="font-bebas text-6xl md:text-7xl leading-none text-navy/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mb-2 h-px flex-1 bg-accent" />
                </div>
                <h2 className="font-bebas text-h2 text-navy mb-4">{svc.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-8">{svc.description}</p>
                <ul className="space-y-2">
                  {svc.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {related && (
                  PROJECTS_LIVE ? (
                    <Link href={`/projects/${related.slug}`} className="block text-sm text-silver-dark mt-8 hover:text-accent-ink link-underline">
                      Recent: {related.title}, {related.location} — {related.scope}
                    </Link>
                  ) : (
                    <p className="text-sm text-silver-dark mt-8">
                      Recent: {related.title}, {related.location} — {related.scope}
                    </p>
                  )
                )}

                <Link
                  href={`/contact?type=bid&scope=${svc.slug}`}
                  className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-accent-ink link-underline pb-1"
                >
                  <span>Bid This Scope</span>
                  <span className="w-8 h-px bg-current" />
                </Link>
              </div>
              <div className={`relative overflow-hidden bg-glass min-h-[300px] lg:min-h-0 lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}>
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  placeholder="blur"
                  blurDataURL={typeof svc.image === "string" ? BLUR_NAVY : undefined}
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-navy/15" />
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* Process */}
      <Section id="process" tone="warm" className="scroll-mt-24">
        <SectionHeader
          tag="Process"
          title="How A Job Runs"
          subtitle="From bid day to closeout — what your team gets and when."
          className="mb-12"
        />
        <div className="max-w-4xl divide-y divide-glass">
          {processSteps.map((step) => (
            <Reveal key={step.num} className="flex gap-6 py-8 first:pt-0 last:pb-0">
              <span className="font-bebas text-3xl leading-none text-navy/15 pt-1">{step.num}</span>
              <div>
                <h3 className="font-bebas text-h3 text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section size="lg" tone="navy" className="text-center">
        <h2 className="font-bebas text-h1 mb-4">Need A Glazing Sub?</h2>
        <p className="text-white/70 max-w-md mx-auto mb-10">
          Send us the plans and the bid schedule. We&apos;ll get you a number.
        </p>
        <Button href="/contact?type=bid" variant="white">Request a Bid</Button>
      </Section>
    </main>
  );
}
