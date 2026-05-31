import Image from "next/image";
import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        tag="About Us"
        title={"The Crew\nBehind The Glass"}
        subtitle="AR Contract Glazing is a commercial glazing subcontractor based in Los Angeles. We install curtain wall, windows, and storefront on commercial buildings across the country."
      />

      {/* Story */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <Reveal>
            <div className="w-12 h-px bg-navy mb-6" />
            <h2 className="font-bebas text-4xl md:text-5xl text-navy mb-6">Our Story</h2>
            <div className="space-y-4 text-base text-gray-600 leading-relaxed">
              <p>
                Alfonso Rodriguez started AR Contract Glazing to run a glazing company the way
                he&apos;d want to work for one: do the job right, take care of the crew, and stand
                behind the work.
              </p>
              <p>
                We started with a small crew on mid-rise jobs around Los Angeles. Today we install
                for some of the largest general contractors in the country, on work that runs from
                high-rise curtain wall to retail storefront.
              </p>
              <p>
                Our field crews run union-signatory and open-shop jobs across the country. The
                glass has to seal, drain, and hold for the life of the building, so that&apos;s how
                we hang it.
              </p>
            </div>
          </Reveal>
          <Reveal className="relative overflow-hidden rounded-sm min-h-[400px]">
            {/* TODO: Replace with real crew/site photo */}
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
              alt="Construction crew at work"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-warm">
        <Reveal className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-4">What Drives Us</p>
          <h2 className="font-bebas text-4xl md:text-5xl text-navy">Our Values</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Precision",
              desc: "Curtain wall tolerances get measured in millimeters. We hold that standard from layout points through the final punch list.",
            },
            {
              title: "Safety",
              desc: "Our crews work at height on active sites every day. Everyone's OSHA-trained, every lift gets planned, and fall protection isn't optional.",
            },
            {
              title: "Integrity",
              desc: "If we commit to a date, we work to hit it. If something goes wrong in the field, we own it and fix it instead of papering over it.",
            },
          ].map((v, i) => (
            <Reveal key={i} className="text-center">
              <div className="w-12 h-px bg-navy mx-auto mb-6" />
              <h3 className="font-bebas text-2xl text-navy mb-3">{v.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <Reveal className="max-w-4xl">
          <div className="w-12 h-px bg-navy mb-6" />
          <h2 className="font-bebas text-4xl md:text-5xl text-navy mb-8">Credentials</h2>
          {/* TODO(arcg): confirm license number, certifications, and union affiliation below */}
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
                <li>• Ironworkers union signatory contractor</li>
                <li>• Experienced on union and open-shop projects</li>
                <li>• Active on jobs across the United States</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Key People */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-navy text-white">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-4">Leadership</p>
          <h2 className="font-bebas text-4xl md:text-5xl mb-12">Our Team</h2>
          {/* TODO(arcg): confirm titles and bios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alfonso Rodriguez", role: "Owner / Principal", desc: "Founded ARCG after decades in the field. There isn't a system or a site condition he hasn't run into." },
              { name: "Julien Rodriguez", role: "Project Superintendent", desc: "Runs the field. Coordinates crews, holds the schedule, and signs off on the work floor by floor." },
              { name: "Braden Freeman", role: "Operations Administrator", desc: "Keeps the office running: project controls, payroll, compliance, and the systems behind them." },
            ].map((p, i) => (
              <div key={i} className="border border-white/10 p-8">
                <div className="w-16 h-16 bg-white/10 rounded-full mb-4 flex items-center justify-center">
                  <span className="font-bebas text-2xl text-steel">
                    {p.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
                <p className="text-xs uppercase tracking-wider text-steel mb-3">{p.role}</p>
                <p className="text-sm text-white/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <Section size="lg" tone="warm">
        <Reveal className="max-w-2xl">
          <div className="w-24 h-px bg-navy mb-8" />
          <h2 className="font-bebas text-[clamp(40px,5vw,64px)] text-navy leading-[0.95] mb-6">
            Want To Work With Us?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            GCs looking for a glazing sub, start here. Glaziers looking for a crew, check the careers page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact">Contact Us</Button>
            <Button href="/careers" variant="ghost">View Careers</Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
