// Harmoni Arbore, Cachoeirinha/RS. Copy do cliente ("Copy LP Harmoni Arbore.pdf")
// sobre a base do Jardins. O nome segue o logo e a copy: "Arbore", sem acento.
// Layout da revisão aprovada em 2026-10-06: papel, nogueira e laranja, com a
// madeira em ripas e o crescimento de baixo para cima (seções exclusivas em ./secoes).
import { corteInfraestrutura, itensModeloHarmoni, legendaModeloImplantacao, legendasPerspectivas as L, obraModelo, registroPendente, textosInteracao } from "../comum";
import { estiloDeVida, fotosNovaHarmonia, provisoria } from "../renders";
import type { LP } from "../tipos";

const nome = "Harmoni Arbore";
const cidade = "Cachoeirinha/RS";
const lote = { rotulo: "Quero garantir meu lote", alvo: "contato" };
// Grupos dos 14 itens do modelo (proposta). Infraestrutura (água, elétrica, LED)
// fica no corte da rua, logo abaixo dos diferenciais.
const itensDe = (...icones: string[]) => itensModeloHarmoni.filter((x) => icones.includes(x.icone));

export const arbore: LP = {
  slug: "arbore",
  nome,
  cidade,
  tema: "arbore",
  seo: {
    titulo: "Harmoni Arbore em Cachoeirinha | Lançamento Nova Harmonia",
    // proposta
    descricao:
      "Harmoni Arbore: condomínio horizontal em Cachoeirinha/RS, com segurança de condomínio fechado e lazer para toda a família, a poucos minutos de Porto Alegre.",
    imagem: "/img/vinhedos/perspectivas/piscina-infantil.webp",
  },
  logo: {
    claro: { src: "/img/arbore/logo/logo-03-recorte.svg", largura: 730, altura: 486 },
    escuro: { src: "/img/arbore/logo/logo-02-recorte.svg", largura: 730, altura: 486 },
    alturaHeader: 56,
  },
  header: { sobre: "claro", cta: { rotulo: "Garantir meu lote", alvo: "contato" } },
  contato: {
    telefones: ["(51) 99719-6426", "(51) 9901-8575"],
    whatsapp: "5551997196426",
  },
  barraCelular: true,
  secoes: [
    {
      tipo: "arbore",
      secao: "ripas",
      titulo: { antes: "Viva com grande estilo ", destaque: "em Cachoeirinha" },
      texto: "O lar ideal está um clique de distância.",
      imagem: provisoria("piscina"),
      formulario: { botao: "Quero garantir meu lote" },
    },
    {
      tipo: "arbore",
      secao: "fresta",
      sobretitulo: nome,
      titulo: { antes: "O padrão de vida que sua família merece ", destaque: "está aqui!" },
      // O segundo parágrafo da copy (vias e Porto Alegre) está na Localização.
      paragrafos: [
        "O Harmoni Arbore chegou para oferecer um lar completo, da segurança de um condomínio fechado, aos espaços de lazer que trazem mais qualidade de vida para toda a família.",
      ],
      imagem: estiloDeVida.familiaArLivre,
      // Os três argumentos saem do próprio parágrafo.
      fatos: [
        { titulo: "Segurança de condomínio fechado", icone: "portaria" },
        { titulo: "Espaços de lazer", icone: "piscina" },
        { titulo: "Qualidade de vida para toda a família", icone: "folha" },
      ],
      cta: { rotulo: "Quero saber mais!", alvo: "contato" },
    },
    {
      tipo: "arbore",
      secao: "persiana",
      titulo: { antes: "Tenha muito ", destaque: "mais que um lar" },
      // O travessão veio na copy do cliente (docs/PENDENCIAS.md).
      paragrafos: [
        "Assim como a araucária marca a paisagem do Sul com sua presença imponente, o Harmoni Arbore nasce para ser o lugar onde sua família cria raízes de verdade — permanência, pertencimento e qualidade de vida em harmonia com o que importa.",
      ],
      // Família num lote de outro bairro Nova Harmonia: prova do grupo até haver foto do Arbore.
      imagem: fotosNovaHarmonia.familiaLote,
      credito: textosInteracao.fotoInstitucional,
      cta: { rotulo: "Aproveite o momento de tomar a melhor decisão", alvo: "contato" },
    },
    {
      tipo: "arbore",
      secao: "galhos",
      sobretitulo: "Localização",
      // proposta (a partir da copy do cliente)
      titulo: { antes: "Fácil acesso a importantes vias, ", destaque: "perto de Porto Alegre" },
      texto:
        "Escolha o melhor ambiente pra se viver em Cachoeirinha, com fácil acesso a importantes vias e a poucos minutos de Porto Alegre.",
      endereco: "[PREENCHER: endereço do empreendimento] · Cachoeirinha/RS",
      partida: "Seu ponto de partida",
      // Do mais perto ao mais longe; a ordem é ilustrativa até o endereço ser confirmado.
      pontos: [
        { titulo: "Centro de Cachoeirinha", texto: "Comércio e serviços", icone: "sacola" },
        { titulo: "Importantes vias de acesso", texto: "Fácil acesso", icone: "estrada" },
        { titulo: "Porto Alegre", texto: "A poucos minutos", icone: "relogio" },
      ],
    },
    {
      tipo: "arbore",
      secao: "mosaico",
      sobretitulo: "Perspectivas",
      // proposta
      titulo: { antes: "Lazer completo, ", destaque: "do pórtico à academia" },
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
      tipo: "arbore",
      secao: "lado",
      sobretitulo: "Masterplan Harmoni",
      titulo: { destaque: "Implantação" },
      planta: provisoria("masterplan"),
      legenda: legendaModeloImplantacao,
      cta: lote,
    },
    {
      tipo: "arbore",
      secao: "gavetas",
      sobretitulo: "Padrão Nova Harmonia",
      // proposta ("um lar completo" vem da copy)
      titulo: { antes: "Um lar completo, ", destaque: "item por item" },
      grupos: [
        { titulo: "Segurança", imagem: provisoria("portico"), itens: itensDe("portaria", "chave") },
        { titulo: "Lazer", imagem: provisoria("piscina"), itens: itensDe("quadra", "academia", "piscina", "playground", "salao", "gourmet", "petplace") },
        { titulo: "Serviços", imagem: provisoria("minimercado"), itens: itensDe("mercado", "carro") },
      ],
      aberta: 1,
      cta: lote,
    },
    {
      tipo: "arbore",
      secao: "anotado",
      sobretitulo: "Como construímos",
      titulo: { antes: "Infraestrutura a altura do padrão ", destaque: "Nova Harmonia", depois: " de qualidade" },
      imagem: corteInfraestrutura,
      itens: obraModelo,
    },
    { tipo: "arbore", secao: "barras" },
    {
      tipo: "arbore",
      secao: "contato",
      // A chamada "Fique por dentro de tudo do Harmoni Arbore" virou o título do contato.
      titulo: { antes: "Fique por dentro de tudo ", destaque: "do Harmoni Arbore" },
      imagem: provisoria("salao"),
      formulario: { botao: "Quero condição de lançamento" },
    },
    { tipo: "outros" },
  ],
  legal: { registro: registroPendente(nome, cidade) },
};
