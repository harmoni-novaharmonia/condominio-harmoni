// Conteúdo da Nova Harmonia que é igual em todas as LPs (menu, formulário,
// grupo SFA, memorial). Nada aqui pode ser de um empreendimento específico:
// registro, telefone e cidade ficam no dados.ts de cada um.
import type { Arquivo, Imagem, Item, Link } from "./tipos";

export const menuPadrao: Link[] = [
  { rotulo: "Localização", alvo: "localizacao" },
  { rotulo: "Perspectivas", alvo: "perspectivas" },
  { rotulo: "Implantação", alvo: "implantacao" },
  { rotulo: "Diferenciais", alvo: "diferenciais" },
  { rotulo: "Contato", alvo: "contato" },
];

export const textosHeader = {
  abrir: "Abrir menu",
  fechar: "Fechar menu",
  whatsapp: "WhatsApp",
  inicio: "voltar ao início",
};

export const textosFormulario = {
  campos: {
    nome: { rotulo: "Nome completo", placeholder: "Seu nome completo" },
    telefone: { rotulo: "Telefone", placeholder: "(00) 00000-0000" },
    email: { rotulo: "Email", placeholder: "voce@email.com" },
  },
  // Texto do cliente, igual ao das LPs no ar.
  aceite:
    "Aceito receber via Whatsapp, ligação, email e outras formas de contato da NOVA HARMONIA, com ações de marketing, ofertas de produto e serviços. Estou de acordo com as formas de tratamento de dados realizados pela NOVA HARMONIA, conforme sua Politica de Privacidade.",
  enviando: "Enviando...",
  erroCampos: "Preencha nome, telefone e email e marque o aceite para continuar.",
  sucesso: "Recebemos seu contato. Um consultor vai falar com você em breve.",
  falha: "Não conseguimos registrar seu contato pelo site agora. Fale direto com um consultor pelo WhatsApp:",
  falhaCta: "Chamar no WhatsApp",
  mensagemWhatsapp: (empreendimento: string, nome: string) =>
    `Olá! Sou ${nome || "interessado(a)"} e quero saber mais sobre o ${empreendimento}.`,
  interesseLote: (lote: string) => ` Tenho interesse no lote ${lote}.`,
};

export const textosGerais = {
  imagemProvisoria: "Imagem provisória",
  anterior: "Anterior",
  proxima: "Próxima",
  legenda: "Legenda",
  endereco: "Endereço",
  aproximar: "Aproximar",
  afastar: "Afastar",
  mapaIlustrativo: "Mapa ilustrativo.",
  radarDica: "Toque nos pontos do radar. Posições ilustrativas.",
  rotaDica: "Clique ou toque nas paradas",
  lequeDica: "Toque ou passe o mouse para abrir cada ambiente.",
  pilhaDica: "Toque na foto para passar para a próxima.",
};

const G = "/img/nova-harmonia/grupo";
const foto = (arquivo: string, largura: number, altura: number, alt: string): Imagem => ({
  src: `${G}/${arquivo}`,
  largura,
  altura,
  alt,
});

export const marcasGrupo: Record<"novaHarmonia" | "sfa", Arquivo & { alt: string }> = {
  novaHarmonia: { src: "/img/nova-harmonia/logo-vertical.svg", largura: 266, altura: 157, alt: "Nova Harmonia Bairros Planejados" },
  sfa: { src: `${G}/logo-grupo-sfa.webp`, largura: 800, altura: 371, alt: "Grupo SFA" },
};

