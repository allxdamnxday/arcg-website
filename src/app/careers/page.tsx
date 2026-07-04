import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import ApplyForm from "@/components/ApplyForm";

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

// TODO(arcg): confirm union benefits phrasing; do not publish dollar figures without sign-off.
const why = [
  { title: "Pay & Benefits", desc: "Scale wages and benefits per the Local 433 agreement on union jobs. Health, pension, and PTO." },
  { title: "Real Projects", desc: "High-rises and commercial buildings you can drive past and point to. The kind of jobs worth showing up for." },
  { title: "Steady Work", desc: "We keep a steady backlog. When one job wraps, the next one's already lined up, so the work doesn't dry up between projects." },
  { title: "Respect", desc: "We treat the crew like the professionals they are. Show up, do good work, and you'll be treated right." },
];

export default function CareersPage() {
  return (
    <main id="main">
      <PageHero
        tag="Careers"
        title={"Hiring Skilled\nGlaziers"}
        subtitle="We're hiring glaziers for high-rise and commercial work. Steady hours, solid pay and benefits, and jobs you'll be glad to put your name on."
      />

      {/* Why ARCG */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <Reveal start="top 85%" className="lg:col-span-4">
            <div className="w-12 h-px bg-accent mb-6" />
            <h2 className="font-bebas text-h2 text-navy">Why ARCG?</h2>
          </Reveal>
          <Reveal variant="stagger" start="top 85%" className="lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {why.map((item, i) => (
              <div key={i} className="border-l-2 border-accent pl-6">
                <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Openings */}
      <Section tone="warm">
        <Reveal start="top 85%" className="mb-12">
          <p className="eyebrow text-accent-ink mb-4">Current Openings</p>
          <h2 className="font-bebas text-h2 text-navy">Open Positions</h2>
        </Reveal>

        <div className="space-y-6 max-w-4xl">
          {openings.map((job, i) => (
            <Reveal key={i} start="top 85%" className="bg-white border border-glass p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="font-bebas text-h3 text-navy">{job.title}</h3>
                  <p className="text-sm text-steel-ink mt-1">{job.type} · {job.location}</p>
                </div>
                <div className="mt-4 md:mt-0 flex-shrink-0 md:text-right">
                  <Button
                    href={`mailto:info@arcontractglazing.com?subject=Application: ${job.title}`}
                    size="sm"
                  >
                    Apply Now
                  </Button>
                  {/* TODO(arcg): confirm (213) 293-7298 receives SMS; if not, "or call" */}
                  <p className="text-xs text-silver-dark mt-2">or call/text (213) 293-7298</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{job.description}</p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-silver-dark mb-3">Requirements</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {job.requirements.map((req, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* General Application */}
      <Section tone="navy">
        <div className="max-w-2xl mb-10">
          <div className="w-12 h-px bg-accent mb-6" />
          <h2 className="font-bebas text-h1 mb-4">Don&apos;t See Your Role?</h2>
          <p className="text-white/70">
            We&apos;re always glad to hear from skilled glaziers. Send your info and we&apos;ll keep it on
            file for the next opening, or call/text (213) 293-7298.
          </p>
        </div>
        <ApplyForm positions={openings.map((o) => o.title)} />
      </Section>
    </main>
  );
}
