// Fonte única dos Harmonis da vitrine (hero, coleção, mapa, formulário, rodapé).
// Cidade e frase vêm das LPs (src/empreendimentos/<slug>/dados.ts); o que está
// entre colchetes é pendência do cliente (docs/PENDENCIAS.md).

export type Arquivo = { src: string; largura: number; altura: number };
export type Imagem = Arquivo & {
  alt: string;
  /** Render de outro empreendimento no lugar: aparece o selo "Imagem provisória". */
  provisoria?: boolean;
};

/** Como a edição ocupa a grade de 12 colunas da coleção. */
export type Forma = "cheia" | "esquerda" | "direita" | "meio" | "alto";

export type Harmoni = {
  slug: string;
  nome: string;
  /** Nome sem o prefixo "Harmoni" ("Conhecer o Jardins"). */
  curto: string;
  cidade: string;
  uf: string;
  status: string;
  /** Metragem mínima do lote ("160m²") ou pendência. */
  lote: string;
  /** Frase da coleção e da faixa do hero. */
  frase: string;
  /** Observação de localização (só quando o cliente deu). */
  nota?: string;
  logo: {
    /** Fundo claro. */
    claro: Arquivo;
    /** Fundo escuro. */
    escuro: Arquivo;
    /** Wordmark horizontal (logo geral Harmoni), mais baixo que os logos quadrados. */
    horizontal?: boolean;
  };
  foto: Imagem;
  /** Três ambientes abaixo da edição principal. */
  miniaturas?: Imagem[];
  forma: Forma;
};

const P = "/img/vinhedos/perspectivas";
const render = (arquivo: string, alt: string, largura = 1536, altura = 864, provisoria = false): Imagem => ({
  src: `${P}/${arquivo}`,
  largura,
  altura,
  alt,
  provisoria,
});
const logos = (slug: string): Harmoni["logo"] => ({
  claro: { src: `/img/${slug}/logo/logo-03-recorte.svg`, largura: 730, altura: 486 },
  escuro: { src: `/img/${slug}/logo/logo-02-recorte.svg`, largura: 730, altura: 486 },
});

export const harmonis: Harmoni[] = [
  {
    slug: "vinhedos",
    nome: "Harmoni Vinhedos",
    curto: "Vinhedos",
    cidade: "Viamão",
    uf: "RS",
    // Título da LP no ar: "Lançamento Nova Harmonia".
    status: "Lançamento",
    lote: "160m²",
    frase: "Pensado para quem quer mais espaço, mais liberdade e a harmonia entre privacidade e convivência.",
    nota: "Vizinho dos condomínios Cantegril e Buena Vista e ao lado do bairro planejado Parque Harmonia.",
    logo: {
      claro: { src: "/harmoni-logos-gerais/harmoni-logo-petroleo.svg", largura: 1799, altura: 340 },
      escuro: { src: "/harmoni-logos-gerais/harmoni-logo-creme.svg", largura: 1799, altura: 340 },
      horizontal: true,
    },
    foto: render("portico-original.webp", "Pórtico de entrada do Harmoni Vinhedos", 1919, 1080),
    miniaturas: [
      render("gourmet-14.webp", "Espaço gourmet do Harmoni Vinhedos", 1920, 1079),
      render("piscina-infantil.webp", "Piscina infantil do Harmoni Vinhedos", 1536, 863),
      render("salao-de-festas-externo.webp", "Área externa do salão de festas do Harmoni Vinhedos"),
    ],
    forma: "cheia",
  },
  {
    slug: "jardins",
    nome: "Harmoni Jardins",
    curto: "Jardins",
    cidade: "Cachoeirinha",
    uf: "RS",
    status: "Lançamento em breve",
    lote: "[PREENCHER]",
    frase: "Um novo patamar de viver bem em Cachoeirinha.",
    logo: logos("jardins"),
    foto: render("gourmet-14.webp", "Harmoni Jardins, Cachoeirinha/RS", 1920, 1079, true),
    forma: "esquerda",
  },
  {
    slug: "arbore",
    nome: "Harmoni Árbore",
    curto: "Árbore",
    cidade: "Cachoeirinha",
    uf: "RS",
    status: "[STATUS]",
    lote: "[PREENCHER]",
    frase: "Viva com grande estilo em Cachoeirinha.",
    logo: logos("arbore"),
    foto: render("piscina-infantil.webp", "Harmoni Árbore, Cachoeirinha/RS", 1536, 863, true),
    forma: "direita",
  },
  {
    slug: "vale",
    nome: "Harmoni Vale",
    curto: "Vale",
    cidade: "Gravataí",
    uf: "RS",
    status: "[STATUS]",
    lote: "[PREENCHER]",
    frase: "Viver em Gravataí acaba de ficar muito melhor.",
    logo: logos("vale"),
    foto: render("salao-de-festas-externo.webp", "Harmoni Vale, Gravataí/RS", 1536, 864, true),
    forma: "meio",
  },
  {
    slug: "essenza",
    nome: "Harmoni Essenza",
    curto: "Essenza",
    cidade: "Cachoeirinha",
    uf: "RS",
    status: "[STATUS]",
    lote: "[PREENCHER]",
    // A LP repete o título do Jardins; aqui fica a frase curta da vitrine original.
    frase: "O essencial, feito com cuidado.",
    logo: logos("essenza"),
    foto: render("gourmet-13.webp", "Harmoni Essenza, Cachoeirinha/RS", 1920, 1079, true),
    forma: "alto",
  },
];

/** Cidades na ordem do mapa e do filtro. */
export const cidades = Array.from(new Set(harmonis.map((h) => h.cidade)));

export const porCidade = (cidade: string) => harmonis.filter((h) => h.cidade === cidade);

export const pendente = (texto: string) => texto.startsWith("[");
