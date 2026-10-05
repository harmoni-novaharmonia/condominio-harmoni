import { Mapa } from "@/components/lp/Mapa";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import type { LP, SecaoLocalizacao } from "@/empreendimentos/tipos";

export function Localizacao({ s, lp }: { s: SecaoLocalizacao; lp: LP }) {
  return (
    <section id="localizacao" className={`secao localizacao fundo-${s.fundo ?? "branco"}`}>
      <div className="casca">
        <div className={`loc-cab loc-cab-${s.cabecalho}`}>
          <div>
            <Sobretitulo texto={s.sobretitulo} />
            <Titulo texto={s.titulo} className="d titulo-secao" />
          </div>
          {s.texto && <p className="txt">{s.texto}</p>}
        </div>
        <Mapa {...s.mapa} nome={lp.nome} />
      </div>
    </section>
  );
}
