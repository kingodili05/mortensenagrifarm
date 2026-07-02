"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./useScrollTrigger";
import SceneView from "./r3f/SceneView";
import SoilContents from "./r3f/SoilContents";

// Scenes 3 + 4: dive underground (soil, fertilizer granules, roots, glowing
// nutrients) then rise as crops explode into growth — one continuous 3D shot.
export default function SoilGrowthScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const capARef = useRef<HTMLDivElement>(null);
  const capBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const capA = capARef.current;
    const capB = capBRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      // Static state shows the growth half — pair it with caption B only, so
      // the two absolutely-positioned captions never overlap.
      progress.current = 0.6;
      if (capA) capA.style.opacity = "0";
      if (capB) capB.style.opacity = "1";
      return;
    }

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        progress.current = p;
        // Cross-fade the two captions across the dive → growth halves.
        // Windows are disjoint (A out by 0.44, B in from 0.50) so the swap
        // reads as a crisp handoff instead of two dim overlapping captions.
        if (capA) capA.style.opacity = String(gsap.utils.clamp(0, 1, 1 - (p - 0.32) / 0.12));
        if (capB) capB.style.opacity = String(gsap.utils.clamp(0, 1, (p - 0.5) / 0.12));
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={rootRef} className="relative h-[320vh] bg-[#081c10]">
      {/* z-[2] lifts this sticky layer's stacking context above the shared
          canvas (z-1) so the captions paint over the 3D, not under it. */}
      <div className="sticky top-0 z-[2] h-screen overflow-hidden">
        <SceneView className="absolute inset-0">
          <SoilContents progress={progress} />
        </SceneView>

        {/* Caption A — feeding the soil */}
        <div
          ref={capARef}
          className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 px-6 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-harvest-400">
            03 — Feeding the soil
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Healthy soil creates stronger harvests.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-steel-200">
            Fertilizer granules sink into the earth. Roots spread. Glowing
            nutrient pathways feed every plant.
          </p>
        </div>

        {/* Caption B — growth explosion */}
        <div
          ref={capBRef}
          className="pointer-events-none absolute inset-x-0 bottom-[12%] px-6 text-center opacity-0"
        >
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-harvest-400">
            04 — Growth explosion
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            From seed to abundance.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-steel-200">
            Crops surge from the soil — wheat, corn, soybeans — and the field
            turns green and alive.
          </p>
        </div>
      </div>
    </div>
  );
}
