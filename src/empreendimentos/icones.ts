// Ícones das LPs em public/img/icones/lp/. Os de infraestrutura vêm do material
// da Nova Harmonia (recoloridos em petróleo); os demais foram desenhados no mesmo
// traço. Em fundo escuro o CSS inverte para branco (.ic-claro).
const nomes = [
  "academia", "areia", "beach-tennis", "brinquedoteca", "cameras", "carro", "chave", "chimarrao",
  "ciclofaixa", "estrada", "estudo", "facebook", "fogo", "folha", "gourmet", "iluminacao-led",
  "instagram", "linkedin", "lote", "meio-fio-com-sarjeta", "mercado", "metragem", "pavimentacao",
  "petplace", "pino", "piscina", "pista-cooper", "playground", "portaria", "quadra", "rede-de-agua",
  "rede-de-drenagem", "rede-de-esgoto", "rede-eletrica", "rede", "relogio", "sacola", "salao", "seta",
  "sinalizacao", "telefone", "whatsapp",
] as const;

export type NomeIcone = (typeof nomes)[number];

export const icone = (nome: NomeIcone) => `/img/icones/lp/${nome}.svg`;
