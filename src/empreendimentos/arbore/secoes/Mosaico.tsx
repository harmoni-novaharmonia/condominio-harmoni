"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Cabecalho } from "@/components/lp/Cabecalho";
import { Luz } from "@/components/lp/Luz";
import { SetasRedondas } from "@/components/lp/SetaRedonda";
import { textosGerais, textosInteracao } from "@/empreendimentos/comum";
import type { ArboreMosaico } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");
const CURVA = "cubic-bezier(0.22, 0.8, 0.24, 1)";

// Mosaico de 7 fotos (uma grande e seis pequenas). Clicar numa pequena troca ela
// de lugar com a grande: as duas voam até o lugar da outra (técnica FLIP). Clicar
// na grande abre em tela cheia; setas e teclado também trocam.
export function Mosaico({ s }: { s: ArboreMosaico }) {
  const n = s.itens.length;
  // Lugar de cada foto no mosaico (t0 é o grande).
  const [lugares, setLugares] = useState(() => s.itens.map((_, i) => i));
  const [grande, setGrande] = useState(0);
  const [luz, setLuz] = useState<number | null>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const voo = useRef<{ i: number; r: DOMRect }[] | null>(null);

  const troca = (k: number) => {
    if (k === grande) return;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduz) {
      voo.current = [grande, k].flatMap((i) => {
        const el = tiles.current[i];
        return el ? [{ i, r: el.getBoundingClientRect() }] : [];
      });
    }
    setLugares((l) => {
      const novo = [...l];
      [novo[grande], novo[k]] = [novo[k], novo[grande]];
      return novo;
    });
    setGrande(k);
  };

  // Depois de trocar os lugares, cada foto parte do retângulo antigo até o novo.
  useLayoutEffect(() => {
    const v = voo.current;
    voo.current = null;
    v?.forEach(({ i, r }) => {
      const el = tiles.current[i];
      if (!el) return;
      const r1 = el.getBoundingClientRect();
      const sx = r.width / r1.width;
      const sy = r.height / r1.height;
      el.classList.add("voa");
      const an = el.animate([{ transform: `translate(${r.left - r1.left}px, ${r.top - r1.top}px) scale(${sx}, ${sy})` }, { transform: "none" }], { duration: 800, easing: CURVA });
      el.querySelector("img")?.animate([{ transform: `scale(${1 / sx}, ${1 / sy})` }, { transform: "none" }], { duration: 800, easing: CURVA });
      an.onfinish = () => el.classList.remove("voa");
    });
  }, [grande]);

  const atual = s.itens[grande];
  return (
    <section
      id="perspectivas"
      className="secao ab ab-mosaico-sec fundo-noite"
      onKeyDown={(e) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        e.preventDefault();
        troca((grande + (e.key === "ArrowRight" ? 1 : -1) + n) % n);
      }}
    >
      <div className="casca">
        <Cabecalho
          sobretitulo={s.sobretitulo}
          titulo={s.titulo}
          direita={
            <div className="ab-mos-ctrl">
              <p className="contador">
                <b>{dois(grande + 1)}</b> / {dois(n)}
              </p>
              <SetasRedondas onAnterior={() => troca((grande - 1 + n) % n)} onProxima={() => troca((grande + 1) % n)} onAmpliar={() => setLuz(grande)} />
            </div>
          }
        />
        <div className="ab-mosaico">
          {s.itens.map((x, i) => (
            <button
              key={x.nome + i}
              ref={(el) => {
                tiles.current[i] = el;
              }}
              type="button"
              className={`ab-tile ${i === grande ? "grande" : ""}`}
              style={{ gridArea: `t${lugares[i]}` }}
              aria-label={i === grande ? textosInteracao.ampliarNome(x.nome) : textosInteracao.ver(x.nome)}
              onClick={() => (i === grande ? setLuz(i) : troca(i))}
            >
              <img src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt={x.imagem.alt} loading={i > 2 ? "lazy" : "eager"} decoding="async" />
              {x.imagem.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
              <span className="ab-tile-nome">{x.nome}</span>
            </button>
          ))}
          <div className="ab-mos-leg" aria-live="polite">
            <b>{dois(grande + 1)}</b>
            <strong>{atual?.nome}</strong>
            <span>{atual?.texto}</span>
            <small>{textosInteracao.dicaMosaico}</small>
          </div>
        </div>
      </div>
      <Luz itens={s.itens} indice={luz} onMudar={setLuz} />
    </section>
  );
}
