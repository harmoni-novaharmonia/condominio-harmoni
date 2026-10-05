import type { ElementType } from "react";
import type { Destaque } from "@/empreendimentos/tipos";

type Props = { texto: Destaque; como?: ElementType; className?: string };

export function Titulo({ texto, como: Tag = "h2", className }: Props) {
  return (
    <Tag className={className}>
      {texto.antes}
      <em>{texto.destaque}</em>
      {texto.depois}
    </Tag>
  );
}

export function Sobretitulo({ texto }: { texto?: string }) {
  if (!texto) return null;
  return <p className="sobretitulo">{texto}</p>;
}
