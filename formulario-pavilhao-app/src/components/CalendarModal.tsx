
'use client';

import { useState } from 'react';
import CalendarWizard from './CalendarWizard';

const events = [
  { id: '1', title: 'Aula aberta', time: '09:00–11:00', day: 'Seg' },
  { id: '2', title: 'Workshop Maker', time: '13:00–16:00', day: 'Qua' },
  { id: '3', title: 'Reunião de equipe', time: '18:00–20:00', day: 'Sex' },
];

export default function CalendarModal({ open, onClose, onReserve }: { open: boolean; onClose: () => void; onReserve: () => void }) {
  const [wizardStep, setWizardStep] = useState(1);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-w-5xl rounded-[32px] bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Calendário semanal</p>
            <h2 className="mt-2 text-3xl font-black text-zinc-950">Escolha o horário disponível</h2>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-zinc-900">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[360px_1fr]">
          <div className="space-y-4 rounded-[32px] border border-zinc-200 bg-[var(--color-surface)] p-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Visão geral</p>
              <p className="text-sm leading-6 text-zinc-600">Os horários marcados já estão ocupados. Selecione um horário livre e conclua sua reserva na segunda etapa.</p>
            </div>
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="rounded-3xl border border-zinc-200 p-4">
                  <p className="font-semibold text-zinc-900">{event.title}</p>
                  <p className="text-sm text-zinc-600">{event.day} · {event.time}</p>
                </div>
              ))}
            </div>
          </div>
          <CalendarWizard
            step={wizardStep}
            onNext={() => setWizardStep(2)}
            onBack={() => setWizardStep(1)}
            onReserve={() => {
              onReserve();
              setWizardStep(1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
