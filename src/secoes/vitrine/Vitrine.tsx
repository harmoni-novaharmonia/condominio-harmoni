"use client";

import { useRef } from "react";
import { VitrineProvider, useVitrine } from "@/components/VitrineContexto";
import { useParallax } from "@/hooks/useParallax";
import { useReveal } from "@/hooks/useReveal";
import { Contato } from "./Contato";
import { Faixa } from "./Faixa";
import { FichaModal } from "./FichaModal";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Lazer } from "./Lazer";
import { ListaEmpreendimentos } from "./ListaEmpreendimentos";
import { Localizacao } from "./Localizacao";
import { Manifesto } from "./Manifesto";
import { NovaHarmonia } from "./NovaHarmonia";
import { Rodape } from "./Rodape";

function Conteudo() {
  const { reduz } = useVitrine();
  const raiz = useRef<HTMLDivElement>(null);
  useReveal(raiz, reduz);
  useParallax(raiz, reduz);

  return (
    <div id="hm" ref={raiz}>
      <Header />
      <Hero />
      <Faixa />
      <Manifesto />
      <ListaEmpreendimentos />
      <Lazer />
      <Localizacao />
      <NovaHarmonia />
      <Contato />
      <Rodape />
      <FichaModal />
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
