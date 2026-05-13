
'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export default function PavilhaoPage() {
  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToastVisible(true);
  };

  return (
    <main className="min-h-screen industrial-grid">
      <header className="h-16 bg-white border-b flex items-center justify-between px-8">
        <h2 className="font-space text-2xl font-semibold header-title cursor-default">Solicitação de Reserva do Pavilhão Maker</h2>
      </header>

      <section className="relative bg-[#f4f4f5] overflow-hidden pavilion-header">
        <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 text-[15rem] text-zinc-200/60 select-none pointer-events-none">
          <span className="material-symbols-outlined">domain</span>
        </div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            <div className="flex flex-col items-start justify-center">
              <div className="relative cursor-default">
                <span className="material-symbols-outlined text-8xl md:text-9xl text-zinc-800 transition-transform duration-500 pavilion-icon pavilion-icon-main">
                  event_seat
                </span>
                <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#c95a5a] text-white text-xs font-bold shadow-lg pavilion-badge">
                  <span className="material-symbols-outlined text-sm">edit_calendar</span>
                </span>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                <span className="material-symbols-outlined text-sm">policy</span>
                Acesso Restrito
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="font-space text-5xl md:text-7xl font-black uppercase tracking-tight text-zinc-900 leading-[1.1] text-balance title-pavilion cursor-default">
                  Espaço do Pavilhão
                </h2>
                <p className="font-space text-2xl md:text-4xl font-light text-zinc-500 mt-2 tracking-wide title-lounge cursor-default">
                  Lounge/Co-Work
                </p>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#c95a5a] to-[#8b1e35] mt-4 rounded-full" />
              </div>
              <div className="space-y-4 max-w-2xl">
                <div className="flex gap-4">
                  <span className="hidden sm:block w-1.5 flex-shrink-0 bg-zinc-800 rounded-full" />
                  <p className="text-lg md:text-xl text-zinc-700 leading-relaxed font-light">
                    Essa página é destinada apenas para quem deseja solicitar a reserva do <strong className="font-semibold">Espaço do Pavilhão</strong>.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="hidden sm:block w-1.5 flex-shrink-0 bg-zinc-300 rounded-full" />
                  <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-light">
                    A solicitação de reserva para uso do Espaço do Pavilhão deve ser feita por parte do <strong>docente responsável pelo evento</strong>.
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
          <span className="material-symbols-outlined absolute left-[2%] top-[5%] text-[11rem] text-[#c95a5a] ambient-icon -rotate-12" style={{ opacity: 0.15 }}>
            precision_manufacturing
          </span>
          <span className="material-symbols-outlined absolute left-[4%] top-[35%] text-[8rem] text-[#b94d4d] ambient-icon rotate-45" style={{ opacity: 0.2 }}>
            view_in_ar
          </span>
          <span className="material-symbols-outlined absolute left-[1%] top-[50%] text-[10rem] text-zinc-800 ambient-icon rotate-90" style={{ opacity: 0.12 }}>
            laser
          </span>
          <span className="material-symbols-outlined absolute left-[3%] top-[58%] text-[9rem] text-[#c95a5a] ambient-icon -rotate-15" style={{ opacity: 0.18 }}>
            engineering
          </span>
          <span className="material-symbols-outlined absolute left-[2%] top-[83%] text-[7rem] text-[#8b1e35] ambient-icon rotate-6" style={{ opacity: 0.15 }}>
            build
          </span>

          <span className="material-symbols-outlined absolute right-[2%] top-[8%] text-[11rem] text-[#8b1e35] ambient-icon rotate-12" style={{ opacity: 0.15 }}>
            memory
          </span>
          <span className="material-symbols-outlined absolute right-[5%] top-[32%] text-[9rem] text-[#c95a5a] ambient-icon -rotate-45" style={{ opacity: 0.2 }}>
            handyman
          </span>
          <span className="material-symbols-outlined absolute right-[2%] top-[56%] text-[10rem] text-zinc-800 ambient-icon -rotate-90" style={{ opacity: 0.12 }}>
            settings
          </span>
          <span className="material-symbols-outlined absolute right-[4%] top-[80%] text-[7rem] text-[#b94d4d] ambient-icon rotate-30" style={{ opacity: 0.2 }}>
            bolt
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
            <h1 className="font-space text-3xl mb-10 label-hover inline-block">Dados do solicitante e opção de espaço</h1>
            <form className="space-y-10" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-lg label-hover">
                  5. Nome do evento <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Digite o nome do evento"
                  required
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover hover:bg-white hover:shadow-[0_0_25px_rgba(255,120,120,0.6)] focus:bg-white focus:ring-4 focus:ring-red-200 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-lg label-hover">
                  6. Descrição do evento <span className="required-asterisk">*</span>
                </label>
                <textarea
                  placeholder="Descreva o evento"
                  required
                  rows={4}
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover hover:bg-white hover:shadow-[0_0_25px_rgba(255,120,120,0.6)] focus:bg-white focus:ring-4 focus:ring-red-200 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-lg label-hover">
                  7. Quantidade de participantes <span className="required-asterisk">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Número de participantes"
                  required
                  min={1}
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover hover:bg-white hover:shadow-[0_0_25px_rgba(255,120,120,0.6)] focus:bg-white focus:ring-4 focus:ring-red-200 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-lg label-hover">
                  8. Data do evento <span className="required-asterisk">*</span>
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover hover:bg-white hover:shadow-[0_0_25px_rgba(255,120,120,0.6)] focus:bg-white focus:ring-4 focus:ring-red-200 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-lg label-hover">
                  9. Horário de início <span className="required-asterisk">*</span>
                </label>
                <input
                  type="time"
                  required
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover hover:bg-white hover:shadow-[0_0_25px_rgba(255,120,120,0.6)] focus:bg-white focus:ring-4 focus:ring-red-200 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-lg label-hover">
                  10. Horário de finalização <span className="required-asterisk">*</span>
                </label>
                <input
                  type="time"
                  required
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover hover:bg-white hover:shadow-[0_0_25px_rgba(255,120,120,0.6)] focus:bg-white focus:ring-4 focus:ring-red-200 outline-none"
                />
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="px-8 py-4 rounded-xl text-[#1e1e1e] bg-white/80 hover:bg-white transition-all btn-secondary font-medium"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="bg-[#7f1d35] px-8 py-4 rounded-xl text-white text-lg transition-all btn-primary hover:bg-black hover:-translate-y-1 hover:shadow-xl active:scale-95"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {toastVisible ? (
        <div className="success-toast">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <div className="flex flex-col">
            <span className="font-bold text-sm font-space">Solicitação enviada!</span>
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
