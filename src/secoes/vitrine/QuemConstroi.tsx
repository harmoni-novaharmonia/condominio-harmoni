"use client";

import { useRef } from "react";
import { ChevronDireita, ChevronEsquerda, SetaDireita } from "@/components/Icones";
import { TituloSecao } from "@/components/TituloSecao";
import { pendente } from "@/dados/empreendimentos";
import { ancoras, quem as t } from "@/dados/vitrine";

export function QuemConstroi() {
  const reel = useRef<HTMLDivElement>(null);
  // Arrastar com o mouse; no toque a rolagem nativa (com snap) já resolve.
  const arraste = useRef<{ x: number; s: number } | null>(null);

  const passa = (dir: number) => {
    const r = reel.current;
    if (r) r.scrollBy({ left: dir * r.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <section className="vt-quem esc" id={ancoras.quem}>
      <img className="textura" src={t.textura.src} width={t.textura.largura} height={t.textura.altura} alt="" loading="lazy" />
      <div className="g">
        <div className="cab">
          <div>
            <p className="rot">{t.rotulo}</p>
            <TituloSecao titulo={t.titulo} />
          </div>
          <div className="dir">
            <p className="lead">{t.texto}</p>
            <a className="lnk" href={t.link.href} target="_blank" rel="noopener noreferrer">
              {t.link.rotulo} <SetaDireita tamanho={15} espessura={1.4} />
            </a>
          </div>
        </div>

        <ul className="numeros">
          {t.numeros.map((n) => (
            <li key={n.nome}>
              <em>{n.nome}</em>
              <b data-conta={n.lotes}>{n.lotes.toLocaleString("pt-BR")}</b>
              <span>
                {t.lotesEm} {n.cidade}
              </span>
            </li>
          ))}
        </ul>

        <div
          className="reel"
          ref={reel}
          role="region"
          aria-label={t.rotuloFotos}
          tabIndex={0}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse" || !reel.current) return;
            arraste.current = { x: e.clientX, s: reel.current.scrollLeft };
            reel.current.classList.add("arrasta");
            reel.current.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (arraste.current && reel.current) reel.current.scrollLeft = arraste.current.s - (e.clientX - arraste.current.x);
          }}
          onPointerUp={() => {
            arraste.current = null;
            reel.current?.classList.remove("arrasta");
          }}
          onPointerCancel={() => {
            arraste.current = null;
            reel.current?.classList.remove("arrasta");
          }}
        >
          {t.obras.map((o) => (
            <figure key={o.imagem.src} className={o.larga ? "larga" : undefined}>
              <img src={o.imagem.src} width={o.imagem.largura} height={o.imagem.altura} alt={o.imagem.alt} loading="lazy" draggable={false} />
              <figcaption>
                <b>{o.nome}</b>
                <span>{pendente(o.legenda) ? <em className="ph">{o.legenda}</em> : o.legenda}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="reel-ctrl">
          <p>{t.dica}</p>
          <div className="setas">
            <button className="circ" type="button" aria-label={t.anterior} onClick={() => passa(-1)}>
              <ChevronEsquerda />
            </button>
            <button className="circ" type="button" aria-label={t.proxima} onClick={() => passa(1)}>
              <ChevronDireita />
            </button>
          </div>
        </div>

        <div className="sfa">
          <div className="in">
            <img src={t.sfa.src} width={t.sfa.largura} height={t.sfa.altura} alt={t.sfa.alt} loading="lazy" />
            <p>
              {t.setores.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
