"use client";

import { useRef } from "react";
import { FormEtapas } from "@/components/lp/FormEtapas";
import { Fones } from "@/components/lp/Fones";
import { Ic } from "@/components/lp/Ic";
import { Img } from "@/components/lp/Img";
import { Titulo } from "@/components/lp/Titulo";
import { textosFormulario, textosInteracao } from "@/empreendimentos/comum";
import type { LP } from "@/empreendimentos/tipos";
import { useEspera } from "@/hooks/useEspera";
import type { EssenzaContato } from "../tipos";

// Fecha a página com o gesto do hero: foto e painel branco, agora pela direita.
export function Contato({ s, lp }: { s: EssenzaContato; lp: LP }) {
  const sec = useRef<HTMLElement>(null);
  useEspera(sec, "espera", 0.2);
  const zap = `https://wa.me/${lp.contato.whatsapp}?text=${encodeURIComponent(textosFormulario.mensagemWhatsapp(lp.nome, ""))}`;
  return (
    <section ref={sec} id="contato" className="ez ez-contato">
      <figure className="ez-ct-foto foto">
        <Img imagem={s.imagem} sizes="(min-width: 900px) 55vw, 100vw" />
      </figure>
      <div className="ez-ct-painel">
        <img className="ez-ct-logo" src={lp.logo.claro.src} width={lp.logo.claro.largura} height={lp.logo.claro.altura} alt={lp.nome} loading="lazy" />
        <Titulo texto={s.titulo} className="d" />
        <FormEtapas lp={lp} formulario={s.formulario} />
        <div className="ez-ct-rodape">
          <p>{textosInteracao.prefereConversar}</p>
          <Fones telefones={lp.contato.telefones} />
          <a className="bt bt-whatsapp" href={zap} target="_blank" rel="noopener noreferrer">
            <Ic nome="whatsapp" tamanho={18} className="ic-claro" />
            {textosInteracao.chamarWhatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
