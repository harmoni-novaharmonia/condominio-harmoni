"use client";

import { useId, useState } from "react";
import { Cabecalho } from "@/components/lp/Cabecalho";
import { IcTinta } from "@/components/lp/IcTinta";
import { Img } from "@/components/lp/Img";
import { textosInteracao } from "@/empreendimentos/comum";
import type { ArboreGavetas } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Diferenciais em gavetas: uma por grupo, abre uma por vez. A foto do grupo cresce
// de baixo para cima ao abrir e tem a altura dos itens ao lado.
export function Gavetas({ s }: { s: ArboreGavetas }) {
  const [aberta, setAberta] = useState(s.aberta);
  const id = useId();
  return (
    <section id="diferenciais" className="secao ab ab-gavetas fundo-branco">
      <div className="casca">
        <Cabecalho
          sobretitulo={s.sobretitulo}
          titulo={s.titulo}
          direita={
            s.cta && (
              <a className="bt bt-escuro" href={`#${s.cta.alvo}`}>
                {s.cta.rotulo}
              </a>
            )
          }
        />
        <div className="ab-gav-lista">
          {s.grupos.map((g, i) => {
            const on = i === aberta;
            const corpo = `${id}-gaveta-${i}`;
            return (
              <div key={g.titulo} className={`ab-gav ${on ? "on" : ""}`}>
                <button type="button" className="ab-gav-bt" aria-expanded={on} aria-controls={corpo} onClick={() => setAberta(on ? -1 : i)}>
                  <b>{dois(i + 1)}</b>
                  <strong>{g.titulo}</strong>
                  <small>{textosInteracao.itens(g.itens.length)}</small>
                  <span className="ab-gav-sinal" aria-hidden="true" />
                </button>
                <div className="ab-gav-corpo" id={corpo} inert={!on || undefined}>
                  <div className="ab-gav-in">
                    <figure className="ab-gav-foto foto">
                      <Img imagem={g.imagem} sizes="(min-width: 760px) 40vw, 100vw" />
                    </figure>
                    <ul className={g.itens.length > 4 ? "duas" : undefined}>
                      {g.itens.map((x) => (
                        <li key={x.titulo}>
                          <IcTinta nome={x.icone} />
                          <span>{x.titulo}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
