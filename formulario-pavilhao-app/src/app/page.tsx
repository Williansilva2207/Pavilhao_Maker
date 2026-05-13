
'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState, type FormEvent } from 'react';

const weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const weekTitle = '12 – 18 de novembro de 2024';

const events = [
  { id: 'evt-1', date: 8, title: 'Workshop de Robótica', time: '09:00–12:00', place: 'Pavilhão', color: '#8b5000' },
  { id: 'evt-2', date: 9, title: 'Curso de Impressão 3D', time: '14:00–17:00', place: 'Maker', color: '#ff9800' },
  { id: 'evt-3', date: 11, title: 'Reunião de equipe', time: '18:00–20:00', place: 'Pavilhão', color: '#5f5e5e' },
];

const slots = ['Seg, 09:00', 'Ter, 14:00', 'Qua, 16:00', 'Sex, 10:00'];

export default function HomePage() {
  const router = useRouter();
  const [selectedSpace, setSelectedSpace] = useState<'Pavilhão' | 'Maker'>('Pavilhão');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [detailEvent, setDetailEvent] = useState<typeof events[0] | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(slots[0]);
  const [subject, setSubject] = useState('Workshop com alunos');
  const [toastVisible, setToastVisible] = useState(false);

  const gridDays = useMemo(() => Array.from({ length: 35 }, (_, index) => index + 1), []);

  const openWizard = (slot: string) => {
    setSelectedSlot(slot);
    setWizardStep(1);
    setShowWizard(true);
  };

  const handleReserve = () => {
    setToastVisible(true);
    setShowWizard(false);
    setCalendarOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(selectedSpace === 'Maker' ? '/maker' : '/pavilhao');
  };

  return (
    <main className="min-h-screen industrial-grid">
      <header className="h-16 bg-white border-b flex items-center justify-between px-8">
        <h2 className="font-space text-2xl font-semibold cursor-default">Solicitação de Reserva do Pavilhão Maker</h2>
      </header>

      <section className="relative bg-[#f4f4f5] overflow-hidden hero-header">
        <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 text-[15rem] text-zinc-200/60 select-none pointer-events-none">
          <span className="material-symbols-outlined">domain</span>
        </div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            <div className="flex flex-col items-start justify-center">
              <div className="relative cursor-default">
                <span className="material-symbols-outlined text-8xl md:text-9xl text-zinc-800 transition-transform duration-500 hero-icon hero-icon-main">
                  event_seat
                </span>
                <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#c95a5a] text-white text-xs font-bold shadow-lg hero-badge">
                  <span className="material-symbols-outlined text-sm">edit_calendar</span>
                </span>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                <span className="material-symbols-outlined text-sm">schedule</span>
                Antecedência mínima 48h
              </div>
              <button
                type="button"
                onClick={() => setCalendarOpen(true)}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-300 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 transition-all"
              >
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                Ver Calendário
              </button>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h2 className="font-space text-5xl md:text-7xl font-black uppercase tracking-tight text-zinc-900 leading-[1.1] text-balance title-reserva cursor-default">
                  Reserva do
                </h2>
                <p className="font-space text-2xl md:text-4xl font-light text-zinc-500 mt-2 tracking-wide title-pavilhao cursor-default">
                  Pavilhão & Maker
                </p>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#c95a5a] to-[#8b1e35] mt-4 rounded-full" />
              </div>

              <div className="space-y-4 max-w-2xl">
                <div className="flex gap-4">
                  <span className="hidden sm:block w-1.5 flex-shrink-0 bg-zinc-800 rounded-full" />
                  <p className="text-lg md:text-xl text-zinc-700 leading-relaxed font-light">
                    Formulário para solicitação de reserva do <strong className="font-semibold">Espaço do Pavilhão</strong> (eventos) ou do <strong className="font-semibold">Espaço Maker</strong> (máquinas).
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="hidden sm:block w-1.5 flex-shrink-0 bg-zinc-300 rounded-full" />
                  <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-light">
                    A reserva deve ser solicitada por um docente responsável, respeitando o horário de funcionamento (seg-sex: 7h30–21h, sáb: 7h30–11h30). A prioridade é dada a eventos com metodologias ativas, workshops e atividades multidisciplinares.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="hidden sm:block w-1.5 flex-shrink-0 bg-zinc-300 rounded-full" />
                  <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-light">
                    Após o envio, aguarde a confirmação por e-mail. Seus dados pessoais não serão coletados automaticamente.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-zinc-300 flex items-center gap-4 text-xs tracking-widest uppercase text-zinc-400">
                <span className="material-symbols-outlined text-sm">schedule</span>
                Seg-Sex: 7h30 – 21h00 | Sáb: 7h30 – 11h30
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-10 relative overflow-hidden">
        <div className="absolute inset-0">
          <span className="material-symbols-outlined absolute left-[2%] top-[8%] text-[12rem] text-[#c95a5a] ambient-icon -rotate-12" style={{ opacity: 0.15 }}>
            precision_manufacturing
          </span>
          <span className="material-symbols-outlined absolute left-[3%] top-[40%] text-[8rem] text-[#b94d4d] ambient-icon rotate-45" style={{ opacity: 0.2 }}>
            view_in_ar
          </span>
          <span className="material-symbols-outlined absolute left-[1%] top-[56%] text-[10rem] text-zinc-800 ambient-icon rotate-90" style={{ opacity: 0.12 }}>
            laser
          </span>
          <span className="material-symbols-outlined absolute left-[4%] top-[70%] text-[9rem] text-[#c95a5a] ambient-icon -rotate-15" style={{ opacity: 0.18 }}>
            engineering
          </span>
          <span className="material-symbols-outlined absolute right-[2%] top-[12%] text-[11rem] text-[#8b1e35] ambient-icon rotate-12" style={{ opacity: 0.15 }}>
            memory
          </span>
          <span className="material-symbols-outlined absolute right-[4%] top-[45%] text-[9rem] text-[#c95a5a] ambient-icon -rotate-45" style={{ opacity: 0.2 }}>
            handyman
          </span>
          <span className="material-symbols-outlined absolute right-[5%] top-[78%] text-[7rem] text-zinc-800 ambient-icon -rotate-90" style={{ opacity: 0.12 }}>
            settings
          </span>
          <svg className="absolute left-0 top-0 w-64 h-full opacity-10 pointer-events-none" viewBox="0 0 200 800" fill="none">
            <rect x="20" y="100" width="40" height="2" fill="#c95a5a" />
            <rect x="60" y="100" width="2" height="30" fill="#c95a5a" />
            <rect x="60" y="130" width="25" height="2" fill="#c95a5a" />
            <circle cx="85" cy="131" r="3" fill="#c95a5a" />
            <rect x="30" y="300" width="2" height="50" fill="#8b1e35" />
            <rect x="30" y="350" width="30" height="2" fill="#8b1e35" />
          </svg>
          <svg className="absolute right-0 top-0 w-64 h-full opacity-10 scale-x-[-1] pointer-events-none" viewBox="0 0 200 800" fill="none">
            <rect x="20" y="200" width="40" height="2" fill="#b94d4d" />
            <rect x="60" y="200" width="2" height="40" fill="#b94d4d" />
            <rect x="60" y="240" width="20" height="2" fill="#b94d4d" />
            <circle cx="80" cy="241" r="3" fill="#b94d4d" />
            <rect x="30" y="500" width="2" height="70" fill="#c95a5a" />
            <rect x="30" y="570" width="35" height="2" fill="#c95a5a" />
          </svg>
        </div>
        <div className="absolute left-0 top-0 w-64 h-64 bg-[#c95a5a]/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#8b1e35]/5 blur-3xl rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 overflow-hidden rounded-[32px] shadow-2xl border-l-8 border-black bg-gradient-to-br from-[#c95a5a] via-[#b94d4d] to-[#8b1e35] p-10 text-white form-card-hover">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/20 blur-3xl rounded-full" />
          <div className="relative">
            <h1 className="font-space text-3xl mb-8 label-hover inline-block">Dados do solicitante</h1>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="group">
                <label className="block mb-2 text-lg label-hover">
                  Email <span className="required-asterisk">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Digite seu email"
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover hover:bg-white hover:shadow-[0_0_25px_rgba(255,120,120,0.6)] focus:bg-white focus:ring-4 focus:ring-red-200 outline-none"
                />
              </div>
              <div className="group">
                <label className="block mb-2 text-lg label-hover">
                  Nome <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Digite seu nome"
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover hover:bg-white hover:shadow-[0_0_25px_rgba(255,120,120,0.6)] focus:bg-white focus:ring-4 focus:ring-red-200 outline-none"
                />
              </div>
              <div className="group">
                <label className="block mb-2 text-lg label-hover">
                  Celular <span className="required-asterisk">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(81) 99999-9999"
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover hover:bg-white hover:shadow-[0_0_25px_rgba(255,120,120,0.6)] focus:bg-white focus:ring-4 focus:ring-red-200 outline-none"
                />
              </div>
              <div>
                <p className="text-xl mb-4 label-hover inline-block">
                  Escolha o espaço <span className="required-asterisk">*</span>
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {['Pavilhão', 'Maker'].map((space) => (
                    <label key={space} className="cursor-pointer">
                      <input
                        type="radio"
                        name="espaco"
                        value={space}
                        className="peer hidden"
                        checked={selectedSpace === space}
                        onChange={() => setSelectedSpace(space as 'Pavilhão' | 'Maker')}
                      />
                      <div className="p-6 rounded-2xl bg-white/10 border border-white/30 transition-all card-option peer-checked:bg-white peer-checked:text-black peer-checked:shadow-[0_0_30px_rgba(255,180,120,0.7)]">
                        <h3 className="text-xl font-space">Espaço {space}</h3>
                        <p className="text-sm">{space === 'Pavilhão' ? 'Lounge/Co-work' : 'Máquinas / Prototipagem'}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-[#7f1d35] px-8 py-4 rounded-xl text-white text-xl transition-all btn-hover hover:bg-black hover:-translate-y-1 hover:shadow-xl active:scale-95"
                >
                  Avançar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {calendarOpen ? (
        <div className="calendar-modal-overlay">
          <div className="calendar-modal-content">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold font-space">Calendário de Ocupação</h3>
              <button type="button" onClick={() => setCalendarOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button type="button" className="p-2 hover:bg-zinc-50 border border-zinc-200 rounded">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <h4 className="text-lg font-bold font-space">{weekTitle}</h4>
              <button type="button" className="p-2 hover:bg-zinc-50 border border-zinc-200 rounded">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <div className="cal-grid border-t border-l border-[#edf0f5]">
                <div className="cal-cell-header" />
                {weekdays.map((day) => (
                  <div key={day} className="cal-cell-header">
                    {day}
                  </div>
                ))}
                {gridDays.map((day) => {
                  const event = events.find((item) => item.date === day);
                  return (
                    <div key={day} className="cal-cell">
                      {event ? (
                        <button
                          type="button"
                          className="event-card"
                          style={{ backgroundColor: event.color }}
                          onClick={() => setDetailEvent(event)}
                        >
                          <div>{event.title}</div>
                          <div className="text-[10px] opacity-90">{event.time}</div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="empty-cell"
                          onClick={() => {
                            setShowWizard(true);
                            setWizardStep(1);
                            setSelectedSlot(slots[0]);
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {detailEvent ? (
        <div className="event-detail-popup">
          <div className="event-detail-card" style={{ borderLeft: `6px solid ${detailEvent.color}` }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold font-space">{detailEvent.title}</h3>
              <button type="button" className="text-zinc-400 hover:text-zinc-600" onClick={() => setDetailEvent(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-zinc-500 uppercase text-xs">Horário</span>
                <p className="mt-1">{detailEvent.time}</p>
              </div>
              <div>
                <span className="font-semibold text-zinc-500 uppercase text-xs">Local</span>
                <p className="mt-1">{detailEvent.place}</p>
              </div>
              <div>
                <span className="font-semibold text-zinc-500 uppercase text-xs">Descrição</span>
                <p className="mt-1">Reserva confirmada para atividade institucional.</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showWizard ? (
        <div className="create-event-popup">
          <div className="create-event-card">
            {wizardStep === 1 ? (
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-zinc-500">Passo 1</p>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-950">Escolha um horário livre</h3>
                </div>
                <div className="grid gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-3xl border px-4 py-4 text-left transition ${
                        selectedSlot === slot
                          ? 'border-[var(--color-form-primary)] bg-[var(--color-form-primary)]/10 text-[var(--color-dark-side)]'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <p className="font-semibold">{slot}</p>
                      <p className="mt-1 text-sm text-zinc-500">Tempo estimado de uso 2h</p>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setWizardStep(2)}
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
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="mt-3 w-full rounded-3xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-[var(--color-form-primary)]"
                  />
                </label>
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
                  <p>
                    <strong>Horário selecionado:</strong> {selectedSlot}
                  </p>
                  <p className="mt-2">
                    <strong>Detalhes:</strong> {subject || 'Informe o propósito da reserva'}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="rounded-3xl border border-zinc-300 bg-white px-5 py-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={handleReserve}
                    className="rounded-3xl bg-[var(--color-form-primary-dark)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
                  >
                    Confirmar reserva
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {toastVisible ? (
        <div className="success-toast">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <div className="flex flex-col">
            <span className="font-bold text-sm font-space">Reserva solicitada!</span>
            <span className="text-[11px] text-zinc-400">Aguarde a confirmação por e-mail.</span>
          </div>
          <button type="button" className="ml-2 text-zinc-400 hover:text-white" onClick={() => setToastVisible(false)}>
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      ) : null}
    </main>
  );
}
