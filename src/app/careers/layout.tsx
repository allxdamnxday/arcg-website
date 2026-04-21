import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the ARCG crew. Journeyman glazier, apprentice, and foreman openings in Los Angeles. Competitive pay, steady work, real projects.",
  alternates: { canonical: "/careers" },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
