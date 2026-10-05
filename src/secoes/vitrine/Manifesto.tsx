"use client";

import { useState } from "react";
import { TituloSecao } from "@/components/TituloSecao";
import { manifesto, marcas } from "@/dados/vitrine";

export function Manifesto() {
  const [ativo, setAtivo] = useState(0);
  const pilar = manifesto.pilares[ativo];

  return (
    <section className="manif" id="hm-manifesto">
      <img
        className="tracado"
        data-px="0.1"
        src={marcas.tracado.src}
        width={marcas.tracado.largura}
        height={marcas.tracado.altura}
        alt=""
      />
      <div className="manif-topo rv">
        <TituloSecao titulo={manifesto.titulo} />
        <p>{manifesto.texto}</p>
      </div>
      <div className="pano rv">
        {manifesto.imagens.map((im, i) => (
          <img
            key={im.src}
            className={i === ativo ? "on" : undefined}
            src={im.src}
            width={im.largura}
            height={im.altura}
            alt={im.alt}
            loading="lazy"
          />
        ))}
        <p className="pano-frase" id="hm-pano-frase" aria-live="polite">
          {pilar.frase}
        </p>
      </div>
      <div className="pilares">
        {manifesto.pilares.map((p, i) => (
          <button
            key={p.titulo}
            className={i === ativo ? "pilar on" : "pilar"}
            type="button"
            aria-pressed={i === ativo}
            onMouseEnter={() => setAtivo(i)}
            onFocus={() => setAtivo(i)}
            onClick={() => setAtivo(i)}
          >
            <span className="ico" aria-hidden="true">
              <svg className="fino" width="30" height="30" viewBox="0 0 256 256" fill="currentColor">
                <path d={p.icone.fino} />
              </svg>
              <svg className="cheio" width="30" height="30" viewBox="0 0 256 256" fill="currentColor">
                <path d={p.icone.cheio} />
              </svg>
            </span>
            <span>
              <strong>{p.titulo}</strong>
              <small>{p.descricao}</small>
              <i />
            </span>
          </button>
        ))}
      </div>
      <p className="pilar-desc" id="hm-pilar-desc" aria-live="polite">
        {pilar.descricao}
      </p>
    </section>
  );
}
