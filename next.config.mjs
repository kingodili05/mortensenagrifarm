/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // All site imagery is first-party SVG in /public; allow the optimizer to serve it.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            // Baseline CSP. Next's App Router injects inline hydration scripts,
            // so 'unsafe-inline' is required here without per-request nonce
            // middleware. 'unsafe-eval' is added in development only (React dev
            // tooling needs it); production stays strict. frame-src is limited
            // to the Google Maps embed.
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${
                process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
              }`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "media-src 'self'",
              "font-src 'self'",
              // blob: needed for GLTF embedded textures + worker decoders (draco/ktx2/meshopt)
              "connect-src 'self' blob: data:",
              "worker-src 'self' blob:",
              "frame-src https://maps.google.com https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
