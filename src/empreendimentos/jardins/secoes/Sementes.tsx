"use client";

import { useEffect, useRef, useState } from "react";
import { Cabecalho } from "@/components/lp/Cabecalho";
import { Luz } from "@/components/lp/Luz";
import { SetasRedondas } from "@/components/lp/SetaRedonda";
import { textosGerais, textosInteracao } from "@/empreendimentos/comum";
import type { JardinsSementes } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Palco em forma de folha e uma fila de miniaturas redondas. A foto escolhida abre
// em círculo a partir da miniatura; a anterior fica embaixo até ser coberta. Troca
// sozinha a cada 6 s (o anel em volta da miniatura mostra o tempo) e para quando a
// pessoa interage.
export function Sementes({ s }: { s: JardinsSementes }) {
  const n = s.itens.length;
  const [i, setI] = useState(0);
  const [antes, setAntes] = useState(-1);
  const [origem, setOrigem] = useState(50);
  const [auto, setAuto] = useState(true);
  const [visivel, setVisivel] = useState(false);
  const [dentro, setDentro] = useState(false);
  const [luz, setLuz] = useState<number | null>(null);
  const palco = useRef<HTMLDivElement>(null);
  const fila = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    const el = palco.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setVisivel(e.some((x) => x.isIntersecting)), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const vai = (k: number, doUsuario: boolean) => {
    const novo = ((k % n) + n) % n;
    if (doUsuario) setAuto(false);
    if (novo === i) return;
    // O círculo abre a partir da miniatura escolhida (a fila tem a largura do palco).
    const rp = palco.current?.getBoundingClientRect();
    const rb = fila.current?.querySelectorAll<HTMLElement>(".jd-semente")[novo]?.getBoundingClientRect();
    if (rp && rb) setOrigem(Math.min(100, Math.max(0, ((rb.left + rb.width / 2 - rp.left) / rp.width) * 100)));
    setAntes(i);
    setI(novo);
  };
  const corre = auto && visivel && !dentro;

  return (
    <section id="perspectivas" className={`secao jd jd-sementes fundo-noite ${auto ? "auto" : ""}`}>
      <div className="casca">
        <Cabecalho
          sobretitulo={s.sobretitulo}
          titulo={s.titulo}
          direita={
            <div className="jd-sm-ctrl">
              <p className="contador">
                <b>{dois(i + 1)}</b> / {dois(n)}
              </p>
              <SetasRedondas onAnterior={() => vai(i - 1, true)} onProxima={() => vai(i + 1, true)} onAmpliar={() => setLuz(i)} />
            </div>
          }
        />
        <div
          ref={palco}
          className="jd-palco"
          role="group"
          aria-roledescription="carrossel"
          aria-label={textosInteracao.perspectivasAmpliar}
          onClick={() => setLuz(i)}
          onMouseEnter={() => setDentro(true)}
          onMouseLeave={() => setDentro(false)}
        >
          {s.itens.map((x, k) => (
            <figure
              key={x.nome + k}
              className={`jd-palco-foto ${k === i ? "on" : ""} ${k === antes ? "antes" : ""}`}
              style={k === i ? { ["--cx" as string]: `${origem.toFixed(1)}%` } : undefined}
              aria-hidden={k !== i || undefined}
            >
              <img src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt={x.imagem.alt} loading={k ? "lazy" : "eager"} decoding="async" />
              {x.imagem.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
            </figure>
          ))}
          <div className="jd-palco-leg" aria-live="polite">
            <b>{dois(i + 1)}</b>
            <strong>{s.itens[i]?.nome}</strong>
            <span>{s.itens[i]?.texto}</span>
          </div>
        </div>
        <div
          ref={fila}
          className="jd-fila"
          aria-label={textosInteracao.escolherAmbiente}
          onKeyDown={(e) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            e.preventDefault();
            const k = (i + (e.key === "ArrowRight" ? 1 : -1) + n) % n;
            vai(k, true);
            fila.current?.querySelectorAll<HTMLButtonElement>(".jd-semente")[k]?.focus();
          }}
        >
          {s.itens.map((x, k) => (
            <button key={x.nome + k} type="button" className={`jd-semente ${k === i && corre ? "corre" : ""}`} aria-pressed={k === i} aria-label={x.nome} onClick={() => vai(k, true)}>
              <span className="jd-sem-img">
                <img src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt="" loading="lazy" decoding="async" />
              </span>
              <svg className="jd-anel" viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="48" pathLength={1} onAnimationEnd={() => vai(i + 1, false)} />
              </svg>
              <small>{x.nome}</small>
            </button>
          ))}
        </div>
      </div>
      <Luz itens={s.itens} indice={luz} onMudar={setLuz} />
    </section>
  );
}
