import type { Metadata } from "next";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import ProductCatalog from "@/components/ProductCatalog";
import JsonLd from "@/components/JsonLd";
import { PRODUCTS } from "@/lib/data";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Products — Farm Manure, Organic Fertilizer & Equipment Catalog",
  description:
    "Browse our catalog of composted manure, pelletized organic fertilizer, vermicompost, manure spreaders, tractors, and broadcast spreaders. Wholesale and export quantities available worldwide.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
          ...PRODUCTS.map((p) => productJsonLd(p)),
        ]}
      />

      {/* Page header */}
      <section className="border-b border-steel-200 bg-cream-dark py-16 lg:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Catalog"
            title="Farm manure & agricultural equipment"
            intro="Every product below is available for domestic delivery and international export. Request a quote for current pricing, volume discounts, and a certificate of analysis."
          />
        </Container>
      </section>

      {/* Interactive catalog: tabs, live search, quote-list on every card. */}
      <section className="py-14 lg:py-16">
        <Container>
          <ProductCatalog />
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-forest-700 py-16 text-white">
        <Container className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Need a product not listed here?
            </h2>
            <p className="mt-2 text-forest-50">
              We source custom blends and equipment on request. Tell us what you
              need.
            </p>
          </div>
          <ButtonLink href="/contact" variant="primary" withArrow>
            Request a Quote
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
