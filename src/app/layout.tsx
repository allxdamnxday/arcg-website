import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE = "https://arcontractglazing.com";
const DESCRIPTION =
  "High-rise curtain wall installation, window systems, and specialty glazing in Southern California. Precision built.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "AR Contract Glazing — Commercial Glazing, Los Angeles",
    template: "%s | AR Contract Glazing",
  },
  description: DESCRIPTION,
  applicationName: "AR Contract Glazing",
  keywords: [
    "commercial glazing",
    "curtain wall installation",
    "Los Angeles glazing contractor",
    "high-rise glass",
    "storefront glazing",
    "glazing subcontractor",
    "AR Contract Glazing",
  ],
  authors: [{ name: "AR Contract Glazing" }],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "AR Contract Glazing",
    title: "AR Contract Glazing — Commercial Glazing, Los Angeles",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AR Contract Glazing — Commercial Glazing, Los Angeles",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
