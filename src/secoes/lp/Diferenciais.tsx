import { AbasDiferenciais } from "@/components/lp/AbasDiferenciais";
import { Ic } from "@/components/lp/Ic";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { tracado } from "@/empreendimentos/comum";
import type { SecaoDiferenciais } from "@/empreendimentos/tipos";

const num = (i: number) => String(i + 1).padStart(2, "0");

export function Diferenciais({ s }: { s: SecaoDiferenciais }) {
  const itens = s.itens ?? [];
  const cabecalho = (
    <div>
      <Sobretitulo texto={s.sobretitulo} />
      <Titulo texto={s.titulo} className="d titulo-secao" />
    </div>
  );
  const cta = s.cta && (
    <a className="bt bt-escuro bt-cheio" href={`#${s.cta.alvo}`}>
      {s.cta.rotulo}
    </a>
  );

  switch (s.variante) {
    case "abas":
      return (
        <section id="diferenciais" className="secao dif-abas fundo-branco">
          <div className="casca">
            <div className="cabecalho">{cabecalho}</div>
            <AbasDiferenciais grupos={s.grupos ?? []} cta={s.cta} rotulo={s.sobretitulo} />
          </div>
        </section>
      );

    case "grade":
      return (
        <section id="diferenciais" className="secao dif-grade fundo-branco">
          <div className="casca">
            <div className="cabecalho">
              {cabecalho}
              {cta}
            </div>
            <ul className="grade7">
              {itens.map((it, k) => (
                <li key={it.titulo} className="am">
                  <div className="am-topo">
                    <Ic nome={it.icone} tamanho={48} />
                    <span className="am-num">{num(k)}</span>
                  </div>
                  <span className="am-nome">{it.titulo}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    case "lista":
      return (
        <section id="diferenciais" className="secao dif-lista fundo-escuro">
          <img className="marca-dagua marca-dir" src={tracado.creme} width={1350} height={783} alt="" loading="lazy" />
          <div className="casca dif-lista-grade">
            <div>
              {cabecalho}
              {s.cta && (
                <a className="bt bt-acento bt-cheio" href={`#${s.cta.alvo}`}>
                  {s.cta.rotulo}
                </a>
              )}
            </div>
            <ul className="lista2">
              {itens.map((it, k) => (
                <li key={it.titulo} className="lin">
                  <Ic nome={it.icone} tamanho={38} className="ic-claro" />
                  {it.titulo}
                  <span className="lin-num">{num(k)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    case "cartoes":
      return (
        <section id="diferenciais" className="secao dif-cartoes fundo-areia">
          <div className="casca">
            <div className="centro">{cabecalho}</div>
            <ul className="cartoes4">
              {itens.map((it) => (
                <li key={it.titulo} className="cartao">
                  <Ic nome={it.icone} tamanho={52} />
                  <span>{it.titulo}</span>
                </li>
              ))}
              {s.cta && (
                <li className="cartao-cta">
                  <a href={`#${s.cta.alvo}`}>
                    {s.cta.rotulo}
                    <Ic nome="seta" tamanho={32} className="ic-claro" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </section>
      );

    case "grade-escura":
      return (
        <section id="diferenciais" className="secao dif-grade-escura fundo-noite">
          <div className="casca">
            <div className="centro estreito-titulo">{cabecalho}</div>
            <ul className="grade7 grade7-escura">
              {itens.map((it) => (
                <li key={it.titulo} className="cel">
                  <Ic nome={it.icone} tamanho={46} className="ic-claro" />
                  <span>{it.titulo}</span>
                </li>
              ))}
            </ul>
            {cta && <div className="centro dif-cta">{cta}</div>}
          </div>
        </section>
      );
  }
}
