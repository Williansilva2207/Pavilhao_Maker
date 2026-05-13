'use client';

import React, { useState, useEffect } from 'react';

interface Event {
  id: number;
  title: string;
  place: string;
  desc: string;
  color: string;
  date: string;
  rowStart: number;
  rowEnd: number;
  time?: string;
}

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSlot: (date: string, hour: string) => void;
}

const dayNames = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const hours = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];

export default function CalendarModal({ isOpen, onClose, onSelectSlot }: CalendarModalProps) {
  const [weekStart, setWeekStart] = useState(new Date(2024, 10, 11)); // Nov 11, 2024 (Monday)
  const [detailEvent, setDetailEvent] = useState<Event | null>(null);

  const initialEvents: Event[] = [
    { id: 1, title: 'Hacka of Wars', place: 'Laboratório de Inovação', desc: 'Competição de hacking.', color: '#4ade80', date: '2024-11-12', rowStart: 0, rowEnd: 2 },
    { id: 2, title: 'Copa do Mundo', place: 'Auditório Principal', desc: 'Transmissão dos jogos.', color: '#fb923c', date: '2024-11-13', rowStart: 2, rowEnd: 3 },
    { id: 3, title: 'Oficina Maker', place: 'Sala Maker 1', desc: 'Prototipagem.', color: '#fb923c', date: '2024-11-14', rowStart: 2, rowEnd: 6 },
    { id: 4, title: 'Oficina Marc.', place: 'Sala Maker 2', desc: 'Marcenaria.', color: '#facc15', date: '2024-11-15', rowStart: 2, rowEnd: 4 },
    { id: 5, title: 'Palestra Inov.', place: 'Auditório', desc: 'Palestra.', color: '#c084fc', date: '2024-11-13', rowStart: 4, rowEnd: 6 },
    { id: 6, title: 'Aula Design', place: 'Sala 404', desc: 'Aula especial.', color: '#60a5fa', date: '2024-11-14', rowStart: 4, rowEnd: 5 },
    { id: 7, title: 'Palestra Mot.', place: 'Auditório', desc: 'Palestra.', color: '#f472b6', date: '2024-11-15', rowStart: 6, rowEnd: 9 }
  ];

  const formatTime = (rowStart: number, rowEnd: number) => {
    return `${hours[rowStart]}:00 - ${hours[rowEnd]}:00`;
  };

  const formatLocalDate = (date: Date) => {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  };

  const getWeekTitle = () => {
    const end = new Date(weekStart);
    end.setDate(weekStart.getDate() + 6);
    return `${weekStart.getDate()} – ${end.getDate()} de ${weekStart.toLocaleDateString('pt-BR', { month: 'long' })} de ${weekStart.getFullYear()}`;
  };

  const navigateWeek = (days: number) => {
    const newDate = new Date(weekStart);
    newDate.setDate(weekStart.getDate() + days);
    setWeekStart(newDate);
  };

  if (!isOpen) return null;

  return (
    <div className="calendar-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="calendar-modal-content">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold font-space">Calendário de Ocupação</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigateWeek(-7)} className="p-2 hover:bg-zinc-50 border border-zinc-200 rounded">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <h4 className="text-lg font-bold font-space">{getWeekTitle()}</h4>
          <button onClick={() => navigateWeek(7)} className="p-2 hover:bg-zinc-50 border border-zinc-200 rounded">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="cal-grid border-t border-l border-[#edf0f5]">
            <div className="cal-cell-header">
              <span className="material-symbols-outlined text-zinc-400">schedule</span>
            </div>
            {dayNames.map((day, i) => {
              const d = new Date(weekStart);
              d.setDate(weekStart.getDate() + i);
              return (
                <div key={i} className="cal-cell-header">
                  {day} {d.getDate()}
                </div>
              );
            })}

            {hours.map((hour, r) => (
              <React.Fragment key={r}>
                <div className="cal-cell flex items-start justify-center pt-2 font-bold text-xs text-zinc-600">
                  {hour}:00
                </div>
                {[...Array(7)].map((_, c) => {
                  const cellDate = new Date(weekStart);
                  cellDate.setDate(weekStart.getDate() + c);
                  const dateStr = formatLocalDate(cellDate);
                  const ev = initialEvents.find(e => e.date === dateStr && e.rowStart === r);

                  if (ev) {
                    const height = (ev.rowEnd - ev.rowStart) * 70 - 4;
                    return (
                      <div key={c} className="cal-cell relative">
                        <div
                          className="event-card"
                          style={{ backgroundColor: ev.color, top: '3px', height: `${height}px` }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailEvent({ ...ev, time: formatTime(ev.rowStart, ev.rowEnd) });
                          }}
                        >
                          <span className="text-[10px] opacity-90">{formatTime(ev.rowStart, ev.rowEnd)}</span>
                          <p className="text-xs mt-0.5">{ev.title}</p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={c}
                      className="cal-cell empty-cell"
                      onClick={() => {
                        const dayOfWeek = cellDate.getDay();
                        if (dayOfWeek === 0) {
                          alert("❌ Reservas não são permitidas aos domingos. Escolha outro dia.");
                          return;
                        }
                        onSelectSlot(dateStr, `${hour}:00`);
                      }}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {detailEvent && (
        <div className="event-detail-popup" onClick={(e) => e.target === e.currentTarget && setDetailEvent(null)}>
          <div className="event-detail-card" style={{ borderColor: detailEvent.color }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold font-space">{detailEvent.title}</h3>
              <button onClick={() => setDetailEvent(null)} className="text-zinc-400 hover:text-zinc-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-zinc-500 uppercase text-xs">Horário</span>
                <p>{detailEvent.time}</p>
              </div>
              <div>
                <span className="font-semibold text-zinc-500 uppercase text-xs">Local</span>
                <p>{detailEvent.place}</p>
              </div>
              <div>
                <span className="font-semibold text-zinc-500 uppercase text-xs">Descrição</span>
                <p>{detailEvent.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
