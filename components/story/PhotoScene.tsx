"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./useScrollTrigger";
import type { PhotoSceneData } from "@/lib/story-scenes";
import SceneView from "./r3f/SceneView";
import ModelContents from "./r3f/ModelContents";

const ALIGN: Record<NonNullable<PhotoSceneData["align"]>, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

// Photographic chapters use a parallax photo backdrop. Chapters with a 3D
// model instead become a pinned "drive stage": the vehicle drives across the
// screen as the section scrolls, over a clean cinematic backdrop (no photo).
export default function PhotoScene({ scene }: { scene: PhotoSceneData }) {
  const rootRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  const hasModel = !!scene.modelSrc;
  const tone = scene.tone ?? "dark";
  const alignRight = scene.align === "right";

  useEffect(() => {
    const root = rootRef.current;
    const copy = copyRef.current;
    if (!root || !copy) return;

    if (prefersReducedMotion()) {
      if (hasModel) progress.current = 0.5; // static centred model
      return;
    }

    const ctx = gsap.context(() => {
      if (hasModel) {
        // Drive choreography: model position is scrubbed while the section is
        // pinned (tall section + sticky inner give the scroll distance).
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        });
      } else if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }

      gsap.from(copy.querySelectorAll<HTMLElement>(".reveal"), {
        y: 44,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: copy, start: "top 80%" },
      });
    }, root);

    return () => ctx.revert();
  }, [hasModel]);

  const Copy = (
    <div
      ref={copyRef}
      className={`flex max-w-2xl flex-col ${ALIGN[scene.align ?? "left"]} ${
        scene.align === "center" ? "mx-auto" : alignRight ? "ml-auto" : ""
      }`}
    >
      <span className="reveal inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-harvest-400">
        <span className="font-display text-base text-white/40">{scene.index}</span>
        {scene.eyebrow}
      </span>
      <h2 className="reveal mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
        {scene.title}
      </h2>
      <p className="reveal mt-6 text-lg leading-relaxed text-steel-200 sm:text-xl">
        {scene.body}
      </p>
      {scene.products && (
        <ul
          className={`reveal mt-8 flex flex-wrap gap-3 ${
            scene.align === "center" ? "justify-center" : ""
          }`}
        >
          {scene.products.map((p) => (
            <li
              key={p}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm"
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // ---- 3D drive stage ----
  if (hasModel) {
    return (
      <section
        ref={rootRef}
        id={scene.id}
        aria-label={scene.title}
        className="relative h-[220vh] bg-forest-950"
      >
        {/* Pinned backdrop + 3D tracking layer. Kept at z-0 so it stays BELOW
            the shared canvas (z-1) — the model draws over this backdrop. */}
        <div className="absolute inset-0 z-0">
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Clean cinematic backdrop + soft ground glow (no photo). */}
            <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-[#05130b] to-steel-950" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-[18%] mx-auto h-[55vmin] w-[120vmin] rounded-[50%] blur-[120px]"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(250,204,21,0.16), rgba(52,210,125,0.08) 50%, transparent 72%)",
              }}
            />

            {/* Full-width drive stage. */}
            <SceneView className="pointer-events-none absolute inset-0">
              <ModelContents src={scene.modelSrc!} progress={progress} />
            </SceneView>
          </div>
        </div>

        {/* Pinned copy layer. z-[2] lifts its stacking context above the
            shared canvas so the vehicle can never drive over the text. */}
        <div className="sticky top-0 z-[2] flex h-screen items-center overflow-hidden">
          {/* Readability scrim — now genuinely above the 3D. */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 w-2/3 ${
              alignRight
                ? "right-0 bg-gradient-to-l from-forest-950/60 via-forest-950/25 to-transparent"
                : "left-0 bg-gradient-to-r from-forest-950/60 via-forest-950/25 to-transparent"
            }`}
          />

          <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
            {Copy}
          </div>
        </div>
      </section>
    );
  }

  // ---- Photographic chapter ----
  return (
    <section
      ref={rootRef}
      id={scene.id}
      aria-label={scene.title}
      className="relative flex min-h-screen items-center overflow-hidden bg-forest-950"
    >
      <div ref={imgRef} className="absolute inset-0 z-0 h-[118%] -top-[9%]">
        <Image src={scene.image} alt={scene.imageAlt} fill sizes="100vw" className="object-cover" />
      </div>
      <div
        className={`absolute inset-0 z-0 ${
          tone === "dark"
            ? "bg-gradient-to-br from-forest-950/85 via-forest-950/65 to-forest-900/55"
            : "bg-gradient-to-t from-forest-950/85 via-forest-950/35 to-transparent"
        }`}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">{Copy}</div>
    </section>
  );
}
