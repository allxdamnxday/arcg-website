import Image from "next/image";
import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { team } from "@/lib/team";
import { BLUR_NAVY } from "@/lib/image";
import crewPhoto from "@/images/about/crew.webp";

const PREQUAL_ROWS: [string, string][] = [
  ["Bonding capacity", "In prequal package"],
  ["EMR & OSHA logs", "In prequal package"],
  ["COI (GL · Umbrella · WC)", "In prequal package"],
  ["References", "On request"],
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        tag="About Us"
        title={"The Crew\nBehind The Glass"}
        subtitle="AR Contract Glazing is a commercial glazing subcontractor based in Los Angeles. We install curtain wall, windows, and storefront on commercial buildings across the country."
      />

      {/* Story */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <Reveal>
            <div className="w-12 h-px bg-accent mb-6" />
            <h2 className="font-bebas text-h2 text-navy mb-6">Our Story</h2>
            <div className="space-y-4 text-base text-gray-600 leading-relaxed">
              <p>
                Alfonso Rodriguez started AR Contract Glazing to run a glazing company the way
                he&apos;d want to work for one: do the job right, take care of the crew, and stand
                behind the work.
              </p>
              <p>
                We started with a small crew on mid-rise jobs around Los Angeles. Today we install
                for national GCs on work that runs from high-rise curtain wall to retail storefront.
              </p>
              <p>
                Our field crews run union-signatory and open-shop jobs across the country. The
                glass has to seal, drain, and hold for the life of the building, so that&apos;s how
                we hang it.
              </p>
            </div>
          </Reveal>
          <Reveal variant="glass" className="relative overflow-hidden rounded-sm bg-glass min-h-[400px]">
            <Image
              src={crewPhoto}
              alt="AR Contract Glazing crew setting a curtain-wall glass unit at the Hollywood Park job"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-navy/15" />
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section tone="warm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="w-12 h-px bg-accent mb-6" />
            <p className="eyebrow text-accent-ink mb-4">What Drives Us</p>
            <h2 className="font-bebas text-h2 text-navy">Our Values</h2>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6 divide-y divide-glass">
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
              <Reveal key={i} className="flex gap-6 py-8 first:pt-0 last:pb-0">
                <span className="font-bebas text-3xl leading-none text-navy/15 pt-1">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-bebas text-h3 text-navy mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Credentials */}
      <Section>
        <Reveal className="max-w-5xl">
          <div className="w-12 h-px bg-accent mb-6" />
          <h2 className="font-bebas text-h2 text-navy mb-8">Credentials</h2>
          {/* TODO(arcg): confirm license entity matches CSLB record, cert list, Local 433 status, and bonding/EMR values before swapping "In prequal package" for real numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-navy mb-3">License &amp; Safety</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  CA Contractors License C17 (Glass &amp; Glazing) #621340 ·{" "}
                  <a
                    href="https://www.cslb.ca.gov/onlineservices/checklicenseII/LicenseDetail.aspx?LicNum=621340"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-ink link-underline"
                  >
                    Verify on CSLB →
                  </a>
                </li>
                <li>OSHA 30-Hour (all supervisors)</li>
                <li>Fall Protection Competent Person</li>
                <li>Aerial Lift &amp; Scaffold certified</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-navy mb-3">Union</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Ironworkers Local 433 signatory</li>
                <li>Union and open-shop capable — we staff both</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-navy mb-3">For Preconstruction Teams</h3>
              <dl className="text-sm">
                {PREQUAL_ROWS.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-glass py-2">
                    <dt className="text-gray-600">{k}</dt>
                    <dd className="text-navy font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <Button href="/contact?prefill=prequal" size="sm" variant="ghost" className="mt-6">
                Request the Prequal Package
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-8 max-w-2xl">
            We keep a current prequal package: COI, bond letter, EMR letter, license copy, W-9, and
            references. Ask and we&apos;ll send it.
          </p>
        </Reveal>
      </Section>

      {/* Key People */}
      <Section tone="navy">
        <Reveal>
          <p className="eyebrow text-accent mb-4">Leadership</p>
          <h2 className="font-bebas text-h2 mb-12">Our Team</h2>
          {/* TODO(arcg): confirm titles and bios; add real headshots (photo field) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((p, i) => (
              <div key={i} className="border border-white/10 p-8">
                {p.photo ? (
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-white/5">
                    <Image src={p.photo} alt={p.name} fill sizes="(min-width: 1024px) 25vw, 50vw" placeholder="blur" blurDataURL={BLUR_NAVY} className="object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-px bg-accent mb-6" />
                )}
                <p className="text-xs uppercase tracking-wider text-accent mb-2">{p.role}</p>
                <h3 className="font-bebas text-h3 text-white mb-3">{p.name}</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-3">{p.bio}</p>
                <p className="text-sm text-white/50">On your job: {p.forGCs}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section size="xl" tone="warm">
        <Reveal className="max-w-2xl">
          <div className="w-24 h-px bg-accent mb-8" />
          <h2 className="font-bebas text-h1 text-navy mb-6">
            Want To Work With Us?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            GCs looking for a glazing sub, start here. Glaziers looking for a crew, check the careers page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact?type=bid">Request a Bid</Button>
            <Button href="/careers" variant="ghost">View Careers</Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
