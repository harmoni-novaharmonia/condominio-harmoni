"use client";

import { useEffect } from "react";
import { SetaDireita } from "@/components/Icones";
import { LinkAncora } from "@/components/LinkAncora";
import { useVitrine } from "@/components/VitrineContexto";
import { harmonis } from "@/dados/empreendimentos";
import { ancoras, cabecalho, marcas } from "@/dados/vitrine";
import { useRolou } from "@/hooks/useRolou";

export function Header() {
  const { menuAberto, setMenuAberto } = useVitrine();
  const rolou = useRolou(40);

  useEffect(() => {
    if (!menuAberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setMenuAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [menuAberto, setMenuAberto]);

  const classes = ["vt-hd", rolou && "rolou", menuAberto && "aberto"].filter(Boolean).join(" ");

  return (
    <header className={classes}>
      <div className="vt-hd-barra">
        <LinkAncora className="vt-hd-logo" alvo={ancoras.inicio} ariaLabel={cabecalho.rotuloMarca}>
          <img className="le" src={marcas.escuro.src} width={marcas.escuro.largura} height={marcas.escuro.altura} alt="" />
          <img className="lc" src={marcas.claro.src} width={marcas.claro.largura} height={marcas.claro.altura} alt="" />
        </LinkAncora>

        <nav className="vt-hd-nav" aria-label="Principal">
          {cabecalho.links.map((l) => (
            <LinkAncora key={l.alvo} alvo={l.alvo}>
              {l.rotulo}
            </LinkAncora>
          ))}
        </nav>

        <LinkAncora className="btn btn-a vt-hd-cta" alvo={cabecalho.cta.alvo}>
          {cabecalho.cta.rotulo}
        </LinkAncora>

        <button
          className="vt-hd-menu"
          type="button"
          aria-expanded={menuAberto}
          aria-controls="vt-menu"
          aria-label={menuAberto ? cabecalho.fechar : cabecalho.abrir}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <span />
          <span />
        </button>

        <div className="vt-hd-painel" id="vt-menu" inert={!menuAberto}>
          <nav aria-label="Menu">
            {[...cabecalho.links, cabecalho.linkContato].map((l) => (
              <LinkAncora key={l.alvo} alvo={l.alvo}>
                {l.rotulo}
              </LinkAncora>
            ))}
          </nav>
          <ul className="logos" aria-label={cabecalho.rotuloLogos}>
            {harmonis.map((h) => (
              <li key={h.slug}>
                <a href={`/${h.slug}/`} aria-label={h.nome}>
                  <img
                    className={h.logo.horizontal ? "horizontal" : undefined}
                    src={h.logo.escuro.src}
                    width={h.logo.escuro.largura}
                    height={h.logo.escuro.altura}
                    alt=""
                  />
                </a>
              </li>
            ))}
          </ul>
          <LinkAncora className="btn btn-a" alvo={cabecalho.cta.alvo}>
            {cabecalho.cta.rotulo} <SetaDireita tamanho={16} espessura={1.4} />
          </LinkAncora>
        </div>
      </div>
    </header>
  );
}
