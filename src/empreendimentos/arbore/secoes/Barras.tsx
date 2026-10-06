"use client";

import { useRef } from "react";
import { Titulo } from "@/components/lp/Titulo";
import { grupo, marcasGrupo, numerosGrupo, textosInteracao, tracado } from "@/empreendimentos/comum";
import { useEspera } from "@/hooks/useEspera";

const br = (n: number) => n.toLocaleString("pt-BR");

// Grupo SFA com os lotes de cada empreendimento em barras na mesma escala, que
// crescem de baixo para cima quando aparecem. Uma série só: uma cor, base comum,
// valor e nome em tinta de texto.
export function Barras() {
  const grafico = useRef<HTMLElement>(null);
  useEspera(grafico, "espera", 0.35);
  const maximo = Math.max(...numerosGrupo.itens.map((x) => x.lotes));
  return (
    <section className="secao ab ab-grupo">
      <img className="marca-dagua" src={tracado.petroleo} width={1350} height={783} alt="" loading="lazy" />
      <div className="casca ab-grupo-grade">
        <div className="ab-grupo-txt">
          <div className="ab-logos">
            <img src={marcasGrupo.novaHarmonia.src} width={marcasGrupo.novaHarmonia.largura} height={marcasGrupo.novaHarmonia.altura} alt={marcasGrupo.novaHarmonia.alt} loading="lazy" />
            <i />
            <img src={marcasGrupo.sfa.src} width={marcasGrupo.sfa.largura} height={marcasGrupo.sfa.altura} alt={marcasGrupo.sfa.alt} loading="lazy" />
          </div>
          <p className="sobretitulo">
            {grupo.frase.antes}
            {grupo.frase.destaque}
          </p>
          <Titulo texto={grupo.chamada} className="d titulo-secao" />
          <div className="pilha-txt">
            {grupo.paragrafos.map((p) => (
              <p key={p} className="txt">
                {p}
              </p>
            ))}
          </div>
        </div>
        <figure ref={grafico} className="ab-barras">
          <p className="ab-barras-tit">{textosInteracao.lotesPorEmpreendimento}</p>
          <ul>
            {numerosGrupo.itens.map((x, k) => (
              <li key={x.nome} tabIndex={0} style={{ ["--h" as string]: (x.lotes / maximo).toFixed(4), ["--k" as string]: k }} aria-label={`${x.nome}, ${x.cidade}: ${br(x.lotes)} ${numerosGrupo.rotulo}`}>
                <span className="ab-barra-area">
                  <strong>{br(x.lotes)}</strong>
                  <span className="ab-barra" />
                </span>
                <em>{x.nome}</em>
                <small>{x.cidade}</small>
              </li>
            ))}
          </ul>
          <figcaption>{numerosGrupo.fonte}</figcaption>
        </figure>
      </div>
    </section>
  );
}
