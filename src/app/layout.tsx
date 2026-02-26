import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AR Contract Glazing — Commercial Glazing, Los Angeles",
  description: "High-rise curtain wall installation, window systems, and specialty glazing in Southern California. Union ironworkers, precision built.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
