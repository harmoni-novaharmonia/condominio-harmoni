// Harmoni Vinhedos, Viamão/RS. Textos verbatim da LP no ar (condominioharmoni.com.br).
// Itens marcados "proposta" foram escritos para esta versão e aguardam aprovação.
import { corteInfraestrutura } from "../comum";
import { render } from "../renders";
import type { LP } from "../tipos";

const lote = { rotulo: "Quero escolher meu lote", alvo: "contato" };

export const vinhedos: LP = {
  slug: "vinhedos",
  nome: "Harmoni Vinhedos",
  cidade: "Viamão/RS",
  tema: "vinhedos",
  seo: {
    titulo: "Condomínio Harmoni em Viamão | Lançamento Nova Harmonia",
    // proposta
    descricao:
      "Harmoni Vinhedos: condomínio horizontal em Viamão/RS com lotes a partir de 160m², segurança, lazer completo e o padrão Nova Harmonia.",
    imagem: "/img/vinhedos/perspectivas/portico-original.webp",
  },
  logo: {
    claro: { src: "/harmoni-logos-gerais/harmoni-logo-petroleo.svg", largura: 1799, altura: 340 },
    escuro: { src: "/harmoni-logos-gerais/harmoni-logo-creme.svg", largura: 1799, altura: 340 },
    alturaHeader: 30,
  },
  header: { sobre: "escuro", cta: { rotulo: "Garantir meu lote", alvo: "contato" } },
  contato: {
    telefones: ["(51) 99719-6426", "(51) 9901-8575"],
    whatsapp: "5551997196426",
    // Endereço do stand na LP no ar; confirmar (docs/PENDENCIAS.md).
    stand: "Av. Senador Salgado Filho, 7700, Viamão/RS",
  },
  secoes: [
    {
      tipo: "hero",
      variante: "cinema",
      // A LP no ar digita "VIVA COM E... EM HARMONIA": aqui as quatro palavras do conceito se alternam.
      titulo: { antes: "Viva com ", destaque: "", depois: " em harmonia" },
      palavras: ["segurança", "exclusividade", "comodidade", "lazer"],
      texto: "Condomínio horizontal com lotes a partir de 160m².",
      imagem: render("portico"),
      formulario: { titulo: "Seja um dos primeiros compradores e tenha condições exclusivas!", botao: "Quero condição de lançamento" },
    },
    {
      tipo: "destaques",
      itens: [
        // proposta (subtítulos)
        { titulo: "Lotes a partir de 160m²", icone: "metragem", texto: "Condomínio horizontal fechado" },
        { titulo: "Vizinho de Cantegril e Buena Vista", icone: "pino", texto: "Região em plena expansão" },
        { titulo: "Ao lado do Parque Harmonia", icone: "lote", texto: "Bairro planejado Nova Harmonia" },
        { titulo: "Infraestrutura completa", icone: "pavimentacao", texto: "Padrão construtivo Nova Harmonia" },
      ],
    },
    {
      tipo: "conceito",
      variante: "centro",
      sobretitulo: "Harmoni Vinhedos",
      titulo: {
        antes: "Pensado para quem quer mais espaço, mais liberdade e ",
        destaque: "a harmonia entre privacidade e convivência.",
      },
      paragrafos: [
        "O Harmoni Vinhedos é um condomínio horizontal pensado para você viver em um endereço que valoriza o que importa e que se tornará referência.",
      ],
    },
    {
      tipo: "perspectivas",
      carrossel: "cinema",
      sobretitulo: "Perspectivas",
      titulo: { antes: "Diversão e qualidade de vida ", destaque: "para todas as idades" },
      itens: [
        // proposta (legendas curtas)
        { nome: "Pórtico", texto: "Entrada do condomínio", imagem: render("portico") },
        { nome: "Gourmet", texto: "Espaço gourmet", imagem: render("gourmet2") },
        { nome: "Piscina infantil", texto: "Lazer para as crianças", imagem: render("piscina") },
        { nome: "Salão de festas", texto: "Área externa", imagem: render("salaoExterno") },
        { nome: "Salão de festas", texto: "Área interna", imagem: render("salao") },
        { nome: "Brinquedoteca", texto: "Espaço infantil", imagem: render("brinquedoteca") },
        { nome: "Academia", texto: "Saúde no condomínio", imagem: render("academia") },
        { nome: "Mini-mercado", texto: "Praticidade", imagem: render("minimercado") },
        { nome: "Lava-jato", texto: "Espaço car-care", imagem: render("lavaJato") },
      ],
    },
    {
      tipo: "diferenciais",
      variante: "abas",
      sobretitulo: "Diferenciais",
      titulo: { antes: "O Harmoni Vinhedos vai ", destaque: "muito além do básico" },
      grupos: [
        {
          // proposta (título do grupo)
          titulo: "Para viver o dia a dia",
          imagem: render("salaoExterno"),
          itens: [
            { titulo: "Paisagismo", icone: "folha" },
            { titulo: "Chimarródromo", icone: "chimarrao" },
            { titulo: "Redário", icone: "rede" },
            { titulo: "Espaço car-care", icone: "carro" },
            { titulo: "Minimercado", icone: "mercado" },
            { titulo: "Fire place", icone: "fogo" },
            { titulo: "Acesso de entrada exclusivo para moradores", icone: "chave" },
          ],
        },
        {
          titulo: "Saúde para viver mais longe!",
          imagem: render("academia"),
          itens: [
            { titulo: "Academia", icone: "academia" },
            { titulo: "Pista de cooper", icone: "pista-cooper" },
            { titulo: "Quadra de areia", icone: "beach-tennis" },
            { titulo: "Quadra poliesportiva", icone: "quadra" },
          ],
        },
      ],
      cta: { rotulo: "Quero conhecer todos os diferenciais", alvo: "contato" },
    },
    {
      tipo: "localizacao",
      cabecalho: "esquerda",
      sobretitulo: "Localização",
      titulo: { antes: "Uma localização que te conecta ", destaque: "ao que mais importa!" },
      texto:
        "O Harmoni Vinhedos está estrategicamente localizado em uma região em plena expansão e que mais se valoriza em Viamão. Vizinho dos condomínios Cantegril e Buena Vista e, ao lado do bairro planejado Parque Harmonia, esse é o condomínio fechado para você viver no melhor lugar do mundo: a sua casa!",
      mapa: {
        variante: "foto",
        endereco: "Stand de vendas: Av. Senador Salgado Filho, 7700, Viamão/RS",
        foto: render("mapa"),
        pontos: [
          { titulo: "Condomínio Cantegril", texto: "Vizinho do Harmoni Vinhedos", icone: "pino" },
          { titulo: "Condomínio Buena Vista", texto: "Vizinho do Harmoni Vinhedos", icone: "pino" },
          { titulo: "Parque Harmonia", texto: "Bairro planejado ao lado", icone: "lote" },
        ],
      },
    },
    {
      tipo: "implantacao",
      variante: "largura",
      sobretitulo: "Implantação",
      // proposta
      titulo: { antes: "Encontre o seu lugar ", destaque: "no Harmoni" },
      planta: render("masterplan"),
      legenda: [
        { titulo: "Portaria", icone: "portaria" },
        { titulo: "Salão de festas", icone: "salao" },
        { titulo: "Fogo de chão", icone: "fogo" },
        { titulo: "Mercadinho", icone: "mercado" },
        { titulo: "Car care", icone: "carro" },
        { titulo: "Quadra poliesportiva", icone: "quadra" },
        { titulo: "Chimarródromo e redário", icone: "chimarrao" },
        { titulo: "Pista de cooper", icone: "pista-cooper" },
        { titulo: "Academia", icone: "academia" },
        { titulo: "Brinquedoteca", icone: "brinquedoteca" },
        { titulo: "Espaço gourmet", icone: "gourmet" },
        { titulo: "Quadra de areia", icone: "areia" },
        { titulo: "Piscina adulto", icone: "piscina" },
        { titulo: "Piscina infantil", icone: "piscina" },
        { titulo: "Playground", icone: "playground" },
      ],
      cta: lote,
    },
    {
      tipo: "obra",
      variante: "escura",
      sobretitulo: "Como construímos",
      // Copy do cliente; falta a crase em "à altura" (sinalizado em docs/PENDENCIAS.md).
      titulo: { antes: "Infraestrutura a altura do padrão ", destaque: "Nova Harmonia", depois: " de qualidade" },
      texto: "Padrão e qualidade construtiva que só a Nova Harmonia tem.",
      imagem: corteInfraestrutura,
      itens: [
        { titulo: "Pavimentação em pavs", icone: "pavimentacao" },
        { titulo: "Meio-fio com sarjetas de 45cm", icone: "meio-fio-com-sarjeta" },
        { titulo: "Rede e reservatório de água", icone: "rede-de-agua" },
        { titulo: "Rede de esgoto", icone: "rede-de-esgoto" },
        { titulo: "Rede de drenagem pluvial", icone: "rede-de-drenagem" },
        { titulo: "Rede elétrica", icone: "rede-eletrica" },
        { titulo: "Iluminação pública em LED", icone: "iluminacao-led" },
        { titulo: "Portaria de entrada social", icone: "portaria" },
        { titulo: "Portaria de entrada de serviço", icone: "chave" },
      ],
    },
    { tipo: "grupo", variante: "centro" },
    {
      tipo: "contato",
      variante: "foto",
      sobretitulo: "Telefones para contato",
      titulo: { antes: "Visite nosso ", destaque: "stand de vendas" },
      imagem: render("salao"),
      formulario: { titulo: "Quero falar com um consultor", botao: "Quero condição de lançamento" },
    },
  ],
  legal: {
    registro:
      "O condomínio de lotes Harmoni Vinhedos está registrado na matrícula 89.365 no cartório de registro de imóveis de Viamão/RS e aprovado pela prefeitura municipal de Viamão/RS.",
  },
};
