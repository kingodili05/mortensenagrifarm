import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// Generates the 1200x630 social share image at build/request time.
export const alt = `${SITE.name} — organic farm manure and agricultural equipment supplier`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0c3a21 0%, #166534 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#166534",
              border: "2px solid #facc15",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            🌱
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontSize: 34, fontWeight: 800 }}>
              Mortensen AgriSupply
            </span>
            <span
              style={{
                color: "#cbd5e1",
                fontSize: 18,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              {SITE.legalTagline}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              color: "white",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Organic farm manure & agricultural equipment
          </span>
          <span style={{ color: "#facc15", fontSize: 32, fontWeight: 600 }}>
            Shipped worldwide — U.S. · North America · Africa
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            color: "#d1fadf",
            fontSize: 24,
          }}
        >
          <span>Lab-tested quality</span>
          <span>·</span>
          <span>Wholesale pricing</span>
          <span>·</span>
          <span>Global logistics</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
