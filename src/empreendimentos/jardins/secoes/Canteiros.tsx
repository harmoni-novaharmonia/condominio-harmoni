import { Cabecalho } from "@/components/lp/Cabecalho";
import { IcTinta } from "@/components/lp/IcTinta";
import { Titulo } from "@/components/lp/Titulo";
import { textosInteracao } from "@/empreendimentos/comum";
import type { JardinsCanteiros } from "../tipos";

// Diferenciais em canteiros. O item com foto própria traz a foto numa semente
// redonda no canto; ao passar o mouse ela abre em círculo até ocupar o canteiro.
// O último canteiro é a chamada de lançamento com o botão.
export function Canteiros({ s }: { s: JardinsCanteiros }) {
  return (
    <section id="diferenciais" className="secao jd jd-canteiros fundo-branco">
      <div className="casca">
        <Cabecalho sobretitulo={s.sobretitulo} titulo={s.titulo} direita={<p className="dica">{textosInteracao.dicaCanteiros}</p>} />
        <ul className="jd-cant-grade">
          {s.itens.map((x) => (
            <li key={x.titulo} className={`jd-cant ${x.foto ? "com-foto" : ""}`}>
              {x.foto && (
                <>
                  <span className="jd-cant-foto" aria-hidden="true">
                    <img src={x.foto.src} width={x.foto.largura} height={x.foto.altura} alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className="jd-cant-sem" aria-hidden="true">
                    <img src={x.foto.src} width={x.foto.largura} height={x.foto.altura} alt="" loading="lazy" decoding="async" />
                  </span>
                </>
              )}
              <IcTinta nome={x.icone} />
              <strong>{x.titulo}</strong>
              <small>{x.categoria}</small>
            </li>
          ))}
          <li className="jd-cant jd-cant-cta">
            <Titulo texto={s.chamada} como="p" className="d" />
            <a className="bt bt-acento" href={`#${s.cta.alvo}`}>
              {s.cta.rotulo}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
