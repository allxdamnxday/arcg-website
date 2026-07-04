import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 px-6 md:px-12 lg:px-20 pt-20 pb-28 md:pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="lg:col-span-2">
          <span className="font-bebas text-2xl tracking-wider text-white block mb-4">
            AR CONTRACT <span className="text-silver">GLAZING</span>
          </span>
          <p className="text-sm leading-relaxed max-w-sm">
            Commercial glazing subcontractor. High-rise curtain wall, windows,
            and storefront. Los Angeles-based, working nationwide.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-silver mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services" className="inline-block py-1 hover:text-white link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink">Services</Link></li>
            <li><Link href="/about" className="inline-block py-1 hover:text-white link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink">About</Link></li>
            <li><Link href="/careers" className="inline-block py-1 hover:text-white link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-silver mb-4">
            Contact
          </h4>
          <a
            href="tel:2132937298"
            className="inline-flex items-center gap-2.5 border border-white/25 rounded-sm px-4 py-2.5 mb-4 text-white font-semibold hover:bg-white/10 hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-accent">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (213) 293-7298
          </a>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:info@arcontractglazing.com" className="inline-block py-1 hover:text-white link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink">info@arcontractglazing.com</a></li>
            <li>726 S Santa Fe #400<br />Los Angeles, CA 90021</li>
            <li className="pt-2 text-xs text-white/60">CA Lic C17-621340</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between text-xs text-white/60">
        <span>© {new Date().getFullYear()} AR Contract Glazing. All rights reserved.</span>
        <span>Los Angeles, CA</span>
      </div>
    </footer>
  );
}
