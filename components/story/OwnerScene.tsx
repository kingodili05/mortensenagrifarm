"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

// Founder chapter — William Mortensen, styled for the cinematic dark theme
// (mirrors the owner ribbon concept from the classic homepage).
export default function OwnerScene() {
  return (
    <section className="relative overflow-hidden bg-forest-950 py-24 text-white lg:py-32">
      <div
        className="absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-forest-700/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.7fr_1fr]">
          <Reveal from="left">
            <figure className="relative mx-auto max-w-sm">
              <div className="overflow-hidden rounded-3xl border-4 border-harvest-500/80 shadow-2xl">
                <Image
                  src="/team/william-mortensen.jpg"
                  alt={`${SITE.owner}, founder and owner of ${SITE.name}`}
                  width={895}
                  height={1188}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 80vw, 380px"
                />
              </div>
              <figcaption className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-harvest-500 px-5 py-2 text-sm font-bold text-steel-900 shadow-lg">
                {SITE.owner}, Founder &amp; Owner
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-harvest-400">
              The founder
            </span>
            <blockquote className="mt-5 font-display text-3xl font-extrabold leading-snug sm:text-4xl">
              &ldquo;Great farming starts with great soil. We deliver inputs
              growers everywhere can trust — tested, consistent, and fairly
              priced.&rdquo;
            </blockquote>
            <p className="mt-6 text-lg font-semibold text-harvest-400">
              {SITE.owner}
            </p>
            <p className="text-sm uppercase tracking-[0.18em] text-steel-400">
              {SITE.legalTagline}
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/25 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                Read our story →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
