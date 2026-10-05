// Conteúdo da página do Vinhedos copiada da LP no ar (condominioharmoni.com.br).
// Só o header e o rodapé são os do projeto; o miolo segue a página do WordPress.
import type { Arquivo, Formulario, Imagem, Link } from "../tipos";

/** Texto com trechos em negrito marcados com **assim** (igual ao <strong> da página no ar). */
export type Rico = string;

/** Ícone ilustrado da página no ar (public/img/vinhedos/icones) com o rótulo embaixo. */
export type IconeNoAr = { titulo: string; icone: Arquivo };

export type PaginaNoAr = {
  hero: {
    /** Uma entrada por linha do título. */
    linhas: string[];
    faixa: string;
    fundo: Imagem;
  };
  cadastro: { titulo: string; formulario: Formulario };
  conceito: {
    titulo: string;
    texto: string;
    pilares: string;
    cta: Link;
    fundo: Imagem;
    /** Versão vertical da mesma foto, usada no celular. */
    fundoCelular: Imagem;
  };
  faixaLocalizacao: string;
  localizacao: { mapa: Imagem; texto: string };
  chamada: { titulo: Rico; texto: string; fundo: Imagem };
  alemDoBasico: { titulo: Rico[]; itens: IconeNoAr[] };
  perspectivas: { titulo: Rico[]; slides: { nome: string; imagem: Imagem }[] };
  saude: { cta: Link; titulo: Rico; itens: IconeNoAr[] };
  infraestrutura: { titulo: Rico[]; itens: IconeNoAr[] };
  implantacao: { titulo: string; planta: Imagem; cta: Link; legenda: string[] };
  comoConstruimos: { titulo: Rico; subtitulo: string; missao: Rico[]; texto: string; imagem: Imagem };
  futuro: { foto: Imagem; frase: string; mapa: Imagem; presenca: string };
  grupo: {
    chamada: Rico;
    frase: string;
    logos: (Arquivo & { alt: string })[];
    paragrafos: string[];
    /** Uma entrada por linha. */
    setores: string[];
    fotos: Imagem[];
  };
  stand: { titulo: string; mapaUrl: string; mapaTitulo: string; foto: Imagem };
};
