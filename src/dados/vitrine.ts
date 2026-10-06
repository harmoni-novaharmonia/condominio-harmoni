// Textos, imagens e números da vitrine (/). Nada aqui é de um Harmoni específico:
// esses ficam em ./empreendimentos.ts. Origem de cada texto ao lado: "cliente"
// (verbatim do site da Nova Harmonia, das LPs ou da vitrine original) ou
// "proposta" (escrito para esta versão, aguardando aprovação).
import { corteInfraestrutura, grupo, marcasGrupo, redes, textosFormulario } from "@/empreendimentos/comum";
import { vinhedos } from "@/empreendimentos/vinhedos/dados";
import { harmonis, cidades, type Arquivo, type Imagem } from "./empreendimentos";

/** Título com trecho em peso maior. */
export type Titulo = { inicio: string; destaque: string };

const img = (src: string, largura: number, altura: number, alt: string): Imagem => ({ src, largura, altura, alt });

export const marcas: Record<"claro" | "escuro", Arquivo> = {
  escuro: { src: "/harmoni-logos-gerais/harmoni-logo-creme.svg", largura: 1799, altura: 340 },
  claro: { src: "/harmoni-logos-gerais/harmoni-logo-petroleo.svg", largura: 1799, altura: 340 },
};

/** Âncoras das seções (também usadas no menu e no rodapé). */
export const ancoras = {
  inicio: "inicio",
  empreendimentos: "empreendimentos",
  onde: "onde-estamos",
  quem: "quem-constroi",
  perguntas: "perguntas",
  contato: "contato",
} as const;

export const cabecalho = {
  rotuloMarca: "Condomínios Harmoni, voltar ao início",
  links: [
    { rotulo: "Empreendimentos", alvo: ancoras.empreendimentos },
    { rotulo: "Onde estamos", alvo: ancoras.onde },
    { rotulo: "Quem constrói", alvo: ancoras.quem },
    { rotulo: "Perguntas", alvo: ancoras.perguntas },
  ],
  linkContato: { rotulo: "Contato", alvo: ancoras.contato },
  cta: { rotulo: "Falar com consultor", alvo: ancoras.contato },
  abrir: "Abrir menu",
  fechar: "Fechar menu",
  rotuloLogos: "Páginas dos Harmonis",
};

export const hero = {
  // cliente (vitrine original), com "horizontais" acrescentado por SEO: confirmar.
  titulo: { inicio: "Uma linha de condomínios horizontais ", destaque: "pensada para morar bem." } satisfies Titulo,
  // proposta
  linha: `${harmonis.length} condomínios · ${cidades.join(" · ")}`,
  conhecer: "Conhecer",
};

export const fatos = {
  rotulo: "A linha em números",
  // proposta (legendas); números: contagem dos dados e "5 regiões" do site da Nova Harmonia.
  itens: [
    { numero: harmonis.length, texto: "condomínios horizontais na linha Harmoni" },
    { numero: cidades.length, texto: "cidades da Grande Porto Alegre" },
    { numero: 5, texto: "regiões do país com a Nova Harmonia presente" },
    { numero: grupo.setores.length, texto: "setores de atuação do Grupo SFA" },
  ],
};

export const manifesto = {
  rotulo: "A linha Harmoni",
  // cliente (vitrine original)
  texto:
    "Cada Harmoni nasce com a mesma assinatura: um refúgio para quem valoriza bem-estar, conforto e natureza integrada a espaços planejados. Muda a cidade, fica o cuidado.",
  assinatura: "Nova Harmonia Bairros Planejados",
  panorama: img(
    "/img/compartilhado/estilo-de-vida/familia-panorama.webp",
    1423,
    536,
    "Família caminhando de mãos dadas ao pôr do sol",
  ),
  // cliente (LPs, seção do grupo)
  citacao: "Um projeto de futuro para as cidades. Um projeto de vida para as pessoas.",
  creditoPanorama: "Foto de banco de imagens",
};

