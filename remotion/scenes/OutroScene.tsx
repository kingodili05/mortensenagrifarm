import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandMark } from "../components/BrandMark";
import { BRAND } from "../story";

const FONT =
  '"Inter", "Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif';

export function OutroScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 26 });
  const nameIn = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 28 });
  const ctaIn = spring({ frame: frame - 24, fps, config: { damping: 200 }, durationInFrames: 26 });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 120% at 50% 100%, ${BRAND.forest700} 0%, ${BRAND.forest900} 70%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          opacity: 0.5,
        }}
      />
      <div style={{ opacity: markIn, transform: `scale(${interpolate(markIn, [0, 1], [0.85, 1])})` }}>
        <BrandMark size={120} />
      </div>

      <h2
        style={{
          margin: "34px 0 0",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 84,
          letterSpacing: "-0.03em",
          color: "white",
          opacity: nameIn,
          transform: `translateY(${interpolate(nameIn, [0, 1], [26, 0])}px)`,
        }}
      >
        Mortensen<span style={{ color: BRAND.harvest400 }}> AgriSupply</span>
      </h2>

      <p
        style={{
          margin: "16px 0 0",
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 26,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: BRAND.steel300,
          opacity: nameIn,
        }}
      >
        A William Mortensen Company
      </p>

      <div
        style={{
          marginTop: 48,
          padding: "20px 44px",
          borderRadius: 14,
          backgroundColor: BRAND.harvest400,
          color: BRAND.forest900,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 32,
          opacity: ctaIn,
          transform: `translateY(${interpolate(ctaIn, [0, 1], [20, 0])}px)`,
        }}
      >
        Request a quote →
      </div>
    </AbsoluteFill>
  );
}
