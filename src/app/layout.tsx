import type { Metadata } from "next";

import "./globals.css";
import ProvidersWrapper from "@/lib/provaider/providersAuth";
import { Analytics } from "@vercel/analytics/next";



export const metadata = {
  title: "Bingo Online",
  description: "Jogue bingo online ao vivo e divirta-se!",
  openGraph: {
    title: "Bingo Online - Jogue ao Vivo!",
    description: "Participe de sorteios ao vivo e concorra a prêmios incríveis.",
    url: "https://bingo-online-nu.vercel.app",
    siteName: "Bingo Online",
    images: [
      {
        url: "https://drive.google.com/file/d/1tJlyooQRR78jAfUpup-XFvguH_5V3jTF/view?usp=sharing",
        width: 1200,
        height: 630,
        alt: "Imagem do Bingo Online",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bingo Online - Divirta-se com Amigos!",
    description: "Entre agora e jogue bingo com prêmios ao vivo.",
    images: ["https://drive.google.com/file/d/1tJlyooQRR78jAfUpup-XFvguH_5V3jTF/view?usp=sharing"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body >
      <ProvidersWrapper>
           {children}

           <Analytics />
       </ProvidersWrapper>
      </body>
    </html>
  );
}
