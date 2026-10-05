import { Carrossel } from "@/components/lp/Carrossel";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import type { SecaoPerspectivas } from "@/empreendimentos/tipos";

export function Perspectivas({ s }: { s: SecaoPerspectivas }) {
  const escuro = s.fundo === "escuro" || s.fundo === "noite";
  return (
    <section id="perspectivas" className={`secao perspectivas fundo-${s.fundo ?? "branco"}`}>
      <div className="casca centro">
        <Sobretitulo texto={s.sobretitulo} />
        <Titulo texto={s.titulo} className="d titulo-secao" />
      </div>
      <div className="perspectivas-corpo">
        <Carrossel itens={s.itens} variante={s.carrossel} escuro={escuro} />
      </div>
    </section>
  );
}
