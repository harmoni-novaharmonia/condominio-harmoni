"use client";

import { useEffect, useState } from "react";
import { FormEtapas } from "@/components/lp/FormEtapas";
import { Img } from "@/components/lp/Img";
import { Titulo } from "@/components/lp/Titulo";
import type { LP } from "@/empreendimentos/tipos";
import type { ValeCasa } from "../tipos";
import { curvasNivel } from "./curvas";

const NIVEL = curvasNivel([[770, 300, 16, 20], [120, 600, 9, 24]], 11);

// Hero do Vale: os três ambientes se alternam como fundo, quase apagados sob o azul
// da noite, com as curvas de nível por cima; título e cadastro em linha à esquerda.
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
      <div className="vl-fundo">
        {s.imagens.map((x, k) => (
          <figure key={x.nome} className={`foto ${k === i ? "on" : ""}`} aria-hidden="true">
            <Img imagem={{ ...x.imagem, alt: "" }} prioridade={k === 0} sizes="100vw" />
          </figure>
        ))}
      </div>
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
      </div>
    </section>
  );
}
