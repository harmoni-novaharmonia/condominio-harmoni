// Textos e imagens da vitrine que não pertencem a um empreendimento específico.
import { iconesPilares } from "./icones";
import type { Arquivo, Imagem } from "./empreendimentos";

const P = "/img/vinhedos/perspectivas";
const render = (arquivo: string, alt: string, largura = 1536, altura = 864): Imagem => ({
  src: `${P}/${arquivo}`,
  largura,
  altura,
  alt,
});

/** Título com trecho em negrito. */
export type Titulo = { inicio: string; destaque: string };

export const marcas: Record<"harmoniClaro" | "harmoniEscuro" | "tracado", Arquivo> = {
  harmoniClaro: { src: "/harmoni-logos-gerais/harmoni-logo-creme.svg", largura: 1799, altura: 340 },
  harmoniEscuro: { src: "/harmoni-logos-gerais/harmoni-logo-petroleo.svg", largura: 1799, altura: 340 },
  tracado: { src: "/img/nova-harmonia/tracado-solido.svg", largura: 1350, altura: 783 },
};

export const cabecalho = {
  rotuloMarca: "Condomínio Harmoni, voltar ao início",
  altMarca: "Harmoni",
  empreendimentos: "Empreendimentos",
  links: [
    { rotulo: "Lazer", alvo: "hm-lazer" },
    { rotulo: "Onde estamos", alvo: "hm-local" },
  ],
  cta: { rotulo: "Falar com consultor", alvo: "hm-contato" },
  menu: {
    rotulo: "Todos os Harmonis",
    semCidade: "Conhecer",
    rodape: "Cada Harmoni tem a sua página.",
    verTodos: "Ver todos os Harmonis",
  },
  abrir: "Abrir menu",
  fechar: "Fechar menu",
};

export const hero = {
  rotuloCarrossel: "Empreendimentos em destaque",
  indice: "Escolher empreendimento",
  rolar: "Role para conhecer",
  conhecer: "Conhecer o",
};

export const faixa = { rotulo: "Empreendimentos Harmoni" };

export const manifesto = {
  titulo: { inicio: "Uma linha de condomínios ", destaque: "pensada para morar bem." } satisfies Titulo,
  texto:
    "Cada Harmoni nasce com a mesma assinatura: um refúgio para quem valoriza bem-estar, conforto e natureza integrada a espaços planejados. Muda a cidade, fica o cuidado.",
  imagens: [
    render("gourmet-14.webp", "Espaço gourmet", 1920, 1079),
    render("piscina-infantil.webp", "Piscina e jardim", 1536, 863),
    render("portico.webp", "Pórtico de entrada"),
  ],
  pilares: [
    {
      titulo: "Aconchego",
      frase: "Casa cheia, do jeito que vocês gostam.",
      descricao: "Casa, família e tranquilidade no centro do projeto.",
      icone: iconesPilares[0],
    },
    {
      titulo: "Natureza integrada",
      frase: "O verde começa na porta de casa.",
      descricao: "Espaços planejados que convivem com o verde.",
      icone: iconesPilares[1],
    },
    {
      titulo: "Assinatura Nova Harmonia",
      frase: "Muda a cidade, fica o cuidado.",
      descricao: "O mesmo padrão de qualidade em toda a linha.",
      icone: iconesPilares[2],
    },
  ],
};

export const lista = {
  titulo: { inicio: "Escolha o seu ", destaque: "Harmoni" } satisfies Titulo,
  subtitulo: "Clique em um empreendimento para ver a ficha completa.",
  verFicha: "Ver ficha",
  proximo: "O próximo Harmoni já está a caminho.",
  proximoCta: "Quero ser avisado",
};

export const lazer = {
  titulo: { inicio: "Lazer a poucos ", destaque: "passos de casa" } satisfies Titulo,
  subtitulo:
    "Espaços para receber, brincar, treinar e resolver o dia a dia sem sair do condomínio.",
  nota: "Itens de lazer variam por empreendimento.",
  rotuloAbas: "Áreas de lazer",
  anterior: "Área anterior",
  proxima: "Próxima área",
  // Renders do Vinhedos, provisórios para toda a linha (ver docs/IMAGENS.md).
  areas: [
    { nome: "Espaço gourmet", imagem: render("gourmet-14.webp", "Espaço gourmet", 1920, 1079) },
    { nome: "Piscina infantil", imagem: render("piscina-infantil.webp", "Piscina infantil", 1536, 863) },
    { nome: "Salão de festas", imagem: render("salao-de-festas.webp", "Salão de festas") },
    { nome: "Academia", imagem: render("academia.webp", "Academia", 1536, 863) },
    { nome: "Brinquedoteca", imagem: render("brinquedoteca.webp", "Brinquedoteca", 1536, 863) },
    { nome: "Minimercado", imagem: render("minimercado.webp", "Minimercado") },
    { nome: "Lava-jato", imagem: render("lava-jato.webp", "Lava-jato") },
  ],
};

