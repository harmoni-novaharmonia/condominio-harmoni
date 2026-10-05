"use client";

import { SetaDireita } from "@/components/Icones";
import { TituloSecao } from "@/components/TituloSecao";
import { useVitrine } from "@/components/VitrineContexto";
import { harmonis } from "@/dados/empreendimentos";
import { localizacao } from "@/dados/vitrine";

export function Localizacao() {
  const { abreFicha } = useVitrine();
  const mapa = localizacao.mapa;

  return (
    <section className="local" id="hm-local">
      <div className="local-mapa rv">
        <img src={mapa.src} width={mapa.largura} height={mapa.altura} alt={mapa.alt} />
      </div>
      <div className="local-txt rv">
        <TituloSecao titulo={localizacao.titulo} />
        <p className="sub">{localizacao.subtitulo}</p>
        <ul className="cidades">
          {harmonis.map((h) => (
            <li key={h.slug}>
              <button type="button" onClick={() => abreFicha(h.slug)}>
                <span>
                  <strong>{h.nome}</strong>
                  <span>{h.cidade}</span>
                </span>
                <SetaDireita />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