// Textos do cliente, verbatim das LPs no ar.
export const grupo = {
  chamada: { antes: "Confie em quem é referência nacional em ", destaque: "empreendimentos de qualidade." },
  frase: { antes: "Uma grande história ", destaque: "não se escreve da noite para o dia" },
  paragrafos: [
    "No DNA da Nova Harmonia, estão a solidez e os valores do Grupo São Francisco de Assis, um gigante com atuação nacional em diversos setores: Dentro da solidez do grupo, a Nova Harmonia Bairros Planejados, uma empresa com história para contar e um Brasil a desenvolver. Entendemos de Brasil, estamos de Norte a Sul e compreendemos cada país que existe dentro do Brasil. Entendemos de gente e do negócio. Um modelo de desenvolvimento urbano sustentável, eficiente e replicável às diferentes características, regiões e cidades do Brasil.",
    "Levamos a oportunidade de um brasileiro poder conquistar seu lugar no mundo, ter um imóvel para poder chamar de seu, seja para investir ou construir para morar.",
  ],
  setores: [
    "Bairros planejados",
    "Shopping centers",
    "Construção civil",
    "Agronegócio",
    "Rede Novo Atacarejo",
    "Hotéis",
    "Faculdades",
  ],
  fotos: [
    foto("paisagem.webp", 537, 417, "Paisagismo em empreendimento da Nova Harmonia"),
    foto("portico-2.webp", 525, 417, "Portaria de bairro planejado"),
    foto("atacarejo.webp", 525, 408, "Loja da Rede Novo Atacarejo"),
    foto("entrada.webp", 531, 417, "Entrada de empreendimento do grupo"),
    foto("portico.webp", 525, 414, "Pórtico com o símbolo da Nova Harmonia"),
    foto("hotel.webp", 522, 411, "Hotel do grupo"),
  ],
  rotuloFotos: "Empreendimentos do grupo",
};

export const missao = {
  titulo: "Uma grande história com a nobre missão de urbanizar com harmonia",
  texto:
    "Planejamos e executamos projetos urbanísticos únicos, contribuindo com melhorias urbanas nas cidades aonde chegamos. Elevamos padrões construtivos e realizamos sonhos criando soluções sustentáveis que proporcionam mais qualidade de vida para quem escolhe nossos empreendimentos como LAR.",
  frase: "Um projeto de futuro para as cidades. Um projeto de vida para as pessoas.",
  foto: {
    src: "/img/nova-harmonia/obra/familia-por-do-sol.webp",
    largura: 1060,
    altura: 1080,
    alt: "Família caminhando de mãos dadas ao pôr do sol",
  } satisfies Imagem,
  mapa: {
    src: "/img/nova-harmonia/obra/mapa-brasil.webp",
    largura: 1150,
    altura: 1080,
    alt: "Mapa do Brasil com os estados onde a Nova Harmonia atua",
  } satisfies Imagem,
};

export const corteInfraestrutura: Imagem = {
  src: "/img/nova-harmonia/obra/corte-infraestrutura.webp",
  largura: 1620,
  altura: 1080,
  alt: "Corte da rua mostrando pavimentação, meio-fio, drenagem e redes de água e esgoto",
};

export const rodapeTextos = {
  contato: "Telefones para contato",
  navegue: "Navegue",
  redes: "Siga a Nova Harmonia",
  stand: "Stand de vendas",
  falar: "Quero falar com um consultor",
  chamada: "Fale com um consultor",
  apoio: "Tire suas dúvidas sobre lotes e condições direto pelo WhatsApp.",
  topo: "Voltar ao topo",
  legalTitulo: "Memorial e informações legais",
  copyright: "Nova Harmonia Bairros Planejados. Imagens meramente ilustrativas.",
  privacidade: { rotulo: "Política de Privacidade", href: "#" },
  institucional: { rotulo: "novaharmonia.com.br", href: "https://novaharmonia.com.br/" },
  vitrine: { rotulo: "Todos os Harmonis", href: "/" },
};

export type RedeSocial = { nome: string; href: string; icone: "instagram" | "facebook" | "linkedin" };

// URLs pendentes (docs/PENDENCIAS.md).
export const redes: RedeSocial[] = [
  { nome: "Instagram", href: "#", icone: "instagram" },
  { nome: "Facebook", href: "#", icone: "facebook" },
  { nome: "LinkedIn", href: "#", icone: "linkedin" },
];

