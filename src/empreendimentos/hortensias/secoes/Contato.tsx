"use client";

import { FormEtapas } from "@/components/lp/FormEtapas";
import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { textosInteracao as t } from "@/empreendimentos/comum";
import type { LP } from "@/empreendimentos/tipos";
import type { HortensiasContato } from "../tipos";
import { useLoteEscolhido } from "./loteEscolhido";

// Fecha a página: foto em parallax de um lado, cadastro do outro. Se a pessoa
// escolheu um lote na planta, ele aparece aqui e segue junto com o cadastro.
export function Contato({ s, lp }: { s: HortensiasContato; lp: LP }) {
  const lote = useLoteEscolhido();
  return (
    <section id="contato" className="hs hs-contato fundo-creme">
      <figure className="hs-co-foto foto">
        <Img imagem={s.imagem} sizes="(min-width: 900px) 50vw, 100vw" />
      </figure>
      <div className="hs-co-corpo">
        <div className="hs-rv">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          {lote && (
            <p className="hs-co-lote">
              <i />
              {t.seuInteresse} <strong>{t.lote(lote)}</strong>
              <a href="#implantacao">{t.trocar}</a>
            </p>
          )}
          <FormEtapas lp={lp} formulario={s.formulario} extra={lote ? { lote } : undefined} />
        </div>
      </div>
    </section>
  );
}
