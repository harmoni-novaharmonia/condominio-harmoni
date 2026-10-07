import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import type { HortensiasCartoes } from "../tipos";

const dois = (n: number) => String(n).padStart(2, "0");

// Por que garantir agora: quatro cartões que viram sozinhos, cada um na sua vez
// (atraso negativo: já começam em fases diferentes), com a foto no verso. O mouse
// ou o foco vira o cartão na hora.
export function Cartoes({ s }: { s: HortensiasCartoes }) {
  return (
    <section className="secao hs hs-cartoes fundo-escuro">
      <div className="casca">
        <div className="hs-centro hs-rv">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <p className="txt">{s.texto}</p>
        </div>
        <ul className="hs-ct-lista">
          {s.itens.map((x, k) => (
            <li key={x.titulo} className="hs-cartao-vira" tabIndex={0}>
              <div className="hs-cv-in" style={{ animationDelay: `${k * 3 - 12}s` }}>
                <div className="hs-cv-face hs-cv-frente">
                  <b>{dois(k + 1)}</b>
                  <div>
                    <h3>{x.titulo}</h3>
                    <p>{x.texto}</p>
                  </div>
                </div>
                <div className="hs-cv-face hs-cv-verso" aria-hidden="true">
                  <Img imagem={x.imagem} sizes="(min-width: 900px) 25vw, 50vw" />
                  <span>{x.titulo}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="hs-centro hs-ct-cta">
          <a className="bt bt-acento" href={`#${s.cta.alvo}`}>
            {s.cta.rotulo}
          </a>
        </div>
      </div>
    </section>
  );
}
