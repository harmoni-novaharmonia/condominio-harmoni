"use client";

import { useRef, useState } from "react";
import { ChevronDireita, ChevronEsquerda, SetaDireita } from "@/components/Icones";
import { TituloSecao } from "@/components/TituloSecao";
import { useVitrine } from "@/components/VitrineContexto";
import { lazer, marcas } from "@/dados/vitrine";

export function Lazer() {
  const { reduz } = useVitrine();
  const total = lazer.areas.length;
  const [atual, setAtual] = useState(0);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);

  const vai = (i: number) => {
    const novo = ((i % total) + total) % total;
    setAtual(novo);
    // No celular as abas rolam na horizontal: mantém a ativa à vista.
    abas.current[novo]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: reduz ? "auto" : "smooth",
    });
  };

  return (
    <section className="lazer" id="hm-lazer">
      <img
        className="tracado"
        data-px="-0.06"
        src={marcas.tracado.src}
        width={marcas.tracado.largura}
        height={marcas.tracado.altura}
        alt=""
      />
      <div className="lz">
        <div className="lz-lista">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <TituloSecao titulo={lazer.titulo} />
            <p className="sub">{lazer.subtitulo}</p>
          </div>
          <div className="lz-abas" role="tablist" aria-label={lazer.rotuloAbas}>
            {lazer.areas.map((a, i) => (
              <button
                key={a.nome}
                ref={(el) => {
                  abas.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={i === atual}
                onClick={() => vai(i)}
              >
                {a.nome}
                <SetaDireita />
              </button>
            ))}
          </div>
          <p className="lz-nota">{lazer.nota}</p>
        </div>
        <div className="lz-palco">
          <div className="lz-imgs">
            {lazer.areas.map((a, i) => (
              <img
                key={a.nome}
                className={i === atual ? "on" : undefined}
                src={a.imagem.src}
                width={a.imagem.largura}
                height={a.imagem.altura}
                alt={a.imagem.alt}
                loading={i === 0 ? undefined : "lazy"}
              />
            ))}
          </div>
          <div className="lz-leg">
            <p>
              <strong>{lazer.areas[atual].nome}</strong>{" "}
              <span>
                {atual + 1} de {total}
              </span>
            </p>
            <div className="h-setas">
              <button className="circ" type="button" aria-label={lazer.anterior} onClick={() => vai(atual - 1)}>
                <ChevronEsquerda />
              </button>
              <button className="circ" type="button" aria-label={lazer.proxima} onClick={() => vai(atual + 1)}>
                <ChevronDireita />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
