import { IcTinta } from "@/components/lp/IcTinta";
import { PlantaZoom } from "@/components/lp/PlantaZoom";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import type { ValeMoldura } from "../tipos";

// A chamada "Escolha agora onde será seu lar" é o título da planta: é aqui que se escolhe o lote.
export function Moldura({ s }: { s: ValeMoldura }) {
  return (
    <section id="implantacao" className="secao vl vl-impl fundo-areia">
      <div className="casca">
        <div className="vl-impl-cab">
          <div>
            <Sobretitulo texto={s.sobretitulo} />
            <Titulo texto={s.titulo} className="d titulo-secao" />
          </div>
          <div>
            <ul className="vl-impl-leg">
              {s.legenda.map((x) => (
                <li key={x.titulo}>
                  <IcTinta nome={x.icone} />
                  <span>{x.titulo}</span>
                </li>
              ))}
            </ul>
            {s.cta && (
              <a className="bt bt-escuro" href={`#${s.cta.alvo}`}>
                {s.cta.rotulo}
              </a>
            )}
          </div>
        </div>
        <PlantaZoom planta={s.planta} />
      </div>
    </section>
  );
}
