// Central site configuration — single source of truth for brand, contact, SEO.

export const SITE = {
  name: "Mortensen AgriSupply",
  legalTagline: "A William Mortensen Company",
  owner: "William Mortensen",
  // Live domain. Used for canonical URLs, OG, sitemap.
  url: "https://www.mortensenagri.farm",
  description:
    "Mortensen AgriSupply is a global farm manure (organic fertilizer) and agricultural equipment supplier serving the U.S., North America, Africa, and customers worldwide.",
  shortDescription:
    "Organic farm manure & agricultural equipment, shipped worldwide.",
  email: "inquiry@mortensenagri.farm",
  // Primary line — used in JSON-LD structured data.
  phone: "+1 (854) 840-4145",
  phoneHref: "+18548404145",
  // All contact numbers, rendered on Contact + Footer.
  phones: [
    { region: "South Carolina", display: "+1 (854) 840-4145", href: "+18548404145" },
    { region: "Florida", display: "+1 (386) 260-8241", href: "+13862608241" },
  ],
  address: {
    street: "1450 Harvest Road",
    locality: "Des Moines",
    region: "IA",
    postalCode: "50301",
    country: "US",
    countryName: "United States",
  },
  geo: { latitude: 41.5868, longitude: -93.625 },
  foundingYear: 2009,
  social: {
    linkedin: "https://www.linkedin.com/company/mortensen-agrisupply",
    facebook: "https://www.facebook.com/mortensenagrisupply",
    x: "https://x.com/mortensenagri",
  },
  twitterHandle: "@mortensenagri",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services & Shipping" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

// Primary SEO keyword targets, reused across metadata.
export const KEYWORDS = [
  "farm manure supplier",
  "organic fertilizer supplier",
  "agricultural equipment",
  "bulk manure for sale",
  "farm equipment exporter",
  "composted manure",
  "agricultural supplies USA",
  "farm supplies Africa",
  "global agricultural equipment shipping",
];
