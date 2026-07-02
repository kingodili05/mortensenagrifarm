"use client";

import { useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { View, AdaptiveDpr, PerformanceMonitor, Preload } from "@react-three/drei";
import * as THREE from "three";

export type DebugStats = { fps: number; calls: number; tris: number };

// Reads renderer stats on a fixed cadence (throttled) for the debug overlay.
// No r3f-perf (Turbopack can't compile its font import).
function StatsReader({ onStats }: { onStats: (s: DebugStats) => void }) {
  const gl = useThree((s) => s.gl);
  const frames = useRef(0);
  const last = useRef(performance.now());
  useFrame(() => {
    frames.current++;
    const now = performance.now();
    const dt = now - last.current;
    if (dt >= 500) {
      onStats({
        fps: Math.round((frames.current * 1000) / dt),
        calls: gl.info.render.calls,
        tris: gl.info.render.triangles,
      });
      frames.current = 0;
      last.current = now;
    }
  });
  return null;
}

// THE single shared WebGL canvas for the whole experience. Every scene renders
// a drei <View track={domRef}> (via <SceneView>) that tunnels its 3D into the
// <View.Port/> below. drei skips views whose tracked DOM element is off-screen,
// and <SceneView> unmounts the View entirely once it leaves the viewport, so
// only on-screen scenes cost anything. ONE WebGL context for all on-page 3D.
export default function SceneStage({
  eventSource,
  debug = false,
  onStats,
}: {
  eventSource: RefObject<HTMLElement | null>;
  debug?: boolean;
  onStats?: (s: DebugStats) => void;
}) {
  const [dpr, setDpr] = useState(1.5);
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  return (
    <Canvas
      className="pointer-events-none"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 1 }}
      shadows="percentage"
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.95;
      }}
    >
      {/* Drop resolution on sustained frame-rate decline; recover on good runs. */}
      <PerformanceMonitor
        onDecline={() => setDpr(isMobile ? 1 : 1.25)}
        onIncline={() => setDpr(isMobile ? 1.25 : 1.75)}
      />
      <AdaptiveDpr pixelated />

      {/* Renders every scene's tunnelled <View> into this one context. */}
      <View.Port />

      <Preload all />

      {debug && onStats && <StatsReader onStats={onStats} />}
    </Canvas>
  );
}