// Memorial padrão da Nova Harmonia, verbatim do rodapé das LPs no ar.
// A frase de registro (matrícula/cartório) NÃO está aqui: é de cada empreendimento.
export const memorialPadrao =
  "Sempre que houver dificuldades por ocasião da contratação e/ou aquisição de produtos e/ou serviços, possibilidades de aplicação e/ou serviços resultantes de novos lançamentos/inovações, tecnologias ou, ainda, necessidades de atendimento a exigências dos poderes públicos ou concessionárias de serviços públicos, fica reservado à nova harmonia o direito de proceder às alterações nas especificações estabelecidas no memorial descritivo, mantendo-se desempenho técnico e características visuais equivalentes, bem como a funcionalidade ora pretendida. 1 – Para os itens onde constam alternativas de materiais e/ou acabamentos, a escolha da opção a ser adotada nas áreas comuns ficará a critério da nova harmonia. 2 – As imagens, ilustrações, artes, perspectivas, plantas humanizadas, maquete apresentada no stand de vendas, folders, material publicitário, outdoors, anúncios ou qualquer outra forma são ilustrativas e artísticas, podendo apresentar variações em relação à obra final em função do desenvolvimento dos projetos executivos, da necessidade de adequabilidades técnicas ou do atendimento a postulados legais. 3 – As vegetações, paisagismo, mobiliário, itens de decoração, itens não relacionados neste memorial retratados nas imagens, ilustrações, artes, perspectivas, plantas humanizadas, maquete apresentada no stand de vendas, folders, material publicitário, outdoors, anúncios ou qualquer outra forma de veiculação, são meramente ilustrativas e artísticas. 4 – Os materiais com características naturais, tais como pedras, granitos, mármores e madeiras, estão sujeitos a variações de tonalidades, cor e veios, bem como diferença entre peças, em função de serem provenientes da natureza, podendo ser utilizados materiais sintéticos, adesivos, mantendo-se as características visuais. 5 – As dimensões dos revestimentos de piso e parede utilizadas como referências no memorial são dimensões comerciais, que podem sofrer variações de acordo com a marca escolhida. 6 – Eventualmente, para atendimento de necessidades técnicas, poderão ser executados shafts, enchimentos, forros e/ou sancas de gesso, sendo tolerável a variação para menos de pés-direitos e dos ambientes, bem como poderão ser alteradas as posições de peças sanitárias. 7 – Os equipamentos estão sujeitos à disponibilidade dos fabricantes quando da entrega do empreendimento, portanto, poderão ocorrer alterações de modelo e/ou materiais, mas com funções, desempenhos e visual similares. 8 – Conforme legislação, as dimensões aqui constantes poderão sofrer uma variação, tanto para mais quanto para menos, de até 5% (cinco por cento). 9 – O paisagismo será composto por árvores, palmeiras, arbustos e forrações de pequeno porte em formação, estando a cargo da administração do condomínio a manutenção da vegetação para preservação do que foi plantado e entregue. o paisagismo das praças de uso comum será composto por palmeiras, árvores e forrações em grama. as vegetações retratadas nas perspectivas, materiais de venda e maquete são meramente ilustrativas e representam o porte adulto das espécies. a floração do paisagismo depende da época de floração de cada espécie. serão entregues mudas de pequeno porte (em formação) e poderão apresentar diferença de espécie, de acordo com a disponibilidade dos fornecedores. 10 – A manutenção das áreas comuns do empreendimento, tais como áreas de lazer, quadra poliesportiva, quadra de areia, academia, brinquedoteca, salao de festas, espaço gourmet, pista de cooper, piscinas quiosques, portaria social, portaria de serviço, mercadinho, car center, ruas, muros e áreas dentro do perímetro do condomínio, estão a cargo e responsabilidade da administração do condomínio. 11 – As calçadas do empreendimento deverão ser construídas pelos proprietários de cada lote de acordo com os normativos da convenção. Assim, prevalecerá sobre as ilustrações, maquete e textos dos folhetos de venda, o acabamento previsto neste memorial descritivo que, rubricado entre as partes, é parte integrante do contrato particular de compromisso de compra e venda de imóvel.";


// Lista "item por item" das LPs no ar (modelo do Jardins). Cada empreendimento
// confirma a sua; ver docs/PENDENCIAS.md.
export const itensModeloHarmoni: Item[] = [
  { titulo: "Portaria 24h", icone: "portaria" },
  { titulo: "Portaria de serviço", icone: "chave" },
  { titulo: "Quadra poliesportiva", icone: "quadra" },
  { titulo: "Academia", icone: "academia" },
  { titulo: "Piscina", icone: "piscina" },
  { titulo: "Playground", icone: "playground" },
  { titulo: "Salão de festas", icone: "salao" },
  { titulo: "Espaço gourmet", icone: "gourmet" },
  { titulo: "Pet place", icone: "petplace" },
  { titulo: "Minimercado", icone: "mercado" },
  { titulo: "Espaço car care", icone: "carro" },
  { titulo: "Rede de água", icone: "rede-de-agua" },
  { titulo: "Rede elétrica", icone: "rede-eletrica" },
  { titulo: "Iluminação em LED", icone: "iluminacao-led" },
];

