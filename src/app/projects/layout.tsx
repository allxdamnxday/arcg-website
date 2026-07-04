import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { PROJECTS_LIVE } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by AR Contract Glazing: high-rise curtain wall, specialty glazing, and commercial glazing installations.",
  alternates: { canonical: "/projects" },
  // Staged out of the index until real project photography lands (PROJECTS_LIVE).
  ...(PROJECTS_LIVE ? {} : { robots: { index: false, follow: true } }),
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])} />
      {children}
    </>
  );
}
