import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import type { HortensiasProvas } from "../tipos";

// Não é promessa: fotos reais de obra Nova Harmonia em preto e branco, que ganham
// cor sob o mouse. Sem mouse (celular), cada uma ganha cor na sua vez.
export function Provas({ s }: { s: HortensiasProvas }) {
  return (
    <section className="secao hs hs-provas fundo-creme">
      <div className="casca">
        <div className="hs-centro hs-rv">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <p className="txt">{s.texto}</p>
        </div>
        <ul className="hs-pv-lista">
          {s.fotos.map((f, k) => (
            <li key={f.legenda}>
              <figure className="hs-prova foto" style={{ ["--k" as string]: k }}>
                <Img imagem={f.imagem} sizes="(min-width: 900px) 33vw, 100vw" />
                <figcaption>{f.legenda}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
