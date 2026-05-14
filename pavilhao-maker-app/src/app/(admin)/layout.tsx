'use client';

import type { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import TopHeader from '@/components/TopHeader';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f9f9fa] text-zinc-900 font-inter flex relative">
      {/* Sidebar Fixa à Esquerda */}
      <Sidebar />
      
      {/* Área de Conteúdo - Margem esquerda de 280px para não sobrepor a Sidebar */}
      <div className="flex-1 flex flex-col min-h-screen ml-64 relative industrial-grid overflow-x-hidden">
        <TopHeader />
        
        <main className="p-8 flex-1 relative z-10">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
        
        <footer className="p-6 border-t border-zinc-200 text-center relative z-10 bg-white/50 backdrop-blur-sm">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest font-inter">
            Pavilhão Maker © 2026 — Universidade Católica de Pernambuco
          </p>
        </footer>
      </div>
    </div>
  );
}
