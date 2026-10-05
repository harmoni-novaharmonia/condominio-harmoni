"use client";

import { useEffect, useState } from "react";

/** Lido no cliente: no servidor assume movimento normal e corrige após hidratar. */
export function useMovimentoReduzido() {
  const [reduz, setReduz] = useState(false);
  useEffect(() => {
    setReduz(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduz;
}
