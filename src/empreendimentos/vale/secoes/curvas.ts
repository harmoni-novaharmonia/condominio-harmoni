// Curvas de nível geradas (anéis irregulares em volta de cada centro), em
// coordenadas de 1000x600. Determinístico: o mesmo desenho no servidor e no cliente.
export type Centro = [x: number, y: number, aneis: number, passo: number];

export function curvasNivel(centros: Centro[], semente: number): string[] {
  let s = semente;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  return centros.map(([cx, cy, n, passo]) => {
    const f = [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28];
    let d = "";
    for (let k = 1; k <= n; k++) {
      const r = k * passo;
      for (let a = 0; a <= 96; a++) {
        const ang = (a / 96) * Math.PI * 2;
        const w = 1 + 0.13 * Math.sin(3 * ang + f[0] + k * 0.32) + 0.07 * Math.sin(5 * ang + f[1] - k * 0.21) + 0.05 * Math.sin(2 * ang + f[2]);
        d += `${a ? "L" : "M"}${(cx + Math.cos(ang) * r * 1.35 * w).toFixed(1)} ${(cy + Math.sin(ang) * r * 0.78 * w).toFixed(1)}`;
      }
      d += "Z";
    }
    return d;
  });
}

/** Contorno da casa do logo (telhado a 28% da altura), em 100x125. */
export const CASA = "M50 1 L99 35 V124 H1 V35 Z";
