"use client";

import { useState } from "react";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { textosInteracao as t } from "@/empreendimentos/comum";
import type { HortensiasLotes } from "../tipos";
import { escolheLote, useLoteEscolhido } from "./loteEscolhido";

const dois = (n: number) => String(n).padStart(2, "0");

/** Quatro filas de 12 lotes no desenho de 900x540: quadra A, quadra B (duas filas de fundos) e quadra C. */
const FILAS = [
  { y: 30, quadra: "A" },
  { y: 174, quadra: "B" },
  { y: 272, quadra: "B" },
  { y: 414, quadra: "C" },
];
const POR_FILA = 12;

// Escolha seu lote: planta desenhada (ilustrativa) com 48 lotes. Passar o mouse
// mostra o lote na ficha ao lado; tocar escolhe, e o lote vai para o contato e
// para o cadastro. Reservados não podem ser escolhidos.
export function Lotes({ s }: { s: HortensiasLotes }) {
  const escolhido = useLoteEscolhido();
  const [olhando, setOlhando] = useState<number | null>(null);
  const atual = olhando ?? (escolhido ? Number(escolhido) : null) ?? 7;
  const numAtual = dois(atual);
  const reservado = s.reservados.includes(atual);
  const ehSua = escolhido === numAtual;

  const lotes = FILAS.flatMap((f, r) =>
    Array.from({ length: POR_FILA }, (_, c) => {
      const n = r * POR_FILA + c + 1;
      return { n, x: 168 + c * 61, y: f.y, res: s.reservados.includes(n), sua: escolhido === dois(n) };
    }),
  );

  return (
    <section id="implantacao" className="secao hs hs-lotes fundo-creme">
      <div className="casca">
        <div className="hs-centro hs-rv">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <p className="txt">{s.texto}</p>
        </div>
        <div className="hs-lt-grade">
          <div className="hs-lt-planta">
            <svg viewBox="0 0 900 540" role="group" aria-label={t.rotuloPlanta} onPointerLeave={() => setOlhando(null)}>
              <rect width="900" height="540" className="hs-lt-chao" />
              <rect x="160" y="130" width="740" height="40" className="hs-lt-rua" />
              <rect x="160" y="370" width="740" height="40" className="hs-lt-rua" />
              <rect x="150" y="0" width="12" height="540" className="hs-lt-rua" />
              <rect x="16" y="20" width="124" height="350" className="hs-lt-lazer" />
              <text x="78" y="190" className="hs-lt-area">
                {s.areas.lazer}
              </text>
              <rect x="16" y="410" width="124" height="110" className="hs-lt-portaria" />
              <text x="78" y="470" className="hs-lt-area claro">
                {s.areas.portaria}
              </text>
              {lotes.map((l) => (
                <g key={l.n} className={`hs-lote ${l.res ? "res" : ""} ${l.sua ? "sua" : ""}`}>
                  <rect
                    x={l.x}
                    y={l.y}
                    width="58"
                    height="96"
                    tabIndex={l.res ? -1 : 0}
                    role="button"
                    aria-label={t.lote(dois(l.n))}
                    aria-disabled={l.res || undefined}
                    aria-pressed={l.sua}
                    onPointerEnter={() => setOlhando(l.n)}
                    onFocus={() => setOlhando(l.n)}
                    onClick={() => !l.res && escolheLote(dois(l.n))}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !l.res && (e.preventDefault(), escolheLote(dois(l.n)))}
                  />
                  <text x={l.x + 29} y={l.y + 54}>
                    {l.n}
                  </text>
                </g>
              ))}
            </svg>
            <div className="hs-lt-leg">
              {t.legendaLotes.map((rotulo, k) => (
                <span key={rotulo} data-k={k}>
                  <i />
                  {rotulo}
                </span>
              ))}
              <span className="nota">{s.nota}</span>
            </div>
          </div>
          <aside className="hs-lt-ficha" aria-live="polite">
            <p className="hs-lt-rot">{ehSua ? t.sua : t.vendo}</p>
            <p className="hs-lt-num">{t.lote(numAtual)}</p>
            <dl>
              <dt>{t.quadra}</dt>
              <dd>{FILAS[Math.floor((atual - 1) / POR_FILA)].quadra}</dd>
              <dt>{t.area}</dt>
              <dd>{s.areaLote}</dd>
              <dt>{t.situacao}</dt>
              <dd>{reservado ? t.reservado : ehSua ? t.disponivelSua : t.disponivel}</dd>
            </dl>
            {!reservado && (
              <a className="bt bt-acento" href="#contato" onClick={() => escolheLote(numAtual)}>
                {t.queroLote(numAtual)}
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
