import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About",
  description:
    "AR Contract Glazing is a Los Angeles-based commercial glazing subcontractor working nationwide. Founded by Alfonso Rodriguez. CA Lic C17-621340.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      {children}
    </>
  );
}
