import type { Metadata } from "next";

import "./globals.css";
import ProvidersWrapper from "@/lib/provaider/providersAuth";
import { Analytics } from "@vercel/analytics/next";



export const metadata: Metadata = {
  title: "Bingo",
  description: "Generated by create next app",
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
