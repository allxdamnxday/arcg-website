"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    // { href: "/projects", label: "Projects" }, // Hidden until media content is ready
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 px-6 md:px-12 h-20 flex items-center justify-between transition-all duration-500 ${
          scrolled || pathname !== "/"
            ? "bg-white/95 backdrop-blur-md border-b border-glass"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="AR Contract Glazing"
            className="h-12 w-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="font-bebas text-xl tracking-wider text-navy hidden sm:block">
            AR CONTRACT <span className="text-silver">GLAZING</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                isActive(l.href) ? "text-steel" : "text-gray-800 hover:text-steel"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-semibold text-navy border-2 border-navy px-6 py-2.5 hover:bg-navy hover:text-white transition-all duration-300 tracking-wide uppercase text-xs"
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-navy transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-navy transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-navy transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {[...links, { href: "/contact", label: "Contact" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-bebas text-4xl tracking-wider ${
                isActive(l.href) ? "text-steel" : "text-navy"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
