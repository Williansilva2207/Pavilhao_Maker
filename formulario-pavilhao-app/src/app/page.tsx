
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

// --- DATA ---
const dayNames = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const hours = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];

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

export default function HomePage() {
  const router = useRouter();
  
  // State
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [detailEvent, setDetailEvent] = useState<Event | null>(null);
  const [wizardStep, setWizardStep] = useState(0); 
  
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    celular: '',
    espaco: null as 'Pavilhão' | 'Maker' | null,
    date: '',
    startHour: ''
  });

  const [weekStart, setWeekStart] = useState(new Date(2024, 10, 11));

  const isLoaded = useRef(false);

  // Load from localStorage
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
  }, []);

  // Save to localStorage
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
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Hacka of Wars', place: 'Laboratório de Inovação', desc: 'Competição de hacking.', color: '#4ade80', date: '2024-11-12', rowStart: 0, rowEnd: 2 },
    { id: 2, title: 'Copa do Mundo', place: 'Auditório Principal', desc: 'Transmissão dos jogos.', color: '#fb923c', date: '2024-11-13', rowStart: 2, rowEnd: 3 },
    { id: 3, title: 'Oficina Maker', place: 'Sala Maker 1', desc: 'Prototipagem.', color: '#fb923c', date: '2024-11-14', rowStart: 2, rowEnd: 6 },
    { id: 4, title: 'Oficina Marc.', place: 'Sala Maker 2', desc: 'Marcenaria.', color: '#facc15', date: '2024-11-15', rowStart: 2, rowEnd: 4 },
    { id: 5, title: 'Palestra Inov.', place: 'Auditório', desc: 'Palestra.', color: '#c084fc', date: '2024-11-13', rowStart: 4, rowEnd: 6 },
    { id: 6, title: 'Aula Design', place: 'Sala 404', desc: 'Aula especial.', color: '#60a5fa', date: '2024-11-14', rowStart: 4, rowEnd: 5 },
    { id: 7, title: 'Palestra Mot.', place: 'Auditório', desc: 'Palestra.', color: '#f472b6', date: '2024-11-15', rowStart: 6, rowEnd: 9 }
  ]);

  const formatTime = (rowStart: number, rowEnd: number) => {
    return `${hours[rowStart]}:00 - ${hours[rowEnd]}:00`;
  };

  const formatLocalDate = (date: Date) => {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  };

  const navigateWeek = (days: number) => {
    const newDate = new Date(weekStart);
    newDate.setDate(weekStart.getDate() + days);
    setWeekStart(newDate);
  };

  const handleMainFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.espaco) {
      alert("Por favor, escolha um espaço (Pavilhão ou Maker).");
      return;
    }
    router.push(formData.espaco === 'Maker' ? '/maker' : '/pavilhao');
  };

  return (
    <main className="min-h-screen industrial-grid">
      {/* HEADER */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-8">
        <h2 className="font-space text-[24px] font-semibold header-title cursor-default">Solicitação de Reserva do Pavilhão Maker</h2>
      </header>

      {/* HERO SECTION */}
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

      {/* FORM SECTION */}
      <section className="px-6 md:px-12 py-10 relative overflow-hidden">
        <div className="absolute inset-0">
          <span className="material-symbols-outlined absolute left-[2%] top-[8%] !text-[192px] text-[#c95a5a] ambient-icon -rotate-12" style={{ opacity: 0.15 }}>precision_manufacturing</span>
          <span className="material-symbols-outlined absolute left-[3%] top-[40%] !text-[128px] text-[#b94d4d] ambient-icon rotate-45" style={{ opacity: 0.2 }}>view_in_ar</span>
          <span className="material-symbols-outlined absolute left-[1%] top-[56%] !text-[160px] text-zinc-800 ambient-icon rotate-90" style={{ opacity: 0.12 }}>flare</span>
          <span className="material-symbols-outlined absolute left-[4%] top-[70%] !text-[144px] text-[#c95a5a] ambient-icon -rotate-15" style={{ opacity: 0.18 }}>engineering</span>
          <span className="material-symbols-outlined absolute right-[2%] top-[12%] !text-[176px] text-[#8b1e35] ambient-icon rotate-12" style={{ opacity: 0.15 }}>memory</span>
          <span className="material-symbols-outlined absolute right-[4%] top-[45%] !text-[144px] text-[#c95a5a] ambient-icon -rotate-45" style={{ opacity: 0.2 }}>handyman</span>
          <span className="material-symbols-outlined absolute right-[5%] top-[78%] !text-[112px] text-zinc-800 ambient-icon -rotate-90" style={{ opacity: 0.12 }}>settings</span>
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

      {/* MODALS */}
      {calendarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={() => setCalendarOpen(false)}>
          <div className="bg-white rounded-[24px] p-6 w-full max-w-[1100px] max-h-[85vh] overflow-auto shadow-2xl relative border border-black/5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[20px] font-bold font-space">Calendário de Ocupação</h3>
              <button onClick={() => setCalendarOpen(false)} className="text-zinc-400 hover:text-zinc-600">
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
                      const ev = events.find(e => e.date === dateStr && e.rowStart === r);
                      if (ev) {
                        const height = (ev.rowEnd - ev.rowStart) * 70 - 4;
                        return (
                          <div key={c} className="cal-cell relative">
                            <div className="event-card" style={{ backgroundColor: ev.color, top: '3px', height: `${height}px` }} onClick={() => setDetailEvent({ ...ev, time: formatTime(ev.rowStart, ev.rowEnd) })}>
                              <span className="text-[10px] opacity-90">{formatTime(ev.rowStart, ev.rowEnd)}</span>
                              <p className="text-[12px] mt-0.5">{ev.title}</p>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={c} className="cal-cell empty-cell" onClick={() => {
                          if (cellDate.getDay() === 0) {
                            alert("❌ Reservas não são permitidas aos domingos. Escolha outro dia.");
                            return;
                          }
                          setFormData({ ...formData, date: dateStr, startHour: hour + ':00' });
                          setWizardStep(1);
                        }} />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
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
              <div><span className="font-semibold text-zinc-500 uppercase text-[12px]">Local</span><p>{detailEvent.place}</p></div>
              <div><span className="font-semibold text-zinc-500 uppercase text-[12px]">Descrição</span><p>{detailEvent.desc}</p></div>
            </div>
          </div>
        </div>
      )}

      {/* WIZARD MODAL */}
      {wizardStep > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[220] flex items-center justify-center p-6" onClick={() => setWizardStep(0)}>
          <div className="bg-white rounded-[28px] p-[28px] max-w-[650px] w-full max-h-[85vh] overflow-y-auto shadow-2xl border-t-[8px] border-[#c95a5a]" onClick={e => e.stopPropagation()}>
            {wizardStep === 1 ? (
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-[24px] font-bold font-space text-zinc-800">Etapa 1 - Dados do solicitante</h3>
                  <button onClick={() => setWizardStep(0)} className="text-zinc-400 hover:text-zinc-600">
                    <span className="material-symbols-outlined !text-[24px]">close</span>
                  </button>
                </div>
                <div className="space-y-5">
                  <div><label className="block text-[14px] font-semibold text-zinc-600">Email *</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border rounded-xl !bg-white" placeholder="seu@email.com" /></div>
                  <div><label className="block text-[14px] font-semibold text-zinc-600">Nome *</label><input type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full px-4 py-3 border rounded-xl !bg-white" placeholder="Nome completo" /></div>
                  <div><label className="block text-[14px] font-semibold text-zinc-600">Celular *</label><input type="tel" value={formData.celular} onChange={handlePhoneChange} className="w-full px-4 py-3 border rounded-xl !bg-white" placeholder="(81) 99999-9999" /></div>
                  <div>
                    <label className="block text-[14px] font-semibold text-zinc-600">Escolha o espaço *</label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 text-[14px]"><input type="radio" checked={formData.espaco === 'Pavilhão'} onChange={() => setFormData({...formData, espaco: 'Pavilhão'})} /> <span>Espaço Pavilhão</span></label>
                      <label className="flex items-center gap-2 text-[14px]"><input type="radio" checked={formData.espaco === 'Maker'} onChange={() => setFormData({...formData, espaco: 'Maker'})} /> <span>Espaço Maker</span></label>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4"><button onClick={() => setWizardStep(2)} className="px-6 py-2 bg-[#c95a5a] text-white rounded-xl">Avançar →</button></div>
                </div>
              </div>
            ) : (
              <div>
                 <div className="flex justify-between items-center mb-5">
                  <h3 className="text-[24px] font-bold font-space text-zinc-800">Etapa 2 - Dados da reserva ({formData.espaco})</h3>
                  <button onClick={() => setWizardStep(0)} className="text-zinc-400 hover:text-zinc-600">
                    <span className="material-symbols-outlined !text-[24px]">close</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.espaco === 'Maker' ? (
                    <>
                      <div><label className="block font-semibold text-[14px]">5. Maquinário a ser utilizado: *</label><div className="flex gap-3 mt-1 text-[13px]"><label><input type="radio" name="maquina" /> Laser</label><label><input type="radio" name="maquina" /> 3D</label><label><input type="radio" name="maquina" /> CNC</label></div></div>
                      <div><label className="text-[14px]">6. Professor solicitante: *</label><input type="text" className="w-full border rounded-xl px-3 py-2 !bg-white" /></div>
                      <div><label className="text-[14px]">7. Destino do projeto: *</label><input type="text" className="w-full border rounded-xl px-3 py-2 !bg-white" /></div>
                    </>
                  ) : (
                    <>
                      <div><label className="text-[14px]">5. Nome do evento *</label><input type="text" className="w-full border rounded-xl px-3 py-2 !bg-white" /></div>
                      <div><label className="text-[14px]">6. Descrição *</label><textarea rows={2} className="w-full border rounded-xl px-3 py-2 !bg-white"></textarea></div>
                    </>
                  )}
                  <div><label className="text-[14px]">Data: *</label><input type="date" value={formData.date} className="w-full border rounded-xl px-3 py-2 bg-zinc-50" disabled /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-[14px]">Início: *</label><input type="time" value={formData.startHour} className="w-full border rounded-xl px-3 py-2 bg-zinc-50" disabled /></div>
                    <div><label className="text-[14px]">Finalização: *</label><input type="time" className="w-full border rounded-xl px-3 py-2 !bg-white" /></div>
                  </div>
                  <div className="flex justify-between gap-3 pt-4">
                    <button onClick={() => setWizardStep(1)} className="px-5 py-2 border rounded-xl">← Voltar</button>
                    <button onClick={() => setWizardStep(0)} className="px-5 py-2 bg-green-700 text-white rounded-xl">Enviar Reserva</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
