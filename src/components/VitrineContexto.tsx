"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useMovimentoReduzido } from "@/hooks/useMovimentoReduzido";

type Contexto = {
  reduz: boolean;
  menuAberto: boolean;
  setMenuAberto: (v: boolean) => void;
  /** Slug escolhido para o formulário ("" = ainda não sabe). */
  interesse: string;
  setInteresse: (v: string) => void;
  /** Cidade filtrada na coleção e no mapa ("" = todas). */
  cidade: string;
  setCidade: (v: string) => void;
  /** Rola até a âncora; a folga do header fixo vem do scroll-margin-top no CSS. */
  rolaPara: (id: string) => void;
};

const Ctx = createContext<Contexto | null>(null);

export function VitrineProvider({ children }: { children: ReactNode }) {
  const reduz = useMovimentoReduzido();
  const [menuAberto, setMenuAberto] = useState(false);
  const [interesse, setInteresse] = useState("");
  const [cidade, setCidade] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("vt-trava", menuAberto);
    return () => document.documentElement.classList.remove("vt-trava");
  }, [menuAberto]);

  const rolaPara = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduz ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    },
    [reduz],
  );

  const valor = useMemo(
    () => ({ reduz, menuAberto, setMenuAberto, interesse, setInteresse, cidade, setCidade, rolaPara }),
    [reduz, menuAberto, interesse, cidade, rolaPara],
  );

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useVitrine() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useVitrine fora do VitrineProvider");
  return c;
}
