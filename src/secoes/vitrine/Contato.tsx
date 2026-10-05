"use client";

import { useEffect, useState, type FormEvent } from "react";
import { TituloSecao } from "@/components/TituloSecao";
import { useVitrine } from "@/components/VitrineContexto";
import { harmonis } from "@/dados/empreendimentos";
import { contato } from "@/dados/vitrine";

const CHAVES_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type Utms = Record<(typeof CHAVES_UTM)[number], string>;
const UTMS_VAZIAS: Utms = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
};

export function Contato() {
  const { interesse, setInteresse } = useVitrine();
  const [retorno, setRetorno] = useState("");
  const [utms, setUtms] = useState<Utms>(UTMS_VAZIAS);

  // A UTM da primeira visita vale para a sessão inteira, mesmo se o visitante
  // navegar antes de preencher o formulário.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const lidas = { ...UTMS_VAZIAS };
    CHAVES_UTM.forEach((k) => {
      let v: string | null = null;
      try {
        v = sessionStorage.getItem(k);
      } catch {}
      if (!v && q.get(k)) {
        v = q.get(k);
        try {
          sessionStorage.setItem(k, v as string);
        } catch {}
      }
      if (v) lidas[k] = v;
    });
    setUtms(lidas);
  }, []);

  const aoEnviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setRetorno(contato.erro);
      return;
    }
    // Provisório: ainda não existe endpoint de lead. Antes de publicar, a
    // mensagem de sucesso só pode aparecer depois da entrega confirmada.
    setRetorno(contato.sucesso);
    form.reset();
    setInteresse("");
  };

  const c = contato.campos;

  return (
    <section className="contato" id="hm-contato">
      <div className="c-txt rv">
        <TituloSecao titulo={contato.titulo} />
        <p className="sub">{contato.subtitulo}</p>
        <div className="direto">
          <span>
            {contato.rotuloTelefone}
            <span className="ph">{contato.telefone}</span>
          </span>
          <span>
            {contato.rotuloWhatsapp}
            <span className="ph">{contato.whatsapp}</span>
          </span>
        </div>
      </div>
      <form className="form rv" id="hm-form" noValidate onSubmit={aoEnviar}>
        <label className="campo todo">
          {c.nome.rotulo}
          <input type="text" name="name" autoComplete="name" placeholder={c.nome.placeholder} required />
        </label>
        <label className="campo">
          {c.email.rotulo}
          <input type="email" name="email" autoComplete="email" placeholder={c.email.placeholder} required />
        </label>
        <label className="campo">
          {c.whatsapp.rotulo}
          <input
            type="tel"
            name="mobile_phone"
            autoComplete="tel"
            placeholder={c.whatsapp.placeholder}
            required
          />
        </label>
        <label className="campo todo">
          {c.empreendimento.rotulo}
          <select name="cf_empreendimento" value={interesse} onChange={(e) => setInteresse(e.target.value)}>
            <option value="">{contato.selectVazio}</option>
            {harmonis.map((h) => (
              <option key={h.slug} value={h.nome}>
                {h.rotuloSelect}
              </option>
            ))}
          </select>
        </label>
        {CHAVES_UTM.map((k) => (
          <input key={k} type="hidden" name={`cf_${k}`} value={utms[k]} readOnly />
        ))}
        <label className="aceite">
          <input type="checkbox" name="lgpd" required />
          {contato.aceite}
        </label>
        <button className="btn btn-lar" type="submit">
          {contato.enviar}
        </button>
        <p className="retorno" id="hm-retorno" role="status">
          {retorno}
        </p>
      </form>
    </section>
  );
}
