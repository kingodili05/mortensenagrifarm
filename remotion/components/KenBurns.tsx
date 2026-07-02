import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import type { Pan } from "../story";

// Slow cinematic zoom + directional pan over a still image.
export function KenBurns({
  src,
  pan,
  durationInFrames,
}: {
  src: string;
  pan: Pan;
  durationInFrames: number;
}) {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(p, [0, 1], [1.08, 1.22]);
  const shift = 4; // percent of travel
  const map: Record<Pan, { x: number; y: number }> = {
    up: { x: 0, y: -shift },
    down: { x: 0, y: shift },
    left: { x: -shift, y: 0 },
    right: { x: shift, y: 0 },
  };
  const x = interpolate(p, [0, 1], [0, map[pan].x]);
  const y = interpolate(p, [0, 1], [0, map[pan].y]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c3a21", overflow: "hidden" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${x}%, ${y}%)`,
        }}
      />
      {/* Cinematic gradient for caption legibility */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(5,30,15,0.35) 0%, rgba(5,30,15,0) 30%, rgba(5,30,15,0.15) 55%, rgba(5,30,15,0.78) 100%)",
        }}
      />
    </AbsoluteFill>
  );
}
