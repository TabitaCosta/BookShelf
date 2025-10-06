import type { Metadata } from "next";
// A importação está correta, mas a forma de usar a fonte vai mudar.
import { GeistSans as GeistSansFont } from 'geist/font/sans';
import { GeistMono as GeistMonoFont } from 'geist/font/mono';
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// CORREÇÃO: Não chamamos as fontes como funções.
// Os objetos importados 'GeistSansFont' e 'GeistMonoFont' já contêm
// a propriedade '.variable' que precisamos.
// const geistSans = GeistSansFont({ ... }); // <-- Linhas removidas
// const geistMono = GeistMonoFont({ ... }); // <-- Linhas removidas

export const metadata: Metadata = {
  title: 'BookShelf',
  description: 'Sua estante de livros pessoal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSansFont.variable} ${GeistMonoFont.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <main>{children}</main>
      </body>
    </html>
  );
}