export const colecao = {
  rotulo: "A coleção",
  // proposta
  titulo: { inicio: "Condomínios em ", destaque: "Viamão, Cachoeirinha e Gravataí" } satisfies Titulo,
  texto: "Cada Harmoni tem nome, marca e paisagismo próprios. Todos com a mesma assinatura de projeto e de obra.",
  filtro: { rotulo: "Filtrar por cidade", todas: "Todas" },
  tipo: "condomínio horizontal",
  rotulos: { situacao: "Situação", lotes: "Lotes", aPartirDe: "a partir de" },
  conhecer: "Conhecer o",
  consultor: "Falar com consultor",
  imagemProvisoria: "Imagem provisória",
  proximo: {
    rotulo: "Em breve",
    nome: "Harmoni Hortênsias",
    texto: "Cidade",
    cidade: "[PREENCHER]",
    apoio: "Cadastre-se para saber primeiro.",
    cta: "Quero ser avisado",
  },
};

/** Centro aproximado de cada cidade (latitude, longitude), usado no mapa esquemático. */
export const coordenadas: Record<string, [number, number]> = {
  "Porto Alegre": [-30.03, -51.228],
  Canoas: [-29.9178, -51.183],
  Cachoeirinha: [-29.9511, -51.0939],
  Gravataí: [-29.944, -50.993],
  Viamão: [-30.081, -51.023],
};

export const onde = {
  rotulo: "Onde estamos",
  // proposta
  titulo: { inicio: "A poucos quilômetros ", destaque: "de Porto Alegre" } satisfies Titulo,
  referencia: "Porto Alegre",
  vizinha: "Canoas",
  agua: "Lago Guaíba",
  aneis: [10, 20, 30, 40],
  aprox: "≈",
  km: "km",
  obs: "Distância em linha reta entre os centros das cidades. O endereço de cada Harmoni está na página dele.",
  legendaMapa: "Esquema · anéis a partir do centro de Porto Alegre, em linha reta",
  rotuloMapa: "Mapa esquemático com Porto Alegre e as cidades dos Harmonis",
  norte: "N",
};

const obra = vinhedos.secoes.find((s) => s.tipo === "obra");

export const infraestrutura = {
  rotulo: "Infraestrutura",
  // cliente (site da Nova Harmonia)
  titulo: { inicio: "Infraestrutura de alto padrão para construir a vida ", destaque: "que você sempre sonhou." } satisfies Titulo,
  texto:
    "A Nova Harmonia entrega excelência em cada etapa do desenvolvimento urbano: desde o pavimento, até o rigor técnico na preparação de cada via e iluminação.",
  // cliente (LP do Vinhedos)
  itens: obra?.tipo === "obra" ? obra.itens.map((i) => i.titulo) : [],
  // proposta
  nota: "Itens do Harmoni Vinhedos. Os demais confirmam no lançamento.",
  imagem: corteInfraestrutura,
};

const O = "/img/nova-harmonia/obras";

