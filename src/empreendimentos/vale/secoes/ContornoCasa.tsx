import { CASA } from "./curvas";

/** Linha dourada com o contorno da casa do logo, deslocada atrás da foto. */
export function ContornoCasa() {
  return (
    <svg className="vl-contorno" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
      <path d={CASA} pathLength={1} />
    </svg>
  );
}
