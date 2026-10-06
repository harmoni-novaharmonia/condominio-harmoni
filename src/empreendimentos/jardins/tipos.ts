// Seções exclusivas do Harmoni Jardins (revisão aprovada em 2026-10-06).
// Sálvia, linho e verde-mata; dois motivos tirados do nome: a folha (dois cantos
// opostos arredondados) e a semente (o círculo).
import type { Destaque, Formulario, Imagem, Item, ItemPerspectiva, Link } from "../tipos";

type Base = { tipo: "jardins" };

/** Hero: texto e cadastro à esquerda; a foto nasce como semente e abre em folha, com um selo girando. */
export type JardinsFolha = Base & {
  secao: "folha";
  titulo: Destaque;
  texto: string;
  imagem: Imagem;
  /** Texto que corre em volta do selo. */
  selo: string;
  formulario: Formulario;
};

/** Conceito sobre o linho: texto, os argumentos da copy e a foto da família encostada no pé da seção. */
export type JardinsLinho = Base & {
  secao: "linho";
  sobretitulo: string;
  titulo: Destaque;
  paragrafos: string[];
  imagem: Imagem;
  fatos: Item[];
  cta?: Link;
};

/** Lugar no mapa ilustrado, em coordenadas do desenho (1000x560). */
export type PontoDesenho = Item & { x: number; y: number };

/** Localização: o mapa começa perto do condomínio e se afasta com a rolagem até Porto Alegre. */
export type JardinsAfasta = Base & {
  secao: "afasta";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  endereco: string;
  /** Posição do condomínio no desenho e a linha dele na lista. */
  casa: { x: number; y: number; texto: string };
  /** Do mais perto ao mais longe: acendem nessa ordem enquanto o mapa se afasta. */
  pontos: PontoDesenho[];
};

/** Perspectivas: palco em forma de folha e miniaturas redondas; a foto nova abre em círculo a partir da escolhida. */
export type JardinsSementes = Base & { secao: "sementes"; sobretitulo: string; titulo: Destaque; itens: ItemPerspectiva[] };

/** Implantação com lupa que segue o mouse (no toque, a planta abre em tela cheia). */
export type JardinsLupa = Base & { secao: "lupa"; sobretitulo: string; titulo: Destaque; planta: Imagem; legenda: Item[]; cta?: Link };

/** Diferenciais em canteiros: o item com foto própria traz a semente redonda, que abre ao passar o mouse. */
export type JardinsCanteiros = Base & {
  secao: "canteiros";
  sobretitulo: string;
  titulo: Destaque;
  itens: (Item & { categoria: string; foto?: Imagem })[];
  /** O último canteiro: chamada e botão. */
  chamada: Destaque;
  cta: Link;
};

/** Corte da rua dividido no nível do chão: cada lista ao lado da sua metade da imagem. */
export type JardinsNiveis = Base & { secao: "niveis"; sobretitulo: string; titulo: Destaque; imagem: Imagem; itens: Item[] };

/** Grupo SFA: texto ao lado de duas colunas de fotos legendadas por setor, que deslizam na rolagem. */
export type JardinsColunas = Base & { secao: "colunas"; fotos: { setor: string; imagem: Imagem }[] };

/** Contato: a folha do hero, espelhada, com a família no jardim. */
export type JardinsContato = Base & { secao: "contato"; titulo: Destaque; imagem: Imagem; formulario: Formulario };

export type SecaoJardins =
  | JardinsFolha
  | JardinsLinho
  | JardinsAfasta
  | JardinsSementes
  | JardinsLupa
  | JardinsCanteiros
  | JardinsNiveis
  | JardinsColunas
  | JardinsContato;
