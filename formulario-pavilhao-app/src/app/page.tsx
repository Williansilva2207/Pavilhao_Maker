
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { getConfirmedForms } from '@/lib/services/supabaseServices';

const dayNames = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const hours = ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  rowStart: number;
  rowEnd: number;
  color: string;
  space: string;
  time: string;
  desc: string;
}

export default function HomePage() {
  const router = useRouter();
  
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [detailEvent, setDetailEvent] = useState<CalendarEvent | null>(null);
  const [multipleEvents, setMultipleEvents] = useState<CalendarEvent[] | null>(null);
  const [wizardStep, setWizardStep] = useState(0); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pavilhao' | 'maker'>('all');
  const searchParams = useSearchParams();
  const [toast, setToast] = useState<{ visible: boolean; title: string; message: string; type: 'success' | 'error' | 'info' }>({ 
    visible: false, title: '', message: '', type: 'info' 
  });
  
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    celular: '',
    espaco: null as 'Pavilhão' | 'Maker' | null,
    data: '',
    inicio: ''
  });

  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  };

  const [weekStart, setWeekStart] = useState(getStartOfWeek(new Date()));
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const isLoaded = useRef(false);
  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ visible: true, title, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 5000);
  };

  const fetchConfirmedEvents = async () => {
    const data = await getConfirmedForms();
    const mapped: CalendarEvent[] = data.map((item: any) => {
      const startH = parseInt(item.time_start.split(':')[0]);
      const endH = parseInt(item.time_finished.split(':')[0]);
      
      return {
        id: item.id,
        title: item.event_name || 'Evento',
        date: item.event_data,
        rowStart: hours.indexOf(String(startH).padStart(2, '0')),
        rowEnd: hours.indexOf(String(endH).padStart(2, '0')),
        color: item.indor_space === 'maker' ? '#8b1e35' : '#c95a5a',
        space: item.indor_space,
        time: `${item.time_start.substring(0, 5)} - ${item.time_finished.substring(0, 5)}`,
        desc: item.description || ''
      };
    });
    setEvents(mapped);
  };

  useEffect(() => {
    const saved = localStorage.getItem('pavilhao_form_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Error loading form data", e);
      }
    }
    setTimeout(() => {
      isLoaded.current = true;
    }, 0);
    
    fetchConfirmedEvents();
  }, []);

  useEffect(() => {
    if (isLoaded.current) {
      localStorage.setItem('pavilhao_form_user', JSON.stringify(formData));
    }
  }, [formData]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = formatPhone(e.target.value);
    setFormData({ ...formData, celular: masked });
  };
  const formatTime = (rowStart: number, rowEnd: number) => {
    return `${hours[rowStart]}:00 - ${hours[rowEnd]}:00`;
  };

  const formatLocalDate = (date: Date) => {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  };

  const navigateWeek = (days: number) => {
    const today = getStartOfWeek(new Date());
    today.setHours(0, 0, 0, 0);
    const newDate = new Date(weekStart);
    newDate.setDate(weekStart.getDate() + days);
    newDate.setHours(0, 0, 0, 0);

    if (newDate < today) return;
    
    setWeekStart(newDate);
  };

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccessModal(true);
      router.replace('/');
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (calendarOpen) {
      setWeekStart(getStartOfWeek(new Date()));
    }
  }, [calendarOpen]);

  const handleMainFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || formData.nome.trim().length < 3) {
      showToast('Nome Incompleto', 'Por favor, insira seu nome completo.', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      showToast('E-mail Inválido', 'Por favor, insira um e-mail válido.', 'error');
      return;
    }
    const phoneDigits = formData.celular.replace(/\D/g, '');
    if (!formData.celular || phoneDigits.length < 11) {
      showToast('Telefone Incompleto', 'O número deve ter 11 dígitos (DDD + 9 números).', 'error');
      return;
    }
    if (!formData.espaco) {
      showToast('Espaço não selecionado', 'Por favor, escolha entre Pavilhão ou Maker.', 'error');
      return;
    }
    router.push(formData.espaco === 'Maker' ? '/maker' : '/pavilhao');
  };

  return (
    <main className="min-h-screen industrial-grid">
      <header className="h-16 bg-white border-b flex items-center justify-between px-8">
        <h2 className="font-space text-[24px] font-semibold header-title cursor-default">Solicitação de Reserva do Pavilhão Maker</h2>
      </header>

      <section className="relative bg-[#f4f4f5] overflow-hidden hero-header">
        <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 pointer-events-none">
          <span className="material-symbols-outlined !text-[240px] text-zinc-200/60 select-none">domain</span>
        </div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            <div className="flex flex-col items-start justify-center">
              <div className="relative cursor-default">
                <span className="material-symbols-outlined !text-[128px] md:!text-[144px] text-zinc-800 transition-transform duration-500 hero-icon hero-icon-main">
                  event_seat
                </span>
                <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#c95a5a] text-white text-[12px] font-bold shadow-lg hero-badge">
                  <span className="material-symbols-outlined !text-[14px]">edit_calendar</span>
                </span>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                <span className="material-symbols-outlined !text-[14px]">schedule</span> Antecedência mínima 48h
              </div>
              <button
                onClick={() => setCalendarOpen(true)}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-300 rounded-full text-[12px] font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 transition-all"
              >
                <span className="material-symbols-outlined !text-[14px]">calendar_month</span> Ver Calendário
              </button>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h2 className="font-space text-[48px] md:text-[72px] font-black uppercase tracking-tight text-zinc-900 leading-[1.1] text-balance title-reserva cursor-default">
                  Reserva do
                </h2>
                <p className="font-space text-[24px] md:text-[36px] font-light text-zinc-500 mt-2 tracking-wide title-pavilhao cursor-default">
                  Pavilhão & Maker
                </p>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#c95a5a] to-[#8b1e35] mt-4 rounded-full" />
              </div>

              <div className="space-y-4 max-w-2xl">
                <div className="flex gap-4">
                  <span className="hidden sm:block w-1.5 flex-shrink-0 bg-zinc-800 rounded-full" />
                  <p className="text-[18px] md:text-[20px] text-zinc-700 leading-relaxed font-light">
                    Formulário para solicitação de reserva do <strong className="font-semibold">Espaço do Pavilhão</strong> (eventos) ou do <strong className="font-semibold">Espaço Maker</strong> (máquinas).
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="hidden sm:block w-1.5 flex-shrink-0 bg-zinc-300 rounded-full" />
                  <p className="text-[16px] md:text-[18px] text-zinc-600 leading-relaxed font-light">
                    A reserva deve ser solicitada por um docente responsável, respeitando o horário de funcionamento (seg-sex: 7h30–21h, sáb: 7h30–11h30). A prioridade é dada a eventos com metodologias ativas, workshops e atividades multidisciplinares.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="hidden sm:block w-1.5 flex-shrink-0 bg-zinc-300 rounded-full" />
                  <p className="text-[16px] md:text-[18px] text-zinc-600 leading-relaxed font-light">
                    Após o envio, aguarde a confirmação por e-mail. Seus dados pessoais não serão coletados automaticamente.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-dashed border-zinc-300 flex items-center gap-4 text-[12px] tracking-widest uppercase text-zinc-400">
                <span className="material-symbols-outlined !text-[14px]">schedule</span> Seg-Sex: 7h30 – 21h00 | Sáb: 7h30 – 11h30
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-10 relative overflow-hidden">
        <div className="absolute inset-0">
          <span className="material-symbols-outlined absolute left-[2%] top-[10%] !text-[192px] text-[#c95a5a] ambient-icon -rotate-12" style={{ opacity: 0.15 }}>precision_manufacturing</span>
          <span className="material-symbols-outlined absolute left-[3%] top-[45%] !text-[128px] text-[#b94d4d] ambient-icon rotate-45" style={{ opacity: 0.2 }}>view_in_ar</span>
          <span className="material-symbols-outlined absolute left-[4%] top-[75%] !text-[144px] text-[#c95a5a] ambient-icon -rotate-15" style={{ opacity: 0.18 }}>engineering</span>
          <span className="material-symbols-outlined absolute right-[2%] top-[15%] !text-[176px] text-[#8b1e35] ambient-icon rotate-12" style={{ opacity: 0.15 }}>memory</span>
          <span className="material-symbols-outlined absolute right-[4%] top-[50%] !text-[144px] text-[#c95a5a] ambient-icon -rotate-45" style={{ opacity: 0.2 }}>handyman</span>
          <span className="material-symbols-outlined absolute right-[5%] top-[82%] !text-[112px] text-zinc-800 ambient-icon -rotate-90" style={{ opacity: 0.12 }}>settings</span>
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

        <div className="max-w-4xl mx-auto relative z-10 overflow-hidden rounded-[32px] shadow-2xl border-l-8 border-[#4a0e1c] bg-gradient-to-br from-[#c95a5a] via-[#b94d4d] to-[#8b1e35] p-10 text-white form-card-hover">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/20 blur-3xl rounded-full" />
          <div className="relative">
            <h1 className="font-space text-[30px] mb-8 label-hover inline-block">Dados do solicitante</h1>
            <form className="space-y-8" onSubmit={handleMainFormSubmit}>
              <div className="group">
                <label className="block mb-2 text-[18px] label-hover">Email <span className="required-asterisk">*</span></label>
                <input 
                  type="email" 
                  placeholder="Digite seu email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover outline-none !bg-white" 
                />
              </div>
              <div className="group">
                <label className="block mb-2 text-[18px] label-hover">Nome <span className="required-asterisk">*</span></label>
                <input 
                  type="text" 
                  placeholder="Digite seu nome" 
                  required 
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover outline-none !bg-white" 
                />
              </div>
              <div className="group">
                <label className="block mb-2 text-[18px] label-hover">Celular <span className="required-asterisk">*</span></label>
                <input 
                  type="tel" 
                  placeholder="(81) 99999-9999" 
                  required 
                  value={formData.celular}
                  onChange={handlePhoneChange}
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover outline-none !bg-white" 
                />
              </div>
              <div>
                <p className="text-[20px] mb-4 label-hover inline-block">Escolha o espaço <span className="required-asterisk">*</span></p>
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="cursor-pointer">
                    <input 
                      type="radio" 
                      name="espaco" 
                      value="Pavilhão" 
                      className="peer hidden" 
                      checked={formData.espaco === 'Pavilhão'} 
                      onChange={() => setFormData({ ...formData, espaco: 'Pavilhão' })} 
                    />
                    <div className="p-6 rounded-2xl bg-white/10 border border-white/30 transition-all card-option peer-checked:bg-white peer-checked:text-black peer-checked:shadow-[0_0_30px_rgba(255,180,120,0.7)]">
                      <h3 className="text-[20px] font-space">Espaço Pavilhão</h3>
                      <p className="text-[14px]">Lounge/Co-work</p>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input 
                      type="radio" 
                      name="espaco" 
                      value="Maker" 
                      className="peer hidden" 
                      checked={formData.espaco === 'Maker'} 
                      onChange={() => setFormData({ ...formData, espaco: 'Maker' })} 
                    />
                    <div className="p-6 rounded-2xl bg-white/10 border border-white/30 transition-all card-option peer-checked:bg-white peer-checked:text-black peer-checked:shadow-[0_0_30px_rgba(255,180,120,0.7)]">
                      <h3 className="text-[20px] font-space">Espaço Maker</h3>
                      <p className="text-[14px]">Máquinas / Prototipagem</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex justify-center pt-6">
                <button type="submit" className="bg-[#7f1d35] px-8 py-4 rounded-xl text-white text-[20px] transition-all btn-hover hover:bg-black hover:-translate-y-1 hover:shadow-xl active:scale-95">
                  Avançar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {calendarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={() => setCalendarOpen(false)}>
          <div className="bg-white rounded-[24px] p-6 w-full max-w-[1100px] max-h-[85vh] overflow-auto shadow-2xl relative border border-black/5" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <h3 className="text-[24px] font-bold font-space flex items-center gap-3">
                <span className="material-symbols-outlined text-[#c95a5a]">calendar_month</span>
                Calendário de Ocupação
              </h3>
              
              <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-[12px] font-bold uppercase tracking-wider transition-all ${filter === 'all' ? 'bg-white shadow-sm text-black' : 'text-zinc-500 hover:text-zinc-800'}`}
                >
                  Todos
                </button>
                <button 
                  onClick={() => setFilter('pavilhao')}
                  className={`px-4 py-2 rounded-lg text-[12px] font-bold uppercase tracking-wider transition-all ${filter === 'pavilhao' ? 'bg-[#c95a5a] text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-800'}`}
                >
                  Pavilhão
                </button>
                <button 
                  onClick={() => setFilter('maker')}
                  className={`px-4 py-2 rounded-lg text-[12px] font-bold uppercase tracking-wider transition-all ${filter === 'maker' ? 'bg-[#8b1e35] text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-800'}`}
                >
                  Maker
                </button>
              </div>

              <button onClick={() => setCalendarOpen(false)} className="text-zinc-400 hover:text-zinc-600 p-2">
                <span className="material-symbols-outlined !text-[24px]">close</span>
              </button>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => navigateWeek(-7)} className="p-2 hover:bg-zinc-50 border border-zinc-200 rounded">
                <span className="material-symbols-outlined !text-[24px]">chevron_left</span>
              </button>
              <h4 className="text-[18px] font-bold font-space">
                {weekStart.getDate()} – {new Date(weekStart.getTime() + 6*86400000).getDate()} de {weekStart.toLocaleDateString('pt-BR', { month: 'long' })} de {weekStart.getFullYear()}
              </h4>
              <button onClick={() => navigateWeek(7)} className="p-2 hover:bg-zinc-50 border border-zinc-200 rounded">
                <span className="material-symbols-outlined !text-[24px]">chevron_right</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <div className="cal-grid border-t border-l border-[#edf0f5]">
                <div className="cal-cell-header"><span className="material-symbols-outlined text-zinc-400 !text-[16px]">schedule</span></div>
                {dayNames.map((day, i) => {
                  const d = new Date(weekStart);
                  d.setDate(weekStart.getDate() + i);
                  return <div key={i} className="cal-cell-header">{day} {d.getDate()}</div>;
                })}
                {hours.map((hour, r) => (
                  <div key={r} className="contents">
                    <div className="cal-cell flex items-start justify-center pt-2 font-bold text-[12px] text-zinc-600">{hour}:00</div>
                    {[...Array(7)].map((_, c) => {
                      const cellDate = new Date(weekStart);
                      cellDate.setDate(weekStart.getDate() + c);
                      const dateStr = formatLocalDate(cellDate);
                      
                      const allEventsInSlot = events.filter(e => e.date === dateStr && e.rowStart <= r && e.rowEnd > r);
                      const visibleEvents = allEventsInSlot.filter(e => filter === 'all' || e.space === filter);
                      
                      const startEvents = visibleEvents.filter(e => e.rowStart === r);

                      return (
                        <div key={c} className="cal-cell relative p-0.5">
                          {startEvents.length > 0 ? (
                            startEvents.map((ev) => {
                              const height = (ev.rowEnd - ev.rowStart) * 70 - 6;
                              
                              let width = '100%';
                              let left = '0';
                              
                              if (filter === 'all') {
                                width = 'calc(50% - 4px)';
                                left = ev.space === 'pavilhao' ? '2px' : '50%';
                              }

                              return (
                                <div 
                                  key={ev.id} 
                                  className="event-card z-10" 
                                  style={{ 
                                    backgroundColor: ev.color, 
                                    height: `${height}px`,
                                    width: '100%',
                                    position: 'absolute',
                                    top: '3px',
                                    left: '0',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    transform: startEvents.length > 1 && ev === startEvents[1] ? 'translate(4px, 4px)' : 'none',
                                    zIndex: startEvents.length > 1 && ev === startEvents[1] ? 5 : 10
                                  }} 
                                  onClick={() => {
                                    if (startEvents.length > 1) {
                                      setMultipleEvents(startEvents);
                                    } else {
                                      setDetailEvent({ ...ev, time: formatTime(ev.rowStart, ev.rowEnd) });
                                    }
                                  }}
                                >
                                  <div className="p-2 overflow-hidden h-full flex flex-col justify-between">
                                    <div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold opacity-80 block">{formatTime(ev.rowStart, ev.rowEnd)}</span>
                                        {startEvents.length > 1 && ev === startEvents[0] && (
                                          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[8px] font-bold">+1</span>
                                        )}
                                      </div>
                                      <p className="text-[12px] leading-tight font-black mt-1 line-clamp-3">{ev.title}</p>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1">
                                      <span className="text-[8px] uppercase font-bold tracking-wider opacity-90">{ev.space}</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : null}
                          
                          <div className="w-full h-full cursor-pointer hover:bg-zinc-50/50 transition-colors" onClick={() => {
                            const now = new Date();
                            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                            
                            const [selH] = hour.split(':').map(Number);
                            const selectedDateTime = new Date(cellDate);
                            selectedDateTime.setHours(selH, 0, 0, 0);

                            if (selectedDateTime < now) {
                              showToast('Horário Passado', 'Não é possível realizar reservas em horários que já ocorreram.', 'error');
                              return;
                            }

                            const fortyEightHoursFromNow = new Date(now.getTime() + 48 * 60 * 60 * 1000);
                            if (selectedDateTime < fortyEightHoursFromNow) {
                              showToast('Curto Prazo', 'Reservas com menos de 48h de antecedência podem não ser aprovadas a tempo.', 'info');
                            }

                            if (cellDate.getDay() === 0) {
                              showToast('Indisponível', 'Reservas não são permitidas aos domingos. O espaço está fechado.', 'error');
                              return;
                            }
                            setFormData({ ...formData, data: dateStr, inicio: hour + ':00' });
                            setWizardStep(1);
                          }} />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {detailEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[210] flex items-center justify-center" onClick={() => setDetailEvent(null)}>
          <div className="bg-white rounded-[20px] p-6 max-w-[400px] w-[90%] shadow-2xl border-l-[6px]" style={{ borderColor: detailEvent.color }} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-bold font-space">{detailEvent.title}</h3>
              <button onClick={() => setDetailEvent(null)} className="text-zinc-400 hover:text-zinc-600">
                <span className="material-symbols-outlined !text-[24px]">close</span>
              </button>
            </div>
            <div className="space-y-3 text-[14px]">
              <div><span className="font-semibold text-zinc-500 uppercase text-[12px]">Horário</span><p>{detailEvent.time}</p></div>
              <div><span className="font-semibold text-zinc-500 uppercase text-[12px]">Local</span><p className="capitalize">{detailEvent.space}</p></div>
              {detailEvent.desc && (
                <div><span className="font-semibold text-zinc-500 uppercase text-[12px]">Descrição</span><p>{detailEvent.desc}</p></div>
              )}
            </div>
          </div>
        </div>
      )}

      {wizardStep > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[220] flex items-center justify-center p-6" onClick={() => setWizardStep(0)}>
          <div className="bg-white rounded-[28px] p-[28px] max-w-[650px] w-full shadow-2xl border-t-[8px] border-[#c95a5a] relative" onClick={e => e.stopPropagation()}>
            {wizardStep === 1 ? (
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-[24px] font-bold font-space text-zinc-800">Dados do solicitante</h3>
                  <button onClick={() => setWizardStep(0)} className="text-zinc-400 hover:text-zinc-600">
                    <span className="material-symbols-outlined !text-[24px]">close</span>
                  </button>
                </div>
                <div className="space-y-5">
                  <div><label className="block text-[14px] font-semibold text-zinc-600">Email *</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border rounded-xl !bg-white" placeholder="seu@email.com" /></div>
                  <div><label className="block text-[14px] font-semibold text-zinc-600">Nome *</label><input type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full px-4 py-3 border rounded-xl !bg-white" placeholder="Nome completo" /></div>
                  <div><label className="block text-[14px] font-semibold text-zinc-600">Celular *</label><input type="tel" value={formData.celular} onChange={handlePhoneChange} className="w-full px-4 py-3 border rounded-xl !bg-white" placeholder="(81) 99999-9999" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[14px] font-semibold text-zinc-600">Data Selecionada</label><input type="date" value={formData.data} disabled className="w-full px-4 py-3 border rounded-xl bg-zinc-100 text-zinc-500 cursor-not-allowed" /></div>
                    <div><label className="block text-[14px] font-semibold text-zinc-600">Horário Inicial</label><input type="time" value={formData.inicio} disabled className="w-full px-4 py-3 border rounded-xl bg-zinc-100 text-zinc-500 cursor-not-allowed" /></div>
                  </div>
                  <div>
                    <label className="block text-[14px] font-semibold text-zinc-600">Escolha o espaço *</label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 text-[14px]"><input type="radio" checked={formData.espaco === 'Pavilhão'} onChange={() => setFormData({...formData, espaco: 'Pavilhão'})} /> <span>Espaço Pavilhão</span></label>
                      <label className="flex items-center gap-2 text-[14px]"><input type="radio" checked={formData.espaco === 'Maker'} onChange={() => setFormData({...formData, espaco: 'Maker'})} /> <span>Espaço Maker</span></label>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button 
                      onClick={() => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!formData.email || !emailRegex.test(formData.email)) {
                          showToast('E-mail Inválido', 'Por favor, insira um endereço de e-mail válido.', 'error');
                          return;
                        }
                        if (!formData.nome || formData.nome.length < 3) {
                          showToast('Nome Incompleto', 'Por favor, insira seu nome completo.', 'error');
                          return;
                        }
                        const phoneDigits = formData.celular.replace(/\D/g, '');
                        if (!formData.celular || phoneDigits.length < 11) {
                          showToast('Telefone Incompleto', 'O número deve ter 11 dígitos (DDD + 9 números).', 'error');
                          return;
                        }
                        if (!formData.espaco) {
                          showToast('Espaço Necessário', 'Escolha para qual espaço deseja solicitar a reserva.', 'error');
                          return;
                        }
                        router.push(formData.espaco === 'Maker' ? '/maker' : '/pavilhao');
                      }} 
                      className="px-6 py-2 bg-[#c95a5a] text-white rounded-xl"
                    >
                      Avançar para formulário →
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
      {toast.visible && (
        <div className={`fixed bottom-8 right-8 z-[9999] flex items-center gap-4 bg-[#1e1e1e] text-white px-6 py-4 rounded-2xl shadow-2xl border-l-4 animate-in fade-in slide-in-from-bottom-5 duration-300 ${
          toast.type === 'success' ? 'border-green-500' : toast.type === 'error' ? 'border-red-500' : 'border-blue-500'
        }`}>
          <span className={`material-symbols-outlined !text-[24px] ${
            toast.type === 'success' ? 'text-green-400' : toast.type === 'error' ? 'text-red-400' : 'text-blue-400'
          }`}>
            {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'cancel' : 'info'}
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-[14px] font-space">{toast.title}</span>
            <span className="text-[11px] text-zinc-400">{toast.message}</span>
          </div>
          <button onClick={() => setToast({ ...toast, visible: false })} className="ml-2 text-zinc-500 hover:text-white transition-colors">
            <span className="material-symbols-outlined !text-[14px]">close</span>
          </button>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] p-10 max-w-[500px] w-full text-center shadow-2xl border-t-[10px] border-green-500 animate-in zoom-in-95 duration-300">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined !text-[48px] text-green-600 animate-bounce">check_circle</span>
              </div>
            </div>
            <h2 className="font-space text-[32px] font-black text-zinc-900 mb-4 uppercase">Solicitação Enviada!</h2>
            <p className="text-zinc-600 mb-8 leading-relaxed">
              Recebemos sua solicitação com sucesso. Nossa equipe entrará em contato em breve através do e-mail informado para confirmar sua reserva.
            </p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-4 bg-[#1e1e1e] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg active:scale-95"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {multipleEvents && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[250] flex items-center justify-center p-4" onClick={() => setMultipleEvents(null)}>
          <div className="bg-white rounded-[24px] p-6 max-w-[400px] w-full shadow-[8px_8px_0px_#4a0e1c] border border-zinc-200 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <h4 className="text-[18px] font-bold font-space mb-4">Reservas neste horário</h4>
            <div className="space-y-3">
              {multipleEvents.map(ev => (
                <button 
                  key={ev.id}
                  onClick={() => {
                    setDetailEvent({ ...ev, time: formatTime(ev.rowStart, ev.rowEnd) });
                    setMultipleEvents(null);
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-100 hover:bg-zinc-50 transition-all text-left group"
                >
                  <div className="w-2.5 h-10 rounded-full shrink-0" style={{ backgroundColor: ev.color }} />
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{ev.space}</span>
                    <p className="font-bold text-zinc-800 line-clamp-1 text-[14px]">{ev.title}</p>
                    <span className="text-[11px] text-zinc-500">{formatTime(ev.rowStart, ev.rowEnd)}</span>
                  </div>
                  <span className="material-symbols-outlined text-zinc-300 group-hover:text-zinc-600">chevron_right</span>
                </button>
              ))}
            </div>
            <button onClick={() => setMultipleEvents(null)} className="w-full mt-6 py-3 text-zinc-500 font-bold hover:text-black transition-colors uppercase text-[12px] tracking-widest">Fechar</button>
          </div>
        </div>
      )}
    </main>
  );
}
