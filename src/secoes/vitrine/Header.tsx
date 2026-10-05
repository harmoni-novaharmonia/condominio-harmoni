"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronDown, SetaDireita } from "@/components/Icones";
import { LinkAncora } from "@/components/LinkAncora";
import { useVitrine } from "@/components/VitrineContexto";
import { harmonis, type Harmoni } from "@/dados/empreendimentos";
import { cabecalho, hero, marcas } from "@/dados/vitrine";

const indice = (i: number) => ({ "--i": i }) as CSSProperties;
const semCidade = (h: Harmoni) => h.cidade.startsWith("[");

export function Header() {
  const { menuAberto, setMenuAberto, abreFicha, rolaPara } = useVitrine();
  const [rolado, setRolado] = useState(false);
  const [mega, setMega] = useState(false);
  const raiz = useRef<HTMLElement>(null);
  const botaoMega = useRef<HTMLButtonElement>(null);
  const fechaEm = useRef<ReturnType<typeof setTimeout> | null>(null);

  const destaque = harmonis.find((h) => h.lancamento) ?? harmonis[0];
  const outros = harmonis.filter((h) => h !== destaque);

  useEffect(() => {
    const checa = () => setRolado(window.scrollY > 40);
    checa();
    window.addEventListener("scroll", checa, { passive: true });
    return () => window.removeEventListener("scroll", checa);
  }, []);

  useEffect(() => {
    const aoTecla = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mega) {
        setMega(false);
        botaoMega.current?.focus();
      }
      setMenuAberto(false);
    };
    const aoClicarFora = (e: PointerEvent) => {
      if (raiz.current && !raiz.current.contains(e.target as Node)) setMega(false);
    };
    const aoRedimensionar = () => {
      if (window.innerWidth > 820) setMenuAberto(false);
    };
    document.addEventListener("keydown", aoTecla);
    document.addEventListener("pointerdown", aoClicarFora);
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      document.removeEventListener("keydown", aoTecla);
      document.removeEventListener("pointerdown", aoClicarFora);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, [mega, setMenuAberto]);

  // Hover só em dispositivos com mouse; no toque o menu abre por clique.
  const abreHover = () => {
    if (!window.matchMedia("(hover:hover)").matches) return;
    if (fechaEm.current) clearTimeout(fechaEm.current);
    setMega(true);
  };
  const fechaHover = () => {
    if (!window.matchMedia("(hover:hover)").matches) return;
    fechaEm.current = setTimeout(() => setMega(false), 180);
  };

  const abre = (slug: string) => {
    setMega(false);
    setMenuAberto(false);
    abreFicha(slug);
  };
  const verTodos = () => {
    setMega(false);
    setMenuAberto(false);
    rolaPara("hm-empreendimentos");
  };

  const classe = ["hdr", rolado && "rolado", menuAberto && "aberto", mega && "mega-aberto"]
    .filter(Boolean)
    .join(" ");
  const claro = marcas.harmoniClaro;
  const escuro = marcas.harmoniEscuro;
  const [negritoIni] = destaque.chamadaNegrito
    ? destaque.chamada.split(destaque.chamadaNegrito)
    : [destaque.chamada];

  return (
    <>
      <div className={menuAberto ? "hdr-cortina on" : "hdr-cortina"} onClick={() => setMenuAberto(false)} aria-hidden="true" />
      <header className={classe} id="hm-topo" ref={raiz}>
        <LinkAncora className="marca" alvo="hm-inicio" ariaLabel={cabecalho.rotuloMarca}>
          <img className="l-claro" src={claro.src} width={claro.largura} height={claro.altura} alt={cabecalho.altMarca} />
          <img className="l-escuro" src={escuro.src} width={escuro.largura} height={escuro.altura} alt="" />
        </LinkAncora>

        <nav aria-label="Principal">
          <ul>
            <li onMouseEnter={abreHover} onMouseLeave={fechaHover}>
              <button
                ref={botaoMega}
                className="hdr-item com-menu"
                type="button"
                aria-expanded={mega}
                aria-haspopup="true"
                aria-controls="hm-mega"
                onClick={() => setMega(!mega)}
              >
                {cabecalho.empreendimentos}
                <ChevronDown tamanho={14} espessura={2} />
              </button>
            </li>
            {cabecalho.links.map((l) => (
              <li key={l.alvo}>
                <LinkAncora className="hdr-item" alvo={l.alvo}>
                  {l.rotulo}
                </LinkAncora>
              </li>
            ))}
          </ul>
        </nav>

        <div className="acoes-hdr">
          <LinkAncora className="btn btn-lar" alvo={cabecalho.cta.alvo}>
            {cabecalho.cta.rotulo}
            <SetaDireita tamanho={16} espessura={2} />
          </LinkAncora>
        </div>

        <button
          className="burger"
          type="button"
          aria-expanded={menuAberto}
          aria-controls="hm-painel"
          aria-label={menuAberto ? cabecalho.fechar : cabecalho.abrir}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Menu desktop */}
        <div className="mega" id="hm-mega" onMouseEnter={abreHover} onMouseLeave={fechaHover}>
          <img
            className="tracado-mega"
            src={marcas.tracado.src}
            width={marcas.tracado.largura}
            height={marcas.tracado.altura}
            alt=""
          />
          <div className="mega-grade">
            <button className="mega-card entra" type="button" style={indice(0)} onClick={() => abre(destaque.slug)}>
              <img
                className="fundo"
                src={destaque.foto.src}
                width={destaque.foto.largura}
                height={destaque.foto.altura}
                alt=""
              />
              <span className="selo">{destaque.status}</span>
              <span className="corpo">
                {destaque.logoDestaque && (
                  <img
                    className="logo-d"
                    src={destaque.logoDestaque.src}
                    width={destaque.logoDestaque.largura}
                    height={destaque.logoDestaque.altura}
                    alt={destaque.nome}
                  />
                )}
                <span className="cid">{destaque.cidade}</span>
                <span className="tit">
                  {negritoIni}
                  {destaque.chamadaNegrito && <strong>{destaque.chamadaNegrito}</strong>}
                </span>
                <span className="ver">
                  {hero.conhecer} {destaque.curto}
                  <SetaDireita tamanho={16} espessura={2} />
                </span>
              </span>
            </button>

            <div className="mega-lista">
              <p className="mega-rot entra" style={indice(1)}>
                {cabecalho.menu.rotulo}
              </p>
              {outros.map((h, i) => (
                <button key={h.slug} className="mega-item entra" type="button" style={indice(i + 2)} onClick={() => abre(h.slug)}>
                  <img src={h.foto.src} width={h.foto.largura} height={h.foto.altura} alt="" loading="lazy" />
                  <span className="txt">
                    <span className="nome">{h.nome}</span>
                    <span className="sub">{semCidade(h) ? cabecalho.menu.semCidade : h.cidade}</span>
                  </span>
                  <SetaDireita tamanho={18} espessura={1.8} />
                </button>
              ))}
            </div>
          </div>
          <div className="mega-pe entra" style={indice(outros.length + 2)}>
            <span>{cabecalho.menu.rodape}</span>
            <a
              href="#hm-empreendimentos"
              onClick={(e) => {
                e.preventDefault();
                verTodos();
              }}
            >
              {cabecalho.menu.verTodos}
              <SetaDireita tamanho={16} espessura={2} />
            </a>
          </div>
        </div>

        {/* Menu celular: o cartão continua a barra, tudo cabe sem rolar */}
        <div className="painel" id="hm-painel">
          <p className="rot entra" style={indice(0)}>
            {cabecalho.empreendimentos}
          </p>
          {harmonis.map((h, i) => (
            <button key={h.slug} className="linha-p entra" type="button" style={indice(i + 1)} onClick={() => abre(h.slug)}>
              <img src={h.foto.src} width={h.foto.largura} height={h.foto.altura} alt="" loading="lazy" />
              <span className="txt">
                <span className="nome">{h.nome}</span>
                {h.lancamento ? (
                  <span className="selo">{h.status}</span>
                ) : (
                  !semCidade(h) && <span className="sub">{h.cidade}</span>
                )}
              </span>
              <SetaDireita tamanho={18} espessura={1.8} />
            </button>
          ))}
          {cabecalho.links.map((l, i) => (
            <LinkAncora key={l.alvo} className="link-p entra" alvo={l.alvo} style={indice(harmonis.length + 1 + i)}>
              {l.rotulo}
              <SetaDireita tamanho={18} espessura={1.8} />
            </LinkAncora>
          ))}
          <LinkAncora className="btn btn-lar entra" alvo={cabecalho.cta.alvo} style={indice(harmonis.length + 3)}>
            {cabecalho.cta.rotulo}
            <SetaDireita tamanho={16} espessura={2} />
          </LinkAncora>
        </div>
      </header>
    </>
  );
}
