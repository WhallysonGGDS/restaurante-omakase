import type { Metadata, Viewport } from "next";
import SmoothScroll from "@/components/SmoothScroll";
// Fontes auto-hospedadas (Fontsource): sem dependência de rede no build
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/manrope/300.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/shippori-mincho/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akane 茜 — Omakase | Uma experiência além do sabor",
  description:
    "Restaurante omakase em Goiânia. Dez lugares, um balcão de hinoki e dezoito tempos servidos pelas mãos do chef.",
};

export const viewport: Viewport = { themeColor: "#0b0807" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
