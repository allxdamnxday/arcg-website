import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/70 px-6 md:px-12 lg:px-20 pt-20 pb-8">
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
            <li><Link href="/services" className="inline-block py-1 hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/about" className="inline-block py-1 hover:text-white transition-colors">About</Link></li>
            <li><Link href="/careers" className="inline-block py-1 hover:text-white transition-colors">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-silver mb-4">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:info@arcontractglazing.com" className="inline-block py-1 hover:text-white transition-colors">info@arcontractglazing.com</a></li>
            <li><a href="tel:2132937298" className="inline-block py-1 hover:text-white transition-colors">(213) 293-7298</a></li>
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
