import { FormEtapas } from "@/components/lp/FormEtapas";
import { Fones } from "@/components/lp/Fones";
import { Ic } from "@/components/lp/Ic";
import { Img } from "@/components/lp/Img";
import { Titulo } from "@/components/lp/Titulo";
import { textosFormulario, textosInteracao } from "@/empreendimentos/comum";
import type { LP } from "@/empreendimentos/tipos";
import type { ValeContato } from "../tipos";
import { ContornoCasa } from "./ContornoCasa";

// A janela em forma de casa do hero fecha a página.
export function Contato({ s, lp }: { s: ValeContato; lp: LP }) {
  const zap = `https://wa.me/${lp.contato.whatsapp}?text=${encodeURIComponent(textosFormulario.mensagemWhatsapp(lp.nome, ""))}`;
  return (
    <section id="contato" className="secao vl vl-contato fundo-creme">
      <div className="casca vl-ct-grade">
        <div className="vl-ct-janela">
          <ContornoCasa />
          <figure className="vl-ct-foto foto">
            <Img imagem={s.imagem} sizes="(min-width: 900px) 42vw, 100vw" />
          </figure>
        </div>
        <div className="vl-ct-corpo">
          <img className="vl-ct-logo" src={lp.logo.claro.src} width={lp.logo.claro.largura} height={lp.logo.claro.altura} alt={lp.nome} loading="lazy" />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <div className="vl-ct-cartao">
            <FormEtapas lp={lp} formulario={s.formulario} />
          </div>
          <Fones telefones={lp.contato.telefones} />
          <a className="bt bt-whatsapp" href={zap} target="_blank" rel="noopener noreferrer">
            <Ic nome="whatsapp" tamanho={18} className="ic-claro" />
            {textosInteracao.chamarWhatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
