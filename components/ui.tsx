import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./Icons";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-forest-600">
      <span className="h-px w-6 bg-harvest-500" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  /** Heading level — set to "h1" for the primary page title. */
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        className={`mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-steel-900"
        }`}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-steel-300" : "text-steel-600"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-harvest-500 text-steel-900 hover:bg-harvest-400 shadow-sm hover:shadow-md",
  secondary:
    "bg-forest-700 text-white hover:bg-forest-800 shadow-sm hover:shadow-md",
  ghost:
    "bg-transparent text-white ring-1 ring-inset ring-white/30 hover:bg-white/10",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${buttonStyles[variant]} ${className}`}
    >
      {children}
      {withArrow && (
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
