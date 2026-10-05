type Props = { tamanho?: number; espessura?: number };

const base = (tamanho: number, espessura: number) => ({
  width: tamanho,
  height: tamanho,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: espessura,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const SetaDireita = ({ tamanho = 18, espessura = 1.8 }: Props) => (
  <svg {...base(tamanho, espessura)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronEsquerda = ({ tamanho = 18, espessura = 1.8 }: Props) => (
  <svg {...base(tamanho, espessura)}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

export const ChevronDireita = ({ tamanho = 18, espessura = 1.8 }: Props) => (
  <svg {...base(tamanho, espessura)}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const ChevronDown = ({ tamanho = 14, espessura = 2 }: Props) => (
  <svg {...base(tamanho, espessura)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const Menu = ({ tamanho = 26 }: Props) => (
  <svg {...base(tamanho, 1.8)}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const Fechar = ({ tamanho = 18 }: Props) => (
  <svg {...base(tamanho, 2)} strokeLinejoin={undefined}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const SetaCima = ({ tamanho = 14, espessura = 2 }: Props) => (
  <svg {...base(tamanho, espessura)}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const Facebook = ({ tamanho = 17, espessura = 1.8 }: Props) => (
  <svg {...base(tamanho, espessura)}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Instagram = ({ tamanho = 17, espessura = 1.8 }: Props) => (
  <svg {...base(tamanho, espessura)}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <path d="M17.5 6.5h.01" />
  </svg>
);

export const Linkedin = ({ tamanho = 17, espessura = 1.8 }: Props) => (
  <svg {...base(tamanho, espessura)}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Whatsapp = ({ tamanho = 17, espessura = 1.8 }: Props) => (
  <svg {...base(tamanho, espessura)}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
