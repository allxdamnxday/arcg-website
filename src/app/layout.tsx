import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AR Contract Glazing — Commercial Glazing, Los Angeles",
    template: "%s | AR Contract Glazing",
  },
  description:
    "High-rise curtain wall installation, window systems, and specialty glazing in Southern California. Precision built.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
