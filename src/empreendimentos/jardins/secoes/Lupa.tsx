"use client";

import { useRef, useState } from "react";
import { Cabecalho } from "@/components/lp/Cabecalho";
import { IcTinta } from "@/components/lp/IcTinta";
import { Luz } from "@/components/lp/Luz";
import { textosGerais, textosInteracao } from "@/empreendimentos/comum";
import type { JardinsLupa } from "../tipos";

const ZOOM = 2.2;

// Implantação com lupa: no mouse, um círculo segue o ponteiro e mostra a planta de
// perto. No toque não há lupa; tocar na planta abre em tela cheia.
export function Lupa({ s }: { s: JardinsLupa }) {
  const caixa = useRef<HTMLDivElement>(null);
  const lente = useRef<HTMLSpanElement>(null);
  const [mira, setMira] = useState(false);
  const [luz, setLuz] = useState<number | null>(null);
  const fino = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const itemLuz = [{ nome: s.titulo.destaque, texto: s.sobretitulo, imagem: s.planta }];

  return (
    <section id="implantacao" className="secao jd jd-impl">
      <div className="casca">
        <Cabecalho
          sobretitulo={s.sobretitulo}
          titulo={s.titulo}
          direita={
            s.cta && (
              <a className="bt bt-escuro" href={`#${s.cta.alvo}`}>
                {s.cta.rotulo}
              </a>
            )
          }
        />
        <div
          ref={caixa}
          className={`jd-planta ${mira ? "mira" : ""}`}
          style={{ ["--img" as string]: `url("${s.planta.src}")` }}
          onPointerMove={(e) => {
            const el = caixa.current;
            const l = lente.current;
            if (!el || !l || !fino() || (e.target as HTMLElement).closest("button")) return setMira(false);
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            const meio = l.clientWidth / 2;
            l.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
            l.style.backgroundSize = `${(r.width * ZOOM).toFixed(0)}px ${(r.height * ZOOM).toFixed(0)}px`;
            l.style.backgroundPosition = `${(meio - x * ZOOM).toFixed(1)}px ${(meio - y * ZOOM).toFixed(1)}px`;
            setMira(true);
          }}
          onPointerLeave={() => setMira(false)}
          onClick={() => !fino() && setLuz(0)}
        >
          {s.planta.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
          <img src={s.planta.src} width={s.planta.largura} height={s.planta.altura} alt={s.planta.alt} draggable={false} loading="lazy" decoding="async" />
          <span ref={lente} className="jd-lente" aria-hidden="true" />
          <span className="jd-planta-dica" aria-hidden="true">
            {textosInteracao.dicaLupa}
          </span>
          <button
            type="button"
            className="jd-planta-tela"
            onClick={(e) => {
              e.stopPropagation();
              setLuz(0);
            }}
          >
            {textosInteracao.plantaTelaCheia}
          </button>
        </div>
        <ul className="jd-impl-leg">
          {s.legenda.map((x) => (
            <li key={x.titulo}>
              <span className="jd-bolha">
                <IcTinta nome={x.icone} />
              </span>
              <span>{x.titulo}</span>
            </li>
          ))}
        </ul>
      </div>
      <Luz itens={itemLuz} indice={luz} onMudar={setLuz} />
    </section>
  );
}
