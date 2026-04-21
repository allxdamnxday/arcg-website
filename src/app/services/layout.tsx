import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Curtain wall, window systems, storefront, specialty glazing, layout & coordination, and QA/QC. Full-service commercial glazing in Los Angeles.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
