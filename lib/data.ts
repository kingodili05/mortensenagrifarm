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
    image: "/products/composted-cattle-manure.jpg",
    imageAlt:
      "Close-up of rich, dark screened composted cattle manure with visible organic matter",
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
    image: "/products/poultry-litter-pellets.jpg",
    imageAlt:
      "Pile of golden-brown pelletized poultry litter granules on a dark background",
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
    image: "/products/worm-castings.jpg",
    imageAlt:
      "Hands holding fresh dark worm castings vermicompost with a live earthworm",
    unit: "per bag",
  },
  {
    slug: "sheep-goat-manure",
    name: "Aged Sheep & Goat Manure",
    category: "manure",
    categoryLabel: "Organic Fertilizer",
    summary:
      "Naturally pelleted, low-odor sheep and goat manure — gentle enough for direct planting.",
    description:
      "Aged and screened sheep and goat manure with a naturally granular form that spreads evenly and breaks down steadily. Its balanced, slow-release nutrients make it a favorite for vegetables, vineyards, orchards, and organic market gardens.",
    specs: [
      { label: "N-P-K (typical)", value: "3-1-2" },
      { label: "Form", value: "Natural pellet, screened" },
      { label: "Salt index", value: "Low — direct-plant safe" },
      { label: "Packaging", value: "Bulk, 1-ton totes, 40 lb bags" },
    ],
    image: "/products/sheep-goat-manure.jpg",
    imageAlt:
      "Close-up of screened granular aged sheep and goat manure fertilizer",
    unit: "per ton",
  },
  {
    slug: "manure-spreader",
    name: "Slurry Tanker & Applicator",
    category: "equipment",
    categoryLabel: "Agricultural Equipment",
    summary:
      "High-capacity slurry tanker with trailing-hose applicator for precise liquid manure placement.",
    description:
      "A commercial slurry tanker with a trailing-hose injection applicator that places liquid manure at the root zone — cutting odor, ammonia loss, and runoff. Galvanized tank, flow-rate control, and ISOBUS-ready metering for precision application.",
    specs: [
      { label: "Capacity", value: "4,000–7,000 gal" },
      { label: "Applicator", value: "Trailing hose, 12–24 m" },
      { label: "Control", value: "Flow-rate metered" },
      { label: "Tank", value: "Hot-dip galvanized steel" },
    ],
    image: "/products/manure-spreader.jpg",
    imageAlt:
      "Self-propelled slurry tanker with trailing-hose manure applicator working a field",
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
    image: "/products/compact-utility-tractor.jpg",
    imageAlt:
      "Blue compact utility tractor with front loader bucket parked on a farm",
    unit: "per unit",
  },
  {
    slug: "loader-tractor",
    name: "Heavy-Duty Loader Tractor",
    category: "equipment",
    categoryLabel: "Agricultural Equipment",
    summary:
      "90–150 HP loader tractor with bale spear and grapple — built for daily material handling.",
    description:
      "A high-horsepower loader tractor package for silage, bales, manure handling, and bulk loading. Heavy front axle, self-leveling loader, and quick-attach implements keep large mixed and livestock operations moving year-round.",
    specs: [
      { label: "Power", value: "90–150 HP" },
      { label: "Loader lift", value: "2,800 kg to full height" },
      { label: "Attachments", value: "Bucket, bale spear, grapple" },
      { label: "Transmission", value: "PowerShift, 4WD" },
    ],
    image: "/products/loader-tractor.jpg",
    imageAlt:
      "Green heavy-duty farm tractor with front loader and bale spear attachment",
    unit: "per unit",
  },
  {
    slug: "broadcast-spreader",
    name: "Pull-Behind Broadcast Spreader",
    category: "equipment",
    categoryLabel: "Agricultural Equipment",
    summary:
      "High-capacity pull-behind spreader for pelletized fertilizer and lime at high throughput.",
    description:
      "A pull-behind broadcast spreader with a corrosion-proof hopper, calibrated gate, and twin spinner discs. Designed for accurate, high-acre coverage of pelletized organic fertilizers, lime, and gypsum.",
    specs: [
      { label: "Hopper", value: "5-ton, tandem axle" },
      { label: "Spread width", value: "9–18 m" },
      { label: "Control", value: "Calibrated rate gate" },
      { label: "Tires", value: "Flotation, low-compaction" },
    ],
    image: "/products/broadcast-spreader.jpg",
    imageAlt:
      "Tractor pulling a loaded broadcast fertilizer spreader hopper in a field",
    unit: "per unit",
  },
  {
    slug: "field-cultivator",
    name: "Field Cultivator & Tillage System",
    category: "equipment",
    categoryLabel: "Agricultural Equipment",
    summary:
      "Wide-fold field cultivator with rolling harrow for fast, uniform seedbed preparation.",
    description:
      "A trailed field cultivator with staggered shanks, rolling baskets, and a following harrow that levels, mixes, and firms in one pass. Folds for road transport and pairs with 90 HP+ tractors for efficient pre-plant tillage.",
    specs: [
      { label: "Working width", value: "6–12 m, folding" },
      { label: "Shanks", value: "Staggered, spring-cushion" },
      { label: "Finish", value: "Rolling basket + harrow" },
      { label: "Tractor req.", value: "90 HP and up" },
    ],
    image: "/products/field-cultivator.jpg",
    imageAlt:
      "Red trailed field cultivator with rolling harrow hitched to a green tractor",
    unit: "per unit",
  },
  {
    slug: "drip-irrigation-kit",
    name: "Drip Irrigation Kit",
    category: "equipment",
    categoryLabel: "Agricultural Equipment",
    summary:
      "Complete drip irrigation system — lines, emitters, filters, and fittings for row crops.",
    description:
      "A field-ready drip irrigation package covering everything from the pump connection to the emitter: mainline, drip tape or emitter line, filtration, pressure regulation, and fittings. Cuts water use up to 60% versus overhead irrigation while feeding crops at the root.",
    specs: [
      { label: "Coverage", value: "1–20 acre kits" },
      { label: "Emitters", value: "Pressure-compensating" },
      { label: "Filtration", value: "Disc filter included" },
      { label: "Fertigation", value: "Injector-ready" },
    ],
    image: "/products/drip-irrigation-kit.jpg",
    imageAlt:
      "Drip irrigation lines watering young vegetable seedlings in dark soil",
    unit: "per kit",
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
