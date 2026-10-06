"use client";

import { SetaDireita } from "@/components/Icones";
import { LinkAncora } from "@/components/LinkAncora";
import { TituloSecao } from "@/components/TituloSecao";
import { useVitrine } from "@/components/VitrineContexto";
import { cidades, harmonis, pendente, porCidade, type Harmoni } from "@/dados/empreendimentos";
import { ancoras, colecao as t } from "@/dados/vitrine";

const Ph = ({ texto }: { texto: string }) => (pendente(texto) ? <em className="ph">{texto}</em> : <>{texto}</>);

export function Filtro() {
  const { cidade, setCidade } = useVitrine();
  const opcoes = [{ valor: "", rotulo: t.filtro.todas, qtd: harmonis.length }, ...cidades.map((c) => ({ valor: c, rotulo: c, qtd: porCidade(c).length }))];
  return (
    <div className="vt-filtro" role="group" aria-label={t.filtro.rotulo}>
      {opcoes.map((o) => (
        <button key={o.valor || "todas"} type="button" aria-pressed={cidade === o.valor} onClick={() => setCidade(o.valor)}>
          {o.rotulo}
          <sup>{o.qtd}</sup>
        </button>
      ))}
    </div>
  );
}

function Edicao({ h, oculta }: { h: Harmoni; oculta: boolean }) {
  const logo = h.logo.claro;
  const dados = (
    <dl>
      <div>
        <dt>{t.rotulos.situacao}</dt>
        <dd>
          <Ph texto={h.status} />
        </dd>
      </div>
      <div>
        <dt>{t.rotulos.lotes}</dt>
        <dd>{pendente(h.lote) ? <Ph texto={h.lote} /> : `${t.rotulos.aPartirDe} ${h.lote}`}</dd>
      </div>
    </dl>
  );
  const acoes = (
    <div className="acoes">
      <a className="btn btn-p" href={`/${h.slug}/`}>
        {t.conhecer} {h.curto} <SetaDireita tamanho={16} espessura={1.4} />
      </a>
      <LinkAncora className="lnk" alvo={ancoras.contato} interesse={h.slug}>
        {t.consultor}
      </LinkAncora>
    </div>
  );
  const marca = (
    <img
      className={`logo${h.logo.horizontal ? " horizontal" : ""}`}
      src={logo.src}
      width={logo.largura}
      height={logo.altura}
      alt={h.nome}
    />
  );

  return (
    <article className={`vt-ed f-${h.forma} g12`} id={`harmoni-${h.slug}`} aria-labelledby={`t-${h.slug}`} hidden={oculta}>
      <figure data-par>
        {h.foto.provisoria && <span className="selo">{t.imagemProvisoria}</span>}
        <img src={h.foto.src} width={h.foto.largura} height={h.foto.altura} alt={h.foto.alt} loading="lazy" />
      </figure>
      {h.forma === "cheia" ? (
        <>
          <div className="tx">
            <div className="esq">
              {marca}
              <p className="cid">
                {h.cidade}/{h.uf} · {t.tipo}
              </p>
              <h3 id={`t-${h.slug}`}>{h.nome}</h3>
            </div>
            <div className="dir">
              <p>{h.frase}</p>
              {h.nota && <p className="nota">{h.nota}</p>}
              {dados}
              {acoes}
            </div>
          </div>
          {h.miniaturas && (
            <div className="miniaturas">
              {h.miniaturas.map((m) => (
                <img key={m.src} src={m.src} width={m.largura} height={m.altura} alt={m.alt} loading="lazy" />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="tx">
          {marca}
          <p className="cid">
            {h.cidade}/{h.uf}
          </p>
          <h3 id={`t-${h.slug}`}>{h.nome}</h3>
          <p>{h.frase}</p>
          {dados}
          {acoes}
        </div>
      )}
    </article>
  );
}

export function Colecao() {
  const { cidade } = useVitrine();
  const p = t.proximo;

  return (
    <section className="vt-col" id={ancoras.empreendimentos}>
      <div className="g">
        <div className="cab">
          <div>
            <p className="rot">{t.rotulo}</p>
            <TituloSecao titulo={t.titulo} />
          </div>
          <div className="dir">
            <p className="lead">{t.texto}</p>
            <Filtro />
          </div>
        </div>
      </div>

      {/* Filtrar só esconde: os elementos continuam ligados aos efeitos de rolagem. */}
      {harmonis.map((h) => (
        <Edicao key={h.slug} h={h} oculta={!!cidade && h.cidade !== cidade} />
      ))}

      <div className="g">
        <div className="prox">
          <div>
            <p className="rot">{p.rotulo}</p>
            <h3>{p.nome}</h3>
            <p>
              {p.texto} <em className="ph">{p.cidade}</em>. {p.apoio}
            </p>
          </div>
          <LinkAncora className="btn btn-le" alvo={ancoras.contato} interesse="">
            {p.cta} <SetaDireita tamanho={16} espessura={1.4} />
          </LinkAncora>
        </div>
      </div>
    </section>
  );
}
