"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { View } from "@react-three/drei";
import ViewBoundary from "./ViewBoundary";

// Tunnels 3D children into the single shared <Canvas>'s <View.Port/>.
//
// IMPORTANT: when <View> is used outside the Canvas, drei renders ITS OWN div
// (using the className/style passed here) and tracks that element — a `track`
// prop is ignored in this mode. So the positioning className must live on
// <View> directly, and we must NOT wrap it in another div. drei scissors the
// shared canvas to this div's screen rect and skips rendering while it is
// off-screen. We additionally gate the heavy children on an Intersection
// observer so their GPU/geometry only mount near the viewport.
export default function SceneView({
  children,
  className,
  rootMargin = "200px",
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <View ref={ref as React.RefObject<HTMLElement>} className={className}>
      {inView && <ViewBoundary>{children}</ViewBoundary>}
    </View>
  );
}
