"use client";

import { useQuote } from "./QuoteContext";
import { CheckIcon, PlusIcon } from "@/components/Icons";

// Toggles a product on the visitor's quote list. `compact` renders the
// card-sized variant; default is the full-width detail-page variant.
export default function QuoteButton({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const { has, toggle } = useQuote();
  const active = has(slug);

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={active}
        className={`relative z-10 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
          active
            ? "bg-forest-700 text-white shadow-sm"
            : "bg-forest-50 text-forest-700 ring-1 ring-inset ring-forest-200 hover:bg-forest-100"
        }`}
      >
        {active ? (
          <CheckIcon className="h-3.5 w-3.5" />
        ) : (
          <PlusIcon className="h-3.5 w-3.5" />
        )}
        {active ? "On quote list" : "Add to quote"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold shadow-sm transition-all duration-300 ${
        active
          ? "bg-forest-700 text-white hover:bg-forest-800"
          : "bg-white text-forest-700 ring-1 ring-inset ring-forest-300 hover:bg-forest-50"
      }`}
    >
      {active ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}
      {active ? "Added to quote list" : "Add to quote list"}
    </button>
  );
}
