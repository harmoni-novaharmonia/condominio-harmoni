"use client";

import { useEffect, type RefObject } from "react";

/**
 * Animação de entrada que nunca deixa conteúdo escondido à toa: o elemento só
 * ganha `classe` (estado inicial da animação) se começar fora da tela, e perde
 * quando aparece. Sem script, já visível ou com movimento reduzido, fica pronto.
 */
export function useEspera(ref: RefObject<HTMLElement | null>, classe = "espera", limiar = 0.25) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.classList.add(classe);
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((x) => x.isIntersecting)) {
          el.classList.remove(classe);
          io.disconnect();
        }
      },
      { threshold: limiar },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, classe, limiar]);
}
