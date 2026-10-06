"use client";

import { useRef } from "react";
import { FormEtapas } from "@/components/lp/FormEtapas";
import { Fones } from "@/components/lp/Fones";
import { Ic } from "@/components/lp/Ic";
import { Titulo } from "@/components/lp/Titulo";
import { textosFormulario, textosInteracao } from "@/empreendimentos/comum";
import type { LP } from "@/empreendimentos/tipos";
import { useEspera } from "@/hooks/useEspera";
import type { ArboreContato } from "../tipos";
import { Ripado } from "./Ripado";

// Fecha a página com as ripas do hero, agora do lado esquerdo; elas crescem quando a seção aparece.
export function Contato({ s, lp }: { s: ArboreContato; lp: LP }) {
  const sec = useRef<HTMLElement>(null);
  useEspera(sec, "espera", 0.25);
  const zap = `https://wa.me/${lp.contato.whatsapp}?text=${encodeURIComponent(textosFormulario.mensagemWhatsapp(lp.nome, ""))}`;
  return (
    <section ref={sec} id="contato" className="secao ab ab-contato fundo-branco">
      <div className="ab-ct-foto">
        <Ripado imagem={s.imagem} ripas={7} sizes="46vw" />
      </div>
      <div className="casca ab-ct-grade">
        <div className="ab-ct-corpo">
          <img className="ab-ct-logo" src={lp.logo.claro.src} width={lp.logo.claro.largura} height={lp.logo.claro.altura} alt={lp.nome} loading="lazy" />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <div className="ab-cartao">
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
