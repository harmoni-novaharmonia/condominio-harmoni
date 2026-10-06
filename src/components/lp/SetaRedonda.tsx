"use client";

import { textosGerais, textosInteracao } from "@/empreendimentos/comum";

type Props = { onAnterior: () => void; onProxima: () => void; onAmpliar?: () => void };

/** Setas redondas de carrossel (e o botão de tela cheia, quando houver). */
export function SetasRedondas({ onAnterior, onProxima, onAmpliar }: Props) {
  return (
    <div className="setas-r">
      {onAmpliar && (
        <button type="button" className="seta-r" onClick={onAmpliar} aria-label={textosInteracao.telaCheia}>
          ⤢
        </button>
      )}
      <button type="button" className="seta-r" onClick={onAnterior} aria-label={textosGerais.anterior}>
        ←
      </button>
      <button type="button" className="seta-r" onClick={onProxima} aria-label={textosGerais.proxima}>
        →
      </button>
    </div>
  );
}
