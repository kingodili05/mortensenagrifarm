import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Mortensen Agri",
    description: SITE.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f5",
    theme_color: "#166534",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
