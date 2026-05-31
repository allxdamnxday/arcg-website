import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

const openings = [
  {
    title: "Journeyman Glazier / Ironworker",
    type: "Full-Time",
    location: "Los Angeles, CA (Field)",
    description:
      "We need experienced curtain wall and window installers for active high-rise jobs. Three years of commercial glazing minimum. We run union and open-shop work across the country.",
    requirements: [
      "3+ years commercial glazing experience",
      "Curtain wall installation experience preferred",
      "OSHA 10 certification minimum",
      "Comfortable working at height",
      "Valid CA driver's license",
    ],
  },
  {
    title: "Apprentice Glazier",
    type: "Full-Time · Apprenticeship",
    location: "Los Angeles, CA (Field)",
    description:
      "Want to learn the trade? You'll work alongside experienced journeymen learning curtain wall installation, earning pay and benefits from day one.",
    requirements: [
      "High school diploma or GED",
      "Physically fit; this is demanding work",
      "Reliable transportation",
      "Willingness to learn and work hard",
      "No fear of heights",
      "Basic tool knowledge helpful",
    ],
  },
  {
    title: "Foreman",
    type: "Full-Time",
    location: "Los Angeles, CA (Field)",
    description:
      "Lead a crew of 4–8 glaziers on commercial jobs. You own daily production, quality, safety, and coordination with the GC. You can read drawings, run people, and keep a floor moving.",
    requirements: [
      "5+ years commercial glazing experience",
      "Prior foreman or lead experience",
      "Ability to read architectural and shop drawings",
      "Strong communication skills",
      "OSHA 30 certification",
      "Experience with daily reporting",
    ],
  },
];

export default function CareersPage() {
  return (
    <main>
      <PageHero
        tag="Careers"
        title={"Hiring Skilled\nGlaziers"}
        subtitle="We're hiring glaziers for high-rise and commercial work. Steady hours, solid pay and benefits, and jobs you'll be glad to put your name on."
      />

      {/* Why ARCG */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <Reveal start="top 85%" className="max-w-4xl">
          <div className="w-12 h-px bg-navy mb-6" />
          <h2 className="font-bebas text-4xl md:text-5xl text-navy mb-6">Why ARCG?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Pay & Benefits", desc: "Solid pay plus health insurance, retirement, and paid time off. We take care of the people who do the work." },
              { title: "Real Projects", desc: "High-rises and commercial buildings you can drive past and point to. The kind of jobs worth showing up for." },
              { title: "Steady Work", desc: "We keep a steady backlog. When one job wraps, the next one's already lined up, so the work doesn't dry up between projects." },
              { title: "Respect", desc: "We treat the crew like the professionals they are. Show up, do good work, and you'll be treated right." },
            ].map((item, i) => (
              <div key={i} className="border-l-2 border-steel pl-6">
                <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Openings */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-warm">
        <Reveal start="top 85%" className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel mb-4">Current Openings</p>
          <h2 className="font-bebas text-4xl md:text-5xl text-navy">Open Positions</h2>
        </Reveal>

        <div className="space-y-6 max-w-4xl">
          {openings.map((job, i) => (
            <Reveal key={i} start="top 85%" className="bg-white border border-glass p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="font-bebas text-2xl md:text-3xl text-navy">{job.title}</h3>
                  <p className="text-sm text-steel mt-1">{job.type} · {job.location}</p>
                </div>
                <Button
                  href={`mailto:info@arcontractglazing.com?subject=Application: ${job.title}`}
                  size="sm"
                  className="mt-4 md:mt-0 flex-shrink-0"
                >
                  Apply Now
                </Button>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{job.description}</p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-silver-dark mb-3">Requirements</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {job.requirements.map((req, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-steel rounded-full flex-shrink-0 mt-1.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* General Application */}
      <Section size="lg" tone="navy" className="text-center">
        <h2 className="font-bebas text-[clamp(40px,5vw,64px)] mb-4">Don&apos;t See Your Role?</h2>
        <p className="text-white/70 max-w-md mx-auto mb-10">
          We&apos;re always glad to hear from skilled glaziers. Send your info and we&apos;ll keep it on file for the next opening.
        </p>
        <Button href="mailto:info@arcontractglazing.com?subject=General Application" variant="white">
          Send Your Info
        </Button>
      </Section>
    </main>
  );
}
