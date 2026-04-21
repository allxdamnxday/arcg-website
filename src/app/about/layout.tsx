import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "AR Contract Glazing is a Los Angeles-based commercial glazing subcontractor. Founded by Alfonso Rodriguez, CA Lic C17-621340.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
