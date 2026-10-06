import { icone, type NomeIcone } from "@/empreendimentos/icones";

/**
 * Ícone de linha pintado pela cor do CSS (máscara), para usar o acento do tema
 * (dourado no Vale, laranja no Essenza). Decorativo: o texto ao lado dá o nome.
 */
export function IcTinta({ nome, className }: { nome: NomeIcone; className?: string }) {
  return <span className={`ict ${className ?? ""}`} style={{ ["--i" as string]: `url(${icone(nome)})` }} aria-hidden="true" />;
}
