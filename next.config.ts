import type { NextConfig } from "next";

const config: NextConfig = {
  // Hospedagem estática (Hostinger): o conteúdo de out/ vai para o public_html.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Só para o `next dev`: permite abrir o servidor local por 127.0.0.1 além de localhost.
  allowedDevOrigins: ["127.0.0.1"],
};

export default config;
