"use client";

import { useEffect, type RefObject } from "react";

/** Move os elementos [data-px] em relação ao pai conforme a rolagem. */
export function useParallax(raiz: RefObject<HTMLElement | null>, reduz: boolean) {
  useEffect(() => {
    if (reduz) return;
    const itens = Array.from(raiz.current?.querySelectorAll<HTMLElement>("[data-px]") ?? []);
    let pedido = false;
    const atualiza = () => {
      itens.forEach((el) => {
        const pai = el.parentElement;
        if (!pai) return;
        const r = pai.getBoundingClientRect();
        const d = (r.top + r.height / 2 - window.innerHeight / 2) * Number(el.dataset.px);
        el.style.transform = `translate3d(0,${d.toFixed(1)}px,0)`;
      });
      pedido = false;
    };
    const aoRolar = () => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(atualiza);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    atualiza();
    return () => window.removeEventListener("scroll", aoRolar);
  }, [raiz, reduz]);
}
