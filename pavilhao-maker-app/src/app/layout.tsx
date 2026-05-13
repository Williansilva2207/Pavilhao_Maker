
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pavilhão Maker Admin',
  description: 'Painel administrativo do Pavilhão Maker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full bg-[var(--color-background)] text-[var(--color-on-surface-variant)]">
        {children}
      </body>
    </html>
  );
}
