"use client";

import { useEffect, useRef, useState } from "react";
import { camadasCorte } from "@/empreendimentos/comum";
import type { Imagem, Item } from "@/empreendimentos/tipos";
import { Ic } from "./Ic";
import { IcTinta } from "./IcTinta";

type Props = {
  imagem: Imagem;
  itens: Item[];
  /** lado: lista ao lado, na altura da imagem (Essenza) · painel: lista num cartão sobre o céu (Vale). */
  forma: "lado" | "painel";
};

// Corte da rua clicável: cada item da lista acende a camada na imagem. Enquanto
// a pessoa não mexe, as camadas acendem uma a uma; ao tocar, para no que escolheu.
export function CorteRua({ imagem, itens, forma }: Props) {
  const camadas = itens.flatMap((it) => {
    const pos = camadasCorte[it.icone];
    return pos ? [{ ...it, pos }] : [];
  });
  const [ativa, setAtiva] = useState(0);
  const auto = useRef(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visivel = false;
    const io = new IntersectionObserver((e) => (visivel = e.some((x) => x.isIntersecting)), { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    const id = window.setInterval(() => {
      if (auto.current && visivel) setAtiva((a) => (a % camadas.length) + 1);
    }, 2400);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [camadas.length]);

  const escolhe = (n: number) => {
    auto.current = false;
    setAtiva(n);
  };
  const atual = camadas[ativa - 1];

  return (
    <div className={`corte-rua corte-rua-${forma}`}>
      <div ref={ref} className={`cr-imagem ${ativa ? "foco" : ""}`}>
        <img src={imagem.src} width={imagem.largura} height={imagem.altura} alt={imagem.alt} loading="lazy" decoding="async" />
        {camadas.map((c, k) => (
          <button
            key={c.titulo}
            type="button"
            className={`cr-camada ${ativa === k + 1 ? "on" : ""}`}
            style={{ left: `${c.pos.x}%`, top: `${c.pos.y}%` }}
            aria-label={c.titulo}
            onMouseEnter={() => escolhe(k + 1)}
            onClick={() => escolhe(k + 1)}
          >
            {k + 1}
          </button>
        ))}
        {atual && (
          <span className="cr-bal" style={{ left: `${atual.pos.x}%`, top: `${atual.pos.y}%` }}>
            {atual.titulo}
          </span>
        )}
      </div>
      <ol className="cr-lista">
        {camadas.map((c, k) => (
          <li key={c.titulo}>
            <button type="button" aria-current={ativa === k + 1} onMouseEnter={() => escolhe(k + 1)} onClick={() => escolhe(k + 1)}>
              <b>{k + 1}</b>
              {forma === "painel" ? <Ic nome={c.icone} tamanho={24} className="ic-claro" /> : <IcTinta nome={c.icone} />}
              <span>{c.titulo}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
