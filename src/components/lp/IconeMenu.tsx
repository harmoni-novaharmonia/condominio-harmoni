/** Três traços que viram X. A animação fica no CSS (.icone-menu). */
export function IconeMenu({ aberto }: { aberto: boolean }) {
  return (
    <svg className="icone-menu" data-aberto={aberto} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path className="t1" d="M4 7h16" />
      <path className="t2" d="M4 12h16" />
      <path className="t3" d="M4 17h16" />
    </svg>
  );
}
