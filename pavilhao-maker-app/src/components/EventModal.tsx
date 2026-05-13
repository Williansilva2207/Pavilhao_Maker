
type Event = { id: string; title: string; time: string; location: string; date: number; color: string };

export default function EventModal({ event, open, onClose }: { event?: Event; open: boolean; onClose: () => void }) {
  if (!open || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-[32px] bg-white p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Detalhe do evento</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-950">{event.title}</h2>
          </div>
          <button type="button" className="text-zinc-500 hover:text-zinc-900" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-[var(--color-surface-container-low)] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Data</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900">10 Maio 2026</p>
          </div>
          <div className="rounded-3xl bg-[var(--color-surface-container-low)] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Horário</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900">{event.time}</p>
          </div>
          <div className="sm:col-span-2 rounded-3xl bg-[var(--color-surface-container-low)] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Local</p>
            <p className="mt-2 text-lg font-semibold text-zinc-900">{event.location}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-[#ff9800]/10 px-4 py-2 text-sm font-semibold text-[#8b5000]">Reservado</span>
          <span className="rounded-full bg-[#5f5e5e]/10 px-4 py-2 text-sm font-semibold text-[#5f5e5e]">Revisão técnica</span>
        </div>
      </div>
    </div>
  );
}
