"use client";

import { usePathname } from "next/navigation";

/**
 * Re-mounts on every navigation (App Router template semantics), so the
 * curtain-wall panel wipe plays as an enter transition on each route change.
 * Keyed by pathname to guarantee the CSS animation restarts. The overlay is
 * decorative (aria-hidden, pointer-events:none) and disabled under
 * prefers-reduced-motion — see `.route-transition` in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <div key={pathname} className="route-transition" aria-hidden="true">
        <span className="route-transition__panel" />
        <span className="route-transition__panel" />
        <span className="route-transition__panel" />
        <span className="route-transition__panel" />
        <span className="route-transition__panel" />
      </div>
      {children}
    </>
  );
}
