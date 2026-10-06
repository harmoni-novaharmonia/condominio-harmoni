// Harmoni Vale, Gravataí/RS. Copy do cliente ("Copy LP Harmoni Vale.txt").
// Layout da revisão aprovada em 2026-10-05: noite e dourado, janela em forma de
// casa (o desenho do logo) e curvas de nível (é um vale). Seções exclusivas em ./secoes.
import { corteInfraestrutura, itensModeloHarmoni, legendaModeloImplantacao, legendasPerspectivas as L, missao, obraModelo, registroPendente } from "../comum";
import { estiloDeVida, provisoria, type ChaveRender } from "../renders";
import type { Imagem, LP } from "../tipos";

const nome = "Harmoni Vale";
const cidade = "Gravataí/RS";
const aproveite = { rotulo: "Aproveite a oportunidade agora mesmo", alvo: "contato" };

// Categoria de cada item (proposta) e a foto mais próxima que existe; sem foto
// própria, a da categoria (quadra e playground usam a da piscina).
const categoria: Record<string, string> = {
  portaria: "Segurança", chave: "Segurança",
  quadra: "Lazer", academia: "Lazer", piscina: "Lazer", playground: "Lazer", salao: "Lazer", gourmet: "Lazer", petplace: "Lazer",
  mercado: "Serviços", carro: "Serviços",
  "rede-de-agua": "Infraestrutura", "rede-eletrica": "Infraestrutura", "iluminacao-led": "Infraestrutura",
};
const fotoDoItem: Record<string, ChaveRender> = { portaria: "portico", chave: "portico", academia: "academia", piscina: "piscina", salao: "salao", gourmet: "gourmet2", mercado: "minimercado", carro: "lavaJato" };
const fotoDaCategoria: Record<string, ChaveRender> = { Segurança: "portico", Lazer: "piscina", Serviços: "minimercado" };
const fotoItem = (icone: string, cat: string): Imagem => {
  if (icone === "petplace") return estiloDeVida.meninaCachorro;
  const k = fotoDoItem[icone] ?? fotoDaCategoria[cat];
  return k ? provisoria(k) : corteInfraestrutura;
};

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
  barraCelular: true,
  secoes: [
    {
      tipo: "vale",
      secao: "casa",
      titulo: { antes: "Viver em ", destaque: "Gravataí", depois: " acaba de ficar muito melhor" },
      texto: "Cadastre-se para conhecer o lar ideal.",
      imagens: [
        { nome: "Salão de festas", imagem: provisoria("salaoExterno") },
        { nome: "Espaço gourmet", imagem: provisoria("gourmet2") },
        { nome: "Piscina", imagem: provisoria("piscina") },
      ],
      formulario: { botao: "Aproveite a oportunidade agora mesmo" },
    },
    {
      tipo: "vale",
      secao: "declaracao",
      sobretitulo: nome,
      titulo: { antes: "Mais que um endereço, ", destaque: "um símbolo de sucesso!" },
      paragrafos: [
        "No Harmoni Vale, buscamos desenvolver um ambiente que ressalte a exclusividade de quem já venceu na vida e prioriza a qualidade de vida e segurança do ambiente onde sua família viverá.",
      ],
      pilulas: [provisoria("salaoExterno"), provisoria("gourmet2")],
      cta: { rotulo: "Saiba por que o Harmoni Vale é a opção certa", alvo: "contato" },
    },
    {
      tipo: "vale",
      secao: "constelacao",
      sobretitulo: "Localização",
      // proposta
      titulo: { antes: "O seu lugar ", destaque: "em Gravataí" },
      texto: "[PREENCHER: texto de localização do Harmoni Vale]",
      endereco: "[PREENCHER: endereço do empreendimento] · Gravataí/RS",
      // Posições ilustrativas; confirmar quais referências valem para o endereço (docs/PENDENCIAS.md).
      casa: { x: 55, y: 50 },
      pontos: [
        { titulo: "Porto Alegre", texto: "Capital", icone: "relogio", x: 11, y: 62, grupo: "Capital" },
        { titulo: "RS-118", texto: "Rodovia de acesso", icone: "estrada", x: 27, y: 24, grupo: "Acesso" },
        { titulo: "Freeway (BR-290)", texto: "Rodovia de acesso", icone: "estrada", x: 40, y: 84, grupo: "Acesso" },
        { titulo: "Centro de Gravataí", texto: "Comércio e serviços", icone: "sacola", x: 82, y: 32, grupo: "Cidade" },
      ],
    },
    {
      tipo: "vale",
      secao: "arraste",
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
      tipo: "vale",
      secao: "moldura",
      sobretitulo: "Masterplan Harmoni",
      // Chamada do cliente ("larr" corrigido para "lar", ver docs/PENDENCIAS.md).
      titulo: { antes: "Escolha agora ", destaque: "onde será seu lar" },
      planta: provisoria("masterplan"),
      legenda: legendaModeloImplantacao,
      cta: aproveite,
    },
    {
      tipo: "vale",
      secao: "revela",
      sobretitulo: "Padrão Nova Harmonia",
      titulo: { antes: "Infraestrutura e lazer, ", destaque: "item por item" },
      itens: itensModeloHarmoni.map((x) => {
        const cat = categoria[x.icone] ?? "Lazer";
        return { ...x, categoria: cat, foto: fotoItem(x.icone, cat) };
      }),
      cta: aproveite,
    },
    {
      tipo: "vale",
      secao: "corte",
      sobretitulo: "Como construímos",
      titulo: { antes: "Infraestrutura a altura do padrão ", destaque: "Nova Harmonia", depois: " de qualidade" },
      imagem: corteInfraestrutura,
      itens: obraModelo,
    },
    { tipo: "vale", secao: "brasil" },
    {
      tipo: "vale",
      secao: "contato",
      titulo: { antes: "Saiba por que o Harmoni Vale ", destaque: "é a opção certa" },
      imagem: missao.foto,
      formulario: { botao: "Quero condição de lançamento" },
    },
    { tipo: "outros" },
  ],
  legal: { registro: registroPendente(nome, cidade) },
};
