import type { LP } from "../../tipos";
import type { SecaoArbore } from "../tipos";
import { Anotado } from "./Anotado";
import { Barras } from "./Barras";
import { Contato } from "./Contato";
import { Fresta } from "./Fresta";
import { Galhos } from "./Galhos";
import { Gavetas } from "./Gavetas";
import { Lado } from "./Lado";
import { Mosaico } from "./Mosaico";
import { Persiana } from "./Persiana";
import { Ripas } from "./Ripas";

/** Seções exclusivas do Arbore; a ordem vem do dados.ts. */
export function BlocoArbore({ s, lp }: { s: SecaoArbore; lp: LP }) {
  switch (s.secao) {
    case "ripas":
      return <Ripas s={s} lp={lp} />;
    case "fresta":
      return <Fresta s={s} />;
    case "persiana":
      return <Persiana s={s} />;
    case "galhos":
      return <Galhos s={s} lp={lp} />;
    case "mosaico":
      return <Mosaico s={s} />;
    case "lado":
      return <Lado s={s} />;
    case "gavetas":
      return <Gavetas s={s} />;
    case "anotado":
      return <Anotado s={s} />;
    case "barras":
      return <Barras />;
    case "contato":
      return <Contato s={s} lp={lp} />;
  }
}
