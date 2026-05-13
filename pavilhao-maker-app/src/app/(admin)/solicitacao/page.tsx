
'use client';

import { useState } from 'react';
import SuccessToast from '@/components/SuccessToast';

export default function SolicitacaoPage() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-zinc-200 bg-white/95 p-8 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Nova solicitação</p>
            <h1 className="mt-3 text-3xl font-[var(--font-space)] font-black text-zinc-950">Abrir pedido de reserva</h1>
          </div>
          <span className="rounded-full bg-[var(--color-surface-container)] px-4 py-2 text-sm text-zinc-700">Sem backend integrado</span>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setShowToast(true);
          }}
          className="mt-8 grid gap-6 sm:grid-cols-2"
        >
          <label className="block text-sm text-zinc-700">
            Título da solicitação
            <input className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-[#c95a5a]" required />
          </label>
          <label className="block text-sm text-zinc-700">
            Solicitante
            <input className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-[#c95a5a]" required />
          </label>
          <label className="block text-sm text-zinc-700 sm:col-span-2">
            Espaço desejado
            <select className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-[#c95a5a]" required>
              <option value="Pavilhão">Pavilhão</option>
              <option value="Maker">Maker</option>
            </select>
          </label>
          <label className="block text-sm text-zinc-700 sm:col-span-2">
            Descrição do evento
            <textarea className="mt-2 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-[#c95a5a]" rows={4} required />
          </label>
          <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-zinc-600">Submeta sua solicitação para revisão.</span>
            <button className="rounded-3xl bg-[#8b5000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#a46d00]">
              Enviar solicitação
            </button>
          </div>
        </form>
      </section>
      <SuccessToast open={showToast} message="Solicitação enviada com sucesso!" onClose={() => setShowToast(false)} />
    </div>
  );
}
