import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../story";

const FONT =
  '"Inter", "Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';

// Lower-third caption that rises and fades in, then fades before the cut.
export function Caption({
  text,
  durationInFrames,
}: {
  text: string;
  durationInFrames: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 22 });
  const y = interpolate(enter, [0, 1], [40, 0]);
  const opacityIn = interpolate(enter, [0, 1], [0, 1]);
  const opacityOut = interpolate(
    frame,
    [durationInFrames - 16, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = Math.min(opacityIn, opacityOut);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `translateY(${y}px)`,
        padding: "0 80px",
      }}
    >
      <div
        style={{
          width: 64,
          height: 5,
          borderRadius: 4,
          backgroundColor: BRAND.harvest400,
          marginBottom: 26,
        }}
      />
      <p
        style={{
          margin: 0,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 64,
          lineHeight: 1.1,
          textAlign: "center",
          color: "white",
          letterSpacing: "-0.02em",
          textShadow: "0 4px 30px rgba(0,0,0,0.45)",
          maxWidth: 1400,
        }}
      >
        {text}
      </p>
    </div>
  );
}
