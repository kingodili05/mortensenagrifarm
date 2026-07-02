"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import IntroScene from "./IntroScene";
import PhotoScene from "./PhotoScene";
import SoilGrowthScene from "./SoilGrowthScene";
import GlobalScene from "./GlobalScene";
import OwnerScene from "./OwnerScene";
import FinaleScene from "./FinaleScene";
import { SCENE2, SCENE5, SCENE6, SCENE9 } from "@/lib/story-scenes";

// One shared WebGL canvas for the whole experience (client-only, no SSR).
const SceneStage = dynamic(() => import("./r3f/SceneStage"), { ssr: false });

// Full "Feeding the World's Future" scroll experience — 10 chapters, all 3D
// scenes tunnelled into a single canvas via drei <View>.
export default function StoryExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [debug, setDebug] = useState(false);
  const [canvasCount, setCanvasCount] = useState(0);
  const [stats, setStats] = useState({ fps: 0, calls: 0, tris: 0 });

  // Enable the debug overlay with ?debug=1.
  useEffect(() => {
    setDebug(new URLSearchParams(window.location.search).get("debug") === "1");
  }, []);

  // Top scroll-progress indicator.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Live WebGL-context (canvas element) count for the debug overlay.
  useEffect(() => {
    if (!debug) return;
    const id = setInterval(() => {
      setCanvasCount(document.getElementsByTagName("canvas").length);
    }, 1000);
    return () => clearInterval(id);
  }, [debug]);

  return (
    <div ref={containerRef} className="relative bg-forest-950">
      {/* Scroll-progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-harvest-500" />
      </div>

      {/* The single shared 3D canvas — every scene's View tunnels into it. */}
      <SceneStage eventSource={containerRef} debug={debug} onStats={setStats} />

      {debug && (
        <div className="fixed bottom-3 right-3 z-[70] space-y-0.5 rounded-lg bg-black/80 px-3 py-2 font-mono text-xs text-harvest-400 shadow-lg">
          <div>WebGL canvases (contexts): {canvasCount}</div>
          <div>FPS: {stats.fps}</div>
          <div>Draw calls: {stats.calls}</div>
          <div>Triangles: {stats.tris.toLocaleString()}</div>
        </div>
      )}

      <IntroScene />
      <PhotoScene scene={SCENE2} />
      <SoilGrowthScene />
      <PhotoScene scene={SCENE5} />
      <PhotoScene scene={SCENE6} />
      <GlobalScene />
      <PhotoScene scene={SCENE9} />
      <OwnerScene />
      <FinaleScene />
    </div>
  );
}
