import type { Titulo } from "@/dados/vitrine";

export function TituloSecao({ titulo }: { titulo: Titulo }) {
  return (
    <h2 className="t-secao">
      {titulo.inicio}
      <strong>{titulo.destaque}</strong>
    </h2>
  );
}
