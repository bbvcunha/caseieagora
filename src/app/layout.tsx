import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { HotmartWidget } from "@/components/hotmart-widget";
import { SmoothAnchors } from "@/components/smooth-anchors";
import "./globals.css";

// Títulos: serifa editorial, com o itálico usado nos destaques.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Corpo, botões e menus: sem serifa, limpa e legível no celular.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const TITLE = "Casei, e agora o que vamos comer? — O guia da cozinha a dois";
const DESCRIPTION =
  "Um guia descomplicado para montar a primeira cozinha, aprender a cozinhar e começar uma deliciosa vida a dois. E-book com receitas, histórias reais e playlists por QR Code.";

const OG_TITLE = "Casei, e agora, o que vamos comer? | Chef Leciane Carine";
const OG_DESCRIPTION =
  "Sua vida a dois não precisa depender do delivery. 138 páginas práticas para montar a cozinha, fazer 15 a 20 marmitas e cozinhar juntos do zero.";

const OG_IMAGE = {
  url: "/images/og-capa.jpg",
  width: 1200,
  height: 630,
  alt: "Capa do e-book Casei, e agora o que vamos comer?",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Leciane Carine" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#f9f7f3", // cotton
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${montserrat.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cotton font-sans text-charcoal antialiased">
        {children}
        <SmoothAnchors />
        <HotmartWidget />
      </body>
    </html>
  );
}
