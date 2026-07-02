// Catalog and content data. Replace placeholder copy/specs with real product data at launch.

export type Product = {
  slug: string;
  name: string;
  category: "manure" | "equipment";
  categoryLabel: string;
  summary: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  imageAlt: string;
  unit: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "composted-cattle-manure",
    name: "Composted Cattle Manure",
    category: "manure",
    categoryLabel: "Organic Fertilizer",
    summary:
      "Fully matured, weed-seed-free composted cattle manure for field application and soil building.",
    description:
      "Our composted cattle manure is windrow-composted and screened for a uniform, easy-to-spread product. Rich in stable organic matter, it improves soil structure, water retention, and microbial activity across row crops, pasture, and horticulture.",
    specs: [
      { label: "Organic matter", value: "≥ 45%" },
      { label: "N-P-K (typical)", value: "2-1-2" },
      { label: "Moisture", value: "30–35%" },
      { label: "Packaging", value: "Bulk, 1-ton totes, 40 lb bags" },
    ],
    image: "/products/composted-cattle-manure.svg",
    imageAlt: "Pile of dark screened composted cattle manure ready for field spreading",
    unit: "per ton",
  },
  {
    slug: "poultry-litter-pellets",
    name: "Poultry Litter Pellets",
    category: "manure",
    categoryLabel: "Organic Fertilizer",
    summary:
      "High-nitrogen pelletized poultry litter — clean handling, precise spreading, low odor.",
    description:
      "Heat-treated and pelletized poultry litter delivering a concentrated organic nutrient charge. Pellets flow cleanly through standard fertilizer spreaders and air-seeders, making them ideal for broadacre and export markets.",
    specs: [
      { label: "N-P-K (typical)", value: "4-3-3" },
      { label: "Form", value: "6 mm pellet" },
      { label: "Pathogen status", value: "Heat-treated, certified" },
      { label: "Packaging", value: "Bulk, 1-ton totes, 50 lb bags" },
    ],
    image: "/products/poultry-litter-pellets.svg",
    imageAlt: "Close-up of brown pelletized poultry litter organic fertilizer",
    unit: "per ton",
  },
  {
    slug: "worm-castings",
    name: "Premium Worm Castings",
    category: "manure",
    categoryLabel: "Organic Fertilizer",
    summary:
      "Microbially active vermicompost for high-value horticulture, nurseries, and greenhouses.",
    description:
      "Pure worm castings (vermicompost) packed with beneficial microbes and plant-available nutrients. A premium soil amendment for transplants, potting mixes, and high-value specialty crops.",
    specs: [
      { label: "Organic matter", value: "≥ 50%" },
      { label: "Microbial activity", value: "High" },
      { label: "pH", value: "6.8–7.2" },
      { label: "Packaging", value: "20 lb & 30 lb bags, totes" },
    ],
    image: "/products/worm-castings.svg",
    imageAlt: "Fine dark worm castings vermicompost soil amendment",
    unit: "per bag",
  },
  {
    slug: "manure-spreader",
    name: "Hydraulic Manure Spreader",
    category: "equipment",
    categoryLabel: "Agricultural Equipment",
    summary:
      "Heavy-duty PTO-driven manure spreader with hydraulic apron and dual vertical beaters.",
    description:
      "Built for daily commercial use, this spreader handles solid and semi-solid manure with an even, wide spread pattern. Galvanized body, sealed bearings, and a variable-speed apron deliver precise application rates.",
    specs: [
      { label: "Capacity", value: "16–22 cu yd" },
      { label: "Drive", value: "PTO 1000 rpm" },
      { label: "Spread width", value: "Up to 12 m" },
      { label: "Body", value: "Hot-dip galvanized steel" },
    ],
    image: "/products/manure-spreader.svg",
    imageAlt: "Green PTO-driven hydraulic manure spreader trailer",
    unit: "per unit",
  },
  {
    slug: "compact-utility-tractor",
    name: "Compact Utility Tractor",
    category: "equipment",
    categoryLabel: "Agricultural Equipment",
    summary:
      "45–75 HP diesel utility tractor with front loader — versatile for farms of every scale.",
    description:
      "A rugged, fuel-efficient utility tractor configured for loader work, spreading, and haulage. Synchro-shuttle transmission, 4WD, and a category-2 three-point hitch make it the workhorse of mixed operations.",
    specs: [
      { label: "Power", value: "45–75 HP" },
      { label: "Drive", value: "4WD" },
      { label: "Hitch", value: "Category 2, 3-point" },
      { label: "Hydraulics", value: "Dual remote outlets" },
    ],
    image: "/products/compact-utility-tractor.svg",
    imageAlt: "Green and steel compact utility farm tractor with front loader",
    unit: "per unit",
  },
  {
    slug: "broadcast-spreader",
    name: "Pull-Behind Broadcast Spreader",
    category: "equipment",
    categoryLabel: "Agricultural Equipment",
    summary:
      "Stainless-hopper broadcast spreader for pelletized fertilizer and seed at high throughput.",
    description:
      "A pull-behind broadcast spreader with a corrosion-proof stainless hopper, calibrated gate, and twin spinner discs. Designed for accurate, high-acre coverage of pelletized organic fertilizers.",
    specs: [
      { label: "Hopper", value: "1,200 lb stainless" },
      { label: "Spread width", value: "9–18 m" },
      { label: "Control", value: "Calibrated rate gate" },
      { label: "Tires", value: "Flotation, low-compaction" },
    ],
    image: "/products/broadcast-spreader.svg",
    imageAlt: "Pull-behind broadcast fertilizer spreader with stainless hopper",
    unit: "per unit",
  },
];

