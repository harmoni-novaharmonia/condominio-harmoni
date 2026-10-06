// Harmoni Vinhedos, Viamão/RS. A página é a LP no ar (condominioharmoni.com.br)
// copiada seção por seção: mesmos textos, fotos, ícones e ordem. Só o header e o
// rodapé são os do projeto. Textos verbatim, inclusive o que está sinalizado em
// docs/PENDENCIAS.md.
import { corteInfraestrutura, grupo, marcasGrupo, missao } from "../comum";
import { render } from "../renders";
import type { Arquivo, LP } from "../tipos";
import type { IconeNoAr } from "./tipos";

const V = "/img/vinhedos";

// Ícones ilustrados da página no ar (dimensões do viewBox de cada SVG).
const ic = (titulo: string, arquivo: string, largura: number, altura: number): IconeNoAr => ({
  titulo,
  icone: { src: `${V}/icones/${arquivo}.svg`, largura, altura } satisfies Arquivo,
});

const lote = { rotulo: "Quero escolher meu lote", alvo: "contato" };

export const vinhedos: LP = {
  slug: "vinhedos",
  nome: "Harmoni Vinhedos",
  cidade: "Viamão/RS",
  tema: "vinhedos",
  seo: {
    titulo: "Condomínio Harmoni em Viamão | Lançamento Nova Harmonia",
    // proposta
    descricao:
      "Harmoni Vinhedos: condomínio horizontal em Viamão/RS com lotes a partir de 160m², segurança, lazer completo e o padrão Nova Harmonia.",
    imagem: `${V}/hero/fundo.webp`,
  },
  logo: {
    claro: { src: "/harmoni-logos-gerais/harmoni-logo-petroleo.svg", largura: 1799, altura: 340 },
    escuro: { src: "/harmoni-logos-gerais/harmoni-logo-creme.svg", largura: 1799, altura: 340 },
    alturaHeader: 30,
  },
  header: { sobre: "escuro", cta: { rotulo: "Garantir meu lote", alvo: "contato" } },
  contato: {
    telefones: ["(51) 99719-6426", "(51) 9901-8575"],
    whatsapp: "5551997196426",
    // Endereço do stand na LP no ar; confirmar (docs/PENDENCIAS.md).
    stand: "Av. Senador Salgado Filho, 7700, Viamão/RS",
  },
  secoes: [
    {
      tipo: "no-ar",
      pagina: {
        hero: {
          // Assim mesmo na LP no ar ("VIVA COM E" / "EM HARMONIA"); ver docs/PENDENCIAS.md.
          linhas: ["VIVA COM E", "EM HARMONIA"],
          faixa: "CONDOMÍNIO HORIZONTAL COM LOTES A PARTIR DE 160M²",
          fundo: { src: `${V}/hero/fundo.webp`, largura: 1920, altura: 1079, alt: "Pórtico de entrada do Harmoni Vinhedos" },
        },
        cadastro: {
          titulo: "Seja um dos primeiros compradores e tenha condições exclusivas!",
          formulario: {
            botao: "Quero condição de lançamento",
            placeholders: { nome: "Nome Completo", telefone: "Número de celular", email: "Email" },
          },
        },
        conceito: {
          titulo: "Pensado para quem quer mais espaço, mais liberdade e a harmonia entre privacidade e convivência.",
          texto:
            "O Harmoni Vinhedos é um condomínio horizontal pensado para você viver em um endereço que valoriza o que importa e que se tornará referência.",
          pilares: "Segurança | Exclusividade | Comodidade | Lazer",
          cta: lote,
          fundo: { src: `${V}/conceito/familia-desktop.webp`, largura: 1920, altura: 611, alt: "Mãe rindo abraçada aos dois filhos no gramado" },
          fundoCelular: { src: `${V}/conceito/familia-celular.webp`, largura: 632, altura: 1080, alt: "Mãe rindo abraçada aos dois filhos no gramado" },
        },
        faixaLocalizacao: "Uma localização que te conecta ao que mais importa!",
        localizacao: {
          mapa: render("mapa"),
          texto:
            "O Harmoni Vinhedos está estrategicamente localizado em uma região em plena expansão e que mais se valoriza em Viamão. Vizinho dos condomínios Cantegril e Buena Vista e, ao lado do bairro planejado Parque Harmonia, esse é o condomínio fechado para você viver no melhor lugar do mundo: a sua casa!",
        },
        chamada: {
          titulo: "A experiência **Harmoni** começa aqui!",
          texto: "Lotes residenciais a partir de 160m² em um condomínio para quem sonha em viver bem.",
          fundo: { src: `${V}/chamada/experiencia.webp`, largura: 1920, altura: 446, alt: "" },
        },
        alemDoBasico: {
          titulo: ["O **Harmoni Vinhedos** vai muito", "além do básico:"],
          itens: [
            ic("Paisagismo", "paisagismo", 87, 87),
            ic("Chimarródromo", "chimarrodromo", 142, 212),
            ic("Redário", "redario", 259, 201),
            ic("Espaço car-care", "espaco-car-care", 274, 274),
            ic("Minimercado", "minimercado", 242, 242),
            ic("Fire place", "fire-place", 172, 242),
            ic("Acesso de entrada exclusivo para moradores", "acesso-de-entrada-exclusivo-para-moradores", 236, 235),
          ],
        },
        perspectivas: {
          titulo: ["Diversão e **qualidade** **de vida**", "para todas as idades"],
          slides: [
            { nome: "GOURMET", imagem: render("gourmet") },
            { nome: "PÓRTICO", imagem: render("portico") },
            { nome: "MINI-MERCADO", imagem: render("minimercado") },
            { nome: "BRINQUEDOTECA", imagem: render("brinquedoteca") },
            { nome: "PISCINA INFANTIL", imagem: render("piscina") },
            { nome: "GOURMET", imagem: render("gourmet2") },
            { nome: "ACADEMIA", imagem: render("academia") },
            { nome: "SALÃO DE FESTAS EXTERNA", imagem: render("salaoExterno") },
            { nome: "SALÃO DE FESTAS", imagem: render("salao") },
            { nome: "LAVA JATO EXTERNA", imagem: render("lavaJato") },
            { nome: "LAVA JATO", imagem: render("lavaJatoInterno") },
          ],
        },
        saude: {
          cta: { rotulo: "Quero conhecer todos os diferenciais", alvo: "contato" },
          titulo: "Saúde para **viver** mais longe!",
          itens: [
            ic("ACADEMIA", "academia", 70, 70),
            ic("PISTA DE COOPER", "pista-de-cooper", 43, 73),
            ic("QUADRA DE AREIA", "quadra-de-areia", 70, 70),
            ic("QUADRA POLIESPORTIVA", "quadra-poliesportiva", 70, 70),
          ],
        },
        infraestrutura: {
          titulo: ["Padrão e **qualidade construtiva** que só", "a Nova Harmonia tem."],
          itens: [
            ic("PAVIMENTAÇÃO EM PAVS", "pavimentacao-em-pavs", 63, 65),
            ic("MEIO-FIO COM SARJETAS DE 45CM", "meio-fio-com-sarjetas-de-45cm", 92, 53),
            ic("REDE E RESERVATÓRIO DE ÁGUA", "rede-e-reservatorio-de-agua", 47, 65),
            ic("REDE DE ESGOTO", "rede-de-esgoto", 65, 65),
            ic("REDE DE DRENAGEM PLUVIAL", "rede-de-drenagem-pluvial", 65, 65),
            ic("REDE ELÉTRICA", "rede-eletrica", 65, 65),
            ic("ILUMINAÇÃO PÚBLICA EM LED", "iluminacao-publica-em-led", 42, 65),
            ic("PORTARIA DE ENTRADA SOCIAL", "portaria-de-entrada-social", 65, 65),
            ic("PORTARIA DE ENTRADA DE SERVIÇO", "portaria-de-entrada-de-servico", 65, 65),
          ],
        },
        implantacao: {
          titulo: "Implantação",
          planta: render("masterplan"),
          cta: lote,
          legenda: [
            "PORTARIA",
            "SALÃO DE FESTAS",
            "FOGO DE CHÃO",
            "MERCADINHO",
            "CAR CARE",
            "QUADRA POLIESPORTIVA",
            "CHIMARRÓDROMO E REDÁRIO",
            "PISTA DE COOPER",
            "ACADEMIA",
            "BRINQUEDOTECA",
            "ESPAÇO GOURMET",
            "QUADRA DE AREIA",
            "PISCINA ADULTO",
            "PISCINA INFANTIL",
            "PLAYGROUND",
          ],
        },
        comoConstruimos: {
          titulo: "COMO **CONSTRUÍMOS**",
          // Copy do cliente; falta a crase em "à altura" (docs/PENDENCIAS.md).
          subtitulo: "Infraestrutura a altura do padrão Nova Harmonia de qualidade",
          missao: ["UMA GRANDE HISTÓRIA COM A NOBRE MISSÃO DE **URBANIZAR COM HARMONIA**"],
          texto: missao.texto,
          imagem: corteInfraestrutura,
        },
        futuro: {
          foto: missao.foto,
          frase: "UM PROJETO DE FUTURO PARA AS CIDADES. UM PROJETO DE VIDA PARA AS PESSOAS.",
          mapa: missao.mapa,
          presenca: "PRESENTE NAS 5 REGIÕES DO PAÍS, CRIANDO SOLUÇÕES INOVADORAS PARA QUE AS PESSOAS VIVAM MELHOR.",
        },
        grupo: {
          chamada: "Confie em quem é referência nacional em **empreendimentos de qualidade.**",
          frase: "UMA GRANDE HISTÓRIA\nNÃO SE ESCREVE DA NOITE PARA O DIA",
          // Logo azul da LP no ar (o logo-vertical.svg do projeto é verde).
          logos: [{ src: `${V}/logo-nova-harmonia.png`, largura: 1244, altura: 736, alt: "Nova Harmonia Bairros Planejados" }, marcasGrupo.sfa],
          paragrafos: grupo.paragrafos,
          setores: [
            "BAIRROS PLANEJADOS | SHOPPING CENTERS | CONSTRUÇÃO CIVIL | AGRONEGÓCIO",
            "REDE NOVO ATACAREJO | HOTÉIS | FACULDADES",
          ],
          fotos: grupo.fotos,
        },
        stand: {
          titulo: "Visite nosso stand de vendas",
          // Mesmo endereço do mapa da LP no ar.
          mapaUrl:
            "https://maps.google.com/maps?q=Av.%20Sen.%20Salgado%20Filho%2C%207700%20-%20Jardim%20Krahe%2C%20Viam%C3%A3o%20-%20RS%2C%2094440-000&t=m&z=17&output=embed&iwloc=near",
          mapaTitulo: "Mapa do stand de vendas: Av. Sen. Salgado Filho, 7700, Viamão/RS",
          foto: { src: "/img/nova-harmonia/institucional/background-home.webp", largura: 1620, altura: 1080, alt: "Stand de vendas da Nova Harmonia" },
        },
      },
    },
  ],
  legal: {
    registro:
      "O condomínio de lotes Harmoni Vinhedos está registrado na matrícula 89.365 no cartório de registro de imóveis de Viamão/RS e aprovado pela prefeitura municipal de Viamão/RS.",
  },
};
