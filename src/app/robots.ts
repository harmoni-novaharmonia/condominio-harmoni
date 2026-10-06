import type { MetadataRoute } from "next";
import { seo } from "@/dados/vitrine";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${seo.site}/sitemap.xml`,
  };
}
