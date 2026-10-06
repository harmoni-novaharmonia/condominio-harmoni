import { Cabecalho } from "@/components/lp/Cabecalho";
import { IcTinta } from "@/components/lp/IcTinta";
import { PlantaZoom } from "@/components/lp/PlantaZoom";
import type { ArboreLado } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Implantação: planta com zoom e a legenda ao lado, esticada até a altura da planta.
export function Lado({ s }: { s: ArboreLado }) {
  return (
    <section id="implantacao" className="secao ab ab-impl">
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
        <div className="ab-impl-grade">
          <PlantaZoom planta={s.planta} />
          <ol className="ab-impl-leg">
            {s.legenda.map((x, i) => (
              <li key={x.titulo}>
                <b>{dois(i + 1)}</b>
                <IcTinta nome={x.icone} />
                <span>{x.titulo}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
