import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandMark } from "../components/BrandMark";
import { BRAND } from "../story";

const FONT =
  '"Inter", "Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';

export function TitleScene() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const markIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 26 });
  const titleIn = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 28 });
  const subIn = spring({ frame: frame - 18, fps, config: { damping: 200 }, durationInFrames: 28 });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 120% at 50% 0%, ${BRAND.forest800} 0%, ${BRAND.forest900} 70%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* faint field grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          transform: `translateY(${interpolate(markIn, [0, 1], [30, 0])}px) scale(${interpolate(markIn, [0, 1], [0.8, 1])})`,
          opacity: markIn,
        }}
      >
        <BrandMark size={140} />
      </div>

      <h1
        style={{
          margin: "40px 0 0",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 96,
          letterSpacing: "-0.03em",
          color: "white",
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [30, 0])}px)`,
        }}
      >
        Mortensen
        <span style={{ color: BRAND.harvest400 }}> AgriSupply</span>
      </h1>

      <p
        style={{
          margin: "22px 0 0",
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: 34,
          color: BRAND.steel300,
          opacity: subIn,
          transform: `translateY(${interpolate(subIn, [0, 1], [24, 0])}px)`,
        }}
      >
        Organic farm manure &amp; agricultural equipment
      </p>
    </AbsoluteFill>
  );
}
