"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./useScrollTrigger";
import { SCENE1 } from "@/lib/story-scenes";

// Scene 1: the empty field. Sun rises and the scene brightens as the user
// begins to scroll; copy animates in on load.
export default function IntroScene() {
  const rootRef = useRef<HTMLElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced) {
        // On-load copy reveal.
        gsap.from(copyRef.current!.querySelectorAll<HTMLElement>(".reveal"), {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.14,
          delay: 0.2,
        });

        // Sun rises + scene brightens on scroll.
        gsap.to(sunRef.current, {
          y: -180,
          scale: 1.5,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(imgRef.current, {
          yPercent: 12,
          filter: "brightness(1.25)",
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id={SCENE1.id}
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-forest-950"
    >
      <div ref={imgRef} className="absolute inset-0 -z-10 h-[115%] -top-[7%]">
        <Image
          src={SCENE1.image}
          alt={SCENE1.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Rising sun glow at the horizon */}
      <div
        ref={sunRef}
        aria-hidden="true"
        className="absolute bottom-[28%] left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(250,204,21,0.9) 0%, rgba(234,88,12,0.4) 45%, rgba(234,88,12,0) 70%)",
        }}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/90 via-forest-950/50 to-forest-950/30" />

      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div ref={copyRef} className="max-w-2xl">
          <span className="reveal inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-harvest-400">
            <span className="font-display text-base text-white/40">{SCENE1.index}</span>
            {SCENE1.eyebrow}
          </span>
          <h1 className="reveal mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {SCENE1.title}
          </h1>
          <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-steel-200 sm:text-xl">
            {SCENE1.body}
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
          Scroll to begin
        </span>
        <div className="mx-auto mt-2 h-9 w-5 rounded-full border-2 border-white/50">
          <span className="mx-auto mt-1.5 block h-1.5 w-0.5 animate-bounce rounded-full bg-white/80 motion-reduce:animate-none" />
        </div>
      </div>
    </section>
  );
}
