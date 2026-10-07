import type { LP } from "../../tipos";
import type { SecaoHortensias } from "../tipos";
import { Cachos } from "./Cachos";
import { Cartoes } from "./Cartoes";
import { Contato } from "./Contato";
import { Duvidas } from "./Duvidas";
import { Frase } from "./Frase";
import { Itens } from "./Itens";
import { Lotes } from "./Lotes";
import { Mosaico } from "./Mosaico";
import { Provas } from "./Provas";
import { Rotas } from "./Rotas";
import { Stand } from "./Stand";
import { Tiras } from "./Tiras";

/** Seções exclusivas do Hortênsias; a ordem vem do dados.ts. */
export function BlocoHortensias({ s, lp }: { s: SecaoHortensias; lp: LP }) {
  switch (s.secao) {
    case "mosaico":
      return <Mosaico s={s} lp={lp} />;
    case "tiras":
      return <Tiras s={s} />;
    case "cachos":
      return <Cachos s={s} />;
    case "cartoes":
      return <Cartoes s={s} />;
    case "provas":
      return <Provas s={s} />;
    case "itens":
      return <Itens s={s} />;
    case "lotes":
      return <Lotes s={s} />;
    case "frase":
      return <Frase s={s} />;
    case "rotas":
      return <Rotas s={s} />;
    case "stand":
      return <Stand s={s} />;
    case "duvidas":
      return <Duvidas s={s} />;
    case "contato":
      return <Contato s={s} lp={lp} />;
  }
}
