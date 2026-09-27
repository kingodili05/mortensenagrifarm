import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SMS_PROGRAM_NAME } from "@/lib/sms";
import SmsOptInForm from "./SmsOptInForm";

export const metadata: Metadata = {
  title: "Text Alerts",
  description: `Sign up for ${SMS_PROGRAM_NAME} to get order, delivery, and account updates by text.`,
  alternates: { canonical: "/sms" },
};

export default function SmsOptInPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Text Alerts", path: "/sms" },
        ])}
      />

      <section className="border-b border-steel-200 bg-cream-dark py-16 lg:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Text Alerts"
            title={`Sign up for ${SMS_PROGRAM_NAME}`}
            intro="Get order confirmations, delivery and pickup scheduling, equipment and fertilizer availability updates, and account notifications sent straight to your phone."
          />
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-xl">
          <div className="rounded-3xl border border-steel-200 bg-white p-7 shadow-sm sm:p-9">
            <SmsOptInForm />
          </div>
        </Container>
      </section>
    </>
  );
}
