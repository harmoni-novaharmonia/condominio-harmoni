// Fonte única dos Harmonis da vitrine. Hero, faixa, lista, ficha, localização,
// formulário e rodapé leem daqui. Texto entre colchetes é pendência do cliente
// (ver docs/PENDENCIAS.md).

export type Imagem = { src: string; largura: number; altura: number; alt: string };
export type Arquivo = { src: string; largura: number; altura: number };

export type Harmoni = {
  slug: string;
  nome: string;
  /** Nome sem o prefixo "Harmoni", usado nos botões ("Conhecer o Jardins"). */
  curto: string;
  cidade: string;
  status: string;
  /** Texto curto da ficha. */
  texto: string;
  /** Selo destacado na lista (só o lançamento). */
  lancamento?: boolean;
  /** Logo colorido (fundo claro). Ausente enquanto o SVG não existir. */
  logo?: Arquivo;
  /** Logo preto, tingido de branco por CSS no hero. */
  logoHero?: Arquivo;
  /** Logo laranja e creme, para fundo escuro (card do menu). */
  logoDestaque?: Arquivo;
  /** Trecho final da chamada que vai em peso maior no card do menu. */
  chamadaNegrito?: string;
  /** Foto provisória (render do Vinhedos), ver docs/IMAGENS.md. */
  foto: Imagem;
  /** Frase do slide do hero. */
  chamada: string;
  /** Botão secundário do hero. */
  chamadaSecundaria: string;
  /** Rótulo no <select> do formulário. */
  rotuloSelect: string;
  site: string;
};

const P = "/img/vinhedos/perspectivas";
const render = (arquivo: string, alt: string, altura = 864): Imagem => ({
  src: `${P}/${arquivo}`,
  largura: 1536,
  altura,
  alt,
});
const logo = (slug: string, n: "01" | "03"): Arquivo => ({
  src: `/img/${slug}/logo/logo-${n}.svg`,
  largura: 850,
  altura: 850,
});

export const harmonis: Harmoni[] = [
  {
    slug: "jardins",
    nome: "Harmoni Jardins",
    curto: "Jardins",
    cidade: "Cachoeirinha, RS",
    status: "Lançamento em breve",
    texto: "Beleza, equilíbrio e exclusividade. Natureza integrada a espaços planejados.",
    lancamento: true,
    logo: logo("jardins", "03"),
    logoHero: logo("jardins", "01"),
    logoDestaque: { src: "/img/jardins/logo/logo-02.svg", largura: 850, altura: 850 },
    foto: render("portico.webp", "Harmoni Jardins"),
    chamada: "Natureza integrada ao seu dia a dia.",
    chamadaNegrito: "ao seu dia a dia.",
    chamadaSecundaria: "Quero ser avisado",
    rotuloSelect: "Harmoni Jardins, Cachoeirinha",
    site: "/jardins/",
  },
  {
    slug: "arbore",
    nome: "Harmoni Árbore",
    curto: "Árbore",
    cidade: "Cachoeirinha, RS",
    status: "[STATUS]",
    texto: "[DESCRIÇÃO CURTA DO HARMONI ÁRBORE]",
    logo: logo("arbore", "03"),
    logoHero: logo("arbore", "01"),
    foto: render("piscina-infantil.webp", "Harmoni Árbore", 863),
    chamada: "Sombra, verde e tempo para a família.",
    chamadaSecundaria: "Falar com consultor",
    rotuloSelect: "Harmoni Árbore, Cachoeirinha",
    site: "/arbore/",
  },
  {
    slug: "vale",
    nome: "Harmoni Vale",
    curto: "Vale",
    cidade: "Gravataí, RS",
    status: "[STATUS]",
    texto: "[DESCRIÇÃO CURTA DO HARMONI VALE]",
    logo: logo("vale", "03"),
    logoHero: logo("vale", "01"),
    foto: render("salao-de-festas-externo.webp", "Harmoni Vale"),
    chamada: "Espaço para viver com calma.",
    chamadaSecundaria: "Falar com consultor",
    rotuloSelect: "Harmoni Vale, Gravataí",
    site: "/vale/",
  },
  {
    slug: "essenza",
    nome: "Harmoni Essenza",
    curto: "Essenza",
    cidade: "[CIDADE, UF]",
    status: "[STATUS]",
    texto: "[DESCRIÇÃO CURTA DO HARMONI ESSENZA]",
    logo: logo("essenza", "03"),
    logoHero: logo("essenza", "01"),
    foto: { src: `${P}/gourmet-14.webp`, largura: 1920, altura: 1079, alt: "Harmoni Essenza" },
    chamada: "O essencial, feito com cuidado.",
    chamadaSecundaria: "Falar com consultor",
    rotuloSelect: "Harmoni Essenza",
    site: "/essenza/",
  },
  {
    slug: "hortensias",
    nome: "Harmoni Hortênsias",
    curto: "Hortênsias",
    cidade: "[CIDADE, UF]",
    status: "[STATUS]",
    texto: "[DESCRIÇÃO CURTA DO HARMONI HORTÊNSIAS]",
    // Sem SVG ainda: os componentes usam o nome em texto quando logo é undefined.
    foto: { src: `${P}/gourmet-13.webp`, largura: 1920, altura: 1079, alt: "Harmoni Hortênsias" },
    chamada: "Casa com jardim, vizinhança tranquila.",
    chamadaSecundaria: "Falar com consultor",
    rotuloSelect: "Harmoni Hortênsias",
    site: "#",
  },
];

export const porSlug = (slug: string) => harmonis.find((h) => h.slug === slug);
