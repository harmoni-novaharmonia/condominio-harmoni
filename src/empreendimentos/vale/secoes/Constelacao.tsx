"use client";

import { useEffect, useRef, useState } from "react";
import { Cabecalho } from "@/components/lp/Cabecalho";
import { Ic } from "@/components/lp/Ic";
import { IcTinta } from "@/components/lp/IcTinta";
import { textosInteracao } from "@/empreendimentos/comum";
import type { LP } from "@/empreendimentos/tipos";
import { useEspera } from "@/hooks/useEspera";
import type { ValeConstelacao } from "../tipos";
import { curvasNivel } from "./curvas";

const NIVEL = curvasNivel([[560, 300, 14, 22], [90, 80, 6, 26], [930, 560, 7, 24]], 5);
const RIO = "M-20 470 C160 430 300 520 470 470 S760 380 1020 420";

// Mapa noturno do vale: cada ponto liga ao empreendimento por uma curva dourada,
// que se desenha quando o mapa aparece e acende ao passar pelo cartão do ponto.
export function Constelacao({ s, lp }: { s: ValeConstelacao; lp: LP }) {
  const mapa = useRef<HTMLDivElement>(null);
  const [tam, setTam] = useState({ w: 1000, h: 600 });
  const [foco, setFoco] = useState(-1);
  const [fixo, setFixo] = useState(-1);
  useEspera(mapa, "espera", 0.4);

  // As curvas são calculadas em pixels (viewBox do tamanho do mapa) para o traço não deformar.
  useEffect(() => {
    const el = mapa.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTam({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cx = (s.casa.x / 100) * tam.w;
  const cy = (s.casa.y / 100) * tam.h;
  const curva = (px: number, py: number) => {
    const x = (px / 100) * tam.w;
    const y = (py / 100) * tam.h;
    const qx = (cx + x) / 2 + (y - cy) * 0.22;
    const qy = (cy + y) / 2 - (x - cx) * 0.22;
    return `M${cx.toFixed(1)} ${cy.toFixed(1)} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
  };

  return (
    <section id="localizacao" className="secao vl vl-local fundo-branco">
      <div className="casca">
        <Cabecalho sobretitulo={s.sobretitulo} titulo={s.titulo} texto={s.texto} />
        <div ref={mapa} className={`vl-mapa ${foco >= 0 ? "foco" : ""}`}>
          <svg className="vl-mapa-base" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g className="vl-mapa-nivel">
              {NIVEL.map((d, k) => (
                <path key={k} d={d} />
              ))}
            </g>
            <path className="vl-rio" d={RIO} />
          </svg>
          <svg className="vl-mapa-linhas" viewBox={`0 0 ${tam.w} ${tam.h}`} aria-hidden="true">
            {s.pontos.map((p, k) => (
              <path key={p.titulo} d={curva(p.x, p.y)} pathLength={1} className={k === foco ? "on" : undefined} style={{ ["--k" as string]: k }} />
            ))}
          </svg>
          <span className="vl-casa" style={{ left: `${s.casa.x}%`, top: `${s.casa.y}%` }}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5 L21.5 9.5 V21.5 H2.5 V9.5 Z" />
            </svg>
            <b>{lp.nome}</b>
          </span>
          {s.pontos.map((p, k) => (
            <span key={p.titulo} className={`vl-ponto ${p.x > 66 ? "esq" : ""} ${k === foco ? "on" : ""}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <i />
              <span>{p.titulo}</span>
            </span>
          ))}
          <p className="vl-mapa-nota">{textosInteracao.mapaForaEscala}</p>
        </div>
        <ul className="vl-pontos">
          {s.pontos.map((p, k) => (
            <li key={p.titulo}>
              <button
                type="button"
                aria-pressed={k === fixo}
                onMouseEnter={() => setFoco(k)}
                onMouseLeave={() => setFoco(fixo)}
                onFocus={() => setFoco(k)}
                onBlur={() => setFoco(fixo)}
                onClick={() => {
                  const novo = fixo === k ? -1 : k;
                  setFixo(novo);
                  setFoco(novo);
                }}
              >
                <IcTinta nome={p.icone} />
                <span>
                  <small>{p.grupo}</small>
                  <strong>{p.titulo}</strong>
                  <span>{p.texto}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="endereco">
          <Ic nome="pino" tamanho={22} />
          <span>{s.endereco}</span>
        </p>
      </div>
    </section>
  );
}
