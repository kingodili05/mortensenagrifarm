import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data";
import { CheckIcon } from "./Icons";
import QuoteButton from "./quote/QuoteButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-steel-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-forest-200 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-steel-100">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-steel-900/85 px-3 py-1 text-xs font-semibold text-harvest-400 backdrop-blur">
          {product.categoryLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-steel-900">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-steel-600">
          {product.summary}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-steel-100 pt-5 text-sm">
          {product.specs.slice(0, 4).map((spec) => (
            <div key={spec.label} className="flex flex-col">
              <dt className="text-xs font-medium uppercase tracking-wide text-steel-400">
                {spec.label}
              </dt>
              <dd className="font-semibold text-steel-800">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm font-semibold text-forest-700">
            <CheckIcon className="h-4 w-4" />
            In stock — {product.unit}
          </span>
          {/* z-10 keeps the button clickable above the card's stretched link. */}
          <QuoteButton slug={product.slug} compact />
        </div>
      </div>
    </article>
  );
}
