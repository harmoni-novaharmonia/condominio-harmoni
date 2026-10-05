import { memorialPadrao, menuPadrao, redes, rodapeTextos as t, tracado } from "@/empreendimentos/comum";
import type { LP } from "@/empreendimentos/tipos";
import { Ic } from "./Ic";

// footer-section: quatro colunas (consultor, navegação, telefones, redes) e barra
// de base. A newsletter e o modo escuro do original saíram; a primeira coluna leva
// ao WhatsApp. O memorial jurídico fecha a página inteiro. Igual nas 5 LPs.
export function RodapeLP({ lp }: { lp: LP }) {
  const ano = new Date().getFullYear();
  return (
    <footer className="lpr">
      <img className="lpr-marca-dagua" src={tracado.creme} width={1350} height={783} alt="" loading="lazy" />
      <div className="lpr-grade">
        <div className="lpr-col lpr-chamada">
          <img className="lpr-logo" src={lp.logo.escuro.src} width={lp.logo.escuro.largura} height={lp.logo.escuro.altura} alt={lp.nome} loading="lazy" />
          <p className="lpr-tit">{t.chamada}</p>
          <p className="lpr-apoio">{t.apoio}</p>
          <a className="bt bt-acento bt-cheio" href={`https://wa.me/${lp.contato.whatsapp}`} target="_blank" rel="noopener noreferrer">
            <Ic nome="whatsapp" tamanho={18} />
            {t.falar}
          </a>
          <span className="lpr-brilho" aria-hidden="true" />
        </div>

        <nav className="lpr-col" aria-label={t.navegue}>
          <p className="lpr-rot">{t.navegue}</p>
          <ul className="lpr-lista">
            {menuPadrao.map((l) => (
              <li key={l.alvo}>
                <a href={`#${l.alvo}`}>{l.rotulo}</a>
              </li>
            ))}
            <li>
              <a href={t.vitrine.href}>{t.vitrine.rotulo}</a>
            </li>
          </ul>
        </nav>

        <div className="lpr-col">
          <p className="lpr-rot">{t.contato}</p>
          <address className="lpr-lista">
            {lp.contato.telefones.map((tel) => (
              <a key={tel} href={`tel:+55${tel.replace(/\D/g, "")}`}>
                <Ic nome="telefone" tamanho={18} className="ic-claro" />
                {tel}
              </a>
            ))}
            {lp.contato.stand && (
              <p>
                <Ic nome="pino" tamanho={18} className="ic-claro" />
                <span>
                  {t.stand}: {lp.contato.stand}
                </span>
              </p>
            )}
          </address>
        </div>

        <div className="lpr-col">
          <p className="lpr-rot">{t.redes}</p>
          <ul className="lpr-redes">
            {redes.map((r) => (
              <li key={r.nome}>
                <a href={r.href} aria-label={r.nome} data-dica={r.nome} target="_blank" rel="noopener noreferrer">
                  <Ic nome={r.icone} tamanho={18} />
                </a>
              </li>
            ))}
          </ul>
          <a className="lpr-topo" href="#inicio">
            ↑ {t.topo}
          </a>
        </div>
      </div>

      <div className="lpr-base">
        <p>
          © {ano} {t.copyright}
        </p>
        <nav className="lpr-base-links" aria-label={t.legalTitulo}>
          <a href={t.privacidade.href}>{t.privacidade.rotulo}</a>
          <a href={t.institucional.href} target="_blank" rel="noopener noreferrer">
            {t.institucional.rotulo}
          </a>
        </nav>
      </div>

      <div className="lpr-legal">
        <h2 className="sr">{t.legalTitulo}</h2>
        <p>
          {lp.legal.registro} {memorialPadrao}
        </p>
      </div>
    </footer>
  );
}
