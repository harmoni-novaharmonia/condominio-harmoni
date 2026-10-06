"use client";

import { useRef } from "react";
import { Sobretitulo } from "@/components/lp/Titulo";
import { useEspera } from "@/hooks/useEspera";
import type { Imagem } from "@/empreendimentos/tipos";
import type { ValeDeclaracao } from "../tipos";

const Pilula = ({ imagem }: { imagem: Imagem }) => (
  <span className="vl-pilula" aria-hidden="true">
    <img src={imagem.src} width={imagem.largura} height={imagem.altura} alt="" loading="lazy" decoding="async" />
  </span>
);

// Frase grande com duas fotos dentro da linha, que abrem quando a frase aparece.
export function Declaracao({ s }: { s: ValeDeclaracao }) {
  const sec = useRef<HTMLElement>(null);
  useEspera(sec, "fechada", 0.35);
  const d = s.titulo.destaque.split(" ");
  return (
    <section ref={sec} className="secao vl vl-declaracao">
      <div className="casca">
        <Sobretitulo texto={s.sobretitulo} />
        <h2 className="d vl-dec-titulo">
          {s.titulo.antes?.trim()} <Pilula imagem={s.pilulas[0]} />{" "}
          <em>
            {d.slice(0, 2).join(" ")} <Pilula imagem={s.pilulas[1]} /> {d.slice(2).join(" ")}
          </em>
        </h2>
        <div className="vl-dec-pe">
          {s.paragrafos.map((p) => (
            <p key={p} className="txt">
              {p}
            </p>
          ))}
          {s.cta && (
            <a className="bt bt-escuro" href={`#${s.cta.alvo}`}>
              {s.cta.rotulo}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
