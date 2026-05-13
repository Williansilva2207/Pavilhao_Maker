
'use client';

export default function TopHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 px-6 py-4 backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Painel administrativo</p>
          <h1 className="text-xl font-black text-zinc-950">Seja bem-vindo(a)</h1>
        </div>
        <div className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-[var(--color-surface-container)] px-4 py-2 text-sm text-zinc-700">
          <span className="material-symbols-outlined">notifications</span> 3 notificações
        </div>
      </div>
    </header>
  );
}
