import { Numeros } from "@/components/lp/Numeros";
import { Titulo } from "@/components/lp/Titulo";
import { grupo, marcasGrupo, missao, missaoDestaque } from "@/empreendimentos/comum";

// Grupo SFA e missão da Nova Harmonia numa seção só (antes eram duas seguidas).
export function Brasil() {
  return (
    <section className="secao vl vl-grupo fundo-noite">
      <div className="casca">
        <div className="vl-grupo-a">
          <div>
            <div className="vl-logos">
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
          <div className="pilha-txt">
            {grupo.paragrafos.map((p) => (
              <p key={p} className="txt">
                {p}
              </p>
            ))}
          </div>
        </div>
        <Numeros />
        <div className="vl-grupo-b">
          <figure className="vl-brasil">
            <img src={missao.mapa.src} width={missao.mapa.largura} height={missao.mapa.altura} alt={missao.mapa.alt} loading="lazy" decoding="async" />
          </figure>
          <div>
            <p className="sobretitulo">{missaoDestaque.selo}</p>
            <Titulo texto={missaoDestaque.titulo} como="h3" className="d" />
            <p className="txt">{missao.texto}</p>
            <blockquote>{missao.frase}</blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
