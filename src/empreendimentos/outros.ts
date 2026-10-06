// Cartões "Conheça os outros Harmonis" do fim das LPs. A chamada é a frase da vitrine
// (src/dados/empreendimentos.ts), exceto a do Vinhedos: a frase dele na vitrine é longa
// para o cartão, então fica o subtítulo da LP no ar.
import { harmonis } from "@/dados/empreendimentos";
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
  chamada: slug === "vinhedos" ? chamadaVinhedos : (harmonis.find((h) => h.slug === slug)?.frase ?? ""),
});
