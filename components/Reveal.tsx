"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in ms. */
  delay?: number;
  /** Entry direction. */
  from?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
};

const OFFSETS: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  scale: "scale-95",
};

/**
 * Reveals its children with a compositor-friendly (transform/opacity) entrance
 * the first time it scrolls into view. Honors prefers-reduced-motion by
 * rendering immediately with no transform.
 */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        shown
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : `${OFFSETS[from]} opacity-0 will-change-[transform,opacity]`
      } ${className}`}
    >
      {children}
    </div>
  );
}
