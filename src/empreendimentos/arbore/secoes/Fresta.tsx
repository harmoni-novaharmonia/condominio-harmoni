"use client";

import { useRef } from "react";
import { IcTinta } from "@/components/lp/IcTinta";
import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { useEspera } from "@/hooks/useEspera";
import type { ArboreFresta } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Conceito: a foto abre do centro para os lados, como uma porta de correr, quando a seção aparece.
export function Fresta({ s }: { s: ArboreFresta }) {
  const sec = useRef<HTMLElement>(null);
  useEspera(sec, "espera", 0.3);
  return (
    <section ref={sec} className="secao ab ab-fresta fundo-branco">
      <div className="casca ab-fresta-grade">
        <figure className="ab-fresta-foto foto">
          <Img imagem={s.imagem} sizes="(min-width: 900px) 42vw, 100vw" />
        </figure>
        <div className="ab-fresta-txt">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <div className="pilha-txt">
            {s.paragrafos.map((p) => (
              <p key={p} className="txt">
                {p}
              </p>
            ))}
          </div>
          <ol className="ab-fatos">
            {s.fatos.map((x, i) => (
              <li key={x.titulo}>
                <b>{dois(i + 1)}</b>
                <IcTinta nome={x.icone} />
                <span>{x.titulo}</span>
              </li>
            ))}
          </ol>
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
