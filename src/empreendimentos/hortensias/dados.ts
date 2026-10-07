// Harmoni Hortênsias, Gravataí/RS. Copy do cliente ("Copy LP Harmoni Hortênsias"):
// a página do Jardins com as trocas marcadas. Layout próprio, revisado em
// 2026-10-07 (protótipo "Versão 4"): cores da linha Harmoni e o lote como motivo
// (seções exclusivas em ./secoes). Imagens de projeto são do Vinhedos,
// provisórias; o logo é provisório (montado com as letras dos irmãos).
import { legendasPerspectivas as L, registroPendente } from "../comum";
import { estiloDeVida, fotosNovaHarmonia, provisoria } from "../renders";
import type { Imagem, LP } from "../tipos";

const nome = "Harmoni Hortênsias";
const cidade = "Gravataí/RS";

// Foto enviada pelo cliente para o Hortênsias (família entre flores).
const familiaFlores: Imagem = { src: "/img/hortensias/familia-flores.webp", largura: 2000, altura: 1333, alt: "Família abraçada entre flores no jardim" };
// Rua do corte de infraestrutura da Nova Harmonia, só a parte de cima (sem o subsolo).
const rua: Imagem = { src: "/img/hortensias/rua.webp", largura: 1620, altura: 560, alt: "Rua arborizada com casas e iluminação em LED" };

/** Os passos de todas as rotas começam na portaria. */
const saida = "Saia pela portaria do Harmoni Hortênsias";

