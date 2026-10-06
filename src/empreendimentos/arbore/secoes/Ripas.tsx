import { FormEtapas } from "@/components/lp/FormEtapas";
import { Titulo } from "@/components/lp/Titulo";
import type { LP } from "@/empreendimentos/tipos";
import type { ArboreRipas } from "../tipos";
import { Ripado } from "./Ripado";

// Hero do Arbore: a foto vai até a borda direita da tela, em ripas que crescem de
// baixo para cima; título e cadastro na área livre à esquerda.
export function Ripas({ s, lp }: { s: ArboreRipas; lp: LP }) {
  return (
    <section id="inicio" className="hero ab ab-hero">
      <div className="ab-hero-foto">
        <Ripado imagem={s.imagem} ripas={9} prioridade sizes="54vw" />
      </div>
      <div className="casca">
        <div className="ab-hero-txt">
          <p className="sobretitulo anim-1">
            {lp.nome} · {lp.cidade}
          </p>
          <Titulo texto={s.titulo} como="h1" className="d anim-2" />
          <p className="txt anim-2">{s.texto}</p>
          <div className="ab-cartao anim-3">
            <FormEtapas lp={lp} formulario={s.formulario} />
          </div>
        </div>
      </div>
    </section>
  );
}
