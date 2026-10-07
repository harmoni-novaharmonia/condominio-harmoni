"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { textosEtapas as e, textosFormulario as t } from "@/empreendimentos/comum";
import type { Formulario, LP } from "@/empreendimentos/tipos";
import { Ic } from "./Ic";

type Props = {
  lp: LP;
  formulario: Formulario;
  /** Cor do botão "Continuar": petróleo ou acento do tema (fundo escuro). */
  tom?: "escuro" | "acento";
  className?: string;
  /** Campos que vão junto com o cadastro (o lote escolhido no Hortênsias). */
  extra?: Record<string, string>;
};

/** (51) 99719-6426 enquanto digita; aceita 10 ou 11 dígitos. */
function mascara(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length > 10) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return d;
}

// Cadastro em duas etapas: nome e telefone primeiro (o mínimo para o consultor
// ligar), email e aceite depois. Como o FormLead, só mostra sucesso quando o
// endpoint responde 2xx; sem endpoint, oferece o WhatsApp com a mensagem pronta.
export function FormEtapas({ lp, formulario, tom = "escuro", className, extra }: Props) {
  const id = useId();
  const [etapa, setEtapa] = useState<1 | 2>(1);
  const [estado, setEstado] = useState<"livre" | "enviando" | "ok" | "falha">("livre");
  const [erro, setErro] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [invalido, setInvalido] = useState<Record<string, boolean>>({});
  const refEmail = useRef<HTMLInputElement>(null);
  const refNome = useRef<HTMLInputElement>(null);

  const primeiroNome = nome.trim().split(" ")[0] ?? "";
  const linkWhatsapp = `https://wa.me/${lp.contato.whatsapp}?text=${encodeURIComponent(t.mensagemWhatsapp(lp.nome, primeiroNome) + (extra?.lote ? t.interesseLote(extra.lote) : ""))}`;

  function avancar() {
    const okNome = nome.trim().length >= 3;
    const okTel = telefone.replace(/\D/g, "").length >= 10;
    setInvalido({ nome: !okNome, telefone: !okTel });
    if (!okNome || !okTel) return setErro(!okNome ? e.erroNome : e.erroTelefone);
    setErro("");
    setEtapa(2);
    requestAnimationFrame(() => refEmail.current?.focus({ preventScroll: true }));
  }

  function voltar() {
    setErro("");
    setEtapa(1);
    requestAnimationFrame(() => refNome.current?.focus({ preventScroll: true }));
  }

  async function enviar(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (etapa === 1) return avancar();
    const form = ev.currentTarget;
    const dados = Object.fromEntries(new FormData(form));
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(dados.email ?? "").trim());
    setInvalido({ email: !okEmail });
    if (!okEmail) return setErro(e.erroEmail);
    if (!dados.aceite) return setErro(e.erroAceite);
    setErro("");
    if (!lp.contato.endpoint) return setEstado("falha");
    setEstado("enviando");
    try {
      const r = await fetch(lp.contato.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...extra, ...dados, nome, telefone, empreendimento: lp.slug, origem: location.href }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setEstado("ok");
    } catch {
      setEstado("falha");
    }
  }

  const terminou = estado === "ok" || estado === "falha";

  return (
    <form className={`form-etapas ${className ?? ""}`} noValidate onSubmit={enviar}>
      {formulario.titulo && <p className="fe-titulo">{formulario.titulo}</p>}
      {!terminou && (
        <div className="fe-passos">
          <span>{e.etapa(etapa, 2)}</span>
          <i style={{ ["--pf" as string]: etapa === 1 ? "50%" : "100%" }} />
        </div>
      )}

      <div className="fe-etapa" data-etapa="1" hidden={etapa !== 1 || terminou}>
        <div className="fe-campo">
          <label htmlFor={`${id}-nome`}>{e.campos.nome.rotulo}</label>
          <input
            ref={refNome}
            id={`${id}-nome`}
            name="nome"
            autoComplete="name"
            placeholder={e.campos.nome.placeholder}
            value={nome}
            aria-invalid={invalido.nome || undefined}
            onChange={(x) => setNome(x.target.value)}
          />
        </div>
        <div className="fe-campo">
          <label htmlFor={`${id}-tel`}>{e.campos.telefone.rotulo}</label>
          <input
            id={`${id}-tel`}
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={e.campos.telefone.placeholder}
            value={telefone}
            aria-invalid={invalido.telefone || undefined}
            onChange={(x) => setTelefone(mascara(x.target.value))}
          />
        </div>
        <p className="fe-erro" aria-live="polite">
          {etapa === 1 ? erro : ""}
        </p>
        <button type="button" className={`bt bt-${tom}`} onClick={avancar}>
          {e.continuar}
        </button>
      </div>

      <div className="fe-etapa" data-etapa="2" hidden={etapa !== 2 || terminou}>
        <div className="fe-campo">
          <label htmlFor={`${id}-email`}>{e.campos.email.rotulo}</label>
          <input
            ref={refEmail}
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={e.campos.email.placeholder}
            aria-invalid={invalido.email || undefined}
          />
        </div>
        <label className="fe-aceite" htmlFor={`${id}-aceite`}>
          <input type="checkbox" id={`${id}-aceite`} name="aceite" />
          <span>{t.aceite}</span>
        </label>
        <p className="fe-erro" aria-live="polite">
          {etapa === 2 ? erro : ""}
        </p>
        <div className="fe-linha">
          <button type="button" className="fe-voltar" onClick={voltar}>
            {e.voltar}
          </button>
          <button type="submit" className="bt bt-acento" disabled={estado === "enviando"}>
            {estado === "enviando" ? t.enviando : formulario.botao}
          </button>
        </div>
      </div>

      <div className="fe-retorno" role="status" aria-live="polite">
        {estado === "ok" && <p className="fe-sucesso">{t.sucesso}</p>}
        {estado === "falha" && (
          <div className="fe-falha">
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
