"use client";

import { useRef, useState } from "react";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { textosGerais } from "@/empreendimentos/comum";
import type { HortensiasItens } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Item por item: uma lista grande de espaços. O item sob o mouse (ou tocado)
// inunda a seção com a foto dele, num círculo que nasce no cursor; o texto
// passa a claro sobre a foto. Ao sair da lista, a foto se fecha de volta.
export function Itens({ s }: { s: HortensiasItens }) {
  const [ativo, setAtivo] = useState<number | null>(null);
  const sec = useRef<HTMLElement>(null);

  const mira = (x: number, y: number) => {
    const el = sec.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--cx", `${x - r.left}px`);
    el.style.setProperty("--cy", `${y - r.top}px`);
  };

  return (
    <section id="diferenciais" ref={sec} className={`secao hs hs-itens ${ativo === null ? "" : "cheio"}`} onPointerMove={(e) => mira(e.clientX, e.clientY)}>
      <div className="hs-it-camadas" aria-hidden="true">
        {s.itens.map((x, k) => (
          <div key={x.titulo} className={`hs-it-camada ${k === ativo ? "on" : ""}`}>
            <img src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt="" loading="lazy" decoding="async" />
            {x.imagem.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
          </div>
        ))}
      </div>
      <div className="casca hs-it-grade">
        <div>
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
        </div>
        <ul className="hs-it-lista" onPointerLeave={(e) => e.pointerType === "mouse" && setAtivo(null)}>
          {s.itens.map((x, k) => (
            <li key={x.titulo}>
              <button
                type="button"
                aria-pressed={k === ativo}
                onPointerEnter={(e) => e.pointerType === "mouse" && setAtivo(k)}
                onFocus={() => setAtivo(k)}
                onClick={(e) => {
                  mira(e.clientX, e.clientY);
                  setAtivo(k === ativo ? null : k);
                }}
              >
                <small>{dois(k + 1)}</small>
                {x.titulo}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
