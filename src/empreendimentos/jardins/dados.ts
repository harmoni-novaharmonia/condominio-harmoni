// Harmoni Jardins, Cachoeirinha/RS. Copy-base das LPs novas (as outras copys
// dizem "pega a do Jardins e troca"). Layout da revisão aprovada em 2026-10-06:
// sálvia, linho e verde-mata, com a folha e a semente como motivos (seções
// exclusivas em ./secoes). Imagens de projeto são do Vinhedos, provisórias.
import { corteInfraestrutura, grupo, itensModeloHarmoni, legendaModeloImplantacao, legendasPerspectivas as L, obraModelo, registroPendente } from "../comum";
import { estiloDeVida, fotosNovaHarmonia, provisoria, type ChaveRender } from "../renders";
import type { Imagem, LP } from "../tipos";

const nome = "Harmoni Jardins";
const cidade = "Cachoeirinha/RS";
const fotoGrupo = (arquivo: string): Imagem => grupo.fotos.find((f) => f.src.endsWith(arquivo)) ?? grupo.fotos[0];

// Categoria de cada item (proposta). Infraestrutura (água, elétrica, LED) fica no
// corte da rua, logo abaixo dos diferenciais.
const categoria: Record<string, string> = {
  portaria: "Segurança", chave: "Segurança",
  quadra: "Lazer", academia: "Lazer", piscina: "Lazer", playground: "Lazer", salao: "Lazer", gourmet: "Lazer", petplace: "Lazer",
  mercado: "Serviços", carro: "Serviços",
};
// Só ganha foto o item que tem uma própria; portaria de serviço, quadra e playground ainda não têm.
const fotoDoItem: Record<string, ChaveRender> = { portaria: "portico", academia: "academia", piscina: "piscina", salao: "salao", gourmet: "gourmet2", mercado: "minimercado", carro: "lavaJato" };
const fotoItem = (icone: string): Imagem | undefined =>
  icone === "petplace" ? estiloDeVida.meninaCachorro : fotoDoItem[icone] ? provisoria(fotoDoItem[icone]) : undefined;

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
  barraCelular: true,
  secoes: [
    {
      tipo: "jardins",
      secao: "folha",
      titulo: { antes: "Um novo patamar de viver bem em ", destaque: "Cachoeirinha" },
      texto: "Cadastre-se e conheça o conceito de lar ideal.",
      imagem: estiloDeVida.meninaCachorro,
      selo: "Harmoni Jardins ✦ Cachoeirinha/RS ✦ Lançamento ✦ ",
      formulario: { botao: "Quero condição de lançamento" },
    },
    {
      tipo: "jardins",
      secao: "linho",
      sobretitulo: nome,
      titulo: { antes: "Eleve o padrão de vida ", destaque: "da sua família!" },
      // O segundo parágrafo da copy (Cachoeirinha, perto de Porto Alegre) está na Localização.
      paragrafos: [
        "No Harmoni Jardins, trazemos nosso conceito de lar ideal, criando um ambiente exclusivo, pensado para quem valoriza qualidade de vida e segurança para toda a família.",
      ],
      imagem: fotosNovaHarmonia.familiaLinho,
      // Argumentos da copy do cliente; "a poucos minutos de Porto Alegre" fica na Localização.
      fatos: [
        { titulo: "Condomínio horizontal", icone: "lote" },
        { titulo: "Segurança para toda a família", icone: "portaria" },
        { titulo: "Infraestrutura completa", icone: "pavimentacao" },
      ],
      cta: { rotulo: "Quero condição de lançamento", alvo: "contato" },
    },
    {
      tipo: "jardins",
      secao: "afasta",
      sobretitulo: "Localização",
      // proposta (a partir da copy do cliente)
      titulo: { antes: "Em Cachoeirinha, ", destaque: "a poucos minutos de Porto Alegre" },
      texto:
        "Em Cachoeirinha, esse compromisso ganha forma num condomínio horizontal pensado para quem busca segurança e infraestrutura completa a poucos minutos de Porto Alegre.",
      endereco: "[PREENCHER: endereço do empreendimento] · Cachoeirinha/RS",
      // Desenho ilustrativo, fora de escala; a posição do condomínio é provisória até o endereço.
      casa: { x: 720, y: 170, texto: "Seu ponto de partida" },
      pontos: [
        { titulo: "Av. Flores da Cunha", texto: "Principal avenida da cidade", icone: "estrada", x: 560, y: 300 },
        { titulo: "Aeroporto Salgado Filho", texto: "Referência da região", icone: "pino", x: 170, y: 440 },
        { titulo: "Porto Alegre", texto: "A poucos minutos", icone: "relogio", x: 70, y: 528 },
      ],
    },
    {
      tipo: "jardins",
      secao: "sementes",
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
      tipo: "jardins",
      secao: "lupa",
      sobretitulo: "Masterplan Harmoni",
      titulo: { destaque: "Implantação" },
      planta: provisoria("masterplan"),
      legenda: legendaModeloImplantacao,
      cta: { rotulo: "Quero garantir meu lote", alvo: "contato" },
    },
    {
      tipo: "jardins",
      secao: "canteiros",
      sobretitulo: "Padrão Nova Harmonia",
      // proposta: a infraestrutura foi para o corte da rua, então o título fala do que ficou.
      titulo: { antes: "Segurança, lazer e serviços, ", destaque: "item por item" },
      itens: itensModeloHarmoni
        .filter((x) => categoria[x.icone])
        .map((x) => ({ ...x, categoria: categoria[x.icone], foto: fotoItem(x.icone) })),
      // A faixa "Condições exclusivas de lançamento!" virou o último canteiro.
      chamada: { antes: "Condições exclusivas ", destaque: "de lançamento!" },
      cta: { rotulo: "Quero saber mais!", alvo: "contato" },
    },
    {
      tipo: "jardins",
      secao: "niveis",
      sobretitulo: "Como construímos",
      titulo: { antes: "Infraestrutura a altura do padrão ", destaque: "Nova Harmonia", depois: " de qualidade" },
      imagem: corteInfraestrutura,
      itens: obraModelo,
    },
    {
      tipo: "jardins",
      secao: "colunas",
      fotos: [
        { setor: "Bairros planejados", imagem: fotoGrupo("paisagem.webp") },
        { setor: "Rede Novo Atacarejo", imagem: fotoGrupo("atacarejo.webp") },
        { setor: "Nova Harmonia", imagem: fotoGrupo("portico.webp") },
        { setor: "Shopping centers", imagem: fotoGrupo("entrada.webp") },
        { setor: "Hotéis", imagem: fotoGrupo("hotel.webp") },
        { setor: "Bairros planejados", imagem: fotoGrupo("portico-2.webp") },
      ],
    },
    {
      tipo: "jardins",
      secao: "contato",
      titulo: { antes: "Saiba detalhes ", destaque: "do Harmoni Jardins" },
      imagem: estiloDeVida.familiaJardim,
      formulario: { botao: "Quero condição de lançamento" },
    },
    { tipo: "outros" },
  ],
  legal: { registro: registroPendente(nome, cidade) },
};
