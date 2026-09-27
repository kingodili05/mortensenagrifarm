import Link from "next/link";

// Renders consent copy with "Terms and Privacy Policy" turned into links,
// without altering the underlying text (the plain string is what's stored
// with the consent record — see lib/sms.ts).
export function SmsConsentLabel({ text }: { text: string }) {
  const anchor = "Terms and Privacy Policy";
  const idx = text.indexOf(anchor);
  if (idx === -1) return <>{text}</>;

  const before = text.slice(0, idx);
  const after = text.slice(idx + anchor.length);

  return (
    <>
      {before}
      <Link href="/terms" className="underline hover:text-forest-700">
        Terms
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="underline hover:text-forest-700">
        Privacy Policy
      </Link>
      {after}
    </>
  );
}