export const hortensias: LP = {
  slug: "hortensias",
  nome,
  cidade,
  tema: "hortensias",
  seo: {
    titulo: "Harmoni Hortênsias em Gravataí | Nova Harmonia",
    // proposta
    descricao:
      "Harmoni Hortênsias: lotes em condomínio fechado em Gravataí/RS, com portaria 24h, lazer completo e infraestrutura padrão Nova Harmonia. Cadastre-se.",
    imagem: "/img/hortensias/familia-flores.webp",
  },
  logo: {
    // Provisório: ver docs/PENDENCIAS.md.
    claro: { src: "/img/hortensias/logo/logo-03-recorte.svg", largura: 730, altura: 486 },
    escuro: { src: "/img/hortensias/logo/logo-02-recorte.svg", largura: 730, altura: 486 },
    alturaHeader: 56,
  },
  // O hero é foto em largura total: o header começa claro sobre ela.
  header: { sobre: "escuro", cta: { rotulo: "Garantir meu lote", alvo: "contato" } },
  contato: {
    // Números das LPs no ar; o oficial do Hortênsias está pendente.
    telefones: ["(51) 99719-6426", "(51) 9901-8575"],
    whatsapp: "5551997196426",
  },
  barraCelular: true,
  secoes: [
    {
      tipo: "hortensias",
      secao: "mosaico",
      // proposta: a etiqueta diz o produto; o título é da copy.
      etiqueta: "Lotes em condomínio fechado · Gravataí/RS",
      titulo: { antes: "Gravataí, ", destaque: "em sua mais bela forma." },
      // proposta
      texto: "Cada lote, um pedaço da vida aqui dentro: piscina, academia, espaço gourmet e portaria 24h.",
      imagem: familiaFlores,
      ambientes: [provisoria("portico"), provisoria("piscina"), provisoria("gourmet"), provisoria("salao"), provisoria("brinquedoteca"), provisoria("academia"), provisoria("minimercado")],
      dica: "Os ambientes se juntam e viram a família. Passe o mouse para abrir.",
      // "Cadastre-se em um novo estilo de vida." é da copy; o botão é proposta.
      formulario: { titulo: "Cadastre-se em um novo estilo de vida.", botao: "Quero garantir meu espaço" },
    },
    {
      tipo: "hortensias",
      secao: "tiras",
      sobretitulo: "Por que o Hortênsias",
      titulo: { antes: "Um condomínio fechado ", destaque: "para sua família viver no melhor!" },
      texto: "Segurança, opções de lazer e localização privilegiada. Em resumo, qualidade de vida para quem você mais ama.",
      // Os três argumentos da copy, mais a infraestrutura; textos curtos são proposta.
      itens: [
        { titulo: "Segurança", texto: "Portaria 24h, portaria de serviço e acesso controlado. As crianças brincam na rua de novo.", imagem: provisoria("portico") },
        { titulo: "Lazer pronto", texto: "Piscina, academia, salão de festas, espaço gourmet e playground. Sem sair de casa.", imagem: provisoria("piscina") },
        { titulo: "Infraestrutura", texto: "Pavimentação, redes de água, esgoto e drenagem, rede elétrica e iluminação em LED.", imagem: rua },
        { titulo: "Qualidade de vida", texto: "Perto de Gravataí e longe do barulho. Tempo de sobra para quem você mais ama.", imagem: fotosNovaHarmonia.porDoSol },
      ],
    },
    {
      tipo: "hortensias",
      secao: "cachos",
      sobretitulo: "Lazer completo",
      // proposta
      titulo: { antes: "Um projeto para ", destaque: "ter orgulho" },
      itens: [
        { ...L.portico, imagem: provisoria("portico") },
        { ...L.piscina, imagem: provisoria("piscina") },
        { ...L.gourmet, imagem: provisoria("gourmet") },
        { ...L.salao, imagem: provisoria("salaoExterno") },
        { ...L.brinquedoteca, imagem: provisoria("brinquedoteca") },
        { ...L.academia, imagem: provisoria("academia") },
        { ...L.minimercado, imagem: provisoria("minimercado") },
      ],
    },
    {
      tipo: "hortensias",
      secao: "cartoes",
      sobretitulo: "Por que garantir agora",
      // proposta (a seção toda)
      titulo: { antes: "Quem chega primeiro ", destaque: "escolhe melhor" },
      texto: "Os cartões viram sozinhos. Passe o mouse para virar o que quiser.",
      itens: [
        { titulo: "Escolha a melhor posição", texto: "Na primeira fase, você escolhe o lote, o sol e a vizinhança antes de todo mundo.", imagem: provisoria("masterplan") },
        { titulo: "Parcelas que cabem no bolso", texto: "[PREENCHER: entrada e parcelas.] Você paga o lote enquanto planeja a casa.", imagem: estiloDeVida.familiaBrincando },
        { titulo: "Um lote no seu nome", texto: "[CONFIRMAR: registro do loteamento e escritura.]", imagem: provisoria("portico") },
        { titulo: "Patrimônio num bairro planejado", texto: "Condomínio fechado, lazer completo e infraestrutura padrão Nova Harmonia.", imagem: rua },
      ],
      cta: { rotulo: "Quero escolher meu lote", alvo: "implantacao" },
    },
    {
      tipo: "hortensias",
      secao: "provas",
      sobretitulo: "Não é promessa",
      // proposta
      titulo: { antes: "Infraestrutura padrão ", destaque: "Nova Harmonia", depois: ", em obra de verdade" },
      texto: "Passe o mouse: as fotos ganham cor. São obras reais de bairros Nova Harmonia.",
      fotos: [
        { legenda: "Abertura das ruas", imagem: fotosNovaHarmonia.obra },
        { legenda: "Pavimentação e ciclovia", imagem: fotosNovaHarmonia.ciclovia },
        { legenda: "A casa da família, no lote", imagem: fotosNovaHarmonia.familiaLote },
      ],
    },
    {
      tipo: "hortensias",
      secao: "itens",
      sobretitulo: "Item por item",
      // proposta
      titulo: { antes: "Passe o mouse ", destaque: "e entre no espaço" },
      itens: [
        { titulo: "Portaria 24h", imagem: provisoria("portico") },
        { titulo: "Piscina", imagem: provisoria("piscina") },
        { titulo: "Academia", imagem: provisoria("academia") },
        { titulo: "Salão de festas", imagem: provisoria("salao") },
        { titulo: "Espaço gourmet", imagem: provisoria("gourmet2") },
        { titulo: "Brinquedoteca", imagem: provisoria("brinquedoteca") },
        { titulo: "Minimercado", imagem: provisoria("minimercado") },
      ],
    },
    {
      tipo: "hortensias",
      secao: "lotes",
      sobretitulo: "Escolha seu lote",
      // "Garanta seu espaço neste projeto!" é da copy.
      titulo: { antes: "Garanta seu espaço ", destaque: "neste projeto!" },
      texto: "Passe o mouse na planta e toque no lote que combina com você. Ele segue junto com o seu cadastro.",
      // Ilustrativo até haver a planta e a tabela de vendas do Hortênsias.
      reservados: [3, 4, 9, 14, 15, 22, 27, 31, 40, 41, 46],
      areas: { lazer: "LAZER", portaria: "PORTARIA" },
      areaLote: "[000] m²",
      nota: "Planta e disponibilidade ilustrativas",
    },
    {
      tipo: "hortensias",
      secao: "frase",
      // Trecho da copy do conceito.
      frase: { antes: "Qualidade de vida ", destaque: "para quem você mais ama." },
      imagem: estiloDeVida.meninaCachorro,
    },
    {
      tipo: "hortensias",
      secao: "rotas",
      sobretitulo: "Localização",
      // proposta
      titulo: { antes: "Do portão ", destaque: "a tudo o que importa" },
      texto: "Escolha um destino e veja o caminho saindo do Harmoni Hortênsias.",
      origem: nome,
      busca: `${nome} · Gravataí, RS`,
      // Mapa ilustrativo: posições aproximadas, tempos e vias a preencher (docs/PENDENCIAS.md).
      destinos: [
        { nome: "Centro de Gravataí", curto: "Centro", tempo: "[00] min", km: "[00] km", ponto: [622, 238], trajeto: "M700 300 C680 280 650 255 622 238", passos: [saida, "Siga pela [PREENCHER: via de acesso]", "Chegada ao centro de Gravataí"] },
        { nome: "RS-118", curto: "RS-118", tempo: "[00] min", km: "[00] km", ponto: [441, 318], trajeto: "M700 300 C640 312 540 322 441 318", passos: [saida, "Siga pela [PREENCHER: via de acesso]", "Acesse a RS-118"] },
        { nome: "Freeway (BR-290)", curto: "Freeway", tempo: "[00] min", km: "[00] km", ponto: [700, 463], trajeto: "M700 300 C712 360 706 410 700 463", passos: [saida, "Siga pela [PREENCHER: via de acesso]", "Acesse a Freeway (BR-290)"] },
        { nome: "Aeroporto Salgado Filho", curto: "Aeroporto", tempo: "[00] min", km: "[00] km", ponto: [220, 362], trajeto: "M700 300 C640 312 540 322 441 318 C400 330 300 352 220 362", passos: [saida, "Siga pela [PREENCHER: via principal]", "Chegada ao Aeroporto Salgado Filho"] },
        { nome: "Porto Alegre", curto: "Porto Alegre", tempo: "[00] min", km: "[00] km", ponto: [70, 430], trajeto: "M700 300 C712 360 706 410 700 463 C500 470 300 462 150 452 C110 446 85 440 70 430", passos: [saida, "Acesse a Freeway (BR-290)", "Siga sentido Porto Alegre"] },
      ],
      rotulos: { rs118: "RS-118", freeway: "BR-290 · FREEWAY", rio: "Rio Gravataí", capital: "PORTO ALEGRE", centro: "CENTRO DE GRAVATAÍ" },
      escala: "[1] km",
      aviso: "Mapa ilustrativo, fora de escala · [PREENCHER: endereço, tempos e distâncias]",
      // Busca a cidade até haver o endereço.
      maps: "https://www.google.com/maps/search/?api=1&query=Gravata%C3%AD%20RS",
    },
    {
      tipo: "hortensias",
      secao: "stand",
      sobretitulo: "Quem faz",
      titulo: { antes: "Um projeto ", destaque: "Nova Harmonia" },
      texto: "Confie em quem é referência nacional em empreendimentos de qualidade.",
      imagem: fotosNovaHarmonia.stand,
      // proposta
      cta: { rotulo: "Agendar visita ao stand", alvo: "contato" },
    },
    {
      tipo: "hortensias",
      secao: "duvidas",
      sobretitulo: "Dúvidas",
      // proposta (a seção toda)
      titulo: { antes: "Antes de ", destaque: "escolher seu lote" },
      perguntas: [
        { pergunta: "Quais são as condições de pagamento?", resposta: "[PREENCHER: entrada, parcelas e correção.] A simulação sai pelo WhatsApp." },
        { pergunta: "Tenho prazo para construir?", resposta: "[PREENCHER]" },
        { pergunta: "Quando o condomínio fica pronto?", resposta: "[PREENCHER]" },
        { pergunta: "Dá para visitar o terreno?", resposta: "Sim, com um consultor. [PREENCHER: endereço do stand.]" },
      ],
    },
    {
      tipo: "hortensias",
      secao: "contato",
      // Troca do cliente: "Quero aproveitar" virou "O futuro lar da sua família está aqui".
      sobretitulo: "O futuro lar da sua família está aqui",
      // Troca do cliente: "Saiba detalhes do Harmoni Jardins".
      titulo: { antes: "Conheça em detalhes ", destaque: "o Harmoni Hortênsias" },
      imagem: estiloDeVida.familiaBrincando,
      formulario: { botao: "Quero saber mais!" },
    },
    { tipo: "outros" },
  ],
  legal: { registro: registroPendente(nome, cidade) },
};
