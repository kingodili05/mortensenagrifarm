// JSON-LD structured data builders for rich results in Google.

import { SITE } from "./site";
import type { Product } from "./data";

const postalAddresses = SITE.addresses.map((a) => ({
  "@type": "PostalAddress",
  streetAddress: a.street,
  addressLocality: a.locality,
  addressRegion: a.region,
  postalCode: a.postalCode,
  addressCountry: a.country,
}));

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    description: SITE.description,
    foundingDate: String(SITE.foundingYear),
    founder: { "@type": "Person", name: SITE.owner },
    email: SITE.email,
    telephone: SITE.phone,
    address: postalAddresses,
    sameAs: [SITE.social.linkedin, SITE.social.facebook, SITE.social.x],
    areaServed: [
      "United States",
      "North America",
      "Africa",
      "Europe",
      "Asia",
      "Worldwide",
    ],
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    // WholesaleStore is the most specific Schema.org type for a bulk agri supplier.
    "@type": "WholesaleStore",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    parentOrganization: { "@id": `${SITE.url}/#organization` },
    sameAs: [SITE.social.linkedin, SITE.social.facebook, SITE.social.x],
    image: `${SITE.url}/opengraph-image`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    address: postalAddresses,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };
}

export function productJsonLd(product: Product) {
  const productUrl = `${SITE.url}/products/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": productUrl,
    name: product.name,
    category: product.categoryLabel,
    description: product.summary,
    image: `${SITE.url}${product.image}`,
    brand: { "@type": "Brand", name: SITE.name },
    additionalProperty: product.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.label,
      value: s.value,
    })),
    offers: {
      "@type": "Offer",
      "@id": `${productUrl}#offer`,
      url: productUrl,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      // Quote-based pricing — 0 signals "request a quote" to Google.
      price: "0",
      seller: { "@id": `${SITE.url}/#organization` },
      areaServed: "Worldwide",
    },
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
      item: `${SITE.url}${item.path}`,
    })),
  };
}
