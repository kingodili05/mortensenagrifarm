import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-forest-900 py-28 text-center text-white">
      <Container>
        <p className="font-display text-6xl font-extrabold text-harvest-400">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mx-auto mt-3 max-w-md text-steel-300">
          The page may have moved. Head back home or browse our product catalog.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="primary">
            Back to home
          </ButtonLink>
          <ButtonLink href="/products" variant="ghost">
            View products
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
