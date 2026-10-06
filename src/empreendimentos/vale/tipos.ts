// Seções exclusivas do Harmoni Vale (revisão aprovada em 2026-10-05).
// Noite e dourado; dois motivos tirados do assunto: a janela em forma de casa
// (o desenho do logo) e curvas de nível (é um vale).
import type { Destaque, Formulario, Imagem, Item, ItemPerspectiva, Link } from "../tipos";

type Base = { tipo: "vale" };

/** Hero: título e cadastro em linha à esquerda; janela em forma de casa com ambientes se alternando. */
export type ValeCasa = Base & {
  secao: "casa";
  titulo: Destaque;
  texto: string;
  imagens: { nome: string; imagem: Imagem }[];
  formulario: Formulario;
};

/** Conceito: frase grande com duas fotos dentro da linha. */
export type ValeDeclaracao = Base & {
  secao: "declaracao";
  sobretitulo: string;
  titulo: Destaque;
  paragrafos: string[];
  /** A 1ª entra depois do "antes" do título; a 2ª no meio do destaque. */
  pilulas: [Imagem, Imagem];
  cta?: Link;
};

/** Localização: mapa noturno com curvas de nível; cada ponto liga ao empreendimento. */
export type ValeConstelacao = Base & {
  secao: "constelacao";
  sobretitulo: string;
  titulo: Destaque;
  texto?: string;
  endereco: string;
  /** Posição do empreendimento no mapa (% da largura e da altura). */
  casa: { x: number; y: number };
  pontos: (Item & { x: number; y: number; grupo: string })[];
};

/** Perspectivas em galeria de arrastar, com a foto deslizando dentro da moldura. */
export type ValeArraste = Base & { secao: "arraste"; sobretitulo: string; titulo: Destaque; itens: ItemPerspectiva[] };

/** Implantação: legenda no cabeçalho e planta em largura total. */
export type ValeMoldura = Base & { secao: "moldura"; sobretitulo: string; titulo: Destaque; planta: Imagem; legenda: Item[]; cta?: Link };

/** Diferenciais em lista numerada; no desktop a foto do item segue o mouse. */
export type ValeRevela = Base & {
  secao: "revela";
  sobretitulo: string;
  titulo: Destaque;
  itens: (Item & { categoria: string; foto: Imagem })[];
  cta?: Link;
};

/** Corte da rua grande, com a lista num cartão sobre o céu. */
export type ValeCorte = Base & { secao: "corte"; sobretitulo: string; titulo: Destaque; imagem: Imagem; itens: Item[] };

/** Grupo SFA e missão da Nova Harmonia numa seção só, com o mapa do Brasil. */
export type ValeBrasil = Base & { secao: "brasil" };

/** Contato com a mesma janela em forma de casa do hero. */
export type ValeContato = Base & { secao: "contato"; titulo: Destaque; imagem: Imagem; formulario: Formulario };

export type SecaoVale =
  | ValeCasa
  | ValeDeclaracao
  | ValeConstelacao
  | ValeArraste
  | ValeMoldura
  | ValeRevela
  | ValeCorte
  | ValeBrasil
  | ValeContato;
