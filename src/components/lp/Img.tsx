import { textosGerais } from "@/empreendimentos/comum";
import type { Imagem } from "@/empreendimentos/tipos";

type Props = {
  imagem: Imagem;
  className?: string;
  /** Primeira dobra: carrega já e com prioridade. */
  prioridade?: boolean;
  sizes?: string;
};

/** <img> com dimensões e alt sempre preenchidos e o selo das imagens provisórias. */
export function Img({ imagem, className, prioridade, sizes }: Props) {
  return (
    <>
      <img
        className={className}
        src={imagem.src}
        width={imagem.largura}
        height={imagem.altura}
        alt={imagem.alt}
        loading={prioridade ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        {...(prioridade ? { fetchPriority: "high" as const } : {})}
      />
      {imagem.provisoria && <span className="selo">{textosGerais.imagemProvisoria}</span>}
    </>
  );
}
