"use client";

import { useEffect, type RefObject } from "react";

const DURACAO = 1400;

/**
 * Conta de 0 até o valor de [data-conta] quando o número entra na tela.
 * O HTML já sai com o valor final: sem JS, sem movimento ou no print, o número está certo.
 */
export function useContadores(raiz: RefObject<HTMLElement | null>, reduz: boolean) {
  useEffect(() => {
    if (reduz || !("IntersectionObserver" in window)) return;
    const quadros = new Set<number>();
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((x) => {
          if (!x.isIntersecting) return;
          io.unobserve(x.target);
          const el = x.target as HTMLElement;
          const fim = Number(el.dataset.conta);
          const t0 = performance.now();
          const passo = (agora: number) => {
            const p = Math.min(1, (agora - t0) / DURACAO);
            el.textContent = Math.round(fim * (1 - Math.pow(1 - p, 3))).toLocaleString("pt-BR");
            if (p < 1) quadros.add(requestAnimationFrame(passo));
          };
          quadros.add(requestAnimationFrame(passo));
        });
      },
      { threshold: 0.6 },
    );
    const itens = Array.from(raiz.current?.querySelectorAll<HTMLElement>("[data-conta]") ?? []);
    itens.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      quadros.forEach(cancelAnimationFrame);
      // Desfeito no meio (React em dev roda o efeito duas vezes): volta ao valor final.
      itens.forEach((el) => (el.textContent = Number(el.dataset.conta).toLocaleString("pt-BR")));
    };
  }, [raiz, reduz]);
}
