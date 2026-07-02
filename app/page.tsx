import type { Metadata } from "next";
import StoryExperience from "@/components/story/StoryExperience";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Farm Manure & Agricultural Equipment Supplier — Shipped Worldwide",
  description:
    "Mortensen AgriSupply supplies lab-tested organic farm manure and durable agricultural equipment to farms across the U.S., North America, Africa, and worldwide. Experience the journey from soil to global harvest.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} | Feeding the World's Future`,
    description:
      "An immersive journey from empty field to global harvest — organic fertilizer and agricultural equipment, delivered worldwide.",
    url: SITE.url,
    type: "website",
  },
};

export default function HomePage() {
  return <StoryExperience />;
}
