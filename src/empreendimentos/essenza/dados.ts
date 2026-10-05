// Harmoni Essenza, Cachoeirinha/RS (cidade do logo e da copy do book).
// Copy do cliente ("Copy book Harmoni Essenza.docx"); estrutura sobre a base do Jardins.
import { corteInfraestrutura, itensModeloHarmoni, legendaModeloImplantacao, legendasPerspectivas as L, obraModelo, registroPendente } from "../comum";
import { estiloDeVida, provisoria } from "../renders";
import type { LP } from "../tipos";

const nome = "Harmoni Essenza";
const cidade = "Cachoeirinha/RS";

export const essenza: LP = {
  slug: "essenza",
  nome,
  cidade,
  tema: "essenza",
  seo: {
    titulo: "Harmoni Essenza em Cachoeirinha | Lançamento Nova Harmonia",
    // proposta
    descricao:
      "Harmoni Essenza: condomínio fechado em Cachoeirinha/RS, com acesso pela RS-118, perto da ULBRA e do Park Shopping Canoas, a 20 minutos da capital.",
    imagem: "/img/vinhedos/perspectivas/gourmet-14.webp",
  },
  logo: {
    claro: { src: "/img/essenza/logo/logo-03-recorte.svg", largura: 730, altura: 486 },
    escuro: { src: "/img/essenza/logo/logo-02-recorte.svg", largura: 730, altura: 486 },
    alturaHeader: 56,
  },
  header: { sobre: "escuro", cta: { rotulo: "Garantir meu lote", alvo: "contato" } },
  contato: {
    telefones: ["(51) 99719-6426", "(51) 9901-8575"],
    whatsapp: "5551997196426",
  },
  secoes: [
    {
      tipo: "hero",
      variante: "painel",
      titulo: { antes: "Um novo patamar de viver bem em ", destaque: "Cachoeirinha" },
      imagem: provisoria("gourmet"),
      formulario: { botao: "Quero condição de lançamento" },
    },
    {
      tipo: "conceito",
      variante: "lado",
      sobretitulo: nome,
      titulo: { antes: "Conheça o padrão Nova Harmonia ", destaque: "e se encante!" },
      paragrafos: [
        "No Harmoni Essenza, você adquire muito mais que um lar, adquire um estilo de vida que cerca sua família de lazer, conforto e segurança.",
        "A Nova Harmonia tem trazido desenvolvimento para diversos estados brasileiros. Com vários empreendimentos de sucesso já lançados no Rio Grande do Sul, o Harmoni Essenza é um exemplo reluzente do padrão que a Nova Harmonia oferece.",
      ],
      imagens: [estiloDeVida.meninaCachorro],
      cta: { rotulo: "Quero saber mais!", alvo: "contato" },
    },
    {
      tipo: "localizacao",
      cabecalho: "centro",
      fundo: "areia",
      sobretitulo: "Localização",
      titulo: { antes: "Uma localização que te conecta ", destaque: "ao que mais importa!" },
      texto:
        "O Harmoni Essenza está estrategicamente localizado em uma região que se destaca pela comodidade, com fácil acesso pela RS-118, a poucos minutos da ULBRA e do Park Shopping Canoas. Esteja a apenas 20 minutos da capital em um condomínio fechado, que oferece mais segurança e qualidade de vida para sua família enquanto mantém você perto de tudo o que precisa!",
      mapa: {
        variante: "rota",
        endereco: "[PREENCHER: endereço do empreendimento] · Cachoeirinha/RS",
        // A ordem das paradas é ilustrativa; os lugares e os 20 minutos são da copy do cliente.
        pontos: [
          { titulo: "Harmoni Essenza", texto: "Seu ponto de partida", icone: "lote", x: "6%" },
          { titulo: "RS-118", texto: "Fácil acesso", icone: "estrada", x: "30%" },
          { titulo: "ULBRA", texto: "A poucos minutos", icone: "estudo", x: "52%" },
          { titulo: "Park Shopping Canoas", texto: "A poucos minutos", icone: "sacola", x: "74%" },
          { titulo: "Porto Alegre", texto: "A apenas 20 minutos", icone: "relogio", x: "94%" },
        ],
      },
    },
    {
      tipo: "perspectivas",
      carrossel: "indice",
      sobretitulo: "Perspectivas",
      // proposta
      titulo: { antes: "Lazer, conforto e segurança ", destaque: "em cada detalhe" },
      itens: [
        { ...L.gourmet, imagem: provisoria("gourmet") },
        { ...L.portico, imagem: provisoria("portico") },
        { ...L.piscina, imagem: provisoria("piscina") },
        { ...L.salao, imagem: provisoria("salaoExterno") },
        { ...L.brinquedoteca, imagem: provisoria("brinquedoteca") },
        { ...L.minimercado, imagem: provisoria("minimercado") },
        { ...L.academia, imagem: provisoria("academia") },
      ],
    },
    {
      tipo: "diferenciais",
      variante: "grade-escura",
      sobretitulo: "Padrão Nova Harmonia",
      titulo: { antes: "Padrão e qualidade construtiva que só ", destaque: "a Nova Harmonia tem." },
      itens: itensModeloHarmoni,
    },
    {
      tipo: "chamada",
      variante: "foto",
      titulo: { antes: "A experiência Harmoni ", destaque: "começa aqui!" },
      texto: "Lotes residenciais a partir de 160m² em um condomínio para quem sonha em viver bem.",
      cta: { rotulo: "Quero condição de lançamento", alvo: "contato" },
      imagem: provisoria("piscina"),
    },
    {
      tipo: "implantacao",
      variante: "lateral",
      invertido: true,
      sobretitulo: "Masterplan Harmoni",
      titulo: { destaque: "Implantação" },
      planta: provisoria("masterplan"),
      legenda: legendaModeloImplantacao,
      cta: { rotulo: "Quero escolher meu lote", alvo: "contato" },
    },
    {
      tipo: "obra",
      variante: "faixa",
      sobretitulo: "Como construímos",
      titulo: { antes: "Infraestrutura a altura do padrão ", destaque: "Nova Harmonia", depois: " de qualidade" },
      imagem: corteInfraestrutura,
      itens: obraModelo,
    },
    { tipo: "grupo", variante: "centro", fundo: "creme" },
    {
      tipo: "contato",
      variante: "creme",
      titulo: { antes: "Seja um dos primeiros compradores e tenha ", destaque: "condições exclusivas!" },
      formulario: { botao: "Quero condição de lançamento" },
    },
  ],
  legal: { registro: registroPendente(nome, cidade) },
};
