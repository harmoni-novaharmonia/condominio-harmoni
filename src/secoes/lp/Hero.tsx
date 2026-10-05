import { FormLead } from "@/components/lp/FormLead";
import { Img } from "@/components/lp/Img";
import { PalavrasRotativas } from "@/components/lp/PalavrasRotativas";
import { Titulo } from "@/components/lp/Titulo";
import { tracado } from "@/empreendimentos/comum";
import type { LP, SecaoHero } from "@/empreendimentos/tipos";

function TituloHero({ s, className }: { s: SecaoHero; className?: string }) {
  if (!s.palavras) return <Titulo texto={s.titulo} como="h1" className={`d hero-titulo ${className ?? ""}`} />;
  return (
    <h1 className={`d hero-titulo ${className ?? ""}`}>
      {s.titulo.antes}
      <PalavrasRotativas palavras={s.palavras} />
      {s.titulo.depois}
    </h1>
  );
}

export function Hero({ s, lp }: { s: SecaoHero; lp: LP }) {
  switch (s.variante) {
    // Vinhedos: foto cheia, palavra que alterna em dourado e cartão de cadastro à direita.
    case "cinema":
      return (
        <section id="inicio" className="hero hero-cinema">
          <div className="hero-fundo">
            <Img imagem={s.imagem} prioridade sizes="100vw" className="anim-zoom" />
          </div>
          <div className="casca hero-grade">
            <div>
              <TituloHero s={s} className="anim-1" />
              <span className="hero-filete anim-2" />
              {s.texto && <p className="hero-sub anim-2">{s.texto}</p>}
            </div>
            <FormLead lp={lp} formulario={s.formulario} cartao className="anim-3" />
          </div>
        </section>
      );

    // Jardins: foto à esquerda abaixo do header, painel creme com título e cadastro.
    case "dividido":
      return (
        <section id="inicio" className="hero hero-dividido">
          <div className="hero-foto anim-arco">
            <Img imagem={s.imagem} prioridade sizes="(min-width: 1080px) 58vw, 100vw" />
          </div>
          <div className="hero-painel">
            <img className="marca-dagua" src={tracado.laranja} width={1350} height={783} alt="" />
            <TituloHero s={s} className="anim-1" />
            {s.texto && <p className="txt anim-2">{s.texto}</p>}
            <FormLead lp={lp} formulario={s.formulario} className="anim-3" />
          </div>
        </section>
      );

    // Arbore: título central, panorâmica com parallax e cartão de cadastro sobreposto.
    case "editorial":
      return (
        <>
          <section id="inicio" className="hero hero-editorial">
            <img className="marca-dagua" src={tracado.petroleo} width={1350} height={783} alt="" />
            <TituloHero s={s} className="anim-1" />
            {s.texto && <p className="txt anim-2">{s.texto}</p>}
          </section>
          <div className="hero-panoramica">
            <Img imagem={s.imagem} prioridade sizes="100vw" className="anim-parallax" />
          </div>
          <HeroCartao s={s} lp={lp} />
        </>
      );

    // Vale: foto ao fundo em movimento lento, texto à esquerda e linha dourada.
    case "fundo":
      return (
        <>
          <section id="inicio" className="hero hero-fundo-foto">
            <div className="hero-fundo">
              <Img imagem={s.imagem} prioridade sizes="100vw" className="anim-pan" />
            </div>
            <div className="casca">
              <div className="hero-bloco">
                <TituloHero s={s} className="anim-1" />
                <span className="hero-filete anim-linha" />
                {s.texto && <p className="hero-sub anim-2">{s.texto}</p>}
              </div>
            </div>
          </section>
          <HeroCartao s={s} lp={lp} />
        </>
      );

    // Essenza: foto cheia e painel branco que desliza da esquerda.
    case "painel":
      return (
        <section id="inicio" className="hero hero-painel-branco">
          <div className="hero-fundo">
            <Img imagem={s.imagem} prioridade sizes="100vw" className="anim-zoom-curto" />
          </div>
          <div className="hero-painel anim-painel">
            <TituloHero s={s} className="anim-1" />
            {s.texto && <p className="txt anim-2">{s.texto}</p>}
            <FormLead lp={lp} formulario={s.formulario} className="anim-3" />
          </div>
        </section>
      );
  }
}

/** Cartão largo de cadastro que sobe por cima do fim da foto (Arbore e Vale). */
function HeroCartao({ s, lp }: { s: SecaoHero; lp: LP }) {
  return (
    <div className="hero-cartao anim-3">
      {s.tituloCartao && <Titulo texto={s.tituloCartao} como="p" className="d hero-cartao-titulo" />}
      <FormLead lp={lp} formulario={s.formulario} tom={lp.tema === "vale" ? "noite" : "escuro"} />
    </div>
  );
}
