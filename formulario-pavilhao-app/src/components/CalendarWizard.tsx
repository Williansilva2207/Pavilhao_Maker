'use client';

import React, { useState } from 'react';

interface WizardData {
  date: string;
  startHour: string;
  email: string;
  nome: string;
  celular: string;
  espaco: 'Pavilhão' | 'Maker';
}

interface CalendarWizardProps {
  isOpen: boolean;
  date: string;
  startHour: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CalendarWizard({ isOpen, date, startHour, onClose, onSuccess }: CalendarWizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>({
    date,
    startHour,
    email: '',
    nome: '',
    celular: '',
    espaco: 'Pavilhão'
  });

  // Step 2 fields
  const [maquina, setMaquina] = useState('');
  const [professor, setProfessor] = useState('');
  const [projeto, setProjeto] = useState('');
  const [turma, setTurma] = useState('');
  const [nomeEvento, setNomeEvento] = useState('');
  const [descEvento, setDescEvento] = useState('');
  const [qtdPart, setQtdPart] = useState('');
  const [horaFim, setHoraFim] = useState('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (!data.email || !data.nome || !data.celular) {
      alert("Preencha todos os campos do solicitante.");
      return;
    }
    setStep(2);
    // Set default end hour
    const [hour] = data.startHour.split(':');
    const nextHour = (parseInt(hour) + 1).toString().padStart(2, '0');
    setHoraFim(`${nextHour}:00`);
  };

  const handleSubmit = () => {
    // Validation logic (simplified for demonstration, matching original script)
    if (data.espaco === 'Maker') {
      if (!maquina || !professor || !projeto || !turma) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }
    } else {
      if (!nomeEvento || !descEvento || !qtdPart) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }
    }
    onSuccess();
  };

  return (
    <div className="create-event-popup" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="create-event-card">
        {step === 1 ? (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold font-space text-zinc-800">Etapa 1 - Dados do solicitante</h3>
              <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-zinc-600">Email *</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-600">Nome *</label>
                <input
                  type="text"
                  value={data.nome}
                  onChange={(e) => setData({ ...data, nome: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-600">Celular *</label>
                <input
                  type="tel"
                  value={data.celular}
                  onChange={(e) => setData({ ...data, celular: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="(81) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-600">Escolha o espaço *</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="wizEspaco"
                      checked={data.espaco === 'Pavilhão'}
                      onChange={() => setData({ ...data, espaco: 'Pavilhão' })}
                    />
                    <span>Espaço Pavilhão (Lounge/Co-work)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="wizEspaco"
                      checked={data.espaco === 'Maker'}
                      onChange={() => setData({ ...data, espaco: 'Maker' })}
                    />
                    <span>Espaço Maker (Máquinas/Prototipagem)</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button onClick={handleNext} className="px-6 py-2 bg-[#c95a5a] text-white rounded-xl">
                  Avançar →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold font-space text-zinc-800">
                Etapa 2 - Dados da reserva ({data.espaco === 'Maker' ? 'Espaço Maker' : 'Espaço Pavilhão'})
              </h3>
              <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-4">
              {data.espaco === 'Maker' ? (
                <>
                  <div>
                    <label className="block font-semibold">5. Maquinário a ser utilizado: *</label>
                    <div className="flex flex-wrap gap-3 mt-1">
                      {['Cortadora a laser', 'Impressora 3D', 'Router CNC'].map((m) => (
                        <label key={m}>
                          <input type="radio" name="maquina" value={m} onChange={(e) => setMaquina(e.target.value)} /> {m}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label>6. Professor solicitante: *</label>
                    <input type="text" value={professor} onChange={(e) => setProfessor(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
                  </div>
                  <div>
                    <label>7. A que se destina o projeto: *</label>
                    <input type="text" value={projeto} onChange={(e) => setProjeto(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
                  </div>
                  <div>
                    <label>8. Qual a sua turma: *</label>
                    <input type="text" value={turma} onChange={(e) => setTurma(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label>5. Nome do evento *</label>
                    <input type="text" value={nomeEvento} onChange={(e) => setNomeEvento(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
                  </div>
                  <div>
                    <label>6. Descrição do evento *</label>
                    <textarea rows={2} value={descEvento} onChange={(e) => setDescEvento(e.target.value)} className="w-full border rounded-xl px-3 py-2"></textarea>
                  </div>
                  <div>
                    <label>7. Quantidade de participantes *</label>
                    <input type="number" value={qtdPart} onChange={(e) => setQtdPart(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
                  </div>
                </>
              )}

              <div>
                <label>Data: *</label>
                <input type="date" value={data.date} disabled className="w-full border rounded-xl px-3 py-2 bg-zinc-50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Início: *</label>
                  <input type="time" value={data.startHour} disabled className="w-full border rounded-xl px-3 py-2 bg-zinc-50" />
                </div>
                <div>
                  <label>Finalização: *</label>
                  <input type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
                </div>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <button onClick={() => setStep(1)} className="px-5 py-2 border rounded-xl">
                  ← Voltar
                </button>
                <button onClick={handleSubmit} className="px-5 py-2 bg-green-700 text-white rounded-xl">
                  Enviar Reserva
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
