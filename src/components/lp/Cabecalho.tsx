import type { ReactNode } from "react";
import type { Destaque } from "@/empreendimentos/tipos";
import { Sobretitulo, Titulo } from "./Titulo";

type Props = { sobretitulo?: string; titulo: Destaque; texto?: string; direita?: ReactNode; className?: string };

/** Sobretítulo, título e texto à esquerda; à direita, controles ou CTA. */
export function Cabecalho({ sobretitulo, titulo, texto, direita, className }: Props) {
  return (
    <div className={`cabecalho ${className ?? ""}`}>
      <div>
        <Sobretitulo texto={sobretitulo} />
        <Titulo texto={titulo} className="d titulo-secao" />
        {texto && <p className="txt">{texto}</p>}
      </div>
      {direita}
    </div>
  );
}
