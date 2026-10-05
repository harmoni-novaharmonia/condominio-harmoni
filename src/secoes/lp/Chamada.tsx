import { Img } from "@/components/lp/Img";
import { Titulo } from "@/components/lp/Titulo";
import type { SecaoChamada } from "@/empreendimentos/tipos";

export function Chamada({ s }: { s: SecaoChamada }) {
  if (s.variante === "foto" && s.imagem) {
    // Foto escurecida e chamada central (Vale, Essenza).
    return (
      <section className="chamada chamada-foto">
        <div className="chamada-fundo">
          <Img imagem={s.imagem} sizes="100vw" />
        </div>
        <div className="estreito centro">
          <Titulo texto={s.titulo} className="d titulo-frase" />
          {s.texto && <p className="chamada-texto">{s.texto}</p>}
          <a className="bt bt-acento bt-cheio" href={`#${s.cta.alvo}`}>
            {s.cta.rotulo}
          </a>
        </div>
      </section>
    );
  }
  // faixa (Jardins, cor de acento) ou linha (Arbore, branco com filete).
  return (
    <section className={`chamada chamada-${s.variante}`}>
      <div className="casca chamada-linha-corpo">
        <Titulo texto={s.titulo} className="d chamada-titulo" />
        <a className={`bt ${s.variante === "faixa" ? "bt-noite" : "bt-escuro"} bt-cheio`} href={`#${s.cta.alvo}`}>
          {s.cta.rotulo}
        </a>
      </div>
    </section>
  );
}
