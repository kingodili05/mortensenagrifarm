import type { Metadata } from "next";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { Icon, type IconName } from "@/components/Icons";
import { breadcrumbJsonLd } from "@/lib/seo";
import { REGIONS, SHIPPING_STEPS, VALUE_PROPS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services & Global Shipping — Logistics for Manure & Equipment",
  description:
    "Mortensen AgriSupply handles export documentation, packaging, and freight for organic fertilizer and agricultural equipment to the U.S., North America, Africa, and worldwide. See how our shipping process works.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    icon: "globe",
    title: "Worldwide Freight",
    body: "Sea, land, and multimodal freight in bulk, totes, bags, or containerized equipment — to any major port or inland destination.",
  },
  {
    icon: "flask",
    title: "Testing & Certification",
    body: "Certificates of analysis, organic compliance, and phytosanitary documentation prepared for your country of import.",
  },
  {
    icon: "headset",
    title: "Agronomy Consultation",
    body: "Application-rate planning and product selection guidance from agronomists who understand your crop and climate.",
  },
  {
    icon: "tag",
    title: "Wholesale & Contracts",
    body: "Volume pricing, seasonal supply contracts, and distributor programs for cooperatives and resellers.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services & Shipping", path: "/services" },
        ])}
      />

      {/* Header */}
      <section className="border-b border-steel-200 bg-cream-dark py-16 lg:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Services & Shipping"
            title="Global logistics, handled end-to-end"
            intro="We do more than supply product — we move it to your gate. From paperwork to port, our team manages the details so your inputs arrive on time and in spec."
          />
        </Container>
      </section>

      {/* Services grid */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-steel-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest-50 text-forest-700">
                  <Icon name={s.icon as IconName} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-steel-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Shipping process */}
      <section className="bg-steel-900 py-16 text-white lg:py-24">
        <Container>
          <SectionHeading
            light
            eyebrow="How it works"
            title="From quote to delivery in four steps"
            align="center"
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SHIPPING_STEPS.map((step) => (
              <li
                key={step.step}
                className="relative rounded-2xl border border-steel-700 bg-steel-800 p-7"
              >
                <span className="font-display text-4xl font-extrabold text-harvest-400/90">
                  {step.step}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-400">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Regions */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Where we deliver"
            title="Regions we serve"
            intro="Active supply routes across six regions and 40+ countries."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REGIONS.map((region) => (
              <div
                key={region.name}
                className="rounded-2xl border border-steel-200 bg-white p-7 shadow-sm"
              >
                <h3 className="font-display text-lg font-bold text-forest-700">
                  {region.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">
                  {region.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Guarantees band */}
      <section className="bg-cream-dark py-14">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((p) => (
              <div key={p.title} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-forest-700 text-harvest-400">
                  <Icon name={p.icon as IconName} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-steel-900">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-steel-600">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-forest-700 py-16 text-center text-white">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">
            Get a shipping quote for your destination
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-forest-50">
            Share your location and volume — we&rsquo;ll recommend the most
            cost-effective route.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="primary" withArrow>
              Request a Quote
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
