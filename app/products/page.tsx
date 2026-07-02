import type { Metadata } from "next";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import { Icon, type IconName } from "@/components/Icons";
import { productsByCategory, CATEGORIES, PRODUCTS } from "@/lib/data";
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

      {CATEGORIES.map((cat) => {
        const items = productsByCategory(cat.key);
        return (
          <section
            key={cat.key}
            id={cat.key}
            className="scroll-mt-24 py-16 lg:py-20"
          >
            <Container>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest-700 text-harvest-400">
                  <Icon name={cat.icon as IconName} className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold text-steel-900 sm:text-3xl">
                    {cat.title}
                  </h2>
                  <p className="mt-1 text-sm text-steel-600">{cat.blurb}</p>
                </div>
              </div>

              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}

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
