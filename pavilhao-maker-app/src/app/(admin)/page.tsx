
'use client';

import { useState } from 'react';
import MetricCard from '@/components/MetricCard';
import CalendarGrid from '@/components/CalendarGrid';
import EventModal from '@/components/EventModal';

const metrics = [
  { label: 'Reservas totais', value: '18', description: 'Últimos 7 dias' },
  { label: 'Taxa de aprovação', value: '92%', description: 'Solicitações atendidas' },
  { label: 'Pendentes', value: '4', description: 'Aguardando triagem' },
];

const events = [
  { id: 'evt-1', title: 'Workshop de Robótica', time: '09:00–12:00', location: 'Pavilhão', date: 8, color: '#8b5000' },
  { id: 'evt-2', title: 'Curso de Impressão 3D', time: '14:00–17:00', location: 'Maker', date: 9, color: '#ff9800' },
  { id: 'evt-3', title: 'Conversa com comunidade', time: '18:00–20:00', location: 'Pavilhão', date: 11, color: '#5f5e5e' },
];

export default function DashboardPage() {
  const [activeEvent, setActiveEvent] = useState(events[0]);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-zinc-200 bg-white/95 p-8 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Painel</p>
            <h1 className="mt-3 text-3xl font-[var(--font-space)] font-black text-zinc-950">Visão geral de ocupação</h1>
          </div>
          <div className="rounded-3xl bg-[var(--color-surface-container-low)] px-4 py-3 text-sm text-zinc-600">
            Agenda do Pavilhão Maker atualizada automaticamente
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} label={metric.label} value={metric.value} description={metric.description} />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-zinc-200 bg-white/95 p-8 shadow-xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Calendário</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-950">Semana ativa</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface-container)] px-4 py-2 text-sm text-zinc-700">
            <span className="material-symbols-outlined">calendar_month</span>
            4–10 Maio 2026
          </div>
        </div>
        <CalendarGrid events={events} onSelect={(event) => setActiveEvent(event)} />
      </section>

      <EventModal event={activeEvent} open={Boolean(activeEvent)} onClose={() => setActiveEvent(undefined)} />
    </div>
  );
}
