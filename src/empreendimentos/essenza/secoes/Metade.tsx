"use client";

import { useRef } from "react";
import { IcTinta } from "@/components/lp/IcTinta";
import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { useAoRolar } from "@/hooks/useAoRolar";
import { useMovimentoReduzido } from "@/hooks/useMovimentoReduzido";
import type { EssenzaMetade } from "../tipos";

export function Metade({ s }: { s: EssenzaMetade }) {
  const foto = useRef<HTMLDivElement>(null);
  const reduz = useMovimentoReduzido();
  // A foto desliza devagar dentro da metade enquanto a seção passa pela tela.
  useAoRolar(() => {
    const el = foto.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--dv", ((r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight).toFixed(3));
  }, !reduz);

  return (
    <section className="ez ez-metade">
      <div ref={foto} className="ez-metade-foto">
        <figure className="foto">
          <Img imagem={s.imagem} sizes="(min-width: 900px) 50vw, 100vw" />
        </figure>
      </div>
      <div className="ez-metade-corpo">
        <Sobretitulo texto={s.sobretitulo} />
        <Titulo texto={s.titulo} className="d titulo-secao" />
        <div className="pilha-txt">
          {s.paragrafos.map((p) => (
            <p key={p} className="txt">
              {p}
            </p>
          ))}
        </div>
        <ul className="ez-essenciais">
          {s.essenciais.map((x) => (
            <li key={x.titulo}>
              <IcTinta nome={x.icone} />
              <span>{x.titulo}</span>
            </li>
          ))}
        </ul>
        {s.cta && (
          <a className="bt bt-escuro" href={`#${s.cta.alvo}`}>
            {s.cta.rotulo}
          </a>
        )}
      </div>
    </section>
  );
}
