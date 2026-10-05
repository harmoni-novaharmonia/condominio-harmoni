import type { Metadata, Viewport } from "next";
import { Jost, Lato } from "next/font/google";
import { metadados } from "@/dados/vitrine";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--fonte-lato",
  display: "swap",
});

// Jost nos títulos: o wordmark do logo é uma sans geométrica leve e o Jost Light segue o mesmo desenho.
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--fonte-jost",
  display: "swap",
});

export const metadata: Metadata = {
  // Base das URLs absolutas (Open Graph) no domínio de produção.
  metadataBase: new URL("https://condominioharmoni.com.br"),
  title: metadados.titulo,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${lato.variable} ${jost.variable}`}>{children}</body>
    </html>
  );
}
