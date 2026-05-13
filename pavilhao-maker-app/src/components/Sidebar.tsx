
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Dashboard', icon: 'dashboard' },
  { href: '/triagem', label: 'Triagem', icon: 'inventory_2' },
  { href: '/solicitacao', label: 'Solicitação', icon: 'post_add' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-[var(--spacing-sidebar)] border-r border-zinc-200 bg-white/95 px-6 py-8 shadow-xl">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Pavilhão Maker</p>
        <h2 className="mt-3 text-3xl font-[var(--font-space)] font-black text-zinc-950">Admin</h2>
      </div>
      <nav className="space-y-3">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                active ? 'bg-[#ff9800]/10 text-[#8b5000]' : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
