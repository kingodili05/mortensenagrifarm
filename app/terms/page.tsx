import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { SMS_PROGRAM_NAME, SMS_PROGRAM_DESCRIPTION } from "@/lib/sms";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms of use for ${SITE.name}'s website and SMS/text messaging program.`,
  alternates: { canonical: "/terms" },
};

const EFFECTIVE_DATE = "September 27, 2026";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 font-display text-2xl font-bold text-steel-900">
      {children}
    </h2>
  );
}

function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`mt-3 leading-relaxed text-steel-600 ${className}`}>
      {children}
    </p>
  );
}

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" },
        ])}
      />

      <section className="border-b border-steel-200 bg-cream-dark py-16 lg:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Legal"
            title="Terms & Conditions"
            intro={`Effective date: ${EFFECTIVE_DATE}`}
          />
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-3xl">
          <P>
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use
            of {SITE.url.replace("https://", "")} (the &ldquo;Site&rdquo;),
            operated by {SITE.legalBusinessName}, doing business as{" "}
            {SITE.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;). By using the Site, you agree to these Terms.
          </P>

          <H2>Use of This Site</H2>
          <P>
            You may use the Site for lawful purposes only. You agree not to
            misuse the Site, interfere with its operation, or attempt to
            access it by any means other than the interface we provide.
          </P>

          <H2>Quotes &amp; Orders</H2>
          <P>
            Product listings, pricing, and availability on the Site are
            informational and subject to change. Submitting a quote request
            or order inquiry does not guarantee product availability, final
            pricing, or acceptance of an order — all orders are subject to
            confirmation by our sales team.
          </P>

          <H2>Intellectual Property</H2>
          <P>
            All content on the Site, including text, graphics, logos, and
            images, is owned by or licensed to us and may not be reproduced
            without permission.
          </P>

          <H2>Disclaimer of Warranties</H2>
          <P>
            The Site is provided &ldquo;as is&rdquo; without warranties of
            any kind, express or implied, including fitness for a particular
            purpose or non-infringement.
          </P>

          <H2>Limitation of Liability</H2>
          <P>
            To the fullest extent permitted by law, {SITE.name} shall not be
            liable for any indirect, incidental, special, or consequential
            damages arising from your use of the Site or our SMS program.
          </P>

          <H2>Governing Law</H2>
          <P>
            These Terms are governed by the laws of the State of South
            Carolina, without regard to conflict-of-law principles.
          </P>

          <H2>SMS Terms</H2>
          <P className="font-semibold text-steel-800">
            Program name: {SMS_PROGRAM_NAME}
          </P>
          <P>
            <span className="font-semibold text-steel-800">
              Program description:
            </span>{" "}
            {SMS_PROGRAM_DESCRIPTION}
          </P>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-steel-600">
            <li>Message frequency varies.</li>
            <li>Message and data rates may apply.</li>
            <li>
              Reply STOP to cancel at any time. Reply HELP for help. After
              replying STOP, you will receive one final message confirming
              your unsubscription, and no further messages will be sent.
            </li>
            <li>Carriers are not liable for delayed or undelivered messages.</li>
            <li>Consent to receive text messages is not a condition of any purchase.</li>
          </ul>
          <P>
            <span className="font-semibold text-steel-800">
              Support contact:
            </span>{" "}
            <a href={`tel:${SITE.phoneHref}`} className="underline hover:text-forest-700">
              {SITE.phone}
            </a>{" "}
            or{" "}
            <a href={`mailto:${SITE.email}`} className="underline hover:text-forest-700">
              {SITE.email}
            </a>
          </P>
          <P>
            See our{" "}
            <Link href="/privacy" className="underline hover:text-forest-700">
              Privacy Policy
            </Link>{" "}
            for how we handle information collected through this program.
          </P>

          <H2>Changes to These Terms</H2>
          <P>
            We may update these Terms at any time. Continued use of the Site
            after changes are posted constitutes acceptance of the revised
            Terms.
          </P>

          <H2>Contact Us</H2>
          <P>
            {SITE.legalBusinessName}, doing business as {SITE.name}
            <br />
            {SITE.addresses[1].street}, {SITE.addresses[1].locality},{" "}
            {SITE.addresses[1].region} {SITE.addresses[1].postalCode}
            <br />
            Email:{" "}
            <a href={`mailto:${SITE.email}`} className="underline hover:text-forest-700">
              {SITE.email}
            </a>
          </P>
        </Container>
      </section>
    </>
  );
}
