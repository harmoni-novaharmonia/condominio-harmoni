// Harmoni Vale, Gravataí/RS. Copy do cliente ("Copy LP Harmoni Vale.txt") sobre a base do Jardins.
// Abertura escura com detalhe dourado; o resto em branco.
import { corteInfraestrutura, itensModeloHarmoni, legendaModeloImplantacao, legendasPerspectivas as L, obraModelo, registroPendente } from "../comum";
import { provisoria } from "../renders";
import type { LP } from "../tipos";

const nome = "Harmoni Vale";
const cidade = "Gravataí/RS";
const aproveite = { rotulo: "Aproveite a oportunidade agora mesmo", alvo: "contato" };

export const vale: LP = {
  slug: "vale",
  nome,
  cidade,
  tema: "vale",
  seo: {
    titulo: "Harmoni Vale em Gravataí | Lançamento Nova Harmonia",
    // proposta
    descricao:
      "Harmoni Vale: condomínio horizontal em Gravataí/RS, pensado para quem prioriza exclusividade, qualidade de vida e segurança para a família.",
    imagem: "/img/vinhedos/perspectivas/salao-de-festas-externo.webp",
  },
  logo: {
    claro: { src: "/img/vale/logo/logo-03-recorte.svg", largura: 730, altura: 486 },
    escuro: { src: "/img/vale/logo/logo-02-recorte.svg", largura: 730, altura: 486 },
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
      variante: "fundo",
      titulo: { antes: "Viver em ", destaque: "Gravataí", depois: " acaba de ficar muito melhor" },
      texto: "Cadastre-se para conhecer o lar ideal.",
      imagem: provisoria("salaoExterno"),
      tituloCartao: { antes: "Cadastre-se para conhecer ", destaque: "o lar ideal." },
      formulario: { botao: "Aproveite a oportunidade agora mesmo" },
    },
    {
      tipo: "conceito",
      variante: "manifesto",
      sobretitulo: nome,
      titulo: { antes: "Mais que um endereço, ", destaque: "um símbolo de sucesso!" },
      paragrafos: [
        "No Harmoni Vale, buscamos desenvolver um ambiente que ressalte a exclusividade de quem já venceu na vida e prioriza a qualidade de vida e segurança do ambiente onde sua família viverá.",
      ],
      cta: { rotulo: "Saiba por que o Harmoni Vale é a opção certa", alvo: "contato" },
    },
    {
      tipo: "perspectivas",
      carrossel: "centro",
      fundo: "noite",
      sobretitulo: "Perspectivas",
      // proposta
      titulo: { antes: "Ambientes à altura ", destaque: "da sua conquista" },
      itens: [
        { ...L.portico, imagem: provisoria("portico") },
        { ...L.salao, imagem: provisoria("salaoExterno") },
        { ...L.gourmet, imagem: provisoria("gourmet") },
        { ...L.piscina, imagem: provisoria("piscina") },
        { ...L.academia, imagem: provisoria("academia") },
        { ...L.brinquedoteca, imagem: provisoria("brinquedoteca") },
        { ...L.minimercado, imagem: provisoria("minimercado") },
      ],
    },
    {
      tipo: "diferenciais",
      variante: "cartoes",
      sobretitulo: "Padrão Nova Harmonia",
      titulo: { antes: "Infraestrutura e lazer, ", destaque: "item por item" },
      itens: itensModeloHarmoni,
      cta: aproveite,
    },
    {
      tipo: "chamada",
      variante: "foto",
      // Copy do cliente diz "larr": erro de digitação corrigido, sinalizado em docs/PENDENCIAS.md.
      titulo: { antes: "Escolha agora ", destaque: "onde será seu lar" },
      cta: aproveite,
      imagem: provisoria("gourmet2"),
    },
    {
      tipo: "localizacao",
      cabecalho: "esquerda",
      sobretitulo: "Localização",
      // proposta
      titulo: { antes: "O seu lugar ", destaque: "em Gravataí" },
      mapa: {
        variante: "abas",
        endereco: "[PREENCHER: endereço do empreendimento] · Gravataí/RS",
        // Referências da cidade; confirmar quais valem para o endereço (docs/PENDENCIAS.md).
        pontos: [
          { titulo: "Freeway (BR-290)", texto: "Rodovia de acesso", icone: "estrada", x: "28%", y: "26%", grupo: "Acessos" },
          { titulo: "RS-118", texto: "Rodovia de acesso", icone: "estrada", x: "70%", y: "66%", grupo: "Acessos" },
          { titulo: "Centro de Gravataí", texto: "Comércio e serviços", icone: "sacola", x: "30%", y: "72%", grupo: "Cidade" },
          { titulo: "Porto Alegre", texto: "Capital", icone: "relogio", x: "76%", y: "24%", grupo: "Capital" },
        ],
      },
    },
    {
      tipo: "implantacao",
      variante: "linha",
      sobretitulo: "Masterplan Harmoni",
      titulo: { destaque: "Implantação" },
      planta: provisoria("masterplan"),
      legenda: legendaModeloImplantacao,
    },
    {
      tipo: "obra",
      variante: "lado",
      invertido: true,
      sobretitulo: "Como construímos",
      titulo: { antes: "Infraestrutura a altura do padrão ", destaque: "Nova Harmonia", depois: " de qualidade" },
      imagem: corteInfraestrutura,
      itens: obraModelo,
    },
    { tipo: "grupo", variante: "escuro-centro" },
    { tipo: "missao" },
    {
      tipo: "contato",
      variante: "centro",
      fundo: "noite",
      titulo: { antes: "Saiba por que o Harmoni Vale ", destaque: "é a opção certa" },
      formulario: { botao: "Quero condição de lançamento" },
    },
  ],
  legal: { registro: registroPendente(nome, cidade) },
};
