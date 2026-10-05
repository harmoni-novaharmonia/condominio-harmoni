"use client";

import type { CSSProperties } from "react";
import { Facebook, Instagram, Linkedin, SetaCima, SetaDireita, Whatsapp } from "@/components/Icones";
import { LinkAncora } from "@/components/LinkAncora";
import { useVitrine } from "@/components/VitrineContexto";
import { harmonis } from "@/dados/empreendimentos";
import { rodape } from "@/dados/vitrine";

const icones = { facebook: Facebook, instagram: Instagram, linkedin: Linkedin, whatsapp: Whatsapp };
const atraso = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Rodape() {
  const { abreFicha } = useVitrine();

  return (
    <footer className="rodape">
      <div className="brilho" aria-hidden="true" />
      <div className="filete rv" />

      <div className="r-corpo">
        <div className="r-colunas">
          <div className="rv" style={atraso(0.05)}>
            <h3>{rodape.titulo}</h3>
            <p className="r-apoio">{rodape.apoio}</p>
            <LinkAncora className="btn btn-lar" alvo={rodape.cta.alvo}>
              {rodape.cta.rotulo}
              <SetaDireita tamanho={16} espessura={2} />
            </LinkAncora>
          </div>

          <div className="rv" style={atraso(0.15)}>
            <h4>{rodape.colunas.empreendimentos}</h4>
            <ul className="r-lista">
              {harmonis.map((h) => (
                <li key={h.slug}>
                  <button type="button" onClick={() => abreFicha(h.slug)}>
                    {h.nome}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rv" style={atraso(0.25)}>
            <h4>{rodape.colunas.explore}</h4>
            <ul className="r-lista">
              {rodape.explore.map((l) => (
                <li key={l.alvo}>
                  <LinkAncora alvo={l.alvo}>{l.rotulo}</LinkAncora>
                </li>
              ))}
            </ul>
          </div>

          <div className="rv" style={atraso(0.35)}>
            <h4>{rodape.colunas.redes}</h4>
            <div className="r-redes">
              {rodape.redes.map((r) => {
                const Icone = icones[r.icone];
                return (
                  <a key={r.nome} href={r.href} aria-label={r.nome}>
                    <Icone />
                  </a>
                );
              })}
            </div>
            <LinkAncora className="r-topo" alvo={rodape.topo.alvo}>
              {rodape.topo.rotulo}
              <SetaCima />
            </LinkAncora>
          </div>
        </div>

        <div className="r-base">
          <span className="legal">{rodape.legal}</span>
          <span className="links">
            {rodape.links.map((l) => (
              <a key={l.rotulo} href={l.href} {...(l.externo ? { target: "_blank", rel: "noopener" } : {})}>
                {l.rotulo}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
