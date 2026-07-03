"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRightIcon, CheckIcon, XIcon } from "@/components/Icons";
import { PRODUCTS } from "@/lib/data";
import { useQuote } from "@/components/quote/QuoteContext";

type Status = "idle" | "submitting" | "success" | "error";

const COUNTRIES = [
  "United States",
  "Canada",
  "Mexico",
  "Nigeria",
  "Kenya",
  "South Africa",
  "Ghana",
  "United Kingdom",
  "Germany",
  "Brazil",
  "India",
  "Australia",
  "Other",
];

const inputClass =
  "w-full rounded-lg border border-steel-300 bg-white px-4 py-3 text-steel-900 shadow-sm transition-colors placeholder:text-steel-400 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/30";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams();
  const { clear } = useQuote();

  // Products carried over from the catalog quote list (?products=a,b,c).
  const [removed, setRemoved] = useState<string[]>([]);
  const selectedProducts = useMemo(() => {
    const raw = searchParams.get("products");
    if (!raw) return [];
    return raw
      .split(",")
      .map((slug) => PRODUCTS.find((p) => p.slug === slug))
      .filter((p): p is (typeof PRODUCTS)[number] => !!p)
      .filter((p) => !removed.includes(p.slug));
  }, [searchParams, removed]);

  const defaultMessage = useMemo(() => {
    if (selectedProducts.length === 0) return undefined;
    return `Hello, I would like a quote for the following products:\n${selectedProducts
      .map((p) => `• ${p.name} (${p.unit})`)
      .join("\n")}\n\nVolume / quantity: \nDestination: `;
  }, [selectedProducts]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (selectedProducts.length > 0) {
      data.products = selectedProducts.map((p) => p.name).join(", ");
    }

    // Honeypot — bots fill hidden fields; humans don't.
    if (data.company_website) {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      clear(); // quote list delivered — empty the basket
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-2xl border border-forest-200 bg-forest-50 p-10 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-forest-700 text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-steel-900">
          Thank you — message received
        </h3>
        <p className="mt-2 max-w-md text-steel-600">
          Our team will reply with a tailored quote within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-forest-700 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot (visually hidden, off-screen) */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-semibold text-steel-800"
          >
            Full name <span className="text-forest-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Jane Grower"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-semibold text-steel-800"
          >
            Email <span className="text-forest-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@farm.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="country"
            className="mb-1.5 block text-sm font-semibold text-steel-800"
          >
            Country <span className="text-forest-600">*</span>
          </label>
          <select
            id="country"
            name="country"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select your country
            </option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-semibold text-steel-800"
          >
            Phone <span className="text-steel-400">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="+1 555 000 0000"
          />
        </div>
      </div>

      {/* Products carried over from the quote list */}
      {selectedProducts.length > 0 && (
        <div>
          <p className="mb-1.5 block text-sm font-semibold text-steel-800">
            Quoting for
          </p>
          <ul className="flex flex-wrap gap-2">
            {selectedProducts.map((p) => (
              <li
                key={p.slug}
                className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 py-1.5 pl-3.5 pr-2 text-sm font-semibold text-forest-800 ring-1 ring-inset ring-forest-200"
              >
                {p.name}
                <button
                  type="button"
                  onClick={() => setRemoved((r) => [...r, p.slug])}
                  aria-label={`Remove ${p.name} from quote`}
                  className="rounded-full p-0.5 text-forest-500 hover:bg-forest-100 hover:text-forest-800"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-semibold text-steel-800"
        >
          How can we help? <span className="text-forest-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={selectedProducts.length > 0 ? 8 : 5}
          className={inputClass}
          // Remount when the carried-over product list changes so the
          // prefilled draft stays in sync until the visitor edits it.
          key={defaultMessage ?? "blank"}
          defaultValue={defaultMessage}
          placeholder="Tell us the product, volume, and destination you need a quote for."
        />
      </div>

      {/* Always present so screen readers reliably announce new errors. */}
      <p
        role="alert"
        aria-live="assertive"
        className={`text-sm font-medium text-red-600 ${
          status === "error" ? "" : "sr-only"
        }`}
      >
        {status === "error" ? error : ""}
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-harvest-500 px-6 py-3.5 text-sm font-bold text-steel-900 shadow-sm transition-all duration-300 hover:bg-harvest-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        {status !== "submitting" && (
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </button>
    </form>
  );
}
