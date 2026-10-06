"use client";

import { useEffect, type RefObject } from "react";

/**
 * Marca com `classe` os elementos `seletor` quando entram na tela.
 * Sem movimento (ou sem IntersectionObserver), já marca todos de saída.
 */
export function useReveal(raiz: RefObject<HTMLElement | null>, reduz: boolean, seletor = ".rv", classe = "ok") {
  useEffect(() => {
    const itens = Array.from(raiz.current?.querySelectorAll<HTMLElement>(seletor) ?? []);
    if (reduz || !("IntersectionObserver" in window)) {
      itens.forEach((el) => el.classList.add(classe));
      return;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add(classe);
            io.unobserve(x.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    itens.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [raiz, reduz, seletor, classe]);
}
