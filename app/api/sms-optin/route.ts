import { NextResponse } from "next/server";
import { appendSmsOptIn, getRequestIp } from "@/lib/sms-optin-store";
import { SMS_CONSENT_TEXT, SMS_MARKETING_CONSENT_TEXT } from "@/lib/sms";

const MAX = { name: 80, email: 200, phone: 20 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const US_PHONE_RE = /^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

type SmsOptInPayload = {
  firstName?: unknown;
  lastName?: unknown;
  phone?: unknown;
  email?: unknown;
  smsConsent?: unknown;
  marketingConsent?: unknown;
  company_website?: unknown; // honeypot
};

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  let body: SmsOptInPayload;
  try {
    body = (await request.json()) as SmsOptInPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (asString(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const firstName = asString(body.firstName);
  const lastName = asString(body.lastName);
  const phone = asString(body.phone);
  const email = asString(body.email);
  const smsConsent = body.smsConsent === true;
  const marketingConsent = body.marketingConsent === true;

  const errors: string[] = [];
  if (!firstName || firstName.length > MAX.name) errors.push("firstName");
  if (!lastName || lastName.length > MAX.name) errors.push("lastName");
  if (!phone || phone.length > MAX.phone || !US_PHONE_RE.test(phone))
    errors.push("phone");
  if (email && (email.length > MAX.email || !EMAIL_RE.test(email)))
    errors.push("email");
  if (!smsConsent) errors.push("smsConsent");

  if (errors.length > 0) {
    return NextResponse.json(
      { error: `Please check these fields: ${errors.join(", ")}.` },
      { status: 422 }
    );
  }

  await appendSmsOptIn({
    source: "sms-optin-page",
    firstName,
    lastName,
    phone,
    email: email || undefined,
    smsConsent,
    smsConsentText: SMS_CONSENT_TEXT,
    marketingConsent,
    marketingConsentText: marketingConsent ? SMS_MARKETING_CONSENT_TEXT : undefined,
    timestamp: new Date().toISOString(),
    ip: getRequestIp(request),
    userAgent: request.headers.get("user-agent") ?? "unknown",
  });

  return NextResponse.json({ ok: true });
}
