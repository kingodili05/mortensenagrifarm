"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Slugs of products the visitor wants quoted, persisted across pages.
const STORAGE_KEY = "maq-quote-list";

type QuoteContextValue = {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  clear: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);

  // Hydrate from localStorage after mount (SSR-safe).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSlugs(parsed.filter((s): s is string => typeof s === "string"));
        }
      }
    } catch {
      // Corrupt storage — start fresh.
    }
  }, []);

  const persist = useCallback((next: string[]) => {
    setSlugs(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable (private mode) — in-memory list still works.
    }
  }, []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggle = useCallback(
    (slug: string) => {
      persist(
        slugs.includes(slug)
          ? slugs.filter((s) => s !== slug)
          : [...slugs, slug]
      );
    },
    [slugs, persist]
  );

  const clear = useCallback(() => persist([]), [persist]);

  return (
    <QuoteContext.Provider value={{ slugs, has, toggle, clear }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside <QuoteProvider>");
  return ctx;
}
