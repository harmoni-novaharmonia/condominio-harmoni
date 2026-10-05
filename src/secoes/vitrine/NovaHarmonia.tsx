import { TituloSecao } from "@/components/TituloSecao";
import { marcas, novaHarmonia } from "@/dados/vitrine";

export function NovaHarmonia() {
  return (
    <section className="nh">
      <img
        className="tracado"
        data-px="0.08"
        src={marcas.tracado.src}
        width={marcas.tracado.largura}
        height={marcas.tracado.altura}
        alt=""
      />
      <div>
        <TituloSecao titulo={novaHarmonia.titulo} />
        <p>{novaHarmonia.texto}</p>
      </div>
      <a className="btn btn-pet" href={novaHarmonia.cta.href} target="_blank" rel="noopener">
        {novaHarmonia.cta.rotulo}
      </a>
    </section>
  );
}
