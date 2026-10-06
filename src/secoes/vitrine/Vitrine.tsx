"use client";

import { useRef } from "react";
import { VitrineProvider, useVitrine } from "@/components/VitrineContexto";
import { useContadores } from "@/hooks/useContadores";
import { useReveal } from "@/hooks/useReveal";
import { useRolagem } from "@/hooks/useRolagem";
import { Colecao } from "./Colecao";
import { Contato } from "./Contato";
import { Fatos } from "./Fatos";
import { Header } from "./Header";
import { HeroFaixas } from "./HeroFaixas";
import { Infraestrutura } from "./Infraestrutura";
import { Manifesto } from "./Manifesto";
import { Onde } from "./Onde";
import { Perguntas } from "./Perguntas";
import { QuemConstroi } from "./QuemConstroi";
import { Rodape } from "./Rodape";

function Conteudo() {
  const { reduz } = useVitrine();
  const raiz = useRef<HTMLDivElement>(null);
  useRolagem(raiz, reduz);
  useContadores(raiz, reduz);
  useReveal(raiz, reduz, ".vt-ed", "visto");

  return (
    <div className="vt" ref={raiz}>
      <Header />
      <main>
        <HeroFaixas />
        <Fatos />
        <Manifesto />
        <Colecao />
        <Onde />
        <Infraestrutura />
        <QuemConstroi />
        <Perguntas />
        <Contato />
      </main>
      <Rodape />
    </div>
  );
}

export function Vitrine() {
  return (
    <VitrineProvider>
      <Conteudo />
    </VitrineProvider>
  );
}
