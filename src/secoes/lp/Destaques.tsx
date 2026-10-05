import { Ic } from "@/components/lp/Ic";
import type { SecaoDestaques } from "@/empreendimentos/tipos";

/** Faixa de quatro destaques com ícone logo abaixo da hero (Vinhedos). */
export function Destaques({ s }: { s: SecaoDestaques }) {
  return (
    <section className="destaques">
      <ul className="casca destaques-lista">
        {s.itens.map((it) => (
          <li key={it.titulo}>
            <Ic nome={it.icone} tamanho={44} />
            <div>
              <p className="destaques-tit">{it.titulo}</p>
              {it.texto && <p className="destaques-sub">{it.texto}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
