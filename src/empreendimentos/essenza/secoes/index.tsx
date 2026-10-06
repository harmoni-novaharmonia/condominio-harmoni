import type { LP } from "../../tipos";
import type { SecaoEssenza } from "../tipos";
import { Abertura } from "./Abertura";
import { Ampla } from "./Ampla";
import { Contato } from "./Contato";
import { Corte } from "./Corte";
import { Metade } from "./Metade";
import { Roteiro } from "./Roteiro";
import { Sanfona } from "./Sanfona";
import { Setores } from "./Setores";
import { Trajeto } from "./Trajeto";

/** Seções exclusivas do Essenza; a ordem vem do dados.ts. */
export function BlocoEssenza({ s, lp }: { s: SecaoEssenza; lp: LP }) {
  switch (s.secao) {
    case "metade":
      return <Metade s={s} />;
    case "trajeto":
      return <Trajeto s={s} />;
    case "sanfona":
      return <Sanfona s={s} />;
    case "abertura":
      return <Abertura s={s} />;
    case "ampla":
      return <Ampla s={s} />;
    case "roteiro":
      return <Roteiro s={s} />;
    case "corte":
      return <Corte s={s} />;
    case "setores":
      return <Setores s={s} />;
    case "contato":
      return <Contato s={s} lp={lp} />;
  }
}
