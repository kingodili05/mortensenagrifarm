import Link from "next/link";
import Logo from "./Logo";
import CopyrightYear from "./CopyrightYear";
import { MailIcon, PhoneIcon, MapPinIcon } from "./Icons";
import { SITE, NAV_LINKS } from "@/lib/site";

// Server Component by default (no client hooks). The year is delegated to the
// CopyrightYear client component so it stays current at runtime.
export default function Footer() {
  return (
    <footer className="border-t border-steel-800 bg-steel-900 text-steel-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="md:col-span-2 lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-400">
            {SITE.shortDescription} Serving the U.S., North America, Africa, and
            customers worldwide.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-steel-400 transition-colors hover:text-harvest-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-start gap-2.5 text-steel-400 transition-colors hover:text-harvest-400"
              >
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0" />
                {SITE.email}
              </a>
            </li>
            {SITE.phones.map((p) => (
              <li key={p.href}>
                <a
                  href={`tel:${p.href}`}
                  className="flex items-start gap-2.5 text-steel-400 transition-colors hover:text-harvest-400"
                >
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {p.display}
                    <span className="ml-1.5 text-xs text-steel-500">
                      ({p.region})
                    </span>
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2.5 text-steel-400">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {SITE.address.street}, {SITE.address.locality},{" "}
                {SITE.address.region} {SITE.address.postalCode}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Regions Served
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-steel-400">
            <li>United States &amp; Canada</li>
            <li>Africa</li>
            <li>Europe &amp; Middle East</li>
            <li>Asia-Pacific &amp; Latin America</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-steel-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-steel-500 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © <CopyrightYear /> {SITE.name}. {SITE.legalTagline}. All rights
            reserved.
          </p>
          <p>
            Owned &amp; operated by{" "}
            <span className="font-semibold text-steel-300">{SITE.owner}</span>.
            <span className="ml-2 text-steel-600">
              3D models via Poly Pizza (CC-BY).
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
