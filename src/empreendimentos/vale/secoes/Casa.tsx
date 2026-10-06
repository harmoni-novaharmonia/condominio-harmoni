"use client";

import { useEffect, useState } from "react";
import { FormEtapas } from "@/components/lp/FormEtapas";
import { Img } from "@/components/lp/Img";
import { Titulo } from "@/components/lp/Titulo";
import type { LP } from "@/empreendimentos/tipos";
import type { ValeCasa } from "../tipos";
import { ContornoCasa } from "./ContornoCasa";
import { curvasNivel } from "./curvas";

const dois = (n: number) => String(n).padStart(2, "0");
const NIVEL = curvasNivel([[770, 300, 16, 20], [120, 600, 9, 24]], 11);

// Hero do Vale: curvas de nível ao fundo, título e cadastro em linha à esquerda e
// a janela em forma de casa (o desenho do logo) com três ambientes se alternando.
export function Casa({ s, lp }: { s: ValeCasa; lp: LP }) {
  const [i, setI] = useState(0);
  const n = s.imagens.length;

  useEffect(() => {
    if (n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((a) => (a + 1) % n), 5200);
    return () => window.clearInterval(id);
  }, [n]);

  return (
    <section id="inicio" className="hero vl vl-hero">
      <svg className="vl-nivel" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {NIVEL.map((d, k) => (
          <path key={k} d={d} />
        ))}
      </svg>
      <div className="casca vl-hero-grade">
        <div className="vl-hero-txt">
          <p className="sobretitulo anim-1">
            {lp.nome} · {lp.cidade}
          </p>
          <Titulo texto={s.titulo} como="h1" className="d anim-2" />
          <p className="txt anim-2">{s.texto}</p>
          <div className="vl-hero-form anim-3">
            <FormEtapas lp={lp} formulario={s.formulario} tom="acento" />
          </div>
        </div>
        <div className="vl-janela">
          <ContornoCasa />
          <div className="vl-janela-fotos">
            {s.imagens.map((x, k) => (
              <figure key={x.nome} className={`foto ${k === i ? "on" : ""}`} aria-hidden={k !== i || undefined}>
                <Img imagem={x.imagem} prioridade={k === 0} sizes="(min-width: 900px) 40vw, 92vw" />
              </figure>
            ))}
          </div>
          <p className="vl-janela-leg" aria-live="polite">
            <b>{dois(i + 1)}</b>
            <span>{s.imagens[i]?.nome}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
