import { harmonis, pendente } from "@/dados/empreendimentos";
import { ancoras, hero } from "@/dados/vitrine";

// Uma faixa por Harmoni; a que recebe o mouse (ou o foco) alarga. Cada faixa é
// o link da LP, então o hero já distribui o tráfego e os links internos.
export function HeroFaixas() {
  return (
    <section className="vt-hero" id={ancoras.inicio} aria-labelledby="vt-h1">
      {harmonis.map((h, i) => (
        <a key={h.slug} className="fx" href={`/${h.slug}/`} aria-label={`${h.nome}, ${h.cidade}/${h.uf}`}>
          <img
            src={h.foto.src}
            width={h.foto.largura}
            height={h.foto.altura}
            alt=""
            fetchPriority={i === 0 ? "high" : undefined}
          />
          <span className="info">
            <img
              className={h.logo.horizontal ? "horizontal" : undefined}
              src={h.logo.escuro.src}
              width={h.logo.escuro.largura}
              height={h.logo.escuro.altura}
              alt=""
            />
            <span className="cid">
              {h.curto} · {h.cidade}/{h.uf}
            </span>
            <span className="st">{pendente(h.status) ? hero.conhecer : h.status}</span>
          </span>
        </a>
      ))}
      <div className="titulo">
        <h1 className="t-l sobe" id="vt-h1">
          {hero.titulo.inicio}
          <strong>{hero.titulo.destaque}</strong>
        </h1>
        <p className="sobe" style={{ animationDelay: ".2s" }}>
          {hero.linha}
        </p>
      </div>
    </section>
  );
}
