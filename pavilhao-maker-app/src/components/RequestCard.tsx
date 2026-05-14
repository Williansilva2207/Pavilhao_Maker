'use client';

type RequestCardProps = {
  id: string;
  title: string;
  requester: string;
  space: string;
  submitted: string;
  time: string;
  status: string;
  type: 'EVENTO PAGO' | 'WORKSHOP' | 'AULA' | 'MAKER' | 'PAVILHÃO';
  isUrgent?: boolean;
  onAction: (action: 'aprovado' | 'rejeitado') => void;
};

export default function RequestCard({
  id,
  title,
  requester,
  space,
  submitted,
  time,
  status,
  type,
  isUrgent,
  onAction,
}: RequestCardProps) {
  
  const getTypeStyles = () => {
    switch (type) {
      case 'EVENTO PAGO': return 'bg-[#FFD700]/20 text-[#8B6508] border-[#FFD700]/40';
      case 'WORKSHOP': return 'bg-primary-container/20 text-on-primary-container border-primary-container/40';
      case 'AULA': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-zinc-100 text-zinc-600 border-zinc-200';
    }
  };

  const getIcon = () => {
    if (isUrgent) return 'priority_high';
    switch (type) {
      case 'WORKSHOP': return 'handyman';
      case 'AULA': return 'school';
      default: return 'event';
    }
  };

  return (
    <div className={`bg-white border ${isUrgent ? 'border-error/20' : 'border-zinc-200'} rounded-sm shadow-sm hover:shadow-md transition-shadow relative overflow-hidden request-card`}>
      {isUrgent && <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>}
      
      <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6 flex-1 w-full">
          <div className={`w-12 h-12 flex items-center justify-center rounded-sm ${isUrgent ? 'bg-error-container text-error' : 'bg-surface-container text-zinc-400'}`}>
            <span className="material-symbols-outlined text-2xl">{getIcon()}</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 flex-1">
            <div className="col-span-1">
              <span className={`px-2 py-0.5 font-space text-[10px] rounded border uppercase tracking-wider ${getTypeStyles()}`}>
                {type}
              </span>
              <h4 className="font-space text-lg font-bold text-zinc-900 mt-1 truncate max-w-[200px]" title={title}>
                {title}
              </h4>
            </div>
            
            <div>
              <p className="font-inter text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-widest">REQUISITANTE</p>
              <div className="flex items-center gap-2">
                <p className="font-inter text-sm font-semibold text-zinc-900">{requester}</p>
                <span className="material-symbols-outlined text-green-500 text-lg cursor-pointer hover:scale-110 transition-transform">chat</span>
              </div>
            </div>
            
            <div>
              <p className="font-inter text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-widest">HORÁRIO</p>
              <p className="font-inter text-sm flex items-center gap-1 text-zinc-700">
                <span className="material-symbols-outlined text-xs">schedule</span> {time}
              </p>
            </div>
            
            <div>
              <p className="font-inter text-[10px] font-bold text-on-surface-variant mb-1 uppercase tracking-widest">STATUS</p>
              <span className="flex items-center gap-1 text-sm font-medium text-amber-600">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span> {status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => onAction('rejeitado')}
            className="flex-1 md:flex-none px-4 py-2 border border-zinc-200 text-zinc-500 hover:text-error hover:bg-error-container transition-colors font-space text-xs font-bold btn-scale uppercase tracking-widest"
          >
            REJEITAR
          </button>
          <button 
            onClick={() => onAction('aprovado')}
            className="flex-1 md:flex-none px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors font-space text-xs font-bold btn-scale uppercase tracking-widest"
          >
            APROVAR
          </button>
        </div>
      </div>
      
      {isUrgent && (
        <div className="bg-error/5 px-5 py-2 flex justify-between items-center border-t border-error/10">
          <span className="text-[10px] font-bold text-error uppercase tracking-widest flex items-center gap-1 font-space">
            <span className="material-symbols-outlined text-[12px]">warning</span> URGENTE: Solicitação enviada em curto prazo
          </span>
          <span className="text-[10px] text-error/60 font-mono">REF: {id}</span>
        </div>
      )}
    </div>
  );
}
