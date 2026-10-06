"use client";

import { useState, type FormEvent } from "react";
import { SetaDireita, Whatsapp } from "@/components/Icones";
import { TituloSecao } from "@/components/TituloSecao";
import { useVitrine } from "@/components/VitrineContexto";
import { cidades, pendente, porCidade } from "@/dados/empreendimentos";
import { ancoras, contato as t } from "@/dados/vitrine";
import { lpPorSlug } from "@/empreendimentos";

type Estado = "livre" | "enviando" | "ok" | "falha" | "incompleto";

// Mesma regra das LPs: sucesso só com resposta 2xx do endpoint. Sem endpoint
// (ou com erro) assume a falha e oferece o WhatsApp do Harmoni escolhido.
export function Contato() {
  const { interesse, setInteresse } = useVitrine();
  const [estado, setEstado] = useState<Estado>("livre");
  const [nome, setNome] = useState("");

  const lp = interesse ? lpPorSlug(interesse) : undefined;
  const whatsapp = lp?.contato.whatsapp ?? t.whatsappPadrao;
  const linkWhatsapp = `https://wa.me/${whatsapp}?text=${encodeURIComponent(t.mensagemWhatsapp(lp?.nome ?? t.linha, nome))}`;

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setEstado("incompleto");
      form.reportValidity();
      return;
    }
    const dados = Object.fromEntries(new FormData(form));
    setNome(String(dados.nome ?? "").split(" ")[0]);
    if (!t.endpoint) {
      setEstado("falha");
      return;
    }
    setEstado("enviando");
    try {
      const r = await fetch(t.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, origem: location.href }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setEstado("ok");
      form.reset();
      setInteresse("");
    } catch {
      setEstado("falha");
    }
  }

  const f = t.foto;
  return (
    <section className="vt-contato" id={ancoras.contato}>
      <div className="in">
        <figure>
          <img src={f.src} width={f.largura} height={f.altura} alt={f.alt} loading="lazy" />
          <blockquote>{t.chamadaFoto}</blockquote>
        </figure>
        <div className="lado">
          <p className="rot">{t.rotulo}</p>
          <TituloSecao titulo={t.titulo} tamanho="m" />
          <p className="lead">{t.texto}</p>

          <form className="vt-form" noValidate onSubmit={enviar}>
            <label className="campo">
              <input name="nome" autoComplete="name" required minLength={3} placeholder=" " />
              <span>{t.campos.nome}</span>
            </label>
            <div className="dupla">
              <label className="campo">
                <input name="telefone" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} placeholder=" " />
                <span>{t.campos.telefone}</span>
              </label>
              <label className="campo">
                <input name="email" type="email" autoComplete="email" required placeholder=" " />
                <span>{t.campos.email}</span>
              </label>
            </div>
            <label className="campo sel">
              <select name="empreendimento" value={interesse} onChange={(e) => setInteresse(e.target.value)}>
                <option value="">{t.selectVazio}</option>
                {cidades.map((c) => (
                  <optgroup key={c} label={c}>
                    {porCidade(c).map((h) => (
                      <option key={h.slug} value={h.slug}>
                        {h.nome}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <span>{t.campos.empreendimento}</span>
            </label>
            <label className="aceite">
              <input type="checkbox" name="aceite" required />
              <span>{t.aceite}</span>
            </label>
            <button className="btn btn-p" type="submit" disabled={estado === "enviando"}>
              {estado === "enviando" ? t.enviando : t.enviar} <SetaDireita tamanho={16} espessura={1.4} />
            </button>

            <div className="retorno" role="status" aria-live="polite">
              {estado === "incompleto" && <p className="msg erro">{t.erro}</p>}
              {estado === "ok" && <p className="msg ok">{t.sucesso}</p>}
              {estado === "falha" && (
                <div className="msg aviso">
                  <p>{t.falha}</p>
                  <a className="btn btn-wpp" href={linkWhatsapp} target="_blank" rel="noopener noreferrer">
                    <Whatsapp tamanho={18} /> {t.falhaCta}
                  </a>
                </div>
              )}
            </div>
          </form>

          <div className="canais">
            {t.canais.map((c) => (
              <span key={c.rotulo}>
                <small>{c.rotulo}</small>
                {pendente(c.valor) ? <em className="ph">{c.valor}</em> : c.valor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
