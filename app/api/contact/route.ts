import { NextResponse } from "next/server";

// Server-side validation for the contact form.
// Sends nothing externally yet — wire an email/CRM provider where marked below.

const MAX = {
  name: 120,
  email: 200,
  country: 80,
  phone: 40,
  message: 4000,
  products: 600,
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  country?: unknown;
  phone?: unknown;
  message?: unknown;
  products?: unknown; // comma-separated product names from the quote list
  company_website?: unknown; // honeypot
};

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without processing.
  if (asString(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const country = asString(body.country);
  const phone = asString(body.phone);
  const message = asString(body.message);
  const products = asString(body.products).slice(0, MAX.products);

  const errors: string[] = [];
  if (!name || name.length > MAX.name) errors.push("name");
  if (!email || email.length > MAX.email || !EMAIL_RE.test(email))
    errors.push("email");
  if (!country || country.length > MAX.country) errors.push("country");
  if (phone.length > MAX.phone) errors.push("phone");
  if (!message || message.length > MAX.message) errors.push("message");

  if (errors.length > 0) {
    return NextResponse.json(
      { error: `Please check these fields: ${errors.join(", ")}.` },
      { status: 422 }
    );
  }

  // TODO(launch): deliver the enquiry. Options:
  //   - Email via Resend / SendGrid / SMTP (recommended)
  //   - Push to a CRM (HubSpot, Salesforce) or a Slack webhook
  //   - Persist to a database (Supabase, Postgres)
  // Keep secrets in environment variables — never hardcode them.
  // Log only non-PII operational signals (name/email/phone are personal data).
  console.info("[contact] new enquiry received", {
    country,
    hasPhone: phone.length > 0,
    messageLength: message.length,
    quotedProducts: products ? products.split(",").length : 0,
  });

  return NextResponse.json({ ok: true });
}
