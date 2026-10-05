"use client";

import type { CSSProperties, ReactNode } from "react";
import { useVitrine } from "./VitrineContexto";

type Props = {
  alvo: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  /** Pré-seleciona o empreendimento no formulário ao clicar ("" limpa). */
  interesse?: string;
  style?: CSSProperties;
};

export function LinkAncora({ alvo, className, children, ariaLabel, interesse, style }: Props) {
  const { rolaPara, setMenuAberto, setInteresse } = useVitrine();
  return (
    <a
      className={className}
      href={`#${alvo}`}
      aria-label={ariaLabel}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        setMenuAberto(false);
        if (interesse !== undefined) setInteresse(interesse);
        rolaPara(alvo);
      }}
    >
      {children}
    </a>
  );
}
