import { Ic } from "@/components/lp/Ic";
import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { tracado } from "@/empreendimentos/comum";
import type { SecaoConceito } from "@/empreendimentos/tipos";

function Cta({ s }: { s: SecaoConceito }) {
  if (!s.cta) return null;
  return (
    <a className="bt bt-escuro bt-cheio" href={`#${s.cta.alvo}`}>
      {s.cta.rotulo}
    </a>
  );
}

export function Conceito({ s }: { s: SecaoConceito }) {
  const paragrafos = s.paragrafos.map((p) => (
    <p key={p} className="txt">
      {p}
    </p>
  ));
  const fundo = `fundo-${s.fundo ?? "branco"}`;

  switch (s.variante) {
    // Frase grande centralizada sobre o traçado (Vinhedos).
    case "centro":
      return (
        <section className={`secao conceito-centro ${fundo}`}>
          <img className="marca-dagua" src={tracado.petroleo} width={1350} height={783} alt="" loading="lazy" />
          <div className="estreito">
            <Sobretitulo texto={s.sobretitulo} />
            <Titulo texto={s.titulo} className="d titulo-frase" />
            <div className="conceito-texto">{paragrafos}</div>
          </div>
        </section>
      );

    // Título central, texto em duas colunas e fotos em alturas diferentes (Jardins).
    case "colunas":
      return (
        <section className={`secao conceito-colunas ${fundo}`}>
          <div className="casca">
            <div className="centro">
              <Sobretitulo texto={s.sobretitulo} />
              <Titulo texto={s.titulo} className="d titulo-secao" />
            </div>
            <div className="conceito-duas">{paragrafos}</div>
            {s.imagens && (
              <div className="conceito-fotos">
                {s.imagens.slice(0, 2).map((img) => (
                  <figure key={img.src}>
                    <Img imagem={img} sizes="(min-width: 1080px) 45vw, 100vw" />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      );

    // Duas fotos sobrepostas e texto ao lado (Arbore).
    case "colagem":
      return (
        <section className={`secao conceito-colagem ${fundo}`}>
          <div className="casca conceito-lado">
            <div className="colagem">
              {s.imagens?.slice(0, 2).map((img, k) => (
                <figure key={img.src} className={`colagem-f${k + 1}`}>
                  <Img imagem={img} sizes="(min-width: 1080px) 32vw, 70vw" />
                </figure>
              ))}
            </div>
            <div>
              <Sobretitulo texto={s.sobretitulo} />
              <Titulo texto={s.titulo} className="d titulo-secao" />
              <div className="conceito-texto">{paragrafos}</div>
              <Cta s={s} />
            </div>
          </div>
        </section>
      );

    // Bloco central em fundo de cor, com ícone (Arbore) ou sem (Vale).
    case "manifesto":
      return (
        <section className={`secao conceito-manifesto ${fundo}`}>
          <img className="marca-dagua" src={s.fundo === "creme" ? tracado.laranja : tracado.petroleo} width={1350} height={783} alt="" loading="lazy" />
          <div className="estreito">
            {s.icone && (
              <span className="manifesto-ic">
                <Ic nome={s.icone} tamanho={36} />
              </span>
            )}
            <Sobretitulo texto={s.sobretitulo} />
            <Titulo texto={s.titulo} className="d titulo-frase" />
            <div className="conceito-texto manifesto-texto">{paragrafos}</div>
            <Cta s={s} />
          </div>
        </section>
      );

    // Texto e foto lado a lado (Essenza).
    case "lado":
      return (
        <section className={`secao conceito-lado-sec ${fundo}`}>
          <img className="marca-dagua marca-dir" src={tracado.laranja} width={1350} height={783} alt="" loading="lazy" />
          <div className="casca conceito-lado">
            <div>
              <Sobretitulo texto={s.sobretitulo} />
              <Titulo texto={s.titulo} className="d titulo-secao" />
              <div className="conceito-texto">{paragrafos}</div>
              <Cta s={s} />
            </div>
            {s.imagens?.[0] && (
              <figure className="conceito-foto">
                <Img imagem={s.imagens[0]} sizes="(min-width: 1080px) 55vw, 100vw" />
              </figure>
            )}
          </div>
        </section>
      );
  }
}
