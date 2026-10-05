import type { LP } from "../../tipos";
import type { SecaoVale } from "../tipos";
import { Arraste } from "./Arraste";
import { Brasil } from "./Brasil";
import { Casa } from "./Casa";
import { Constelacao } from "./Constelacao";
import { Contato } from "./Contato";
import { Corte } from "./Corte";
import { Declaracao } from "./Declaracao";
import { Moldura } from "./Moldura";
import { Revela } from "./Revela";

/** Seções exclusivas do Vale; a ordem vem do dados.ts. */
export function BlocoVale({ s, lp }: { s: SecaoVale; lp: LP }) {
  switch (s.secao) {
    case "casa":
      return <Casa s={s} lp={lp} />;
    case "declaracao":
      return <Declaracao s={s} />;
    case "constelacao":
      return <Constelacao s={s} lp={lp} />;
    case "arraste":
      return <Arraste s={s} />;
    case "moldura":
      return <Moldura s={s} />;
    case "revela":
      return <Revela s={s} />;
    case "corte":
      return <Corte s={s} />;
    case "brasil":
      return <Brasil />;
    case "contato":
      return <Contato s={s} lp={lp} />;
  }
}
