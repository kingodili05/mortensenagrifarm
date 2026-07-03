"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { PRODUCTS, CATEGORIES, type Product } from "@/lib/data";
import { SearchIcon, XIcon, Icon, type IconName } from "./Icons";

type Filter = "all" | Product["category"];

const TABS: { key: Filter; label: string }[] = [
  { key: "all", label: "All products" },
  { key: "manure", label: "Organic Fertilizer" },
  { key: "equipment", label: "Equipment" },
];

// Client-side interactive catalog: category tabs + live search over
// name/summary/specs, with quote-list integration on every card.
export default function ProductCatalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.summary,
        p.categoryLabel,
        ...p.specs.map((s) => `${s.label} ${s.value}`),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Filter products by category"
          className="flex flex-wrap gap-2"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={filter === tab.key}
              onClick={() => setFilter(tab.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                filter === tab.key
                  ? "bg-forest-700 text-white shadow-sm"
                  : "bg-white text-steel-600 ring-1 ring-inset ring-steel-200 hover:bg-steel-50 hover:text-steel-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative sm:w-72">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, specs…"
            aria-label="Search products"
            className="w-full rounded-full border border-steel-300 bg-white py-2.5 pl-10 pr-9 text-sm text-steel-900 shadow-sm transition-colors placeholder:text-steel-400 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-steel-400 hover:bg-steel-100 hover:text-steel-700"
            >
              <XIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category context blurb */}
      {filter !== "all" && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-steel-200 bg-white px-4 py-3">
          {CATEGORIES.filter((c) => c.key === filter).map((c) => (
            <div key={c.key} className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest-700 text-harvest-400">
                <Icon name={c.icon as IconName} className="h-5 w-5" />
              </span>
              <p className="text-sm text-steel-600">{c.blurb}</p>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      <p className="mt-6 text-sm text-steel-500" aria-live="polite">
        {items.length === PRODUCTS.length
          ? `Showing all ${items.length} products`
          : `Showing ${items.length} of ${PRODUCTS.length} products`}
      </p>

      {items.length > 0 ? (
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product, i) => (
            <Reveal key={product.slug} delay={Math.min(i, 5) * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-steel-300 bg-white p-12 text-center">
          <p className="font-display text-lg font-bold text-steel-900">
            No products match “{query}”
          </p>
          <p className="mt-2 text-sm text-steel-500">
            Try a different term, or ask us directly — we source custom blends
            and equipment on request.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="mt-5 rounded-lg bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
