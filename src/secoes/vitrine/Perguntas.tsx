import { TituloSecao } from "@/components/TituloSecao";
import { ancoras, perguntas as t } from "@/dados/vitrine";

// <details> nativo: abre sem JS, funciona no teclado e o texto fica indexável.
export function Perguntas() {
  return (
    <section className="vt-faq g" id={ancoras.perguntas}>
      <div className="in">
        <div>
          <p className="rot">{t.rotulo}</p>
          <TituloSecao titulo={t.titulo} tamanho="m" />
        </div>
        <div>
          {t.itens.map((q, i) => (
            <details key={q.pergunta} open={i === 0}>
              <summary>
                {q.pergunta}
                <i aria-hidden="true" />
              </summary>
              <p>
                {q.resposta}
                {q.pendencia && (
                  <>
                    {" "}
                    <em className="ph">{q.pendencia}</em>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
