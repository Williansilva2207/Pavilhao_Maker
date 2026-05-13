
import type { ReactNode } from 'react';

export default function HeroSection({
  title,
  subtitle,
  buttonLabel,
  onButtonClick,
  children,
}: {
  title: string;
  subtitle: string;
  buttonLabel: string;
  onButtonClick: () => void;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#f4f4f5] px-6 py-12 md:px-12 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(201,90,90,0.18),_transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-2xl">
        <div className="grid gap-12 p-10 md:grid-cols-[360px_1fr] md:items-center">
          <div className="relative flex flex-col items-start justify-center gap-6">
            <div className="relative cursor-default">
              <span className="material-symbols-outlined text-[5.5rem] text-zinc-900 transition-transform duration-500 hover:scale-105">
                event_seat
              </span>
              <span className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-form-primary)] text-white shadow-lg">
                <span className="material-symbols-outlined text-sm">edit_calendar</span>
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              <span className="material-symbols-outlined text-sm">schedule</span>
              Antecedência mínima 48h
            </div>
            <button
              type="button"
              onClick={onButtonClick}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-700 transition hover:bg-zinc-50"
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              {buttonLabel}
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="font-[var(--font-space)] text-4xl font-black uppercase tracking-tight text-zinc-900 sm:text-5xl">
                {title}
              </h1>
              <p className="mt-3 text-2xl font-light text-zinc-500 sm:text-3xl">{subtitle}</p>
              <div className="mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[var(--color-form-primary)] to-[var(--color-form-primary-dark)]" />
            </div>
            <div className="space-y-4 text-base text-zinc-600">{children}</div>
            <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-zinc-400">
              <span className="material-symbols-outlined">schedule</span>
              Seg-Sex: 7h30 – 21h00 | Sáb: 7h30 – 11h30
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
