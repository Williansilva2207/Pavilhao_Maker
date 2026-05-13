
export default function RequestCard({
  title,
  requester,
  space,
  submitted,
  onAction,
}: {
  title: string;
  requester: string;
  space: string;
  submitted: string;
  onAction: (action: string) => void;
}) {
  return (
    <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-zinc-950">{title}</h3>
          <p className="mt-1 text-sm text-zinc-600">{requester} · {space}</p>
        </div>
        <div className="rounded-full bg-[var(--color-surface-container)] px-4 py-2 text-sm text-zinc-700">{submitted}</div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onAction('aprovado')}
          className="rounded-3xl bg-[#8b5000] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9d6900]"
        >
          Aprovar
        </button>
        <button
          type="button"
          onClick={() => onAction('rejeitado')}
          className="rounded-3xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
        >
          Rejeitar
        </button>
      </div>
    </div>
  );
}
