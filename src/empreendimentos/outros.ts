// Cartões "Conheça os outros Harmonis" do fim das LPs. A chamada é a da vitrine
// (src/dados/empreendimentos.ts); o Vinhedos não está na vitrine e usa o subtítulo da LP no ar.
import { porSlug } from "@/dados/empreendimentos";
import { estiloDeVida, provisoria, render } from "./renders";
import type { Imagem } from "./tipos";

const fotos: Record<string, Imagem> = {
  vinhedos: render("portico"),
  jardins: estiloDeVida.meninaCachorro,
  arbore: provisoria("portico"),
  vale: provisoria("salaoExterno"),
  essenza: provisoria("gourmet"),
};

const chamadaVinhedos = "Condomínio horizontal com lotes a partir de 160m².";

export const cartaoOutro = (slug: string) => ({
  foto: fotos[slug] ?? provisoria("portico"),
  chamada: porSlug(slug)?.chamada ?? (slug === "vinhedos" ? chamadaVinhedos : ""),
});
