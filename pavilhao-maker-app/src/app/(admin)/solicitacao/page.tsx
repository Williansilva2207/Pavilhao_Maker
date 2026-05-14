'use client';

import { useState } from 'react';
import { createRequest } from '@/lib/services/supabaseServices';

export default function SolicitacaoPage() {
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    activityType: '',
    eventDate: '',
    timeStart: '',
    timeFinished: '',
    requesterName: '',
    email: '',
    whatsapp: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRequest({
        name: formData.requesterName,
        email: formData.email,
        number: formData.whatsapp,
        event_data: formData.eventDate,
        time_start: formData.timeStart,
        time_finished: formData.timeFinished,
        activity_type: formData.activityType,
        event_name: formData.eventName,
        description: formData.description,
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 6000);
      // Reset form
      setFormData({
        eventName: '', activityType: '', eventDate: '', timeStart: '', timeFinished: '', requesterName: '', email: '', whatsapp: '', description: ''
      });
    } catch (err) {
      alert('Erro ao enviar solicitação.');
      console.error(err);
    }
  };

  return (
    <div className="animate-fade-in pb-12">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Page Header Info */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-[#8b5000] tracking-[0.15em] uppercase font-inter">Módulo de Reserva</span>
          <h2 className="text-3xl font-bold text-zinc-900 font-space">Nova Solicitação de Espaço</h2>
          <p className="font-inter text-zinc-500 max-w-2xl leading-relaxed">
            Utilize este formulário para reservar equipamentos e áreas do pavilhão. Certifique-se de preencher todos os requisitos técnicos necessários para a sua atividade.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden form-card-hover rounded-sm">
          <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2 font-space">
              <span className="material-symbols-outlined text-[#8b5000]">description</span>
              Detalhes da Atividade
            </h3>
            <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-200 uppercase tracking-wider font-inter">
              Aguardando Preenchimento
            </span>
          </div>

          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            {/* Grid Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

              {/* Event Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest font-inter">Nome do Evento / Atividade</label>
                <input required name="eventName" value={formData.eventName} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#ff9800] focus:ring-1 focus:ring-[#ff9800] outline-none transition-all font-inter bg-white" placeholder="Ex: Workshop de Impressão 3D" type="text"/>
              </div>

              {/* Type Dropdown */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest font-inter">Tipo de Atividade</label>
                <select required name="activityType" value={formData.activityType} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#ff9800] outline-none transition-all font-inter bg-white appearance-none">
                  <option value="" disabled>Selecione uma categoria</option>
                  <option value="evento-pago">Evento Pago</option>
                  <option value="oficina">Oficina</option>
                  <option value="aula">Aula</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest font-inter">Data e Horários</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input required name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#ff9800] outline-none transition-all font-inter bg-white" type="date"/>
                  <input required name="timeStart" value={formData.timeStart} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#ff9800] outline-none transition-all font-inter bg-white" type="time" title="Horário de Início"/>
                  <input required name="timeFinished" value={formData.timeFinished} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#ff9800] outline-none transition-all font-inter bg-white" type="time" title="Horário de Término"/>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span className="text-xs text-emerald-600 font-medium italic">Selecione o intervalo exato de uso do laboratório</span>
                </div>
              </div>

              {/* Requester Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest font-inter">Nome do Solicitante</label>
                <input required name="requesterName" value={formData.requesterName} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#ff9800] outline-none transition-all font-inter bg-white" placeholder="Nome completo" type="text"/>
              </div>

              {/* Notice Box */}
              <div className="bg-zinc-50 p-4 border-l-4 border-[#ff9800] flex gap-3 self-start rounded-r-sm">
                <span className="material-symbols-outlined text-[#ff9800]">info</span>
                <p className="text-xs text-zinc-600 leading-relaxed font-inter">
                  <strong className="block mb-1 text-zinc-800">Nota de Validação:</strong>
                  Oficinas requerem um aviso prévio de no mínimo 2 dias úteis para preparação de insumos.
                </p>
              </div>

              {/* Contact Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest font-inter">E-mail</label>
                  <input required name="email" value={formData.email} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#ff9800] outline-none transition-all font-inter bg-white" placeholder="email@instituicao.org" type="email"/>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest font-inter">WhatsApp</label>
                  <input required name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#ff9800] outline-none transition-all font-inter bg-white" placeholder="(00) 00000-0000" type="tel"/>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest font-inter">Descrição da Atividade e Recursos Necessários</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-sm focus:border-[#ff9800] outline-none transition-all font-inter resize-none bg-white" placeholder="Descreva os materiais, máquinas e espaço físico necessários para o sucesso da atividade..." rows={4}></textarea>
              </div>

            </div>

            {/* Form Actions */}
            <div className="flex justify-end items-center gap-4 pt-6 border-t border-zinc-200">
              <button className="px-6 py-3 font-bold text-[12px] text-zinc-500 uppercase hover:bg-zinc-100 transition-colors btn-scale rounded-sm font-inter" type="reset">
                Limpar
              </button>
              <button className="bg-[#ff9800] text-[#653900] px-10 py-4 text-[12px] uppercase tracking-widest font-bold shadow-md hover:bg-[#8b5000] hover:text-white transition-all flex items-center gap-2 btn-scale rounded-sm font-inter" type="submit">
                <span className="material-symbols-outlined">send</span>
                Enviar Solicitação
              </button>
            </div>

          </form>
        </div>

        {/* Guidance Sidebar / Bento Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-100/50 border border-zinc-200 p-6 space-y-3 card-animated rounded-sm">
            <span className="material-symbols-outlined text-[#8b5000]">rule</span>
            <h4 className="text-base font-bold text-zinc-900 font-space">Política de Uso</h4>
            <p className="text-xs text-zinc-500 font-inter leading-relaxed">Lembre-se que o solicitante é responsável pela limpeza e organização do espaço após o uso.</p>
          </div>
          <div className="bg-zinc-100/50 border border-zinc-200 p-6 space-y-3 card-animated rounded-sm">
            <span className="material-symbols-outlined text-[#8b5000]">precision_manufacturing</span>
            <h4 className="text-base font-bold text-zinc-900 font-space">Suporte Técnico</h4>
            <p className="text-xs text-zinc-500 font-inter leading-relaxed">Necessita de um técnico? Marque a opção na descrição para triagem assistida.</p>
          </div>
          <div className="bg-zinc-100/50 border border-zinc-200 p-6 space-y-3 card-animated rounded-sm">
            <span className="material-symbols-outlined text-[#8b5000]">history</span>
            <h4 className="text-base font-bold text-zinc-900 font-space">Acompanhamento</h4>
            <p className="text-xs text-zinc-500 font-inter leading-relaxed">Após o envio, você poderá acompanhar o status na sua aba de 'Triagem'.</p>
          </div>
        </div>

      </div>

      {/* Toast Feedback */}
      <div 
        className={`fixed bottom-10 right-10 flex items-center gap-4 bg-zinc-900 text-white px-6 py-4 rounded-lg shadow-2xl border-l-4 border-emerald-500 z-50 transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <span className="material-symbols-outlined text-emerald-400">check_circle</span>
        <div className="flex flex-col">
          <span className="font-bold text-sm font-inter">Solicitação enviada com sucesso!</span>
          <span className="text-[10px] text-zinc-400 font-inter">Você receberá uma confirmação por e-mail em breve.</span>
        </div>
        <button onClick={() => setShowToast(false)} className="ml-4 text-zinc-500 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>

    </div>
  );
}
