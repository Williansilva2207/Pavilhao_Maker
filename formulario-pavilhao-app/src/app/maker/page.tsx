
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function MakerPage() {
  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    celular: '',
    maquinario: '',
    professor: '',
    destino: '',
    turma: '',
    data: '',
    inicio: '',
    fim: ''
  });

  const isLoaded = useRef(false);

  // Load data
  useEffect(() => {
    const userSaved = localStorage.getItem('pavilhao_form_user');
    const pageSaved = localStorage.getItem('pavilhao_form_page_maker');
    let combined = { ...formData };
    if (userSaved) combined = { ...combined, ...JSON.parse(userSaved) };
    if (pageSaved) combined = { ...combined, ...JSON.parse(pageSaved) };
    setFormData(combined);
    setTimeout(() => {
      isLoaded.current = true;
    }, 0);
  }, []);

  // Persist own fields
  useEffect(() => {
    if (isLoaded.current) {
      const { email, nome, celular, ...pageData } = formData;
      localStorage.setItem('pavilhao_form_page_maker', JSON.stringify(pageData));
    }
  }, [formData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submit Maker:", formData);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  return (
    <main className="min-h-screen industrial-grid">
      <header className="h-16 bg-white border-b flex items-center justify-between px-8">
        <h2 className="font-space text-[24px] font-semibold header-title cursor-default">
          Solicitação de Reserva do Pavilhão Maker
        </h2>
      </header>

      <section className="relative bg-[#f4f4f5] overflow-hidden maker-header">
        <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 pointer-events-none">
          <span className="material-symbols-outlined !text-[240px] text-zinc-200/60 select-none">precision_manufacturing</span>
        </div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            <div className="flex flex-col items-start justify-center">
              <div className="relative cursor-default">
                <span className="material-symbols-outlined !text-[128px] md:!text-[144px] text-zinc-800 transition-transform duration-500 maker-icon maker-icon-main">science</span>
                <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#c95a5a] text-white text-[12px] font-bold shadow-lg maker-badge">
                  <span className="material-symbols-outlined !text-[14px]">verified</span>
                </span>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                <span className="material-symbols-outlined !text-[14px]">policy</span>
                Acesso Restrito
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h2 className="font-space text-[48px] md:text-[72px] font-black uppercase tracking-tight text-zinc-900 leading-[1.1] text-balance title-maker cursor-default">
                  Espaço Maker
                </h2>
                <p className="font-space text-[24px] md:text-[36px] font-light text-zinc-500 mt-2 tracking-wide title-lab cursor-default">
                  Laboratórios
                </p>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#c95a5a] to-[#8b1e35] mt-4 rounded-full" />
              </div>

              <div className="space-y-4 max-w-2xl">
                <div className="flex gap-4">
                  <span className="hidden sm:block w-1.5 flex-shrink-0 bg-zinc-800 rounded-full" />
                  <p className="text-[18px] md:text-[20px] text-zinc-700 leading-relaxed font-light">
                    Essa página é destinada apenas para quem deseja solicitar a reserva do <strong className="font-semibold">Espaço Maker</strong>.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="hidden sm:block w-1.5 flex-shrink-0 bg-zinc-300 rounded-full" />
                  <p className="text-[16px] md:text-[18px] text-zinc-600 leading-relaxed font-light">
                    O uso do Espaço Maker deve ser intermediado por um <strong>técnico de laboratório</strong> ou por um <strong>professor vinculado à Universidade Católica de Pernambuco</strong>.
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
          <span className="material-symbols-outlined absolute left-[2%] top-[5%] !text-[176px] text-[#c95a5a] ambient-icon -rotate-12" style={{ opacity: 0.15 }}>precision_manufacturing</span>
          <span className="material-symbols-outlined absolute left-[4%] top-[35%] !text-[128px] text-[#b94d4d] ambient-icon rotate-45" style={{ opacity: 0.2 }}>view_in_ar</span>
          <span className="material-symbols-outlined absolute left-[1%] top-[50%] !text-[160px] text-zinc-800 ambient-icon rotate-90" style={{ opacity: 0.12 }}>flare</span>
          <span className="material-symbols-outlined absolute left-[3%] top-[58%] !text-[144px] text-[#c95a5a] ambient-icon -rotate-15" style={{ opacity: 0.18 }}>engineering</span>
          <span className="material-symbols-outlined absolute left-[2%] top-[83%] !text-[112px] text-[#8b1e35] ambient-icon rotate-6" style={{ opacity: 0.15 }}>build</span>

          <span className="material-symbols-outlined absolute right-[2%] top-[8%] !text-[176px] text-[#8b1e35] ambient-icon rotate-12" style={{ opacity: 0.15 }}>memory</span>
          <span className="material-symbols-outlined absolute right-[5%] top-[32%] !text-[144px] text-[#c95a5a] ambient-icon -rotate-45" style={{ opacity: 0.2 }}>handyman</span>
          <span className="material-symbols-outlined absolute right-[2%] top-[56%] !text-[160px] text-zinc-800 ambient-icon -rotate-90" style={{ opacity: 0.12 }}>settings</span>
          <span className="material-symbols-outlined absolute right-[4%] top-[80%] !text-[112px] text-[#b94d4d] ambient-icon rotate-30" style={{ opacity: 0.2 }}>bolt</span>

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

        <div className="max-w-4xl mx-auto relative z-10 overflow-hidden rounded-[32px] shadow-2xl border-l-8 border-black bg-gradient-to-br from-[#c95a5a] via-[#b94d4d] to-[#8b1e35] p-10 text-white form-card-hover">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/20 blur-3xl rounded-full" />
          <div className="relative">
            <h1 className="font-space text-[30px] mb-10 label-hover inline-block">Dados do solicitante e opção de espaço</h1>
            <form className="space-y-10" onSubmit={handleSubmit}>
              <fieldset>
                <legend className="text-[20px] mb-5 label-hover inline-block">5. Maquinário a ser utilizado para a reserva: <span className="required-asterisk">*</span></legend>
                <div className="grid md:grid-cols-3 gap-4">
                  <label className="cursor-pointer">
                    <input 
                      type="radio" 
                      name="maquinario" 
                      className="peer hidden" 
                      required 
                      checked={formData.maquinario === 'laser'}
                      onChange={() => setFormData({ ...formData, maquinario: 'laser' })}
                    />
                    <div className="p-5 rounded-2xl bg-white/10 border border-white/30 transition-all card-option peer-checked:bg-white peer-checked:text-[#1e1e1e] peer-checked:shadow-[0_0_25px_rgba(255,180,120,0.7)]">
                      <span className="material-symbols-outlined !text-[24px] mb-2 block">flare</span>
                      <span className="font-medium text-[16px]">Cortadora a laser</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input 
                      type="radio" 
                      name="maquinario" 
                      className="peer hidden" 
                      checked={formData.maquinario === '3d'}
                      onChange={() => setFormData({ ...formData, maquinario: '3d' })}
                    />
                    <div className="p-5 rounded-2xl bg-white/10 border border-white/30 transition-all card-option peer-checked:bg-white peer-checked:text-[#1e1e1e] peer-checked:shadow-[0_0_25px_rgba(255,180,120,0.7)]">
                      <span className="material-symbols-outlined !text-[24px] mb-2 block">view_in_ar</span>
                      <span className="font-medium text-[16px]">Impressora 3D</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input 
                      type="radio" 
                      name="maquinario" 
                      className="peer hidden" 
                      checked={formData.maquinario === 'cnc'}
                      onChange={() => setFormData({ ...formData, maquinario: 'cnc' })}
                    />
                    <div className="p-5 rounded-2xl bg-white/10 border border-white/30 transition-all card-option peer-checked:bg-white peer-checked:text-[#1e1e1e] peer-checked:shadow-[0_0_25px_rgba(255,180,120,0.7)]">
                      <span className="material-symbols-outlined !text-[24px] mb-2 block">precision_manufacturing</span>
                      <span className="font-medium text-[16px]">Router CNC</span>
                    </div>
                  </label>
                </div>
              </fieldset>

              <div>
                <label className="block mb-2 text-[18px] label-hover">6. Professor solicitante: <span className="required-asterisk">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nome do professor" 
                  required 
                  value={formData.professor}
                  onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover outline-none !bg-white" 
                />
              </div>
              <div>
                <label className="block mb-2 text-[18px] label-hover">7. A que se destina o projeto: <span className="required-asterisk">*</span></label>
                <input 
                  type="text" 
                  placeholder="Descreva brevemente" 
                  required 
                  value={formData.destino}
                  onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover outline-none !bg-white" 
                />
              </div>
              <div>
                <label className="block mb-2 text-[18px] label-hover">8. Qual a sua turma: <span className="required-asterisk">*</span></label>
                <input 
                  type="text" 
                  placeholder="Ex: 3º período / Turma A" 
                  required 
                  value={formData.turma}
                  onChange={(e) => setFormData({ ...formData, turma: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover outline-none !bg-white" 
                />
              </div>
              <div>
                <label className="block mb-2 text-[18px] label-hover">9. Data de utilização do maquinário: <span className="required-asterisk">*</span></label>
                <input 
                  type="date" 
                  required 
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover outline-none !bg-white" 
                />
              </div>
              <div>
                <label className="block mb-2 text-[18px] label-hover">10. Horário de início da atividade: <span className="required-asterisk">*</span></label>
                <input 
                  type="time" 
                  required 
                  value={formData.inicio}
                  onChange={(e) => setFormData({ ...formData, inicio: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover outline-none !bg-white" 
                />
              </div>
              <div>
                <label className="block mb-2 text-[18px] label-hover">11. Horário de finalização da atividade: <span className="required-asterisk">*</span></label>
                <input 
                  type="time" 
                  required 
                  value={formData.fim}
                  onChange={(e) => setFormData({ ...formData, fim: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl text-black transition-all input-hover outline-none !bg-white" 
                />
              </div>

              <div className="flex justify-between pt-6">
                <button type="button" onClick={() => router.push('/')} className="px-8 py-4 rounded-xl text-[#1e1e1e] bg-white/80 hover:bg-white transition-all btn-hover font-medium">Voltar</button>
                <button type="submit" className="bg-[#7f1d35] px-8 py-4 rounded-xl text-white text-[18px] transition-all btn-hover hover:bg-black hover:-translate-y-1 hover:shadow-xl active:scale-95">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {toastVisible && (
        <div className="fixed bottom-8 right-8 z-[9999] flex items-center gap-4 bg-[#1e1e1e] text-white px-6 py-4 rounded-2xl shadow-2xl border-l-4 border-green-500">
          <span className="material-symbols-outlined text-green-400 !text-[24px]">check_circle</span>
          <div className="flex flex-col">
            <span className="font-bold text-[14px] font-space">Solicitação enviada!</span>
            <span className="text-[11px] text-zinc-400">Aguarde o retorno da equipe.</span>
          </div>
          <button onClick={() => setToastVisible(false)} className="ml-2 text-zinc-500 hover:text-white">
            <span className="material-symbols-outlined !text-[14px]">close</span>
          </button>
        </div>
      )}
    </main>
  );
}
