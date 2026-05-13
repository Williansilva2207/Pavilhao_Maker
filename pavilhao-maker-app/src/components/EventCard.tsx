
type Event = { id: string; title: string; time: string; location: string; date: number; color: string };

export default function EventCard({ event, onClick }: { event: Event; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-3xl px-3 py-2 text-left text-sm text-white transition hover:brightness-105"
      style={{ backgroundColor: event.color }}
    >
      <div className="font-semibold">{event.title}</div>
      <div className="mt-1 text-[11px] opacity-90">{event.time}</div>
      <div className="mt-1 text-[11px] opacity-80">{event.location}</div>
    </button>
  );
}
