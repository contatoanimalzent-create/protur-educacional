import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Protur Educacional | Turismo de bem-estar para empresas",
  description:
    "Protur Educacional leva dias completos de bem-estar para dentro da sua empresa: movimento, meditação, avaliação nutricional, massoterapia e conteúdo educacional em um único espaço.",
  metadataBase: new URL("https://protureducacional.com.br"),
  openGraph: {
    title: "Protur Educacional | Turismo de bem-estar para empresas",
    description:
      "Um dia inteiro para cuidar de você: 9 atividades simultâneas de movimento, saúde e bem-estar.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-protur-cream text-protur-green">
        {children}
      </body>
    </html>
  );
}
