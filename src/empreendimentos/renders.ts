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
} satisfies Record<string, Imagem>;
