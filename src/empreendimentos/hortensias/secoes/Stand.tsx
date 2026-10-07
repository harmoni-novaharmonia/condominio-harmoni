import { Img } from "@/components/lp/Img";
import { Numeros } from "@/components/lp/Numeros";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import type { HortensiasStand } from "../tipos";

// Quem faz: a foto do stand começa recolhida e se abre até a borda no hover; ao
// lado, os números publicados da Nova Harmonia (contam quando aparecem).
export function Stand({ s }: { s: HortensiasStand }) {
  return (
    <section className="secao hs hs-stand fundo-areia">
      <div className="casca hs-sd-grade">
        <figure className="hs-sd-foto foto">
          <Img imagem={s.imagem} sizes="(min-width: 900px) 58vw, 100vw" />
        </figure>
        <div className="hs-rv">
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <p className="txt">{s.texto}</p>
          <a className="bt bt-escuro" href={`#${s.cta.alvo}`}>
            {s.cta.rotulo}
          </a>
        </div>
      </div>
      <div className="casca">
        <Numeros />
      </div>
    </section>
  );
}
