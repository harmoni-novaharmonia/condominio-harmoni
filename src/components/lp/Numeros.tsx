"use client";

import { useEffect, useRef, useState } from "react";
import { numerosGrupo } from "@/empreendimentos/comum";

const br = (n: number) => n.toLocaleString("pt-BR");

/** Lotes dos bairros da Nova Harmonia, contando até o número quando aparecem. */
export function Numeros() {
  const ref = useRef<HTMLUListElement>(null);
  const [p, setP] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setP(0);
    let raf = 0;
    const io = new IntersectionObserver((e) => {
      if (!e.some((x) => x.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now();
      const passo = (agora: number) => {
        const k = Math.min(1, (agora - t0) / 1400);
        setP(1 - Math.pow(1 - k, 3));
        if (k < 1) raf = requestAnimationFrame(passo);
      };
      raf = requestAnimationFrame(passo);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <ul ref={ref} className="numeros">
        {numerosGrupo.itens.map((x) => (
          <li key={x.nome}>
            <strong>
              <span aria-hidden="true">{br(Math.round(x.lotes * p))}</span>
              <span className="sr">{br(x.lotes)}</span>
              <small>{numerosGrupo.rotulo}</small>
            </strong>
            <span>{x.nome}</span>
            <em>{x.cidade}</em>
          </li>
        ))}
      </ul>
      <p className="numeros-nota">{numerosGrupo.fonte}</p>
    </>
  );
}
