import type { StaticImageData } from "next/image";
// Real CompanyCam photos from the Kali Hotel job (vision-curated, hand-verified:
// no GC/other-sub branding, timestamps cropped). Static imports give a free blur.
import curtainWall from "../images/services/curtain-wall.webp";
import windowSystems from "../images/services/window-systems.webp";
import storefront from "../images/services/storefront.webp";
import specialtyGlazing from "../images/services/specialty-glazing.webp";
import layoutCoordination from "../images/services/layout.webp";
import qaqc from "../images/services/qaqc.webp";

export interface Service {
  slug: string;
  title: string;
  summary: string;
  description: string;
  features: string[];
  image: string | StaticImageData;
}

export const services: Service[] = [
  {
    slug: "curtain-wall",
    title: "Curtain Wall Systems",
    summary:
      "High-rise unitized and stick-built curtain wall. Our core work, every floor and every condition.",
    description:
      "Our core work. We install unitized and stick-built curtain wall on high-rise commercial and mixed-use towers, from layout through water testing. We've run systems from all the major manufacturers, and we've seen enough field conditions to flag problems before they cost the schedule.",
    features: [
      "Unitized panel installation",
      "Stick-built curtain wall",
      "Structural silicone glazing",
      "Pressure-equalized systems",
      "Multi-story span systems",
    ],
    image: curtainWall,
  },
  {
    slug: "window-systems",
    title: "Window Systems",
    summary:
      "Punch windows, ribbon windows, and operable units. Plumb, level, and weathertight.",
    description:
      "Commercial window systems: punch windows, ribbon windows, and operable units. Every unit goes in plumb, level, and weathertight. We coordinate with the waterproofing and envelope trades so the weather barrier stays continuous.",
    features: [
      "Punch window installation",
      "Ribbon window systems",
      "Operable/awning windows",
      "Thermally broken frames",
      "High-performance glazing",
    ],
    image: windowSystems,
  },
  {
    slug: "storefront-entrances",
    title: "Storefront & Entrances",
    summary:
      "Ground-level storefront, entrances, and doors for commercial and retail.",
    description:
      "Ground-level storefront, entrance doors, and vestibules for commercial and retail. This is the glass people walk up to and put their hands on, so the lines stay clean, the doors swing right, and the hardware gets set properly.",
    features: [
      "Aluminum storefront framing",
      "Entrance door systems",
      "Automatic door operators",
      "Vestibule assemblies",
      "ADA-compliant hardware",
    ],
    image: storefront,
  },
  {
    slug: "specialty-glazing",
    title: "Specialty Glazing",
    summary:
      "Glass railings, skylights, canopies, and custom architectural glass.",
    description:
      "Glass railings, skylights, canopies, and custom architectural glass. When the architect draws something that doesn't come out of a catalog, we work out how to build it and install it. One-off details are where field experience shows.",
    features: [
      "Glass railing systems",
      "Skylight installation",
      "Glass canopies",
      "Custom architectural features",
      "Point-supported glazing",
    ],
    image: specialtyGlazing,
  },
  {
    slug: "layout-coordination",
    title: "Layout & Coordination",
    summary:
      "Field survey, BIM coordination, and layout. We find the clashes before they hit the field.",
    description:
      "Before a panel goes up, we're on site with total stations shooting layout points. We work off the GC's BIM model to find and resolve clashes early, while they're still cheap to fix. Layout sets the pace for everything that follows.",
    features: [
      "Field survey & layout",
      "BIM coordination",
      "Clash detection",
      "Embed & anchor placement",
      "Tolerance management",
    ],
    image: layoutCoordination,
  },
  {
    slug: "qaqc-closeout",
    title: "QA/QC & Closeout",
    summary:
      "Water testing, thermal imaging, and punch list tracking through closeout.",
    description:
      "AAMA water testing, thermal imaging, visual inspections, and punch list tracking through closeout. We check our own work before the envelope consultant shows up, and the closeout package comes back complete.",
    features: [
      "AAMA water testing",
      "Thermal imaging",
      "Visual quality inspections",
      "Punch list management",
      "Closeout documentation",
    ],
    image: qaqc,
  },
];
