"use client";

import { useState } from "react";
import type { GrupoDiferenciais, Link } from "@/empreendimentos/tipos";
import { Ic } from "./Ic";
import { Img } from "./Img";

/** Diferenciais em abas: cada grupo troca a foto e a lista (Vinhedos). */
export function AbasDiferenciais({ grupos, cta, rotulo }: { grupos: GrupoDiferenciais[]; cta?: Link; rotulo: string }) {
  const [ab, setAb] = useState(0);
  const g = grupos[ab];
  return (
    <>
      <div className="abas" role="tablist" aria-label={rotulo}>
        {grupos.map((x, k) => (
          <button key={x.titulo} type="button" role="tab" aria-selected={k === ab} data-ativo={k === ab} onClick={() => setAb(k)}>
            {x.titulo}
          </button>
        ))}
      </div>
      <div className="abas-corpo" role="tabpanel">
        <figure className="abas-foto">
          {grupos.map((x, k) => (
            <div key={x.titulo} className="abas-foto-item" data-ativo={k === ab} aria-hidden={k !== ab}>
              <Img imagem={x.imagem} sizes="(min-width: 1080px) 50vw, 100vw" />
            </div>
          ))}
        </figure>
        <div>
          <p className="abas-titulo">{g.titulo}</p>
          <ul className="abas-itens">
            {g.itens.map((it) => (
              <li key={it.titulo} className="dif">
                <span className="dif-ic">
                  <Ic nome={it.icone} tamanho={28} />
                </span>
                {it.titulo}
              </li>
            ))}
          </ul>
          {cta && (
            <a className="bt bt-escuro bt-cheio" href={`#${cta.alvo}`}>
              {cta.rotulo}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
