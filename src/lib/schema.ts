import { services } from "@/lib/services";

const SITE = "https://arcontractglazing.com";

/** Absolute URL for a service image whether it's a remote string or a static import. */
function imageUrl(image: unknown): string {
  const src = typeof image === "string" ? image : (image as { src: string }).src;
  return src.startsWith("http") ? src : SITE + src;
}

// GeneralContractor (a LocalBusiness subtype) + WebSite. Every field already
// appears on the site — no new claims. Deliberately EXCLUDED until owner-supplied:
// aggregateRating, review, foundingDate, numberOfEmployees, openingHoursSpecification,
// geo, sameAs. TODO(arcg): confirm CSLB record entity name matches before launch.
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GeneralContractor",
        "@id": `${SITE}/#organization`,
        name: "AR Contract Glazing",
        alternateName: "ARCG",
        url: SITE,
        logo: `${SITE}/logo.png`,
        image: `${SITE}/opengraph-image`,
        telephone: "+12132937298",
        email: "info@arcontractglazing.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "726 S Santa Fe Ave #400",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          postalCode: "90021",
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "State", name: "California" },
          { "@type": "Country", name: "United States" },
        ],
        knowsAbout: [
          "Curtain wall installation",
          "Commercial window systems",
          "Storefront and entrances",
          "Specialty glazing",
          "BIM coordination",
          "AAMA water testing",
        ],
        identifier: {
          "@type": "PropertyValue",
          name: "CSLB License",
          value: "C17-621340",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "AR Contract Glazing",
        alternateName: "ARCG",
        publisher: { "@id": `${SITE}/#organization` },
      },
    ],
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      name: s.title,
      serviceType: s.title,
      description: s.summary,
      provider: { "@id": `${SITE}/#organization` },
      areaServed: { "@type": "Country", name: "United States" },
      image: imageUrl(s.image),
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: SITE + item.path,
    })),
  };
}
