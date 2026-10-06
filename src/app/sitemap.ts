import type { MetadataRoute } from "next";
import { seo } from "@/dados/vitrine";
import { lps } from "@/empreendimentos";

// Export estático: o sitemap é gerado uma vez no build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${seo.site}/`, changeFrequency: "monthly", priority: 1 },
    ...lps.map((lp) => ({ url: `${seo.site}/${lp.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
