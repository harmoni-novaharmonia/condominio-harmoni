"use client";

import { useSyncExternalStore } from "react";

// O lote tocado na planta (Lotes) aparece no contato e segue com o cadastro.
// As duas seções estão longe uma da outra na página: um estado de módulo basta.
let atual: string | null = null;
const ouvintes = new Set<() => void>();

export function escolheLote(numero: string) {
  atual = numero;
  ouvintes.forEach((f) => f());
}

export function useLoteEscolhido() {
  return useSyncExternalStore(
    (f) => {
      ouvintes.add(f);
      return () => {
        ouvintes.delete(f);
      };
    },
    () => atual,
    () => null,
  );
}
