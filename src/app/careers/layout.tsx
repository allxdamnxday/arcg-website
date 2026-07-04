import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Hiring journeyman glaziers, apprentices, and foremen out of Los Angeles. Steady work, solid pay and benefits.",
  alternates: { canonical: "/careers" },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />
      {children}
    </>
  );
}
