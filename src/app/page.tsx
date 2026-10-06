import type { Metadata } from "next";
import { harmonis } from "@/dados/empreendimentos";
import { perguntas, seo } from "@/dados/vitrine";
import { Vitrine } from "@/secoes/vitrine/Vitrine";

export const metadata: Metadata = {
  title: { absolute: seo.titulo },
  description: seo.descricao,
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.titulo,
    description: seo.descricao,
    url: "/",
    siteName: seo.nomeSite,
    images: [{ url: seo.imagem, width: 1919, height: 1080 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: seo.titulo, description: seo.descricao, images: [seo.imagem] },
};

// Dados estruturados: organização, site, lista dos Harmonis (condomínio fechado
// por cidade) e as perguntas da página.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${seo.organizacao.url}#org`,
      name: seo.organizacao.nome,
      url: seo.organizacao.url,
      parentOrganization: { "@type": "Organization", name: seo.organizacao.grupo },
    },
    {
      "@type": "WebSite",
      url: `${seo.site}/`,
      name: seo.nomeSite,
      inLanguage: "pt-BR",
      publisher: { "@id": `${seo.organizacao.url}#org` },
    },
    {
      "@type": "ItemList",
      name: seo.nomeLista,
      itemListElement: harmonis.map((h, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "GatedResidenceCommunity",
          name: h.nome,
          url: `${seo.site}/${h.slug}/`,
          // Render de outro Harmoni no lugar não vai para os dados estruturados.
          ...(h.foto.provisoria ? {} : { image: `${seo.site}${h.foto.src}` }),
          address: { "@type": "PostalAddress", addressLocality: h.cidade, addressRegion: h.uf, addressCountry: "BR" },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: perguntas.itens.map((q) => ({
        "@type": "Question",
        name: q.pergunta,
        acceptedAnswer: { "@type": "Answer", text: q.resposta },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Vitrine />
    </>
  );
}
