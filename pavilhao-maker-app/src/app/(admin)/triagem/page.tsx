'use client';

import { useState, useEffect } from 'react';
import { getPendingRequests, approveRequest, rejectRequest } from '@/lib/services/supabaseServices';

export default function TriagemPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    setLoading(true);
    const data = await getPendingRequests();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleApprove = async (id: number) => {
    if (confirm('Deseja realmente aprovar esta solicitação?')) {
      try {
        await approveRequest(id);
        loadRequests();
      } catch (err) {
        alert('Erro ao aprovar solicitação');
      }
    }
  };

  const handleReject = async (id: number) => {
    if (confirm('Deseja realmente REJEITAR (deletar) esta solicitação?')) {
      try {
        await rejectRequest(id);
        loadRequests();
      } catch (err) {
        alert('Erro ao rejeitar solicitação');
      }
    }
  };

  // Lógica para determinar se é urgente (ex: evento nas próximas 48h)
  const isUrgent = (eventDate: string) => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 2;
  };

  const getVisualConfig = (activityType: string) => {
    switch (activityType?.toLowerCase()) {
      case 'evento-pago':
        return {
          type: 'EVENTO PAGO',
          icon: 'payments',
          iconBg: 'bg-yellow-50 text-yellow-700',
          border: 'border-yellow-200',
          stripe: 'bg-yellow-500',
          badge: 'bg-yellow-50 text-yellow-700 border-yellow-200'
        };
      case 'oficina':
        return {
          type: 'OFICINA',
          icon: 'handyman',
          iconBg: 'bg-orange-50 text-orange-500',
          border: 'border-orange-200',
          stripe: 'bg-orange-500',
          badge: 'bg-orange-50 text-orange-700 border-orange-200'
        };
      case 'aula':
        return {
          type: 'AULA',
          icon: 'school',
          iconBg: 'bg-blue-50 text-blue-600',
          border: 'border-zinc-200',
          stripe: 'bg-blue-600',
          badge: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      default:
        return {
          type: 'OUTRO',
          icon: 'event',
          iconBg: 'bg-zinc-50 text-zinc-600',
          border: 'border-zinc-200',
          stripe: 'bg-zinc-400',
          badge: 'bg-zinc-50 text-zinc-700 border-zinc-200'
        };
    }
  };

  const urgentCount = requests.filter(r => isUrgent(r.event_data)).length;

  return (
    <>
      <div className="animate-fade-in">
      {/* Filtros e Estatísticas */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
        <div className="flex gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-space">TIPO DE ATIVIDADE</label>
            <select className="block w-48 border border-zinc-200 bg-white text-sm font-inter px-3 py-2 rounded-sm focus:border-[#c95a5a] focus:ring-0 outline-none">
              <option>Todos os tipos</option>
              <option>Eventos Pagos</option>
              <option>Workshops</option>
              <option>Aulas</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-space">STATUS</label>
            <select className="block w-48 border border-zinc-200 bg-white text-sm font-inter px-3 py-2 rounded-sm focus:border-[#c95a5a] focus:ring-0 outline-none">
              <option>Pendentes</option>
              <option>Aprovados</option>
              <option>Rejeitados</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-8 border-l border-zinc-200 pl-8">
          <div className="text-right">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-space">TOTAL PENDENTE</p>
            <p className="text-[32px] font-bold text-[#8b5000] leading-none font-space">{loading ? '...' : requests.length}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-space">URGÊNCIA ALTA</p>
            <p className="text-[32px] font-bold text-red-600 leading-none font-space">{loading ? '...' : String(urgentCount).padStart(2, '0')}</p>
          </div>
        </div>
      </div>

      {/* Lista de Solicitações */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center text-zinc-400 font-inter">Buscando solicitações no banco de dados...</div>
        ) : requests.length === 0 ? (
          <div className="py-20 text-center text-zinc-400 font-inter">Nenhuma solicitação pendente encontrada.</div>
        ) : (
          requests.map((req) => {
            const config = getVisualConfig(req.activity_type);
            const urgent = isUrgent(req.event_data);
            
            return (
              <div key={req.id} className={`bg-white border-2 ${urgent ? 'border-red-200 shadow-red-100' : 'border-zinc-100'} rounded-sm shadow-sm hover:shadow-md transition-all relative overflow-hidden request-card group`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${urgent ? 'bg-red-600' : config.stripe}`}></div>
                
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-sm transition-transform group-hover:scale-110 ${urgent ? 'bg-red-100 text-red-600' : config.iconBg}`}>
                      <span className="material-symbols-outlined text-2xl">{urgent ? 'priority_high' : config.icon}</span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-8 flex-1">
                      <div className="col-span-1">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded border uppercase tracking-tighter ${config.badge}`}>
                          {config.type}
                        </span>
                        <h4 className="text-lg font-bold text-zinc-900 mt-1 font-inter truncate" title={req.event_name}>
                          {req.event_name}
                        </h4>
                      </div>
                      
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-space mb-1">REQUISITANTE</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-zinc-700 truncate">{req.solicitante?.name || 'Anônimo'}</p>
                          <a href={`mailto:${req.solicitante?.email}`} className="material-symbols-outlined text-green-500 text-lg cursor-pointer hover:scale-125 transition-transform">chat</a>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-space mb-1">HORÁRIO</p>
                        <p className="text-sm font-medium text-zinc-600 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">schedule</span> 
                          {req.time_start?.substring(0, 5)} - {req.time_finished?.substring(0, 5)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-space mb-1">STATUS</p>
                        <span className="flex items-center gap-1.5 text-sm font-bold text-amber-600">
                          <span className="w-2 h-2 rounded-full bg-amber-600"></span> 
                          Pendente
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleReject(req.id)}
                      className="px-4 py-2 border border-zinc-200 text-zinc-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all font-bold text-[11px] uppercase tracking-widest btn-scale"
                    >
                      REJEITAR
                    </button>
                    <button 
                      onClick={() => handleApprove(req.id)}
                      className="px-4 py-2 bg-[#8b5000] text-white hover:bg-[#6b3d00] transition-all font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-orange-900/10 btn-scale"
                    >
                      APROVAR
                    </button>
                  </div>
                </div>

                {urgent && (
                  <div className="bg-red-50 px-5 py-2 flex justify-between items-center border-t border-red-100">
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest flex items-center gap-1 animate-pulse">
                      <span className="material-symbols-outlined text-[14px]">warning</span> 
                      URGENTE: Evento programado para {new Date(req.event_data).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="text-[10px] text-red-300 font-mono font-bold tracking-tighter">REF: EVT-{req.id}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-12 text-center p-8 border border-dashed border-zinc-200 rounded-sm bg-zinc-50/50">
        <p className="text-zinc-400 text-sm italic font-inter">Fim das solicitações pendentes para hoje.</p>
        <button className="mt-4 text-[#8b5000] font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 mx-auto hover:underline transition-all">
          <span className="material-symbols-outlined text-sm">history</span> 
          VER HISTÓRICO DE TRIAGEM
        </button>
      </div>
    </div>

    <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#8b5000] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[60] group">
      <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-90">add</span>
    </button>
  </>
  );
}