// "Como construímos": infraestrutura padrão Nova Harmonia (lista das LPs no ar).
export const obraModelo: Item[] = [
  { titulo: "Pavimentação", icone: "pavimentacao" },
  { titulo: "Meio-fio com sarjeta", icone: "meio-fio-com-sarjeta" },
  { titulo: "Rede de água", icone: "rede-de-agua" },
  { titulo: "Rede de esgoto", icone: "rede-de-esgoto" },
  { titulo: "Rede de drenagem", icone: "rede-de-drenagem" },
  { titulo: "Rede elétrica", icone: "rede-eletrica" },
  { titulo: "Iluminação pública em LED", icone: "iluminacao-led" },
];

// Perspectivas com as legendas das LPs no ar.
export const legendasPerspectivas = {
  portico: { nome: "Pórtico principal", texto: "Acesso seguro e monumental" },
  piscina: { nome: "Piscina infantil", texto: "Lazer refrescante para a família" },
  salao: { nome: "Salão de festas", texto: "Momentos inesquecíveis celebrados" },
  gourmet: { nome: "Espaço gourmet", texto: "Gastronomia e sofisticação" },
  brinquedoteca: { nome: "Brinquedoteca", texto: "Diversão lúdica com segurança" },
  minimercado: { nome: "Minimercado", texto: "Praticidade a poucos passos" },
  academia: { nome: "Academia", texto: "Equipamentos modernos e vista livre" },
};

// Legenda da implantação nas LPs no ar.
export const legendaModeloImplantacao: Item[] = [
  { titulo: "Portaria Monumental", icone: "portaria" },
  { titulo: "Salão de Festas", icone: "salao" },
  { titulo: "Espaço Gourmet", icone: "gourmet" },
  { titulo: "Quadra Poliesportiva", icone: "quadra" },
  { titulo: "Complexo Aquático (Piscina)", icone: "piscina" },
  { titulo: "Playground Lúdico", icone: "playground" },
];

export const tracado = {
  petroleo: "/img/nova-harmonia/tracado-petroleo.svg",
  creme: "/img/nova-harmonia/tracado-creme.svg",
  laranja: "/img/nova-harmonia/tracado-laranja.svg",
};

export const registroPendente = (nome: string, cidade: string) =>
  `[PREENCHER: registro do ${nome}, com matrícula, cartório de registro de imóveis e aprovação da prefeitura de ${cidade}.]`;

// ---------- Revisão de Essenza e Vale (2026-10-05) ----------
// Textos dos componentes novos (formulário em duas etapas, tela cheia, corte, planta etc.).

export const textosEtapas = {
  etapa: (n: number, total: number) => `Etapa ${n} de ${total}`,
  campos: {
    nome: { rotulo: "Nome completo", placeholder: "Seu nome completo" },
    telefone: { rotulo: "Telefone / WhatsApp", placeholder: "(00) 00000-0000" },
    email: { rotulo: "Email", placeholder: "voce@email.com" },
  },
  continuar: "Continuar",
  voltar: "Voltar",
  erroNome: "Escreva seu nome completo.",
  erroTelefone: "Confira o telefone com DDD.",
  erroEmail: "Confira o email.",
  erroAceite: "Marque o aceite para continuar.",
};

