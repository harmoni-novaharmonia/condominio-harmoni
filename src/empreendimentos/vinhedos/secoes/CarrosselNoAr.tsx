"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Img } from "@/components/lp/Img";
import { textosGerais } from "@/empreendimentos/comum";
import type { Imagem } from "@/empreendimentos/tipos";

type Slide = { nome: string; imagem: Imagem };

// Mesmo comportamento do carrossel da LP no ar (Elementor): um slide por vez
// (dois no tablet), passa sozinho a cada 5 s, pausa com o mouse em cima e para
// de vez depois que a pessoa mexe. Setas ao lado da legenda, bolinhas sobre a foto.
const INTERVALO = 5000;

export function CarrosselNoAr({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [porVez, setPorVez] = useState(1);
  const [auto, setAuto] = useState(true);
  const pausa = useRef(false);
  const toque = useRef<number | null>(null);
  const ultimo = slides.length - porVez;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");
    const ajusta = () => setPorVez(mq.matches ? 2 : 1);
    ajusta();
    mq.addEventListener("change", ajusta);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    return () => mq.removeEventListener("change", ajusta);
  }, []);

  const vai = useCallback((n: number) => setI(n < 0 ? ultimo : n > ultimo ? 0 : n), [ultimo]);
  const mexeu = (n: number) => {
    setAuto(false);
    vai(n);
  };

  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => !pausa.current && setI((a) => (a >= ultimo ? 0 : a + 1)), INTERVALO);
    return () => window.clearInterval(id);
  }, [auto, ultimo]);

  return (
    <div
      className="vna-carrossel"
      aria-roledescription="carrossel"
      onMouseEnter={() => (pausa.current = true)}
      onMouseLeave={() => (pausa.current = false)}
      onPointerDown={(e) => (toque.current = e.clientX)}
      onPointerUp={(e) => {
        if (toque.current === null) return;
        const d = e.clientX - toque.current;
        toque.current = null;
        if (Math.abs(d) > 40) mexeu(d > 0 ? i - 1 : i + 1);
      }}
    >
      <div className="vna-carrossel-janela">
        <ul className="vna-carrossel-trilho" style={{ transform: `translateX(${(-i * 100) / porVez}%)` }}>
          {slides.map((s, k) => (
            <li key={k} style={{ flexBasis: `${100 / porVez}%` }} aria-hidden={k < i || k >= i + porVez}>
              <Img imagem={s.imagem} sizes="(min-width: 1140px) 1100px, 100vw" />
              <h3>{s.nome}</h3>
            </li>
          ))}
        </ul>
        <div className="vna-carrossel-pontos">
          {slides.slice(0, ultimo + 1).map((s, k) => (
            <button key={k} type="button" aria-label={`${k + 1}: ${s.nome}`} aria-current={k === i} onClick={() => mexeu(k)} />
          ))}
        </div>
      </div>
      <button type="button" className="vna-seta vna-seta-ant" aria-label={textosGerais.anterior} onClick={() => mexeu(i - 1)}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M15 4 7 12l8 8" />
        </svg>
      </button>
      <button type="button" className="vna-seta vna-seta-prox" aria-label={textosGerais.proxima} onClick={() => mexeu(i + 1)}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="m9 4 8 8-8 8" />
        </svg>
      </button>
    </div>
  );
}
