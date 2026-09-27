// Append-only JSON-lines log of SMS/TCPA consent records. Chosen over a
// database for now — no DB is wired into this project. Note: on serverless/
// ephemeral hosts (Lambda, Vercel) this file will not persist across
// deploys or instances; fine for a traditional server or VM/container host.

import { appendFile, mkdir } from "fs/promises";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "data");
const LOG_FILE = path.join(LOG_DIR, "sms-optins.log");

export type SmsOptInRecord = {
  source: "sms-optin-page" | "contact-form";
  firstName?: string;
  lastName?: string;
  name?: string;
  phone: string;
  email?: string;
  smsConsent: boolean;
  smsConsentText: string;
  marketingConsent: boolean;
  marketingConsentText?: string;
  timestamp: string;
  ip: string;
  userAgent: string;
};

export async function appendSmsOptIn(record: SmsOptInRecord): Promise<void> {
  await mkdir(LOG_DIR, { recursive: true });
  await appendFile(LOG_FILE, `${JSON.stringify(record)}\n`, "utf8");
}

export function getRequestIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
