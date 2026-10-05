"use client";

import { useEffect, useRef, useState } from "react";
import { Ic } from "@/components/lp/Ic";
import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { textosInteracao } from "@/empreendimentos/comum";
import type { EssenzaRoteiro } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Um grupo por vez: a foto fixa ao lado troca quando o grupo passa pelo meio da tela.
// No celular a foto fixa sai e cada grupo mostra a sua.
export function Roteiro({ s }: { s: EssenzaRoteiro }) {
  const [ativo, setAtivo] = useState(0);
  const corpo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gs = Array.from(corpo.current?.querySelectorAll<HTMLElement>("[data-grupo]") ?? []);
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setAtivo(Number((x.target as HTMLElement).dataset.grupo))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    gs.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, []);

  return (
    <section id="diferenciais" className="secao ez ez-roteiro fundo-branco">
      <div className="casca ez-rt-grade">
        <div ref={corpo} className="ez-rt-corpo">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          {s.grupos.map((g, k) => (
            <div key={g.titulo} className={`ez-rt-grupo ${k === ativo ? "on" : ""}`} data-grupo={k}>
              <figure className="foto ez-rt-foto-m">
                <Img imagem={g.imagem} sizes="100vw" />
              </figure>
              <h3>
                <b>{dois(k + 1)}</b>
                {g.titulo}
                <small>{textosInteracao.itens(g.itens.length)}</small>
              </h3>
              <ul>
                {g.itens.map((x) => (
                  <li key={x.titulo}>
                    <Ic nome={x.icone} tamanho={30} />
                    <span>{x.titulo}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {s.cta && (
            <div className="ez-rt-cta">
              <a className="bt bt-escuro" href={`#${s.cta.alvo}`}>
                {s.cta.rotulo}
              </a>
            </div>
          )}
        </div>
        <div className="ez-rt-palco" aria-hidden="true">
          {s.grupos.map((g, k) => (
            <figure key={g.titulo} className={`foto ${k === ativo ? "on" : ""}`}>
              <Img imagem={g.imagem} sizes="(min-width: 900px) 50vw, 1px" />
            </figure>
          ))}
          <span className="ez-rt-leg">
            {dois(ativo + 1)} · {s.grupos[ativo]?.titulo}
          </span>
        </div>
      </div>
    </section>
  );
}
