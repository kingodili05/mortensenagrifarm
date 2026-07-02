"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-steel-200 bg-cream/90 backdrop-blur-md"
          : "border-transparent bg-cream"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-forest-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-forest-700"
                    : "text-steel-600 hover:text-forest-700"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-harvest-500" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-forest-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-forest-800 hover:shadow-md"
          >
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-forest-800 transition-colors hover:bg-steel-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <path d="M6 6 18 18M6 18 18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Always rendered so aria-controls resolves; toggled via `hidden`. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-steel-200 bg-cream lg:hidden"
      >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded-md px-3 py-3 text-base font-semibold ${
                    isActive(link.href)
                      ? "bg-forest-50 text-forest-700"
                      : "text-steel-700 hover:bg-steel-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                className="block rounded-lg bg-forest-700 px-4 py-3 text-center text-base font-semibold text-white"
              >
                Request a Quote
              </Link>
            </li>
          </ul>
      </div>
    </header>
  );
}
