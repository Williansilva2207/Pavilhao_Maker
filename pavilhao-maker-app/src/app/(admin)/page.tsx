'use client';

import { useState, useEffect } from 'react';
import MetricCard from '@/components/MetricCard';
import CalendarGrid from '@/components/CalendarGrid';
import EventModal from '@/components/EventModal';
import { getDashboardStats, getConfirmedRequests } from '@/lib/services/supabaseServices';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rate: '0%' });
  const [events, setEvents] = useState<any[]>([]);
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const dashboardStats = await getDashboardStats();
        const confirmed = await getConfirmedRequests();
        setStats(dashboardStats);

        // Map Supabase events to Calendar format
        const mappedEvents = confirmed.map((item: any) => {
          const eventDate = new Date(item.event_data + 'T00:00:00');
          return {
            id: item.id.toString(),
            title: item.event_name,
            time: `${item.time_start.substring(0, 5)}–${item.time_finished.substring(0, 5)}`,
            location: item.indor_space,
            date: eventDate.getDate(),
            color: item.indor_space === 'maker' ? '#8b1e35' : '#c95a5a',
            fullData: item
          };
        });
        setEvents(mappedEvents);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-gutter">
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <MetricCard 
          label="Total Bookings" 
          value={loading ? '-' : stats.total.toString()} 
          description="Desde o início" 
          icon="event_available"
          trend="+4 este mês"
        />
        <MetricCard 
          label="Taxa de Ocupação" 
          value={loading ? '-' : stats.rate} 
          description="Solicitações atendidas" 
          icon="analytics"
          progress={loading ? 0 : parseInt(stats.rate)}
        />
        <MetricCard 
          label="Solicitações Pendentes" 
          value={loading ? '-' : stats.pending.toString()} 
          description="Aguardando Triagem" 
          icon="pending_actions"
          variant="tertiary"
        />
      </div>

      {/* Calendário e Sidebar Lateral */}
      <div className="grid grid-cols-12 gap-gutter items-start">
        <div className="col-span-12 lg:col-span-8 bg-white border border-zinc-200 shadow-sm overflow-x-auto">
          <div className="p-6 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-zinc-50 border border-zinc-200 rounded btn-scale">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <h2 className="text-[24px] font-bold font-space">
                {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </h2>
              <button className="p-2 hover:bg-zinc-50 border border-zinc-200 rounded btn-scale">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="px-4 py-2 border border-zinc-300 text-[12px] font-semibold rounded uppercase hover:bg-zinc-50 transition-colors btn-scale">Hoje</button>
              <button className="px-4 py-2 border border-zinc-300 text-[12px] font-semibold rounded uppercase bg-zinc-900 text-white btn-scale">Mês</button>
              <button className="px-4 py-2 border border-zinc-300 text-[12px] font-semibold rounded uppercase hover:bg-zinc-50 transition-colors btn-scale">Semana</button>
              <button className="px-4 py-2 border border-zinc-300 text-[12px] font-semibold rounded uppercase hover:bg-zinc-50 transition-colors btn-scale">Dia</button>
            </div>
          </div>
          
          <div className="p-4">
            {loading ? (
              <div className="py-20 text-center text-zinc-400">Buscando agenda...</div>
            ) : (
              <CalendarGrid events={events} onSelect={(event) => setActiveEvent(event)} />
            )}
          </div>
        </div>

        {/* Sidebar Lateral de Legenda */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter">
          <div className="bg-white border border-zinc-200 shadow-sm p-6 card-animated">
            <h4 className="text-[12px] font-bold text-on-surface tracking-widest uppercase mb-6 border-b border-zinc-100 pb-2 font-inter">
              Legenda de Atividades
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-tertiary-container/20 border-l-4 border-tertiary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-sm">payments</span>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight text-on-surface">Eventos Pagos</p>
                  <p className="text-[10px] text-secondary">Locações de estúdio e espaços privados</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary-container/20 border-l-4 border-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">handyman</span>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight text-on-surface">Workshops</p>
                  <p className="text-[10px] text-secondary">Treinamentos práticos e oficinas</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 border-l-4 border-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-600 text-sm">school</span>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-tight text-on-surface">Aulas Regulares</p>
                  <p className="text-[10px] text-secondary">Disciplinas acadêmicas e cursos longos</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-xl relative overflow-hidden card-animated">
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
                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 border border-green-500/50 uppercase tracking-widest">
                  Ativo
                </span>
              </div>
              <h3 className="text-white font-space text-[24px] font-bold mb-2 leading-tight">Sincronização Ativa</h3>
              <p className="text-zinc-400 text-xs mb-6">Todos os eventos do Pavilhão são replicados automaticamente no Teams e Outlook da coordenação.</p>
              <button className="w-full bg-white text-zinc-900 py-2 text-[12px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors btn-scale">
                Configurar Sincronização
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
          </div>
        </div>
      </div>

      {/* Próximas 24 Horas */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[32px] font-bold font-space">Próximas 24 Horas</h3>
          <a className="text-primary text-sm font-bold border-b border-primary hover:text-primary-container transition-all uppercase tracking-widest" href="#">
            Ver escala completa
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="bg-white border border-zinc-200 p-4 hover:border-primary transition-all group card-animated">
            <p className="text-[12px] font-semibold text-secondary mb-3 uppercase font-inter tracking-wider">09:00 - 12:00</p>
            <h5 className="font-bold text-on-surface mb-2 group-hover:text-primary transition-colors font-inter">Workshop Marcenaria Fina</h5>
            <div className="flex items-center gap-2 text-xs text-secondary">
              <span className="material-symbols-outlined text-xs">location_on</span>
              <span>Bancada 04, 05 e 06</span>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 p-4 hover:border-primary transition-all group card-animated">
            <p className="text-[12px] font-semibold text-secondary mb-3 uppercase font-inter tracking-wider">14:00 - 17:00</p>
            <h5 className="font-bold text-on-surface mb-2 group-hover:text-primary transition-colors font-inter">Projeto Integrador I</h5>
            <div className="flex items-center gap-2 text-xs text-secondary">
              <span className="material-symbols-outlined text-xs">location_on</span>
              <span>Laboratório de Prototipagem</span>
            </div>
          </div>
          <div className="bg-white border border-zinc-200 p-4 hover:border-primary transition-all group card-animated">
            <p className="text-[12px] font-semibold text-secondary mb-3 uppercase font-inter tracking-wider">18:00 - 22:00</p>
            <h5 className="font-bold text-on-surface mb-2 group-hover:text-primary transition-colors font-inter">Locação: Estúdio Audiovisual</h5>
            <div className="flex items-center gap-2 text-xs text-secondary">
              <span className="material-symbols-outlined text-xs">location_on</span>
              <span>Estúdio A</span>
            </div>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 border-dashed p-4 flex flex-col justify-center items-center text-center opacity-70 card-animated">
            <span className="material-symbols-outlined text-secondary mb-2">add_circle</span>
            <p className="text-[12px] font-bold text-secondary uppercase tracking-tighter">Horário Disponível</p>
          </div>
        </div>
      </section>

      {activeEvent && (
        <EventModal 
          event={activeEvent} 
          open={Boolean(activeEvent)} 
          onClose={() => setActiveEvent(null)} 
        />
      )}
    </div>
  );
}
