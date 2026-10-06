import { manifesto } from "@/dados/vitrine";

export function Manifesto() {
  const palavras = manifesto.texto.split(" ");
  const p = manifesto.panorama;
  return (
    <section className="vt-manif g">
      <div className="txt">
        <p className="rot">{manifesto.rotulo}</p>
        <div>
          {/* O texto inteiro fica no HTML; as palavras só acendem com a rolagem. */}
          <p className="frase" data-palavras>
            {palavras.map((w, i) => (
              <span key={i} className="w">
                {w}
                {i < palavras.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
          <p className="assin">
            <i aria-hidden="true" />
            {manifesto.assinatura}
          </p>
        </div>
      </div>
      <figure className="panorama" data-par>
        <img src={p.src} width={p.largura} height={p.altura} alt={p.alt} loading="lazy" />
        <blockquote>{manifesto.citacao}</blockquote>
        <figcaption>{manifesto.creditoPanorama}</figcaption>
      </figure>
    </section>
  );
}
