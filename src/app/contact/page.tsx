"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PageHero from "@/components/PageHero";

export default function ContactPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up form submission (Formspree, Netlify Forms, or API route)
    setSubmitted(true);
  };

  return (
    <main ref={ref}>
      <PageHero
        tag="Get In Touch"
        title={"Let's Talk\nAbout Your Project"}
        subtitle="Whether you're bidding a tower or planning a build — we'd like to hear about it."
      />

      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <div className="contact-reveal">
            {submitted ? (
              <div className="bg-warm border border-glass p-12 text-center">
                <div className="w-16 h-px bg-navy mx-auto mb-6" />
                <h3 className="font-bebas text-3xl text-navy mb-3">Message Sent</h3>
                <p className="text-gray-600">We&apos;ll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-silver mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-glass px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors bg-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-silver mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      className="w-full border border-glass px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors bg-transparent"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-silver mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border border-glass px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors bg-transparent"
                      placeholder="email@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-silver mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-glass px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors bg-transparent"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-silver mb-2">
                    Project Type
                  </label>
                  <select className="w-full border border-glass px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors bg-transparent text-gray-700">
                    <option value="">Select a project type</option>
                    <option value="curtain-wall">Curtain Wall</option>
                    <option value="windows">Window Systems</option>
                    <option value="storefront">Storefront & Entrances</option>
                    <option value="specialty">Specialty Glazing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-silver mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full border border-glass px-4 py-3 text-sm focus:outline-none focus:border-navy transition-colors bg-transparent resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-navy text-white px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-steel transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="contact-reveal space-y-10">
            <div>
              <h3 className="font-bebas text-2xl text-navy mb-4">Office</h3>
              <div className="space-y-2 text-gray-600 text-sm">
                <p>726 S Santa Fe #400</p>
                <p>Los Angeles, CA 90021</p>
              </div>
            </div>
            <div>
              <h3 className="font-bebas text-2xl text-navy mb-4">Direct</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="tel:2132937298" className="text-gray-600 hover:text-navy transition-colors">
                    (213) 293-7298
                  </a>
                </p>
                <p>
                  <a href="mailto:info@ARCglazing.com" className="text-gray-600 hover:text-navy transition-colors">
                    info@ARCglazing.com
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bebas text-2xl text-navy mb-4">License</h3>
              <p className="text-sm text-gray-600">CA Contractor License C17-621340</p>
              <p className="text-sm text-gray-600">Union signatory contractor</p>
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
