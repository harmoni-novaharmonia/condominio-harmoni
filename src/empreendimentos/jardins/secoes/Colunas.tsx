"use client";

import { useRef } from "react";
import { Numeros } from "@/components/lp/Numeros";
import { Titulo } from "@/components/lp/Titulo";
import { grupo, marcasGrupo, tracado } from "@/empreendimentos/comum";
import { useAoRolar } from "@/hooks/useAoRolar";
import { useMovimentoReduzido } from "@/hooks/useMovimentoReduzido";
import type { JardinsColunas } from "../tipos";

// Grupo SFA: o texto ao lado de duas colunas de fotos legendadas por setor, na
// mesma altura do texto. As colunas deslizam em sentidos opostos na rolagem.
export function Colunas({ s }: { s: JardinsColunas }) {
  const sec = useRef<HTMLElement>(null);
  const reduz = useMovimentoReduzido();
  useAoRolar(() => {
    const el = sec.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height))) - 0.5;
    el.querySelectorAll<HTMLElement>(".jd-gr-col").forEach((c, k) => {
      c.style.transform = `translateY(${((k ? 1 : -1) * p * 130).toFixed(1)}px)`;
    });
  }, !reduz);

  const metade = Math.ceil(s.fotos.length / 2);
  const coluna = (fotos: JardinsColunas["fotos"]) => (
    <div className="jd-gr-col">
      {fotos.map((f) => (
        <figure key={f.imagem.src} className="jd-gr-foto foto">
          <img src={f.imagem.src} width={f.imagem.largura} height={f.imagem.altura} alt={f.imagem.alt} loading="lazy" decoding="async" />
          <figcaption>{f.setor}</figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <section ref={sec} className="secao jd jd-grupo">
      <img className="marca-dagua" src={tracado.petroleo} width={1350} height={783} alt="" loading="lazy" />
      <div className="casca jd-grupo-grade">
        <div className="jd-grupo-txt">
          <div className="jd-logos">
            <img src={marcasGrupo.novaHarmonia.src} width={marcasGrupo.novaHarmonia.largura} height={marcasGrupo.novaHarmonia.altura} alt={marcasGrupo.novaHarmonia.alt} loading="lazy" />
            <i />
            <img src={marcasGrupo.sfa.src} width={marcasGrupo.sfa.largura} height={marcasGrupo.sfa.altura} alt={marcasGrupo.sfa.alt} loading="lazy" />
          </div>
          <p className="sobretitulo">
            {grupo.frase.antes}
            {grupo.frase.destaque}
          </p>
          <Titulo texto={grupo.chamada} className="d titulo-secao" />
          <div className="pilha-txt">
            {grupo.paragrafos.map((p) => (
              <p key={p} className="txt">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="jd-grupo-fotos" role="region" aria-label={grupo.rotuloFotos}>
          {coluna(s.fotos.slice(0, metade))}
          {coluna(s.fotos.slice(metade))}
        </div>
      </div>
      <div className="casca">
        <Numeros />
      </div>
    </section>
  );
}
