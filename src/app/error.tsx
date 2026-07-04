"use client";

import { useEffect } from "react";
import Button from "@/components/Button";

// Minimal error boundary — imports only Button so it can't depend on code that
// may itself be what broke (no Reveal/GSAP).
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="px-6 md:px-12 lg:px-20 py-32 md:py-44">
      <div className="max-w-2xl">
        <div className="w-24 h-px bg-accent mb-8" />
        <h1 className="font-bebas text-h1 text-navy mb-6">Something Broke</h1>
        <p className="text-gray-600 mb-10">
          Not the glass — just the page. Try again, or call (213) 293-7298 if you&apos;re on a deadline.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={reset}>Try Again</Button>
          <Button href="/" variant="ghost">Go Home</Button>
        </div>
      </div>
    </main>
  );
}
