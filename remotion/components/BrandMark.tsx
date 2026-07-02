import { BRAND } from "../story";

// The sprout-in-rounded-square logo mark, scalable for video.
export function BrandMark({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="14" fill={BRAND.forest700} />
      <path d="M32 50V30" stroke={BRAND.harvest400} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M32 30c0-8 5.5-13.5 15-13.5C46.5 25.5 41 30 32 30Z" fill={BRAND.harvest400} />
      <path d="M32 37c0-7-5.5-12.5-15-12.5C17.5 33 23 37 32 37Z" fill={BRAND.harvest300} opacity="0.85" />
    </svg>
  );
}
