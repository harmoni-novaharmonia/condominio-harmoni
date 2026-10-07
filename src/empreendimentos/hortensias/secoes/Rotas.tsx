"use client";

import { useState } from "react";
import { Ic } from "@/components/lp/Ic";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { textosInteracao as t } from "@/empreendimentos/comum";
import type { HortensiasRotas } from "../tipos";

/** O condomínio no desenho de 1000x620; todas as rotas saem daqui. */
const ORIGEM = { x: 700, y: 300 };
const ZOOM = { min: 0.6, max: 2.2, passo: 0.4 };

// Localização num mapa de rotas, como num app: à esquerda o "como chegar" (origem,
// destinos, tempo e passos); à direita o mapa desenhado da região (ilustrativo).
// Escolher um destino traça a rota a partir do portão, derruba o pino e põe um
// ponto andando pelo caminho, sem parar. Zoom pelos botões.
export function Rotas({ s }: { s: HortensiasRotas }) {
  const [ativo, setAtivo] = useState(0);
  const [zoom, setZoom] = useState(1);
  const d = s.destinos[ativo];

  return (
    <section id="localizacao" className="secao hs hs-rotas fundo-creme">
      <div className="casca">
        <div className="hs-centro hs-rv">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <p className="txt">{s.texto}</p>
        </div>
        <div className="hs-rt-app">
          <aside className="hs-rt-painel">
            <div className="hs-rt-trecho">
              <i />
              <span>{s.origem}</span>
              <em />
              <span />
              <i className="fim" />
              <strong>{d.nome}</strong>
            </div>
            <div className="hs-rt-destinos" role="group" aria-label={t.rotuloDestinos}>
              {s.destinos.map((x, k) => (
                <button key={x.nome} type="button" aria-pressed={k === ativo} onClick={() => setAtivo(k)}>
                  {x.curto}
                </button>
              ))}
            </div>
            <div className="hs-rt-resultado" aria-live="polite">
              <p className="hs-rt-modo">{t.deCarro}</p>
              <p>
                <strong>{d.tempo}</strong> · {d.km}
              </p>
            </div>
            <ol className="hs-rt-passos">
              {d.passos.map((p, k) => (
                <li key={p}>
                  <b>{k + 1}</b>
                  {p}
                </li>
              ))}
            </ol>
            <a className="bt bt-escuro" href={s.maps} target="_blank" rel="noopener noreferrer">
              {t.abrirMaps}
            </a>
          </aside>
          <div className="hs-rt-mapa">
            <svg viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid slice" role="img" aria-label={t.rotuloMapa(d.nome)}>
              <g className="hs-rt-zoom" style={{ transform: `scale(${zoom})`, transformOrigin: `${ORIGEM.x}px ${ORIGEM.y}px` }}>
                <rect x="-500" y="-400" width="2000" height="1400" className="hs-rt-chao" />
                <g className="hs-rt-verde">
                  <path d="M760 60 C840 40 930 70 960 140 C930 190 850 200 790 170 C750 140 740 95 760 60Z" />
                  <path d="M300 520 C360 500 430 530 440 580 C400 620 320 610 290 580Z" />
                  <path d="M820 380 C880 370 940 400 950 450 C900 480 840 470 815 430Z" />
                </g>
                <g className="hs-rt-quadras">
                  {[
                    [20, 380], [66, 380], [112, 380], [20, 416], [112, 416], [20, 452], [66, 452], [112, 452],
                  ].map(([x, y]) => (
                    <rect key={`${x}-${y}`} x={x} y={y} width="40" height="30" />
                  ))}
                  {[
                    [580, 190], [620, 190], [580, 222], [660, 222], [620, 254],
                  ].map(([x, y]) => (
                    <rect key={`${x}-${y}`} x={x} y={y} width="34" height="26" />
                  ))}
                </g>
                <path className="hs-rt-rio" d="M1000 120 C850 150 760 170 640 160 S420 230 300 260 S120 300 0 290" />
                <g className="hs-rt-ruas">
                  <path d="M520 120 L900 260" />
                  <path d="M560 400 L960 330" />
                  <path d="M600 60 L640 560" />
                  <path d="M780 80 L800 600" />
                  <path d="M150 330 L420 300" />
                  <path d="M200 560 L260 300" />
                </g>
                <g className="hs-rt-rodovias">
                  <path className="borda" d="M455 -40 C445 150 440 300 430 660" />
                  <path d="M455 -40 C445 150 440 300 430 660" />
                  <path className="borda larga" d="M-40 472 C300 455 600 470 1040 450" />
                  <path className="larga" d="M-40 472 C300 455 600 470 1040 450" />
                </g>
                <g className="hs-rt-nomes">
                  <text x="452" y="70" transform="rotate(-87 452 70)">{s.rotulos.rs118}</text>
                  <text x="880" y="446">{s.rotulos.freeway}</text>
                  <text x="250" y="250" className="rio" transform="rotate(-10 250 250)">{s.rotulos.rio}</text>
                  <text x="40" y="370" className="cidade">{s.rotulos.capital}</text>
                  <text x="560" y="180" className="cidade">{s.rotulos.centro}</text>
                </g>
                <g className="hs-rt-condominio">
                  <path d="M670 280 L735 270 L745 330 L680 340Z" />
                  <path className="lotes" d="M686 288 L692 333 M702 285 L708 331 M718 283 L724 329 M672 300 L740 290 M676 318 L742 308" />
                </g>
                {/* Só a rota escolhida é desenhada; a key remonta o traço e o ponto a cada troca. */}
                <g key={ativo} className="hs-rt-rota">
                  <path className="borda" d={d.trajeto} pathLength={1} />
                  <path className="linha" d={d.trajeto} pathLength={1} />
                  <path className="carro-b" d={d.trajeto} pathLength={1} />
                  <path className="carro" d={d.trajeto} pathLength={1} />
                </g>
                {s.destinos.map((x, k) => (
                  <g key={x.nome} className={`hs-rt-pino ${k === ativo ? "on" : ""}`} transform={`translate(${x.ponto[0]} ${x.ponto[1]})`} onClick={() => setAtivo(k)}>
                    <g key={k === ativo ? `on-${ativo}` : "off"}>
                      <path d="M0 0 C-4 -10 -14 -16 -14 -27 A14 14 0 1 1 14 -27 C14 -16 4 -10 0 0Z" />
                      <circle cx="0" cy="-27" r="5" />
                    </g>
                    <text x="18" y="-22">
                      {x.curto}
                    </text>
                  </g>
                ))}
                <circle className="hs-rt-onda" cx={ORIGEM.x} cy={ORIGEM.y} r="10" />
                <circle className="hs-rt-origem" cx={ORIGEM.x} cy={ORIGEM.y} r="10" />
              </g>
            </svg>
            <p className="hs-rt-busca">
              <Ic nome="pino" tamanho={18} />
              {s.busca}
            </p>
            <div className="hs-rt-ctrl">
              <button type="button" aria-label={t.aproximar} onClick={() => setZoom((z) => Math.min(ZOOM.max, +(z + ZOOM.passo).toFixed(1)))}>
                +
              </button>
              <button type="button" aria-label={t.afastar} onClick={() => setZoom((z) => Math.max(ZOOM.min, +(z - ZOOM.passo).toFixed(1)))}>
                −
              </button>
            </div>
            <p className="hs-rt-escala">
              <i />
              {s.escala}
            </p>
            <p className="hs-rt-aviso">{s.aviso}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
