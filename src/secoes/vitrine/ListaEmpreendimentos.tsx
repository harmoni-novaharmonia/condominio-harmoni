"use client";

import { LinkAncora } from "@/components/LinkAncora";
import { SetaDireita } from "@/components/Icones";
import { TituloSecao } from "@/components/TituloSecao";
import { useVitrine } from "@/components/VitrineContexto";
import { harmonis } from "@/dados/empreendimentos";
import { lista } from "@/dados/vitrine";

export function ListaEmpreendimentos() {
  const { abreFicha } = useVitrine();

  return (
    <section className="vitrine" id="hm-empreendimentos">
      <div className="v-topo rv">
        <TituloSecao titulo={lista.titulo} />
        <p className="sub">{lista.subtitulo}</p>
      </div>
      <ul className="lista rv">
        {harmonis.map((h) => (
          <li key={h.slug}>
            <button className="linha" type="button" onClick={() => abreFicha(h.slug)}>
              <span className="thumb">
                <img src={h.foto.src} width={h.foto.largura} height={h.foto.altura} alt="" loading="lazy" />
              </span>
              <span className="marca-l">
                {h.logo ? (
                  <img src={h.logo.src} width={h.logo.largura} height={h.logo.altura} alt={h.nome} />
                ) : (
                  <span className="logo-txt">{h.nome}</span>
                )}
              </span>
              <span className="info-l">
                <span className="cid">{h.cidade}</span>
                <span className={h.lancamento ? "selo-l lanc" : "selo-l"}>{h.status}</span>
              </span>
              <span className="ver">
                <span className="txt">{lista.verFicha}</span>
                <span className="seta" aria-hidden="true">
                  <SetaDireita tamanho={14} espessura={2.2} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="proximo">
        <p>{lista.proximo}</p>
        <LinkAncora className="btn btn-pet" alvo="hm-contato" interesse="">
          {lista.proximoCta}
        </LinkAncora>
      </div>
    </section>
  );
}
