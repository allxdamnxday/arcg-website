import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
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
        <SmoothScroll />
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
