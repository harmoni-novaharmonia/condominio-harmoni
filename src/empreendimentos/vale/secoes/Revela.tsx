"use client";

import { useEffect, useRef, useState } from "react";
import { Cabecalho } from "@/components/lp/Cabecalho";
import { IcTinta } from "@/components/lp/IcTinta";
import type { ValeRevela } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Lista numerada em duas colunas. No desktop, ao passar pelo item, a foto dele
// aparece sobre a coluna oposta e acompanha o mouse: o item em foco nunca é coberto.
export function Revela({ s }: { s: ValeRevela }) {
  const sec = useRef<HTMLElement>(null);
  const lista = useRef<HTMLOListElement>(null);
  const caixa = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(-1);
  const alvo = useRef({ x: 0, y: 0, ativo: false, li: null as HTMLElement | null });

  const categorias = [...new Set(s.itens.map((x) => x.categoria))];

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let x = 0;
    let y = 0;
    let raf = 0;
    const anda = () => {
      const a = alvo.current;
      x += (a.x - x) * 0.16;
      y += (a.y - y) * 0.16;
      const giro = Math.max(-8, Math.min(8, (a.x - x) * 0.05));
      if (caixa.current) caixa.current.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${giro.toFixed(2)}deg)`;
      if (a.ativo || Math.abs(a.x - x) > 0.5) raf = requestAnimationFrame(anda);
    };
    const mira = (e: MouseEvent, li: HTMLElement) => {
      const r = sec.current!.getBoundingClientRect();
      const rl = lista.current!.getBoundingClientRect();
      const cx = caixa.current!;
      const esquerda = li.getBoundingClientRect().left < rl.left + rl.width / 2;
      const meioOposto = esquerda ? rl.left + rl.width * 0.75 : rl.left + rl.width * 0.25;
      const meioProprio = esquerda ? rl.left + rl.width * 0.25 : rl.left + rl.width * 0.75;
      alvo.current.x = meioOposto - r.left - cx.offsetWidth / 2 + (e.clientX - meioProprio) * 0.18;
      alvo.current.y = e.clientY - r.top - cx.offsetHeight / 2;
    };
    const duasColunas = () => getComputedStyle(lista.current!).gridTemplateColumns.split(" ").length > 1;
    const lis = Array.from(lista.current?.querySelectorAll<HTMLElement>("li") ?? []);
    const entra = (e: MouseEvent) => {
      if (!duasColunas()) return;
      const li = e.currentTarget as HTMLElement;
      mira(e, li);
      if (!alvo.current.ativo) {
        x = alvo.current.x;
        y = alvo.current.y;
      }
      alvo.current.ativo = true;
      alvo.current.li = li;
      setAtivo(Number(li.dataset.i));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(anda);
    };
    const move = (e: MouseEvent) => alvo.current.ativo && alvo.current.li && mira(e, alvo.current.li);
    const sai = () => {
      alvo.current.ativo = false;
      setAtivo(-1);
    };
    lis.forEach((li) => {
      li.addEventListener("mouseenter", entra);
      li.addEventListener("mousemove", move);
    });
    lista.current?.addEventListener("mouseleave", sai);
    const l = lista.current;
    return () => {
      cancelAnimationFrame(raf);
      lis.forEach((li) => {
        li.removeEventListener("mouseenter", entra);
        li.removeEventListener("mousemove", move);
      });
      l?.removeEventListener("mouseleave", sai);
    };
  }, []);

  return (
    <section ref={sec} id="diferenciais" className={`secao vl vl-revela fundo-noite ${ativo >= 0 ? "revelando" : ""}`}>
      <div className="casca">
        <Cabecalho
          sobretitulo={s.sobretitulo}
          titulo={s.titulo}
          direita={
            <p className="vl-rv-resumo">
              {categorias.map((c) => (
                <span key={c}>
                  <b>{s.itens.filter((x) => x.categoria === c).length}</b> {c}
                </span>
              ))}
            </p>
          }
        />
        <ol ref={lista} className="vl-rv-lista">
          {s.itens.map((x, k) => (
            <li key={x.titulo} data-i={k}>
              <b>{dois(k + 1)}</b>
              <IcTinta nome={x.icone} />
              <strong>{x.titulo}</strong>
              <em>{x.categoria}</em>
            </li>
          ))}
        </ol>
        {s.cta && (
          <div className="vl-rv-cta">
            <a className="bt bt-acento" href={`#${s.cta.alvo}`}>
              {s.cta.rotulo}
            </a>
          </div>
        )}
      </div>
      <div ref={caixa} className="vl-rv-foto" aria-hidden="true">
        {s.itens.map((x, k) => (
          <img key={x.titulo} className={k === ativo ? "on" : undefined} src={x.foto.src} width={x.foto.largura} height={x.foto.altura} alt="" loading="lazy" decoding="async" />
        ))}
      </div>
    </section>
  );
}
