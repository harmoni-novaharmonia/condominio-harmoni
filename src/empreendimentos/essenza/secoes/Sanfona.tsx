"use client";

import { useEffect, useRef, useState } from "react";
import { Cabecalho } from "@/components/lp/Cabecalho";
import { Luz } from "@/components/lp/Luz";
import { SetasRedondas } from "@/components/lp/SetaRedonda";
import { textosGerais, textosInteracao } from "@/empreendimentos/comum";
import type { EssenzaSanfona } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Sete faixas com o nome deitado; a escolhida abre. Troca sozinha a cada 6 s
// (barra no topo) e para quando a pessoa interage. No celular vira sanfona vertical.
export function Sanfona({ s }: { s: EssenzaSanfona }) {
  const n = s.itens.length;
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visivel, setVisivel] = useState(false);
  const [dentro, setDentro] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [luz, setLuz] = useState<number | null>(null);
  const caixa = useRef<HTMLDivElement>(null);
  const espera = useRef<number | undefined>(undefined);

  useEffect(() => {
    const box = caixa.current;
    if (!box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    const mq = window.matchMedia("(max-width: 760px)");
    const muda = () => setVertical(mq.matches);
    muda();
    mq.addEventListener("change", muda);
    // A foto de cada faixa tem a largura da faixa aberta: abrir revela, não estica.
    const mede = () => {
      const gap = parseFloat(getComputedStyle(box).columnGap) || 0;
      box.style.setProperty("--sf-w", `${Math.round(((box.clientWidth - gap * (n - 1)) * 7) / (7 + n - 1))}px`);
    };
    const ro = new ResizeObserver(mede);
    ro.observe(box);
    const io = new IntersectionObserver((e) => setVisivel(e.some((x) => x.isIntersecting)), { threshold: 0.4 });
    io.observe(box);
    return () => {
      mq.removeEventListener("change", muda);
      ro.disconnect();
      io.disconnect();
    };
  }, [n]);

  const vai = (k: number, doUsuario: boolean) => {
    setI(((k % n) + n) % n);
    if (doUsuario) setAuto(false);
  };
  const corre = auto && visivel && !dentro && !vertical;

  return (
    <section id="perspectivas" className="secao ez ez-sanfona fundo-noite">
      <div className="casca">
        <Cabecalho
          sobretitulo={s.sobretitulo}
          titulo={s.titulo}
          direita={
            <div className="ez-sf-ctrl">
              <p className="contador">
                <b>{dois(i + 1)}</b> / {dois(n)}
              </p>
              <SetasRedondas onAnterior={() => vai(i - 1, true)} onProxima={() => vai(i + 1, true)} onAmpliar={() => setLuz(i)} />
            </div>
          }
        />
        <div
          ref={caixa}
          className="ez-sf"
          aria-roledescription="carrossel"
          aria-label={s.sobretitulo}
          onMouseEnter={() => setDentro(true)}
          onMouseLeave={() => setDentro(false)}
          onKeyDown={(e) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            e.preventDefault();
            const k = (i + (e.key === "ArrowRight" ? 1 : -1) + n) % n;
            vai(k, true);
            caixa.current?.querySelectorAll<HTMLButtonElement>(".ez-sf-painel")[k]?.focus();
          }}
        >
          {s.itens.map((x, k) => {
            const on = k === i;
            return (
              <button
                key={x.nome + k}
                type="button"
                className={`ez-sf-painel ${on ? "on" : ""} ${on && corre ? "corre" : ""}`}
                aria-pressed={on}
                aria-label={`${x.nome}: ${x.texto}`}
                onClick={() => (on ? setLuz(k) : vai(k, true))}
                onMouseEnter={() => {
                  if (vertical || !window.matchMedia("(hover: hover)").matches) return;
                  window.clearTimeout(espera.current);
                  espera.current = window.setTimeout(() => vai(k, false), 140);
                }}
                onMouseLeave={() => window.clearTimeout(espera.current)}
              >
                <span className="ez-img">
                  <img src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt={x.imagem.alt} decoding="async" />
                  {x.imagem.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
                </span>
                <span className="ez-sf-veu" />
                <span className="ez-sf-rot">
                  <b>{dois(k + 1)}</b>
                  {x.nome}
                </span>
                <span className="ez-sf-info">
                  <b>
                    {dois(k + 1)} · {textosInteracao.ampliar} ⤢
                  </b>
                  <strong>{x.nome}</strong>
                  <span>{x.texto}</span>
                </span>
                <i className="ez-sf-barra" onAnimationEnd={() => vai(k + 1, false)} />
              </button>
            );
          })}
        </div>
      </div>
      <Luz itens={s.itens} indice={luz} onMudar={setLuz} />
    </section>
  );
}
