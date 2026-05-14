'use client';

import { useState, useEffect } from 'react';
import { getDashboardStats, getConfirmedRequests } from '@/lib/services/supabaseServices';

export default function CalendarioPage() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rate: '0%' });
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
    getConfirmedRequests().then(data => {
      const formattedEvents = data.map(req => {
        // Correção de timezone para dia exato
        const [year, month, day] = req.event_data.split('-');
        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        
        let col = dateObj.getDay();
        if (col === 0) col = 1; // Ajuste temporário domingo -> segunda

        // Evitar falha caso time_start venha vazio
        const tStart = req.time_start || '09:00:00';
        const tEnd = req.time_finished || '10:00:00';

        const [startH, startM] = tStart.split(':').map(Number);
        const [endH, endM] = tEnd.split(':').map(Number);

        const durationMins = (endH * 60 + endM) - (startH * 60 + startM);
        const height = `${Math.max(durationMins * 1.3, 30)}px`; // min height 30px
        const top = `${startM * 1.3}px`;

        let typeClasses = '';
        let badgeClasses = '';

        switch (req.activity_type?.toLowerCase()) {
          case 'evento-pago':
            typeClasses = 'bg-yellow-50 border-yellow-400 text-zinc-700';
            badgeClasses = 'bg-yellow-500';
            break;
          case 'oficina':
            typeClasses = 'bg-orange-50 border-orange-400 text-zinc-700';
            badgeClasses = 'bg-orange-500';
            break;
          case 'aula':
            typeClasses = 'bg-sky-50 border-sky-400 text-zinc-700';
            badgeClasses = 'bg-sky-500';
            break;
          default:
            typeClasses = 'bg-zinc-50 border-zinc-400 text-zinc-700';
            badgeClasses = 'bg-zinc-500';
        }

        return {
          id: req.id,
          title: req.event_name || req.space || 'Atividade',
          time: `${tStart.substring(0, 5)} - ${tEnd.substring(0, 5)}`,
          hourBlock: startH,
          col,
          top,
          height,
          typeClasses,
          badgeClasses
        };
      });
      setEvents(formattedEvents);
    });
  }, []);

  return (
    <div className="animate-fade-in pb-12">
      
      {/* MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 border border-zinc-200 shadow-sm flex flex-col justify-between card-animated">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-bold text-zinc-500 tracking-widest uppercase font-inter">Total Bookings</span>
            <span className="material-symbols-outlined text-[#8b5000]">event_available</span>
          </div>
          <div>
            <span className="text-4xl font-bold text-zinc-900 font-space">{stats.total || 32}</span>
            <span className="text-green-600 text-sm font-medium ml-2">+4 este mês</span>
          </div>
        </div>
        
        <div className="bg-white p-6 border border-zinc-200 shadow-sm flex flex-col justify-between card-animated">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-bold text-zinc-500 tracking-widest uppercase font-inter">Taxa de Ocupação</span>
            <span className="material-symbols-outlined text-[#8b5000]">analytics</span>
          </div>
          <div>
            <span className="text-4xl font-bold text-zinc-900 font-space">{stats.rate || '78%'}</span>
            <div className="w-full bg-zinc-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#8b5000] h-full" style={{ width: stats.rate || '78%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 border border-zinc-200 shadow-sm flex flex-col justify-between border-b-4 border-b-[#e0a800] card-animated">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-bold text-zinc-500 tracking-widest uppercase font-inter">Solicitações Pendentes</span>
            <span className="material-symbols-outlined text-[#e0a800]">pending_actions</span>
          </div>
          <div>
            <span className="text-4xl font-bold text-zinc-900 font-space">{stats.pending || 12}</span>
            <p className="text-[12px] font-bold text-zinc-500 mt-1 uppercase font-inter">Aguardando Triagem</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* CALENDÁRIO */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-zinc-200 shadow-sm overflow-x-auto">
          {/* Calendar Header */}
          <div className="p-6 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-zinc-50 border border-zinc-200 rounded btn-scale flex items-center justify-center text-zinc-600">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <h2 className="text-2xl font-bold font-space text-zinc-800">Novembro 2026</h2>
              <button className="p-2 hover:bg-zinc-50 border border-zinc-200 rounded btn-scale flex items-center justify-center text-zinc-600">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="px-4 py-2 border border-zinc-300 font-bold text-[12px] rounded uppercase hover:bg-zinc-50 transition-colors btn-scale text-zinc-600 font-inter">Hoje</button>
              <button className="px-4 py-2 border border-zinc-300 font-bold text-[12px] rounded uppercase hover:bg-zinc-50 transition-colors btn-scale bg-zinc-900 text-white font-inter">Mês</button>
              <button className="px-4 py-2 border border-zinc-300 font-bold text-[12px] rounded uppercase hover:bg-zinc-50 transition-colors btn-scale text-zinc-600 font-inter">Semana</button>
              <button className="px-4 py-2 border border-zinc-300 font-bold text-[12px] rounded uppercase hover:bg-zinc-50 transition-colors btn-scale text-zinc-600 font-inter">Dia</button>
            </div>
          </div>

          {/* Grid do Calendário (Fidelidade HTML) */}
          <div className="relative w-full min-w-[950px] scrollable-calendar">
            <div className="calendar-grid-new border-t border-l border-[#edf0f5]">
              {/* Header Row */}
              <div className="flex items-center justify-center border-r border-b border-[#edf0f5] h-20 bg-zinc-50/50">
                <span className="material-symbols-outlined text-3xl text-zinc-300">schedule</span>
              </div>
              {['Segunda 12', 'Terça 13', 'Quarta 14', 'Quinta 15', 'Sexta 16', 'Sábado 17'].map((day, i) => (
                <div key={i} className="flex items-center justify-center font-bold text-sm text-zinc-600 border-r border-b border-[#edf0f5] h-20 bg-zinc-50/50">
                  {day}
                </div>
              ))}

              {/* Time Rows */}
              {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((hour) => (
                <div key={hour} className="contents">
                  <div className="flex justify-center pt-3 font-bold text-zinc-400 border-r border-b border-[#edf0f5] h-[78px]">
                    {String(hour).padStart(2, '0')}
                  </div>
                  {[1, 2, 3, 4, 5, 6].map((col) => (
                    <div key={`${hour}-${col}`} className="relative border-r border-b border-[#edf0f5] h-[78px]">
                      {/* Render dynamic events */}
                      {events.map(ev => {
                        if (ev.hourBlock === hour && ev.col === col) {
                          return (
                            <div 
                              key={ev.id} 
                              className={`event-card border-2 ${ev.typeClasses} absolute w-full`} 
                              style={{ top: ev.top, height: ev.height, zIndex: 10, left: 0 }}
                            >
                              <span className={`inline-block text-white px-2 py-0.5 rounded text-[11px] mr-1 mb-2 ${ev.badgeClasses}`}>
                                {ev.time.split(' - ')[0]}
                              </span>
                              {ev.time.split(' - ')[1] && (
                                <span className={`inline-block text-white px-2 py-0.5 rounded text-[11px] mb-2 ${ev.badgeClasses}`}>
                                  {ev.time.split(' - ')[1]}
                                </span>
                              )}
                              <p className="leading-tight mt-1 text-xs font-medium">{ev.title}</p>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          <div className="bg-white border border-zinc-200 shadow-sm p-6 card-animated">
            <h4 className="text-[12px] font-bold text-zinc-800 tracking-widest uppercase mb-6 border-b border-zinc-100 pb-2 font-inter">Legenda de Atividades</h4>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-50 border-l-4 border-yellow-500 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-yellow-600 text-lg">payments</span>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight text-zinc-800">Eventos Pagos</p>
                  <p className="text-xs text-zinc-500 leading-snug">Locações de estúdio e espaços privados</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-50 border-l-4 border-orange-500 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-orange-600 text-lg">handyman</span>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight text-zinc-800">Workshops</p>
                  <p className="text-xs text-zinc-500 leading-snug">Treinamentos práticos e oficinas</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 border-l-4 border-blue-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-blue-600 text-lg">school</span>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight text-zinc-800">Aulas Regulares</p>
                  <p className="text-xs text-zinc-500 leading-snug">Disciplinas acadêmicas e cursos longos</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e1e1e] text-white p-6 rounded-lg shadow-xl relative overflow-hidden card-animated">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">mail</span>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">groups</span>
                  </div>
                </div>
                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 border border-green-500/50 uppercase tracking-widest rounded-sm">Ativo</span>
              </div>
              <h3 className="text-white font-space text-2xl font-bold mb-2">Sincronização Ativa</h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">Todos os eventos do Pavilhão são replicados automaticamente no Teams e Outlook da coordenação.</p>
              <button className="w-full bg-white text-zinc-900 py-3 font-bold text-[11px] uppercase tracking-widest hover:bg-zinc-200 transition-colors btn-scale rounded-sm font-inter">
                Configurar Sincronização
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
          </div>

          <div className="bg-zinc-50 border border-zinc-200 p-6 flex items-start gap-4 card-animated">
            <span className="material-symbols-outlined text-red-600 mt-0.5">warning</span>
            <div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1 font-space">Manutenção Programada</p>
              <p className="text-sm text-zinc-600 leading-relaxed">A Router CNC estará indisponível no dia 15/11 para calibragem semestral.</p>
            </div>
          </div>

        </div>
      </div>

      {/* PRÓXIMAS 24H */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold font-space text-zinc-800">Próximas 24 Horas</h3>
          <a className="text-[#8b5000] text-sm font-bold border-b border-[#8b5000] hover:text-[#6b3d00] hover:border-[#6b3d00] transition-all uppercase tracking-widest" href="#">
            Ver escala completa
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-zinc-200 p-5 hover:border-[#8b5000] transition-all group card-animated">
            <p className="text-[11px] font-bold text-zinc-500 mb-3 uppercase tracking-wider font-inter">09:00 - 12:00</p>
            <h5 className="font-bold text-zinc-800 mb-2 group-hover:text-[#8b5000] transition-colors text-lg leading-tight">Workshop Marcenaria Fina</h5>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-4">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span>Bancada 04, 05 e 06</span>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 p-5 hover:border-[#8b5000] transition-all group card-animated">
            <p className="text-[11px] font-bold text-zinc-500 mb-3 uppercase tracking-wider font-inter">14:00 - 17:00</p>
            <h5 className="font-bold text-zinc-800 mb-2 group-hover:text-[#8b5000] transition-colors text-lg leading-tight">Projeto Integrador I</h5>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-4">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span>Laboratório de Prototipagem</span>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 p-5 hover:border-[#8b5000] transition-all group card-animated">
            <p className="text-[11px] font-bold text-zinc-500 mb-3 uppercase tracking-wider font-inter">18:00 - 22:00</p>
            <h5 className="font-bold text-zinc-800 mb-2 group-hover:text-[#8b5000] transition-colors text-lg leading-tight">Locação: Estúdio Audiovisual</h5>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-4">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span>Estúdio A</span>
            </div>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 border-dashed p-5 flex flex-col justify-center items-center text-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer card-animated group">
            <span className="material-symbols-outlined text-zinc-400 mb-3 text-3xl group-hover:text-[#8b5000] transition-colors">add_circle</span>
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-inter group-hover:text-[#8b5000] transition-colors">Horário Disponível</p>
          </div>
        </div>
      </section>

    </div>
  );
}
