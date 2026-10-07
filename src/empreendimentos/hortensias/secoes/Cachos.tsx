"use client";

import { useEffect, useRef, useState } from "react";
import { Luz } from "@/components/lp/Luz";
import { SetasRedondas } from "@/components/lp/SetaRedonda";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { textosGerais, textosInteracao } from "@/empreendimentos/comum";
import type { HortensiasCachos } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Perspectivas em coverflow: a foto do meio de frente e as vizinhas giradas em
// 3D dos dois lados, numa volta sem fim, sobre a própria foto desfocada. Troca sozinha a cada 6 s (a linha
// embaixo da legenda mostra o tempo) e para quando a pessoa mexe. Arrastar,
// setas, teclado ou um toque na foto do lado; a do meio abre em tela cheia.
export function Cachos({ s }: { s: HortensiasCachos }) {
  const n = s.itens.length;
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visivel, setVisivel] = useState(false);
  const [dentro, setDentro] = useState(false);
  const [luz, setLuz] = useState<number | null>(null);
  const palco = useRef<HTMLDivElement>(null);
  const arraste = useRef<{ x: number; id: number } | null>(null);
  const arrastou = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    const el = palco.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setVisivel(e.some((x) => x.isIntersecting)), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const vai = (k: number, doUsuario = true) => {
    if (doUsuario) setAuto(false);
    setI(((k % n) + n) % n);
  };
  /** Distância até a foto do meio, pelo caminho mais curto da volta. */
  const dist = (k: number) => {
    let d = k - i;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };
  const corre = auto && visivel && !dentro && luz === null;
  const it = s.itens[i];

  return (
    <section id="perspectivas" className="secao hs hs-cachos fundo-noite">
      <img key={it?.imagem.src} className="hs-cc-amb" src={it?.imagem.src} alt="" aria-hidden="true" />
      <div className="casca hs-centro">
        <Sobretitulo texto={s.sobretitulo} />
        <Titulo texto={s.titulo} className="d titulo-secao" />
        <div className="hs-cc-ctrl">
          <p className="contador">
            <b>{dois(i + 1)}</b> / {dois(n)}
          </p>
          <SetasRedondas onAnterior={() => vai(i - 1)} onProxima={() => vai(i + 1)} onAmpliar={() => setLuz(i)} />
        </div>
      </div>
      <div
        ref={palco}
        className="hs-cc-palco"
        role="group"
        aria-roledescription="carrossel"
        aria-label={textosInteracao.rotuloCachos}
        tabIndex={0}
        onMouseEnter={() => setDentro(true)}
        onMouseLeave={() => setDentro(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") vai(i - 1);
          if (e.key === "ArrowRight") vai(i + 1);
          if (e.key === "Enter") setLuz(i);
        }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          arraste.current = { x: e.clientX, id: e.pointerId };
          arrastou.current = false;
        }}
        onPointerMove={(e) => {
          const a = arraste.current;
          if (!a || arrastou.current) return;
          const dx = e.clientX - a.x;
          if (Math.abs(dx) < 48) return;
          arrastou.current = true;
          vai(i + (dx < 0 ? 1 : -1));
        }}
        onPointerUp={() => (arraste.current = null)}
        onPointerCancel={() => (arraste.current = null)}
      >
        {s.itens.map((x, k) => {
          const d = dist(k);
          const a = Math.abs(d);
          const longe = a > 2;
          // As vizinhas imediatas abrem bem; as de trás se encostam nelas.
          const dx = d === 0 ? 0 : Math.sign(d) * (54 + (a - 1) * 16);
          return (
            <button
              key={x.nome + k}
              type="button"
              className={`hs-cc-foto ${d === 0 ? "on" : ""} ${longe ? "longe" : ""}`}
              style={{ ["--x" as string]: `${dx}%`, ["--a" as string]: a, ["--g" as string]: `${-Math.sign(d) * 34}deg` }}
              aria-hidden={longe || undefined}
              tabIndex={-1}
              aria-label={d === 0 ? textosInteracao.ampliarNome(x.nome) : textosInteracao.irPara(x.nome)}
              onClick={() => {
                if (arrastou.current) return;
                if (d === 0) setLuz(k);
                else vai(k);
              }}
            >
              <img src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt={x.imagem.alt} loading={Math.abs(d) <= 1 ? "eager" : "lazy"} decoding="async" draggable={false} />
              {x.imagem.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
            </button>
          );
        })}
      </div>
      <div className="casca hs-cc-leg">
        <div aria-live="polite">
          <strong>{it?.nome}</strong>
          <span>{it?.texto}</span>
        </div>
        <span className="hs-cc-trilha" aria-hidden="true">
          <i
            key={i}
            className={auto ? "auto" : ""}
            style={{ animationPlayState: corre ? "running" : "paused" }}
            onAnimationEnd={() => vai(i + 1, false)}
          />
        </span>
        <p className="dica">{textosInteracao.dicaCachos}</p>
      </div>
      <Luz itens={s.itens} indice={luz} onMudar={setLuz} />
    </section>
  );
}
