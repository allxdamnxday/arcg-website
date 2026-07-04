"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PROJECTS_LIVE } from "@/lib/projects";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Focus management for the mobile menu: move focus in on open, trap Tab within
  // the hamburger + links, Escape closes and restores focus to the hamburger.
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    menu?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = [toggleRef.current, ...Array.from(menu?.querySelectorAll<HTMLElement>("a") ?? [])].filter(
        Boolean
      ) as HTMLElement[];
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const links = [
    ...(PROJECTS_LIVE ? [{ href: "/projects", label: "Projects" }] : []),
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
          <Image
            src="/logo.png"
            alt="AR Contract Glazing"
            width={288}
            height={180}
            priority
            className="h-12 w-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="font-bebas text-xl tracking-wider text-navy hidden sm:block">
            AR CONTRACT <span className="text-silver-dark">GLAZING</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`text-sm font-medium link-underline pb-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 ${
                isActive(l.href) ? "text-accent-ink" : "text-gray-800 hover:text-accent-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact?type=bid"
            className="text-sm font-semibold text-navy border-2 border-navy px-6 py-2.5 hover:bg-navy hover:text-white transition-all duration-200 ease-out-quart tracking-wide uppercase text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2"
          >
            Request a Bid
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={toggleRef}
          className="md:hidden flex flex-col items-center justify-center gap-1.5 w-11 h-11 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
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
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              style={{ transitionDelay: menuOpen ? `${i * 60 + 150}ms` : "0ms" }}
              className={`font-bebas text-4xl tracking-wider transition-all duration-500 motion-reduce:transition-none ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              } ${isActive(l.href) ? "text-accent-ink" : "text-navy"}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="w-full max-w-xs border-t border-glass pt-8 flex flex-col items-center gap-4">
            <Link
              href="/contact?type=bid"
              className="w-full min-h-[44px] inline-flex items-center justify-center bg-navy text-white font-semibold uppercase tracking-widest text-sm px-8 py-4 active:bg-navy-deep transition-colors"
            >
              Request a Bid
            </Link>
            <a href="tel:2132937298" className="text-navy font-semibold tracking-wide">
              (213) 293-7298
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
