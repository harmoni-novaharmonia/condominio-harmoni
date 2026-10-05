"use client";

import { useRef, useState } from "react";
import { useVitrine } from "@/components/VitrineContexto";
import { harmonis } from "@/dados/empreendimentos";
import { faixa } from "@/dados/vitrine";

export function Faixa() {
  const { abreFicha } = useVitrine();
  const [pausa, setPausa] = useState(false);
  const retomada = useRef<ReturnType<typeof setTimeout> | null>(null);

  // No celular não existe hover: pausa enquanto o dedo está na faixa.
  const aoTocar = () => {
    if (retomada.current) clearTimeout(retomada.current);
    setPausa(true);
  };
  const aoSoltar = () => {
    retomada.current = setTimeout(() => setPausa(false), 2500);
  };

  return (
    <div
      className={pausa ? "faixa pausa" : "faixa"}
      aria-label={faixa.rotulo}
      onTouchStart={aoTocar}
      onTouchEnd={aoSoltar}
    >
      <div className="faixa-trilho">
        {/* O segundo grupo é cópia para o loop contínuo: fica fora da leitura e do foco. */}
        {[false, true].map((copia) => (
          <div key={String(copia)} className="faixa-grupo" aria-hidden={copia || undefined}>
            {harmonis.map((h) => (
              <button
                key={h.slug}
                className="faixa-nome"
                type="button"
                tabIndex={copia ? -1 : undefined}
                onClick={() => abreFicha(h.slug)}
              >
                <strong>{h.nome}</strong>
                <span>{h.cidade}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
