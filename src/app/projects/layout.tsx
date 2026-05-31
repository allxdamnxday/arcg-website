import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by AR Contract Glazing: high-rise curtain wall, specialty glazing, and commercial glazing installations.",
  alternates: { canonical: "/projects" },
  // Staged out of the index until real project photography lands.
  robots: { index: false, follow: true },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
