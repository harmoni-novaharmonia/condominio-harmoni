import { FormEtapas } from "@/components/lp/FormEtapas";
import { Img } from "@/components/lp/Img";
import { Titulo } from "@/components/lp/Titulo";
import { textosGerais } from "@/empreendimentos/comum";
import type { LP } from "@/empreendimentos/tipos";
import type { HortensiasMosaico } from "../tipos";

const COLUNAS = 10;
const LINHAS = 5;

// Hero do Hortênsias: a foto em largura total, coberta por uma grade de lotes.
// Cada lote mostra um ambiente; a cada 12 s uma onda diagonal faz todos sumirem
// e a família aparece inteira (anda sozinho, para o celular). Com o mouse, o
// lote sob o cursor some na hora e volta devagar. O cadastro fica num cartão.
export function Mosaico({ s, lp }: { s: HortensiasMosaico; lp: LP }) {
  const lotes = Array.from({ length: COLUNAS * LINHAS }, (_, k) => {
    const col = k % COLUNAS;
    const lin = Math.floor(k / COLUNAS);
    // Vizinhos não repetem ambiente: o passo 3 por coluna e 2 por linha embaralha a sequência.
    const amb = s.ambientes[(col * 3 + lin * 2) % s.ambientes.length];
    return { k, amb, d: 0.6 + (col + lin) * 0.1 };
  });
  const provisoria = s.ambientes.some((a) => a.provisoria);

  return (
    <section id="inicio" className="hero hs hs-mosaico">
      <figure className="hs-ms-foto">
        <Img imagem={s.imagem} prioridade sizes="100vw" />
      </figure>
      <div className="hs-ms-grade" aria-hidden="true">
        {lotes.map((l) => (
          <span key={l.k} style={{ ["--d" as string]: `${l.d.toFixed(2)}s`, ["--i" as string]: `url(${l.amb.src})` }} />
        ))}
      </div>
      <div className="hs-ms-cartao">
        <p className="sobretitulo anim-1">{s.etiqueta}</p>
        <Titulo texto={s.titulo} como="h1" className="d anim-2" />
        <p className="txt anim-2">{s.texto}</p>
        <div className="anim-3">
          <FormEtapas lp={lp} formulario={s.formulario} />
        </div>
      </div>
      <p className="hs-ms-dica">{s.dica}</p>
      {provisoria && <span className="selo hs-ms-selo">{textosGerais.imagemProvisoria}</span>}
    </section>
  );
}
