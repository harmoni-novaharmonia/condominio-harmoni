"use client";

import { useEffect, useRef, useState } from "react";
import { Cabecalho } from "@/components/lp/Cabecalho";
import { camadasCorte, textosInteracao } from "@/empreendimentos/comum";
import type { Item } from "@/empreendimentos/tipos";
import type { ArboreAnotado } from "../tipos";

type Desenho = { largura: number; altura: number; topos: number[]; guias: string[]; lideres: string[] };

/** Camadas que aparecem no corte, ordenadas pela profundidade na imagem (do poste ao subsolo). */
const camadasDe = (itens: Item[]) =>
  itens
    .flatMap((it) => {
      const pos = camadasCorte[it.icone];
      return pos ? [{ ...it, pos }] : [];
    })
    .sort((a, b) => a.pos.y - b.pos.y);

// Corte da rua anotado como desenho de arquiteto: as camadas vão do poste ao
// subsolo e cada legenda fica na altura da sua camada (afastada só o necessário
// para não encostar na vizinha), ligada por uma linha de chamada. A guia
// tracejada até o número aparece no item ativo. No celular a lista vai para baixo.
export function Anotado({ s }: { s: ArboreAnotado }) {
  const camadas = camadasDe(s.itens);
  const [ativa, setAtiva] = useState(0);
  const [desenho, setDesenho] = useState<Desenho | null>(null);
  const auto = useRef(true);
  const grade = useRef<HTMLDivElement>(null);
  const corte = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLOListElement>(null);

  // Rodízio automático enquanto a pessoa não escolhe uma camada.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visivel = false;
    const io = new IntersectionObserver((e) => (visivel = e.some((x) => x.isIntersecting)), { threshold: 0.4 });
    if (corte.current) io.observe(corte.current);
    const id = window.setInterval(() => {
      if (auto.current && visivel) setAtiva((a) => (a % camadas.length) + 1);
    }, 2400);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [camadas.length]);

  // Posição das legendas e das linhas, medida a cada mudança de tamanho.
  useEffect(() => {
    const g = grade.current;
    const c = corte.current;
    const l = lista.current;
    if (!g || !c || !l) return;
    const ordem = camadasDe(s.itens);
    const ys = ordem.map((x) => x.pos.y);
    const xs = ordem.map((x) => x.pos.x);
    const mede = () => {
      if (window.matchMedia("(max-width: 900px)").matches) return setDesenho(null);
      const rg = g.getBoundingClientRect();
      const rc = c.getBoundingClientRect();
      const rl = l.getBoundingClientRect();
      const item = l.querySelector("li");
      const alt = Math.max(44, (item?.offsetHeight ?? 40) + 6);
      const topo = rc.top - rg.top;
      const pe = topo + rc.height;
      const alvo = ys.map((y) => topo + (y / 100) * rc.height);
      const pos: number[] = [];
      alvo.forEach((y, k) => pos.push(Math.max(y, k ? pos[k - 1] + alt : topo + alt / 2)));
      for (let k = pos.length - 1, lim = pe - alt / 2; k >= 0; k--, lim -= alt) pos[k] = Math.min(pos[k], lim);
      const borda = rc.right - rg.left;
      const xLeg = rl.left - rg.left;
      const f = (v: number) => v.toFixed(1);
      setDesenho({
        largura: rg.width,
        altura: rg.height,
        topos: pos.map((p) => p - (rl.top - rg.top)),
        guias: alvo.map((y, k) => `M${f(rc.left - rg.left + (xs[k] / 100) * rc.width)} ${f(y)} H${f(borda)}`),
        lideres: alvo.map((y, k) => `M${f(borda)} ${f(y)} H${f(borda + 18)} L${f(xLeg + 4)} ${f(pos[k])} H${f(xLeg + 16)}`),
      });
    };
    const ro = new ResizeObserver(mede);
    ro.observe(g);
    return () => ro.disconnect();
  }, [s.itens]);

  const escolhe = (n: number) => {
    auto.current = false;
    setAtiva(n);
  };
  const atual = camadas[ativa - 1];

  return (
    <section className="secao ab ab-anotado fundo-noite">
      <div className="casca">
        <Cabecalho sobretitulo={s.sobretitulo} titulo={s.titulo} direita={<p className="dica">{textosInteracao.dicaAnotado}</p>} />
        <div ref={grade} className={`ab-an-grade ${desenho ? "medido" : ""}`}>
          <div ref={corte} className={`ab-corte ${ativa ? "foco" : ""}`}>
            <img src={s.imagem.src} width={s.imagem.largura} height={s.imagem.altura} alt={s.imagem.alt} loading="lazy" decoding="async" />
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
          <ol ref={lista} className="ab-an-lista">
            {camadas.map((c, k) => (
              <li key={c.titulo} style={desenho ? { top: `${desenho.topos[k]}px` } : undefined}>
                <button type="button" aria-current={ativa === k + 1} onMouseEnter={() => escolhe(k + 1)} onClick={() => escolhe(k + 1)}>
                  <b>{k + 1}</b>
                  <span>{c.titulo}</span>
                </button>
              </li>
            ))}
          </ol>
          {desenho && (
            <svg className="ab-an-linhas" viewBox={`0 0 ${desenho.largura} ${desenho.altura}`} aria-hidden="true">
              {camadas.map((c, k) => (
                <g key={c.titulo} className={ativa === k + 1 ? "on" : undefined}>
                  <path className="ab-guia" d={desenho.guias[k]} />
                  <path className="ab-lider" d={desenho.lideres[k]} />
                </g>
              ))}
            </svg>
          )}
        </div>
      </div>
    </section>
  );
}
