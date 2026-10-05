import { Ic } from "@/components/lp/Ic";
import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { tracado } from "@/empreendimentos/comum";
import type { SecaoObra } from "@/empreendimentos/tipos";

/** "Como construímos": corte da rua e a infraestrutura Nova Harmonia com ícones. */
export function Obra({ s }: { s: SecaoObra }) {
  const escuro = s.variante === "escura";
  const corte = (
    <figure className="obra-corte">
      <Img imagem={s.imagem} sizes="(min-width: 1080px) 60vw, 100vw" />
    </figure>
  );
  const lista = (
    <ul className="obra-lista">
      {s.itens.map((it) => (
        <li key={it.titulo}>
          <Ic nome={it.icone} tamanho={34} className={escuro ? "ic-claro" : undefined} />
          {it.titulo}
        </li>
      ))}
    </ul>
  );
  const cab = (
    <>
      <Sobretitulo texto={s.sobretitulo} />
      <Titulo texto={s.titulo} className="d titulo-secao" />
    </>
  );

  if (s.variante === "centro") {
    return (
      <section className={`secao obra obra-v-centro fundo-${s.fundo ?? "branco"}`}>
        <div className="casca">
          <div className="centro estreito-titulo">{cab}</div>
          {corte}
          <ul className="obra-blocos">
            {s.itens.map((it) => (
              <li key={it.titulo}>
                <Ic nome={it.icone} tamanho={40} />
                {it.titulo}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (s.variante === "faixa") {
    return (
      <section className={`secao obra obra-v-faixa fundo-${s.fundo ?? "areia"}`}>
        <div className="casca">
          <div className="obra-topo">
            <div>{cab}</div>
            {lista}
          </div>
          {corte}
        </div>
      </section>
    );
  }

  return (
    <section className={`secao obra obra-v-${s.variante} fundo-${escuro ? "escuro" : s.fundo ?? "branco"}`}>
      {escuro && <img className="marca-dagua marca-dir" src={tracado.creme} width={1350} height={783} alt="" loading="lazy" />}
      <div className="casca">
        {escuro && (
          <div className="obra-cab-escura">
            <div>{cab}</div>
            {s.texto && <p className="txt">{s.texto}</p>}
          </div>
        )}
        <div className="obra-lado" data-invertido={s.invertido}>
          {escuro ? (
            <>
              {corte}
              {lista}
            </>
          ) : (
            <>
              <div>
                {cab}
                {s.texto && <p className="txt">{s.texto}</p>}
                {lista}
              </div>
              {corte}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
