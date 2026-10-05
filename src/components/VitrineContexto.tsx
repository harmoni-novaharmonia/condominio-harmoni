"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useMovimentoReduzido } from "@/hooks/useMovimentoReduzido";

type Contexto = {
  reduz: boolean;
  menuAberto: boolean;
  setMenuAberto: (v: boolean) => void;
  fichaSlug: string | null;
  abreFicha: (slug: string) => void;
  aoFecharFicha: () => void;
  interesse: string;
  setInteresse: (v: string) => void;
  /** Rola até a âncora deixando o header fixo livre. */
  rolaPara: (id: string) => void;
};

const Ctx = createContext<Contexto | null>(null);

// Barra flutuante (10px do topo + ~60px de altura) mais um respiro.
const FOLGA_HEADER = 88;

export function VitrineProvider({ children }: { children: ReactNode }) {
  const reduz = useMovimentoReduzido();
  const [menuAberto, setMenuAberto] = useState(false);
  const [fichaSlug, setFichaSlug] = useState<string | null>(null);
  const [interesse, setInteresse] = useState("");
  const ultimoFoco = useRef<HTMLElement | null>(null);

  // Menu mobile e ficha travam a rolagem da página; um só efeito evita que um
  // destrave o outro.
  useEffect(() => {
    document.documentElement.classList.toggle("hm-trava", menuAberto || fichaSlug !== null);
    return () => document.documentElement.classList.remove("hm-trava");
  }, [menuAberto, fichaSlug]);

  const rolaPara = useCallback(
    (id: string) => {
      const alvo = document.getElementById(id);
      if (!alvo) return;
      const y = alvo.getBoundingClientRect().top + window.scrollY - FOLGA_HEADER;
      window.scrollTo({ top: y, behavior: reduz ? "auto" : "smooth" });
    },
    [reduz],
  );

  const abreFicha = useCallback((slug: string) => {
    ultimoFoco.current = document.activeElement as HTMLElement | null;
    setFichaSlug(slug);
  }, []);

  const aoFecharFicha = useCallback(() => {
    setFichaSlug(null);
    ultimoFoco.current?.focus?.({ preventScroll: true });
  }, []);

  const valor = useMemo(
    () => ({
      reduz,
      menuAberto,
      setMenuAberto,
      fichaSlug,
      abreFicha,
      aoFecharFicha,
      interesse,
      setInteresse,
      rolaPara,
    }),
    [reduz, menuAberto, fichaSlug, abreFicha, aoFecharFicha, interesse, rolaPara],
  );

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useVitrine() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useVitrine fora do VitrineProvider");
  return c;
}
