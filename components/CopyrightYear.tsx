"use client";

// Renders the current year at runtime so the footer copyright never goes stale
// between deploys (a Server Component would freeze it at build time).
export default function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}
