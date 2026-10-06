"use client";

import type { ReactNode } from "react";
import { useVitrine } from "./VitrineContexto";

type Props = {
  alvo: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  /** Pré-seleciona o empreendimento no formulário ao clicar ("" limpa). */
  interesse?: string;
};

export function LinkAncora({ alvo, className, children, ariaLabel, interesse }: Props) {
  const { rolaPara, setMenuAberto, setInteresse } = useVitrine();
  return (
    <a
      className={className}
      href={`#${alvo}`}
      aria-label={ariaLabel}
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
