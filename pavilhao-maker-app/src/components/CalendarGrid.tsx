
import EventCard from './EventCard';

type Event = { id: string; title: string; time: string; location: string; date: number; color: string };

export default function CalendarGrid({ events, onSelect }: { events: Event[]; onSelect: (event: Event) => void }) {
  const days = Array.from({ length: 35 }, (_, index) => index + 1);
  const weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  return (
    <div className="rounded-[24px] border border-zinc-200 bg-[var(--color-surface-container)] p-4">
      <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.25em] text-zinc-500">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dayEvent = events.find((item) => item.date === day);
          return (
            <div key={day} className="min-h-[110px] rounded-3xl border border-zinc-200 bg-white p-3 text-left shadow-sm">
              <div className="flex items-center justify-between text-sm font-semibold text-zinc-700">
                <span>{day}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">mai</span>
              </div>
              {dayEvent ? (
                <div className="mt-3">
                  <EventCard event={dayEvent} onClick={() => onSelect(dayEvent)} />
                </div>
              ) : (
                <p className="mt-4 text-xs text-zinc-400">Livres</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
