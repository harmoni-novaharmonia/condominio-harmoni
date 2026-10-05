"use client";

import { useState, type FormEvent } from "react";
import { textosFormulario as t } from "@/empreendimentos/comum";
import type { Formulario, LP } from "@/empreendimentos/tipos";
import { Ic } from "./Ic";

type Estado = "livre" | "enviando" | "ok" | "falha" | "incompleto";

type Props = {
  lp: LP;
  formulario: Formulario;
  /** Cartão branco com sombra (hero e contato) ou só os campos (dentro de um painel). */
  cartao?: boolean;
  /** Cor do botão: petróleo, acento do tema ou noite (Vale). */
  tom?: "escuro" | "acento" | "noite";
  className?: string;
};

// Só mostra sucesso quando o endpoint responde 2xx. Sem endpoint (ou com erro),
// assume a falha e oferece o WhatsApp com a mensagem pronta: perder o lead em
// silêncio é pior do que mandar a pessoa direto para o consultor.
export function FormLead({ lp, formulario, cartao, tom = "escuro", className }: Props) {
  const [estado, setEstado] = useState<Estado>("livre");
  const [nome, setNome] = useState("");

  const linkWhatsapp = `https://wa.me/${lp.contato.whatsapp}?text=${encodeURIComponent(t.mensagemWhatsapp(lp.nome, nome))}`;

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
    if (!lp.contato.endpoint) {
      setEstado("falha");
      return;
    }
    setEstado("enviando");
    try {
      const r = await fetch(lp.contato.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, empreendimento: lp.slug, origem: location.href }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setEstado("ok");
      form.reset();
    } catch {
      setEstado("falha");
    }
  }

  return (
    <form className={`form ${cartao ? "form-cartao" : ""} ${className ?? ""}`} noValidate onSubmit={enviar}>
      {formulario.titulo && <p className="form-titulo">{formulario.titulo}</p>}
      <label className="campo">
        <span>{t.campos.nome.rotulo}</span>
        <input name="nome" type="text" autoComplete="name" required minLength={3} placeholder={formulario.placeholders?.nome ?? t.campos.nome.placeholder} />
      </label>
      <div className="form-par">
        <label className="campo">
          <span>{t.campos.telefone.rotulo}</span>
          <input name="telefone" type="tel" autoComplete="tel" inputMode="tel" required minLength={10} placeholder={formulario.placeholders?.telefone ?? t.campos.telefone.placeholder} />
        </label>
        <label className="campo">
          <span>{t.campos.email.rotulo}</span>
          <input name="email" type="email" autoComplete="email" required placeholder={formulario.placeholders?.email ?? t.campos.email.placeholder} />
        </label>
      </div>
      <label className="aceite">
        <input type="checkbox" name="aceite" required />
        <span>{t.aceite}</span>
      </label>
      <button className={`bt bt-${tom} bt-cheio`} type="submit" disabled={estado === "enviando"}>
        {estado === "enviando" ? t.enviando : formulario.botao}
      </button>

      <div className="form-retorno" role="status" aria-live="polite">
        {estado === "incompleto" && <p className="aviso">{t.erroCampos}</p>}
        {estado === "ok" && <p className="sucesso">{t.sucesso}</p>}
        {estado === "falha" && (
          <div className="falha">
            <p>{t.falha}</p>
            <a className="bt bt-whatsapp" href={linkWhatsapp} target="_blank" rel="noopener noreferrer">
              <Ic nome="whatsapp" tamanho={18} className="ic-claro" />
              {t.falhaCta}
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
