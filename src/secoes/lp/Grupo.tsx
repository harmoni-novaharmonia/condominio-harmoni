import { Img } from "@/components/lp/Img";
import { Titulo } from "@/components/lp/Titulo";
import { grupo, marcasGrupo, tracado } from "@/empreendimentos/comum";
import type { SecaoGrupo } from "@/empreendimentos/tipos";

function Marcas({ cartao }: { cartao?: boolean }) {
  return (
    <div className={`grupo-marcas ${cartao ? "grupo-marcas-cartao" : ""}`}>
      <img src={marcasGrupo.novaHarmonia.src} width={marcasGrupo.novaHarmonia.largura} height={marcasGrupo.novaHarmonia.altura} alt={marcasGrupo.novaHarmonia.alt} loading="lazy" />
      <span className="grupo-x" aria-hidden="true" />
      <img src={marcasGrupo.sfa.src} width={marcasGrupo.sfa.largura} height={marcasGrupo.sfa.altura} alt={marcasGrupo.sfa.alt} loading="lazy" />
    </div>
  );
}

const Frase = () => <Titulo texto={grupo.frase} className="d titulo-secao" />;

const Setores = () => <p className="grupo-setores">{grupo.setores.join(" · ")}</p>;

// Seção obrigatória do grupo (Nova Harmonia + SFA). Texto do cliente, verbatim.
export function Grupo({ s }: { s: SecaoGrupo }) {
  if (s.variante === "escuro") {
    return (
      <section className="secao grupo grupo-escuro fundo-escuro">
        <img className="marca-dagua" src={tracado.creme} width={1350} height={783} alt="" loading="lazy" />
        <div className="casca grupo-escuro-grade">
          <div>
            <p className="sobretitulo">{grupo.chamada.antes}{grupo.chamada.destaque}</p>
            <Frase />
            <p className="txt">{grupo.paragrafos[0]}</p>
            <Marcas cartao />
            <Setores />
          </div>
          <ul className="grupo-mosaico">
            {grupo.fotos.slice(0, 4).map((f) => (
              <li key={f.src}>
                <Img imagem={f} sizes="25vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (s.variante === "escuro-centro") {
    return (
      <section className="secao grupo grupo-escuro-centro fundo-escuro">
        <img className="marca-dagua" src={tracado.creme} width={1350} height={783} alt="" loading="lazy" />
        <div className="estreito centro">
          <p className="sobretitulo">{grupo.chamada.antes}{grupo.chamada.destaque}</p>
          <Frase />
          <p className="txt">{grupo.paragrafos[0]}</p>
          <Marcas cartao />
          <Setores />
        </div>
      </section>
    );
  }

  return (
    <section className={`secao grupo grupo-centro fundo-${s.fundo ?? "branco"}`}>
      <div className="estreito centro">
        <p className="sobretitulo">
          {grupo.chamada.antes}
          <strong>{grupo.chamada.destaque}</strong>
        </p>
        <Marcas />
        <Frase />
        <div className="grupo-texto">
          {grupo.paragrafos.map((p) => (
            <p key={p} className="txt">
              {p}
            </p>
          ))}
        </div>
        <Setores />
      </div>
      <ul className="grupo-fotos">
        {grupo.fotos.map((f) => (
          <li key={f.src}>
            <Img imagem={f} sizes="(min-width: 1080px) 16vw, 50vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
