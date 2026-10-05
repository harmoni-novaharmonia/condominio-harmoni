"use client";

import { useRef, useState, type PointerEvent } from "react";
import { textosGerais, textosInteracao } from "@/empreendimentos/comum";
import type { Imagem } from "@/empreendimentos/tipos";

// Planta da implantação com zoom (+, −, duplo clique) e arraste dentro dos limites.
export function PlantaZoom({ planta }: { planta: Imagem }) {
  const caixa = useRef<HTMLDivElement>(null);
  const [v, setV] = useState({ z: 1, x: 0, y: 0 });
  const [arrastando, setArrastando] = useState(false);
  const inicio = useRef<{ px: number; py: number; x: number; y: number; id: number } | null>(null);

  const limita = (z: number, x: number, y: number) => {
    const W = caixa.current?.clientWidth ?? 0;
    const H = caixa.current?.clientHeight ?? 0;
    return { z, x: Math.min(0, Math.max(W - W * z, x)), y: Math.min(0, Math.max(H - H * z, y)) };
  };
  const zoomEm = (nz: number, cx?: number, cy?: number) => {
    const W = caixa.current?.clientWidth ?? 0;
    const H = caixa.current?.clientHeight ?? 0;
    setV((a) => {
      const z = Math.min(4, Math.max(1, nz));
      const px = cx ?? W / 2;
      const py = cy ?? H / 2;
      const ux = (px - a.x) / a.z;
      const uy = (py - a.y) / a.z;
      return limita(z, px - ux * z, py - uy * z);
    });
  };

  const desce = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest("button")) return;
    inicio.current = { px: e.clientX, py: e.clientY, x: v.x, y: v.y, id: e.pointerId };
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const i = inicio.current;
    if (!i) return;
    const dx = e.clientX - i.px;
    const dy = e.clientY - i.py;
    if (!arrastando && Math.hypot(dx, dy) < 6) return;
    if (!arrastando) {
      setArrastando(true);
      caixa.current?.setPointerCapture(i.id);
    }
    setV((a) => limita(a.z, i.x + dx, i.y + dy));
  };
  const solta = () => {
    inicio.current = null;
    setArrastando(false);
  };

  return (
    <div
      ref={caixa}
      className={`planta-zoom ${arrastando ? "arrastando" : ""}`}
      style={{ touchAction: v.z > 1 ? "none" : "pan-y" }}
      onPointerDown={desce}
      onPointerMove={move}
      onPointerUp={solta}
      onPointerCancel={solta}
      onDoubleClick={(e) => {
        const r = caixa.current!.getBoundingClientRect();
        zoomEm(v.z * 1.6, e.clientX - r.left, e.clientY - r.top);
      }}
    >
      <div className="pz-mov" style={{ transform: `translate(${v.x}px, ${v.y}px) scale(${v.z})` }}>
        <img src={planta.src} width={planta.largura} height={planta.altura} alt={planta.alt} draggable={false} loading="lazy" decoding="async" />
      </div>
      {planta.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
      <div className="pz-ctrl">
        <button type="button" onClick={() => zoomEm(v.z * 1.5)} aria-label={textosGerais.aproximar}>
          +
        </button>
        <button type="button" onClick={() => zoomEm(v.z / 1.5)} aria-label={textosGerais.afastar}>
          −
        </button>
        <button type="button" onClick={() => setV({ z: 1, x: 0, y: 0 })} aria-label={textosInteracao.plantaInteira}>
          ⟲
        </button>
      </div>
      <span className="pz-dica">{textosInteracao.dicaPlanta}</span>
    </div>
  );
}