export const quem = {
  rotulo: "Quem constrói",
  // cliente (LPs)
  titulo: { inicio: grupo.chamada.antes ?? "", destaque: grupo.chamada.destaque } satisfies Titulo,
  // cliente (site da Nova Harmonia)
  texto:
    "Uma empresa com história para contar e um Brasil a desenvolver. Entendemos de Brasil, estamos de Norte a Sul e compreendemos cada país que existe dentro do Brasil.",
  link: { rotulo: "Conhecer a Nova Harmonia", href: "https://novaharmonia.com.br/" },
  textura: img("/img/compartilhado/textura-noite.webp", 1600, 900, ""),
  // cliente (lotes publicados em novaharmonia.com.br, lidos em 04/10/2026)
  numeros: [
    { nome: "Parque Harmonia", lotes: 1369, cidade: "Viamão/RS" },
    { nome: "Villa Imperial", lotes: 1895, cidade: "Teresina/PI" },
    { nome: "Reserva Harmonia", lotes: 1181, cidade: "Caruaru/PE" },
    { nome: "The One", lotes: 341, cidade: "Raposa/MA" },
  ],
  lotesEm: "lotes em",
  // Fotos reais de obra. Legenda entre colchetes: confirmar com o cliente.
  obras: [
    { imagem: img(`${O}/parque-harmonia-viamao.webp`, 806, 1080, "Máquina em obra do Parque Harmonia, Viamão"), nome: "Parque Harmonia", legenda: "Viamão/RS · obra" },
    { imagem: img(`${O}/vista-aerea.webp`, 1600, 900, "Vista aérea de bairro planejado da Nova Harmonia"), nome: "Bairro planejado Nova Harmonia", legenda: "Vista aérea", larga: true },
    { imagem: img(`${O}/caruaru-ponte.webp`, 810, 1080, "Ponte do Reserva Harmonia Caruaru"), nome: "Reserva Harmonia Caruaru", legenda: "Caruaru/PE · ponte" },
    { imagem: img(`${O}/ciclovia.webp`, 810, 1080, "Ciclovia e avenida ao entardecer"), nome: "Ciclovia e avenida", legenda: "[CONFIRMAR EMPREENDIMENTO]" },
    { imagem: img(`${O}/villa-imperial.webp`, 600, 820, "Pórtico do Villa Imperial, Teresina"), nome: "Villa Imperial", legenda: "Teresina/PI" },
    { imagem: img(`${O}/morada-dos-passaros.webp`, 807, 1080, "Meio-fio no Morada dos Pássaros, Araguaína"), nome: "Morada dos Pássaros", legenda: "Araguaína/TO · meio-fio" },
    { imagem: img(`${O}/sao-mateus.webp`, 810, 1080, "Rua pavimentada no Reserva Harmonia São Mateus"), nome: "Reserva Harmonia São Mateus", legenda: "São Mateus/ES · pavimentação" },
    { imagem: img(`${O}/stand.webp`, 1200, 800, "Stand de vendas da Nova Harmonia"), nome: "Stand Nova Harmonia", legenda: "[CONFIRMAR LOCAL]", larga: true },
    { imagem: img(`${O}/caruaru-acesso.webp`, 810, 1080, "Avenida de acesso do Reserva Harmonia Caruaru"), nome: "Reserva Harmonia Caruaru", legenda: "Caruaru/PE · acesso" },
  ],
  // proposta
  dica: "Fotos reais de obras da Nova Harmonia. Arraste para ver mais.",
  anterior: "Foto anterior",
  proxima: "Próxima foto",
  rotuloFotos: "Obras da Nova Harmonia",
  sfa: marcasGrupo.sfa,
  setores: grupo.setores,
};

export const perguntas = {
  rotulo: "Perguntas",
  // proposta (pergunta e resposta montadas só com dados do cliente)
  titulo: { inicio: "O que perguntam ", destaque: "antes de visitar" } satisfies Titulo,
  itens: [
    {
      pergunta: "Onde ficam os condomínios Harmoni?",
      resposta:
        "Em três cidades da Grande Porto Alegre: o Harmoni Vinhedos fica em Viamão; Jardins, Árbore e Essenza ficam em Cachoeirinha; e o Harmoni Vale fica em Gravataí.",
    },
    {
      pergunta: "O que é um condomínio horizontal?",
      resposta:
        "É um condomínio fechado de lotes residenciais, com portaria, ruas internas e áreas de lazer de uso dos moradores. Cada família constrói a sua casa no próprio lote.",
    },
    {
      pergunta: "Qual o tamanho dos lotes?",
      resposta: "No Harmoni Vinhedos, os lotes residenciais começam em 160m². Nos demais Harmonis a metragem será divulgada no lançamento.",
      pendencia: "[PREENCHER]",
    },
    {
      pergunta: "Que infraestrutura o condomínio entrega?",
      resposta:
        "No Harmoni Vinhedos: pavimentação em pavs, meio-fio com sarjetas de 45cm, redes de água, esgoto, drenagem pluvial e elétrica, iluminação pública em LED e portarias social e de serviço.",
    },
    {
      pergunta: "Quem está por trás da linha Harmoni?",
      resposta:
        "A Nova Harmonia Bairros Planejados, empresa do Grupo São Francisco de Assis (SFA), presente nas 5 regiões do país com bairros planejados e condomínios fechados.",
    },
    {
      pergunta: "Como falo com um consultor?",
      resposta: "Pelo formulário desta página. Escolha o Harmoni de interesse e um consultor da região responde pelo WhatsApp.",
    },
  ] as { pergunta: string; resposta: string; pendencia?: string }[],
};

