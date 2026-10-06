import { Cabecalho } from "@/components/lp/Cabecalho";
import { CorteRua } from "@/components/lp/CorteRua";
import { textosInteracao } from "@/empreendimentos/comum";
import type { EssenzaCorte } from "../tipos";

export function Corte({ s }: { s: EssenzaCorte }) {
  return (
    <section className="secao ez ez-corte fundo-escuro">
      <div className="casca">
        <Cabecalho sobretitulo={s.sobretitulo} titulo={s.titulo} direita={<p className="dica">{textosInteracao.dicaCorte}</p>} />
        <CorteRua imagem={s.imagem} itens={s.itens} forma="lado" />
      </div>
    </section>
  );
}
