import type { CSSProperties } from "react";
import { Lato, Poppins, Roboto } from "next/font/google";
import { FormLead } from "@/components/lp/FormLead";
import { Img } from "@/components/lp/Img";
import type { Arquivo, LP } from "@/empreendimentos/tipos";
import type { IconeNoAr, PaginaNoAr as Pagina, Rico } from "../tipos";
import { CarrosselNoAr } from "./CarrosselNoAr";

// Fontes da LP no ar, carregadas só nesta página (o resto do site usa Jost):
// Lato no texto, Roboto nos botões e Poppins no título do stand.
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--fonte-lato", display: "swap" });
const roboto = Roboto({ subsets: ["latin"], weight: ["500"], variable: "--fonte-roboto", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400"], variable: "--fonte-poppins", display: "swap" });

/** Troca **trecho** por <strong>, como no editor da página no ar. */
export function Texto({ t }: { t: Rico }) {
  return (
    <>
      {t.split("**").map((parte, i) => (i % 2 ? <strong key={i}>{parte}</strong> : parte))}
    </>
  );
}

function Icones({ itens, className }: { itens: IconeNoAr[]; className: string }) {
  return (
    <ul className={`vna-icones ${className}`}>
      {itens.map((it) => (
        <li key={it.titulo}>
          <img src={it.icone.src} width={it.icone.largura} height={it.icone.altura} alt="" loading="lazy" decoding="async" />
          <span>{it.titulo}</span>
        </li>
      ))}
    </ul>
  );
}

const fundo = (a: Arquivo, b?: Arquivo) =>
  ({ "--fundo": `url(${a.src})`, ...(b ? { "--fundo-celular": `url(${b.src})` } : {}) }) as CSSProperties;

/** Miolo da LP do Vinhedos igual ao WordPress. Header e rodapé ficam com o PaginaLP. */
export function PaginaNoAr({ p, lp }: { p: Pagina; lp: LP }) {
  return (
    <div className={`vna ${lato.variable} ${roboto.variable} ${poppins.variable}`}>
      <section id="inicio" className="vna-hero" style={fundo(p.hero.fundo)}>
        <h1>
          {p.hero.linhas.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </h1>
        <p className="vna-hero-faixa">{p.hero.faixa}</p>
      </section>

      <section id="contato" className="vna-cadastro">
        <h2>{p.cadastro.titulo}</h2>
        <FormLead lp={lp} formulario={p.cadastro.formulario} className="vna-form" />
      </section>

      <section className="vna-conceito" style={fundo(p.conceito.fundo, p.conceito.fundoCelular)}>
        <div className="vna-conceito-txt">
          <h2>{p.conceito.titulo}</h2>
          <p>{p.conceito.texto}</p>
          <p className="vna-pilares">{p.conceito.pilares}</p>
          <a className="vna-bt" href={`#${p.conceito.cta.alvo}`}>
            {p.conceito.cta.rotulo}
          </a>
        </div>
      </section>

      <section id="localizacao" className="vna-faixa">
        <h2>{p.faixaLocalizacao}</h2>
      </section>

      <section className="vna-local">
        <div className="vna-local-caixa">
          <Img imagem={p.localizacao.mapa} sizes="(min-width: 1140px) 1100px, 100vw" />
          <p>{p.localizacao.texto}</p>
        </div>
      </section>

      <div className="vna-chamada">
        <div className="vna-chamada-banner" style={fundo(p.chamada.fundo)}>
          <p className="vna-chamada-tit">
            <Texto t={p.chamada.titulo} />
          </p>
          <p className="vna-chamada-txt">{p.chamada.texto}</p>
        </div>
      </div>

      <div className="vna-creme">
        <section id="diferenciais" className="vna-bloco">
          <h2 className="vna-tit vna-tit-p">
            {p.alemDoBasico.titulo.map((l, i) => (
              <span key={i}>
                <Texto t={l} />
              </span>
            ))}
          </h2>
          <Icones itens={p.alemDoBasico.itens} className="vna-icones-basico" />
        </section>

        <section id="perspectivas" className="vna-bloco vna-persp">
          <h2 className="vna-tit vna-tit-menor vna-tit-p">
            {p.perspectivas.titulo.map((l, i) => (
              <span key={i}>
                <Texto t={l} />
              </span>
            ))}
          </h2>
          <CarrosselNoAr slides={p.perspectivas.slides} />
        </section>

        <div className="vna-bloco">
          <hr className="vna-filete" />
          <p className="vna-centro">
            <a className="vna-bt" href={`#${p.saude.cta.alvo}`}>
              {p.saude.cta.rotulo}
            </a>
          </p>
          <h2 className="vna-tit vna-tit-menor vna-tit-saude">
            <Texto t={p.saude.titulo} />
          </h2>
          <Icones itens={p.saude.itens} className="vna-icones-4" />
          <hr className="vna-filete" />
          <h2 className="vna-tit vna-tit-menor vna-tit-infra">
            {p.infraestrutura.titulo.map((l, i) => (
              <span key={i}>
                <Texto t={l} />
              </span>
            ))}
          </h2>
          <Icones itens={p.infraestrutura.itens} className="vna-icones-infra" />
          <hr className="vna-filete" />
        </div>

        <section id="implantacao" className="vna-bloco vna-implantacao">
          <h2>{p.implantacao.titulo}</h2>
          <Img imagem={p.implantacao.planta} sizes="(min-width: 1140px) 1120px, 100vw" />
          <p className="vna-centro">
            <a className="vna-bt" href={`#${p.implantacao.cta.alvo}`}>
              {p.implantacao.cta.rotulo}
            </a>
          </p>
          <ol className="vna-legenda">
            {[0, 5, 10].map((ini) => (
              <li key={ini}>
                <ol start={ini + 1}>
                  {p.implantacao.legenda.slice(ini, ini + 5).map((item, i) => (
                    <li key={item}>
                      <b aria-hidden="true">{ini + i + 1}</b>
                      {item}
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="vna-construimos">
        <p className="vna-construimos-tit">
          <Texto t={p.comoConstruimos.titulo} />
        </p>
        <p className="vna-construimos-sub">{p.comoConstruimos.subtitulo}</p>
        <div className="vna-construimos-grade">
          <div>
            <h2>
              {p.comoConstruimos.missao.map((l, i) => (
                <Texto key={i} t={l} />
              ))}
            </h2>
            <p>{p.comoConstruimos.texto}</p>
          </div>
          <Img imagem={p.comoConstruimos.imagem} sizes="(min-width: 1140px) 737px, 100vw" />
        </div>
      </section>

      <section className="vna-futuro">
        <Img imagem={p.futuro.foto} sizes="(min-width: 1140px) 530px, 100vw" />
        <div>
          <p>{p.futuro.frase}</p>
          <Img imagem={p.futuro.mapa} sizes="(min-width: 1140px) 530px, 100vw" />
        </div>
      </section>
      <p className="vna-presenca">{p.futuro.presenca}</p>

      <section className="vna-grupo">
        <h2>
          <Texto t={p.grupo.chamada} />
        </h2>
        <div className="vna-grupo-marcas">
          <p>
            {p.grupo.frase.split("\n").map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </p>
          {p.grupo.logos.map((l) => (
            <img key={l.src} src={l.src} width={l.largura} height={l.altura} alt={l.alt} loading="lazy" decoding="async" />
          ))}
        </div>
        <div className="vna-grupo-txt">
          {p.grupo.paragrafos.map((t) => (
            <p key={t.slice(0, 24)}>{t}</p>
          ))}
        </div>
        <p className="vna-setores">
          {p.grupo.setores.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>
        <hr className="vna-grupo-linha" />
        <ul className="vna-grupo-fotos">
          {p.grupo.fotos.map((f) => (
            <li key={f.src}>
              <Img imagem={f} sizes="162px" />
            </li>
          ))}
        </ul>
      </section>

      <section className="vna-stand">
        <h2>{p.stand.titulo}</h2>
        <div className="vna-stand-cartao">
          <iframe src={p.stand.mapaUrl} title={p.stand.mapaTitulo} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <span className="vna-stand-linha" aria-hidden="true" />
          <Img imagem={p.stand.foto} sizes="(min-width: 1140px) 500px, 100vw" />
        </div>
      </section>
    </div>
  );
}
