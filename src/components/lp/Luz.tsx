"use client";

import { useEffect, useRef } from "react";
import { textosGerais, textosInteracao } from "@/empreendimentos/comum";
import type { ItemPerspectiva } from "@/empreendimentos/tipos";

type Props = {
  itens: ItemPerspectiva[];
  /** Índice aberto; null fecha. */
  indice: number | null;
  onMudar: (i: number | null) => void;
};

/** Foto em tela cheia com setas e teclado (←, →, Esc). */
export function Luz({ itens, indice, onMudar }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const n = itens.length;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (indice !== null && !d.open) d.showModal();
    if (indice === null && d.open) d.close();
  }, [indice]);

  const vai = (passo: number) => indice !== null && onMudar((indice + passo + n) % n);
  const it = indice !== null ? itens[indice] : null;

  return (
    <dialog
      ref={ref}
      className="luz"
      aria-label={it?.nome}
      onClose={() => onMudar(null)}
      onClick={(e) => e.target === e.currentTarget && onMudar(null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") vai(-1);
        if (e.key === "ArrowRight") vai(1);
      }}
    >
      {it && (
        <>
          <img src={it.imagem.src} width={it.imagem.largura} height={it.imagem.altura} alt={it.imagem.alt} />
          <div className="luz-rodape">
            <p>
              <strong>{it.nome}</strong> {it.texto}
              {it.imagem.provisoria ? ` · ${textosGerais.imagemProvisoria}` : ""}
            </p>
            <div className="setas-r">
              <button type="button" className="seta-r" onClick={() => vai(-1)} aria-label={textosGerais.anterior}>
                ←
              </button>
              <button type="button" className="seta-r" onClick={() => vai(1)} aria-label={textosGerais.proxima}>
                →
              </button>
              <button type="button" className="seta-r" onClick={() => onMudar(null)} aria-label={textosInteracao.fechar}>
                ✕
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
