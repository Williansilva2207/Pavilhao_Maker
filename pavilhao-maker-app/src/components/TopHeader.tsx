'use client';

import { usePathname } from 'next/navigation';

export default function TopHeader() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    switch (pathname) {
      case '/triagem': return 'Painel de Triagem';
      case '/solicitacao': return 'Nova Solicitação';
      case '/': return 'Calendário de Reservas';
      default: return 'Painel Administrativo';
    }
  };

  return (
    <header className="flex justify-between items-center w-full px-8 h-16 bg-white border-b border-zinc-200 sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div className="flex items-center gap-4">
        <h2 className="text-[24px] font-bold text-zinc-900 font-space header-title leading-none">
          {getPageTitle()}
        </h2>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Barra de Busca Original */}
        <div className="relative flex items-center group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#c95a5a] transition-colors">search</span>
          <input 
            className="pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 focus:border-[#c95a5a] focus:bg-white focus:ring-0 text-sm font-inter w-64 transition-all outline-none rounded-sm" 
            placeholder="Procurar solicitação..." 
            type="text"
          />
        </div>
        
        {/* Notificações */}
        <button className="text-zinc-500 hover:text-[#c95a5a] transition-colors cursor-pointer relative flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-[1.5px] border-white"></span>
        </button>
      </div>
    </header>
  );
}
