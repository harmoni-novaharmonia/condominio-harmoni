import type { HortensiasFrase } from "../tipos";

// A frase da copy sobre a foto em parallax; as palavras sobem e perdem o
// desfoque quando a seção entra na tela (CSS, sem script).
export function Frase({ s }: { s: HortensiasFrase }) {
  const palavras = (texto: string | undefined) =>
    (texto ?? "")
      .split(" ")
      .filter(Boolean)
      .map((p, k) => (
        <span key={k}>
          {p}{" "}
        </span>
      ));
  return (
    <section className="hs hs-frase fundo-noite">
      <img className="hs-fr-foto" src={s.imagem.src} width={s.imagem.largura} height={s.imagem.altura} alt={s.imagem.alt} loading="lazy" decoding="async" />
      <div className="casca">
        <p className="d hs-fr-txt">
          {palavras(s.frase.antes)}
          <em>{palavras(s.frase.destaque)}</em>
        </p>
      </div>
    </section>
  );
}
