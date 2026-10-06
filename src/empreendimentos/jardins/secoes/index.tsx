import type { LP } from "../../tipos";
import type { SecaoJardins } from "../tipos";
import { Afasta } from "./Afasta";
import { Canteiros } from "./Canteiros";
import { Colunas } from "./Colunas";
import { Contato } from "./Contato";
import { Folha } from "./Folha";
import { Linho } from "./Linho";
import { Lupa } from "./Lupa";
import { Niveis } from "./Niveis";
import { Sementes } from "./Sementes";

/** Seções exclusivas do Jardins; a ordem vem do dados.ts. */
export function BlocoJardins({ s, lp }: { s: SecaoJardins; lp: LP }) {
  switch (s.secao) {
    case "folha":
      return <Folha s={s} lp={lp} />;
    case "linho":
      return <Linho s={s} />;
    case "afasta":
      return <Afasta s={s} lp={lp} />;
    case "sementes":
      return <Sementes s={s} />;
    case "lupa":
      return <Lupa s={s} />;
    case "canteiros":
      return <Canteiros s={s} />;
    case "niveis":
      return <Niveis s={s} />;
    case "colunas":
      return <Colunas s={s} />;
    case "contato":
      return <Contato s={s} lp={lp} />;
  }
}
