
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Formulário Pavilhão Maker',
  description: 'Sistema público de solicitação de reserva do Pavilhão Maker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[var(--color-background)] text-[var(--color-dark-side)]">
        {children}
      </body>
    </html>
  );
}