export const textosInteracao = {
  ampliar: "Ampliar",
  telaCheia: "Ver em tela cheia",
  fechar: "Fechar",
  arraste: "Arraste",
  arrasteRotulo: "Perspectivas, arraste para o lado",
  copiar: "Copiar",
  copiado: "Copiado",
  selecionado: "Selecionado",
  prefereConversar: "Prefere conversar agora?",
  chamarWhatsapp: "Chamar no WhatsApp",
  mapaForaEscala: "Mapa ilustrativo, fora de escala.",
  dicaCorte: "Toque nos números da imagem ou na lista.",
  dicaPlanta: "Arraste para mover · use + e −",
  plantaInteira: "Ver planta inteira",
  itens: (n: number) => `${n} ${n > 1 ? "itens" : "item"}`,
  norte: "N",
  // Jardins e Arbore (2026-10-06)
  escolherAmbiente: "Escolher ambiente",
  perspectivasAmpliar: "Perspectivas. Clique na foto para ampliar.",
  dicaLupa: "Passe o mouse para ver os lotes de perto",
  plantaTelaCheia: "Ver em tela cheia ⤢",
  dicaCanteiros: "Passe o mouse num item para abrir a foto do espaço.",
  superficie: "↑ Na superfície",
  subsolo: "↓ Embaixo da rua",
  ver: (nome: string) => `Ver ${nome}`,
  ampliarNome: (nome: string) => `Ampliar ${nome}`,
  dicaMosaico: "Clique numa foto pequena para trazê-la para cá.",
  ordemDestinos: "Do mais perto ao mais longe. Ordem ilustrativa.",
  dicaAnotado: "Do poste ao subsolo. Toque num número ou numa legenda.",
  lotesPorEmpreendimento: "Lotes por empreendimento",
  fotoInstitucional: "Foto institucional Nova Harmonia",
  // Hortênsias (2026-10-07)
  dicaCachos: "Arraste, use as setas ou toque numa foto do lado.",
  rotuloCachos: "Perspectivas. Toque na foto do meio para ampliar.",
  categorias: "Categorias",
  // Hortênsias, revisão (2026-10-07)
  rotuloPlanta: "Planta ilustrativa com os lotes",
  rotuloDestinos: "Destinos",
  rotuloMapa: (destino: string) => `Mapa ilustrativo com a rota até ${destino}`,
  deCarro: "De carro · rota mais rápida",
  abrirMaps: "Abrir no Google Maps",
  aproximar: "Aproximar",
  afastar: "Afastar",
  sua: "Sua escolha",
  vendo: "Você está vendo",
  quadra: "Quadra",
  area: "Área",
  situacao: "Situação",
  disponivel: "Disponível",
  disponivelSua: "Disponível · sua escolha",
  reservado: "Reservado",
  legendaLotes: ["Disponível", "Reservado", "Sua escolha"],
  queroLote: (n: string) => `Quero o lote ${n}`,
  lote: (n: string) => `Lote ${n}`,
  seuInteresse: "Seu interesse:",
  trocar: "trocar",
  irPara: (nome: string) => `Ir para ${nome}`,
};

// Números publicados em novaharmonia.com.br (docs/CONTEUDO-FONTE.md).
export const numerosGrupo = {
  rotulo: "lotes",
  fonte: "Números publicados em novaharmonia.com.br.",
  itens: [
    { nome: "Parque Harmonia", cidade: "Viamão/RS", lotes: 1369 },
    { nome: "Villa Imperial", cidade: "Teresina/PI", lotes: 1895 },
    { nome: "Reserva Harmonia Caruaru", cidade: "Caruaru/PE", lotes: 1181 },
    { nome: "The One – Edição Maranhão", cidade: "Raposa/MA", lotes: 341 },
  ],
};

// Onde cada camada aparece no corte da rua (% da imagem de 1620x1080).
export const camadasCorte: Partial<Record<Item["icone"], { x: number; y: number }>> = {
  "iluminacao-led": { x: 41.6, y: 13.4 },
  "rede-eletrica": { x: 36.6, y: 7.2 },
  pavimentacao: { x: 49.4, y: 58 },
  "meio-fio-com-sarjeta": { x: 23.2, y: 66.4 },
  "rede-de-agua": { x: 5.8, y: 71 },
  "rede-de-esgoto": { x: 14.2, y: 73.8 },
  "rede-de-drenagem": { x: 50.3, y: 87.5 },
};

export const textosOutros = {
  sobretitulo: "Nova Harmonia no Rio Grande do Sul",
  titulo: { antes: "Conheça os outros ", destaque: "Harmonis" },
  ver: "Ver a página",
};

// Missão com o trecho final em destaque e o selo do institucional (docs/CONTEUDO-FONTE.md).
export const missaoDestaque = {
  selo: "Presente nas 5 regiões do país",
  titulo: { antes: "Uma grande história com a nobre missão de ", destaque: "urbanizar com harmonia" },
};
