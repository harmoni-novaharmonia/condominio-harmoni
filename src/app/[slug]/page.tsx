import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lpPorSlug, lps } from "@/empreendimentos";
import { PaginaLP } from "@/secoes/lp/PaginaLP";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return lps.map((lp) => ({ slug: lp.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lp = lpPorSlug((await params).slug);
  if (!lp) return {};
  return {
    title: lp.seo.titulo,
    description: lp.seo.descricao,
    openGraph: { title: lp.seo.titulo, description: lp.seo.descricao, images: [lp.seo.imagem], locale: "pt_BR", type: "website" },
  };
}

export default async function Pagina({ params }: Params) {
  const lp = lpPorSlug((await params).slug);
  if (!lp) notFound();
  return <PaginaLP lp={lp} />;
}