export const localizacao = {
  titulo: { inicio: "Onde ", destaque: "estamos" } satisfies Titulo,
  subtitulo: "Escolha a cidade e veja o Harmoni mais perto de você.",
  mapa: {
    src: "/img/vinhedos/localizacao/mapa.webp",
    largura: 1536,
    altura: 871,
    alt: "Mapa de localização",
  } satisfies Imagem,
};

export const novaHarmonia = {
  titulo: { inicio: "Uma linha da ", destaque: "Nova Harmonia" } satisfies Titulo,
  texto:
    "Urbanizamos com harmonia: bairros planejados e condomínios fechados em diferentes estados do país.",
  cta: { rotulo: "Conhecer a Nova Harmonia", href: "https://novaharmonia.com.br/" },
};

export const contato = {
  titulo: { inicio: "Qual Harmoni ", destaque: "combina com você?" } satisfies Titulo,
  subtitulo:
    "Deixe seu contato e escolha o empreendimento. Um consultor da região responde pelo WhatsApp.",
  telefone: "[TELEFONE OFICIAL]",
  whatsapp: "[WHATSAPP]",
  email: "[E-MAIL]",
  stand: "[ENDEREÇO DO STAND]",
  rotuloTelefone: "Telefone: ",
  rotuloWhatsapp: "WhatsApp: ",
  selectVazio: "Ainda não sei, quero conhecer a linha",
  aceite: "Aceito receber comunicações da Nova Harmonia e concordo com a Política de Privacidade.",
  enviar: "Quero receber informações",
  erro: "Preencha nome, e-mail, WhatsApp e marque o aceite para continuar.",
  sucesso: "Recebemos seu contato. Um consultor fala com você em breve.",
  campos: {
    nome: { rotulo: "Nome", placeholder: "Seu nome completo" },
    email: { rotulo: "E-mail", placeholder: "voce@email.com" },
    whatsapp: { rotulo: "WhatsApp", placeholder: "(00) 00000-0000" },
    empreendimento: { rotulo: "Empreendimento de interesse" },
  },
};

export type Rede = { nome: string; href: string; icone: "facebook" | "instagram" | "linkedin" | "whatsapp" };

export const rodape = {
  titulo: "Qual Harmoni combina com você?",
  apoio: "Um consultor da região responde pelo WhatsApp.",
  cta: { rotulo: "Falar com consultor", alvo: "hm-contato" },
  colunas: {
    empreendimentos: "Empreendimentos",
    explore: "Explore",
    redes: "Siga-nos",
  },
  explore: [
    { rotulo: "Lazer", alvo: "hm-lazer" },
    { rotulo: "Onde estamos", alvo: "hm-local" },
    { rotulo: "Falar com consultor", alvo: "hm-contato" },
  ],
  // URLs das redes pendentes: ver docs/PENDENCIAS.md.
  redes: [
    { nome: "Facebook", href: "#", icone: "facebook" },
    { nome: "Instagram", href: "#", icone: "instagram" },
    { nome: "LinkedIn", href: "#", icone: "linkedin" },
    { nome: "WhatsApp", href: "#", icone: "whatsapp" },
  ] satisfies Rede[],
  topo: { rotulo: "Voltar ao topo", alvo: "hm-inicio" },
  legal: "Imagens meramente ilustrativas. © Nova Harmonia Bairros Planejados.",
  links: [
    { rotulo: "Política de Privacidade", href: "#", externo: false },
    { rotulo: "Site institucional", href: "https://novaharmonia.com.br/", externo: true },
  ],
};

export const ficha = {
  fechar: "Fechar ficha",
  rotulos: { localizacao: "Localização", lotes: "Lotes", metragem: "Metragem", aPartirDe: "A partir de" },
  pendentes: { lotes: "[Nº]", metragem: "[M²]", preco: "[PREÇO]" },
  cta: "Quero saber mais",
  site: "Site do empreendimento",
};

export const metadados = {
  titulo: "Condomínio Harmoni | Uma linha Nova Harmonia",
};
