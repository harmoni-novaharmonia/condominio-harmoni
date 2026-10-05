"use client";

import { useEffect, type RefObject } from "react";

/** Revela os elementos .rv ao entrar na tela. Sem movimento: já aparecem prontos. */
export function useReveal(raiz: RefObject<HTMLElement | null>, reduz: boolean) {
  useEffect(() => {
    const itens = Array.from(raiz.current?.querySelectorAll<HTMLElement>(".rv") ?? []);
    if (reduz || !("IntersectionObserver" in window)) {
      itens.forEach((el) => el.classList.add("ok"));
      return;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add("ok");
            io.unobserve(x.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    itens.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [raiz, reduz]);
}
