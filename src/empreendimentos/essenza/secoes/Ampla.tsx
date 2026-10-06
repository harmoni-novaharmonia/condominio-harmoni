import { Cabecalho } from "@/components/lp/Cabecalho";
import { IcTinta } from "@/components/lp/IcTinta";
import { PlantaZoom } from "@/components/lp/PlantaZoom";
import type { EssenzaAmpla } from "../tipos";

export function Ampla({ s }: { s: EssenzaAmpla }) {
  return (
    <section id="implantacao" className="secao ez ez-ampla fundo-areia">
      <div className="casca">
        <Cabecalho
          sobretitulo={s.sobretitulo}
          titulo={s.titulo}
          direita={
            s.cta && (
              <a className="bt bt-escuro" href={`#${s.cta.alvo}`}>
                {s.cta.rotulo}
              </a>
            )
          }
        />
        <PlantaZoom planta={s.planta} />
        <ul className="ez-ampla-leg">
          {s.legenda.map((x) => (
            <li key={x.titulo}>
              <IcTinta nome={x.icone} />
              <span>{x.titulo}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
