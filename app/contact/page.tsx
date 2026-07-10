import type { Metadata } from "next";
import { Container, SectionHeading, Eyebrow } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { MailIcon, PhoneIcon, MapPinIcon } from "@/components/Icons";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Suspense } from "react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Request a Quote for Manure & Equipment",
  description:
    "Contact Mortensen AgriSupply for wholesale and export quotes on organic farm manure, fertilizer, and agricultural equipment. We serve the U.S., North America, Africa, and worldwide.",
  alternates: { canonical: "/contact" },
};

const mapQuery = encodeURIComponent(
  `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}`
);

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      {/* Header */}
      <section className="border-b border-steel-200 bg-cream-dark py-16 lg:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Let's get your quote started"
            intro="Reach our sales team directly, or send the form below. We respond to every enquiry within one business day."
          />
        </Container>
      </section>

      {/* Contact grid */}
      <section className="py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Details */}
          <div>
            <Eyebrow>Reach us directly</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-bold text-steel-900">
              Sales &amp; export enquiries
            </h2>
            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-700">
                  <MailIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-steel-500">
                    Email
                  </p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-lg font-semibold text-steel-900 transition-colors hover:text-forest-700"
                  >
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-700">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-steel-500">
                    Phone
                  </p>
                  <div className="flex flex-col gap-1">
                    {SITE.phones.map((p) => (
                      <a
                        key={p.href}
                        href={`tel:${p.href}`}
                        className="text-lg font-semibold text-steel-900 transition-colors hover:text-forest-700"
                      >
                        {p.display}
                        <span className="ml-2 text-sm font-normal text-steel-500">
                          {p.region}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-700">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-steel-500">
                    Offices
                  </p>
                  <div className="flex flex-col gap-4">
                    {SITE.addresses.map((a) => (
                      <address
                        key={a.postalCode}
                        className="text-lg font-semibold not-italic text-steel-900"
                      >
                        {a.street}
                        <br />
                        {a.locality}, {a.region} {a.postalCode},{" "}
                        {a.countryName}
                        <span className="ml-2 text-sm font-normal text-steel-500">
                          {a.label}
                        </span>
                      </address>
                    ))}
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-8 overflow-hidden rounded-2xl border border-steel-200 shadow-sm">
              <iframe
                title={`Map showing ${SITE.name} Florida office`}
                src={`https://maps.google.com/maps?q=${mapQuery}&z=12&output=embed`}
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin allow-popups"
                allowFullScreen
                className="block h-[280px] w-full"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-steel-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-display text-2xl font-bold text-steel-900">
              Send us a message
            </h2>
            <p className="mt-2 text-steel-600">
              Fields marked <span className="text-forest-600">*</span> are
              required.
            </p>
            <div className="mt-7">
              {/* useSearchParams (quote-list prefill) requires a Suspense boundary. */}
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
