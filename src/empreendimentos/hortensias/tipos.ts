// Seções exclusivas do Harmoni Hortênsias (revisão de 2026-10-07).
// Cores da linha Harmoni (petróleo, creme e laranja). Motivo: o lote. A grade de
// lotes do hero vira foto, a planta da implantação é clicável e a localização é
// um mapa de rotas. Cada seção tem um gesto com imagem que também anda sozinho,
// para funcionar no celular.
import type { Destaque, Formulario, Imagem, ItemPerspectiva, Link } from "../tipos";

type Base = { tipo: "hortensias" };

/** Hero: grade de lotes em largura total; cada lote é um ambiente e, numa onda, todos somem e mostram a foto. */
export type HortensiasMosaico = Base & {
  secao: "mosaico";
  etiqueta: string;
  titulo: Destaque;
  texto: string;
  /** A foto que aparece quando os lotes somem. */
  imagem: Imagem;
  /** Um ambiente por lote, repetidos em sequência. */
  ambientes: Imagem[];
  dica: string;
  formulario: Formulario;
};

/** Argumentos em tiras verticais; a tira sob o mouse se abre com a foto e o texto. */
export type HortensiasTiras = Base & {
  secao: "tiras";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  itens: { titulo: string; texto: string; imagem: Imagem }[];
};

/** Perspectivas em coverflow sobre a própria foto desfocada. */
export type HortensiasCachos = Base & { secao: "cachos"; sobretitulo: string; titulo: Destaque; itens: ItemPerspectiva[] };

/** Cartões que viram sozinhos (e no hover): o argumento na frente, a foto no verso. */
export type HortensiasCartoes = Base & {
  secao: "cartoes";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  itens: { titulo: string; texto: string; imagem: Imagem }[];
  cta: Link;
};

/** Fotos reais de obra em preto e branco que ganham cor no hover (e na vez delas, no celular). */
export type HortensiasProvas = Base & {
  secao: "provas";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  fotos: { legenda: string; imagem: Imagem }[];
};

/** Lista grande de espaços; o item sob o mouse inunda a seção com a foto, a partir do cursor. */
export type HortensiasItens = Base & {
  secao: "itens";
  sobretitulo: string;
  titulo: Destaque;
  itens: { titulo: string; imagem: Imagem }[];
};

/** Planta ilustrativa clicável: o lote escolhido segue para o cadastro do contato. */
export type HortensiasLotes = Base & {
  secao: "lotes";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  /** Números dos lotes reservados (ilustrativo até haver a tabela de vendas). */
  reservados: number[];
  /** Rótulos das áreas da planta. */
  areas: { lazer: string; portaria: string };
  /** Área do lote (até haver a tabela, um texto só). */
  areaLote: string;
  nota: string;
};

/** Frase sobre foto em parallax; as palavras sobem quando a seção entra. */
export type HortensiasFrase = Base & { secao: "frase"; frase: Destaque; imagem: Imagem };

/** Destino do mapa de rotas. `trajeto` é um caminho SVG no desenho de 1000x620 (origem em 700,300). */
export type DestinoRota = { nome: string; curto: string; tempo: string; km: string; passos: string[]; ponto: [number, number]; trajeto: string };

/** Localização num mapa de rotas: painel de "como chegar" ao lado de um mapa desenhado. */
export type HortensiasRotas = Base & {
  secao: "rotas";
  sobretitulo: string;
  titulo: Destaque;
  texto: string;
  origem: string;
  busca: string;
  destinos: DestinoRota[];
  /** Nomes escritos no mapa. */
  rotulos: { rs118: string; freeway: string; rio: string; capital: string; centro: string };
  escala: string;
  aviso: string;
  maps: string;
};

/** Quem faz: o stand abre no hover, ao lado dos números da Nova Harmonia. */
export type HortensiasStand = Base & { secao: "stand"; sobretitulo: string; titulo: Destaque; texto: string; imagem: Imagem; cta: Link };

/** Perguntas frequentes. */
export type HortensiasDuvidas = Base & { secao: "duvidas"; sobretitulo: string; titulo: Destaque; perguntas: { pergunta: string; resposta: string }[] };

/** Contato: foto ao lado do cadastro, que já mostra o lote escolhido na planta. */
export type HortensiasContato = Base & { secao: "contato"; sobretitulo: string; titulo: Destaque; imagem: Imagem; formulario: Formulario };

export type SecaoHortensias =
  | HortensiasMosaico
  | HortensiasTiras
  | HortensiasCachos
  | HortensiasCartoes
  | HortensiasProvas
  | HortensiasItens
  | HortensiasLotes
  | HortensiasFrase
  | HortensiasRotas
  | HortensiasStand
  | HortensiasDuvidas
  | HortensiasContato;
