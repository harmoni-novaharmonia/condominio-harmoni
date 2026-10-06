"use client";

import { useEffect, useRef, useState } from "react";
import { Ic } from "@/components/lp/Ic";
import { IcTinta } from "@/components/lp/IcTinta";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { textosInteracao } from "@/empreendimentos/comum";
import type { LP } from "@/empreendimentos/tipos";
import type { ArboreGalhos } from "../tipos";

/** Base (raiz) e topo do tronco, em fração da altura do quadro. */
const Y0 = 0.8;
const Y1 = 0.1;
/** Altura de cada galho (fração do quadro), do mais perto (embaixo) ao mais longe (em cima). */
const alturas = (n: number) => Array.from({ length: n }, (_, i) => Y0 - (Y0 - Y1) * ((i + 0.62) / n));

// Localização: um tronco cresce com a rolagem e abre um galho para cada destino,
// do mais perto (embaixo) ao mais longe (em cima). Em tela estreita o tronco vai
// para a esquerda e todos os galhos saem para a direita.
export function Galhos({ s, lp }: { s: ArboreGalhos; lp: LP }) {
  const caixa = useRef<HTMLElement>(null);
  const [tam, setTam] = useState({ w: 600, h: 600 });
  const n = s.pontos.length;
  const ys = alturas(n);
  const estreita = tam.w < 620;
  const cx = estreita ? 44 : tam.w / 2;
  const y0 = Y0 * tam.h;
  const y1 = Y1 * tam.h;

  useEffect(() => {
    const box = caixa.current;
    if (!box) return;
    const ro = new ResizeObserver(() => setTam({ w: box.clientWidth, h: box.clientHeight }));
    ro.observe(box);
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Ponto da rolagem em que o tronco chega em cada galho.
    const limiar = alturas(n).map((y) => (Y0 - y) / (Y0 - Y1));
    let pedido = false;
    const atualiza = () => {
      pedido = false;
      const r = box.getBoundingClientRect();
      const p = reduz ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (r.height * 0.8)));
      box.style.setProperty("--tronco", (1 - p).toFixed(4));
      box.querySelectorAll<SVGElement | HTMLElement>("[data-g]").forEach((el) => {
        el.classList.toggle("on", p >= limiar[Number(el.dataset.g)] - 0.01);
      });
    };
    const pede = () => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(atualiza);
    };
    window.addEventListener("scroll", pede, { passive: true });
    window.addEventListener("resize", pede);
    atualiza();
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", pede);
      window.removeEventListener("resize", pede);
    };
  }, [n]);

  const tronco = `M${cx} ${y0} C${cx - 14} ${(y0 + y1) / 2 + 70} ${cx + 16} ${(y0 + y1) / 2 - 70} ${cx} ${y1}`;
  const raizes = [-1, 1].flatMap((l) => [
    `M${cx} ${y0} C${cx + l * 10} ${y0 + 26} ${cx + l * 46} ${y0 + 30} ${cx + l * 96} ${y0 + 52}`,
    `M${cx} ${y0 + 6} C${cx + l * 6} ${y0 + 40} ${cx + l * 22} ${y0 + 54} ${cx + l * 40} ${y0 + 80}`,
  ]);
  const largura = Math.min(tam.w / 2 - 24, 340) - 72;

  return (
    <section id="localizacao" className="secao ab ab-local fundo-branco">
      <div className="casca ab-local-grade">
        <div className="ab-local-txt">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <p className="txt">{s.texto}</p>
          <p className="endereco">
            <Ic nome="pino" tamanho={22} />
            <span>{s.endereco}</span>
          </p>
        </div>
        <figure ref={caixa} className={`ab-arvore ${estreita ? "estreita" : ""}`}>
          <svg className="ab-arvore-svg" viewBox={`0 0 ${tam.w} ${tam.h}`} aria-hidden="true">
            <path className="ab-tronco-fundo" d={tronco} />
            <path className="ab-tronco" d={tronco} pathLength={1} />
            {s.pontos.map((p, i) => {
              const y = ys[i] * tam.h;
              const lado = estreita || i % 2 ? 1 : -1;
              const fim = cx + lado * (estreita ? 40 : 64);
              return <path key={p.titulo} className="ab-galho-linha" data-g={i} pathLength={1} d={`M${cx} ${y + 46} C${cx} ${y + 10} ${cx + lado * 18} ${y} ${fim} ${y}`} />;
            })}
            <g className="ab-raizes">
              {raizes.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </svg>
          <ol className="ab-galhos">
            {s.pontos.map((p, i) => (
              <li key={p.titulo} className={`ab-galho ${i % 2 ? "dir" : "esq"}`} data-g={i} style={{ top: `${ys[i] * 100}%`, ["--larg" as string]: `${largura}px` }}>
                <IcTinta nome={p.icone} />
                <div>
                  <strong>{p.titulo}</strong>
                  <span>{p.texto}</span>
                </div>
              </li>
            ))}
          </ol>
          <p className="ab-raiz" style={{ top: `${Y0 * 100}%` }}>
            <span className="ab-raiz-ic">
              <IcTinta nome="lote" />
            </span>
            <span>
              <strong>{lp.nome}</strong>
              {s.partida}
            </span>
          </p>
          <figcaption>{textosInteracao.ordemDestinos}</figcaption>
        </figure>
      </div>
    </section>
  );
}
