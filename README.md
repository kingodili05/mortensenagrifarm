# Mortensen AgriSupply

Production marketing website for **Mortensen AgriSupply** — a global supplier of
organic farm manure (fertilizer) and agricultural equipment. *A William Mortensen
Company.* Owner: **William Mortensen**.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and
**Tailwind CSS v4**. Engineered for SEO, accessibility, and Core Web Vitals.

## Pages

| Route        | Purpose                                                        |
| ------------ | ------------------------------------------------------------- |
| `/`          | Home — hero, value props, categories, featured products, regions, CTA |
| `/products`  | Catalog — manure/fertilizer + equipment with specs           |
| `/services`  | Services & global shipping process + regions served          |
| `/about`     | Company story, founder/owner William Mortensen, values, timeline |
| `/contact`   | Contact details, embedded map, and validated quote form      |

## SEO features

- Per-page `<title>` + meta descriptions (`app/*/page.tsx`)
- Open Graph + Twitter cards via generated image (`app/opengraph-image.tsx`)
- JSON-LD structured data: Organization, LocalBusiness, Product, BreadcrumbList (`lib/seo.ts`)
- `sitemap.xml` (`app/sitemap.ts`) and `robots.txt` (`app/robots.ts`)
- PWA manifest (`app/manifest.ts`)
- Semantic HTML, descriptive `alt` text, canonical URLs, `lang="en"`
- Security headers and image optimization (`next.config.mjs`)

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

## Build & run production

```bash
npm run build
npm run start
```

## Before launch — checklist

1. Set the real domain in `lib/site.ts` (`SITE.url`) and `.env.local`
   (`NEXT_PUBLIC_SITE_URL`).
2. Replace placeholder contact details, address, and geo coordinates in
   `lib/site.ts`.
3. Replace placeholder product copy, specs, and imagery in `lib/data.ts`
   and `public/products/*`.
4. Wire the contact form to a real email/CRM provider in
   `app/api/contact/route.ts` (see `.env.example`).
5. Add the Google Search Console verification token to
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, then submit `sitemap.xml`.
6. Swap the placeholder founder portrait (`public/founder.svg`) for a real photo.

## Deployment

Optimized for [Vercel](https://vercel.com) (zero-config). Any Node host that
supports Next.js 15 works. Set the environment variables from `.env.example`
in your host's dashboard.

## Tech notes

- Design tokens (color, type, motion) live in `app/globals.css` (`@theme`).
- Reusable UI primitives in `components/` — `Header`, `Footer`, `ui.tsx`,
  `ProductCard`, `Icons`, `JsonLd`.
- Content/data is centralized in `lib/data.ts` and `lib/site.ts` so copy can be
  edited without touching components.
"# mortensenagrifarm" 
