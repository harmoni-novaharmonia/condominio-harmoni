import { fatos } from "@/dados/vitrine";

export function Fatos() {
  return (
    <section className="vt-fatos g" aria-label={fatos.rotulo}>
      <ul>
        {fatos.itens.map((f) => (
          <li key={f.texto}>
            <b data-conta={f.numero}>{f.numero}</b>
            <span>{f.texto}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
