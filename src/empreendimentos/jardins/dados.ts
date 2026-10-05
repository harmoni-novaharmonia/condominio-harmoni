// Harmoni Jardins, Cachoeirinha/RS. Copy-base das LPs novas (as outras copys
// dizem "pega a do Jardins e troca"). Imagens de projeto são do Vinhedos, provisórias.
import { corteInfraestrutura, itensModeloHarmoni, legendaModeloImplantacao, legendasPerspectivas as L, obraModelo, registroPendente } from "../comum";
import { estiloDeVida, provisoria } from "../renders";
import type { LP } from "../tipos";

const nome = "Harmoni Jardins";
const cidade = "Cachoeirinha/RS";

export const jardins: LP = {
  slug: "jardins",
  nome,
  cidade,
  tema: "jardins",
  seo: {
    titulo: "Harmoni Jardins em Cachoeirinha | Lançamento Nova Harmonia",
    // proposta
    descricao:
      "Harmoni Jardins: condomínio horizontal em Cachoeirinha/RS, a poucos minutos de Porto Alegre, com segurança e infraestrutura completa. Cadastre-se.",
    imagem: "/img/compartilhado/estilo-de-vida/menina-e-cachorro.webp",
  },
  logo: {
    claro: { src: "/img/jardins/logo/logo-03-recorte.svg", largura: 730, altura: 486 },
    escuro: { src: "/img/jardins/logo/logo-02-recorte.svg", largura: 730, altura: 486 },
    alturaHeader: 56,
  },
  header: { sobre: "claro", cta: { rotulo: "Garantir meu lote", alvo: "contato" } },
  contato: {
    // Números das LPs no ar; o oficial do Jardins está pendente.
    telefones: ["(51) 99719-6426", "(51) 9901-8575"],
    whatsapp: "5551997196426",
  },
  secoes: [
    {
      tipo: "hero",
      variante: "dividido",
      titulo: { antes: "Um novo patamar de viver bem em ", destaque: "Cachoeirinha" },
      texto: "Cadastre-se e conheça o conceito de lar ideal.",
      imagem: estiloDeVida.meninaCachorro,
      formulario: { botao: "Quero condição de lançamento" },
    },
    {
      tipo: "conceito",
      variante: "colunas",
      sobretitulo: nome,
      titulo: { antes: "Eleve o padrão de vida ", destaque: "da sua família!" },
      paragrafos: [
        "No Harmoni Jardins, trazemos nosso conceito de lar ideal, criando um ambiente exclusivo, pensado para quem valoriza qualidade de vida e segurança para toda a família.",
        "Em Cachoeirinha, esse compromisso ganha forma num condomínio horizontal pensado para quem busca segurança e infraestrutura completa a poucos minutos de Porto Alegre.",
      ],
      imagens: [estiloDeVida.familiaJardim, provisoria("piscina")],
    },
    {
      tipo: "perspectivas",
      carrossel: "leque",
      fundo: "areia",
      sobretitulo: "Perspectivas",
      // proposta
      titulo: { antes: "Cada espaço pensado ", destaque: "para a família" },
      itens: [
        { ...L.portico, imagem: provisoria("portico") },
        { ...L.piscina, imagem: provisoria("piscina") },
        { ...L.salao, imagem: provisoria("salaoExterno") },
        { ...L.gourmet, imagem: provisoria("gourmet") },
        { ...L.brinquedoteca, imagem: provisoria("brinquedoteca") },
        { ...L.minimercado, imagem: provisoria("minimercado") },
        { ...L.academia, imagem: provisoria("academia") },
      ],
    },
    {
      tipo: "diferenciais",
      variante: "grade",
      sobretitulo: "Padrão Nova Harmonia",
      titulo: { antes: "Infraestrutura e lazer, ", destaque: "item por item" },
      itens: itensModeloHarmoni,
      cta: { rotulo: "Quero saber mais!", alvo: "contato" },
    },
    {
      tipo: "chamada",
      variante: "faixa",
      titulo: { antes: "Condições exclusivas ", destaque: "de lançamento!" },
      cta: { rotulo: "Quero aproveitar", alvo: "contato" },
    },
    {
      tipo: "localizacao",
      cabecalho: "lado",
      sobretitulo: "Localização",
      // proposta (a partir da copy do cliente)
      titulo: { antes: "Em Cachoeirinha, ", destaque: "a poucos minutos de Porto Alegre" },
      texto:
        "Em Cachoeirinha, esse compromisso ganha forma num condomínio horizontal pensado para quem busca segurança e infraestrutura completa a poucos minutos de Porto Alegre.",
      mapa: {
        variante: "ilustrado",
        endereco: "[PREENCHER: endereço do empreendimento] · Cachoeirinha/RS",
        // Referências da cidade; confirmar quais valem para o endereço (docs/PENDENCIAS.md).
        pontos: [
          { titulo: "Porto Alegre", texto: "A poucos minutos", icone: "relogio", x: "84%", y: "30%" },
          { titulo: "Aeroporto Salgado Filho", texto: "Referência da região", icone: "estrada", x: "70%", y: "70%" },
          { titulo: "Av. Flores da Cunha", texto: "Principal avenida da cidade", icone: "sacola", x: "58%", y: "24%" },
        ],
      },
    },
    {
      tipo: "implantacao",
      variante: "centro",
      sobretitulo: "Masterplan Harmoni",
      titulo: { destaque: "Implantação" },
      planta: provisoria("masterplan"),
      legenda: legendaModeloImplantacao,
      cta: { rotulo: "Quero garantir meu lote", alvo: "contato" },
    },
    {
      tipo: "obra",
      variante: "lado",
      sobretitulo: "Como construímos",
      titulo: { antes: "Infraestrutura a altura do padrão ", destaque: "Nova Harmonia", depois: " de qualidade" },
      imagem: corteInfraestrutura,
      itens: obraModelo,
    },
    { tipo: "grupo", variante: "escuro" },
    {
      tipo: "contato",
      variante: "centro",
      titulo: { antes: "Saiba detalhes ", destaque: "do Harmoni Jardins" },
      formulario: { botao: "Quero condição de lançamento" },
    },
  ],
  legal: { registro: registroPendente(nome, cidade) },
};
