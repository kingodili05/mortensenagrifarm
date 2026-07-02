import Link from "next/link";
import { SITE } from "@/lib/site";

// Wordmark lockup: stylized sprout mark + company name.
export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const text = variant === "light" ? "text-white" : "text-forest-800";
  const sub = variant === "light" ? "text-harvest-400" : "text-forest-600";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${SITE.name} — home`}
    >
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-forest-700 text-harvest-400 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21V11"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <path
            d="M12 11c0-3 2.2-5.2 6-5.2-.2 3.6-2.4 5.2-6 5.2Z"
            fill="currentColor"
          />
          <path
            d="M12 14C12 11.2 9.8 9 6 9c.2 3.4 2.4 5 6 5Z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold tracking-tight ${text}`}>
          Mortensen<span className={sub}>AgriSupply</span>
        </span>
        <span
          className={`mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] ${
            variant === "light" ? "text-steel-300" : "text-steel-500"
          }`}
        >
          {SITE.legalTagline}
        </span>
      </span>
    </Link>
  );
}
