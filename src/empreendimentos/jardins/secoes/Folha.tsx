import { FormEtapas } from "@/components/lp/FormEtapas";
import { IcTinta } from "@/components/lp/IcTinta";
import { Img } from "@/components/lp/Img";
import { Titulo } from "@/components/lp/Titulo";
import type { LP } from "@/empreendimentos/tipos";
import type { JardinsFolha } from "../tipos";

// Hero do Jardins: texto e cadastro à esquerda; a foto nasce como semente e abre
// em folha (dois cantos opostos arredondados), com o selo girando na borda.
export function Folha({ s, lp }: { s: JardinsFolha; lp: LP }) {
  return (
    <section id="inicio" className="hero jd jd-hero">
      <div className="casca jd-hero-grade">
        <div className="jd-hero-txt">
          <p className="sobretitulo anim-1">
            {lp.nome} · {lp.cidade}
          </p>
          <Titulo texto={s.titulo} como="h1" className="d anim-2" />
          <p className="txt anim-2">{s.texto}</p>
          <div className="jd-cartao anim-3">
            <FormEtapas lp={lp} formulario={s.formulario} />
          </div>
        </div>
        <div className="jd-hero-foto">
          <figure className="jd-folha foto">
            <Img imagem={s.imagem} prioridade sizes="(min-width: 980px) 52vw, 100vw" />
          </figure>
          <span className="jd-selo" aria-hidden="true">
            <svg viewBox="0 0 160 160">
              <defs>
                <path id="jd-selo-giro" d="M80,80 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
              </defs>
              <text>
                <textPath href="#jd-selo-giro" textLength="374">
                  {s.selo.toUpperCase()}
                </textPath>
              </text>
            </svg>
            <IcTinta nome="folha" />
          </span>
        </div>
      </div>
    </section>
  );
}
