// Harmoni Essenza, Cachoeirinha/RS (cidade do logo e da copy do book).
// Copy do cliente ("Copy book Harmoni Essenza.docx"). Layout da revisão aprovada
// em 2026-10-05: painel branco sobre foto no hero e no contato, um movimento por
// seção (seções exclusivas em ./secoes). O que é proposta está marcado.
import { corteInfraestrutura, grupo, itensModeloHarmoni, legendaModeloImplantacao, legendasPerspectivas as L, obraModelo, registroPendente } from "../comum";
import { estiloDeVida, provisoria } from "../renders";
import type { Imagem, LP } from "../tipos";

const nome = "Harmoni Essenza";
const cidade = "Cachoeirinha/RS";
const lancamento = { rotulo: "Quero condição de lançamento", alvo: "contato" };
const fotoGrupo = (arquivo: string): Imagem => grupo.fotos.find((f) => f.src.endsWith(arquivo)) ?? grupo.fotos[0];
// Categorias dos 14 itens do modelo (proposta).
const itensDe = (...icones: string[]) => itensModeloHarmoni.filter((x) => icones.includes(x.icone));

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
  barraCelular: true,
  secoes: [
    {
      tipo: "hero",
      variante: "painel",
      titulo: { antes: "Um novo patamar de viver bem em ", destaque: "Cachoeirinha" },
      imagem: provisoria("gourmet"),
      formulario: { botao: "Quero condição de lançamento" },
    },
    {
      tipo: "essenza",
      secao: "metade",
      sobretitulo: nome,
      titulo: { antes: "Conheça o padrão Nova Harmonia ", destaque: "e se encante!" },
      paragrafos: [
        "No Harmoni Essenza, você adquire muito mais que um lar, adquire um estilo de vida que cerca sua família de lazer, conforto e segurança.",
        "A Nova Harmonia tem trazido desenvolvimento para diversos estados brasileiros. Com vários empreendimentos de sucesso já lançados no Rio Grande do Sul, o Harmoni Essenza é um exemplo reluzente do padrão que a Nova Harmonia oferece.",
      ],
      imagem: estiloDeVida.familiaJardim,
      // Os três essenciais saem da própria copy ("lazer, conforto e segurança").
      essenciais: [
        { titulo: "Lazer", icone: "piscina" },
        { titulo: "Conforto", icone: "chave" },
        { titulo: "Segurança", icone: "portaria" },
      ],
      cta: { rotulo: "Quero saber mais!", alvo: "contato" },
    },
    {
      tipo: "essenza",
      secao: "trajeto",
      sobretitulo: "Localização",
      titulo: { antes: "Uma localização que te conecta ", destaque: "ao que mais importa!" },
      texto:
        "O Harmoni Essenza está estrategicamente localizado em uma região que se destaca pela comodidade, com fácil acesso pela RS-118, a poucos minutos da ULBRA e do Park Shopping Canoas. Esteja a apenas 20 minutos da capital em um condomínio fechado, que oferece mais segurança e qualidade de vida para sua família enquanto mantém você perto de tudo o que precisa!",
      endereco: "[PREENCHER: endereço do empreendimento] · Cachoeirinha/RS",
      // A ordem das paradas e o desenho são ilustrativos; os lugares e os 20 minutos são da copy.
      pontos: [
        { titulo: "Harmoni Essenza", texto: "Seu ponto de partida", icone: "lote" },
        { titulo: "RS-118", texto: "Fácil acesso", icone: "estrada" },
        { titulo: "ULBRA", texto: "A poucos minutos", icone: "estudo" },
        { titulo: "Park Shopping Canoas", texto: "A poucos minutos", icone: "sacola" },
        { titulo: "Porto Alegre", texto: "A apenas 20 minutos", icone: "relogio" },
      ],
    },
    {
      tipo: "essenza",
      secao: "sanfona",
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
      tipo: "essenza",
      secao: "abertura",
      titulo: { antes: "A experiência Harmoni ", destaque: "começa aqui!" },
      // "160m²" veio do modelo: confirmar a metragem (docs/PENDENCIAS.md).
      texto: "Lotes residenciais a partir de 160m² em um condomínio para quem sonha em viver bem.",
      cta: lancamento,
      imagem: provisoria("piscina"),
    },
    {
      tipo: "essenza",
      secao: "ampla",
      sobretitulo: "Masterplan Harmoni",
      titulo: { destaque: "Implantação" },
      planta: provisoria("masterplan"),
      legenda: legendaModeloImplantacao,
      cta: { rotulo: "Quero escolher meu lote", alvo: "contato" },
    },
    {
      tipo: "essenza",
      secao: "roteiro",
      sobretitulo: "Padrão Nova Harmonia",
      titulo: { antes: "Padrão e qualidade construtiva que só ", destaque: "a Nova Harmonia tem." },
      // Infraestrutura (água, elétrica, LED) fica no corte da rua logo abaixo.
      grupos: [
        { titulo: "Segurança", imagem: provisoria("portico"), itens: itensDe("portaria", "chave") },
        { titulo: "Lazer", imagem: provisoria("piscina"), itens: itensDe("quadra", "academia", "piscina", "playground", "salao", "gourmet", "petplace") },
        { titulo: "Serviços", imagem: provisoria("minimercado"), itens: itensDe("mercado", "carro") },
      ],
      cta: { rotulo: "Quero saber mais!", alvo: "contato" },
    },
    {
      tipo: "essenza",
      secao: "corte",
      sobretitulo: "Como construímos",
      titulo: { antes: "Infraestrutura a altura do padrão ", destaque: "Nova Harmonia", depois: " de qualidade" },
      imagem: corteInfraestrutura,
      itens: obraModelo,
    },
    {
      tipo: "essenza",
      secao: "setores",
      // Foto do grupo e o setor que ela mostra; setor sem foto vira cartão de texto.
      cartoes: [
        { setor: "Bairros planejados", imagem: fotoGrupo("paisagem.webp") },
        { setor: "Construção civil" },
        { setor: "Shopping centers", imagem: fotoGrupo("entrada.webp") },
        { setor: "Agronegócio" },
        { setor: "Rede Novo Atacarejo", imagem: fotoGrupo("atacarejo.webp") },
        { setor: "Faculdades" },
        { setor: "Hotéis", imagem: fotoGrupo("hotel.webp") },
      ],
    },
    {
      tipo: "essenza",
      secao: "contato",
      titulo: { antes: "Seja um dos primeiros compradores e tenha ", destaque: "condições exclusivas!" },
      imagem: estiloDeVida.familiaArLivre,
      formulario: { botao: "Quero condição de lançamento" },
    },
    { tipo: "outros" },
  ],
  legal: { registro: registroPendente(nome, cidade) },
};
