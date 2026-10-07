import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import type { HortensiasDuvidas } from "../tipos";

// Perguntas frequentes em <details>: abre e fecha sem script; a primeira já vem aberta.
export function Duvidas({ s }: { s: HortensiasDuvidas }) {
  return (
    <section className="secao hs hs-duvidas">
      <div className="casca hs-dv-grade">
        <div className="hs-rv">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
        </div>
        <div className="hs-dv-lista">
          {s.perguntas.map((x, k) => (
            <details key={x.pergunta} open={k === 0}>
              <summary>{x.pergunta}</summary>
              <p>{x.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
