// Harmoni Arbore, Cachoeirinha/RS. Copy do cliente ("Copy LP Harmoni Arbore.pdf")
// sobre a base do Jardins. O nome segue o logo e a copy: "Arbore", sem acento.
import { corteInfraestrutura, itensModeloHarmoni, legendaModeloImplantacao, legendasPerspectivas as L, obraModelo, registroPendente } from "../comum";
import { estiloDeVida, provisoria } from "../renders";
import type { LP } from "../tipos";

const nome = "Harmoni Arbore";
const cidade = "Cachoeirinha/RS";
const lote = { rotulo: "Quero garantir meu lote", alvo: "contato" };

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
    imagem: "/img/vinhedos/perspectivas/portico-original.webp",
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
  secoes: [
    {
      tipo: "hero",
      variante: "editorial",
      titulo: { antes: "Viva com grande estilo ", destaque: "em Cachoeirinha" },
      texto: "O lar ideal está um clique de distância.",
      imagem: provisoria("portico"),
      tituloCartao: { antes: "O lar ideal está ", destaque: "um clique de distância." },
      formulario: { botao: "Quero garantir meu lote" },
    },
    {
      tipo: "conceito",
      variante: "colagem",
      sobretitulo: nome,
      titulo: { antes: "O padrão de vida que sua família merece ", destaque: "está aqui!" },
      paragrafos: [
        "O Harmoni Arbore chegou para oferecer um lar completo, da segurança de um condomínio fechado, aos espaços de lazer que trazem mais qualidade de vida para toda a família.",
        "Escolha o melhor ambiente pra se viver em Cachoeirinha, com fácil acesso a importantes vias e a poucos minutos de Porto Alegre.",
      ],
      imagens: [estiloDeVida.familiaArLivre, provisoria("salaoExterno")],
      cta: { rotulo: "Quero saber mais!", alvo: "contato" },
    },
    {
      tipo: "conceito",
      variante: "manifesto",
      fundo: "creme",
      icone: "folha",
      titulo: { antes: "Tenha muito ", destaque: "mais que um lar" },
      paragrafos: [
        "Assim como a araucária marca a paisagem do Sul com sua presença imponente, o Harmoni Arbore nasce para ser o lugar onde sua família cria raízes de verdade — permanência, pertencimento e qualidade de vida em harmonia com o que importa.",
      ],
      cta: { rotulo: "Aproveite o momento de tomar a melhor decisão", alvo: "contato" },
    },
    {
      tipo: "perspectivas",
      carrossel: "pilha",
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
      tipo: "diferenciais",
      variante: "lista",
      sobretitulo: "Padrão Nova Harmonia",
      titulo: { antes: "Infraestrutura e lazer, ", destaque: "item por item" },
      itens: itensModeloHarmoni,
      cta: lote,
    },
    {
      tipo: "localizacao",
      cabecalho: "centro",
      sobretitulo: "Localização",
      // proposta (a partir da copy do cliente)
      titulo: { antes: "Fácil acesso a importantes vias, ", destaque: "perto de Porto Alegre" },
      texto:
        "Escolha o melhor ambiente pra se viver em Cachoeirinha, com fácil acesso a importantes vias e a poucos minutos de Porto Alegre.",
      mapa: {
        variante: "radar",
        endereco: "[PREENCHER: endereço do empreendimento] · Cachoeirinha/RS",
        pontos: [
          { titulo: "Importantes vias de acesso", texto: "Fácil acesso", icone: "estrada", x: "22%", y: "30%" },
          { titulo: "Porto Alegre", texto: "A poucos minutos", icone: "relogio", x: "78%", y: "28%" },
          { titulo: "Centro de Cachoeirinha", texto: "Comércio e serviços", icone: "sacola", x: "70%", y: "76%" },
        ],
      },
    },
    {
      tipo: "implantacao",
      variante: "lateral",
      sobretitulo: "Masterplan Harmoni",
      titulo: { destaque: "Implantação" },
      planta: provisoria("masterplan"),
      legenda: legendaModeloImplantacao,
      cta: lote,
    },
    {
      tipo: "chamada",
      variante: "linha",
      titulo: { antes: "Fique por dentro de tudo ", destaque: "do Harmoni Arbore" },
      cta: { rotulo: "Quero saber mais!", alvo: "contato" },
    },
    {
      tipo: "obra",
      variante: "centro",
      sobretitulo: "Como construímos",
      titulo: { antes: "Infraestrutura a altura do padrão ", destaque: "Nova Harmonia", depois: " de qualidade" },
      imagem: corteInfraestrutura,
      itens: obraModelo,
    },
    { tipo: "grupo", variante: "centro", fundo: "areia" },
    {
      tipo: "contato",
      variante: "escuro",
      titulo: { antes: "O lar ideal está ", destaque: "um clique de distância." },
      formulario: { botao: "Quero condição de lançamento" },
    },
  ],
  legal: { registro: registroPendente(nome, cidade) },
};
