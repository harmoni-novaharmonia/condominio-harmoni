import { Img } from "@/components/lp/Img";
import { missao } from "@/empreendimentos/comum";

/** Missão da Nova Harmonia: foto, texto e mapa do Brasil (Vale). Texto do cliente. */
export function Missao() {
  return (
    <section className="secao missao fundo-branco">
      <div className="casca missao-grade">
        <figure className="missao-foto">
          <Img imagem={missao.foto} sizes="(min-width: 1080px) 28vw, 100vw" />
        </figure>
        <div>
          <h2 className="d titulo-menor">{missao.titulo}</h2>
          <p className="txt">{missao.texto}</p>
        </div>
        <div>
          <p className="sobretitulo">{missao.frase}</p>
          <Img imagem={missao.mapa} sizes="(min-width: 1080px) 28vw, 80vw" />
        </div>
      </div>
    </section>
  );
}
