"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon } from "@/components/Icons";
import { SmsConsentLabel } from "@/components/SmsConsentLabel";
import {
  SMS_CONSENT_TEXT,
  SMS_MARKETING_CONSENT_TEXT,
  SMS_SUCCESS_MESSAGE,
} from "@/lib/sms";

type Status = "idle" | "submitting" | "success" | "error";

// Accepts common US formats: 5551234567, 555-123-4567, (555) 123-4567,
// 555.123.4567, +1 555 123 4567.
const US_PHONE_RE = /^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

const inputClass =
  "w-full rounded-lg border border-steel-300 bg-white px-4 py-3 text-steel-900 shadow-sm transition-colors placeholder:text-steel-400 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/30";

export default function SmsOptInForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-forest-700 text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-steel-900">
          You&rsquo;re signed up
        </h3>
        <p className="mt-2 max-w-md text-steel-600">{SMS_SUCCESS_MESSAGE}</p>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPhoneError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — bots fill hidden fields; humans don't.
    if (data.company_website) {
      setStatus("success");
      form.reset();
      return;
    }

    const phone = String(data.phone ?? "").trim();
    if (!US_PHONE_RE.test(phone)) {
      setPhoneError("Enter a valid US mobile number, e.g. (555) 123-4567.");
      return;
    }

    if (!smsConsent) {
      setError("Please check the box to agree to receive text messages.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/sms-optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          phone,
          email: data.email,
          smsConsent,
          marketingConsent,
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    }
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
            htmlFor="firstName"
            className="mb-1.5 block text-sm font-semibold text-steel-800"
          >
            First name <span className="text-forest-600">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={inputClass}
            placeholder="Jane"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-1.5 block text-sm font-semibold text-steel-800"
          >
            Last name <span className="text-forest-600">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={inputClass}
            placeholder="Grower"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-sm font-semibold text-steel-800"
        >
          Mobile phone <span className="text-forest-600">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          className={inputClass}
          placeholder="(555) 123-4567"
        />
        {phoneError && (
          <p className="mt-1.5 text-sm font-medium text-red-600">{phoneError}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-semibold text-steel-800"
        >
          Email <span className="text-steel-400">(optional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          placeholder="you@farm.com"
        />
      </div>

      <div className="space-y-4 rounded-xl border border-steel-200 bg-cream-dark p-4">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-steel-700">
          <input
            type="checkbox"
            name="smsConsent"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-steel-300 accent-forest-600 focus-visible:outline-none"
          />
          <span>
            <SmsConsentLabel text={SMS_CONSENT_TEXT} />
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-steel-700">
          <input
            type="checkbox"
            name="marketingConsent"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-steel-300 accent-forest-600 focus-visible:outline-none"
          />
          <span>{SMS_MARKETING_CONSENT_TEXT}</span>
        </label>
      </div>

      <p
        role="alert"
        aria-live="assertive"
        className={`text-sm font-medium text-red-600 ${
          error ? "" : "sr-only"
        }`}
      >
        {error}
      </p>

      <button
        type="submit"
        disabled={!smsConsent || status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-harvest-500 px-6 py-3.5 text-sm font-bold text-steel-900 shadow-sm transition-all duration-300 hover:bg-harvest-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Signing up…" : "Sign up for text alerts"}
      </button>
    </form>
  );
}
