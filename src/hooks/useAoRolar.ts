"use client";

import { useEffect, useRef } from "react";

/** Chama `fn` uma vez por quadro enquanto a página rola ou muda de tamanho (e logo ao montar). */
export function useAoRolar(fn: () => void, ligado = true) {
  const atual = useRef(fn);
  atual.current = fn;
  useEffect(() => {
    if (!ligado) return;
    let pedido = false;
    const pede = () => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(() => {
        pedido = false;
        atual.current();
      });
    };
    window.addEventListener("scroll", pede, { passive: true });
    window.addEventListener("resize", pede);
    atual.current();
    return () => {
      window.removeEventListener("scroll", pede);
      window.removeEventListener("resize", pede);
    };
  }, [ligado]);
}
