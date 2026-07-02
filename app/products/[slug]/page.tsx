import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink, Eyebrow } from "@/components/ui";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import { CheckIcon, ArrowRightIcon } from "@/components/Icons";
import {
  PRODUCTS,
  getProductBySlug,
  relatedProducts,
} from "@/lib/data";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

// Pre-render every product page at build time for fast, crawlable static URLs.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — ${product.categoryLabel}`,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | ${SITE.name}`,
      description: product.summary,
      type: "website",
      url: `${SITE.url}/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = relatedProducts(product);

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(product),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />

      <article className="py-12 lg:py-16">
        <Container>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-steel-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-forest-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/products" className="hover:text-forest-700">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-steel-700">{product.name}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-steel-200 bg-steel-100 shadow-sm">
              <Image
                src={product.image}
                alt={product.imageAlt}
                width={800}
                height={600}
                priority
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <Eyebrow>{product.categoryLabel}</Eyebrow>
              <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-steel-600">
                {product.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-forest-700">
                <CheckIcon className="h-4 w-4" />
                In stock — quoted {product.unit}, domestic &amp; export
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-steel-200 bg-white p-6">
                {product.specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-xs font-medium uppercase tracking-wide text-steel-400">
                      {spec.label}
                    </dt>
                    <dd className="mt-0.5 font-semibold text-steel-900">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/contact" variant="primary" withArrow>
                  Request a Quote
                </ButtonLink>
                <ButtonLink href="/products" variant="secondary">
                  Back to catalog
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-t border-steel-200 bg-cream-dark py-16">
          <Container>
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-steel-900">
                Related products
              </h2>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-forest-800"
              >
                View all
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
