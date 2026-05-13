
'use client';

import { useState } from 'react';

export default function CalendarWizard({
  step,
  onNext,
  onBack,
  onReserve,
}: {
  step: number;
  onNext: () => void;
  onBack: () => void;
  onReserve: () => void;
}) {
  const [selectedSlot, setSelectedSlot] = useState('Seg, 09:00');
  const [subject, setSubject] = useState('Workshop com alunos');

  return (
    <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm">
      {step === 1 ? (
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-zinc-500">Passo 1</p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-950">Escolha um horário livre</h3>
          </div>
          <div className="grid gap-3">
            {['Seg, 09:00', 'Ter, 14:00', 'Qua, 16:00', 'Sex, 10:00'].map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`rounded-3xl border px-4 py-4 text-left transition ${
                  selectedSlot === slot ? 'border-[var(--color-form-primary)] bg-[var(--color-form-primary)]/10 text-[var(--color-dark-side)]' : 'border-zinc-200 bg-zinc-50 text-zinc-700'
                }`}
              >
                <p className="font-semibold">{slot}</p>
                <p className="mt-1 text-sm text-zinc-500">Tempo estimado de uso 2h</p>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onNext}
            className="mt-4 w-full rounded-3xl bg-[var(--color-form-primary-dark)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
          >
            Continuar
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-zinc-500">Passo 2</p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-950">Confirme sua solicitação</h3>
          </div>
          <label className="block text-sm text-zinc-700">
            Assunto
            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="mt-3 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-[var(--color-form-primary)]"
            />
          </label>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
            <p><strong>Horário selecionado:</strong> {selectedSlot}</p>
            <p className="mt-2"><strong>Detalhes:</strong> {subject || 'Informe o propósito da reserva'}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onBack}
              className="rounded-3xl border border-zinc-300 bg-white px-5 py-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={onReserve}
              className="rounded-3xl bg-[var(--color-form-primary-dark)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
            >
              Confirmar reserva
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
