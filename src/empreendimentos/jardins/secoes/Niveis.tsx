"use client";

import { useEffect, useRef, useState } from "react";
import { Cabecalho } from "@/components/lp/Cabecalho";
import { IcTinta } from "@/components/lp/IcTinta";
import { camadasCorte, textosInteracao } from "@/empreendimentos/comum";
import type { Item } from "@/empreendimentos/tipos";
import type { JardinsNiveis } from "../tipos";

/** Altura do chão no corte (% da imagem). */
const CHAO = 65.5;
const SUBSOLO: Item["icone"][] = ["rede-de-agua", "rede-de-esgoto", "rede-de-drenagem"];

// Corte da rua dividido no nível do chão. Cada lista fica ao lado da sua metade
// da imagem e a linha do chão atravessa as duas colunas; a metade que não está em
// foco escurece. As camadas acendem uma a uma até a pessoa escolher uma.
export function Niveis({ s }: { s: JardinsNiveis }) {
  // Numeradas por nível: primeiro a superfície, depois o subsolo.
  const comCamada = s.itens.flatMap((it) => {
    const pos = camadasCorte[it.icone];
    return pos ? [{ ...it, pos }] : [];
  });
  const camadas = [...comCamada.filter((x) => !SUBSOLO.includes(x.icone)), ...comCamada.filter((x) => SUBSOLO.includes(x.icone))];
  const [ativa, setAtiva] = useState(0);
  const [zonaHover, setZonaHover] = useState<"cima" | "baixo" | null>(null);
  const auto = useRef(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visivel = false;
    const io = new IntersectionObserver((e) => (visivel = e.some((x) => x.isIntersecting)), { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    const id = window.setInterval(() => {
      if (auto.current && visivel) setAtiva((a) => (a % camadas.length) + 1);
    }, 2400);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [camadas.length]);

  const escolhe = (n: number) => {
    auto.current = false;
    setZonaHover(null);
    setAtiva(n);
  };
  const atual = camadas[ativa - 1];
  const zonaAtiva = atual ? (SUBSOLO.includes(atual.icone) ? "baixo" : "cima") : null;
  const zona = zonaHover ?? zonaAtiva;

  const grupo = (qual: "cima" | "baixo", titulo: string) => {
    const lista = camadas.map((c, k) => ({ ...c, n: k + 1 })).filter((c) => SUBSOLO.includes(c.icone) === (qual === "baixo"));
    return (
      <div className="jd-nivel">
        <h3 onMouseEnter={() => setZonaHover(qual)} onMouseLeave={() => setZonaHover(null)}>
          {titulo}
          <small>{textosInteracao.itens(lista.length)}</small>
        </h3>
        <ol>
          {lista.map((c) => (
            <li key={c.titulo}>
              <button type="button" aria-current={ativa === c.n} onMouseEnter={() => escolhe(c.n)} onClick={() => escolhe(c.n)}>
                <b>{c.n}</b>
                <IcTinta nome={c.icone} />
                <span>{c.titulo}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <section className="secao jd jd-niveis fundo-noite">
      <div className="casca">
        <Cabecalho sobretitulo={s.sobretitulo} titulo={s.titulo} direita={<p className="dica">{textosInteracao.dicaCorte}</p>} />
        <div className="jd-niveis-grade" style={{ ["--chao" as string]: `${CHAO}%` }}>
          <div ref={ref} className="jd-corte" data-zona={zona ?? undefined}>
            <img src={s.imagem.src} width={s.imagem.largura} height={s.imagem.altura} alt={s.imagem.alt} loading="lazy" decoding="async" />
            <span className="jd-veu jd-veu-cima" />
            <span className="jd-veu jd-veu-baixo" />
            <span className="jd-chao" aria-hidden="true" />
            {camadas.map((c, k) => (
              <button
                key={c.titulo}
                type="button"
                className={`cr-camada ${ativa === k + 1 ? "on" : ""}`}
                style={{ left: `${c.pos.x}%`, top: `${c.pos.y}%` }}
                aria-label={c.titulo}
                onMouseEnter={() => escolhe(k + 1)}
                onClick={() => escolhe(k + 1)}
              >
                {k + 1}
              </button>
            ))}
            {atual && (
              <span className="cr-bal" style={{ left: `${atual.pos.x}%`, top: `${atual.pos.y}%` }}>
                {atual.titulo}
              </span>
            )}
          </div>
          <div className="jd-niveis-listas">
            {grupo("cima", textosInteracao.superficie)}
            {grupo("baixo", textosInteracao.subsolo)}
          </div>
        </div>
      </div>
    </section>
  );
}
