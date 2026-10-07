import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import type { HortensiasTiras } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Por que o Hortênsias: um argumento por tira vertical, com o nome em pé. A tira
// sob o mouse (ou tocada) se abre, a foto ganha cor e o texto sobe. No celular as
// tiras viram faixas que se abrem ao toque.
export function Tiras({ s }: { s: HortensiasTiras }) {
  return (
    <section className="secao hs hs-tiras">
      <div className="casca">
        <div className="hs-centro hs-rv">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <p className="txt">{s.texto}</p>
        </div>
        <ul className="hs-tr-lista">
          {s.itens.map((x, k) => (
            <li key={x.titulo} className="hs-tira" tabIndex={0}>
              <Img imagem={x.imagem} sizes="(min-width: 900px) 50vw, 100vw" />
              <span className="hs-tr-n">{dois(k + 1)}</span>
              <span className="hs-tr-v" aria-hidden="true">
                {x.titulo}
              </span>
              <div className="hs-tr-txt">
                <h3>{x.titulo}</h3>
                <p>{x.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
