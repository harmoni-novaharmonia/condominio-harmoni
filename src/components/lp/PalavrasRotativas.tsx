"use client";

import { useEffect, useState } from "react";

/** Troca a palavra a cada 2,6s. Leitor de tela recebe a lista inteira; com movimento reduzido fica na primeira. */
export function PalavrasRotativas({ palavras }: { palavras: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % palavras.length), 2600);
    return () => window.clearInterval(t);
  }, [palavras.length]);
  return (
    <span className="rotativas">
      <span className="sr">{palavras.join(", ")}</span>
      <span className="rotativas-palco" aria-hidden="true">
        {palavras.map((p, n) => (
          <span key={p} className="rotativas-palavra" data-ativa={n === i}>
            {p}
          </span>
        ))}
      </span>
    </span>
  );
}
