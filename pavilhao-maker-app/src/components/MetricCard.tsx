
export default function MetricCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="rounded-[28px] border border-zinc-200 bg-[var(--color-surface-container-low)] p-6 shadow-sm">
      <p className="text-sm uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <p className="mt-4 text-4xl font-black text-zinc-950">{value}</p>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
    </div>
  );
}
