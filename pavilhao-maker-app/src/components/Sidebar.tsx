'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/triagem', label: 'Triagem', icon: 'fact_check' },
  { href: '/solicitacao', label: 'Nova Solicitação', icon: 'add_box' },
  { href: '/calendario', label: 'Calendário', icon: 'calendar_today' },
  { href: '#', label: 'Configurações', icon: 'settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-zinc-800 bg-[#1e1e1e] shadow-xl flex flex-col py-8 z-50 overflow-hidden">
      <div className="px-8 mb-12">
        <h1 className="text-[18px] font-black text-white uppercase tracking-wider font-space sidebar-title cursor-default whitespace-nowrap">
          Pavilhão Maker
        </h1>
        <div className="flex items-center gap-2 mt-4 p-2 bg-zinc-800/50 rounded border border-zinc-700/50">
          <span className="material-symbols-outlined text-green-500 text-[14px]">sync</span>
          <span className="text-[10px] font-space uppercase tracking-[0.2em] text-zinc-400">Outlook Synced</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-8 py-4 flex items-center gap-4 transition-all font-space text-[12px] font-bold uppercase tracking-[0.15em] nav-link ${
                active 
                  ? 'bg-zinc-800 text-white border-l-4 border-orange-500' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-6 pb-8">
        <div className="flex items-center gap-3 p-4 bg-zinc-800/30 rounded border border-zinc-800 avatar-container cursor-pointer group transition-all hover:bg-zinc-800/50">
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center border border-zinc-600 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-zinc-400 text-[24px]">person</span>
          </div>
          <div>
            <p className="text-white text-[11px] font-bold uppercase tracking-wider font-space">Admin Maker</p>
            <p className="text-zinc-500 text-[9px] uppercase tracking-tighter font-inter font-semibold">Supervisor</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
