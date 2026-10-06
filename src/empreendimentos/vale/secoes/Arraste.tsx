"use client";

import { useEffect, useRef, useState } from "react";
import { Cabecalho } from "@/components/lp/Cabecalho";
import { Luz } from "@/components/lp/Luz";
import { SetasRedondas } from "@/components/lp/SetaRedonda";
import { textosGerais, textosInteracao } from "@/empreendimentos/comum";
import type { ValeArraste } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Galeria de arrastar: cartas de três tamanhos alinhadas pela base; a foto desliza
// dentro da moldura enquanto a fila anda. Mouse arrasta com inércia; toque e
// trackpad usam a rolagem nativa; setas e teclado andam uma carta.
export function Arraste({ s }: { s: ValeArraste }) {
  const trilho = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const prog = useRef<HTMLElement>(null);
  const moveu = useRef(false);
  const [atual, setAtual] = useState(0);
  const [cursorOn, setCursorOn] = useState(false);
  const [luz, setLuz] = useState<number | null>(null);

  useEffect(() => {
    const tr = trilho.current;
    if (!tr) return;
    const cs = Array.from(tr.querySelectorAll<HTMLElement>(".vl-carta"));
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fino = window.matchMedia("(pointer: fine)");

    let pedido = false;
    const pinta = () => {
      pedido = false;
      const max = tr.scrollWidth - tr.clientWidth;
      if (prog.current) prog.current.style.transform = `scaleX(${max > 0 ? (tr.scrollLeft / max).toFixed(4) : 1})`;
      const r0 = tr.getBoundingClientRect();
      const meio = r0.left + r0.width / 2;
      const borda = r0.left + parseFloat(getComputedStyle(tr).paddingLeft);
      let melhor = Infinity;
      let k0 = 0;
      cs.forEach((c, k) => {
        const r = c.getBoundingClientRect();
        if (!reduz) c.style.setProperty("--px", ((r.left + r.width / 2 - meio) / r0.width).toFixed(3));
        const d = Math.abs(r.left - borda);
        if (d < melhor) {
          melhor = d;
          k0 = k;
        }
      });
      setAtual(tr.scrollLeft >= max - 4 ? cs.length - 1 : k0);
    };
    const pede = () => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(pinta);
    };
    tr.addEventListener("scroll", pede, { passive: true });
    window.addEventListener("resize", pede);
    pinta();

    // Arraste com o mouse e inércia ao soltar.
    let x0 = 0;
    let s0 = 0;
    let ult = 0;
    let tUlt = 0;
    let vel = 0;
    let arrastando = false;
    let raf = 0;
    const desce = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      cancelAnimationFrame(raf);
      arrastando = true;
      moveu.current = false;
      x0 = ult = e.clientX;
      s0 = tr.scrollLeft;
      tUlt = performance.now();
      vel = 0;
    };
    const move = (e: PointerEvent) => {
      if (cursor.current && fino.matches) cursor.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (!arrastando) return;
      const dx = e.clientX - x0;
      if (!moveu.current && Math.abs(dx) > 6) {
        moveu.current = true;
        tr.classList.add("arrastando");
      }
      if (!moveu.current) return;
      const agora = performance.now();
      vel = (e.clientX - ult) / Math.max(1, agora - tUlt);
      ult = e.clientX;
      tUlt = agora;
      tr.scrollLeft = s0 - dx;
    };
    const solta = () => {
      if (!arrastando) return;
      arrastando = false;
      tr.classList.remove("arrastando");
      if (!moveu.current || reduz) return;
      let v = -vel * 16;
      const passo = () => {
        tr.scrollLeft += v;
        v *= 0.93;
        if (Math.abs(v) > 0.4) raf = requestAnimationFrame(passo);
      };
      raf = requestAnimationFrame(passo);
    };
    // O clique que termina um arraste não abre a foto.
    const clique = (e: MouseEvent) => {
      if (!moveu.current) return;
      e.preventDefault();
      e.stopPropagation();
      moveu.current = false;
    };
    tr.addEventListener("pointerdown", desce);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", solta);
    tr.addEventListener("click", clique, true);
    return () => {
      cancelAnimationFrame(raf);
      tr.removeEventListener("scroll", pede);
      window.removeEventListener("resize", pede);
      tr.removeEventListener("pointerdown", desce);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", solta);
      tr.removeEventListener("click", clique, true);
    };
  }, []);

  const anda = (d: number) => {
    const tr = trilho.current;
    const c = tr?.querySelector<HTMLElement>(".vl-carta");
    if (!tr || !c) return;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tr.scrollBy({ left: d * (c.offsetWidth + (parseFloat(getComputedStyle(tr).columnGap) || 0)), behavior: reduz ? "auto" : "smooth" });
  };

  return (
    <section id="perspectivas" className={`secao vl vl-galeria fundo-noite ${cursorOn ? "cursor-on" : ""}`}>
      <div className="casca">
        <Cabecalho
          sobretitulo={s.sobretitulo}
          titulo={s.titulo}
          direita={
            <div className="vl-gl-ctrl">
              <p className="contador">
                <b>{dois(atual + 1)}</b> / {dois(s.itens.length)}
              </p>
              <SetasRedondas onAnterior={() => anda(-1)} onProxima={() => anda(1)} />
            </div>
          }
        />
      </div>
      <div
        ref={trilho}
        className="vl-trilho"
        tabIndex={0}
        aria-roledescription="carrossel"
        aria-label={textosInteracao.arrasteRotulo}
        onMouseEnter={() => setCursorOn(true)}
        onMouseLeave={() => setCursorOn(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            anda(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {s.itens.map((x, k) => (
          <figure key={x.nome + k} className={`vl-carta vl-c${k % 3}`}>
            <button type="button" className="vl-quadro" aria-label={`${textosInteracao.ampliar} ${x.nome}`} onClick={() => setLuz(k)}>
              <img src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt={x.imagem.alt} loading="lazy" decoding="async" draggable={false} />
              {x.imagem.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
            </button>
            <figcaption>
              <b>{dois(k + 1)}</b>
              <strong>{x.nome}</strong>
              <span>{x.texto}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="casca">
        <div className="vl-gl-prog">
          <i ref={prog} />
        </div>
      </div>
      <span ref={cursor} className="vl-cursor" aria-hidden="true">
        {textosInteracao.arraste}
      </span>
      <Luz itens={s.itens} indice={luz} onMudar={setLuz} />
    </section>
  );
}
