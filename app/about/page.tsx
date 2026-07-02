import type { Metadata } from "next";
import Image from "next/image";
import { Container, SectionHeading, ButtonLink, Eyebrow } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { CheckIcon } from "@/components/Icons";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — U.S. Organic Fertilizer & Equipment Supplier Since 2009",
  description:
    "Founded by William Mortensen, Mortensen AgriSupply has grown from a regional manure supplier into a global exporter of organic fertilizer and agricultural equipment. Learn our story, mission, and values.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Soil-first",
    body: "We believe healthy soil is the foundation of every harvest. Our products are graded to build organic matter, not just feed a single crop.",
  },
  {
    title: "Transparency",
    body: "Lab analyses, certificates of origin, and honest specifications accompany every order — no guesswork for the grower.",
  },
  {
    title: "Reliability",
    body: "Farmers plan seasons around our deliveries. We hold ourselves to the schedules and quality our customers depend on.",
  },
  {
    title: "Global stewardship",
    body: "From Iowa fields to farms across Africa, we move nutrients responsibly and support sustainable agriculture everywhere we ship.",
  },
];

const MILESTONES = [
  {
    year: SITE.foundingYear,
    title: "Founded by William Mortensen",
    body: "Started as a regional composted-manure supplier serving Midwest row-crop farms.",
  },
  {
    year: 2014,
    title: "Equipment division added",
    body: "Expanded into spreaders, tractors, and implements to serve customers end-to-end.",
  },
  {
    year: 2018,
    title: "First international exports",
    body: "Began containerized shipping of organic fertilizer to North American and African markets.",
  },
  {
    year: 2024,
    title: "40+ countries served",
    body: "Grew into a worldwide supply partner with dedicated export logistics.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Intro */}
      <section className="border-b border-steel-200 bg-cream-dark py-16 lg:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>{SITE.legalTagline}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-steel-900 sm:text-5xl">
              Building healthier soil since {SITE.foundingYear}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-steel-600">
              {SITE.name} was founded on a simple conviction: that great farming
              starts with great soil, and that growers everywhere deserve
              honest, lab-tested inputs and dependable equipment to work it.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-steel-200 shadow-lg">
            <Image
              src="/about-field.svg"
              alt="Rows of healthy crops growing in dark, fertile soil at sunrise"
              width={680}
              height={520}
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1fr]">
          <figure className="relative mx-auto max-w-sm">
            <div className="overflow-hidden rounded-3xl border border-steel-200 shadow-xl">
              <Image
                src="/team/william-mortensen.jpg"
                alt={`Portrait of ${SITE.owner}, founder and owner of ${SITE.name}`}
                width={895}
                height={1188}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 384px"
              />
            </div>
            <figcaption className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-forest-700 px-5 py-2 text-sm font-semibold text-white shadow-lg">
              {SITE.owner}, Founder &amp; Owner
            </figcaption>
          </figure>

          <div>
            <SectionHeading
              eyebrow="A word from the owner"
              title="Why I started Mortensen AgriSupply"
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-steel-600">
              <p>
                &ldquo;I grew up around farms and watched too many growers
                struggle to find quality organic inputs they could trust. I
                started this company to change that — to deliver manure and
                fertilizer that&rsquo;s tested, consistent, and fairly priced.&rdquo;
              </p>
              <p>
                &ldquo;Today we serve farms on multiple continents, but the
                mission hasn&rsquo;t changed. Whether you need a single tote or a
                full container, you get the same standard of quality and
                service.&rdquo;
              </p>
              <p className="font-display text-xl font-bold text-forest-700">
                — {SITE.owner}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-cream-dark py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we stand for"
            title="Our values"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-steel-200 bg-white p-7 shadow-sm"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-forest-50 text-forest-700">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-steel-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Our journey" title="Milestones" />
          <ol className="mt-12 space-y-8 border-l-2 border-steel-200 pl-8">
            {MILESTONES.map((m) => (
              <li key={m.year} className="relative">
                <span
                  className="absolute -left-[41px] grid h-6 w-6 place-items-center rounded-full border-2 border-harvest-500 bg-cream"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-harvest-500" />
                </span>
                <p className="font-display text-sm font-bold text-forest-600">
                  {m.year}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-steel-900">
                  {m.title}
                </h3>
                <p className="mt-1 text-steel-600">{m.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-forest-700 py-16 text-center text-white">
        <Container>
          <h2 className="font-display text-3xl font-extrabold">
            Partner with a supplier that puts growers first
          </h2>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="primary" withArrow>
              Get in touch
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
