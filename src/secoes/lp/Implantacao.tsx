import { Ic } from "@/components/lp/Ic";
import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import type { SecaoImplantacao } from "@/empreendimentos/tipos";

const num = (i: number) => String(i + 1).padStart(2, "0");

export function Implantacao({ s }: { s: SecaoImplantacao }) {
  const cta = s.cta && (
    <a className="bt bt-escuro bt-cheio" href={`#${s.cta.alvo}`}>
      {s.cta.rotulo}
    </a>
  );
  const planta = (
    <figure className="planta">
      <Img imagem={s.planta} sizes="(min-width: 1080px) 70vw, 100vw" />
    </figure>
  );

  // Planta e legenda lado a lado (Arbore, Essenza).
  if (s.variante === "lateral") {
    return (
      <section id="implantacao" className="secao implantacao imp-v-lateral fundo-areia">
        <div className="casca imp-lado" data-invertido={s.invertido}>
          {planta}
          <div>
            <Sobretitulo texto={s.sobretitulo} />
            <Titulo texto={s.titulo} className="d titulo-secao" />
            <ul className="imp-lista">
              {s.legenda.map((l, k) => (
                <li key={l.titulo}>
                  <Ic nome={l.icone} tamanho={30} />
                  {num(k)} · {l.titulo}
                </li>
              ))}
            </ul>
            {cta}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="implantacao" className={`secao implantacao imp-v-${s.variante} fundo-areia`}>
      <div className="casca">
        <div className={s.variante === "largura" ? "cabecalho" : "centro"}>
          <div>
            <Sobretitulo texto={s.sobretitulo} />
            <Titulo texto={s.titulo} className="d titulo-secao" />
          </div>
          {s.variante === "largura" && cta}
        </div>
        {planta}
        {s.variante === "largura" && (
          <ol className="imp-cols">
            {s.legenda.map((l, k) => (
              <li key={l.titulo}>
                <span>{num(k)}</span>
                {l.titulo}
              </li>
            ))}
          </ol>
        )}
        {s.variante === "centro" && (
          <ul className="imp-blocos">
            {s.legenda.map((l, k) => (
              <li key={l.titulo}>
                <Ic nome={l.icone} tamanho={40} />
                {num(k)} · {l.titulo}
              </li>
            ))}
          </ul>
        )}
        {s.variante === "linha" && (
          <ul className="imp-linha">
            {s.legenda.map((l) => (
              <li key={l.titulo}>
                <Ic nome={l.icone} tamanho={28} />
                {l.titulo}
              </li>
            ))}
          </ul>
        )}
        {s.variante === "centro" && cta && <div className="centro imp-cta">{cta}</div>}
      </div>
    </section>
  );
}
