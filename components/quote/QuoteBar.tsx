"use client";

import Link from "next/link";
import { useQuote } from "./QuoteContext";
import { PRODUCTS } from "@/lib/data";
import { ArrowRightIcon, XIcon } from "@/components/Icons";

// Floating bottom bar: appears once the visitor adds products to their quote
// list and carries them to the contact form with the selection attached.
export default function QuoteBar() {
  const { slugs, clear } = useQuote();

  if (slugs.length === 0) return null;

  const names = slugs
    .map((s) => PRODUCTS.find((p) => p.slug === s)?.name)
    .filter(Boolean) as string[];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6">
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-forest-600/40 bg-forest-900/95 px-4 py-3 text-white shadow-2xl backdrop-blur sm:gap-4 sm:px-6">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-harvest-500 text-sm font-extrabold text-steel-900">
          {slugs.length}
        </span>
        <p className="min-w-0 flex-1 truncate text-sm">
          <span className="font-semibold">
            {slugs.length === 1 ? "1 product" : `${slugs.length} products`} on
            your quote list
          </span>
          <span className="hidden text-forest-100/80 sm:inline">
            {" "}
            — {names.slice(0, 3).join(", ")}
            {names.length > 3 ? "…" : ""}
          </span>
        </p>
        <Link
          href={`/contact?products=${slugs.join(",")}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-harvest-500 px-4 py-2.5 text-xs font-bold text-steel-900 transition-colors hover:bg-harvest-400 sm:text-sm"
        >
          Request quote
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <button
          type="button"
          onClick={clear}
          aria-label="Clear quote list"
          className="shrink-0 rounded-full p-1.5 text-forest-200 transition-colors hover:bg-white/10 hover:text-white"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
