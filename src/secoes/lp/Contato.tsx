import { FormLead } from "@/components/lp/FormLead";
import { Ic } from "@/components/lp/Ic";
import { Img } from "@/components/lp/Img";
import { Sobretitulo, Titulo } from "@/components/lp/Titulo";
import { textosHeader } from "@/empreendimentos/comum";
import type { LP, SecaoContato } from "@/empreendimentos/tipos";

function Telefones({ lp }: { lp: LP }) {
  return (
    <ul className="contato-tels">
      {lp.contato.telefones.map((t) => (
        <li key={t}>
          <a href={`tel:+55${t.replace(/\D/g, "")}`}>
            <span className="contato-bola">
              <Ic nome="telefone" tamanho={20} />
            </span>
            {t}
          </a>
        </li>
      ))}
      <li>
        <a href={`https://wa.me/${lp.contato.whatsapp}`} target="_blank" rel="noopener noreferrer">
          <span className="contato-bola">
            <Ic nome="whatsapp" tamanho={20} />
          </span>
          {textosHeader.whatsapp}
        </a>
      </li>
    </ul>
  );
}

export function Contato({ s, lp }: { s: SecaoContato; lp: LP }) {
  const tom = s.variante === "foto" || s.variante === "escuro" ? "acento" : "escuro";
  const form = <FormLead lp={lp} formulario={s.formulario} cartao tom={tom} />;

  if (s.variante === "centro") {
    // Logo grande e cartão centralizados (Jardins, Vale).
    const escuro = s.fundo === "noite";
    return (
      <section id="contato" className={`secao contato contato-centro fundo-${s.fundo ?? "branco"}`}>
        <div className="estreito centro">
          <img className="contato-logo" src={escuro ? lp.logo.escuro.src : lp.logo.claro.src} width={lp.logo.claro.largura} height={lp.logo.claro.altura} alt={lp.nome} loading="lazy" />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <div className="contato-form-centro">{form}</div>
          <Telefones lp={lp} />
        </div>
      </section>
    );
  }

  if (s.variante === "creme") {
    return (
      <section id="contato" className="secao contato contato-lado fundo-areia">
        <div className="casca contato-grade">
          <div>
            <img className="contato-logo" src={lp.logo.claro.src} width={lp.logo.claro.largura} height={lp.logo.claro.altura} alt={lp.nome} loading="lazy" />
            <Titulo texto={s.titulo} className="d titulo-secao" />
            <Telefones lp={lp} />
          </div>
          {form}
        </div>
      </section>
    );
  }

  // foto (Vinhedos) ou escuro (Arbore): texto à esquerda, cartão à direita.
  return (
    <section id="contato" className={`secao contato contato-lado ${s.variante === "foto" ? "contato-foto" : "fundo-escuro"}`}>
      {s.variante === "foto" && s.imagem && (
        <div className="contato-fundo">
          <Img imagem={s.imagem} sizes="100vw" />
        </div>
      )}
      <div className="casca contato-grade">
        <div>
          <Sobretitulo texto={s.sobretitulo} />
          <Titulo texto={s.titulo} className="d titulo-secao" />
          <Telefones lp={lp} />
        </div>
        {form}
      </div>
    </section>
  );
}
