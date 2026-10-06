"use client";

import { useRef } from "react";
import { IcTinta } from "@/components/lp/IcTinta";
import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { useEspera } from "@/hooks/useEspera";
import type { JardinsLinho } from "../tipos";

// Conceito sobre o linho: a foto vertical (que já traz o linho e a casa desenhada)
// encosta no pé da seção e o linho dela se funde com o fundo.
export function Linho({ s }: { s: JardinsLinho }) {
  const sec = useRef<HTMLElement>(null);
  useEspera(sec, "espera", 0.25);
  return (
    <section ref={sec} className="jd jd-linho">
      <div className="casca jd-linho-grade">
        <div className="jd-linho-txt">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <div className="pilha-txt">
            {s.paragrafos.map((p) => (
              <p key={p} className="txt">
                {p}
              </p>
            ))}
          </div>
          <ul className="jd-fatos">
            {s.fatos.map((x) => (
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
        <figure className="jd-linho-foto foto">
          <Img imagem={s.imagem} sizes="(min-width: 900px) 600px, 420px" />
        </figure>
      </div>
    </section>
  );
}
