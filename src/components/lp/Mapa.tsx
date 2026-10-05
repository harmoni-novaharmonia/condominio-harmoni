"use client";

import { useState } from "react";
import { textosGerais as t } from "@/empreendimentos/comum";
import type { SecaoLocalizacao } from "@/empreendimentos/tipos";
import { Ic } from "./Ic";

type Props = SecaoLocalizacao["mapa"] & { nome: string };

/** Localização: um formato por LP. Os mapas ilustrados não são em escala; o real
 *  (Google Maps) entra quando cada empreendimento tiver o endereço confirmado. */
export function Mapa({ variante, endereco, pontos, foto, nome }: Props) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(0);
  const grupos = Array.from(new Set(pontos.map((p) => p.grupo).filter(Boolean))) as string[];
  const [aba, setAba] = useState(0);
  const atual = pontos[i];

  const Endereco = ({ claro }: { claro?: boolean }) => (
    <div className={`map-end ${claro ? "map-end-claro" : ""}`}>
      <p className="map-rot">{t.endereco}</p>
      <p className="map-endereco">{endereco}</p>
    </div>
  );

  if (variante === "foto" && foto) {
    const escalas = [1, 1.5, 2.2];
    return (
      <div className="map map-foto">
        <div className="mapf-palco">
          <img src={foto.src} width={foto.largura} height={foto.altura} alt={foto.alt} loading="lazy" style={{ transform: `scale(${escalas[zoom]})` }} />
          <div className="mapf-zoom">
            <button type="button" aria-label={t.aproximar} onClick={() => setZoom((z) => Math.min(2, z + 1))}>
              +
            </button>
            <button type="button" aria-label={t.afastar} onClick={() => setZoom((z) => Math.max(0, z - 1))}>
              −
            </button>
          </div>
        </div>
        <div className="mapf-lado">
          <div className="mapf-end">
            <p className="map-rot">{t.endereco}</p>
            <p className="map-endereco">{endereco}</p>
          </div>
          {pontos.map((p, k) => (
            <button key={p.titulo} type="button" className="map-item" data-ativo={k === i} onClick={() => setI(k)}>
              <span className="map-bola">
                <Ic nome={p.icone} tamanho={22} />
              </span>
              <span>
                <span className="map-tit">{p.titulo}</span>
                {p.texto && <span className="map-sub">{p.texto}</span>}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variante === "ilustrado") {
    return (
      <div className="map map-ilustrado">
        <div className="mapi-ruas" aria-hidden="true">
          <span className="r1" />
          <span className="r2" />
          <span className="r3" />
          <span className="r4" />
          <span className="v1" />
          <span className="v2" />
          <span className="agua" />
        </div>
        <div className="mapi-centro">
          <span className="map-pulso" />
          <span className="mapi-nome">{nome}</span>
        </div>
        {pontos.map((p, k) => (
          <button key={p.titulo} type="button" className="map-pino" data-ativo={k === i} style={{ left: p.x, top: p.y }} aria-label={p.titulo} onClick={() => setI(k)}>
            <Ic nome={p.icone} tamanho={26} />
          </button>
        ))}
        <div className="mapi-cartao">
          <Endereco />
          {pontos.map((p, k) => (
            <button key={p.titulo} type="button" className="map-item" data-ativo={k === i} onClick={() => setI(k)}>
              <Ic nome={p.icone} tamanho={26} />
              <span className="map-tit">{p.titulo}</span>
            </button>
          ))}
          <p className="map-nota">{t.mapaIlustrativo}</p>
        </div>
      </div>
    );
  }

  if (variante === "radar") {
    return (
      <div className="map map-radar">
        <div className="mapr-disco">
          <span className="mapr-anel a1" />
          <span className="mapr-anel a2" />
          <span className="mapr-anel a3" />
          <span className="mapr-onda" />
          <span className="mapr-centro">
            <Ic nome="lote" tamanho={44} className="ic-claro" />
          </span>
          {pontos.map((p, k) => (
            <button key={p.titulo} type="button" className="map-pino" data-ativo={k === i} style={{ left: p.x, top: p.y }} aria-label={p.titulo} onClick={() => setI(k)}>
              <Ic nome={p.icone} tamanho={26} />
            </button>
          ))}
        </div>
        <div>
          <Endereco />
          <div className="mapr-cartao" aria-live="polite">
            <Ic nome={atual.icone} tamanho={44} />
            <p className="mapr-tit">{atual.titulo}</p>
            {atual.texto && <p className="mapr-sub">{atual.texto}</p>}
          </div>
          <p className="map-nota">{t.radarDica}</p>
        </div>
      </div>
    );
  }

  if (variante === "abas") {
    const g = grupos[aba];
    const lista = pontos.filter((p) => p.grupo === g);
    return (
      <div className="map map-abas">
        <div className="mapa-lado">
          <Endereco claro />
          <div className="mapa-tabs" role="tablist">
            {grupos.map((nomeAba, k) => (
              <button key={nomeAba} type="button" role="tab" aria-selected={k === aba} data-ativo={k === aba} onClick={() => setAba(k)}>
                {nomeAba}
              </button>
            ))}
          </div>
          <div className="mapa-lista" role="tabpanel">
            {lista.map((p) => (
              <div key={p.titulo} className="mapa-item">
                <Ic nome={p.icone} tamanho={30} className="ic-claro" />
                <span>
                  <span className="map-tit">{p.titulo}</span>
                  {p.texto && <span className="map-sub">{p.texto}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mapa-desenho">
          <span className="l1" />
          <span className="l2" />
          <span className="l3" />
          <span className="mapa-centro">
            <span className="map-pulso" />
          </span>
          {lista.map((p) => (
            <span key={p.titulo} className="mapa-etiqueta" style={{ left: p.x, top: p.y }}>
              <Ic nome={p.icone} tamanho={22} />
              {p.titulo}
            </span>
          ))}
          <p className="map-nota">{t.mapaIlustrativo}</p>
        </div>
      </div>
    );
  }

  // rota
  return (
    <div className="map map-rota">
      <div className="mapo-topo">
        <p>
          <strong>{t.endereco}</strong> · {endereco}
        </p>
        <p className="map-nota">{t.rotaDica}</p>
      </div>
      <div className="mapo-rolagem">
      <div className="mapo-linha" style={{ ["--p" as string]: atual.x ?? "0%" }}>
        <span className="mapo-trilho" />
        <span className="mapo-feito" />
        <span className="mapo-carro" />
        {pontos.map((p, k) => (
          <button key={p.titulo} type="button" className="mapo-parada" data-feito={k <= i} style={{ left: p.x }} onClick={() => setI(k)}>
            <span className="mapo-bola">
              <Ic nome={p.icone} tamanho={40} />
            </span>
            <span className="mapo-nome">{p.titulo}</span>
          </button>
        ))}
      </div>
      </div>
      <div className="mapo-detalhe" aria-live="polite">
        <Ic nome={atual.icone} tamanho={56} />
        <div>
          <p className="mapr-tit">{atual.titulo}</p>
          {atual.texto && <p className="mapr-sub">{atual.texto}</p>}
        </div>
      </div>
    </div>
  );
}
