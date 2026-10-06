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
import type { JardinsContato } from "../tipos";

// Fecha a página com a folha do hero, espelhada: a foto nasce como semente quando a seção aparece.
export function Contato({ s, lp }: { s: JardinsContato; lp: LP }) {
  const sec = useRef<HTMLElement>(null);
  useEspera(sec, "espera", 0.3);
  const zap = `https://wa.me/${lp.contato.whatsapp}?text=${encodeURIComponent(textosFormulario.mensagemWhatsapp(lp.nome, ""))}`;
  return (
    <section ref={sec} id="contato" className="secao jd jd-contato">
      <div className="casca jd-ct-grade">
        <div className="jd-ct-foto">
          <figure className="jd-folha foto">
            <Img imagem={s.imagem} sizes="(min-width: 900px) 42vw, 100vw" />
          </figure>
        </div>
        <div className="jd-ct-corpo">
          <img className="jd-ct-logo" src={lp.logo.claro.src} width={lp.logo.claro.largura} height={lp.logo.claro.altura} alt={lp.nome} loading="lazy" />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <div className="jd-cartao">
            <FormEtapas lp={lp} formulario={s.formulario} />
          </div>
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
