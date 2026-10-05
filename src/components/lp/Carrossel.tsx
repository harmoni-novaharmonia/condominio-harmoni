"use client";

import { useState } from "react";
import { textosGerais as t } from "@/empreendimentos/comum";
import type { ItemPerspectiva, SecaoPerspectivas } from "@/empreendimentos/tipos";

type Props = { itens: ItemPerspectiva[]; variante: SecaoPerspectivas["carrossel"]; escuro?: boolean };

const num = (i: number) => String(i + 1).padStart(2, "0");

const Seta = ({ lado }: { lado: "esq" | "dir" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d={lado === "esq" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

function Selo({ mostrar }: { mostrar: boolean }) {
  return mostrar ? <span className="selo">{t.imagemProvisoria}</span> : null;
}

/** Perspectivas: um formato diferente por LP. Todas as fotos carregam de uma vez
 *  (são poucas) para a troca não piscar. */
export function Carrossel({ itens, variante, escuro }: Props) {
  const [i, setI] = useState(variante === "centro" ? Math.min(1, itens.length - 1) : 0);
  const n = itens.length;
  const ant = () => setI((x) => (x - 1 + n) % n);
  const prox = () => setI((x) => (x + 1) % n);
  const atual = itens[i];
  const provisoria = itens.some((x) => x.imagem.provisoria);

  // Cinema (Vinhedos): foto grande com zoom lento e miniaturas.
  if (variante === "cinema") {
    return (
      <div className="car car-cinema">
        <div className="cin-palco">
          {itens.map((x, k) => (
            <img key={x.imagem.src + k} src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt={x.imagem.alt} data-ativo={k === i} aria-hidden={k !== i} />
          ))}
          <div className="cin-legenda">
            <div>
              <p className="cin-nome">{atual.nome}</p>
              <p className="cin-texto">{atual.texto}</p>
            </div>
            <p className="cin-num">
              {num(i)} / {num(n - 1)}
            </p>
          </div>
          <button type="button" className="cin-seta cin-esq" aria-label={t.anterior} onClick={ant}>
            <Seta lado="esq" />
          </button>
          <button type="button" className="cin-seta cin-dir" aria-label={t.proxima} onClick={prox}>
            <Seta lado="dir" />
          </button>
          <Selo mostrar={provisoria} />
        </div>
        <div className="cin-minis" style={{ ["--n" as string]: n }}>
          {itens.map((x, k) => (
            <button key={x.imagem.src + k} type="button" className="cin-mini" data-ativo={k === i} aria-label={x.nome} onClick={() => setI(k)}>
              <img src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt="" loading="lazy" />
              <span />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Leque (Jardins): o painel que recebe o mouse se abre.
  if (variante === "leque") {
    return (
      <div className="car car-leque">
        <div className="leq-faixa">
          {itens.map((x, k) => (
            <button key={x.imagem.src + k} type="button" className="leq" data-ativo={k === i} aria-label={x.nome} aria-pressed={k === i} onMouseEnter={() => setI(k)} onFocus={() => setI(k)} onClick={() => setI(k)}>
              <img src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt={x.imagem.alt} loading="lazy" />
              <span className="leq-veu" />
              <span className="leq-texto">
                <span className="leq-num">{num(k)}</span>
                <span className="leq-nome">{x.nome}</span>
                <span className="leq-desc">{x.texto}</span>
              </span>
              <span className="leq-vertical">{x.nome}</span>
            </button>
          ))}
        </div>
        {provisoria && <p className="car-nota">{t.imagemProvisoria}. {t.lequeDica}</p>}
      </div>
    );
  }

  // Pilha (Arbore): cartões empilhados; clicar na foto da frente traz a próxima.
  if (variante === "pilha") {
    return (
      <div className="car car-pilha">
        <div className="pil-monte">
          {itens.map((x, k) => {
            const d = (k - i + n) % n;
            return (
              <button
                key={x.imagem.src + k}
                type="button"
                className="pil-carta"
                style={{ ["--d" as string]: Math.min(d, 4), zIndex: 20 - d }}
                data-fora={d > 3}
                aria-hidden={d !== 0}
                tabIndex={d === 0 ? 0 : -1}
                aria-label={`${x.nome}: ${t.proxima}`}
                onClick={prox}
              >
                <img src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt={x.imagem.alt} loading="lazy" />
              </button>
            );
          })}
          <Selo mostrar={provisoria} />
        </div>
        <div className="pil-texto">
          <p className="pil-num">
            {num(i)} / {num(n - 1)}
          </p>
          <p className="pil-nome">{atual.nome}</p>
          <p className="pil-desc">{atual.texto}</p>
          <div className="car-setas">
            <button type="button" className="car-seta" aria-label={t.anterior} onClick={ant}>
              <Seta lado="esq" />
            </button>
            <button type="button" className="car-seta" aria-label={t.proxima} onClick={prox}>
              <Seta lado="dir" />
            </button>
          </div>
          <p className="car-nota">{t.pilhaDica}</p>
        </div>
      </div>
    );
  }

  // Índice (Essenza): passar o mouse na lista troca a foto, que entra da esquerda.
  if (variante === "indice") {
    return (
      <div className="car car-indice">
        <div className="ind-palco">
          {itens.map((x, k) => (
            <img key={x.imagem.src + k} src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt={x.imagem.alt} data-ativo={k === i} aria-hidden={k !== i} loading="lazy" />
          ))}
          <p className="ind-num" aria-hidden="true">
            {num(i)}
          </p>
          <Selo mostrar={provisoria} />
        </div>
        <ol className="ind-lista">
          {itens.map((x, k) => (
            <li key={x.imagem.src + k}>
              <button type="button" data-ativo={k === i} aria-pressed={k === i} onMouseEnter={() => setI(k)} onFocus={() => setI(k)} onClick={() => setI(k)}>
                <span className="ind-n">{num(k)}</span>
                <span>
                  <span className="ind-nome">{x.nome}</span>
                  <span className="ind-desc">{x.texto}</span>
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  // Centro (Vale): foto central e vizinhas esmaecidas.
  return (
    <div className="car car-centro" data-escuro={escuro}>
      <div className="cen-janela">
        <div className="cen-trilho" style={{ ["--i" as string]: i }}>
          {itens.map((x, k) => (
            <button key={x.imagem.src + k} type="button" className="cen-slide" data-ativo={k === i} aria-label={x.nome} onClick={() => setI(k)}>
              <img src={x.imagem.src} width={x.imagem.largura} height={x.imagem.altura} alt={x.imagem.alt} loading="lazy" />
              {k === i && <Selo mostrar={!!x.imagem.provisoria} />}
            </button>
          ))}
        </div>
      </div>
      <div className="cen-controle">
        <button type="button" className="car-seta" aria-label={t.anterior} onClick={ant}>
          <Seta lado="esq" />
        </button>
        <div className="cen-legenda" aria-live="polite">
          <p className="cen-nome">{atual.nome}</p>
          <p className="cen-desc">
            {num(i)} / {num(n - 1)} · {atual.texto}
          </p>
        </div>
        <button type="button" className="car-seta" aria-label={t.proxima} onClick={prox}>
          <Seta lado="dir" />
        </button>
      </div>
      <div className="cen-pontos">
        {itens.map((x, k) => (
          <button key={x.imagem.src + k} type="button" data-ativo={k === i} aria-label={x.nome} onClick={() => setI(k)} />
        ))}
      </div>
    </div>
  );
}
