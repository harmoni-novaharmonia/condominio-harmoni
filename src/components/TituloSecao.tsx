import type { Titulo } from "@/dados/vitrine";

type Props = {
  titulo: Titulo;
  /** Tamanho: l (títulos de seção) ou m (seções de apoio). */
  tamanho?: "l" | "m";
  nivel?: "h1" | "h2";
  className?: string;
};

export function TituloSecao({ titulo, tamanho = "l", nivel = "h2", className }: Props) {
  const Tag = nivel;
  return (
    <Tag className={`t-${tamanho}${className ? ` ${className}` : ""}`}>
      {titulo.inicio}
      <strong>{titulo.destaque}</strong>
    </Tag>
  );
}
