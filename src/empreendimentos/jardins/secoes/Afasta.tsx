"use client";

import { useEffect, useRef } from "react";
import { Ic } from "@/components/lp/Ic";
import { IcTinta } from "@/components/lp/IcTinta";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { textosInteracao } from "@/empreendimentos/comum";
import type { LP } from "@/empreendimentos/tipos";
import type { JardinsAfasta } from "../tipos";
import { ALTURA, GIRO, LARGURA, MAPA } from "./mapa";

/** Zoom inicial, perto do condomínio; termina em 1 (o mapa inteiro). */
const Z0 = 2.8;
const pct = (x: number, y: number) => ({ left: `${(x / LARGURA) * 100}%`, top: `${(y / ALTURA) * 100}%` });

// Localização: o mapa começa perto do condomínio e se afasta com a rolagem até
// Porto Alegre. Cada lugar acende no mapa e na lista quando entra no quadro.
export function Afasta({ s, lp }: { s: JardinsAfasta; lp: LP }) {
  const caixa = useRef<HTMLElement>(null);
  const mov = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const box = caixa.current;
    const m = mov.current;
    const casa = box?.querySelector<HTMLElement>("[data-casa]");
    if (!box || !m || !casa) return;
    const pts = Array.from(box.querySelectorAll<HTMLElement>("[data-p]"));
    const lis = Array.from(lista.current?.querySelectorAll<HTMLElement>("[data-parada]") ?? []);
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let esc = 1;
    let ox = 0;
    let oy = 0;
    let z = reduz ? 1 : Z0;
    // O desenho fica em "meet": a escala é a menor das duas e o resto do quadro mostra a sobra.
    const px = (x: number, y: number) => [x * esc + ox, y * esc + oy];
    const pinta = () => {
      const [hx, hy] = px(s.casa.x, s.casa.y);
      m.style.transform = `scale(${z.toFixed(3)})`;
      box.style.setProperty("--z", z.toFixed(3));
      s.pontos.forEach((p, i) => {
        const [x, y] = px(p.x, p.y);
        const sx = hx + (x - hx) * z;
        const sy = hy + (y - hy) * z;
        const vis = sx > 20 && sx < W - 20 && sy > 20 && sy < H - 20;
        pts[i]?.classList.toggle("on", vis);
        lis[i]?.classList.toggle("on", vis);
      });
    };
    const mede = () => {
      W = box.clientWidth;
      H = box.clientHeight;
      esc = Math.min(W / LARGURA, H / ALTURA);
      ox = (W - LARGURA * esc) / 2;
      oy = (H - ALTURA * esc) / 2;
      const [hx, hy] = px(s.casa.x, s.casa.y);
      m.style.transformOrigin = `${hx.toFixed(1)}px ${hy.toFixed(1)}px`;
      casa.style.left = `${hx}px`;
      casa.style.top = `${hy}px`;
      pts.forEach((el, i) => {
        const [x, y] = px(s.pontos[i].x, s.pontos[i].y);
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      });
    };
    let pedido = false;
    const atualiza = () => {
      pedido = false;
      if (!reduz) {
        const r = box.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.95 - r.top) / (window.innerHeight * 0.7)));
        z = Z0 - (Z0 - 1) * (1 - Math.pow(1 - p, 2.2));
      }
      pinta();
    };
    const pede = () => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(atualiza);
    };
    const ro = new ResizeObserver(() => {
      mede();
      pede();
    });
    ro.observe(box);
    window.addEventListener("scroll", pede, { passive: true });
    mede();
    atualiza();
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", pede);
    };
  }, [s]);

  const { aeroporto: a, rotulos } = MAPA;
  return (
    <section id="localizacao" className="secao jd jd-local fundo-branco">
      <div className="casca">
        <div className="jd-local-cab">
          <div>
            <Sobretitulo texto={s.sobretitulo} />
            <Titulo texto={s.titulo} className="d titulo-secao" />
          </div>
          <p className="txt">{s.texto}</p>
        </div>
        <div className="jd-local-grade">
          <div className="jd-local-lista">
            <ol ref={lista} className="jd-paradas">
              <li className="on">
                <IcTinta nome="lote" />
                <div>
                  <strong>{lp.nome}</strong>
                  <span>{s.casa.texto}</span>
                </div>
              </li>
              {s.pontos.map((p, i) => (
                <li key={p.titulo} data-parada={i}>
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
          <figure ref={caixa} className="jd-mapa">
            <div ref={mov} className="jd-mapa-mov">
              <svg viewBox={`0 0 ${LARGURA} ${ALTURA}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <g className="jd-m-quadras" transform={`rotate(${GIRO} 500 280)`} dangerouslySetInnerHTML={{ __html: MAPA.quadras }} />
                <g className="jd-m-parques">
                  {MAPA.parques.map(([cx, cy, rx, ry]) => (
                    <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} />
                  ))}
                </g>
                <path className="jd-m-rio" d={MAPA.rio} />
                <text className="jd-m-rotulo" x={rotulos.rio.x} y={rotulos.rio.y}>
                  {rotulos.rio.texto}
                </text>
                <g className="jd-m-ruas">
                  {MAPA.ruas.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </g>
                <path className="jd-m-av-borda" d={MAPA.avenida} />
                <path className="jd-m-av" d={MAPA.avenida} />
                <path className="jd-m-acesso" d={`M${s.casa.x} ${s.casa.y} L${s.casa.x - 12} ${s.casa.y + 40}`} />
                <g className="jd-m-aero" transform={`translate(${a.x} ${a.y}) rotate(${a.giro})`}>
                  <rect x="-130" y="-9" width="260" height="18" rx="4" />
                  <path d="M-112 0 H112" />
                  <rect x="-46" y="20" width="92" height="22" rx="4" />
                </g>
                <text className="jd-m-cidade" x={rotulos.cidade.x} y={rotulos.cidade.y}>
                  {rotulos.cidade.texto}
                </text>
              </svg>
              <span className="jd-mp jd-mp-casa on" data-casa="" style={pct(s.casa.x, s.casa.y)}>
                <span>
                  <i>
                    <IcTinta nome="lote" />
                  </i>
                  <b>{lp.nome}</b>
                </span>
              </span>
              {s.pontos.map((p, i) => (
                <span key={p.titulo} className="jd-mp" data-p={i} style={pct(p.x, p.y)}>
                  <span>
                    <i />
                    <b>{p.titulo}</b>
                  </span>
                </span>
              ))}
            </div>
            <figcaption>{textosInteracao.mapaForaEscala}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
