"use client";

import { useState } from "react";
import { TituloSecao } from "@/components/TituloSecao";
import { useVitrine } from "@/components/VitrineContexto";
import { cidades, porCidade } from "@/dados/empreendimentos";
import { ancoras, coordenadas, onde as t } from "@/dados/vitrine";

const rad = (g: number) => (g * Math.PI) / 180;
const [LAT0, LON0] = coordenadas[t.referencia];

/** Distância em linha reta (haversine), em km. */
function km(cidade: string) {
  const [la, lo] = coordenadas[cidade];
  const x = Math.sin(rad(la - LAT0) / 2) ** 2 + Math.cos(rad(LAT0)) * Math.cos(rad(la)) * Math.sin(rad(lo - LON0) / 2) ** 2;
  return Math.round(2 * 6371 * Math.asin(Math.sqrt(x)));
}

// Projeção local a partir do centro de Porto Alegre: 10 px por km, norte para cima.
const ESCALA = 10;
const ORIGEM: [number, number] = [250, 210];
function ponto(cidade: string): [number, number] {
  const [la, lo] = coordenadas[cidade];
  return [
    ORIGEM[0] + (lo - LON0) * 111.32 * Math.cos(rad(LAT0)) * ESCALA,
    ORIGEM[1] - (la - LAT0) * 110.57 * ESCALA,
  ];
}

export function Onde() {
  const { cidade, setCidade, rolaPara } = useVitrine();
  const [foco, setFoco] = useState("");
  const ativa = foco || cidade;
  const [px, py] = ORIGEM;
  const [cx, cy] = ponto(t.vizinha);

  const escolhe = (c: string, rolar: boolean) => {
    setCidade(c);
    if (rolar) rolaPara(ancoras.empreendimentos);
  };

  return (
    <section className="vt-onde g" id={ancoras.onde}>
      <div className="in">
        <div>
          <p className="rot">{t.rotulo}</p>
          <TituloSecao titulo={t.titulo} />
          <ul className="lista">
            {cidades.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  className={ativa === c ? "on" : undefined}
                  aria-pressed={cidade === c}
                  onClick={() => escolhe(cidade === c ? "" : c, false)}
                  onMouseEnter={() => setFoco(c)}
                  onMouseLeave={() => setFoco("")}
                >
                  <strong>{c}</strong>
                  <span className="km">
                    {t.aprox} {km(c)} {t.km}
                  </span>
                  <span className="hs">{porCidade(c).map((h) => h.nome).join(" · ")}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="obs">{t.obs}</p>
        </div>

        <div className="mapa">
          <svg viewBox="0 0 640 420" role="group" aria-label={t.rotuloMapa}>
            <path className="agua" d="M0 40 C120 70 214 120 236 180 C252 226 230 262 196 300 C160 340 120 380 96 420 L0 420 Z" />
            <text className="agua-t" x="40" y="330">
              {t.agua}
            </text>
            {t.aneis.map((r) => (
              <g key={r}>
                <circle className="anel" cx={px} cy={py} r={r * ESCALA} />
                <text className="anel-t" x={px + r * ESCALA * 0.707 + 4} y={py - r * ESCALA * 0.707 - 4}>
                  {r} {t.km}
                </text>
              </g>
            ))}
            {cidades.map((c) => {
              const [x, y] = ponto(c);
              return <line key={c} className={`linha${ativa === c ? " on" : ""}`} x1={px} y1={py} x2={x} y2={y} />;
            })}
            <g className="ref">
              <circle cx={cx} cy={cy} r={4} />
              <text x={cx} y={cy - 12} textAnchor="middle">
                {t.vizinha}
              </text>
            </g>
            <g className="ref poa">
              <circle cx={px} cy={py} r={7} />
              <text x={px - 14} y={py + 28} textAnchor="middle">
                {t.referencia}
              </text>
            </g>
            {cidades.map((c) => {
              const [x, y] = ponto(c);
              const n = porCidade(c).length;
              return (
                <g
                  key={c}
                  className={`pin${ativa === c ? " on" : ""}`}
                  tabIndex={0}
                  role="button"
                  aria-label={`${c}: ${porCidade(c).map((h) => h.nome).join(", ")}`}
                  onClick={() => escolhe(c, true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      escolhe(c, true);
                    }
                  }}
                  onMouseEnter={() => setFoco(c)}
                  onMouseLeave={() => setFoco("")}
                  onFocus={() => setFoco(c)}
                  onBlur={() => setFoco("")}
                >
                  <circle className="halo" cx={x} cy={y} r={16} />
                  <circle className="pt" cx={x} cy={y} r={11} />
                  <text className="qt" x={x} y={y + 4} textAnchor="middle">
                    {n}
                  </text>
                  <text className="nm" x={x} y={y - 22} textAnchor="middle">
                    {c}
                  </text>
                </g>
              );
            })}
          </svg>
          <span className="bussola" aria-hidden="true">
            {t.norte}
            <i />
          </span>
          <span className="legenda">{t.legendaMapa}</span>
        </div>
      </div>
    </section>
  );
}