export const CATEGORIES = [
  {
    key: "manure" as const,
    title: "Farm Manure & Organic Fertilizer",
    blurb:
      "Composted manure, pelletized litter, and vermicompost — laboratory-tested and ready to build healthier soil.",
    icon: "leaf",
  },
  {
    key: "equipment" as const,
    title: "Agricultural Equipment",
    blurb:
      "Spreaders, tractors, and implements engineered for commercial reliability and export-grade durability.",
    icon: "gear",
  },
];

export const VALUE_PROPS = [
  {
    title: "Laboratory-Tested Quality",
    body: "Every batch of manure and fertilizer is lab-analyzed for nutrient content and pathogen safety — with a certificate of analysis on request.",
    icon: "flask",
  },
  {
    title: "Worldwide Logistics",
    body: "Container, bulk, and palletized shipping with full export documentation to the U.S., North America, Africa, and beyond.",
    icon: "globe",
  },
  {
    title: "Volume & Wholesale Pricing",
    body: "Direct-from-source pricing with tiered discounts for cooperatives, distributors, and large-acre operations.",
    icon: "tag",
  },
  {
    title: "Agronomist Support",
    body: "Talk to real agronomists for application rates, soil-building plans, and equipment selection tailored to your crop.",
    icon: "headset",
  },
];

export const REGIONS = [
  {
    name: "United States",
    detail: "Nationwide bulk and bagged delivery from regional hubs.",
  },
  {
    name: "Canada & Mexico",
    detail: "Cross-border freight with full customs and phytosanitary paperwork.",
  },
  {
    name: "Africa",
    detail:
      "Container export to West, East, and Southern Africa via major ports.",
  },
  {
    name: "Europe & Middle East",
    detail: "EU-compliant organic documentation and palletized sea freight.",
  },
  {
    name: "Asia-Pacific",
    detail: "Scheduled container shipping to key APAC agricultural markets.",
  },
  {
    name: "Latin America",
    detail: "Bulk and project shipments for plantations and cooperatives.",
  },
];

export const SHIPPING_STEPS = [
  {
    step: "01",
    title: "Quote & Specification",
    body: "Share your crop, volume, and destination. We confirm product specs, pricing, and the most economical shipping mode.",
  },
  {
    step: "02",
    title: "Documentation & Compliance",
    body: "We prepare export, customs, organic, and phytosanitary documents required for your country of import.",
  },
  {
    step: "03",
    title: "Packaging & Loading",
    body: "Goods are packaged to international standards — bulk, 1-ton totes, bags, or containerized equipment — and inspected before loading.",
  },
  {
    step: "04",
    title: "Freight & Tracking",
    body: "Sea, land, or multimodal freight with shipment tracking and a dedicated coordinator until delivery is confirmed.",
  },
];

export function productsByCategory(category: Product["category"]) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, limit = 3) {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, limit);
}
