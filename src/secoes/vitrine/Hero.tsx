"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronDireita, ChevronEsquerda } from "@/components/Icones";
import { LinkAncora } from "@/components/LinkAncora";
import { useVitrine } from "@/components/VitrineContexto";
import { harmonis } from "@/dados/empreendimentos";
import { hero } from "@/dados/vitrine";

const TEMPO = 7000;
const LIMITE_SWIPE = 50;

export function Hero() {
  const { reduz, fichaSlug, abreFicha } = useVitrine();
  const total = harmonis.length;
  const [atual, setAtual] = useState(0);
  // Muda a cada troca, inclusive clicar no slide atual, para reiniciar a barra.
  const [ciclo, setCiclo] = useState(0);
  const [hover, setHover] = useState(false);
  const [abaOculta, setAbaOculta] = useState(false);
  const x0 = useRef<number | null>(null);

  const parado = hover || abaOculta || fichaSlug !== null;

  const vai = (i: number) => {
    setAtual(((i % total) + total) % total);
    setCiclo((c) => c + 1);
  };

  useEffect(() => {
    if (parado || reduz) return;
    const t = setTimeout(() => vai(atual + 1), TEMPO);
    return () => clearTimeout(t);
    // vai só depende de total, constante
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atual, ciclo, parado, reduz]);

  useEffect(() => {
    const aoMudar = () => setAbaOculta(document.hidden);
    document.addEventListener("visibilitychange", aoMudar);
    return () => document.removeEventListener("visibilitychange", aoMudar);
  }, []);

  return (
    <section
      className={parado ? "hero pausa" : "hero"}
      id="hm-inicio"
      aria-roledescription="carrossel"
      aria-label={hero.rotuloCarrossel}
      style={{ "--tempo": `${TEMPO}ms` } as CSSProperties}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={(e) => {
        x0.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (x0.current === null) return;
        const dx = e.changedTouches[0].clientX - x0.current;
        if (Math.abs(dx) > LIMITE_SWIPE) vai(atual + (dx < 0 ? 1 : -1));
        x0.current = null;
      }}
    >
      {harmonis.map((h, i) => (
        <div
          key={h.slug}
          className={i === atual ? "slide on" : "slide"}
          aria-label={`${i + 1} de ${total}`}
        >
          <img src={h.foto.src} width={h.foto.largura} height={h.foto.altura} alt="" />
          <div className="slide-txt">
            {h.logoHero ? (
              <img
                className="logo branco"
                src={h.logoHero.src}
                width={h.logoHero.largura}
                height={h.logoHero.altura}
                alt={h.nome}
              />
            ) : (
              <span className="logo-txt">{h.nome}</span>
            )}
            <h1>{h.chamada}</h1>
            <div className="meta">
              <span className="selo">{h.status}</span>
              <span className={h.cidade.startsWith("[") ? "ph" : undefined}>{h.cidade}</span>
            </div>
            <div className="acoes">
              <button className="btn btn-lar" type="button" onClick={() => abreFicha(h.slug)}>
                {hero.conhecer} {h.curto}
              </button>
              <LinkAncora className="btn btn-linha" alvo="hm-contato" interesse={h.nome}>
                {h.chamadaSecundaria}
              </LinkAncora>
            </div>
          </div>
        </div>
      ))}

      <div className="h-indice" aria-label={hero.indice}>
        {harmonis.map((h, i) => (
          <button
            key={h.slug}
            type="button"
            aria-current={i === atual ? "true" : undefined}
            onClick={() => vai(i)}
          >
            {h.curto}
            <span className="barra">
              <i key={ciclo} />
            </span>
          </button>
        ))}
      </div>

      <div className="h-base">
        <div className="h-setas">
          <button className="circ" type="button" aria-label="Anterior" onClick={() => vai(atual - 1)}>
            <ChevronEsquerda />
          </button>
          <button className="circ" type="button" aria-label="Próximo" onClick={() => vai(atual + 1)}>
            <ChevronDireita />
          </button>
        </div>
        <div className="h-pontos" aria-hidden="true">
          {harmonis.map((h, i) => (
            <button
              key={h.slug}
              type="button"
              tabIndex={-1}
              aria-current={i === atual ? "true" : undefined}
              onClick={() => vai(i)}
            />
          ))}
        </div>
        <LinkAncora className="h-rolar" alvo="hm-manifesto">
          {hero.rolar} <span />
        </LinkAncora>
      </div>
    </section>
  );
}
