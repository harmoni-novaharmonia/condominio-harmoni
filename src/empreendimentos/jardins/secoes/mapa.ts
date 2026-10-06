// Mapa ilustrado de Cachoeirinha e Porto Alegre (fora de escala), em 1000x560 com
// sobra em volta para o celular, onde o quadro é mais alto. O sorteio tem semente
// fixa: o servidor e o navegador desenham o mesmo mapa.

export const LARGURA = 1000;
export const ALTURA = 560;

const rio = (x: number) => 372 + 26 * Math.sin(x / 170 + 0.6) + 10 * Math.sin(x / 63);
const avenida = (x: number) => 600 - 0.52 * (x + 60) + 30 * Math.sin(x / 260);
const linha = (f: (x: number) => number, x0: number, x1: number) => {
  let d = "";
  for (let x = x0; x <= x1; x += 10) d += `${x === x0 ? "M" : "L"}${x} ${f(x).toFixed(1)}`;
  return d;
};

/** Quadras numa grade girada (como as ruas de verdade), mais densas perto das duas cidades. */
function quadras() {
  let semente = 3;
  const sorteio = () => (semente = (semente * 9301 + 49297) % 233280) / 233280;
  const cidades: [number, number, number][] = [[700, 150, 340], [80, 560, 380]];
  const giro = (GIRO * Math.PI) / 180;
  const cs = Math.cos(giro);
  const sn = Math.sin(giro);
  const q: string[] = [];
  for (let u = -420; u < 1420; u += 26) {
    for (let v = -560; v < 1120; v += 22) {
      const lu = u + (sorteio() - 0.5) * 4;
      const lv = v + (sorteio() - 0.5) * 4;
      const x = 500 + (lu - 500) * cs - (lv - 280) * sn;
      const y = 280 + (lu - 500) * sn + (lv - 280) * cs;
      if (x < -170 || x > 1170 || y < -260 || y > 820) continue;
      const densidade = Math.max(...cidades.map(([cx, cy, r]) => 1 - Math.hypot(x - cx, y - cy) / r));
      const sorte = sorteio();
      if (Math.abs(y + 6 - rio(x)) < 30 || Math.abs(y + 6 - avenida(x)) < 17 || sorte > 0.12 + densidade * 0.95) continue;
      q.push(`<rect x="${lu.toFixed(0)}" y="${lv.toFixed(0)}" width="${(16 + sorteio() * 6).toFixed(0)}" height="${(12 + sorteio() * 4).toFixed(0)}" rx="3"/>`);
    }
  }
  return q.join("");
}

export const GIRO = -16;

export const MAPA = {
  quadras: quadras(),
  rio: linha(rio, -160, 1160),
  avenida: linha(avenida, -160, 1160),
  ruas: [
    "M470 40 Q640 110 1060 30",
    "M560 -80 Q590 120 640 330",
    "M820 -80 Q780 150 860 340",
    "M400 210 Q700 270 1080 222",
    "M-60 470 Q140 440 360 520",
    "M220 410 Q190 540 250 760",
    "M-60 640 Q150 600 330 680",
    "M60 380 Q40 520 90 760",
  ],
  /** Pista do aeroporto, no ponto "Aeroporto Salgado Filho" do dados.ts. */
  aeroporto: { x: 170, y: 440, giro: -14 },
  rotulos: { rio: { texto: "Rio Gravataí", x: 770, y: 410 }, cidade: { texto: "CACHOEIRINHA", x: 862, y: 96 } },
  parques: [
    [905, 300, 74, 40],
    [380, 128, 62, 34],
    [128, 402, 52, 28],
    [560, 470, 80, 36],
  ],
};
