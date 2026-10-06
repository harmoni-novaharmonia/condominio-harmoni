import { Cabecalho } from "@/components/lp/Cabecalho";
import { CorteRua } from "@/components/lp/CorteRua";
import { textosInteracao } from "@/empreendimentos/comum";
import type { ValeCorte } from "../tipos";

export function Corte({ s }: { s: ValeCorte }) {
  return (
    <section className="secao vl vl-obra fundo-branco">
      <div className="casca">
        <Cabecalho sobretitulo={s.sobretitulo} titulo={s.titulo} direita={<p className="dica">{textosInteracao.dicaCorte}</p>} />
        <CorteRua imagem={s.imagem} itens={s.itens} forma="painel" />
      </div>
    </section>
  );
}
