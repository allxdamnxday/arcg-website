import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Curtain wall, windows, storefront, specialty glazing, layout, and QA/QC. Commercial glazing subcontractor, LA-based and working nationwide.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
