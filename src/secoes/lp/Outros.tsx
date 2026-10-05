import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { lps } from "@/empreendimentos";
import { textosOutros as t } from "@/empreendimentos/comum";
import { cartaoOutro } from "@/empreendimentos/outros";
import type { LP } from "@/empreendimentos/tipos";

/** Fim da LP: os outros Harmonis, para a página não terminar sem saída. */
export function Outros({ lp }: { lp: LP }) {
  return (
    <section className="secao outros fundo-areia">
      <div className="casca">
        <div className="cabecalho">
          <div>
            <Sobretitulo texto={t.sobretitulo} />
            <Titulo texto={t.titulo} className="d titulo-frase" />
          </div>
        </div>
        <ul className="outros-trilho">
          {lps
            .filter((o) => o.slug !== lp.slug)
            .map((o) => {
              const c = cartaoOutro(o.slug);
              return (
                <li key={o.slug}>
                  <a className="outro" href={`/${o.slug}/`}>
                    <figure className="foto">
                      <Img imagem={c.foto} sizes="(min-width: 1080px) 24vw, 80vw" />
                    </figure>
                    <div className="outro-corpo">
                      <img className={o.logo.claro.largura > o.logo.claro.altura * 2 ? "outro-logo largo" : "outro-logo"} src={o.logo.claro.src} width={o.logo.claro.largura} height={o.logo.claro.altura} alt={o.nome} loading="lazy" />
                      <small>{o.cidade}</small>
                      <strong>{c.chamada}</strong>
                      <span>{t.ver} →</span>
                    </div>
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