export const contato = {
  rotulo: "Contato",
  foto: img("/img/compartilhado/estilo-de-vida/familia-jardim.webp", 1100, 1408, "Família brincando no jardim"),
  // cliente (vitrine original)
  chamadaFoto: "Qual Harmoni combina com você?",
  // proposta
  titulo: { inicio: "Fale com um consultor ", destaque: "da sua região." } satisfies Titulo,
  // cliente (vitrine original)
  texto: "Deixe seu contato e escolha o empreendimento. Um consultor da região responde pelo WhatsApp.",
  campos: {
    nome: "Nome completo",
    telefone: "WhatsApp",
    email: "E-mail",
    empreendimento: "Empreendimento de interesse",
  },
  selectVazio: "Ainda não sei, quero conhecer a linha",
  linha: "a linha Harmoni",
  aceite: textosFormulario.aceite,
  enviar: "Quero receber informações",
  enviando: textosFormulario.enviando,
  erro: "Preencha nome, WhatsApp e e-mail e marque o aceite para continuar.",
  sucesso: textosFormulario.sucesso,
  falha: textosFormulario.falha,
  falhaCta: textosFormulario.falhaCta,
  mensagemWhatsapp: textosFormulario.mensagemWhatsapp,
  // POST do lead. Vazio enquanto o endpoint não existir: o formulário assume a falha e oferece o WhatsApp.
  endpoint: "",
  // Sem número próprio da vitrine: usa o do Harmoni escolhido; sem escolha, o do Vinhedos (docs/PENDENCIAS.md).
  whatsappPadrao: vinhedos.contato.whatsapp,
  canais: [
    { rotulo: "WhatsApp", valor: "[WHATSAPP OFICIAL]" },
    { rotulo: "Stand", valor: "[ENDEREÇO]" },
  ],
};

export const rodape = {
  // cliente (corte de "Se o sonho de morar bem começa pelo lote, viver bem tem endereço...")
  chamada: "Viver bem tem endereço.",
  cta: { rotulo: "Falar com consultor", alvo: ancoras.contato },
  colunas: { harmonis: "Harmonis", explore: "Explore", siga: "Siga" },
  explore: [
    { rotulo: "Onde estamos", alvo: ancoras.onde },
    { rotulo: "Quem constrói", alvo: ancoras.quem },
    { rotulo: "Perguntas", alvo: ancoras.perguntas },
  ],
  institucional: { rotulo: "Nova Harmonia", href: "https://novaharmonia.com.br/" },
  redes,
  urlPendente: "[URL]",
  legal: "Imagens meramente ilustrativas. © Nova Harmonia Bairros Planejados.",
  privacidade: { rotulo: "Política de Privacidade", href: "#" },
  privacidadePendente: "[link]",
};

export const seo = {
  // proposta
  titulo: "Condomínios Harmoni em Viamão, Cachoeirinha e Gravataí",
  descricao:
    "Conheça a linha Harmoni da Nova Harmonia: condomínios horizontais fechados em Viamão, Cachoeirinha e Gravataí/RS, com lazer completo e infraestrutura.",
  imagem: "/img/vinhedos/perspectivas/portico-original.webp",
  site: "https://condominioharmoni.com.br",
  nomeSite: "Condomínios Harmoni",
  organizacao: { nome: "Nova Harmonia Bairros Planejados", url: "https://novaharmonia.com.br/", grupo: "Grupo São Francisco de Assis" },
  nomeLista: "Condomínios da linha Harmoni",
};

export const metadados = {
  titulo: seo.titulo,
};
