// Seções exclusivas do Harmoni Arbore (revisão aprovada em 2026-10-06).
// Papel, nogueira e laranja; motivo tirado do nome: a madeira em ripas verticais
// (o ripado dos renders) e o que cresce de baixo para cima.
import type { Destaque, Formulario, Imagem, Item, ItemPerspectiva, Link } from "../tipos";

type Base = { tipo: "arbore" };

/** Hero: a foto vai até a borda da tela, montada em ripas que crescem de baixo para cima. */
export type ArboreRipas = Base & { secao: "ripas"; titulo: Destaque; texto: string; imagem: Imagem; formulario: Formulario };

/** Conceito: a foto abre do centro para os lados, como uma porta de correr. */
export type ArboreFresta = Base & {
  secao: "fresta";
  sobretitulo: string;
  titulo: Destaque;
  paragrafos: string[];
  imagem: Imagem;
  fatos: Item[];
  cta?: Link;
};

/** Manifesto: a foto aparece por uma persiana de madeira que abre com a rolagem. */
export type ArborePersiana = Base & { secao: "persiana"; titulo: Destaque; paragrafos: string[]; imagem: Imagem; credito?: string; cta?: Link };

/** Localização: um tronco cresce com a rolagem e abre um galho por destino, do mais perto ao mais longe. */
export type ArboreGalhos = Base & {
  secao: "galhos";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  endereco: string;
  /** Linha do empreendimento na raiz do tronco. */
  partida: string;
  pontos: Item[];
};

/** Perspectivas em mosaico: a foto pequena clicada troca de lugar com a grande. */
export type ArboreMosaico = Base & { secao: "mosaico"; sobretitulo: string; titulo: Destaque; itens: ItemPerspectiva[] };

/** Implantação com a legenda ao lado, na mesma altura da planta. */
export type ArboreLado = Base & { secao: "lado"; sobretitulo: string; titulo: Destaque; planta: Imagem; legenda: Item[]; cta?: Link };

/** Diferenciais em gavetas: uma por grupo, com a foto ao lado dos itens. */
export type ArboreGavetas = Base & {
  secao: "gavetas";
  sobretitulo: string;
  titulo: Destaque;
  grupos: { titulo: string; imagem: Imagem; itens: Item[] }[];
  /** Gaveta aberta ao carregar. */
  aberta: number;
  cta?: Link;
};

/** Corte da rua anotado como desenho de arquiteto: cada camada com a legenda na altura dela. */
export type ArboreAnotado = Base & { secao: "anotado"; sobretitulo: string; titulo: Destaque; imagem: Imagem; itens: Item[] };

/** Grupo SFA com os lotes de cada empreendimento em barras na mesma escala. */
export type ArboreBarras = Base & { secao: "barras" };

/** Contato: as ripas do hero, do lado esquerdo. */
export type ArboreContato = Base & { secao: "contato"; titulo: Destaque; imagem: Imagem; formulario: Formulario };

export type SecaoArbore =
  | ArboreRipas
  | ArboreFresta
  | ArborePersiana
  | ArboreGalhos
  | ArboreMosaico
  | ArboreLado
  | ArboreGavetas
  | ArboreAnotado
  | ArboreBarras
  | ArboreContato;
