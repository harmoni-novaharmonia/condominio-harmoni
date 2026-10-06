import { textosGerais } from "@/empreendimentos/comum";
import type { Imagem } from "@/empreendimentos/tipos";

type Props = { imagem: Imagem; ripas: number; prioridade?: boolean; sizes?: string };

/**
 * Foto montada em ripas verticais (o ripado de madeira dos renders): cada ripa
 * mostra a sua fatia da mesma imagem, que tem a largura do conjunto. O CSS faz as
 * ripas crescerem de baixo para cima.
 */
export function Ripado({ imagem, ripas, prioridade, sizes }: Props) {
  return (
    <div className="ab-ripas" style={{ ["--n" as string]: ripas }} role="img" aria-label={imagem.alt}>
      {Array.from({ length: ripas }, (_, k) => (
        <i key={k} style={{ ["--k" as string]: k }}>
          <img
            src={imagem.src}
            width={imagem.largura}
            height={imagem.altura}
            alt=""
            loading={prioridade ? "eager" : "lazy"}
            decoding="async"
            sizes={sizes}
            {...(prioridade && k === 0 ? { fetchPriority: "high" as const } : {})}
          />
        </i>
      ))}
      {imagem.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
    </div>
  );
}
