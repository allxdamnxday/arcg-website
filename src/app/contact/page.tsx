import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

const NEXT_STEPS = [
  "We confirm receipt within one business day.",
  "We walk the drawings and call with questions.",
  "You get a number by your bid date.",
];

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        tag="Request a Bid"
        title={"Send Us\nThe Drawings"}
        subtitle="Bid invites, plan links, scope questions. We confirm receipt within one business day."
      />

      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <div>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="font-bebas text-h3 text-navy mb-6">What Happens Next</h2>
              <ol className="divide-y divide-glass">
                {NEXT_STEPS.map((step, i) => (
                  <li key={i} className="flex gap-5 py-4 first:pt-0">
                    <span className="font-bebas text-2xl leading-none text-navy/15">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm text-gray-600 leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="font-bebas text-h3 text-navy mb-4">Office</h2>
              <div className="space-y-2 text-gray-600 text-sm">
                <p>726 S Santa Fe #400</p>
                <p>Los Angeles, CA 90021</p>
              </div>
            </div>
            <div>
              <h2 className="font-bebas text-h3 text-navy mb-4">Direct</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="tel:2132937298" className="text-gray-600 hover:text-navy link-underline">(213) 293-7298</a>
                </p>
                <p>
                  <a href="mailto:info@arcontractglazing.com" className="text-gray-600 hover:text-navy link-underline">info@arcontractglazing.com</a>
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-bebas text-h3 text-navy mb-4">License</h2>
              <p className="text-sm text-gray-600">CA Contractor License C17-621340</p>
              {/* TODO(arcg): confirm Local 433 for public use — until then "Union signatory contractor" */}
              <p className="text-sm text-gray-600">Ironworkers Local 433 signatory</p>
              <p className="text-sm text-gray-600">Prequal package on request</p>
            </div>

            {/* Map */}
            <div className="aspect-[4/3] bg-glass rounded-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.2!2d-118.2335!3d34.0315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c636a4f1c47f%3A0x0!2s726+S+Santa+Fe+Ave+Los+Angeles+CA+90021!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AR Contract Glazing Office Location"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
