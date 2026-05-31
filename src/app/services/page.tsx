import Image from "next/image";
import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        tag="Capabilities"
        title={"Full-Service\nCommercial Glazing"}
        subtitle="We self-perform the full scope of commercial glass, from layout through final punch list. One crew, start to finish."
      />

      <section className="py-16 md:py-24">
        {services.map((svc, i) => (
          <Reveal
            key={i}
            y={60}
            start="top 80%"
            className="grid grid-cols-1 lg:grid-cols-2 border-b border-glass"
          >
            <div className={`px-6 md:px-12 lg:px-20 py-16 md:py-24 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="w-12 h-px bg-navy mb-6" />
              <h2 className="font-bebas text-4xl md:text-5xl text-navy mb-4">{svc.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{svc.description}</p>
              <ul className="space-y-2">
                {svc.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-steel rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`relative overflow-hidden min-h-[300px] lg:min-h-0 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <Image
                src={svc.image}
                alt={svc.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <Section size="lg" tone="navy" className="text-center">
        <h2 className="font-bebas text-[clamp(40px,5vw,64px)] mb-4">Need A Glazing Sub?</h2>
        <p className="text-white/70 max-w-md mx-auto mb-10">
          Send us the plans and the bid schedule. We&apos;ll get you a number.
        </p>
        <Button href="/contact" variant="white">Get In Touch</Button>
      </Section>
    </main>
  );
}
