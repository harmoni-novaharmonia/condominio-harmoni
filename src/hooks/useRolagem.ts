"use client";

import { useEffect, type RefObject } from "react";

/**
 * Um laço só (um rAF por quadro) para os efeitos ligados à rolagem:
 * - [data-par]: a imagem filha desliza devagar (--py), parallax suave;
 * - [data-palavras]: cada .w acende (--o) conforme o bloco atravessa a tela.
 * Sem movimento: as palavras ficam acesas e nada se move.
 */
export function useRolagem(raiz: RefObject<HTMLElement | null>, reduz: boolean) {
  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const palavras = Array.from(el.querySelectorAll<HTMLElement>("[data-palavras]")).map((bloco) => ({
      bloco,
      ws: Array.from(bloco.querySelectorAll<HTMLElement>(".w")),
    }));
    if (reduz) {
      palavras.forEach(({ ws }) => ws.forEach((w) => w.style.setProperty("--o", "1")));
      return;
    }
    const paralaxe = Array.from(el.querySelectorAll<HTMLElement>("[data-par]"));
    let pedido = false;

    const atualiza = () => {
      pedido = false;
      const vh = window.innerHeight;
      paralaxe.forEach((caixa) => {
        const r = caixa.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const centro = (r.top + r.height / 2 - vh / 2) / vh;
        caixa.style.setProperty("--py", `${(centro * -40).toFixed(1)}px`);
      });
      palavras.forEach(({ bloco, ws }) => {
        const r = bloco.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
        ws.forEach((w, i) => {
          const a = Math.min(1, Math.max(0, p * ws.length * 1.15 - i));
          w.style.setProperty("--o", (0.16 + 0.84 * a).toFixed(2));
        });
      });
    };
    const aoRolar = () => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(atualiza);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    atualiza();
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, [raiz, reduz]);
}
