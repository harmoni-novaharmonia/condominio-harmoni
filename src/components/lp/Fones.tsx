"use client";

import { useState } from "react";
import { textosInteracao as t } from "@/empreendimentos/comum";

// Telefones como texto selecionável, com botão de copiar (link tel: nem sempre funciona).
function Fone({ numero }: { numero: string }) {
  const [rotulo, setRotulo] = useState(t.copiar);
  const copia = (alvo: HTMLElement | null) => {
    const ok = () => {
      setRotulo(t.copiado);
      window.setTimeout(() => setRotulo(t.copiar), 1600);
    };
    const seleciona = () => {
      if (!alvo) return;
      const r = document.createRange();
      r.selectNodeContents(alvo);
      const s = window.getSelection();
      s?.removeAllRanges();
      s?.addRange(r);
      setRotulo(t.selecionado);
    };
    try {
      navigator.clipboard.writeText(numero).then(ok, seleciona);
    } catch {
      seleciona();
    }
  };
  return (
    <div className="fone">
      <strong>{numero}</strong>
      <button type="button" className="copiar" onClick={(e) => copia(e.currentTarget.previousElementSibling as HTMLElement)}>
        {rotulo}
      </button>
    </div>
  );
}

export function Fones({ telefones }: { telefones: string[] }) {
  return (
    <div className="fones">
      {telefones.map((n) => (
        <Fone key={n} numero={n} />
      ))}
    </div>
  );
}
