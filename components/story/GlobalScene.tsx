"use client";

import { useRef } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { SUPPLY_MODES, WORLD_FARMERS } from "@/lib/story-scenes";
import SceneView from "./r3f/SceneView";
import GlobeContents, { type SpinRef } from "./r3f/GlobeContents";

// Scenes 7 + 8: the harvest becomes a global supply network, then the people
// it reaches around the world.
export default function GlobalScene() {
  // Drag-to-spin: the shared canvas is pointer-events-none, so pointer events
  // fall through to this DOM wrapper. We feed angular velocity into the globe.
  const spin = useRef<SpinRef["current"]>({ vel: 0, angle: 0 });
  const drag = useRef({ active: false, x: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { active: true, x: e.clientX };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    drag.current.x = e.clientX;
    spin.current.vel = Math.max(-0.25, Math.min(0.25, spin.current.vel + dx * 0.004));
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <section className="relative overflow-hidden bg-steel-950 bg-gradient-to-b from-forest-950 to-steel-900 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Scene 7 — supply chain */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-harvest-400">
              07 — Global supply chain
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Supplying farmers across North America, Africa, Europe, Asia, and
              beyond.
            </h2>
            <p className="mt-5 max-w-xl text-lg text-steel-300">
              The harvest becomes containers, cargo ships, freight, trucks, and
              aircraft — a glowing network that moves nutrients and equipment to
              every corner of the world.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {SUPPLY_MODES.map((mode, i) => (
                <Reveal
                  key={mode.label}
                  delay={i * 90}
                  className="group relative overflow-hidden rounded-xl border border-white/10"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={mode.img}
                      alt={mode.label}
                      fill
                      sizes="(max-width: 1024px) 33vw, 200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-950/85 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-sm font-semibold">
                      {mode.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal from="scale" delay={120}>
            <div
              className="relative mx-auto aspect-square w-full max-w-[520px] cursor-grab touch-none select-none active:cursor-grabbing"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              role="img"
              aria-label="Interactive globe showing worldwide shipping routes from our hub — drag to spin"
            >
              <div
                className="absolute inset-0 rounded-full bg-forest-700/20 blur-3xl"
                aria-hidden="true"
              />
              <SceneView className="absolute inset-0">
                <GlobeContents spin={spin} />
              </SceneView>
            </div>
          </Reveal>
        </div>

        {/* Scene 8 — impact around the world */}
        <div className="mt-28">
          <Reveal>
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-harvest-400">
                08 — Impact around the world
              </span>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-extrabold sm:text-5xl">
                One mission. Millions of farmers.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORLD_FARMERS.map((f, i) => (
              <Reveal
                key={f.region}
                delay={i * 100}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={f.img}
                    alt={`${f.role} in ${f.region}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-steel-950/90 via-steel-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="font-display text-lg font-bold text-harvest-400">
                      {f.region}
                    </p>
                    <p className="text-sm text-steel-200">{f.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
