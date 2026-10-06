"use client";

import { useState } from "react";
import { textosHeader } from "@/empreendimentos/comum";
import type { LP } from "@/empreendimentos/tipos";
import { useAoRolar } from "@/hooks/useAoRolar";
import { Ic } from "./Ic";

// Barra fixa no celular com WhatsApp e o CTA do header. Aparece depois da
// primeira dobra e some quando o contato entra na tela (ele já tem o formulário).
export function BarraCelular({ lp }: { lp: LP }) {
  const [vis, setVis] = useState(false);
  useAoRolar(() => {
    const contato = document.getElementById(lp.header.cta.alvo);
    const topo = contato ? contato.getBoundingClientRect().top : Infinity;
    setVis(window.scrollY > 480 && topo > window.innerHeight * 0.6);
  });
  return (
    <div className="barra-celular" data-vis={vis}>
      <a className="bt bt-whatsapp" href={`https://wa.me/${lp.contato.whatsapp}`} target="_blank" rel="noopener noreferrer">
        <Ic nome="whatsapp" tamanho={18} className="ic-claro" />
        {textosHeader.whatsapp}
      </a>
      <a className="bt bt-acento" href={`#${lp.header.cta.alvo}`}>
        {lp.header.cta.rotulo}
      </a>
    </div>
  );
}
