import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AR Contract Glazing. (213) 293-7298 · info@arcontractglazing.com · 726 S Santa Fe Ave, Los Angeles, CA 90021.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
