"use client";

import { useRef } from "react";
import { Img } from "@/components/lp/Img";
import { Titulo } from "@/components/lp/Titulo";
import { useAoRolar } from "@/hooks/useAoRolar";
import { useMovimentoReduzido } from "@/hooks/useMovimentoReduzido";
import type { EssenzaAbertura } from "../tipos";

// A foto começa como cartão no meio da tela e abre até a tela cheia enquanto a
// seção fica presa (sticky). --ab vai de 0 a 1; sem script fica em 1 (aberta).
export function Abertura({ s }: { s: EssenzaAbertura }) {
  const sec = useRef<HTMLElement>(null);
  const reduz = useMovimentoReduzido();
  useAoRolar(() => {
    const el = sec.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const curso = Math.max(1, r.height - window.innerHeight);
    el.style.setProperty("--ab", Math.min(1, Math.max(0, -r.top / (curso * 0.72))).toFixed(4));
  }, !reduz);

  return (
    <section ref={sec} className="ez ez-abertura">
      <div className="ez-ab-fixo">
        <figure className="ez-ab-foto foto">
          <Img imagem={s.imagem} sizes="100vw" />
        </figure>
        <div className="ez-ab-txt">
          <Titulo texto={s.titulo} className="d titulo-secao" />
          {s.texto && <p className="txt">{s.texto}</p>}
          <a className="bt bt-acento" href={`#${s.cta.alvo}`}>
            {s.cta.rotulo}
          </a>
        </div>
      </div>
    </section>
  );
}
