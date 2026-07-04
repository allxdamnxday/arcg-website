import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import StickyCTA from "@/components/StickyCTA";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/schema";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas", display: "swap" });

const SITE = "https://arcontractglazing.com";
const DESCRIPTION =
  "High-rise curtain wall, window systems, and specialty glazing. Los Angeles-based commercial glazing subcontractor, working nationwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "AR Contract Glazing — Commercial Glazing, Los Angeles",
    template: "%s | AR Contract Glazing",
  },
  description: DESCRIPTION,
  applicationName: "AR Contract Glazing",
  alternates: { canonical: "/" },
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
    <html lang="en" className={`${inter.variable} ${bebas.variable}`}>
      <body className="bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-navy focus:text-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Skip to content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <SmoothScroll />
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
        <StickyCTA />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
