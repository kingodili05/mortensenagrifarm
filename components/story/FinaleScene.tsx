"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./useScrollTrigger";
import SceneView from "./r3f/SceneView";
import FinaleContents from "./r3f/FinaleContents";

// Scene 10: pull back from a single plant → field → glowing green Earth, then
// reveal the closing line and calls to action.
export default function FinaleScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const cta = ctaRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      progress.current = 1;
      if (cta) {
        cta.style.opacity = "1";
        cta.style.pointerEvents = "auto";
      }
      return;
    }

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
        if (cta) {
          const o = gsap.utils.clamp(0, 1, (self.progress - 0.7) / 0.25);
          cta.style.opacity = String(o);
          // Invisible buttons must not swallow clicks or keyboard focus targets.
          cta.style.pointerEvents = o > 0.5 ? "auto" : "none";
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={rootRef} className="relative h-[320vh] bg-forest-950">
      {/* z-[2] lifts this sticky layer's stacking context above the shared
          canvas (z-1) so the headline + CTAs paint over the Earth. */}
      <div className="sticky top-0 z-[2] flex h-screen items-center justify-center overflow-hidden">
        <SceneView className="absolute inset-0">
          <FinaleContents progress={progress} />
        </SceneView>

        <div className="relative z-10 px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-harvest-400">
            10 — The future
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Together, we&rsquo;re cultivating the future.
          </h2>

          <div
            ref={ctaRef}
            className="pointer-events-none mt-10 flex flex-wrap justify-center gap-4 opacity-0"
          >
            <Link
              href="/products"
              className="rounded-lg bg-harvest-500 px-7 py-3.5 text-sm font-bold text-steel-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-harvest-400"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="rounded-lg bg-white/10 px-7 py-3.5 text-sm font-bold text-white ring-1 ring-inset ring-white/30 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
            >
              Request Global Supply Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
