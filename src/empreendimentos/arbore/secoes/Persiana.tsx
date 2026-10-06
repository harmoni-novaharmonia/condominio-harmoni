"use client";

import { useRef } from "react";
import { Img } from "@/components/lp/Img";
import { Titulo } from "@/components/lp/Titulo";
import { useAoRolar } from "@/hooks/useAoRolar";
import { useMovimentoReduzido } from "@/hooks/useMovimentoReduzido";
import type { ArborePersiana } from "../tipos";

const LAMINAS = 14;

// Manifesto: a família no lote atrás de uma persiana de madeira. As lâminas
// afinam com a rolagem até a foto aparecer inteira (sem script, já aberta).
export function Persiana({ s }: { s: ArborePersiana }) {
  const foto = useRef<HTMLDivElement>(null);
  const reduz = useMovimentoReduzido();
  useAoRolar(() => {
    const el = foto.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--ab", Math.min(1, Math.max(0, (window.innerHeight * 0.9 - r.top) / (window.innerHeight * 0.75))).toFixed(4));
  }, !reduz);

  return (
    <section className="ab ab-persiana">
      <div ref={foto} className="ab-pers-foto">
        <figure className="foto">
          <Img imagem={s.imagem} sizes="100vw" />
        </figure>
        <div className="ab-laminas" aria-hidden="true">
          {Array.from({ length: LAMINAS }, (_, k) => (
            <i key={k} />
          ))}
        </div>
        {s.credito && <span className="ab-cred">{s.credito}</span>}
      </div>
      <div className="casca">
        <div className="ab-pers-cartao">
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <div className="pilha-txt">
            {s.paragrafos.map((p) => (
              <p key={p} className="txt">
                {p}
              </p>
            ))}
          </div>
          {s.cta && (
            <a className="bt bt-escuro" href={`#${s.cta.alvo}`}>
              {s.cta.rotulo}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
