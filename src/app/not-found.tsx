import type { Metadata } from "next";
import Button from "@/components/Button";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <main id="main" className="px-6 md:px-12 lg:px-20 py-32 md:py-44">
      <div className="max-w-2xl">
        <div className="w-24 h-px bg-accent mb-8" />
        <p className="font-bebas text-[clamp(80px,15vw,180px)] text-navy leading-none">404</p>
        <h1 className="font-bebas text-h1 text-navy mb-6">Page Not Found</h1>
        <p className="text-gray-600 mb-10">That link is dead or the page moved.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/">Go Home</Button>
          <Button href="/contact?type=bid" variant="ghost">Request a Bid</Button>
        </div>
      </div>
    </main>
  );
}
