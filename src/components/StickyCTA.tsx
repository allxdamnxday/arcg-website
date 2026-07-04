"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

/**
 * Persistent mobile bid bar. Slides up after the hero scrolls past so a GC has
 * 0–1-tap access to "Request a Bid" from any scroll position. Hidden on the
 * contact page (the form is already there) and on desktop (md:hidden). The
 * show/hide is a CSS transform, so it stays safe under reduced motion.
 */
export default function StickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact") return null;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex bg-navy-deep/95 backdrop-blur-md border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
        <Link
          href="/contact?type=bid"
          onClick={() => track("sticky_cta_bid")}
          className="flex-1 h-14 flex items-center justify-center text-sm font-semibold uppercase tracking-widest text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          Request a Bid
        </Link>
        <a
          href="tel:2132937298"
          aria-label="Call AR Contract Glazing"
          onClick={() => track("sticky_cta_call")}
          className="w-14 h-14 flex items-center justify-center text-accent border-l border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
