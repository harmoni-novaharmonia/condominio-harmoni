// Renders e plantas do Harmoni Vinhedos. São as únicas imagens de projeto que
// existem hoje; os outros Harmonis usam como provisórias (marcadas com o selo)
// até receberem as próprias. Ver docs/IMAGENS.md.
import type { Imagem } from "./tipos";

const P = "/img/vinhedos/perspectivas";

const r = (arquivo: string, largura: number, altura: number, alt: string) => ({
  src: `${P}/${arquivo}`,
  largura,
  altura,
  alt,
});

const base = {
  portico: r("portico-original.webp", 1919, 1080, "Pórtico de entrada do condomínio"),
  porticoMenor: r("portico.webp", 1536, 864, "Pórtico de entrada do condomínio"),
  piscina: r("piscina-infantil.webp", 1536, 863, "Piscina infantil com deck e jardim"),
  salaoExterno: r("salao-de-festas-externo.webp", 1536, 864, "Fachada do salão de festas"),
  salao: r("salao-de-festas.webp", 1536, 864, "Salão de festas"),
  gourmet: r("gourmet-14.webp", 1920, 1079, "Espaço gourmet com piscina"),
  gourmet2: r("gourmet-13.webp", 1920, 1079, "Espaço gourmet"),
  brinquedoteca: r("brinquedoteca.webp", 1536, 863, "Brinquedoteca"),
  minimercado: r("minimercado.webp", 1536, 864, "Minimercado do condomínio"),
  academia: r("academia.webp", 1536, 863, "Academia"),
  lavaJato: r("lava-jato.webp", 1536, 864, "Espaço car care, área externa"),
  lavaJatoInterno: r("lava-jato-interno.webp", 1536, 864, "Espaço car care"),
  masterplan: {
    src: "/img/vinhedos/implantacao/masterplan.webp",
    largura: 1536,
    altura: 837,
    alt: "Implantação do condomínio com lotes e áreas de lazer",
  },
  mapa: {
    src: "/img/vinhedos/localizacao/mapa.webp",
    largura: 1536,
    altura: 871,
    alt: "Mapa da região do Harmoni Vinhedos em Viamão",
  },
} satisfies Record<string, Imagem>;

export type ChaveRender = keyof typeof base;

/** Render do próprio Vinhedos. */
export const render = (chave: ChaveRender): Imagem => base[chave];

/** Render do Vinhedos usado em outro Harmoni: leva o selo de provisória. */
export const provisoria = (chave: ChaveRender, alt?: string): Imagem => ({
  ...base[chave],
  alt: alt ?? base[chave].alt,
  provisoria: true,
});

const V = "/img/compartilhado/estilo-de-vida";

// Fotos de banco enviadas no material do Jardins.
export const estiloDeVida = {
  meninaCachorro: { src: `${V}/menina-e-cachorro.webp`, largura: 1620, altura: 1080, alt: "Menina abraçando o cachorro no parque" },
  familiaJardim: { src: `${V}/familia-no-jardim.webp`, largura: 843, altura: 1080, alt: "Pai carregando a filha nas costas no jardim" },
  familiaArLivre: { src: `${V}/familia-ao-ar-livre.webp`, largura: 748, altura: 1080, alt: "Família jovem ao ar livre" },
  // Hortênsias (2026-10-07); as duas também aparecem na vitrine.
  familiaBrincando: { src: `${V}/familia-jardim.webp`, largura: 1100, altura: 1408, alt: "Pais carregando os filhos nas costas no gramado" },
  familiaPanorama: { src: `${V}/familia-panorama.webp`, largura: 1423, altura: 536, alt: "Família caminhando de mãos dadas ao pôr do sol" },
} satisfies Record<string, Imagem>;

// Fotos da Nova Harmonia usadas nas LPs revisadas de Jardins e Arbore (2026-10-06).
export const fotosNovaHarmonia = {
  /** Família real num lote de bairro Nova Harmonia, com a casa em obra ao fundo. Não é do Arbore. */
  familiaLote: { src: "/img/nova-harmonia/institucional/familia.webp", largura: 1440, altura: 600, alt: "Família em frente à casa em construção no seu lote" },
  /** Versão vertical da foto do conceito da LP no ar do Vinhedos: linho, a casa desenhada e a família. */
  familiaLinho: { src: "/img/vinhedos/conceito/familia-celular.webp", largura: 632, altura: 1080, alt: "Mãe rindo abraçada aos dois filhos no gramado" },
  // Hortênsias (2026-10-07, revisão): fotos reais de obra e institucionais tiradas de novaharmonia.com.br.
  obra: { src: "/img/nova-harmonia/obras/parque-harmonia-viamao.webp", largura: 806, altura: 1080, alt: "Máquina abrindo rua em obra da Nova Harmonia" },
  /** Empreendimento a confirmar (docs/IMAGENS.md). */
  ciclovia: { src: "/img/nova-harmonia/obras/ciclovia.webp", largura: 810, altura: 1080, alt: "Avenida pavimentada com ciclovia" },
  stand: { src: "/img/nova-harmonia/obras/stand.webp", largura: 1200, altura: 800, alt: "Stand de vendas Nova Harmonia" },
  porDoSol: { src: "/img/nova-harmonia/obra/familia-por-do-sol.webp", largura: 1060, altura: 1080, alt: "Família de mãos dadas ao pôr do sol" },
} satisfies Record<string, Imagem>;
