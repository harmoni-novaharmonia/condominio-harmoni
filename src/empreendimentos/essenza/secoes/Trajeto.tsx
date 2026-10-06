"use client";

import { useEffect, useRef } from "react";
import { Cabecalho } from "@/components/lp/Cabecalho";
import { Ic } from "@/components/lp/Ic";
import { IcTinta } from "@/components/lp/IcTinta";
import { textosInteracao } from "@/empreendimentos/comum";
import type { EssenzaTrajeto } from "../tipos";

// Desenho ilustrativo (600x700): o caminho e onde cada parada fica sobre ele.
const CAMINHO = "M110 610 C135 560 160 505 190 470 S290 425 330 400 S392 305 402 262 S455 150 505 105";
const PARADAS: [number, number, "dir" | "esq"][] = [[110, 610, "dir"], [190, 470, "esq"], [330, 400, "dir"], [402, 262, "esq"], [505, 105, "esq"]];
const RUAS = [
  "M-10 520 C120 500 260 545 610 465",
  "M60 -10 C95 200 40 420 125 710",
  "M262 -10 C250 180 305 420 272 710",
  "M-10 228 C180 250 380 198 610 222",
  "M440 -10 C470 220 430 470 522 710",
  "M-10 660 C200 640 380 690 610 630",
];
const RIO = "M-30 345 C110 300 210 372 330 330 S520 262 640 300";

export function Trajeto({ s }: { s: EssenzaTrajeto }) {
  const caixa = useRef<HTMLElement>(null);
  const lista = useRef<HTMLOListElement>(null);
  const n = s.pontos.length;
  const fim = n - 1;

  useEffect(() => {
    const box = caixa.current;
    const svg = box?.querySelector("svg");
    const linha = box?.querySelector<SVGPathElement>("[data-rota]");
    const ponta = box?.querySelector<SVGCircleElement>("[data-ponta]");
    if (!box || !svg || !linha || !ponta) return;
    const pts = Array.from(box.querySelectorAll<HTMLElement>("[data-pt]"));
    const lis = Array.from(lista.current?.querySelectorAll<HTMLElement>("li") ?? []);
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const L = linha.getTotalLength();
    // Fração do caminho em que fica cada parada.
    const fr = PARADAS.slice(0, n).map(([x, y]) => {
      let melhor = 0;
      let dm = Infinity;
      for (let l = 0; l <= L; l += 2) {
        const q = linha.getPointAtLength(l);
        const d = (q.x - x) ** 2 + (q.y - y) ** 2;
        if (d < dm) {
          dm = d;
          melhor = l;
        }
      }
      return melhor / L;
    });
    linha.style.strokeDasharray = String(L);
    // O SVG corta as sobras (slice): os rótulos são HTML e seguem a escala real.
    const posiciona = () => {
      const m = svg.getScreenCTM();
      if (!m) return;
      const r = box.getBoundingClientRect();
      pts.forEach((el, k) => {
        const p = svg.createSVGPoint();
        p.x = PARADAS[k][0];
        p.y = PARADAS[k][1];
        const q = p.matrixTransform(m);
        el.style.left = `${q.x - r.left}px`;
        el.style.top = `${q.y - r.top}px`;
      });
    };
    const pinta = (p: number) => {
      linha.style.strokeDashoffset = (L * (1 - p)).toFixed(1);
      const q = linha.getPointAtLength(L * p);
      ponta.setAttribute("cx", q.x.toFixed(1));
      ponta.setAttribute("cy", q.y.toFixed(1));
      fr.forEach((f, k) => {
        const on = p >= f - 0.004;
        pts[k]?.classList.toggle("on", on);
        lis[k]?.classList.toggle("on", on);
      });
    };
    let pedido = false;
    const atualiza = () => {
      pedido = false;
      posiciona();
      const r = box.getBoundingClientRect();
      pinta(reduz ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.78 - r.top) / (r.height * 0.85))));
    };
    const pede = () => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(atualiza);
    };
    window.addEventListener("scroll", pede, { passive: true });
    window.addEventListener("resize", pede);
    const ro = new ResizeObserver(pede);
    ro.observe(box);
    atualiza();
    return () => {
      window.removeEventListener("scroll", pede);
      window.removeEventListener("resize", pede);
      ro.disconnect();
    };
  }, [n]);

  return (
    <section id="localizacao" className="secao ez ez-trajeto fundo-branco">
      <div className="casca ez-trajeto-grade">
        <div className="ez-trajeto-txt">
          <Cabecalho sobretitulo={s.sobretitulo} titulo={s.titulo} texto={s.texto} />
          <ol ref={lista} className="ez-paradas">
            {s.pontos.map((p, i) => (
              <li key={p.titulo} className={i ? undefined : "on"}>
                <IcTinta nome={p.icone} />
                <div>
                  <strong>{p.titulo}</strong>
                  <span>{p.texto}</span>
                </div>
              </li>
            ))}
          </ol>
          <p className="endereco">
            <Ic nome="pino" tamanho={22} />
            <span>{s.endereco}</span>
          </p>
        </div>
        <figure ref={caixa} className="ez-mapa">
          <svg viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path className="ez-rio" d={RIO} />
            {RUAS.map((d) => (
              <path key={d} className="ez-rua" d={d} />
            ))}
            <path className="ez-rota-fundo" d={CAMINHO} />
            <path className="ez-rota" d={CAMINHO} data-rota="" />
            <circle className="ez-rota-ponta" r="8" cx={PARADAS[0][0]} cy={PARADAS[0][1]} data-ponta="" />
          </svg>
          {s.pontos.map((p, i) => {
            const [x, y, lado] = PARADAS[i] ?? PARADAS[fim];
            return (
              <span key={p.titulo} className={`ez-pt ${lado} ${i ? "" : "on"}`} style={{ left: `${(x / 600) * 100}%`, top: `${(y / 700) * 100}%` }} data-pt="">
                <i />
                <span>
                  {p.titulo}
                  {i === fim && <small>{p.texto}</small>}
                </span>
              </span>
            );
          })}
          <span className="ez-norte" aria-hidden="true">
            {textosInteracao.norte}
          </span>
          <figcaption>{textosInteracao.mapaForaEscala}</figcaption>
        </figure>
      </div>
    </section>
  );
}
