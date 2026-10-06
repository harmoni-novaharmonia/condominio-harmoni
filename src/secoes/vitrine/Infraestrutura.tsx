import { TituloSecao } from "@/components/TituloSecao";
import { infraestrutura as t } from "@/dados/vitrine";

export function Infraestrutura() {
  const im = t.imagem;
  return (
    <section className="vt-infra">
      <div className="in g12">
        <figure>
          <img src={im.src} width={im.largura} height={im.altura} alt={im.alt} loading="lazy" />
        </figure>
        <div className="tx">
          <p className="rot">{t.rotulo}</p>
          <TituloSecao titulo={t.titulo} tamanho="m" />
          <p className="lead">{t.texto}</p>
          <ul>
            {t.itens.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <small>{t.nota}</small>
        </div>
      </div>
    </section>
  );
}
