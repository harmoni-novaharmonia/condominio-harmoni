import { SetaDireita } from "@/components/Icones";
import { LinkAncora } from "@/components/LinkAncora";
import { harmonis } from "@/dados/empreendimentos";
import { rodape as t } from "@/dados/vitrine";

export function Rodape() {
  return (
    <footer className="vt-rp g">
      <div className="cols">
        <div>
          <p className="chamada">{t.chamada}</p>
          <LinkAncora className="btn btn-a" alvo={t.cta.alvo}>
            {t.cta.rotulo} <SetaDireita tamanho={16} espessura={1.4} />
          </LinkAncora>
        </div>
        <nav aria-label={t.colunas.harmonis}>
          <p className="tit">{t.colunas.harmonis}</p>
          <ul>
            {harmonis.map((h) => (
              <li key={h.slug}>
                <a href={`/${h.slug}/`}>{h.nome}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.colunas.explore}>
          <p className="tit">{t.colunas.explore}</p>
          <ul>
            {t.explore.map((l) => (
              <li key={l.alvo}>
                <LinkAncora alvo={l.alvo}>{l.rotulo}</LinkAncora>
              </li>
            ))}
            <li>
              <a href={t.institucional.href} target="_blank" rel="noopener noreferrer">
                {t.institucional.rotulo}
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <p className="tit">{t.colunas.siga}</p>
          <ul>
            {t.redes.map((r) => (
              <li key={r.nome}>
                {r.href === "#" ? (
                  <>
                    {r.nome} <em className="ph">{t.urlPendente}</em>
                  </>
                ) : (
                  <a href={r.href} target="_blank" rel="noopener noreferrer">
                    {r.nome}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="legal">
        <span>{t.legal}</span>
        <span>
          {t.privacidade.href === "#" ? (
            <>
              {t.privacidade.rotulo} <em className="ph">{t.privacidadePendente}</em>
            </>
          ) : (
            <a href={t.privacidade.href}>{t.privacidade.rotulo}</a>
          )}
        </span>
      </div>
    </footer>
  );
}
