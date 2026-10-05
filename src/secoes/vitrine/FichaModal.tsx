"use client";

import { useEffect, useRef } from "react";
import { Fechar } from "@/components/Icones";
import { useVitrine } from "@/components/VitrineContexto";
import { porSlug, type Harmoni } from "@/dados/empreendimentos";
import { ficha } from "@/dados/vitrine";

export function FichaModal() {
  const { reduz, fichaSlug, aoFecharFicha, setInteresse, rolaPara } = useVitrine();
  const dialogo = useRef<HTMLDialogElement>(null);
  // Mantém o último conteúdo montado enquanto o diálogo fecha.
  const ultimo = useRef<Harmoni | undefined>(undefined);
  const atual = fichaSlug ? porSlug(fichaSlug) : undefined;
  if (atual) ultimo.current = atual;
  const h = ultimo.current;

  useEffect(() => {
    const d = dialogo.current;
    if (!fichaSlug || !d) return;
    if (!d.open) d.showModal();
    const t = setTimeout(() => {
      d.querySelector<HTMLButtonElement>(".fechar")?.focus({ preventScroll: true });
    }, 80);
    return () => clearTimeout(t);
  }, [fichaSlug]);

  // Ouvinte nativo: o evento close do <dialog> não chegou pelo onClose do React.
  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    d.addEventListener("close", aoFecharFicha);
    return () => d.removeEventListener("close", aoFecharFicha);
  }, [aoFecharFicha]);

  const fecha = () => {
    if (!dialogo.current?.open) return;
    dialogo.current.close();
    // O evento close pode chegar atrasado (aba em segundo plano); o estado não espera por ele.
    aoFecharFicha();
  };

  const irParaContato = () => {
    fecha();
    setInteresse(h?.nome ?? "");
    rolaPara("hm-contato");
    setTimeout(
      () => {
        document
          .querySelector<HTMLInputElement>('#hm-form input[name="name"]')
          ?.focus({ preventScroll: true });
      },
      reduz ? 0 : 700,
    );
  };

  return (
    <dialog
      ref={dialogo}
      className="ficha"
      id="hm-ficha"
      aria-labelledby="hm-f-nome"
      onClick={(e) => {
        if (e.target === e.currentTarget) fecha();
      }}
    >
      <button className="fechar" type="button" aria-label={ficha.fechar} onClick={fecha}>
        <Fechar />
      </button>
      {h && (
        <div className="f-grade">
          <div className="f-foto">
            <img src={h.foto.src} width={h.foto.largura} height={h.foto.altura} alt={h.nome} />
          </div>
          <div className="f-info">
            <span className="selo">{h.status}</span>
            <div>
              {h.logo && (
                <img className="logo" src={h.logo.src} width={h.logo.largura} height={h.logo.altura} alt="" />
              )}
            </div>
            <h3
              id="hm-f-nome"
              style={{ fontSize: 24, fontWeight: 300, display: h.logo ? "none" : undefined }}
            >
              {h.nome}
            </h3>
            <p>{h.texto}</p>
            <dl className="dados">
              <div>
                <dt>{ficha.rotulos.localizacao}</dt>
                <dd>{h.cidade}</dd>
              </div>
              <div>
                <dt>{ficha.rotulos.lotes}</dt>
                <dd>
                  <span className="ph">{ficha.pendentes.lotes}</span>
                </dd>
              </div>
              <div>
                <dt>{ficha.rotulos.metragem}</dt>
                <dd>
                  <span className="ph">{ficha.pendentes.metragem}</span>
                </dd>
              </div>
              <div>
                <dt>{ficha.rotulos.aPartirDe}</dt>
                <dd>
                  <span className="ph">{ficha.pendentes.preco}</span>
                </dd>
              </div>
            </dl>
            <div className="acoes">
              <button className="btn btn-lar" type="button" onClick={irParaContato}>
                {ficha.cta}
              </button>
              <a className="btn btn-linha-esc" href={h.site}>
                {ficha.site}
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
