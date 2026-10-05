import { Numeros } from "@/components/lp/Numeros";
import { Titulo } from "@/components/lp/Titulo";
import { grupo, marcasGrupo, tracado } from "@/empreendimentos/comum";
import type { EssenzaSetores } from "../tipos";

export function Setores({ s }: { s: EssenzaSetores }) {
  const cartoes = (oculto?: boolean) => (
    <div className="ez-set" aria-hidden={oculto || undefined}>
      {s.cartoes.map((c) =>
        c.imagem ? (
          <figure key={c.setor} className="ez-setor">
            <img src={c.imagem.src} width={c.imagem.largura} height={c.imagem.altura} alt={oculto ? "" : c.imagem.alt} loading="lazy" decoding="async" />
            <figcaption>{c.setor}</figcaption>
          </figure>
        ) : (
          <div key={c.setor} className="ez-setor ez-setor-txt">
            <span>{c.setor}</span>
          </div>
        ),
      )}
    </div>
  );
  return (
    <section className="secao ez ez-grupo fundo-creme">
      <img className="marca-dagua" src={tracado.petroleo} width={1350} height={783} alt="" loading="lazy" />
      <div className="casca ez-grupo-grade">
        <div>
          <div className="ez-logos">
            <img src={marcasGrupo.novaHarmonia.src} width={marcasGrupo.novaHarmonia.largura} height={marcasGrupo.novaHarmonia.altura} alt={marcasGrupo.novaHarmonia.alt} loading="lazy" />
            <i />
            <img src={marcasGrupo.sfa.src} width={marcasGrupo.sfa.largura} height={marcasGrupo.sfa.altura} alt={marcasGrupo.sfa.alt} loading="lazy" />
          </div>
          <p className="sobretitulo">
            {grupo.frase.antes}
            {grupo.frase.destaque}
          </p>
          <Titulo texto={grupo.chamada} className="d titulo-secao" />
        </div>
        <div>
          <div className="pilha-txt">
            {grupo.paragrafos.map((p) => (
              <p key={p} className="txt">
                {p}
              </p>
            ))}
          </div>
          <Numeros />
        </div>
      </div>
      <div className="ez-setores" role="region" aria-label={grupo.rotuloFotos}>
        <div className="ez-setores-trilho">
          {cartoes()}
          {cartoes(true)}
        </div>
      </div>
    </section>
  );
}
