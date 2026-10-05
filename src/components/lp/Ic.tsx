import { icone, type NomeIcone } from "@/empreendimentos/icones";

/** Ícone de linha da LP (arquivo em public/img/icones/lp). Decorativo: o texto ao lado dá o nome. */
export function Ic({ nome, tamanho = 40, className }: { nome: NomeIcone; tamanho?: number; className?: string }) {
  return (
    <img
      className={`ic ${className ?? ""}`}
      src={icone(nome)}
      width={tamanho}
      height={tamanho}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}
