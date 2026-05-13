
'use client';

import { useState } from 'react';
import RequestCard from '@/components/RequestCard';

const requests = [
  { id: 'req-1', title: 'Solicitação de workshop', requester: 'Prof. Ana Maria', space: 'Pavilhão', submitted: 'Hoje, 09:18' },
  { id: 'req-2', title: 'Prototipagem de drone', requester: 'Equipe Maker', space: 'Maker', submitted: 'Hoje, 10:04' },
  { id: 'req-3', title: 'Reunião pedagógica', requester: 'Prof. Marcos', space: 'Pavilhão', submitted: 'Ontem, 16:30' },
];

export default function TriagemPage() {
  const [processed, setProcessed] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-zinc-200 bg-white/95 p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Painel de triagem</p>
        <h1 className="mt-3 text-3xl font-[var(--font-space)] font-black text-zinc-950">Solicitações pendentes</h1>
        <p className="mt-3 text-sm text-zinc-600">Revise os pedidos e atualize o status visualmente.</p>
      </div>

      <div className="grid gap-4">
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            title={request.title}
            requester={request.requester}
            space={request.space}
            submitted={request.submitted}
            onAction={(action) => setProcessed(`${request.title} ${action}`)}
          />
        ))}
      </div>

      {processed ? (
        <div className="rounded-3xl border border-green-200 bg-green-50 px-6 py-4 text-sm text-green-900 shadow-sm">
          {processed}
        </div>
      ) : null}
    </div>
  );
}
