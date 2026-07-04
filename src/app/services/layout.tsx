import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { servicesJsonLd, breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-service commercial glazing: curtain wall, windows, storefront, and specialty systems. Self-performed from layout through closeout.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      {children}
    </>
  );
}
