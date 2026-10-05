// Seções exclusivas do Harmoni Essenza (revisão aprovada em 2026-10-05).
// Gesto da LP: painel branco sobre foto (hero e contato) e um movimento por seção.
import type { Destaque, Formulario, GrupoDiferenciais, Imagem, Item, ItemPerspectiva, Link } from "../tipos";

type Base = { tipo: "essenza" };

/** Conceito em duas metades: foto até a borda e texto com os essenciais da copy. */
export type EssenzaMetade = Base & {
  secao: "metade";
  sobretitulo: string;
  titulo: Destaque;
  paragrafos: string[];
  imagem: Imagem;
  essenciais: Item[];
  cta?: Link;
};

/** Localização: trajeto desenhado pela rolagem que acende as paradas (5, na ordem do caminho). */
export type EssenzaTrajeto = Base & {
  secao: "trajeto";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  endereco: string;
  pontos: Item[];
};

/** Perspectivas em sanfona: faixas finas e a escolhida aberta. */
export type EssenzaSanfona = Base & { secao: "sanfona"; sobretitulo: string; titulo: Destaque; itens: ItemPerspectiva[] };

/** Chamada: a foto começa como cartão e abre até a tela cheia com a rolagem. */
export type EssenzaAbertura = Base & { secao: "abertura"; titulo: Destaque; texto?: string; cta: Link; imagem: Imagem };

/** Implantação em largura total, legenda em linha abaixo da planta. */
export type EssenzaAmpla = Base & { secao: "ampla"; sobretitulo: string; titulo: Destaque; planta: Imagem; legenda: Item[]; cta?: Link };

/** Diferenciais por grupo, com foto fixa que acompanha a leitura. */
export type EssenzaRoteiro = Base & { secao: "roteiro"; sobretitulo: string; titulo: Destaque; grupos: GrupoDiferenciais[]; cta?: Link };

/** Corte da rua com a lista ao lado, na mesma altura da imagem. */
export type EssenzaCorte = Base & { secao: "corte"; sobretitulo: string; titulo: Destaque; imagem: Imagem; itens: Item[] };

/** Grupo SFA: texto em duas colunas, números e faixa de fotos legendadas por setor. */
export type EssenzaSetores = Base & { secao: "setores"; cartoes: { setor: string; imagem?: Imagem }[] };

/** Contato: foto e painel branco pela direita (o gesto do hero espelhado). */
export type EssenzaContato = Base & { secao: "contato"; titulo: Destaque; imagem: Imagem; formulario: Formulario };

export type SecaoEssenza =
  | EssenzaMetade
  | EssenzaTrajeto
  | EssenzaSanfona
  | EssenzaAbertura
  | EssenzaAmpla
  | EssenzaRoteiro
  | EssenzaCorte
  | EssenzaSetores
  | EssenzaContato;
