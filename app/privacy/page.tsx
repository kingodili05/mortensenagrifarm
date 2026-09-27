import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects your information, including SMS/text messaging data.`,
  alternates: { canonical: "/privacy" },
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

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />

      <section className="border-b border-steel-200 bg-cream-dark py-16 lg:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Legal"
            title="Privacy Policy"
            intro={`Effective date: ${EFFECTIVE_DATE}`}
          />
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-3xl">
          <P>
            {SITE.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
            respects your privacy. This Privacy Policy explains what
            information we collect through {SITE.url.replace("https://", "")}{" "}
            (the &ldquo;Site&rdquo;), how we use it, and the choices you have.
          </P>

          <H2>Information We Collect</H2>
          <P>We collect information you provide directly to us, including:</P>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-steel-600">
            <li>Name, email address, phone number, and company/farm details you submit through our contact, quote, or SMS sign-up forms.</li>
            <li>Shipping and billing information needed to fulfill an order or quote request.</li>
            <li>Messages, product interests, and any other content you send us.</li>
          </ul>
          <P>
            We also automatically collect limited technical information —
            such as IP address, browser type, device type, and pages visited
            — through standard server logs and cookies, described below.
          </P>

          <H2>How We Use Your Information</H2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-steel-600">
            <li>Respond to quote requests and customer inquiries.</li>
            <li>Process, schedule, and fulfill orders, deliveries, and pickups.</li>
            <li>Send transactional updates and account notifications.</li>
            <li>Send text messages and emails you have opted in to receive.</li>
            <li>Improve our Site, products, and services.</li>
            <li>Comply with legal obligations and enforce our Terms &amp; Conditions.</li>
          </ul>

          <H2>Cookies &amp; Tracking</H2>
          <P>
            We use essential cookies to operate the Site (for example, to
            remember items in your quote list) and may use analytics cookies
            to understand aggregate usage. You can control cookies through
            your browser settings; disabling them may limit some Site
            features.
          </P>

          <H2>SMS / Text Messaging</H2>
          <P>
            If you opt in to receive text messages from {SITE.name} (the{" "}
            &ldquo;{SITE.name} Alerts&rdquo; program), we use your mobile
            phone number solely to send you the order confirmation,
            delivery/pickup scheduling, availability, account, and — only if
            you separately opt in — promotional messages you agreed to
            receive. We use a third-party SMS service provider solely to
            deliver these messages on our behalf; that provider does not use
            your information for its own marketing purposes.
          </P>
          <P className="font-semibold text-steel-800">
            No mobile information will be shared with third parties or
            affiliates for marketing or promotional purposes. All the above
            categories exclude text messaging originator opt-in data and
            consent; this information will not be shared with any third
            parties.
          </P>
          <P>
            You can opt out of text messages at any time by replying STOP, or
            by contacting us using the information below. See our{" "}
            <Link href="/terms" className="underline hover:text-forest-700">
              Terms &amp; Conditions
            </Link>{" "}
            for full SMS program terms.
          </P>

          <H2>Data Retention</H2>
          <P>
            We retain personal information, including SMS consent records,
            for as long as needed to provide our services, comply with legal
            and carrier record-keeping obligations, and resolve disputes,
            after which it is deleted or anonymized.
          </P>

          <H2>Security</H2>
          <P>
            We use reasonable administrative, technical, and physical
            safeguards to protect your information. No method of
            transmission or storage is completely secure, and we cannot
            guarantee absolute security.
          </P>

          <H2>Your Rights</H2>
          <P>
            Depending on your location, you may have the right to access,
            correct, or delete your personal information, or to opt out of
            certain uses. To exercise these rights, contact us using the
            information below.
          </P>

          <H2>Children&rsquo;s Privacy</H2>
          <P>
            Our Site and SMS program are not directed to children under 13,
            and we do not knowingly collect personal information from
            children under 13.
          </P>

          <H2>Changes to This Policy</H2>
          <P>
            We may update this Privacy Policy from time to time. Changes are
            effective when posted on this page with a revised effective
            date.
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
            <br />
            Phone:{" "}
            <a href={`tel:${SITE.phoneHref}`} className="underline hover:text-forest-700">
              {SITE.phone}
            </a>
          </P>
        </Container>
      </section>
    </>
  );
}
